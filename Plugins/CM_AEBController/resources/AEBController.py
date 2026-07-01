from pythonfmu import Fmi2Causality, Fmi2Slave, Real


class _NS:
    """Plain attribute namespace for pythonfmu structured variable traversal."""
    pass


class AEBController(Fmi2Slave):
    """Radar-only AEB (Autonomous Emergency Braking) controller.
    CarMaker 15.1 — Win64/Linux64 Co-Simulation FMU.

    Sensor: Sensor.Radar.Vhcl.VehSensor_MRR, Obj0..Obj3 (MaxObj=4, confirmed)
    Ego speed profile: defined externally via OpenSCENARIO (.xosc)

    === Architecture: direct brake module interface ===
    This FMU controls the vehicle through VehicleControl.* (brake module), NOT
    through AccelCtrl.DesiredAx (which belongs to ACC-type longitudinal control).

    AEB works by commanding maximum brake pressure directly to the brake system:
      VehicleControl.Brake = 1.0   (full brake, 0..1 normalized)
      VehicleControl.Gas   = 0.0   (throttle cut, passed through from DrivMan
                                    when AEB is idle)

    When not active, all VehicleControl.* outputs transparently pass through
    DrivMan values (DM.Brake, DM.Gas, DM.SelectorCtrl) so normal IPGDriver
    driving is unaffected.

    === State machine ===
    State 0  MONITOR   : watching TTC — DrivMan passthrough
    State 1  FCW       : TTC <= AEB_WarningTTC — FCW signal only, no brake
    State 2  AEB BRAKE : TTC <= AEB_BrakeTTC OR dist < AEB_HardBrakeDistance
                         → VehicleControl.Brake = 1.0 immediately (no ramp,
                           no graduation — max deceleration to stop ASAP
                           per ISO 22839 / Euro NCAP AEB intent)
    State 3  PARKED    : ego_v < AEB_ParkSpeedThreshold after AEB triggered
                         → Brake = 1.0 + BrakePark = 1.0 + SelectorCtrl = -9
                           (permanent until AEB_Enable = 0)

    === Changelog from v2 ===
    - REMOVED: AccelCtrl.DesiredAx — not appropriate for AEB (ACC interface)
    - REMOVED: Graduated brake (AEB_MaxBrakeAx, AEB_KpBrake, AEB_WarningAx,
      AEB_HoldMinAx, AEB_JerkLimit, AEB_BrakeHoldTime) — AEB always fires at
      maximum brake force, not a smooth deceleration ramp
    - ADDED: VehicleControl.Brake (primary brake output, 0..1)
    - ADDED: VehicleControl.BrakePark (handbrake, 0..1)
    - ADDED: VehicleControl.SelectorCtrl (-9=P/-1=R/0=N/1=D)
    - ADDED: VehicleControl.Gas (throttle cut to 0 on AEB, passthrough otherwise)
    - ADDED: VehicleControl.Lights.Brake (brake light signal)
    - ADDED: DM.Brake / DM.Gas / DM.SelectorCtrl inputs (DrivMan passthrough)
    - KEPT: all radar filter logic (MeasStat=3, ProbExist bucket, DynProp
      oncoming rejection, lane gate, closing-speed gate)
    - KEPT: LongCtrl.AEB.* / LongCtrl.FCW.* monitoring outputs
    - KEPT: all Debug_* diagnostics
    """

    N_RADAR = 4  # VehSensor_MRR Obj0..Obj3

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        # ---------------------------------------------------------------
        # Inputs: DrivMan passthrough (DM.* → VehicleControl.* when idle)
        # ---------------------------------------------------------------
        self.DM = _NS()
        self.DM.Brake = 0.0          # DrivMan.Brake  (0..1)
        self.DM.Gas = 0.0            # DrivMan.Gas    (0..1)
        self.DM.SelectorCtrl = 1.0   # DrivMan.SelectorCtrl (-9=P,-1=R,0=N,1=D)

        # ---------------------------------------------------------------
        # Inputs: activation / ego
        # ---------------------------------------------------------------
        self.AEB_Enable = 1.0
        self.Ego_v = 0.0
        self.Radar_nObj = 4.0

        # ---------------------------------------------------------------
        # Inputs: tunable parameters (defaults = ISO/NCAP-motivated)
        # ---------------------------------------------------------------
        self.AEB_WarningTTC = 2.20      # s  — FCW alert threshold
        self.AEB_BrakeTTC = 1.60        # s  — hard brake trigger threshold
        self.AEB_HardBrakeDistance = 4.00   # m  — absolute distance gate
        self.AEB_MinClosingSpeed = 0.50 # m/s — below this: no TTC, no brake
        self.AEB_MinDistance = 5.00     # m   — safe stop margin
        self.AEB_MaxDist = 150.0        # m   — radar range gate
        self.AEB_SafeTimeGap = 0.50     # s   — following distance
        self.AEB_LaneGateY = 1.35       # m   — lane half-width gate
        self.AEB_ProbExistMin = 3.0     # bucket 0-7 (3 ≈ 75%, ISO 15623)
        self.AEB_RadarMeasStatValidValue = 3.0  # 3 = "measured" (CM enum)
        self.AEB_TargetPersistTime = 0.25  # s — hold last target after loss
        self.AEB_ParkSpeedThreshold = 0.20  # m/s — below = "stopped"

        # ---------------------------------------------------------------
        # Inputs: radar object list Obj0..Obj3
        # ---------------------------------------------------------------
        for i in range(self.N_RADAR):
            setattr(self, f"Radar_Obj{i}_DistX", 999.0)
            setattr(self, f"Radar_Obj{i}_DistY", 999.0)
            setattr(self, f"Radar_Obj{i}_DynProp", 0.0)
            setattr(self, f"Radar_Obj{i}_MeasStat", 0.0)
            setattr(self, f"Radar_Obj{i}_ObjID", -1.0)
            setattr(self, f"Radar_Obj{i}_ProbExist", 0.0)
            setattr(self, f"Radar_Obj{i}_VrelX", 0.0)

        # ---------------------------------------------------------------
        # Outputs: VehicleControl — primary brake module outputs
        # ---------------------------------------------------------------
        self.VehicleControl = _NS()
        self.VehicleControl.Brake = 0.0        # 0..1 — service brake
        self.VehicleControl.BrakePark = 0.0    # 0..1 — parking/hand brake
        self.VehicleControl.Gas = 0.0          # 0..1 — throttle
        self.VehicleControl.SelectorCtrl = 1.0 # -9=P,-1=R,0=N,1=D
        self.VehicleControl.Lights = _NS()
        self.VehicleControl.Lights.Brake = 0.0 # brake light

        # ---------------------------------------------------------------
        # Outputs: CarMaker native AEB/FCW monitoring signals
        # ---------------------------------------------------------------
        self.LongCtrl = _NS()
        self.LongCtrl.AEB = _NS()
        self.LongCtrl.AEB.SwitchedOn = 1.0
        self.LongCtrl.AEB.IsActive = 0.0
        self.LongCtrl.AEB.Time2Collision = 999.0
        self.LongCtrl.AEB.dDist = 999.0
        self.LongCtrl.AEB.dVel = 0.0
        self.LongCtrl.AEB.Target = _NS()
        self.LongCtrl.AEB.Target.ObjId = -1.0
        self.LongCtrl.AEB.Target.Vel = 0.0
        self.LongCtrl.FCW = _NS()
        self.LongCtrl.FCW.SwitchedOn = 1.0
        self.LongCtrl.FCW.WarnLevel = 0.0

        # ---------------------------------------------------------------
        # Outputs: diagnostics (backward compatible with KpiEngine)
        # ---------------------------------------------------------------
        self.AEB_State = 0.0          # 0=Monitor,1=FCW,2=Brake,3=Parked
        self.AEB_TargetValid = 0.0
        self.AEB_Warning = 0.0
        self.Debug_TTC = 999.0
        self.Debug_TargetDistX = 999.0
        self.Debug_TargetDistY = 999.0
        self.Debug_TargetObjID = -1.0
        self.Debug_EgoSpeed_mps = 0.0
        self.Debug_LeadSpeed_mps = 0.0
        self.Debug_RelativeSpeed = 0.0
        self.Debug_SafeDistance = self.AEB_MinDistance
        self.Debug_SelectedRadarIndex = -1.0
        self.Debug_RadarCandidateCount = 0.0

        # Internal runtime state
        self._aeb_triggered = False   # latched once AEB fires
        self._parked = False          # latched once ego has stopped after AEB
        self._last_target = None
        self._last_target_time = -1.0e9
        self._candidate_count = 0.0

        self._register_interface()

    # ------------------------------------------------------------------
    # FMI variable registration
    # ------------------------------------------------------------------
    def _register_interface(self):
        # ---- Inputs: DrivMan passthrough ----
        for name in ["DM.Brake", "DM.Gas", "DM.SelectorCtrl"]:
            self.register_variable(Real(name, causality=Fmi2Causality.input))

        # ---- Inputs: control / ego ----
        for name in ["AEB_Enable", "Ego_v", "Radar_nObj"]:
            self.register_variable(Real(name, causality=Fmi2Causality.input))

        # ---- Inputs: parameters ----
        for name in [
            "AEB_WarningTTC", "AEB_BrakeTTC", "AEB_HardBrakeDistance",
            "AEB_MinClosingSpeed", "AEB_MinDistance", "AEB_MaxDist",
            "AEB_SafeTimeGap", "AEB_LaneGateY",
            "AEB_ProbExistMin", "AEB_RadarMeasStatValidValue",
            "AEB_TargetPersistTime", "AEB_ParkSpeedThreshold",
        ]:
            self.register_variable(Real(name, causality=Fmi2Causality.input))

        # ---- Inputs: radar Obj0..Obj3 ----
        for i in range(self.N_RADAR):
            for sig in ["DistX", "DistY", "DynProp", "MeasStat",
                        "ObjID", "ProbExist", "VrelX"]:
                self.register_variable(
                    Real(f"Radar_Obj{i}_{sig}", causality=Fmi2Causality.input))

        # ---- Outputs: VehicleControl brake module ----
        for name in [
            "VehicleControl.Brake",
            "VehicleControl.BrakePark",
            "VehicleControl.Gas",
            "VehicleControl.SelectorCtrl",
            "VehicleControl.Lights.Brake",
        ]:
            self.register_variable(Real(name, causality=Fmi2Causality.output))

        # ---- Outputs: AEB/FCW monitoring ----
        for name in [
            "LongCtrl.AEB.SwitchedOn",
            "LongCtrl.AEB.IsActive",
            "LongCtrl.AEB.Time2Collision",
            "LongCtrl.AEB.dDist",
            "LongCtrl.AEB.dVel",
            "LongCtrl.AEB.Target.ObjId",
            "LongCtrl.AEB.Target.Vel",
            "LongCtrl.FCW.SwitchedOn",
            "LongCtrl.FCW.WarnLevel",
        ]:
            self.register_variable(Real(name, causality=Fmi2Causality.output))

        # ---- Outputs: diagnostics ----
        for name in [
            "AEB_State", "AEB_TargetValid", "AEB_Warning",
            "Debug_TTC", "Debug_TargetDistX", "Debug_TargetDistY",
            "Debug_TargetObjID", "Debug_EgoSpeed_mps", "Debug_LeadSpeed_mps",
            "Debug_RelativeSpeed", "Debug_SafeDistance",
            "Debug_SelectedRadarIndex", "Debug_RadarCandidateCount",
        ]:
            self.register_variable(Real(name, causality=Fmi2Causality.output))

    # ------------------------------------------------------------------
    # FMI step
    # ------------------------------------------------------------------
    def do_step(self, current_time, step_size):
        t = float(current_time)
        ego_v = max(0.0, float(self.Ego_v))
        self.Debug_EgoSpeed_mps = ego_v

        # ---- AEB disabled → release to DrivMan, reset state ----
        if self.AEB_Enable < 0.5:
            self._reset_runtime()
            self._write_passthrough()
            self.LongCtrl.AEB.SwitchedOn = 0.0
            self.LongCtrl.FCW.SwitchedOn = 0.0
            self._clear_diagnostics(ego_v)
            return True

        self.LongCtrl.AEB.SwitchedOn = 1.0
        self.LongCtrl.FCW.SwitchedOn = 1.0

        # ---- Parked state is permanent until AEB_Enable toggled ----
        if self._parked:
            self._write_parked()
            self._update_diagnostics_no_target(ego_v, state=3.0)
            return True

        # ---- Select radar target ----
        target = self._select_radar_target(t)

        # ---- AEB already triggered: keep full brake until stopped ----
        if self._aeb_triggered:
            if ego_v < float(self.AEB_ParkSpeedThreshold):
                self._parked = True
                self._write_parked()
                self._update_diagnostics_no_target(ego_v, state=3.0)
            else:
                self._write_hard_brake()
                self._update_diagnostics_active(ego_v, target, state=2.0)
            return True

        # ---- No valid target: monitor mode passthrough ----
        if target is None:
            self._write_passthrough()
            self._update_diagnostics_no_target(ego_v, state=0.0)
            return True

        # ---- Evaluate TTC ----
        idx, obj_id, dist_x, dist_y, vrel_x = target
        lead_speed = max(0.0, ego_v + vrel_x)
        closing_speed = max(0.0, -vrel_x)   # positive = closing
        is_closing = closing_speed > max(0.0, float(self.AEB_MinClosingSpeed))
        ttc = dist_x / closing_speed if is_closing else 999.0
        safe_dist = max(float(self.AEB_MinDistance),
                        ego_v * max(0.0, float(self.AEB_SafeTimeGap)))

        # ---- State machine ----
        hard_brake_dist = float(self.AEB_HardBrakeDistance)
        brake_ttc = float(self.AEB_BrakeTTC)
        warn_ttc = float(self.AEB_WarningTTC)

        aeb_trigger = (ttc <= brake_ttc and is_closing) or \
                      (dist_x <= hard_brake_dist)

        if aeb_trigger:
            # Hard brake — maximum deceleration, immediate, no ramp
            self._aeb_triggered = True
            self._write_hard_brake()
            state = 2.0
            warning = 0.0
        elif ttc <= warn_ttc and is_closing:
            # FCW warning only — passthrough DrivMan brake
            self._write_passthrough()
            state = 1.0
            warning = 1.0
        else:
            # Monitor — passthrough
            self._write_passthrough()
            state = 0.0
            warning = 0.0

        # ---- Write diagnostics ----
        self.AEB_State = state
        self.AEB_Warning = warning
        self.AEB_TargetValid = 1.0
        self.Debug_TTC = ttc
        self.Debug_TargetDistX = dist_x
        self.Debug_TargetDistY = dist_y
        self.Debug_TargetObjID = obj_id
        self.Debug_EgoSpeed_mps = ego_v
        self.Debug_LeadSpeed_mps = lead_speed
        self.Debug_RelativeSpeed = closing_speed
        self.Debug_SafeDistance = safe_dist
        self.Debug_SelectedRadarIndex = float(idx)
        self.Debug_RadarCandidateCount = self._candidate_count

        self.LongCtrl.AEB.IsActive = 1.0 if aeb_trigger else 0.0
        self.LongCtrl.AEB.Time2Collision = ttc
        self.LongCtrl.AEB.dDist = dist_x
        self.LongCtrl.AEB.dVel = closing_speed
        self.LongCtrl.AEB.Target.ObjId = obj_id
        self.LongCtrl.AEB.Target.Vel = lead_speed
        self.LongCtrl.FCW.WarnLevel = warning

        return True

    # ------------------------------------------------------------------
    # Vehicle control write helpers
    # ------------------------------------------------------------------
    def _write_hard_brake(self):
        """AEB active: full service brake, throttle cut, brake lights on."""
        self.VehicleControl.Brake = 1.0
        self.VehicleControl.BrakePark = 0.0   # service brake handles it
        self.VehicleControl.Gas = 0.0
        self.VehicleControl.SelectorCtrl = float(self.DM.SelectorCtrl)
        self.VehicleControl.Lights.Brake = 1.0
        self.LongCtrl.AEB.IsActive = 1.0

    def _write_parked(self):
        """After stop: service brake + handbrake + shift to P."""
        self.VehicleControl.Brake = 1.0        # keep service brake
        self.VehicleControl.BrakePark = 1.0    # apply handbrake
        self.VehicleControl.Gas = 0.0
        self.VehicleControl.SelectorCtrl = -9.0  # Park
        self.VehicleControl.Lights.Brake = 1.0
        self.LongCtrl.AEB.IsActive = 1.0

    def _write_passthrough(self):
        """Not active: transparently forward DrivMan values."""
        self.VehicleControl.Brake = max(0.0, min(1.0, float(self.DM.Brake)))
        self.VehicleControl.BrakePark = 0.0
        self.VehicleControl.Gas = max(0.0, min(1.0, float(self.DM.Gas)))
        self.VehicleControl.SelectorCtrl = float(self.DM.SelectorCtrl)
        self.VehicleControl.Lights.Brake = 1.0 if float(self.DM.Brake) > 0.05 else 0.0
        self.LongCtrl.AEB.IsActive = 0.0

    # ------------------------------------------------------------------
    # Target selection
    # ------------------------------------------------------------------
    def _select_radar_target(self, current_time):
        n = int(max(0, min(self.N_RADAR, round(float(self.Radar_nObj)))))
        best = None
        self._candidate_count = 0.0

        for i in range(n):
            dist_x = float(getattr(self, f"Radar_Obj{i}_DistX"))
            dist_y = float(getattr(self, f"Radar_Obj{i}_DistY"))
            obj_id = float(getattr(self, f"Radar_Obj{i}_ObjID"))
            prob = float(getattr(self, f"Radar_Obj{i}_ProbExist"))
            meas = float(getattr(self, f"Radar_Obj{i}_MeasStat"))
            dyn_prop = float(getattr(self, f"Radar_Obj{i}_DynProp"))
            vrel_x = float(getattr(self, f"Radar_Obj{i}_VrelX"))

            if not self._valid_object(dist_x, dist_y, prob, meas, dyn_prop):
                continue

            self._candidate_count += 1.0
            if best is None or dist_x < best[2]:
                best = (i, obj_id, dist_x, dist_y, vrel_x)

        if best is not None:
            self._last_target = best
            self._last_target_time = current_time
            return best

        # Persist last known target briefly (helps with radar dropouts)
        persist = max(0.0, float(self.AEB_TargetPersistTime))
        if self._last_target is not None and \
                current_time <= self._last_target_time + persist:
            return self._last_target
        return None

    def _valid_object(self, dist_x, dist_y, prob, meas, dyn_prop):
        # Positional gates
        if dist_x <= 0.0 or dist_x > float(self.AEB_MaxDist):
            return False
        if abs(dist_y) > float(self.AEB_LaneGateY):
            return False
        # ProbExist: CM integer bucket 0-7 (3 ≈ 75%)
        if prob < float(self.AEB_ProbExistMin):
            return False
        # MeasStat: must equal valid value (3 = measured); gate disables if <0
        valid_meas = float(self.AEB_RadarMeasStatValidValue)
        if valid_meas >= 0.0 and abs(meas - valid_meas) > 0.01:
            return False
        # DynProp: reject oncoming (4) — keep stationary(1)/stopped(2)/moving(3)
        # NOTE: stationary targets MUST pass — CCRs test is stationary TV
        if abs(dyn_prop - 4.0) < 0.01:
            return False
        return True

    # ------------------------------------------------------------------
    # Diagnostic helpers
    # ------------------------------------------------------------------
    def _update_diagnostics_no_target(self, ego_v, state):
        self.AEB_State = state
        self.AEB_Warning = 0.0
        self.AEB_TargetValid = 0.0
        self.Debug_TTC = 999.0
        self.Debug_TargetDistX = 999.0
        self.Debug_TargetDistY = 999.0
        self.Debug_TargetObjID = -1.0
        self.Debug_EgoSpeed_mps = ego_v
        self.Debug_LeadSpeed_mps = 0.0
        self.Debug_RelativeSpeed = 0.0
        self.Debug_SafeDistance = max(float(self.AEB_MinDistance),
                                      ego_v * max(0.0, float(self.AEB_SafeTimeGap)))
        self.Debug_SelectedRadarIndex = -1.0
        self.Debug_RadarCandidateCount = 0.0
        self.LongCtrl.AEB.Time2Collision = 999.0
        self.LongCtrl.AEB.dDist = 999.0
        self.LongCtrl.AEB.dVel = 0.0
        self.LongCtrl.AEB.Target.ObjId = -1.0
        self.LongCtrl.AEB.Target.Vel = 0.0
        self.LongCtrl.FCW.WarnLevel = 0.0

    def _update_diagnostics_active(self, ego_v, target, state):
        if target is None:
            self._update_diagnostics_no_target(ego_v, state)
            return
        idx, obj_id, dist_x, dist_y, vrel_x = target
        closing = max(0.0, -vrel_x)
        self.AEB_State = state
        self.AEB_Warning = 0.0
        self.AEB_TargetValid = 1.0
        self.Debug_TTC = dist_x / closing if closing > 0.01 else 999.0
        self.Debug_TargetDistX = dist_x
        self.Debug_TargetDistY = dist_y
        self.Debug_TargetObjID = obj_id
        self.Debug_EgoSpeed_mps = ego_v
        self.Debug_LeadSpeed_mps = max(0.0, ego_v + vrel_x)
        self.Debug_RelativeSpeed = closing
        self.Debug_SafeDistance = max(float(self.AEB_MinDistance),
                                      ego_v * max(0.0, float(self.AEB_SafeTimeGap)))
        self.Debug_SelectedRadarIndex = float(idx)
        self.Debug_RadarCandidateCount = self._candidate_count
        self.LongCtrl.AEB.Time2Collision = self.Debug_TTC
        self.LongCtrl.AEB.dDist = dist_x
        self.LongCtrl.AEB.dVel = closing
        self.LongCtrl.AEB.Target.ObjId = obj_id
        self.LongCtrl.AEB.Target.Vel = self.Debug_LeadSpeed_mps
        self.LongCtrl.FCW.WarnLevel = 0.0

    def _clear_diagnostics(self, ego_v):
        self._update_diagnostics_no_target(ego_v, state=0.0)

    def _reset_runtime(self):
        self._aeb_triggered = False
        self._parked = False
        self._last_target = None
        self._last_target_time = -1.0e9
        self._candidate_count = 0.0
