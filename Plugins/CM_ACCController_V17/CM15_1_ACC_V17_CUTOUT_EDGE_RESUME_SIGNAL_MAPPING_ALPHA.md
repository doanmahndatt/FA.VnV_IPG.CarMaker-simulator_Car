# CM15.1 ACC Controller V17 CutOutEdgeResume - Signal Mapping A→Z

## Summary

- FMU: `CM_ACCController_V17_CutOutEdgeResume.fmu`

- modelIdentifier: `CM_ACCController_V17`

- Object scan: `Camera.Obj0..Obj5` + `Radar.Obj0..Obj5`

- Sort rule: FMU signal name alphabetically A→Z

- Critical fix: `Debug.CutOutRelease` is latched from `Debug.Fusion.Active` falling edge `1 -> 0` until Ego reaches latched scenario set speed.


## Required input mapping, A→Z

| FMU signal | VR | Mapping / Value | Unit / Note |
|---|---:|---|---|
| `ACC.AllowAccelInFollow` | 79 | constant 0 | default=0 |
| `ACC.BrakeHoldAx` | 77 | constant -1.0 | m/s2; default=-1.0 |
| `ACC.BrakeHoldTime` | 80 | constant 0.0 | s; default=0.0 |
| `ACC.BrakeOnlyEnable` | 107 | constant 1 | default=1 |
| `ACC.CameraLaneTolerance` | 111 | constant 0.1 | default=0.1 |
| `ACC.CameraOnlyEnable` | 96 | constant 0 | default=0 |
| `ACC.CutOutReleaseDelay` | 113 | constant 0.0 | s; default=0.0 |
| `ACC.DistJumpThreshold` | 81 | constant 50 | m; default=50 |
| `ACC.DynamicStopGuardTime` | 87 | constant 2.7 | s; default=2.7 |
| `ACC.EgoLaneValue` | 110 | constant 0 | default=0 |
| `ACC.EmergencyAx` | 66 | constant -6.0 | m/s2; default=-6.0 |
| `ACC.Enable` | 2 | constant 1 | default=1 |
| `ACC.FollowMaxDist` | 85 | constant 120 | m; default=120 |
| `ACC.FollowReleaseGap` | 75 | constant 8.0 | m; default=8.0 |
| `ACC.FusionDistTolerance` | 94 | constant 6.5 | m; default=6.5 |
| `ACC.FusionLateralTolerance` | 95 | constant 0.45 | m; default=0.45 |
| `ACC.FusionRequireBoth` | 98 | constant 1 | default=1 |
| `ACC.IgnoreStationaryAbove_kph` | 86 | constant 60 | km/h; default=60 |
| `ACC.JerkLimit` | 70 | constant 1.8 | m/s3; default=1.8 |
| `ACC.KdRelSpeed` | 69 | constant 1.60 | 1/s; default=1.60 |
| `ACC.KgapSpeed` | 73 | constant 0.010 | 1/s; default=0.010 |
| `ACC.KpFollowSpeed` | 74 | constant 0.24 | 1/s; default=0.24 |
| `ACC.KpGap` | 68 | constant 0.06 | 1/s2; default=0.06 |
| `ACC.KpSpeed` | 67 | constant 0.80 | 1/s; default=0.80 |
| `ACC.LaneGateY` | 62 | constant 0.85 | m; default=0.85 |
| `ACC.LeadConfirmTime` | 112 | constant 0.0 | s; default=0.0 |
| `ACC.LeadScoreDxWeight` | 116 | constant 1.0 | default=1.0 |
| `ACC.LeadScoreLatWeight` | 115 | constant 2.0 | default=2.0 |
| `ACC.LeadScoreMatchWeight` | 117 | constant 4.0 | default=4.0 |
| `ACC.LeadSwitchTime` | 114 | constant 0.0 | s; default=0.0 |
| `ACC.LowSpeedHoldAx` | 88 | constant -1.0 | m/s2; default=-1.0 |
| `ACC.MaxAx` | 64 | constant 2.8 | m/s2; default=2.8 |
| `ACC.MaxRange` | 63 | constant 220 | m; default=220 |
| `ACC.MeasStatValidValue` | 99 | constant 3 | default=3 |
| `ACC.MinAx` | 65 | constant -3.0 | m/s2; default=-3.0 |
| `ACC.MinDist` | 61 | constant 10.0 | m; default=10.0 |
| `ACC.ProbExistMin` | 97 | constant 2.0 | default=2.0 |
| `ACC.RadarOnlyEnable` | 83 | constant 0 | default=0 |
| `ACC.RequireCameraLane` | 109 | constant 0 | default=0 |
| `ACC.SetSpeed_kph` | 1 | Driver.ReCon.Speed hoặc constant setSpeed theo xOSC/scenario | km/h; default=90 |
| `ACC.SpeedTol_kph_Straight` | 108 | constant 1.0 | km/h; default=1.0 |
| `ACC.StopGuardDist` | 76 | constant 18.0 | m; default=18.0 |
| `ACC.TimeGap` | 60 | constant 2.3 | s; default=2.3 |
| `ACC.TimeGapLevel` | 84 | constant 4 | default=4 |
| `ACC.TTCEmergency` | 72 | constant 3.5 | s; default=3.5 |
| `ACC.TTCWarning` | 71 | constant 11.0 | s; default=11.0 |
| `ACC.VrelEstimateEnable` | 82 | constant 1 | default=1 |
| `ACC.WarningAx` | 78 | constant -1.6 | m/s2; default=-1.6 |
| `Camera.AllowUnknownType` | 93 | constant 1 | default=1 |
| `Camera.ForwardAxis` | 89 | constant 0 | default=0 |
| `Camera.LateralAxis` | 90 | constant 1 | default=1 |
| `Camera.MinConfidence` | 91 | constant 0.0 | default=0.0 |
| `Camera.nObj` | 10 | Sensor.Camera.Vhcl.<CameraName>.nObj hoặc constant 6 | default=0 |
| `Camera.Obj0.Confidence` | 1002 | Sensor.Camera.Vhcl.<CameraName>.Obj.0.Confidence hoặc constant 1 nếu CM không expose |  |
| `Camera.Obj0.Facing` | 1003 | Sensor.Camera.Vhcl.<CameraName>.Obj.0.Facing hoặc constant 1 |  |
| `Camera.Obj0.MBR.BL_X` | 1004 | Sensor.Camera.Vhcl.<CameraName>.Obj.0.MBR.BL_X | m |
| `Camera.Obj0.MBR.BL_Y` | 1005 | Sensor.Camera.Vhcl.<CameraName>.Obj.0.MBR.BL_Y | m |
| `Camera.Obj0.MBR.BL_Z` | 1006 | Sensor.Camera.Vhcl.<CameraName>.Obj.0.MBR.BL_Z | m |
| `Camera.Obj0.MBR.TR_X` | 1007 | Sensor.Camera.Vhcl.<CameraName>.Obj.0.MBR.TR_X | m |
| `Camera.Obj0.MBR.TR_Y` | 1008 | Sensor.Camera.Vhcl.<CameraName>.Obj.0.MBR.TR_Y | m |
| `Camera.Obj0.MBR.TR_Z` | 1009 | Sensor.Camera.Vhcl.<CameraName>.Obj.0.MBR.TR_Z | m |
| `Camera.Obj0.ObjID` | 1000 | Sensor.Camera.Vhcl.<CameraName>.Obj.0.ObjID |  |
| `Camera.Obj0.Type` | 1001 | Sensor.Camera.Vhcl.<CameraName>.Obj.0.Type |  |
| `Camera.Obj1.Confidence` | 1012 | Sensor.Camera.Vhcl.<CameraName>.Obj.1.Confidence hoặc constant 1 nếu CM không expose |  |
| `Camera.Obj1.Facing` | 1013 | Sensor.Camera.Vhcl.<CameraName>.Obj.1.Facing hoặc constant 1 |  |
| `Camera.Obj1.MBR.BL_X` | 1014 | Sensor.Camera.Vhcl.<CameraName>.Obj.1.MBR.BL_X | m |
| `Camera.Obj1.MBR.BL_Y` | 1015 | Sensor.Camera.Vhcl.<CameraName>.Obj.1.MBR.BL_Y | m |
| `Camera.Obj1.MBR.BL_Z` | 1016 | Sensor.Camera.Vhcl.<CameraName>.Obj.1.MBR.BL_Z | m |
| `Camera.Obj1.MBR.TR_X` | 1017 | Sensor.Camera.Vhcl.<CameraName>.Obj.1.MBR.TR_X | m |
| `Camera.Obj1.MBR.TR_Y` | 1018 | Sensor.Camera.Vhcl.<CameraName>.Obj.1.MBR.TR_Y | m |
| `Camera.Obj1.MBR.TR_Z` | 1019 | Sensor.Camera.Vhcl.<CameraName>.Obj.1.MBR.TR_Z | m |
| `Camera.Obj1.ObjID` | 1010 | Sensor.Camera.Vhcl.<CameraName>.Obj.1.ObjID |  |
| `Camera.Obj1.Type` | 1011 | Sensor.Camera.Vhcl.<CameraName>.Obj.1.Type |  |
| `Camera.Obj2.Confidence` | 1022 | Sensor.Camera.Vhcl.<CameraName>.Obj.2.Confidence hoặc constant 1 nếu CM không expose |  |
| `Camera.Obj2.Facing` | 1023 | Sensor.Camera.Vhcl.<CameraName>.Obj.2.Facing hoặc constant 1 |  |
| `Camera.Obj2.MBR.BL_X` | 1024 | Sensor.Camera.Vhcl.<CameraName>.Obj.2.MBR.BL_X | m |
| `Camera.Obj2.MBR.BL_Y` | 1025 | Sensor.Camera.Vhcl.<CameraName>.Obj.2.MBR.BL_Y | m |
| `Camera.Obj2.MBR.BL_Z` | 1026 | Sensor.Camera.Vhcl.<CameraName>.Obj.2.MBR.BL_Z | m |
| `Camera.Obj2.MBR.TR_X` | 1027 | Sensor.Camera.Vhcl.<CameraName>.Obj.2.MBR.TR_X | m |
| `Camera.Obj2.MBR.TR_Y` | 1028 | Sensor.Camera.Vhcl.<CameraName>.Obj.2.MBR.TR_Y | m |
| `Camera.Obj2.MBR.TR_Z` | 1029 | Sensor.Camera.Vhcl.<CameraName>.Obj.2.MBR.TR_Z | m |
| `Camera.Obj2.ObjID` | 1020 | Sensor.Camera.Vhcl.<CameraName>.Obj.2.ObjID |  |
| `Camera.Obj2.Type` | 1021 | Sensor.Camera.Vhcl.<CameraName>.Obj.2.Type |  |
| `Camera.Obj3.Confidence` | 1032 | Sensor.Camera.Vhcl.<CameraName>.Obj.3.Confidence hoặc constant 1 nếu CM không expose |  |
| `Camera.Obj3.Facing` | 1033 | Sensor.Camera.Vhcl.<CameraName>.Obj.3.Facing hoặc constant 1 |  |
| `Camera.Obj3.MBR.BL_X` | 1034 | Sensor.Camera.Vhcl.<CameraName>.Obj.3.MBR.BL_X | m |
| `Camera.Obj3.MBR.BL_Y` | 1035 | Sensor.Camera.Vhcl.<CameraName>.Obj.3.MBR.BL_Y | m |
| `Camera.Obj3.MBR.BL_Z` | 1036 | Sensor.Camera.Vhcl.<CameraName>.Obj.3.MBR.BL_Z | m |
| `Camera.Obj3.MBR.TR_X` | 1037 | Sensor.Camera.Vhcl.<CameraName>.Obj.3.MBR.TR_X | m |
| `Camera.Obj3.MBR.TR_Y` | 1038 | Sensor.Camera.Vhcl.<CameraName>.Obj.3.MBR.TR_Y | m |
| `Camera.Obj3.MBR.TR_Z` | 1039 | Sensor.Camera.Vhcl.<CameraName>.Obj.3.MBR.TR_Z | m |
| `Camera.Obj3.ObjID` | 1030 | Sensor.Camera.Vhcl.<CameraName>.Obj.3.ObjID |  |
| `Camera.Obj3.Type` | 1031 | Sensor.Camera.Vhcl.<CameraName>.Obj.3.Type |  |
| `Camera.Obj4.Confidence` | 1042 | Sensor.Camera.Vhcl.<CameraName>.Obj.4.Confidence hoặc constant 1 nếu CM không expose |  |
| `Camera.Obj4.Facing` | 1043 | Sensor.Camera.Vhcl.<CameraName>.Obj.4.Facing hoặc constant 1 |  |
| `Camera.Obj4.MBR.BL_X` | 1044 | Sensor.Camera.Vhcl.<CameraName>.Obj.4.MBR.BL_X | m |
| `Camera.Obj4.MBR.BL_Y` | 1045 | Sensor.Camera.Vhcl.<CameraName>.Obj.4.MBR.BL_Y | m |
| `Camera.Obj4.MBR.BL_Z` | 1046 | Sensor.Camera.Vhcl.<CameraName>.Obj.4.MBR.BL_Z | m |
| `Camera.Obj4.MBR.TR_X` | 1047 | Sensor.Camera.Vhcl.<CameraName>.Obj.4.MBR.TR_X | m |
| `Camera.Obj4.MBR.TR_Y` | 1048 | Sensor.Camera.Vhcl.<CameraName>.Obj.4.MBR.TR_Y | m |
| `Camera.Obj4.MBR.TR_Z` | 1049 | Sensor.Camera.Vhcl.<CameraName>.Obj.4.MBR.TR_Z | m |
| `Camera.Obj4.ObjID` | 1040 | Sensor.Camera.Vhcl.<CameraName>.Obj.4.ObjID |  |
| `Camera.Obj4.Type` | 1041 | Sensor.Camera.Vhcl.<CameraName>.Obj.4.Type |  |
| `Camera.Obj5.Confidence` | 1052 | Sensor.Camera.Vhcl.<CameraName>.Obj.5.Confidence hoặc constant 1 nếu CM không expose |  |
| `Camera.Obj5.Facing` | 1053 | Sensor.Camera.Vhcl.<CameraName>.Obj.5.Facing hoặc constant 1 |  |
| `Camera.Obj5.MBR.BL_X` | 1054 | Sensor.Camera.Vhcl.<CameraName>.Obj.5.MBR.BL_X | m |
| `Camera.Obj5.MBR.BL_Y` | 1055 | Sensor.Camera.Vhcl.<CameraName>.Obj.5.MBR.BL_Y | m |
| `Camera.Obj5.MBR.BL_Z` | 1056 | Sensor.Camera.Vhcl.<CameraName>.Obj.5.MBR.BL_Z | m |
| `Camera.Obj5.MBR.TR_X` | 1057 | Sensor.Camera.Vhcl.<CameraName>.Obj.5.MBR.TR_X | m |
| `Camera.Obj5.MBR.TR_Y` | 1058 | Sensor.Camera.Vhcl.<CameraName>.Obj.5.MBR.TR_Y | m |
| `Camera.Obj5.MBR.TR_Z` | 1059 | Sensor.Camera.Vhcl.<CameraName>.Obj.5.MBR.TR_Z | m |
| `Camera.Obj5.ObjID` | 1050 | Sensor.Camera.Vhcl.<CameraName>.Obj.5.ObjID |  |
| `Camera.Obj5.Type` | 1051 | Sensor.Camera.Vhcl.<CameraName>.Obj.5.Type |  |
| `Camera.RequireFacing` | 92 | constant 0 | default=0 |
| `Ego.v` | 0 | Car.v | m/s |
| `Radar.Obj0.DistX` | 2002 | Sensor.Radar.Vhcl.<RadarName>.Obj0.DistX | m |
| `Radar.Obj0.DistY` | 2003 | Sensor.Radar.Vhcl.<RadarName>.Obj0.DistY | m |
| `Radar.Obj0.DynProp` | 2006 | Sensor.Radar.Vhcl.<RadarName>.Obj0.DynProp hoặc constant 0 |  |
| `Radar.Obj0.MeasStat` | 2000 | Sensor.Radar.Vhcl.<RadarName>.Obj0.MeasStat |  |
| `Radar.Obj0.ObjID` | 2001 | Sensor.Radar.Vhcl.<RadarName>.Obj0.ObjId/ObjID |  |
| `Radar.Obj0.ProbExist` | 2005 | Sensor.Radar.Vhcl.<RadarName>.Obj0.ProbExist |  |
| `Radar.Obj0.VrelX` | 2004 | Sensor.Radar.Vhcl.<RadarName>.Obj0.VrelX | m/s |
| `Radar.Obj1.DistX` | 2009 | Sensor.Radar.Vhcl.<RadarName>.Obj1.DistX | m |
| `Radar.Obj1.DistY` | 2010 | Sensor.Radar.Vhcl.<RadarName>.Obj1.DistY | m |
| `Radar.Obj1.DynProp` | 2013 | Sensor.Radar.Vhcl.<RadarName>.Obj1.DynProp hoặc constant 0 |  |
| `Radar.Obj1.MeasStat` | 2007 | Sensor.Radar.Vhcl.<RadarName>.Obj1.MeasStat |  |
| `Radar.Obj1.ObjID` | 2008 | Sensor.Radar.Vhcl.<RadarName>.Obj1.ObjId/ObjID |  |
| `Radar.Obj1.ProbExist` | 2012 | Sensor.Radar.Vhcl.<RadarName>.Obj1.ProbExist |  |
| `Radar.Obj1.VrelX` | 2011 | Sensor.Radar.Vhcl.<RadarName>.Obj1.VrelX | m/s |
| `Radar.Obj2.DistX` | 2016 | Sensor.Radar.Vhcl.<RadarName>.Obj2.DistX | m |
| `Radar.Obj2.DistY` | 2017 | Sensor.Radar.Vhcl.<RadarName>.Obj2.DistY | m |
| `Radar.Obj2.DynProp` | 2020 | Sensor.Radar.Vhcl.<RadarName>.Obj2.DynProp hoặc constant 0 |  |
| `Radar.Obj2.MeasStat` | 2014 | Sensor.Radar.Vhcl.<RadarName>.Obj2.MeasStat |  |
| `Radar.Obj2.ObjID` | 2015 | Sensor.Radar.Vhcl.<RadarName>.Obj2.ObjId/ObjID |  |
| `Radar.Obj2.ProbExist` | 2019 | Sensor.Radar.Vhcl.<RadarName>.Obj2.ProbExist |  |
| `Radar.Obj2.VrelX` | 2018 | Sensor.Radar.Vhcl.<RadarName>.Obj2.VrelX | m/s |
| `Radar.Obj3.DistX` | 2023 | Sensor.Radar.Vhcl.<RadarName>.Obj3.DistX | m |
| `Radar.Obj3.DistY` | 2024 | Sensor.Radar.Vhcl.<RadarName>.Obj3.DistY | m |
| `Radar.Obj3.DynProp` | 2027 | Sensor.Radar.Vhcl.<RadarName>.Obj3.DynProp hoặc constant 0 |  |
| `Radar.Obj3.MeasStat` | 2021 | Sensor.Radar.Vhcl.<RadarName>.Obj3.MeasStat |  |
| `Radar.Obj3.ObjID` | 2022 | Sensor.Radar.Vhcl.<RadarName>.Obj3.ObjId/ObjID |  |
| `Radar.Obj3.ProbExist` | 2026 | Sensor.Radar.Vhcl.<RadarName>.Obj3.ProbExist |  |
| `Radar.Obj3.VrelX` | 2025 | Sensor.Radar.Vhcl.<RadarName>.Obj3.VrelX | m/s |
| `Radar.Obj4.DistX` | 2030 | Sensor.Radar.Vhcl.<RadarName>.Obj4.DistX | m |
| `Radar.Obj4.DistY` | 2031 | Sensor.Radar.Vhcl.<RadarName>.Obj4.DistY | m |
| `Radar.Obj4.DynProp` | 2034 | Sensor.Radar.Vhcl.<RadarName>.Obj4.DynProp hoặc constant 0 |  |
| `Radar.Obj4.MeasStat` | 2028 | Sensor.Radar.Vhcl.<RadarName>.Obj4.MeasStat |  |
| `Radar.Obj4.ObjID` | 2029 | Sensor.Radar.Vhcl.<RadarName>.Obj4.ObjId/ObjID |  |
| `Radar.Obj4.ProbExist` | 2033 | Sensor.Radar.Vhcl.<RadarName>.Obj4.ProbExist |  |
| `Radar.Obj4.VrelX` | 2032 | Sensor.Radar.Vhcl.<RadarName>.Obj4.VrelX | m/s |
| `Radar.Obj5.DistX` | 2037 | Sensor.Radar.Vhcl.<RadarName>.Obj5.DistX | m |
| `Radar.Obj5.DistY` | 2038 | Sensor.Radar.Vhcl.<RadarName>.Obj5.DistY | m |
| `Radar.Obj5.DynProp` | 2041 | Sensor.Radar.Vhcl.<RadarName>.Obj5.DynProp hoặc constant 0 |  |
| `Radar.Obj5.MeasStat` | 2035 | Sensor.Radar.Vhcl.<RadarName>.Obj5.MeasStat |  |
| `Radar.Obj5.ObjID` | 2036 | Sensor.Radar.Vhcl.<RadarName>.Obj5.ObjId/ObjID |  |
| `Radar.Obj5.ProbExist` | 2040 | Sensor.Radar.Vhcl.<RadarName>.Obj5.ProbExist |  |
| `Radar.Obj5.VrelX` | 2039 | Sensor.Radar.Vhcl.<RadarName>.Obj5.VrelX | m/s |

