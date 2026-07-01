# CM15.1 ACC Controller V18 - StableFollowNoOvertake

## Mục tiêu
V18 xử lý lỗi 1st priority: Ego thỉnh thoảng tăng tốc và vượt qua LeadObj dù TV vẫn cùng ego-lane và ở phía trước.

## Root cause
Ở V17, `CutOutRelease` dựa trên falling edge của `Fusion.Active`. Nếu camera/radar fusion bị dropout ngắn trong lúc TV vẫn cùng làn, controller hiểu nhầm thành cut-out rồi vào `RESUME_SET_SPEED`, khiến Ego tăng tốc về set speed và có thể vượt qua TV.

## Fix chính
1. Không resume set speed chỉ vì `Fusion.Active` rơi 1→0 trong một sample.
2. Khi đã có LeadObj, controller re-check current LeadObj theo ID/index + lateral distance.
3. Nếu current LeadObj vẫn ahead và `abs(dY) <= ACC.LaneGateY`, controller giữ FOLLOW bằng `Target.Source = 5 (HOLD)`.
4. Chỉ bật `CutOutRelease = 1` khi:
   - current LeadObj lateral vượt gate, hoặc
   - current LeadObj mất quá `ACC.BrakeHoldTime`.
5. Khi FOLLOW active, `Debug.FollowTargetSpeed` bị clamp về `LeadSpeed`, không được dùng set speed để kéo Ego vượt TV.

## Key rules

```text
LeadObj same-lane and ahead
=> FOLLOW / HOLD_FOLLOW
=> FollowTargetSpeed <= LeadSpeed
=> CutOutRelease = 0

LeadObj lateral > ACC.LaneGateY, hoặc mất lâu hơn ACC.BrakeHoldTime
=> confirmed cut-out
=> CutOutRelease = 1
=> resume to ACC.SetSpeed_kph
```

## Recommended tuning

```text
ACC.Enable                    = 1
ACC.SetSpeed_kph              = scenario set speed / Driver.ReCon.Speed
ACC.FusionRequireBoth         = 1
ACC.CameraOnlyEnable          = 0
ACC.RadarOnlyEnable           = 0
ACC.BrakeHoldTime             = 0.8
ACC.LaneGateY                 = 0.85
ACC.FusionLateralTolerance    = 0.45
ACC.FusionDistTolerance       = 6.5
ACC.TimeGapLevel              = 4
ACC.MinDist                   = 10.0
ACC.DynamicStopGuardTime      = 2.7
ACC.KpSpeed                   = 0.80
ACC.KpFollowSpeed             = 0.24
ACC.KpGap                     = 0.06
ACC.KdRelSpeed                = 1.60
ACC.MaxAx                     = 2.8
ACC.MinAx                     = -3.0
ACC.WarningAx                 = -1.6
ACC.EmergencyAx               = -6.0
ACC.JerkLimit                 = 4.0
```

## Debug reasons

```text
10 = no lead, normal speed control
14 = lead candidate too far beyond follow max distance
16 = confirmed lateral cut-out
17 = resume set speed after confirmed cut-out/lost lead
18 = current LeadObj held through transient fusion dropout
19 = previous LeadObj persisted briefly through sensor dropout
20 = active follow
21 = follow with positive gap / speed clamp
22 = follow spacing correction
30 = warning
40 = emergency
```

## Verify expected behavior

### Same-lane LeadObj still ahead

```text
Debug.Target.Valid = 1
Debug.Fusion.Active = 1
Debug.Target.Source = 3 or 5
Debug.CutOutRelease = 0
Debug.FollowTargetSpeed <= Debug.LeadSpeed
Ego must not accelerate through TV
```

### Confirmed cut-out

```text
Debug.Target.Valid = 0
Debug.Fusion.Active = 0
Debug.CutOutRelease = 1
Debug.Mode = 1
Debug.FollowTargetSpeed = ACC.SetSpeed_kph / 3.6
```
