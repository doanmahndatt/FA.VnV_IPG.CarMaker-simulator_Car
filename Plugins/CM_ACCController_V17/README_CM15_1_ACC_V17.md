# CM_ACCController_V17_CutOutEdgeResume

## Purpose
This version fixes the cut-out state issue observed in V15.2/V15.x:

- `Debug.Fusion.Active` and `Debug.Target.Valid` can correctly change `1 -> 0` when LeadObj leaves ego lane.
- `Debug.CutOutRelease` is now driven by the falling edge of `Debug.Fusion.Active` (`1 -> 0`) and latched through the resume-to-set-speed phase.
- Ego resumes to the latched ACC/scenario set speed, not to the previous LeadSpeed/FollowTargetSpeed.

## State rule

```text
SPEED_CONTROL:
  No LeadObj yet, Fusion.Active=0, CutOutRelease=0.

FOLLOW:
  Same-lane LeadObj accepted, Fusion.Active=1, Target.Valid=1.

CUTOUT_RESUME_SET_SPEED:
  Previous Fusion.Active=1 and current Fusion.Active=0.
  CutOutRelease=1 until Ego reaches latched set speed tolerance.
```

## Critical expected behavior

```text
Before cut-out:
  Debug.Fusion.Active = 1
  Debug.Target.Valid  = 1
  Debug.CutOutRelease = 0

At cut-out:
  Debug.Fusion.Active = 0
  Debug.Target.Valid  = 0
  Debug.CutOutRelease = 1
  Debug.Mode          = 1
  Debug.Reason        = 17

Resume phase:
  Debug.FollowTargetSpeed = ACC.SetSpeed_kph / 3.6
  AccelCtrl.DesiredAx > 0 if Car.v < set speed
```

## Recommended tuning for 2-3s resume after cut-out

```text
ACC.KpSpeed    = 0.80
ACC.MaxAx      = 2.8
ACC.JerkLimit  = 4.0
```

For a speed gap of about 30 km/h, `ACC.MaxAx=2.8 m/s²` can theoretically close the gap in roughly 3 seconds if the vehicle dynamics accept the acceleration command.

## Mapping
Use `CM15_1_ACC_V17_CUTOUT_EDGE_RESUME_SIGNAL_MAPPING_ALPHA.md`. It is sorted alphabetically by FMU signal name and contains all exposed inputs and outputs.