## Output / debug monitor mapping, A→Z

| FMU signal | VR | Map / Monitor | Unit / Meaning |
|---|---:|---|---|
| `AccelCtrl.ACC.DesiredAx` | 3001 | monitor/debug output trong IPG Control | m/s2; ACC desired acceleration debug |
| `AccelCtrl.ACC.DesiredDist` | 3002 | monitor/debug output trong IPG Control | m; ACC desired following distance |
| `AccelCtrl.ACC.DesiredSpd` | 3003 | monitor/debug output trong IPG Control | m/s; ACC desired cruise/follow speed |
| `AccelCtrl.ACC.DesiredTGap` | 3004 | monitor/debug output trong IPG Control | s; Effective ACC time gap |
| `AccelCtrl.ACC.IsActive` | 3005 | monitor/debug output trong IPG Control | ACC active flag |
| `AccelCtrl.ACC.Time2Collision` | 3006 | monitor/debug output trong IPG Control | s; Time to collision |
| `AccelCtrl.DesiredAx` | 3000 | AccelCtrl.DesiredAx | m/s2; Main desired longitudinal acceleration for CarMaker AccelCtrl |
| `Debug.BrakeHoldActive` | 3033 | monitor/debug output trong IPG Control | Brake hold active |
| `Debug.BrakeOnlyActive` | 3046 | monitor/debug output trong IPG Control | Brake-only active flag |
| `Debug.Camera.DistX` | 3041 | monitor/debug output trong IPG Control | m; Selected camera candidate longitudinal distance |
| `Debug.Camera.DistY` | 3042 | monitor/debug output trong IPG Control | m; Selected camera candidate lateral distance |
| `Debug.CameraCandidateValid` | 3038 | monitor/debug output trong IPG Control | Number of valid camera candidates |
| `Debug.CutInPending` | 3054 | monitor/debug output trong IPG Control | Lead candidate is being confirmed before cut-in accept |
| `Debug.CutOutRelease` | 3055 | monitor/debug output trong IPG Control | V17 latched cut-out resume state: 1 after Fusion.Active falling edge 1->0 until Ego reaches latched set speed |
| `Debug.DistXInvalid` | 3035 | monitor/debug output trong IPG Control | Invalid distance detected |
| `Debug.EffectiveStopGuard` | 3040 | monitor/debug output trong IPG Control | m; Effective dynamic stop guard |
| `Debug.EffectiveTimeGap` | 3047 | monitor/debug output trong IPG Control | s; Effective spec time gap |
| `Debug.FollowTargetSpeed` | 3031 | monitor/debug output trong IPG Control | m/s; ACC follow target speed |
| `Debug.Fusion.Active` | 3043 | monitor/debug output trong IPG Control | 1 only when selected LeadObj is fused camera+radar same-lane object |
| `Debug.Fusion.CameraRadarMatch` | 3044 | monitor/debug output trong IPG Control | Camera and radar candidates matched |
| `Debug.GapError` | 3026 | monitor/debug output trong IPG Control | m; Target.DistX - SafeDistance |
| `Debug.HazardLatched` | 3036 | monitor/debug output trong IPG Control | Hazard latch active |
| `Debug.LastValidDistX` | 3034 | monitor/debug output trong IPG Control | m; Last valid selected target distance |
| `Debug.LeadObj.CameraIndex` | 3050 | monitor/debug output trong IPG Control | Camera object index selected as LeadObj |
| `Debug.LeadObj.CandidateCount` | 3053 | monitor/debug output trong IPG Control | Total valid camera+radar candidates |
| `Debug.LeadObj.Confidence` | 3052 | monitor/debug output trong IPG Control | Selected lead confidence/probability proxy |
| `Debug.LeadObj.RadarIndex` | 3051 | monitor/debug output trong IPG Control | Radar object index selected as LeadObj |
| `Debug.LeadSpeed` | 3030 | monitor/debug output trong IPG Control | m/s; Estimated lead speed |
| `Debug.Mode` | 3028 | monitor/debug output trong IPG Control | 0 off, 1 speed, 2 follow, 3 warning, 4 emergency |
| `Debug.RadarCandidateValid` | 3039 | monitor/debug output trong IPG Control | Number of valid radar candidates |
| `Debug.RawAx` | 3027 | monitor/debug output trong IPG Control | m/s2; Raw acceleration before jerk limit |
| `Debug.Reason` | 3029 | monitor/debug output trong IPG Control | Reason code |
| `Debug.SafeDistance` | 3025 | monitor/debug output trong IPG Control | m; Time-gap safe distance |
| `Debug.SpecState` | 3045 | monitor/debug output trong IPG Control | Spec-like state code |
| `Debug.Target.DistX` | 3022 | monitor/debug output trong IPG Control | m; Selected target longitudinal distance |
| `Debug.Target.DistY` | 3023 | monitor/debug output trong IPG Control | m; Selected target lateral distance |
| `Debug.Target.Source` | 3021 | monitor/debug output trong IPG Control | 0 none, 1 camera-only, 2 radar-only, 3 fused |
| `Debug.Target.Valid` | 3020 | monitor/debug output trong IPG Control | Selected target valid |
| `Debug.Target.VrelX` | 3024 | monitor/debug output trong IPG Control | m/s; Selected target relative speed |
| `Debug.VrelX.Estimated` | 3032 | monitor/debug output trong IPG Control | m/s; VrelX estimated from range rate |

## V17 recommended tuning values

```text
ACC.Enable                 = 1
ACC.SetSpeed_kph           = scenario set speed / Driver.ReCon.Speed
ACC.FusionRequireBoth      = 1
ACC.CameraOnlyEnable       = 0
ACC.RadarOnlyEnable        = 0
ACC.LaneGateY              = 0.85
ACC.FusionLateralTolerance = 0.45
ACC.FusionDistTolerance    = 6.5
ACC.TimeGapLevel           = 4
ACC.MinDist                = 10.0
ACC.DynamicStopGuardTime   = 2.7
ACC.KpSpeed                = 0.80
ACC.MaxAx                  = 2.8
ACC.JerkLimit              = 4.0
ACC.MinAx                  = -3.0
ACC.WarningAx              = -1.6
ACC.EmergencyAx            = -6.0
ACC.LeadConfirmTime        = 0.0
ACC.LeadSwitchTime         = 0.0
ACC.CutOutReleaseDelay     = 0.0
```


## Cut-out expected debug rule

```text
Before cut-out: Fusion.Active=1, Target.Valid=1, CutOutRelease=0
At cut-out:     Fusion.Active changes 1->0, Target.Valid=0, CutOutRelease=1
Resume phase:   FollowTargetSpeed = ACC.SetSpeed_kph / 3.6, AccelCtrl.DesiredAx > 0 if Car.v is below set speed
Exit release:   CutOutRelease returns 0 only after Ego reaches set speed tolerance or ACC.Enable=0
```
