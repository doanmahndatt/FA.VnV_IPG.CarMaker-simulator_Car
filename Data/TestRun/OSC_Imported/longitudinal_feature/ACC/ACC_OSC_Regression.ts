#INFOFILE1.1 (UTF-8) - Do not remove this line!
FileIdent = CarMaker-TestSeries 15
FileCreator = CarMaker Office 15.1
Description:
LastChange = 2026-06-30 15:52:24 TungNV68
StartTime = 2026-06-30 15:05:18
EndTime = 2026-06-30 15:26:12
ReportTemplate =
Step.0 = Settings
Step.0.Name = Global Settings
Step.1 = Group
Step.1.Name = longitudinal_feature / ACC
Step.1.0 = Vehicle
Step.1.0.Name = TeslaY.ADAS_ACC
Step.1.0.Vehicle = TeslaY.ADAS_ACC
Step.1.0.Trailer =
Step.1.0.Tires = Examples/IPG_195_65R15
Step.1.0.Description:
Step.1.1 = TestRun
Step.1.1.Name = OSC_Imported/longitudinal_feature/ACC/acc_csc_001
Step.1.1.Param.0 = EgoSpeed NValue
Step.1.1.Param.1 = TVSpeed NValue
Step.1.1.Param.2 = TV_initPos NValue
Step.1.1.Char.0.Name = acc_csc_001_ActualDist
Step.1.1.Char.0.Description:
	Actual distance to lead (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.1.Char.0.Identifier = acc_csc_001_ActualDist
Step.1.1.Char.0.Unit =
Step.1.1.Char.0.Param.0 = RTexpr "Qu::acc_csc_001_ActualDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.1.Char.1.Name = acc_csc_001_SafeDist
Step.1.1.Char.1.Description:
	Reference safe distance (signal=FMU.CM_ACCController_V17.Out.Debug.SafeDistance)
Step.1.1.Char.1.Identifier = acc_csc_001_SafeDist
Step.1.1.Char.1.Unit =
Step.1.1.Char.1.Param.0 = RTexpr "Qu::acc_csc_001_SafeDist=FMU.CM_ACCController_V17.Out.Debug.SafeDistance"
Step.1.1.Char.2.Name = acc_csc_001_SafeDistViolated
Step.1.1.Char.2.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment ActualDist<SafeDist while actively following (gate==1); stays 1 for the rest of the run even if distance recovers.
Step.1.1.Char.2.Identifier = acc_csc_001_SafeDistViolated
Step.1.1.Char.2.Unit =
Step.1.1.Char.2.Param.0 = RTexpr {first()?Qu::acc_csc_001_SafeDistViolated=0:acc_csc_001_SafeDistViolated=max(acc_csc_001_SafeDistViolated,(FMU.CM_ACCController_V17.Out.Debug.Fusion.Active==1 && acc_csc_001_ActualDist<acc_csc_001_SafeDist))}
Step.1.1.Char.3.Name = acc_csc_001_TTC
Step.1.1.Char.3.Description:
	Time-to-collision (signal=AccelCtrl.ACC.Time2Collision)
Step.1.1.Char.3.Identifier = acc_csc_001_TTC
Step.1.1.Char.3.Unit =
Step.1.1.Char.3.Param.0 = RTexpr "Qu::acc_csc_001_TTC=AccelCtrl.ACC.Time2Collision"
Step.1.1.Char.4.Name = acc_csc_001_TTCWarnEver
Step.1.1.Char.4.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the warn zone [3.5,11)s.
Step.1.1.Char.4.Identifier = acc_csc_001_TTCWarnEver
Step.1.1.Char.4.Unit =
Step.1.1.Char.4.Param.0 = RTexpr {first()?Qu::acc_csc_001_TTCWarnEver=0:acc_csc_001_TTCWarnEver=max(acc_csc_001_TTCWarnEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_001_TTC>=3.5 && acc_csc_001_TTC<11))}
Step.1.1.Char.5.Name = acc_csc_001_TTCBadEver
Step.1.1.Char.5.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the bad zone (0,3.5)s.
Step.1.1.Char.5.Identifier = acc_csc_001_TTCBadEver
Step.1.1.Char.5.Unit =
Step.1.1.Char.5.Param.0 = RTexpr {first()?Qu::acc_csc_001_TTCBadEver=0:acc_csc_001_TTCBadEver=max(acc_csc_001_TTCBadEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_001_TTC>0 && acc_csc_001_TTC<3.5))}
Step.1.1.Char.6.Name = acc_csc_001_ComfortAx
Step.1.1.Char.6.Description:
	Comfort Deceleration Limit (signal=AccelCtrl.DesiredAx)
Step.1.1.Char.6.Identifier = acc_csc_001_ComfortAx
Step.1.1.Char.6.Unit =
Step.1.1.Char.6.Param.0 = RTexpr "Qu::acc_csc_001_ComfortAx=AccelCtrl.DesiredAx"
Step.1.1.Char.7.Name = acc_csc_001_ComfortAxOutOfBoundEver
Step.1.1.Char.7.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Comfort Deceleration Limit ever goes out of bound (min=-3, max=2.8).
Step.1.1.Char.7.Identifier = acc_csc_001_ComfortAxOutOfBoundEver
Step.1.1.Char.7.Unit =
Step.1.1.Char.7.Param.0 = RTexpr {first()?Qu::acc_csc_001_ComfortAxOutOfBoundEver=0:acc_csc_001_ComfortAxOutOfBoundEver=max(acc_csc_001_ComfortAxOutOfBoundEver,(acc_csc_001_ComfortAx<-3 || acc_csc_001_ComfortAx>2.8))}
Step.1.1.Char.8.Name = acc_csc_001_EmergencyAx
Step.1.1.Char.8.Description:
	Emergency Deceleration Bound (signal=AccelCtrl.DesiredAx)
Step.1.1.Char.8.Identifier = acc_csc_001_EmergencyAx
Step.1.1.Char.8.Unit =
Step.1.1.Char.8.Param.0 = RTexpr "Qu::acc_csc_001_EmergencyAx=AccelCtrl.DesiredAx"
Step.1.1.Char.9.Name = acc_csc_001_EmergencyAxOutOfBoundEver
Step.1.1.Char.9.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Emergency Deceleration Bound ever goes out of bound (min=-6).
Step.1.1.Char.9.Identifier = acc_csc_001_EmergencyAxOutOfBoundEver
Step.1.1.Char.9.Unit =
Step.1.1.Char.9.Param.0 = RTexpr {first()?Qu::acc_csc_001_EmergencyAxOutOfBoundEver=0:acc_csc_001_EmergencyAxOutOfBoundEver=max(acc_csc_001_EmergencyAxOutOfBoundEver,(acc_csc_001_EmergencyAx<-6))}
Step.1.1.Char.10.Name = acc_csc_001_Jerk
Step.1.1.Char.10.Description:
	Jerk = |d(DesiredAx)/dt|, base signal=AccelCtrl.DesiredAx
Step.1.1.Char.10.Identifier = acc_csc_001_Jerk
Step.1.1.Char.10.Unit =
Step.1.1.Char.10.Param.0 = RTexpr "Qu::acc_csc_001_Jerk=abs(diff(AccelCtrl.DesiredAx,Time))"
Step.1.1.Char.11.Name = acc_csc_001_JerkOverLimitEver
Step.1.1.Char.11.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment |jerk| ever exceeds 4 m/s3.
Step.1.1.Char.11.Identifier = acc_csc_001_JerkOverLimitEver
Step.1.1.Char.11.Unit =
Step.1.1.Char.11.Param.0 = RTexpr {first()?Qu::acc_csc_001_JerkOverLimitEver=0:acc_csc_001_JerkOverLimitEver=max(acc_csc_001_JerkOverLimitEver,(acc_csc_001_Jerk>4))}
Step.1.1.Char.12.Name = acc_csc_001_NoCollDist
Step.1.1.Char.12.Description:
	Distance to nearest lead object (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.1.Char.12.Identifier = acc_csc_001_NoCollDist
Step.1.1.Char.12.Unit =
Step.1.1.Char.12.Param.0 = RTexpr "Qu::acc_csc_001_NoCollDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.1.Char.13.Name = acc_csc_001_NoCollDistViolatedEver
Step.1.1.Char.13.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment distance ever drops below 0m.
Step.1.1.Char.13.Identifier = acc_csc_001_NoCollDistViolatedEver
Step.1.1.Char.13.Unit =
Step.1.1.Char.13.Param.0 = RTexpr {first()?Qu::acc_csc_001_NoCollDistViolatedEver=0:acc_csc_001_NoCollDistViolatedEver=max(acc_csc_001_NoCollDistViolatedEver,(acc_csc_001_NoCollDist<0))}
Step.1.1.Char.14.Name = acc_csc_001_CollisionFlag
Step.1.1.Char.14.Description:
	Collision flag derived from FMU.CM_ACCController_V17.Out.Debug.Target.DistX <= 0 (nearest lead object); instantaneous, used as the latch() trigger for ImpactSpeed below.
Step.1.1.Char.14.Identifier = acc_csc_001_CollisionFlag
Step.1.1.Char.14.Unit =
Step.1.1.Char.14.Param.0 = RTexpr "Qu::acc_csc_001_CollisionFlag=(FMU.CM_ACCController_V17.Out.Debug.Target.DistX<=0)"
Step.1.1.Char.15.Name = acc_csc_001_ImpactSpeed
Step.1.1.Char.15.Description:
	Ego speed latched at moment of first collision (nearest lead object)
Step.1.1.Char.15.Identifier = acc_csc_001_ImpactSpeed
Step.1.1.Char.15.Unit =
Step.1.1.Char.15.Param.0 = RTexpr {Qu::acc_csc_001_ImpactSpeed=latch(Speed("Ego"),Qu::acc_csc_001_CollisionFlag==1)}
Step.1.1.Char.16.Name = acc_csc_001_CollisionEver
Step.1.1.Char.16.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment a collision ever occurs (nearest lead object), even if the vehicles separate again before the run ends.
Step.1.1.Char.16.Identifier = acc_csc_001_CollisionEver
Step.1.1.Char.16.Unit =
Step.1.1.Char.16.Param.0 = RTexpr {first()?Qu::acc_csc_001_CollisionEver=0:acc_csc_001_CollisionEver=max(acc_csc_001_CollisionEver,(acc_csc_001_CollisionFlag==1))}
Step.1.1.Crit.0.Name = acc_csc_001 - Safe Distance Consistency
Step.1.1.Crit.0.Description:
	Good if SafeDist was never violated while actively following throughout the run. Bad if it was violated at any point.
Step.1.1.Crit.0.Good = [get acc_csc_001_SafeDistViolated] == 0
Step.1.1.Crit.0.Warn =
Step.1.1.Crit.0.Bad = [get acc_csc_001_SafeDistViolated] == 1
Step.1.1.Crit.1.Name = acc_csc_001 - Time To Collision
Step.1.1.Crit.1.Description:
	Good if TTC never entered the warn/bad zone while a valid target existed throughout the run. Warn if it ever entered [3.5,11)s. Bad if it ever entered (0,3.5)s.
Step.1.1.Crit.1.Good = [get acc_csc_001_TTCBadEver] == 0 && [get acc_csc_001_TTCWarnEver] == 0
Step.1.1.Crit.1.Warn = [get acc_csc_001_TTCBadEver] == 0 && [get acc_csc_001_TTCWarnEver] == 1
Step.1.1.Crit.1.Bad = [get acc_csc_001_TTCBadEver] == 1
Step.1.1.Crit.2.Name = acc_csc_001 - Comfort Deceleration Limit
Step.1.1.Crit.2.Description:
	Good if Comfort Deceleration Limit never went out of bound (min=-3, max=2.8) throughout the run.
Step.1.1.Crit.2.Good = [get acc_csc_001_ComfortAxOutOfBoundEver] == 0
Step.1.1.Crit.2.Warn =
Step.1.1.Crit.2.Bad = [get acc_csc_001_ComfortAxOutOfBoundEver] == 1
Step.1.1.Crit.3.Name = acc_csc_001 - Emergency Deceleration Bound
Step.1.1.Crit.3.Description:
	Good if Emergency Deceleration Bound never went out of bound (min=-6) throughout the run.
Step.1.1.Crit.3.Good = [get acc_csc_001_EmergencyAxOutOfBoundEver] == 0
Step.1.1.Crit.3.Warn =
Step.1.1.Crit.3.Bad = [get acc_csc_001_EmergencyAxOutOfBoundEver] == 1
Step.1.1.Crit.4.Name = acc_csc_001 - Jerk Limit
Step.1.1.Crit.4.Description:
	Good if |jerk| never exceeded 4 m/s3 throughout the run.
Step.1.1.Crit.4.Good = [get acc_csc_001_JerkOverLimitEver] == 0
Step.1.1.Crit.4.Warn =
Step.1.1.Crit.4.Bad = [get acc_csc_001_JerkOverLimitEver] == 1
Step.1.1.Crit.5.Name = acc_csc_001 - No Collision Distance
Step.1.1.Crit.5.Description:
	Good if distance never dropped below 0m throughout the run.
Step.1.1.Crit.5.Good = [get acc_csc_001_NoCollDistViolatedEver] == 0
Step.1.1.Crit.5.Warn =
Step.1.1.Crit.5.Bad = [get acc_csc_001_NoCollDistViolatedEver] == 1
Step.1.1.Crit.6.Name = acc_csc_001 - Collision Flag
Step.1.1.Crit.6.Description:
	Good if no collision ever occurred (nearest lead object) throughout the run.
Step.1.1.Crit.6.Good = [get acc_csc_001_CollisionEver] == 0
Step.1.1.Crit.6.Warn =
Step.1.1.Crit.6.Bad = [get acc_csc_001_CollisionEver] == 1
Step.1.1.Crit.7.Name = acc_csc_001 - Impact Speed
Step.1.1.Crit.7.Description:
	Good if no collision ever occurred, or impact speed = 0; Warn (0,5) m/s; Bad >= 5 m/s
Step.1.1.Crit.7.Good = [get acc_csc_001_CollisionEver] == 0 || [get acc_csc_001_ImpactSpeed] == 0
Step.1.1.Crit.7.Warn = [get acc_csc_001_CollisionEver] == 1 && [get acc_csc_001_ImpactSpeed] > 0 && [get acc_csc_001_ImpactSpeed] < 5
Step.1.1.Crit.7.Bad = [get acc_csc_001_CollisionEver] == 1 && [get acc_csc_001_ImpactSpeed] >= 5
Step.1.1.Var.0.Name = acc_csc_001_ds001
Step.1.1.Var.0.Param = 10 8 35
Step.1.1.Var.0.Result = bad
Step.1.1.Var.0.ResDate = 1782803131
Step.1.1.Var.0.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_001_140523.erg
Step.1.1.Var.0.ManLst = 0:long0
Step.1.1.Var.0.Char.0.Ref = acc_csc_001_ActualDist
Step.1.1.Var.0.Char.0.Value = 999.0
Step.1.1.Var.0.Char.1.Ref = acc_csc_001_SafeDist
Step.1.1.Var.0.Char.1.Value = 34.50207129180156
Step.1.1.Var.0.Char.2.Ref = acc_csc_001_SafeDistViolated
Step.1.1.Var.0.Char.2.Value = 0.0
Step.1.1.Var.0.Char.3.Ref = acc_csc_001_TTC
Step.1.1.Var.0.Char.3.Value = 0.0
Step.1.1.Var.0.Char.4.Ref = acc_csc_001_TTCWarnEver
Step.1.1.Var.0.Char.4.Value = 0.0
Step.1.1.Var.0.Char.5.Ref = acc_csc_001_TTCBadEver
Step.1.1.Var.0.Char.5.Value = 0.0
Step.1.1.Var.0.Char.6.Ref = acc_csc_001_ComfortAx
Step.1.1.Var.0.Char.6.Value = -0.0007204493222829456
Step.1.1.Var.0.Char.7.Ref = acc_csc_001_ComfortAxOutOfBoundEver
Step.1.1.Var.0.Char.7.Value = 0.0
Step.1.1.Var.0.Char.8.Ref = acc_csc_001_EmergencyAx
Step.1.1.Var.0.Char.8.Value = -0.0007204493222829456
Step.1.1.Var.0.Char.9.Ref = acc_csc_001_EmergencyAxOutOfBoundEver
Step.1.1.Var.0.Char.9.Value = 0.0
Step.1.1.Var.0.Char.10.Ref = acc_csc_001_Jerk
Step.1.1.Var.0.Char.10.Value = 3.9359235868429706e-7
Step.1.1.Var.0.Char.11.Ref = acc_csc_001_JerkOverLimitEver
Step.1.1.Var.0.Char.11.Value = 1.0
Step.1.1.Var.0.Char.12.Ref = acc_csc_001_NoCollDist
Step.1.1.Var.0.Char.12.Value = 999.0
Step.1.1.Var.0.Char.13.Ref = acc_csc_001_NoCollDistViolatedEver
Step.1.1.Var.0.Char.13.Value = 0.0
Step.1.1.Var.0.Char.14.Ref = acc_csc_001_CollisionFlag
Step.1.1.Var.0.Char.14.Value = 0.0
Step.1.1.Var.0.Char.15.Ref = acc_csc_001_ImpactSpeed
Step.1.1.Var.0.Char.15.Value = 0.0
Step.1.1.Var.0.Char.16.Ref = acc_csc_001_CollisionEver
Step.1.1.Var.0.Char.16.Value = 0.0
Step.1.1.Var.0.Crit.0.Ref = acc_csc_001 - Safe Distance Consistency
Step.1.1.Var.0.Crit.0.Result = good
Step.1.1.Var.0.Crit.1.Ref = acc_csc_001 - Time To Collision
Step.1.1.Var.0.Crit.1.Result = good
Step.1.1.Var.0.Crit.2.Ref = acc_csc_001 - Comfort Deceleration Limit
Step.1.1.Var.0.Crit.2.Result = good
Step.1.1.Var.0.Crit.3.Ref = acc_csc_001 - Emergency Deceleration Bound
Step.1.1.Var.0.Crit.3.Result = good
Step.1.1.Var.0.Crit.4.Ref = acc_csc_001 - Jerk Limit
Step.1.1.Var.0.Crit.4.Result = bad
Step.1.1.Var.0.Crit.5.Ref = acc_csc_001 - No Collision Distance
Step.1.1.Var.0.Crit.5.Result = good
Step.1.1.Var.0.Crit.6.Ref = acc_csc_001 - Collision Flag
Step.1.1.Var.0.Crit.6.Result = good
Step.1.1.Var.0.Crit.7.Ref = acc_csc_001 - Impact Speed
Step.1.1.Var.0.Crit.7.Result = good
Step.1.1.Var.1.Name = acc_csc_001_ds002
Step.1.1.Var.1.Param = 15 10 50
Step.1.1.Var.1.Result = bad
Step.1.1.Var.1.ResDate = 1782803143
Step.1.1.Var.1.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_001_140535.erg
Step.1.1.Var.1.ManLst = 0:long0
Step.1.1.Var.1.Char.0.Ref = acc_csc_001_ActualDist
Step.1.1.Var.1.Char.0.Value = 999.0
Step.1.1.Var.1.Char.1.Ref = acc_csc_001_SafeDist
Step.1.1.Var.1.Char.1.Value = 34.50206234660117
Step.1.1.Var.1.Char.2.Ref = acc_csc_001_SafeDistViolated
Step.1.1.Var.1.Char.2.Value = 0.0
Step.1.1.Var.1.Char.3.Ref = acc_csc_001_TTC
Step.1.1.Var.1.Char.3.Value = 0.0
Step.1.1.Var.1.Char.4.Ref = acc_csc_001_TTCWarnEver
Step.1.1.Var.1.Char.4.Value = 0.0
Step.1.1.Var.1.Char.5.Ref = acc_csc_001_TTCBadEver
Step.1.1.Var.1.Char.5.Value = 0.0
Step.1.1.Var.1.Char.6.Ref = acc_csc_001_ComfortAx
Step.1.1.Var.1.Char.6.Value = -0.000717337948233876
Step.1.1.Var.1.Char.7.Ref = acc_csc_001_ComfortAxOutOfBoundEver
Step.1.1.Var.1.Char.7.Value = 0.0
Step.1.1.Var.1.Char.8.Ref = acc_csc_001_EmergencyAx
Step.1.1.Var.1.Char.8.Value = -0.000717337948233876
Step.1.1.Var.1.Char.9.Ref = acc_csc_001_EmergencyAxOutOfBoundEver
Step.1.1.Var.1.Char.9.Value = 0.0
Step.1.1.Var.1.Char.10.Ref = acc_csc_001_Jerk
Step.1.1.Var.1.Char.10.Value = 2.5137921966509415e-6
Step.1.1.Var.1.Char.11.Ref = acc_csc_001_JerkOverLimitEver
Step.1.1.Var.1.Char.11.Value = 1.0
Step.1.1.Var.1.Char.12.Ref = acc_csc_001_NoCollDist
Step.1.1.Var.1.Char.12.Value = 999.0
Step.1.1.Var.1.Char.13.Ref = acc_csc_001_NoCollDistViolatedEver
Step.1.1.Var.1.Char.13.Value = 0.0
Step.1.1.Var.1.Char.14.Ref = acc_csc_001_CollisionFlag
Step.1.1.Var.1.Char.14.Value = 0.0
Step.1.1.Var.1.Char.15.Ref = acc_csc_001_ImpactSpeed
Step.1.1.Var.1.Char.15.Value = 0.0
Step.1.1.Var.1.Char.16.Ref = acc_csc_001_CollisionEver
Step.1.1.Var.1.Char.16.Value = 0.0
Step.1.1.Var.1.Crit.0.Ref = acc_csc_001 - Safe Distance Consistency
Step.1.1.Var.1.Crit.0.Result = good
Step.1.1.Var.1.Crit.1.Ref = acc_csc_001 - Time To Collision
Step.1.1.Var.1.Crit.1.Result = good
Step.1.1.Var.1.Crit.2.Ref = acc_csc_001 - Comfort Deceleration Limit
Step.1.1.Var.1.Crit.2.Result = good
Step.1.1.Var.1.Crit.3.Ref = acc_csc_001 - Emergency Deceleration Bound
Step.1.1.Var.1.Crit.3.Result = good
Step.1.1.Var.1.Crit.4.Ref = acc_csc_001 - Jerk Limit
Step.1.1.Var.1.Crit.4.Result = bad
Step.1.1.Var.1.Crit.5.Ref = acc_csc_001 - No Collision Distance
Step.1.1.Var.1.Crit.5.Result = good
Step.1.1.Var.1.Crit.6.Ref = acc_csc_001 - Collision Flag
Step.1.1.Var.1.Crit.6.Result = good
Step.1.1.Var.1.Crit.7.Ref = acc_csc_001 - Impact Speed
Step.1.1.Var.1.Crit.7.Result = good
Step.1.1.Var.2.Name = acc_csc_001_ds003
Step.1.1.Var.2.Param = 20 15 65
Step.1.1.Var.2.Result = bad
Step.1.1.Var.2.ResDate = 1782803155
Step.1.1.Var.2.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_001_140547.erg
Step.1.1.Var.2.ManLst = 0:long0
Step.1.1.Var.2.Char.0.Ref = acc_csc_001_ActualDist
Step.1.1.Var.2.Char.0.Value = 999.0
Step.1.1.Var.2.Char.1.Ref = acc_csc_001_SafeDist
Step.1.1.Var.2.Char.1.Value = 41.88468437609895
Step.1.1.Var.2.Char.2.Ref = acc_csc_001_SafeDistViolated
Step.1.1.Var.2.Char.2.Value = 0.0
Step.1.1.Var.2.Char.3.Ref = acc_csc_001_TTC
Step.1.1.Var.2.Char.3.Value = 0.0
Step.1.1.Var.2.Char.4.Ref = acc_csc_001_TTCWarnEver
Step.1.1.Var.2.Char.4.Value = 0.0
Step.1.1.Var.2.Char.5.Ref = acc_csc_001_TTCBadEver
Step.1.1.Var.2.Char.5.Value = 0.0
Step.1.1.Var.2.Char.6.Ref = acc_csc_001_ComfortAx
Step.1.1.Var.2.Char.6.Value = -0.004
Step.1.1.Var.2.Char.7.Ref = acc_csc_001_ComfortAxOutOfBoundEver
Step.1.1.Var.2.Char.7.Value = 0.0
Step.1.1.Var.2.Char.8.Ref = acc_csc_001_EmergencyAx
Step.1.1.Var.2.Char.8.Value = -0.004
Step.1.1.Var.2.Char.9.Ref = acc_csc_001_EmergencyAxOutOfBoundEver
Step.1.1.Var.2.Char.9.Value = 0.0
Step.1.1.Var.2.Char.10.Ref = acc_csc_001_Jerk
Step.1.1.Var.2.Char.10.Value = 0.0
Step.1.1.Var.2.Char.11.Ref = acc_csc_001_JerkOverLimitEver
Step.1.1.Var.2.Char.11.Value = 1.0
Step.1.1.Var.2.Char.12.Ref = acc_csc_001_NoCollDist
Step.1.1.Var.2.Char.12.Value = 999.0
Step.1.1.Var.2.Char.13.Ref = acc_csc_001_NoCollDistViolatedEver
Step.1.1.Var.2.Char.13.Value = 0.0
Step.1.1.Var.2.Char.14.Ref = acc_csc_001_CollisionFlag
Step.1.1.Var.2.Char.14.Value = 0.0
Step.1.1.Var.2.Char.15.Ref = acc_csc_001_ImpactSpeed
Step.1.1.Var.2.Char.15.Value = 0.0
Step.1.1.Var.2.Char.16.Ref = acc_csc_001_CollisionEver
Step.1.1.Var.2.Char.16.Value = 0.0
Step.1.1.Var.2.Crit.0.Ref = acc_csc_001 - Safe Distance Consistency
Step.1.1.Var.2.Crit.0.Result = good
Step.1.1.Var.2.Crit.1.Ref = acc_csc_001 - Time To Collision
Step.1.1.Var.2.Crit.1.Result = good
Step.1.1.Var.2.Crit.2.Ref = acc_csc_001 - Comfort Deceleration Limit
Step.1.1.Var.2.Crit.2.Result = good
Step.1.1.Var.2.Crit.3.Ref = acc_csc_001 - Emergency Deceleration Bound
Step.1.1.Var.2.Crit.3.Result = good
Step.1.1.Var.2.Crit.4.Ref = acc_csc_001 - Jerk Limit
Step.1.1.Var.2.Crit.4.Result = bad
Step.1.1.Var.2.Crit.5.Ref = acc_csc_001 - No Collision Distance
Step.1.1.Var.2.Crit.5.Result = good
Step.1.1.Var.2.Crit.6.Ref = acc_csc_001 - Collision Flag
Step.1.1.Var.2.Crit.6.Result = good
Step.1.1.Var.2.Crit.7.Ref = acc_csc_001 - Impact Speed
Step.1.1.Var.2.Crit.7.Result = good
Step.1.1.Var.3.Name = acc_csc_001_ds004
Step.1.1.Var.3.Param = 25 20 85
Step.1.1.Var.3.Result = bad
Step.1.1.Var.3.ResDate = 1782803167
Step.1.1.Var.3.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_001_140559.erg
Step.1.1.Var.3.ManLst = 0:long0
Step.1.1.Var.3.Char.0.Ref = acc_csc_001_ActualDist
Step.1.1.Var.3.Char.0.Value = 999.0
Step.1.1.Var.3.Char.1.Ref = acc_csc_001_SafeDist
Step.1.1.Var.3.Char.1.Value = 51.48244854533481
Step.1.1.Var.3.Char.2.Ref = acc_csc_001_SafeDistViolated
Step.1.1.Var.3.Char.2.Value = 0.0
Step.1.1.Var.3.Char.3.Ref = acc_csc_001_TTC
Step.1.1.Var.3.Char.3.Value = 0.0
Step.1.1.Var.3.Char.4.Ref = acc_csc_001_TTCWarnEver
Step.1.1.Var.3.Char.4.Value = 0.0
Step.1.1.Var.3.Char.5.Ref = acc_csc_001_TTCBadEver
Step.1.1.Var.3.Char.5.Value = 0.0
Step.1.1.Var.3.Char.6.Ref = acc_csc_001_ComfortAx
Step.1.1.Var.3.Char.6.Value = -0.004
Step.1.1.Var.3.Char.7.Ref = acc_csc_001_ComfortAxOutOfBoundEver
Step.1.1.Var.3.Char.7.Value = 0.0
Step.1.1.Var.3.Char.8.Ref = acc_csc_001_EmergencyAx
Step.1.1.Var.3.Char.8.Value = -0.004
Step.1.1.Var.3.Char.9.Ref = acc_csc_001_EmergencyAxOutOfBoundEver
Step.1.1.Var.3.Char.9.Value = 0.0
Step.1.1.Var.3.Char.10.Ref = acc_csc_001_Jerk
Step.1.1.Var.3.Char.10.Value = 0.0
Step.1.1.Var.3.Char.11.Ref = acc_csc_001_JerkOverLimitEver
Step.1.1.Var.3.Char.11.Value = 1.0
Step.1.1.Var.3.Char.12.Ref = acc_csc_001_NoCollDist
Step.1.1.Var.3.Char.12.Value = 999.0
Step.1.1.Var.3.Char.13.Ref = acc_csc_001_NoCollDistViolatedEver
Step.1.1.Var.3.Char.13.Value = 0.0
Step.1.1.Var.3.Char.14.Ref = acc_csc_001_CollisionFlag
Step.1.1.Var.3.Char.14.Value = 0.0
Step.1.1.Var.3.Char.15.Ref = acc_csc_001_ImpactSpeed
Step.1.1.Var.3.Char.15.Value = 0.0
Step.1.1.Var.3.Char.16.Ref = acc_csc_001_CollisionEver
Step.1.1.Var.3.Char.16.Value = 0.0
Step.1.1.Var.3.Crit.0.Ref = acc_csc_001 - Safe Distance Consistency
Step.1.1.Var.3.Crit.0.Result = good
Step.1.1.Var.3.Crit.1.Ref = acc_csc_001 - Time To Collision
Step.1.1.Var.3.Crit.1.Result = good
Step.1.1.Var.3.Crit.2.Ref = acc_csc_001 - Comfort Deceleration Limit
Step.1.1.Var.3.Crit.2.Result = good
Step.1.1.Var.3.Crit.3.Ref = acc_csc_001 - Emergency Deceleration Bound
Step.1.1.Var.3.Crit.3.Result = good
Step.1.1.Var.3.Crit.4.Ref = acc_csc_001 - Jerk Limit
Step.1.1.Var.3.Crit.4.Result = bad
Step.1.1.Var.3.Crit.5.Ref = acc_csc_001 - No Collision Distance
Step.1.1.Var.3.Crit.5.Result = good
Step.1.1.Var.3.Crit.6.Ref = acc_csc_001 - Collision Flag
Step.1.1.Var.3.Crit.6.Result = good
Step.1.1.Var.3.Crit.7.Ref = acc_csc_001 - Impact Speed
Step.1.1.Var.3.Crit.7.Result = good
Step.1.1.Var.4.Name = acc_csc_001_ds005
Step.1.1.Var.4.Param = 30 24 110
Step.1.1.Var.4.Result = bad
Step.1.1.Var.4.ResDate = 1782803179
Step.1.1.Var.4.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_001_140611.erg
Step.1.1.Var.4.ManLst = 0:long0
Step.1.1.Var.4.Char.0.Ref = acc_csc_001_ActualDist
Step.1.1.Var.4.Char.0.Value = 999.0
Step.1.1.Var.4.Char.1.Ref = acc_csc_001_SafeDist
Step.1.1.Var.4.Char.1.Value = 60.29343867012855
Step.1.1.Var.4.Char.2.Ref = acc_csc_001_SafeDistViolated
Step.1.1.Var.4.Char.2.Value = 0.0
Step.1.1.Var.4.Char.3.Ref = acc_csc_001_TTC
Step.1.1.Var.4.Char.3.Value = 0.0
Step.1.1.Var.4.Char.4.Ref = acc_csc_001_TTCWarnEver
Step.1.1.Var.4.Char.4.Value = 0.0
Step.1.1.Var.4.Char.5.Ref = acc_csc_001_TTCBadEver
Step.1.1.Var.4.Char.5.Value = 0.0
Step.1.1.Var.4.Char.6.Ref = acc_csc_001_ComfortAx
Step.1.1.Var.4.Char.6.Value = -0.004
Step.1.1.Var.4.Char.7.Ref = acc_csc_001_ComfortAxOutOfBoundEver
Step.1.1.Var.4.Char.7.Value = 0.0
Step.1.1.Var.4.Char.8.Ref = acc_csc_001_EmergencyAx
Step.1.1.Var.4.Char.8.Value = -0.004
Step.1.1.Var.4.Char.9.Ref = acc_csc_001_EmergencyAxOutOfBoundEver
Step.1.1.Var.4.Char.9.Value = 0.0
Step.1.1.Var.4.Char.10.Ref = acc_csc_001_Jerk
Step.1.1.Var.4.Char.10.Value = 0.0
Step.1.1.Var.4.Char.11.Ref = acc_csc_001_JerkOverLimitEver
Step.1.1.Var.4.Char.11.Value = 1.0
Step.1.1.Var.4.Char.12.Ref = acc_csc_001_NoCollDist
Step.1.1.Var.4.Char.12.Value = 999.0
Step.1.1.Var.4.Char.13.Ref = acc_csc_001_NoCollDistViolatedEver
Step.1.1.Var.4.Char.13.Value = 0.0
Step.1.1.Var.4.Char.14.Ref = acc_csc_001_CollisionFlag
Step.1.1.Var.4.Char.14.Value = 0.0
Step.1.1.Var.4.Char.15.Ref = acc_csc_001_ImpactSpeed
Step.1.1.Var.4.Char.15.Value = 0.0
Step.1.1.Var.4.Char.16.Ref = acc_csc_001_CollisionEver
Step.1.1.Var.4.Char.16.Value = 0.0
Step.1.1.Var.4.Crit.0.Ref = acc_csc_001 - Safe Distance Consistency
Step.1.1.Var.4.Crit.0.Result = good
Step.1.1.Var.4.Crit.1.Ref = acc_csc_001 - Time To Collision
Step.1.1.Var.4.Crit.1.Result = good
Step.1.1.Var.4.Crit.2.Ref = acc_csc_001 - Comfort Deceleration Limit
Step.1.1.Var.4.Crit.2.Result = good
Step.1.1.Var.4.Crit.3.Ref = acc_csc_001 - Emergency Deceleration Bound
Step.1.1.Var.4.Crit.3.Result = good
Step.1.1.Var.4.Crit.4.Ref = acc_csc_001 - Jerk Limit
Step.1.1.Var.4.Crit.4.Result = bad
Step.1.1.Var.4.Crit.5.Ref = acc_csc_001 - No Collision Distance
Step.1.1.Var.4.Crit.5.Result = good
Step.1.1.Var.4.Crit.6.Ref = acc_csc_001 - Collision Flag
Step.1.1.Var.4.Crit.6.Result = good
Step.1.1.Var.4.Crit.7.Ref = acc_csc_001 - Impact Speed
Step.1.1.Var.4.Crit.7.Result = good
Step.1.2 = TestRun
Step.1.2.Name = OSC_Imported/longitudinal_feature/ACC/acc_csc_002
Step.1.2.Param.0 = EgoSpeed NValue
Step.1.2.Param.1 = TVSpeed NValue
Step.1.2.Param.2 = TV_initPos NValue
Step.1.2.Char.0.Name = acc_csc_002_ActualDist
Step.1.2.Char.0.Description:
	Actual distance to lead (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.2.Char.0.Identifier = acc_csc_002_ActualDist
Step.1.2.Char.0.Unit =
Step.1.2.Char.0.Param.0 = RTexpr "Qu::acc_csc_002_ActualDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.2.Char.1.Name = acc_csc_002_SafeDist
Step.1.2.Char.1.Description:
	Reference safe distance (signal=FMU.CM_ACCController_V17.Out.Debug.SafeDistance)
Step.1.2.Char.1.Identifier = acc_csc_002_SafeDist
Step.1.2.Char.1.Unit =
Step.1.2.Char.1.Param.0 = RTexpr "Qu::acc_csc_002_SafeDist=FMU.CM_ACCController_V17.Out.Debug.SafeDistance"
Step.1.2.Char.2.Name = acc_csc_002_SafeDistViolated
Step.1.2.Char.2.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment ActualDist<SafeDist while actively following (gate==1); stays 1 for the rest of the run even if distance recovers.
Step.1.2.Char.2.Identifier = acc_csc_002_SafeDistViolated
Step.1.2.Char.2.Unit =
Step.1.2.Char.2.Param.0 = RTexpr {first()?Qu::acc_csc_002_SafeDistViolated=0:acc_csc_002_SafeDistViolated=max(acc_csc_002_SafeDistViolated,(FMU.CM_ACCController_V17.Out.Debug.Fusion.Active==1 && acc_csc_002_ActualDist<acc_csc_002_SafeDist))}
Step.1.2.Char.3.Name = acc_csc_002_TTC
Step.1.2.Char.3.Description:
	Time-to-collision (signal=AccelCtrl.ACC.Time2Collision)
Step.1.2.Char.3.Identifier = acc_csc_002_TTC
Step.1.2.Char.3.Unit =
Step.1.2.Char.3.Param.0 = RTexpr "Qu::acc_csc_002_TTC=AccelCtrl.ACC.Time2Collision"
Step.1.2.Char.4.Name = acc_csc_002_TTCWarnEver
Step.1.2.Char.4.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the warn zone [3.5,11)s.
Step.1.2.Char.4.Identifier = acc_csc_002_TTCWarnEver
Step.1.2.Char.4.Unit =
Step.1.2.Char.4.Param.0 = RTexpr {first()?Qu::acc_csc_002_TTCWarnEver=0:acc_csc_002_TTCWarnEver=max(acc_csc_002_TTCWarnEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_002_TTC>=3.5 && acc_csc_002_TTC<11))}
Step.1.2.Char.5.Name = acc_csc_002_TTCBadEver
Step.1.2.Char.5.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the bad zone (0,3.5)s.
Step.1.2.Char.5.Identifier = acc_csc_002_TTCBadEver
Step.1.2.Char.5.Unit =
Step.1.2.Char.5.Param.0 = RTexpr {first()?Qu::acc_csc_002_TTCBadEver=0:acc_csc_002_TTCBadEver=max(acc_csc_002_TTCBadEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_002_TTC>0 && acc_csc_002_TTC<3.5))}
Step.1.2.Char.6.Name = acc_csc_002_ComfortAx
Step.1.2.Char.6.Description:
	Comfort Deceleration Limit (signal=AccelCtrl.DesiredAx)
Step.1.2.Char.6.Identifier = acc_csc_002_ComfortAx
Step.1.2.Char.6.Unit =
Step.1.2.Char.6.Param.0 = RTexpr "Qu::acc_csc_002_ComfortAx=AccelCtrl.DesiredAx"
Step.1.2.Char.7.Name = acc_csc_002_ComfortAxOutOfBoundEver
Step.1.2.Char.7.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Comfort Deceleration Limit ever goes out of bound (min=-3, max=2.8).
Step.1.2.Char.7.Identifier = acc_csc_002_ComfortAxOutOfBoundEver
Step.1.2.Char.7.Unit =
Step.1.2.Char.7.Param.0 = RTexpr {first()?Qu::acc_csc_002_ComfortAxOutOfBoundEver=0:acc_csc_002_ComfortAxOutOfBoundEver=max(acc_csc_002_ComfortAxOutOfBoundEver,(acc_csc_002_ComfortAx<-3 || acc_csc_002_ComfortAx>2.8))}
Step.1.2.Char.8.Name = acc_csc_002_EmergencyAx
Step.1.2.Char.8.Description:
	Emergency Deceleration Bound (signal=AccelCtrl.DesiredAx)
Step.1.2.Char.8.Identifier = acc_csc_002_EmergencyAx
Step.1.2.Char.8.Unit =
Step.1.2.Char.8.Param.0 = RTexpr "Qu::acc_csc_002_EmergencyAx=AccelCtrl.DesiredAx"
Step.1.2.Char.9.Name = acc_csc_002_EmergencyAxOutOfBoundEver
Step.1.2.Char.9.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Emergency Deceleration Bound ever goes out of bound (min=-6).
Step.1.2.Char.9.Identifier = acc_csc_002_EmergencyAxOutOfBoundEver
Step.1.2.Char.9.Unit =
Step.1.2.Char.9.Param.0 = RTexpr {first()?Qu::acc_csc_002_EmergencyAxOutOfBoundEver=0:acc_csc_002_EmergencyAxOutOfBoundEver=max(acc_csc_002_EmergencyAxOutOfBoundEver,(acc_csc_002_EmergencyAx<-6))}
Step.1.2.Char.10.Name = acc_csc_002_Jerk
Step.1.2.Char.10.Description:
	Jerk = |d(DesiredAx)/dt|, base signal=AccelCtrl.DesiredAx
Step.1.2.Char.10.Identifier = acc_csc_002_Jerk
Step.1.2.Char.10.Unit =
Step.1.2.Char.10.Param.0 = RTexpr "Qu::acc_csc_002_Jerk=abs(diff(AccelCtrl.DesiredAx,Time))"
Step.1.2.Char.11.Name = acc_csc_002_JerkOverLimitEver
Step.1.2.Char.11.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment |jerk| ever exceeds 4 m/s3.
Step.1.2.Char.11.Identifier = acc_csc_002_JerkOverLimitEver
Step.1.2.Char.11.Unit =
Step.1.2.Char.11.Param.0 = RTexpr {first()?Qu::acc_csc_002_JerkOverLimitEver=0:acc_csc_002_JerkOverLimitEver=max(acc_csc_002_JerkOverLimitEver,(acc_csc_002_Jerk>4))}
Step.1.2.Char.12.Name = acc_csc_002_NoCollDist
Step.1.2.Char.12.Description:
	Distance to nearest lead object (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.2.Char.12.Identifier = acc_csc_002_NoCollDist
Step.1.2.Char.12.Unit =
Step.1.2.Char.12.Param.0 = RTexpr "Qu::acc_csc_002_NoCollDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.2.Char.13.Name = acc_csc_002_NoCollDistViolatedEver
Step.1.2.Char.13.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment distance ever drops below 0m.
Step.1.2.Char.13.Identifier = acc_csc_002_NoCollDistViolatedEver
Step.1.2.Char.13.Unit =
Step.1.2.Char.13.Param.0 = RTexpr {first()?Qu::acc_csc_002_NoCollDistViolatedEver=0:acc_csc_002_NoCollDistViolatedEver=max(acc_csc_002_NoCollDistViolatedEver,(acc_csc_002_NoCollDist<0))}
Step.1.2.Char.14.Name = acc_csc_002_CollisionFlag
Step.1.2.Char.14.Description:
	Collision flag derived from FMU.CM_ACCController_V17.Out.Debug.Target.DistX <= 0 (nearest lead object); instantaneous, used as the latch() trigger for ImpactSpeed below.
Step.1.2.Char.14.Identifier = acc_csc_002_CollisionFlag
Step.1.2.Char.14.Unit =
Step.1.2.Char.14.Param.0 = RTexpr "Qu::acc_csc_002_CollisionFlag=(FMU.CM_ACCController_V17.Out.Debug.Target.DistX<=0)"
Step.1.2.Char.15.Name = acc_csc_002_ImpactSpeed
Step.1.2.Char.15.Description:
	Ego speed latched at moment of first collision (nearest lead object)
Step.1.2.Char.15.Identifier = acc_csc_002_ImpactSpeed
Step.1.2.Char.15.Unit =
Step.1.2.Char.15.Param.0 = RTexpr {Qu::acc_csc_002_ImpactSpeed=latch(Speed("Ego"),Qu::acc_csc_002_CollisionFlag==1)}
Step.1.2.Char.16.Name = acc_csc_002_CollisionEver
Step.1.2.Char.16.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment a collision ever occurs (nearest lead object), even if the vehicles separate again before the run ends.
Step.1.2.Char.16.Identifier = acc_csc_002_CollisionEver
Step.1.2.Char.16.Unit =
Step.1.2.Char.16.Param.0 = RTexpr {first()?Qu::acc_csc_002_CollisionEver=0:acc_csc_002_CollisionEver=max(acc_csc_002_CollisionEver,(acc_csc_002_CollisionFlag==1))}
Step.1.2.Crit.0.Name = acc_csc_002 - Safe Distance Consistency
Step.1.2.Crit.0.Description:
	Good if SafeDist was never violated while actively following throughout the run. Bad if it was violated at any point.
Step.1.2.Crit.0.Good = [get acc_csc_002_SafeDistViolated] == 0
Step.1.2.Crit.0.Warn =
Step.1.2.Crit.0.Bad = [get acc_csc_002_SafeDistViolated] == 1
Step.1.2.Crit.1.Name = acc_csc_002 - Time To Collision
Step.1.2.Crit.1.Description:
	Good if TTC never entered the warn/bad zone while a valid target existed throughout the run. Warn if it ever entered [3.5,11)s. Bad if it ever entered (0,3.5)s.
Step.1.2.Crit.1.Good = [get acc_csc_002_TTCBadEver] == 0 && [get acc_csc_002_TTCWarnEver] == 0
Step.1.2.Crit.1.Warn = [get acc_csc_002_TTCBadEver] == 0 && [get acc_csc_002_TTCWarnEver] == 1
Step.1.2.Crit.1.Bad = [get acc_csc_002_TTCBadEver] == 1
Step.1.2.Crit.2.Name = acc_csc_002 - Comfort Deceleration Limit
Step.1.2.Crit.2.Description:
	Good if Comfort Deceleration Limit never went out of bound (min=-3, max=2.8) throughout the run.
Step.1.2.Crit.2.Good = [get acc_csc_002_ComfortAxOutOfBoundEver] == 0
Step.1.2.Crit.2.Warn =
Step.1.2.Crit.2.Bad = [get acc_csc_002_ComfortAxOutOfBoundEver] == 1
Step.1.2.Crit.3.Name = acc_csc_002 - Emergency Deceleration Bound
Step.1.2.Crit.3.Description:
	Good if Emergency Deceleration Bound never went out of bound (min=-6) throughout the run.
Step.1.2.Crit.3.Good = [get acc_csc_002_EmergencyAxOutOfBoundEver] == 0
Step.1.2.Crit.3.Warn =
Step.1.2.Crit.3.Bad = [get acc_csc_002_EmergencyAxOutOfBoundEver] == 1
Step.1.2.Crit.4.Name = acc_csc_002 - Jerk Limit
Step.1.2.Crit.4.Description:
	Good if |jerk| never exceeded 4 m/s3 throughout the run.
Step.1.2.Crit.4.Good = [get acc_csc_002_JerkOverLimitEver] == 0
Step.1.2.Crit.4.Warn =
Step.1.2.Crit.4.Bad = [get acc_csc_002_JerkOverLimitEver] == 1
Step.1.2.Crit.5.Name = acc_csc_002 - No Collision Distance
Step.1.2.Crit.5.Description:
	Good if distance never dropped below 0m throughout the run.
Step.1.2.Crit.5.Good = [get acc_csc_002_NoCollDistViolatedEver] == 0
Step.1.2.Crit.5.Warn =
Step.1.2.Crit.5.Bad = [get acc_csc_002_NoCollDistViolatedEver] == 1
Step.1.2.Crit.6.Name = acc_csc_002 - Collision Flag
Step.1.2.Crit.6.Description:
	Good if no collision ever occurred (nearest lead object) throughout the run.
Step.1.2.Crit.6.Good = [get acc_csc_002_CollisionEver] == 0
Step.1.2.Crit.6.Warn =
Step.1.2.Crit.6.Bad = [get acc_csc_002_CollisionEver] == 1
Step.1.2.Crit.7.Name = acc_csc_002 - Impact Speed
Step.1.2.Crit.7.Description:
	Good if no collision ever occurred, or impact speed = 0; Warn (0,5) m/s; Bad >= 5 m/s
Step.1.2.Crit.7.Good = [get acc_csc_002_CollisionEver] == 0 || [get acc_csc_002_ImpactSpeed] == 0
Step.1.2.Crit.7.Warn = [get acc_csc_002_CollisionEver] == 1 && [get acc_csc_002_ImpactSpeed] > 0 && [get acc_csc_002_ImpactSpeed] < 5
Step.1.2.Crit.7.Bad = [get acc_csc_002_CollisionEver] == 1 && [get acc_csc_002_ImpactSpeed] >= 5
Step.1.2.Var.0.Name = acc_csc_002_ds001
Step.1.2.Var.0.Param = 10 7 45
Step.1.2.Var.0.Result = bad
Step.1.2.Var.0.ResDate = 1782803191
Step.1.2.Var.0.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_002_140623.erg
Step.1.2.Var.0.ManLst = 0:long0
Step.1.2.Var.0.Char.0.Ref = acc_csc_002_ActualDist
Step.1.2.Var.0.Char.0.Value = 25.932638245053695
Step.1.2.Var.0.Char.1.Ref = acc_csc_002_SafeDist
Step.1.2.Var.0.Char.1.Value = 15.867946454108349
Step.1.2.Var.0.Char.2.Ref = acc_csc_002_SafeDistViolated
Step.1.2.Var.0.Char.2.Value = 1.0
Step.1.2.Var.0.Char.3.Ref = acc_csc_002_TTC
Step.1.2.Var.0.Char.3.Value = 0.0
Step.1.2.Var.0.Char.4.Ref = acc_csc_002_TTCWarnEver
Step.1.2.Var.0.Char.4.Value = 0.0
Step.1.2.Var.0.Char.5.Ref = acc_csc_002_TTCBadEver
Step.1.2.Var.0.Char.5.Value = 0.0
Step.1.2.Var.0.Char.6.Ref = acc_csc_002_ComfortAx
Step.1.2.Var.0.Char.6.Value = 0.0
Step.1.2.Var.0.Char.7.Ref = acc_csc_002_ComfortAxOutOfBoundEver
Step.1.2.Var.0.Char.7.Value = 0.0
Step.1.2.Var.0.Char.8.Ref = acc_csc_002_EmergencyAx
Step.1.2.Var.0.Char.8.Value = 0.0
Step.1.2.Var.0.Char.9.Ref = acc_csc_002_EmergencyAxOutOfBoundEver
Step.1.2.Var.0.Char.9.Value = 0.0
Step.1.2.Var.0.Char.10.Ref = acc_csc_002_Jerk
Step.1.2.Var.0.Char.10.Value = 0.0
Step.1.2.Var.0.Char.11.Ref = acc_csc_002_JerkOverLimitEver
Step.1.2.Var.0.Char.11.Value = 1.0
Step.1.2.Var.0.Char.12.Ref = acc_csc_002_NoCollDist
Step.1.2.Var.0.Char.12.Value = 25.932638245053695
Step.1.2.Var.0.Char.13.Ref = acc_csc_002_NoCollDistViolatedEver
Step.1.2.Var.0.Char.13.Value = 0.0
Step.1.2.Var.0.Char.14.Ref = acc_csc_002_CollisionFlag
Step.1.2.Var.0.Char.14.Value = 0.0
Step.1.2.Var.0.Char.15.Ref = acc_csc_002_ImpactSpeed
Step.1.2.Var.0.Char.15.Value = 0.0
Step.1.2.Var.0.Char.16.Ref = acc_csc_002_CollisionEver
Step.1.2.Var.0.Char.16.Value = 0.0
Step.1.2.Var.0.Crit.0.Ref = acc_csc_002 - Safe Distance Consistency
Step.1.2.Var.0.Crit.0.Result = bad
Step.1.2.Var.0.Crit.1.Ref = acc_csc_002 - Time To Collision
Step.1.2.Var.0.Crit.1.Result = good
Step.1.2.Var.0.Crit.2.Ref = acc_csc_002 - Comfort Deceleration Limit
Step.1.2.Var.0.Crit.2.Result = good
Step.1.2.Var.0.Crit.3.Ref = acc_csc_002 - Emergency Deceleration Bound
Step.1.2.Var.0.Crit.3.Result = good
Step.1.2.Var.0.Crit.4.Ref = acc_csc_002 - Jerk Limit
Step.1.2.Var.0.Crit.4.Result = bad
Step.1.2.Var.0.Crit.5.Ref = acc_csc_002 - No Collision Distance
Step.1.2.Var.0.Crit.5.Result = good
Step.1.2.Var.0.Crit.6.Ref = acc_csc_002 - Collision Flag
Step.1.2.Var.0.Crit.6.Result = good
Step.1.2.Var.0.Crit.7.Ref = acc_csc_002 - Impact Speed
Step.1.2.Var.0.Crit.7.Result = good
Step.1.2.Var.1.Name = acc_csc_002_ds002
Step.1.2.Var.1.Param = 15 10 60
Step.1.2.Var.1.Result = bad
Step.1.2.Var.1.ResDate = 1782803203
Step.1.2.Var.1.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_002_140635.erg
Step.1.2.Var.1.ManLst = 0:long0
Step.1.2.Var.1.Char.0.Ref = acc_csc_002_ActualDist
Step.1.2.Var.1.Char.0.Value = 999.0
Step.1.2.Var.1.Char.1.Ref = acc_csc_002_SafeDist
Step.1.2.Var.1.Char.1.Value = 25.919613353464662
Step.1.2.Var.1.Char.2.Ref = acc_csc_002_SafeDistViolated
Step.1.2.Var.1.Char.2.Value = 1.0
Step.1.2.Var.1.Char.3.Ref = acc_csc_002_TTC
Step.1.2.Var.1.Char.3.Value = 0.0
Step.1.2.Var.1.Char.4.Ref = acc_csc_002_TTCWarnEver
Step.1.2.Var.1.Char.4.Value = 0.0
Step.1.2.Var.1.Char.5.Ref = acc_csc_002_TTCBadEver
Step.1.2.Var.1.Char.5.Value = 0.0
Step.1.2.Var.1.Char.6.Ref = acc_csc_002_ComfortAx
Step.1.2.Var.1.Char.6.Value = 2.8
Step.1.2.Var.1.Char.7.Ref = acc_csc_002_ComfortAxOutOfBoundEver
Step.1.2.Var.1.Char.7.Value = 1.0
Step.1.2.Var.1.Char.8.Ref = acc_csc_002_EmergencyAx
Step.1.2.Var.1.Char.8.Value = 2.8
Step.1.2.Var.1.Char.9.Ref = acc_csc_002_EmergencyAxOutOfBoundEver
Step.1.2.Var.1.Char.9.Value = 0.0
Step.1.2.Var.1.Char.10.Ref = acc_csc_002_Jerk
Step.1.2.Var.1.Char.10.Value = 0.0
Step.1.2.Var.1.Char.11.Ref = acc_csc_002_JerkOverLimitEver
Step.1.2.Var.1.Char.11.Value = 1.0
Step.1.2.Var.1.Char.12.Ref = acc_csc_002_NoCollDist
Step.1.2.Var.1.Char.12.Value = 999.0
Step.1.2.Var.1.Char.13.Ref = acc_csc_002_NoCollDistViolatedEver
Step.1.2.Var.1.Char.13.Value = 0.0
Step.1.2.Var.1.Char.14.Ref = acc_csc_002_CollisionFlag
Step.1.2.Var.1.Char.14.Value = 0.0
Step.1.2.Var.1.Char.15.Ref = acc_csc_002_ImpactSpeed
Step.1.2.Var.1.Char.15.Value = 0.0
Step.1.2.Var.1.Char.16.Ref = acc_csc_002_CollisionEver
Step.1.2.Var.1.Char.16.Value = 0.0
Step.1.2.Var.1.Crit.0.Ref = acc_csc_002 - Safe Distance Consistency
Step.1.2.Var.1.Crit.0.Result = bad
Step.1.2.Var.1.Crit.1.Ref = acc_csc_002 - Time To Collision
Step.1.2.Var.1.Crit.1.Result = good
Step.1.2.Var.1.Crit.2.Ref = acc_csc_002 - Comfort Deceleration Limit
Step.1.2.Var.1.Crit.2.Result = bad
Step.1.2.Var.1.Crit.3.Ref = acc_csc_002 - Emergency Deceleration Bound
Step.1.2.Var.1.Crit.3.Result = good
Step.1.2.Var.1.Crit.4.Ref = acc_csc_002 - Jerk Limit
Step.1.2.Var.1.Crit.4.Result = bad
Step.1.2.Var.1.Crit.5.Ref = acc_csc_002 - No Collision Distance
Step.1.2.Var.1.Crit.5.Result = good
Step.1.2.Var.1.Crit.6.Ref = acc_csc_002 - Collision Flag
Step.1.2.Var.1.Crit.6.Result = good
Step.1.2.Var.1.Crit.7.Ref = acc_csc_002 - Impact Speed
Step.1.2.Var.1.Crit.7.Result = good
Step.1.2.Var.2.Name = acc_csc_002_ds003
Step.1.2.Var.2.Param = 20 14 80
Step.1.2.Var.2.Result = bad
Step.1.2.Var.2.ResDate = 1782803215
Step.1.2.Var.2.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_002_140647.erg
Step.1.2.Var.2.ManLst = 0:long0
Step.1.2.Var.2.Char.0.Ref = acc_csc_002_ActualDist
Step.1.2.Var.2.Char.0.Value = 999.0
Step.1.2.Var.2.Char.1.Ref = acc_csc_002_SafeDist
Step.1.2.Var.2.Char.1.Value = 35.21827892639731
Step.1.2.Var.2.Char.2.Ref = acc_csc_002_SafeDistViolated
Step.1.2.Var.2.Char.2.Value = 1.0
Step.1.2.Var.2.Char.3.Ref = acc_csc_002_TTC
Step.1.2.Var.2.Char.3.Value = 0.0
Step.1.2.Var.2.Char.4.Ref = acc_csc_002_TTCWarnEver
Step.1.2.Var.2.Char.4.Value = 0.0
Step.1.2.Var.2.Char.5.Ref = acc_csc_002_TTCBadEver
Step.1.2.Var.2.Char.5.Value = 0.0
Step.1.2.Var.2.Char.6.Ref = acc_csc_002_ComfortAx
Step.1.2.Var.2.Char.6.Value = -0.004
Step.1.2.Var.2.Char.7.Ref = acc_csc_002_ComfortAxOutOfBoundEver
Step.1.2.Var.2.Char.7.Value = 1.0
Step.1.2.Var.2.Char.8.Ref = acc_csc_002_EmergencyAx
Step.1.2.Var.2.Char.8.Value = -0.004
Step.1.2.Var.2.Char.9.Ref = acc_csc_002_EmergencyAxOutOfBoundEver
Step.1.2.Var.2.Char.9.Value = 0.0
Step.1.2.Var.2.Char.10.Ref = acc_csc_002_Jerk
Step.1.2.Var.2.Char.10.Value = 0.0
Step.1.2.Var.2.Char.11.Ref = acc_csc_002_JerkOverLimitEver
Step.1.2.Var.2.Char.11.Value = 1.0
Step.1.2.Var.2.Char.12.Ref = acc_csc_002_NoCollDist
Step.1.2.Var.2.Char.12.Value = 999.0
Step.1.2.Var.2.Char.13.Ref = acc_csc_002_NoCollDistViolatedEver
Step.1.2.Var.2.Char.13.Value = 0.0
Step.1.2.Var.2.Char.14.Ref = acc_csc_002_CollisionFlag
Step.1.2.Var.2.Char.14.Value = 0.0
Step.1.2.Var.2.Char.15.Ref = acc_csc_002_ImpactSpeed
Step.1.2.Var.2.Char.15.Value = 0.0
Step.1.2.Var.2.Char.16.Ref = acc_csc_002_CollisionEver
Step.1.2.Var.2.Char.16.Value = 0.0
Step.1.2.Var.2.Crit.0.Ref = acc_csc_002 - Safe Distance Consistency
Step.1.2.Var.2.Crit.0.Result = bad
Step.1.2.Var.2.Crit.1.Ref = acc_csc_002 - Time To Collision
Step.1.2.Var.2.Crit.1.Result = good
Step.1.2.Var.2.Crit.2.Ref = acc_csc_002 - Comfort Deceleration Limit
Step.1.2.Var.2.Crit.2.Result = bad
Step.1.2.Var.2.Crit.3.Ref = acc_csc_002 - Emergency Deceleration Bound
Step.1.2.Var.2.Crit.3.Result = good
Step.1.2.Var.2.Crit.4.Ref = acc_csc_002 - Jerk Limit
Step.1.2.Var.2.Crit.4.Result = bad
Step.1.2.Var.2.Crit.5.Ref = acc_csc_002 - No Collision Distance
Step.1.2.Var.2.Crit.5.Result = good
Step.1.2.Var.2.Crit.6.Ref = acc_csc_002 - Collision Flag
Step.1.2.Var.2.Crit.6.Result = good
Step.1.2.Var.2.Crit.7.Ref = acc_csc_002 - Impact Speed
Step.1.2.Var.2.Crit.7.Result = good
Step.1.2.Var.3.Name = acc_csc_002_ds004
Step.1.2.Var.3.Param = 25 18 105
Step.1.2.Var.3.Result = bad
Step.1.2.Var.3.ResDate = 1782803227
Step.1.2.Var.3.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_002_140659.erg
Step.1.2.Var.3.ManLst = 0:long0
Step.1.2.Var.3.Char.0.Ref = acc_csc_002_ActualDist
Step.1.2.Var.3.Char.0.Value = 64.27429172069904
Step.1.2.Var.3.Char.1.Ref = acc_csc_002_SafeDist
Step.1.2.Var.3.Char.1.Value = 35.36612752862209
Step.1.2.Var.3.Char.2.Ref = acc_csc_002_SafeDistViolated
Step.1.2.Var.3.Char.2.Value = 1.0
Step.1.2.Var.3.Char.3.Ref = acc_csc_002_TTC
Step.1.2.Var.3.Char.3.Value = 0.0
Step.1.2.Var.3.Char.4.Ref = acc_csc_002_TTCWarnEver
Step.1.2.Var.3.Char.4.Value = 0.0
Step.1.2.Var.3.Char.5.Ref = acc_csc_002_TTCBadEver
Step.1.2.Var.3.Char.5.Value = 0.0
Step.1.2.Var.3.Char.6.Ref = acc_csc_002_ComfortAx
Step.1.2.Var.3.Char.6.Value = -0.3012617490859441
Step.1.2.Var.3.Char.7.Ref = acc_csc_002_ComfortAxOutOfBoundEver
Step.1.2.Var.3.Char.7.Value = 1.0
Step.1.2.Var.3.Char.8.Ref = acc_csc_002_EmergencyAx
Step.1.2.Var.3.Char.8.Value = -0.3012617490859441
Step.1.2.Var.3.Char.9.Ref = acc_csc_002_EmergencyAxOutOfBoundEver
Step.1.2.Var.3.Char.9.Value = 0.0
Step.1.2.Var.3.Char.10.Ref = acc_csc_002_Jerk
Step.1.2.Var.3.Char.10.Value = 0.2227707982077805
Step.1.2.Var.3.Char.11.Ref = acc_csc_002_JerkOverLimitEver
Step.1.2.Var.3.Char.11.Value = 1.0
Step.1.2.Var.3.Char.12.Ref = acc_csc_002_NoCollDist
Step.1.2.Var.3.Char.12.Value = 64.27429172069904
Step.1.2.Var.3.Char.13.Ref = acc_csc_002_NoCollDistViolatedEver
Step.1.2.Var.3.Char.13.Value = 0.0
Step.1.2.Var.3.Char.14.Ref = acc_csc_002_CollisionFlag
Step.1.2.Var.3.Char.14.Value = 0.0
Step.1.2.Var.3.Char.15.Ref = acc_csc_002_ImpactSpeed
Step.1.2.Var.3.Char.15.Value = 0.0
Step.1.2.Var.3.Char.16.Ref = acc_csc_002_CollisionEver
Step.1.2.Var.3.Char.16.Value = 0.0
Step.1.2.Var.3.Crit.0.Ref = acc_csc_002 - Safe Distance Consistency
Step.1.2.Var.3.Crit.0.Result = bad
Step.1.2.Var.3.Crit.1.Ref = acc_csc_002 - Time To Collision
Step.1.2.Var.3.Crit.1.Result = good
Step.1.2.Var.3.Crit.2.Ref = acc_csc_002 - Comfort Deceleration Limit
Step.1.2.Var.3.Crit.2.Result = bad
Step.1.2.Var.3.Crit.3.Ref = acc_csc_002 - Emergency Deceleration Bound
Step.1.2.Var.3.Crit.3.Result = good
Step.1.2.Var.3.Crit.4.Ref = acc_csc_002 - Jerk Limit
Step.1.2.Var.3.Crit.4.Result = bad
Step.1.2.Var.3.Crit.5.Ref = acc_csc_002 - No Collision Distance
Step.1.2.Var.3.Crit.5.Result = good
Step.1.2.Var.3.Crit.6.Ref = acc_csc_002 - Collision Flag
Step.1.2.Var.3.Crit.6.Result = good
Step.1.2.Var.3.Crit.7.Ref = acc_csc_002 - Impact Speed
Step.1.2.Var.3.Crit.7.Result = good
Step.1.2.Var.4.Name = acc_csc_002_ds005
Step.1.2.Var.4.Param = 30 22 120
Step.1.2.Var.4.Result = bad
Step.1.2.Var.4.ResDate = 1782803239
Step.1.2.Var.4.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_002_140711.erg
Step.1.2.Var.4.ManLst = 0:long0
Step.1.2.Var.4.Char.0.Ref = acc_csc_002_ActualDist
Step.1.2.Var.4.Char.0.Value = 999.0
Step.1.2.Var.4.Char.1.Ref = acc_csc_002_SafeDist
Step.1.2.Var.4.Char.1.Value = 44.986427462362
Step.1.2.Var.4.Char.2.Ref = acc_csc_002_SafeDistViolated
Step.1.2.Var.4.Char.2.Value = 1.0
Step.1.2.Var.4.Char.3.Ref = acc_csc_002_TTC
Step.1.2.Var.4.Char.3.Value = 0.0
Step.1.2.Var.4.Char.4.Ref = acc_csc_002_TTCWarnEver
Step.1.2.Var.4.Char.4.Value = 0.0
Step.1.2.Var.4.Char.5.Ref = acc_csc_002_TTCBadEver
Step.1.2.Var.4.Char.5.Value = 0.0
Step.1.2.Var.4.Char.6.Ref = acc_csc_002_ComfortAx
Step.1.2.Var.4.Char.6.Value = -0.004
Step.1.2.Var.4.Char.7.Ref = acc_csc_002_ComfortAxOutOfBoundEver
Step.1.2.Var.4.Char.7.Value = 1.0
Step.1.2.Var.4.Char.8.Ref = acc_csc_002_EmergencyAx
Step.1.2.Var.4.Char.8.Value = -0.004
Step.1.2.Var.4.Char.9.Ref = acc_csc_002_EmergencyAxOutOfBoundEver
Step.1.2.Var.4.Char.9.Value = 0.0
Step.1.2.Var.4.Char.10.Ref = acc_csc_002_Jerk
Step.1.2.Var.4.Char.10.Value = 0.0
Step.1.2.Var.4.Char.11.Ref = acc_csc_002_JerkOverLimitEver
Step.1.2.Var.4.Char.11.Value = 1.0
Step.1.2.Var.4.Char.12.Ref = acc_csc_002_NoCollDist
Step.1.2.Var.4.Char.12.Value = 999.0
Step.1.2.Var.4.Char.13.Ref = acc_csc_002_NoCollDistViolatedEver
Step.1.2.Var.4.Char.13.Value = 0.0
Step.1.2.Var.4.Char.14.Ref = acc_csc_002_CollisionFlag
Step.1.2.Var.4.Char.14.Value = 0.0
Step.1.2.Var.4.Char.15.Ref = acc_csc_002_ImpactSpeed
Step.1.2.Var.4.Char.15.Value = 0.0
Step.1.2.Var.4.Char.16.Ref = acc_csc_002_CollisionEver
Step.1.2.Var.4.Char.16.Value = 0.0
Step.1.2.Var.4.Crit.0.Ref = acc_csc_002 - Safe Distance Consistency
Step.1.2.Var.4.Crit.0.Result = bad
Step.1.2.Var.4.Crit.1.Ref = acc_csc_002 - Time To Collision
Step.1.2.Var.4.Crit.1.Result = good
Step.1.2.Var.4.Crit.2.Ref = acc_csc_002 - Comfort Deceleration Limit
Step.1.2.Var.4.Crit.2.Result = bad
Step.1.2.Var.4.Crit.3.Ref = acc_csc_002 - Emergency Deceleration Bound
Step.1.2.Var.4.Crit.3.Result = good
Step.1.2.Var.4.Crit.4.Ref = acc_csc_002 - Jerk Limit
Step.1.2.Var.4.Crit.4.Result = bad
Step.1.2.Var.4.Crit.5.Ref = acc_csc_002 - No Collision Distance
Step.1.2.Var.4.Crit.5.Result = good
Step.1.2.Var.4.Crit.6.Ref = acc_csc_002 - Collision Flag
Step.1.2.Var.4.Crit.6.Result = good
Step.1.2.Var.4.Crit.7.Ref = acc_csc_002 - Impact Speed
Step.1.2.Var.4.Crit.7.Result = good
Step.1.3 = TestRun
Step.1.3.Name = OSC_Imported/longitudinal_feature/ACC/acc_csc_003
Step.1.3.Param.0 = EgoSpeed NValue
Step.1.3.Param.1 = TVSpeed NValue
Step.1.3.Param.2 = TV_initPos NValue
Step.1.3.Char.0.Name = acc_csc_003_ActualDist
Step.1.3.Char.0.Description:
	Actual distance to lead (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.3.Char.0.Identifier = acc_csc_003_ActualDist
Step.1.3.Char.0.Unit =
Step.1.3.Char.0.Param.0 = RTexpr "Qu::acc_csc_003_ActualDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.3.Char.1.Name = acc_csc_003_SafeDist
Step.1.3.Char.1.Description:
	Reference safe distance (signal=FMU.CM_ACCController_V17.Out.Debug.SafeDistance)
Step.1.3.Char.1.Identifier = acc_csc_003_SafeDist
Step.1.3.Char.1.Unit =
Step.1.3.Char.1.Param.0 = RTexpr "Qu::acc_csc_003_SafeDist=FMU.CM_ACCController_V17.Out.Debug.SafeDistance"
Step.1.3.Char.2.Name = acc_csc_003_SafeDistViolated
Step.1.3.Char.2.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment ActualDist<SafeDist while actively following (gate==1); stays 1 for the rest of the run even if distance recovers.
Step.1.3.Char.2.Identifier = acc_csc_003_SafeDistViolated
Step.1.3.Char.2.Unit =
Step.1.3.Char.2.Param.0 = RTexpr {first()?Qu::acc_csc_003_SafeDistViolated=0:acc_csc_003_SafeDistViolated=max(acc_csc_003_SafeDistViolated,(FMU.CM_ACCController_V17.Out.Debug.Fusion.Active==1 && acc_csc_003_ActualDist<acc_csc_003_SafeDist))}
Step.1.3.Char.3.Name = acc_csc_003_TTC
Step.1.3.Char.3.Description:
	Time-to-collision (signal=AccelCtrl.ACC.Time2Collision)
Step.1.3.Char.3.Identifier = acc_csc_003_TTC
Step.1.3.Char.3.Unit =
Step.1.3.Char.3.Param.0 = RTexpr "Qu::acc_csc_003_TTC=AccelCtrl.ACC.Time2Collision"
Step.1.3.Char.4.Name = acc_csc_003_TTCWarnEver
Step.1.3.Char.4.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the warn zone [3.5,11)s.
Step.1.3.Char.4.Identifier = acc_csc_003_TTCWarnEver
Step.1.3.Char.4.Unit =
Step.1.3.Char.4.Param.0 = RTexpr {first()?Qu::acc_csc_003_TTCWarnEver=0:acc_csc_003_TTCWarnEver=max(acc_csc_003_TTCWarnEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_003_TTC>=3.5 && acc_csc_003_TTC<11))}
Step.1.3.Char.5.Name = acc_csc_003_TTCBadEver
Step.1.3.Char.5.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the bad zone (0,3.5)s.
Step.1.3.Char.5.Identifier = acc_csc_003_TTCBadEver
Step.1.3.Char.5.Unit =
Step.1.3.Char.5.Param.0 = RTexpr {first()?Qu::acc_csc_003_TTCBadEver=0:acc_csc_003_TTCBadEver=max(acc_csc_003_TTCBadEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_003_TTC>0 && acc_csc_003_TTC<3.5))}
Step.1.3.Char.6.Name = acc_csc_003_ComfortAx
Step.1.3.Char.6.Description:
	Comfort Deceleration Limit (signal=AccelCtrl.DesiredAx)
Step.1.3.Char.6.Identifier = acc_csc_003_ComfortAx
Step.1.3.Char.6.Unit =
Step.1.3.Char.6.Param.0 = RTexpr "Qu::acc_csc_003_ComfortAx=AccelCtrl.DesiredAx"
Step.1.3.Char.7.Name = acc_csc_003_ComfortAxOutOfBoundEver
Step.1.3.Char.7.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Comfort Deceleration Limit ever goes out of bound (min=-3, max=2.8).
Step.1.3.Char.7.Identifier = acc_csc_003_ComfortAxOutOfBoundEver
Step.1.3.Char.7.Unit =
Step.1.3.Char.7.Param.0 = RTexpr {first()?Qu::acc_csc_003_ComfortAxOutOfBoundEver=0:acc_csc_003_ComfortAxOutOfBoundEver=max(acc_csc_003_ComfortAxOutOfBoundEver,(acc_csc_003_ComfortAx<-3 || acc_csc_003_ComfortAx>2.8))}
Step.1.3.Char.8.Name = acc_csc_003_EmergencyAx
Step.1.3.Char.8.Description:
	Emergency Deceleration Bound (signal=AccelCtrl.DesiredAx)
Step.1.3.Char.8.Identifier = acc_csc_003_EmergencyAx
Step.1.3.Char.8.Unit =
Step.1.3.Char.8.Param.0 = RTexpr "Qu::acc_csc_003_EmergencyAx=AccelCtrl.DesiredAx"
Step.1.3.Char.9.Name = acc_csc_003_EmergencyAxOutOfBoundEver
Step.1.3.Char.9.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Emergency Deceleration Bound ever goes out of bound (min=-6).
Step.1.3.Char.9.Identifier = acc_csc_003_EmergencyAxOutOfBoundEver
Step.1.3.Char.9.Unit =
Step.1.3.Char.9.Param.0 = RTexpr {first()?Qu::acc_csc_003_EmergencyAxOutOfBoundEver=0:acc_csc_003_EmergencyAxOutOfBoundEver=max(acc_csc_003_EmergencyAxOutOfBoundEver,(acc_csc_003_EmergencyAx<-6))}
Step.1.3.Char.10.Name = acc_csc_003_Jerk
Step.1.3.Char.10.Description:
	Jerk = |d(DesiredAx)/dt|, base signal=AccelCtrl.DesiredAx
Step.1.3.Char.10.Identifier = acc_csc_003_Jerk
Step.1.3.Char.10.Unit =
Step.1.3.Char.10.Param.0 = RTexpr "Qu::acc_csc_003_Jerk=abs(diff(AccelCtrl.DesiredAx,Time))"
Step.1.3.Char.11.Name = acc_csc_003_JerkOverLimitEver
Step.1.3.Char.11.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment |jerk| ever exceeds 4 m/s3.
Step.1.3.Char.11.Identifier = acc_csc_003_JerkOverLimitEver
Step.1.3.Char.11.Unit =
Step.1.3.Char.11.Param.0 = RTexpr {first()?Qu::acc_csc_003_JerkOverLimitEver=0:acc_csc_003_JerkOverLimitEver=max(acc_csc_003_JerkOverLimitEver,(acc_csc_003_Jerk>4))}
Step.1.3.Char.12.Name = acc_csc_003_NoCollDist
Step.1.3.Char.12.Description:
	Distance to nearest lead object (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.3.Char.12.Identifier = acc_csc_003_NoCollDist
Step.1.3.Char.12.Unit =
Step.1.3.Char.12.Param.0 = RTexpr "Qu::acc_csc_003_NoCollDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.3.Char.13.Name = acc_csc_003_NoCollDistViolatedEver
Step.1.3.Char.13.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment distance ever drops below 0m.
Step.1.3.Char.13.Identifier = acc_csc_003_NoCollDistViolatedEver
Step.1.3.Char.13.Unit =
Step.1.3.Char.13.Param.0 = RTexpr {first()?Qu::acc_csc_003_NoCollDistViolatedEver=0:acc_csc_003_NoCollDistViolatedEver=max(acc_csc_003_NoCollDistViolatedEver,(acc_csc_003_NoCollDist<0))}
Step.1.3.Char.14.Name = acc_csc_003_CollisionFlag
Step.1.3.Char.14.Description:
	Collision flag derived from FMU.CM_ACCController_V17.Out.Debug.Target.DistX <= 0 (nearest lead object); instantaneous, used as the latch() trigger for ImpactSpeed below.
Step.1.3.Char.14.Identifier = acc_csc_003_CollisionFlag
Step.1.3.Char.14.Unit =
Step.1.3.Char.14.Param.0 = RTexpr "Qu::acc_csc_003_CollisionFlag=(FMU.CM_ACCController_V17.Out.Debug.Target.DistX<=0)"
Step.1.3.Char.15.Name = acc_csc_003_ImpactSpeed
Step.1.3.Char.15.Description:
	Ego speed latched at moment of first collision (nearest lead object)
Step.1.3.Char.15.Identifier = acc_csc_003_ImpactSpeed
Step.1.3.Char.15.Unit =
Step.1.3.Char.15.Param.0 = RTexpr {Qu::acc_csc_003_ImpactSpeed=latch(Speed("Ego"),Qu::acc_csc_003_CollisionFlag==1)}
Step.1.3.Char.16.Name = acc_csc_003_CollisionEver
Step.1.3.Char.16.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment a collision ever occurs (nearest lead object), even if the vehicles separate again before the run ends.
Step.1.3.Char.16.Identifier = acc_csc_003_CollisionEver
Step.1.3.Char.16.Unit =
Step.1.3.Char.16.Param.0 = RTexpr {first()?Qu::acc_csc_003_CollisionEver=0:acc_csc_003_CollisionEver=max(acc_csc_003_CollisionEver,(acc_csc_003_CollisionFlag==1))}
Step.1.3.Crit.0.Name = acc_csc_003 - Safe Distance Consistency
Step.1.3.Crit.0.Description:
	Good if SafeDist was never violated while actively following throughout the run. Bad if it was violated at any point.
Step.1.3.Crit.0.Good = [get acc_csc_003_SafeDistViolated] == 0
Step.1.3.Crit.0.Warn =
Step.1.3.Crit.0.Bad = [get acc_csc_003_SafeDistViolated] == 1
Step.1.3.Crit.1.Name = acc_csc_003 - Time To Collision
Step.1.3.Crit.1.Description:
	Good if TTC never entered the warn/bad zone while a valid target existed throughout the run. Warn if it ever entered [3.5,11)s. Bad if it ever entered (0,3.5)s.
Step.1.3.Crit.1.Good = [get acc_csc_003_TTCBadEver] == 0 && [get acc_csc_003_TTCWarnEver] == 0
Step.1.3.Crit.1.Warn = [get acc_csc_003_TTCBadEver] == 0 && [get acc_csc_003_TTCWarnEver] == 1
Step.1.3.Crit.1.Bad = [get acc_csc_003_TTCBadEver] == 1
Step.1.3.Crit.2.Name = acc_csc_003 - Comfort Deceleration Limit
Step.1.3.Crit.2.Description:
	Good if Comfort Deceleration Limit never went out of bound (min=-3, max=2.8) throughout the run.
Step.1.3.Crit.2.Good = [get acc_csc_003_ComfortAxOutOfBoundEver] == 0
Step.1.3.Crit.2.Warn =
Step.1.3.Crit.2.Bad = [get acc_csc_003_ComfortAxOutOfBoundEver] == 1
Step.1.3.Crit.3.Name = acc_csc_003 - Emergency Deceleration Bound
Step.1.3.Crit.3.Description:
	Good if Emergency Deceleration Bound never went out of bound (min=-6) throughout the run.
Step.1.3.Crit.3.Good = [get acc_csc_003_EmergencyAxOutOfBoundEver] == 0
Step.1.3.Crit.3.Warn =
Step.1.3.Crit.3.Bad = [get acc_csc_003_EmergencyAxOutOfBoundEver] == 1
Step.1.3.Crit.4.Name = acc_csc_003 - Jerk Limit
Step.1.3.Crit.4.Description:
	Good if |jerk| never exceeded 4 m/s3 throughout the run.
Step.1.3.Crit.4.Good = [get acc_csc_003_JerkOverLimitEver] == 0
Step.1.3.Crit.4.Warn =
Step.1.3.Crit.4.Bad = [get acc_csc_003_JerkOverLimitEver] == 1
Step.1.3.Crit.5.Name = acc_csc_003 - No Collision Distance
Step.1.3.Crit.5.Description:
	Good if distance never dropped below 0m throughout the run.
Step.1.3.Crit.5.Good = [get acc_csc_003_NoCollDistViolatedEver] == 0
Step.1.3.Crit.5.Warn =
Step.1.3.Crit.5.Bad = [get acc_csc_003_NoCollDistViolatedEver] == 1
Step.1.3.Crit.6.Name = acc_csc_003 - Collision Flag
Step.1.3.Crit.6.Description:
	Good if no collision ever occurred (nearest lead object) throughout the run.
Step.1.3.Crit.6.Good = [get acc_csc_003_CollisionEver] == 0
Step.1.3.Crit.6.Warn =
Step.1.3.Crit.6.Bad = [get acc_csc_003_CollisionEver] == 1
Step.1.3.Crit.7.Name = acc_csc_003 - Impact Speed
Step.1.3.Crit.7.Description:
	Good if no collision ever occurred, or impact speed = 0; Warn (0,5) m/s; Bad >= 5 m/s
Step.1.3.Crit.7.Good = [get acc_csc_003_CollisionEver] == 0 || [get acc_csc_003_ImpactSpeed] == 0
Step.1.3.Crit.7.Warn = [get acc_csc_003_CollisionEver] == 1 && [get acc_csc_003_ImpactSpeed] > 0 && [get acc_csc_003_ImpactSpeed] < 5
Step.1.3.Crit.7.Bad = [get acc_csc_003_CollisionEver] == 1 && [get acc_csc_003_ImpactSpeed] >= 5
Step.1.3.Var.0.Name = acc_csc_003_ds001
Step.1.3.Var.0.Param = 12 8 45
Step.1.3.Var.0.Result = bad
Step.1.3.Var.0.ResDate = 1782803251
Step.1.3.Var.0.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_003_140723.erg
Step.1.3.Var.0.Char.0.Ref = acc_csc_003_ActualDist
Step.1.3.Var.0.Char.0.Value = 140.8871314677621
Step.1.3.Var.0.Char.1.Ref = acc_csc_003_SafeDist
Step.1.3.Var.0.Char.1.Value = 15.0
Step.1.3.Var.0.Char.2.Ref = acc_csc_003_SafeDistViolated
Step.1.3.Var.0.Char.2.Value = 1.0
Step.1.3.Var.0.Char.3.Ref = acc_csc_003_TTC
Step.1.3.Var.0.Char.3.Value = 0.0
Step.1.3.Var.0.Char.4.Ref = acc_csc_003_TTCWarnEver
Step.1.3.Var.0.Char.4.Value = 0.0
Step.1.3.Var.0.Char.5.Ref = acc_csc_003_TTCBadEver
Step.1.3.Var.0.Char.5.Value = 0.0
Step.1.3.Var.0.Char.6.Ref = acc_csc_003_ComfortAx
Step.1.3.Var.0.Char.6.Value = 0.0
Step.1.3.Var.0.Char.7.Ref = acc_csc_003_ComfortAxOutOfBoundEver
Step.1.3.Var.0.Char.7.Value = 1.0
Step.1.3.Var.0.Char.8.Ref = acc_csc_003_EmergencyAx
Step.1.3.Var.0.Char.8.Value = 0.0
Step.1.3.Var.0.Char.9.Ref = acc_csc_003_EmergencyAxOutOfBoundEver
Step.1.3.Var.0.Char.9.Value = 0.0
Step.1.3.Var.0.Char.10.Ref = acc_csc_003_Jerk
Step.1.3.Var.0.Char.10.Value = 0.0
Step.1.3.Var.0.Char.11.Ref = acc_csc_003_JerkOverLimitEver
Step.1.3.Var.0.Char.11.Value = 1.0
Step.1.3.Var.0.Char.12.Ref = acc_csc_003_NoCollDist
Step.1.3.Var.0.Char.12.Value = 140.8871314677621
Step.1.3.Var.0.Char.13.Ref = acc_csc_003_NoCollDistViolatedEver
Step.1.3.Var.0.Char.13.Value = 0.0
Step.1.3.Var.0.Char.14.Ref = acc_csc_003_CollisionFlag
Step.1.3.Var.0.Char.14.Value = 0.0
Step.1.3.Var.0.Char.15.Ref = acc_csc_003_ImpactSpeed
Step.1.3.Var.0.Char.15.Value = 0.0
Step.1.3.Var.0.Char.16.Ref = acc_csc_003_CollisionEver
Step.1.3.Var.0.Char.16.Value = 0.0
Step.1.3.Var.0.Crit.0.Ref = acc_csc_003 - Safe Distance Consistency
Step.1.3.Var.0.Crit.0.Result = bad
Step.1.3.Var.0.Crit.1.Ref = acc_csc_003 - Time To Collision
Step.1.3.Var.0.Crit.1.Result = good
Step.1.3.Var.0.Crit.2.Ref = acc_csc_003 - Comfort Deceleration Limit
Step.1.3.Var.0.Crit.2.Result = bad
Step.1.3.Var.0.Crit.3.Ref = acc_csc_003 - Emergency Deceleration Bound
Step.1.3.Var.0.Crit.3.Result = good
Step.1.3.Var.0.Crit.4.Ref = acc_csc_003 - Jerk Limit
Step.1.3.Var.0.Crit.4.Result = bad
Step.1.3.Var.0.Crit.5.Ref = acc_csc_003 - No Collision Distance
Step.1.3.Var.0.Crit.5.Result = good
Step.1.3.Var.0.Crit.6.Ref = acc_csc_003 - Collision Flag
Step.1.3.Var.0.Crit.6.Result = good
Step.1.3.Var.0.Crit.7.Ref = acc_csc_003 - Impact Speed
Step.1.3.Var.0.Crit.7.Result = good
Step.1.3.Var.1.Name = acc_csc_003_ds002
Step.1.3.Var.1.Param = 15 10 55
Step.1.3.Var.1.Result = bad
Step.1.3.Var.1.ResDate = 1782803263
Step.1.3.Var.1.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_003_140735.erg
Step.1.3.Var.1.Char.0.Ref = acc_csc_003_ActualDist
Step.1.3.Var.1.Char.0.Value = 999.0
Step.1.3.Var.1.Char.1.Ref = acc_csc_003_SafeDist
Step.1.3.Var.1.Char.1.Value = 35.04566389659644
Step.1.3.Var.1.Char.2.Ref = acc_csc_003_SafeDistViolated
Step.1.3.Var.1.Char.2.Value = 1.0
Step.1.3.Var.1.Char.3.Ref = acc_csc_003_TTC
Step.1.3.Var.1.Char.3.Value = 0.0
Step.1.3.Var.1.Char.4.Ref = acc_csc_003_TTCWarnEver
Step.1.3.Var.1.Char.4.Value = 0.0
Step.1.3.Var.1.Char.5.Ref = acc_csc_003_TTCBadEver
Step.1.3.Var.1.Char.5.Value = 0.0
Step.1.3.Var.1.Char.6.Ref = acc_csc_003_ComfortAx
Step.1.3.Var.1.Char.6.Value = -0.004
Step.1.3.Var.1.Char.7.Ref = acc_csc_003_ComfortAxOutOfBoundEver
Step.1.3.Var.1.Char.7.Value = 1.0
Step.1.3.Var.1.Char.8.Ref = acc_csc_003_EmergencyAx
Step.1.3.Var.1.Char.8.Value = -0.004
Step.1.3.Var.1.Char.9.Ref = acc_csc_003_EmergencyAxOutOfBoundEver
Step.1.3.Var.1.Char.9.Value = 0.0
Step.1.3.Var.1.Char.10.Ref = acc_csc_003_Jerk
Step.1.3.Var.1.Char.10.Value = 0.0
Step.1.3.Var.1.Char.11.Ref = acc_csc_003_JerkOverLimitEver
Step.1.3.Var.1.Char.11.Value = 1.0
Step.1.3.Var.1.Char.12.Ref = acc_csc_003_NoCollDist
Step.1.3.Var.1.Char.12.Value = 999.0
Step.1.3.Var.1.Char.13.Ref = acc_csc_003_NoCollDistViolatedEver
Step.1.3.Var.1.Char.13.Value = 0.0
Step.1.3.Var.1.Char.14.Ref = acc_csc_003_CollisionFlag
Step.1.3.Var.1.Char.14.Value = 0.0
Step.1.3.Var.1.Char.15.Ref = acc_csc_003_ImpactSpeed
Step.1.3.Var.1.Char.15.Value = 0.0
Step.1.3.Var.1.Char.16.Ref = acc_csc_003_CollisionEver
Step.1.3.Var.1.Char.16.Value = 0.0
Step.1.3.Var.1.Crit.0.Ref = acc_csc_003 - Safe Distance Consistency
Step.1.3.Var.1.Crit.0.Result = bad
Step.1.3.Var.1.Crit.1.Ref = acc_csc_003 - Time To Collision
Step.1.3.Var.1.Crit.1.Result = good
Step.1.3.Var.1.Crit.2.Ref = acc_csc_003 - Comfort Deceleration Limit
Step.1.3.Var.1.Crit.2.Result = bad
Step.1.3.Var.1.Crit.3.Ref = acc_csc_003 - Emergency Deceleration Bound
Step.1.3.Var.1.Crit.3.Result = good
Step.1.3.Var.1.Crit.4.Ref = acc_csc_003 - Jerk Limit
Step.1.3.Var.1.Crit.4.Result = bad
Step.1.3.Var.1.Crit.5.Ref = acc_csc_003 - No Collision Distance
Step.1.3.Var.1.Crit.5.Result = good
Step.1.3.Var.1.Crit.6.Ref = acc_csc_003 - Collision Flag
Step.1.3.Var.1.Crit.6.Result = good
Step.1.3.Var.1.Crit.7.Ref = acc_csc_003 - Impact Speed
Step.1.3.Var.1.Crit.7.Result = good
Step.1.3.Var.2.Name = acc_csc_003_ds003
Step.1.3.Var.2.Param = 20 14 65
Step.1.3.Var.2.Result = bad
Step.1.3.Var.2.ResDate = 1782803275
Step.1.3.Var.2.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_003_140747.erg
Step.1.3.Var.2.Char.0.Ref = acc_csc_003_ActualDist
Step.1.3.Var.2.Char.0.Value = 999.0
Step.1.3.Var.2.Char.1.Ref = acc_csc_003_SafeDist
Step.1.3.Var.2.Char.1.Value = 46.11303428171031
Step.1.3.Var.2.Char.2.Ref = acc_csc_003_SafeDistViolated
Step.1.3.Var.2.Char.2.Value = 1.0
Step.1.3.Var.2.Char.3.Ref = acc_csc_003_TTC
Step.1.3.Var.2.Char.3.Value = 0.0
Step.1.3.Var.2.Char.4.Ref = acc_csc_003_TTCWarnEver
Step.1.3.Var.2.Char.4.Value = 0.0
Step.1.3.Var.2.Char.5.Ref = acc_csc_003_TTCBadEver
Step.1.3.Var.2.Char.5.Value = 0.0
Step.1.3.Var.2.Char.6.Ref = acc_csc_003_ComfortAx
Step.1.3.Var.2.Char.6.Value = -0.004
Step.1.3.Var.2.Char.7.Ref = acc_csc_003_ComfortAxOutOfBoundEver
Step.1.3.Var.2.Char.7.Value = 1.0
Step.1.3.Var.2.Char.8.Ref = acc_csc_003_EmergencyAx
Step.1.3.Var.2.Char.8.Value = -0.004
Step.1.3.Var.2.Char.9.Ref = acc_csc_003_EmergencyAxOutOfBoundEver
Step.1.3.Var.2.Char.9.Value = 0.0
Step.1.3.Var.2.Char.10.Ref = acc_csc_003_Jerk
Step.1.3.Var.2.Char.10.Value = 0.0
Step.1.3.Var.2.Char.11.Ref = acc_csc_003_JerkOverLimitEver
Step.1.3.Var.2.Char.11.Value = 1.0
Step.1.3.Var.2.Char.12.Ref = acc_csc_003_NoCollDist
Step.1.3.Var.2.Char.12.Value = 999.0
Step.1.3.Var.2.Char.13.Ref = acc_csc_003_NoCollDistViolatedEver
Step.1.3.Var.2.Char.13.Value = 0.0
Step.1.3.Var.2.Char.14.Ref = acc_csc_003_CollisionFlag
Step.1.3.Var.2.Char.14.Value = 0.0
Step.1.3.Var.2.Char.15.Ref = acc_csc_003_ImpactSpeed
Step.1.3.Var.2.Char.15.Value = 0.0
Step.1.3.Var.2.Char.16.Ref = acc_csc_003_CollisionEver
Step.1.3.Var.2.Char.16.Value = 0.0
Step.1.3.Var.2.Crit.0.Ref = acc_csc_003 - Safe Distance Consistency
Step.1.3.Var.2.Crit.0.Result = bad
Step.1.3.Var.2.Crit.1.Ref = acc_csc_003 - Time To Collision
Step.1.3.Var.2.Crit.1.Result = good
Step.1.3.Var.2.Crit.2.Ref = acc_csc_003 - Comfort Deceleration Limit
Step.1.3.Var.2.Crit.2.Result = bad
Step.1.3.Var.2.Crit.3.Ref = acc_csc_003 - Emergency Deceleration Bound
Step.1.3.Var.2.Crit.3.Result = good
Step.1.3.Var.2.Crit.4.Ref = acc_csc_003 - Jerk Limit
Step.1.3.Var.2.Crit.4.Result = bad
Step.1.3.Var.2.Crit.5.Ref = acc_csc_003 - No Collision Distance
Step.1.3.Var.2.Crit.5.Result = good
Step.1.3.Var.2.Crit.6.Ref = acc_csc_003 - Collision Flag
Step.1.3.Var.2.Crit.6.Result = good
Step.1.3.Var.2.Crit.7.Ref = acc_csc_003 - Impact Speed
Step.1.3.Var.2.Crit.7.Result = good
Step.1.3.Var.3.Name = acc_csc_003_ds004
Step.1.3.Var.3.Param = 25 18 75
Step.1.3.Var.3.Result = bad
Step.1.3.Var.3.ResDate = 1782803287
Step.1.3.Var.3.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_003_140759.erg
Step.1.3.Var.3.Char.0.Ref = acc_csc_003_ActualDist
Step.1.3.Var.3.Char.0.Value = 999.0
Step.1.3.Var.3.Char.1.Ref = acc_csc_003_SafeDist
Step.1.3.Var.3.Char.1.Value = 57.43512430462007
Step.1.3.Var.3.Char.2.Ref = acc_csc_003_SafeDistViolated
Step.1.3.Var.3.Char.2.Value = 1.0
Step.1.3.Var.3.Char.3.Ref = acc_csc_003_TTC
Step.1.3.Var.3.Char.3.Value = 0.0
Step.1.3.Var.3.Char.4.Ref = acc_csc_003_TTCWarnEver
Step.1.3.Var.3.Char.4.Value = 0.0
Step.1.3.Var.3.Char.5.Ref = acc_csc_003_TTCBadEver
Step.1.3.Var.3.Char.5.Value = 0.0
Step.1.3.Var.3.Char.6.Ref = acc_csc_003_ComfortAx
Step.1.3.Var.3.Char.6.Value = 0.02256545926258298
Step.1.3.Var.3.Char.7.Ref = acc_csc_003_ComfortAxOutOfBoundEver
Step.1.3.Var.3.Char.7.Value = 1.0
Step.1.3.Var.3.Char.8.Ref = acc_csc_003_EmergencyAx
Step.1.3.Var.3.Char.8.Value = 0.02256545926258298
Step.1.3.Var.3.Char.9.Ref = acc_csc_003_EmergencyAxOutOfBoundEver
Step.1.3.Var.3.Char.9.Value = 0.0
Step.1.3.Var.3.Char.10.Ref = acc_csc_003_Jerk
Step.1.3.Var.3.Char.10.Value = 5.3571639568997195e-5
Step.1.3.Var.3.Char.11.Ref = acc_csc_003_JerkOverLimitEver
Step.1.3.Var.3.Char.11.Value = 1.0
Step.1.3.Var.3.Char.12.Ref = acc_csc_003_NoCollDist
Step.1.3.Var.3.Char.12.Value = 999.0
Step.1.3.Var.3.Char.13.Ref = acc_csc_003_NoCollDistViolatedEver
Step.1.3.Var.3.Char.13.Value = 0.0
Step.1.3.Var.3.Char.14.Ref = acc_csc_003_CollisionFlag
Step.1.3.Var.3.Char.14.Value = 0.0
Step.1.3.Var.3.Char.15.Ref = acc_csc_003_ImpactSpeed
Step.1.3.Var.3.Char.15.Value = 0.0
Step.1.3.Var.3.Char.16.Ref = acc_csc_003_CollisionEver
Step.1.3.Var.3.Char.16.Value = 0.0
Step.1.3.Var.3.Crit.0.Ref = acc_csc_003 - Safe Distance Consistency
Step.1.3.Var.3.Crit.0.Result = bad
Step.1.3.Var.3.Crit.1.Ref = acc_csc_003 - Time To Collision
Step.1.3.Var.3.Crit.1.Result = good
Step.1.3.Var.3.Crit.2.Ref = acc_csc_003 - Comfort Deceleration Limit
Step.1.3.Var.3.Crit.2.Result = bad
Step.1.3.Var.3.Crit.3.Ref = acc_csc_003 - Emergency Deceleration Bound
Step.1.3.Var.3.Crit.3.Result = good
Step.1.3.Var.3.Crit.4.Ref = acc_csc_003 - Jerk Limit
Step.1.3.Var.3.Crit.4.Result = bad
Step.1.3.Var.3.Crit.5.Ref = acc_csc_003 - No Collision Distance
Step.1.3.Var.3.Crit.5.Result = good
Step.1.3.Var.3.Crit.6.Ref = acc_csc_003 - Collision Flag
Step.1.3.Var.3.Crit.6.Result = good
Step.1.3.Var.3.Crit.7.Ref = acc_csc_003 - Impact Speed
Step.1.3.Var.3.Crit.7.Result = good
Step.1.3.Var.4.Name = acc_csc_003_ds005
Step.1.3.Var.4.Param = 30 22 85
Step.1.3.Var.4.Result = bad
Step.1.3.Var.4.ResDate = 1782803299
Step.1.3.Var.4.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_003_140811.erg
Step.1.3.Var.4.Char.0.Ref = acc_csc_003_ActualDist
Step.1.3.Var.4.Char.0.Value = 999.0
Step.1.3.Var.4.Char.1.Ref = acc_csc_003_SafeDist
Step.1.3.Var.4.Char.1.Value = 69.00016723558197
Step.1.3.Var.4.Char.2.Ref = acc_csc_003_SafeDistViolated
Step.1.3.Var.4.Char.2.Value = 1.0
Step.1.3.Var.4.Char.3.Ref = acc_csc_003_TTC
Step.1.3.Var.4.Char.3.Value = 0.0
Step.1.3.Var.4.Char.4.Ref = acc_csc_003_TTCWarnEver
Step.1.3.Var.4.Char.4.Value = 0.0
Step.1.3.Var.4.Char.5.Ref = acc_csc_003_TTCBadEver
Step.1.3.Var.4.Char.5.Value = 0.0
Step.1.3.Var.4.Char.6.Ref = acc_csc_003_ComfortAx
Step.1.3.Var.4.Char.6.Value = -5.816889807590542e-5
Step.1.3.Var.4.Char.7.Ref = acc_csc_003_ComfortAxOutOfBoundEver
Step.1.3.Var.4.Char.7.Value = 1.0
Step.1.3.Var.4.Char.8.Ref = acc_csc_003_EmergencyAx
Step.1.3.Var.4.Char.8.Value = -5.816889807590542e-5
Step.1.3.Var.4.Char.9.Ref = acc_csc_003_EmergencyAxOutOfBoundEver
Step.1.3.Var.4.Char.9.Value = 0.0
Step.1.3.Var.4.Char.10.Ref = acc_csc_003_Jerk
Step.1.3.Var.4.Char.10.Value = 0.0004003569529241085
Step.1.3.Var.4.Char.11.Ref = acc_csc_003_JerkOverLimitEver
Step.1.3.Var.4.Char.11.Value = 1.0
Step.1.3.Var.4.Char.12.Ref = acc_csc_003_NoCollDist
Step.1.3.Var.4.Char.12.Value = 999.0
Step.1.3.Var.4.Char.13.Ref = acc_csc_003_NoCollDistViolatedEver
Step.1.3.Var.4.Char.13.Value = 0.0
Step.1.3.Var.4.Char.14.Ref = acc_csc_003_CollisionFlag
Step.1.3.Var.4.Char.14.Value = 0.0
Step.1.3.Var.4.Char.15.Ref = acc_csc_003_ImpactSpeed
Step.1.3.Var.4.Char.15.Value = 0.0
Step.1.3.Var.4.Char.16.Ref = acc_csc_003_CollisionEver
Step.1.3.Var.4.Char.16.Value = 0.0
Step.1.3.Var.4.Crit.0.Ref = acc_csc_003 - Safe Distance Consistency
Step.1.3.Var.4.Crit.0.Result = bad
Step.1.3.Var.4.Crit.1.Ref = acc_csc_003 - Time To Collision
Step.1.3.Var.4.Crit.1.Result = good
Step.1.3.Var.4.Crit.2.Ref = acc_csc_003 - Comfort Deceleration Limit
Step.1.3.Var.4.Crit.2.Result = bad
Step.1.3.Var.4.Crit.3.Ref = acc_csc_003 - Emergency Deceleration Bound
Step.1.3.Var.4.Crit.3.Result = good
Step.1.3.Var.4.Crit.4.Ref = acc_csc_003 - Jerk Limit
Step.1.3.Var.4.Crit.4.Result = bad
Step.1.3.Var.4.Crit.5.Ref = acc_csc_003 - No Collision Distance
Step.1.3.Var.4.Crit.5.Result = good
Step.1.3.Var.4.Crit.6.Ref = acc_csc_003 - Collision Flag
Step.1.3.Var.4.Crit.6.Result = good
Step.1.3.Var.4.Crit.7.Ref = acc_csc_003 - Impact Speed
Step.1.3.Var.4.Crit.7.Result = good
Step.1.4 = TestRun
Step.1.4.Name = OSC_Imported/longitudinal_feature/ACC/acc_csc_004
Step.1.4.Param.0 = EgoSpeed NValue
Step.1.4.Param.1 = TVSpeed NValue
Step.1.4.Param.2 = TV_initPos NValue
Step.1.4.Char.0.Name = acc_csc_004_ActualDist
Step.1.4.Char.0.Description:
	Actual distance to lead (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.4.Char.0.Identifier = acc_csc_004_ActualDist
Step.1.4.Char.0.Unit =
Step.1.4.Char.0.Param.0 = RTexpr "Qu::acc_csc_004_ActualDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.4.Char.1.Name = acc_csc_004_SafeDist
Step.1.4.Char.1.Description:
	Reference safe distance (signal=FMU.CM_ACCController_V17.Out.Debug.SafeDistance)
Step.1.4.Char.1.Identifier = acc_csc_004_SafeDist
Step.1.4.Char.1.Unit =
Step.1.4.Char.1.Param.0 = RTexpr "Qu::acc_csc_004_SafeDist=FMU.CM_ACCController_V17.Out.Debug.SafeDistance"
Step.1.4.Char.2.Name = acc_csc_004_SafeDistViolated
Step.1.4.Char.2.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment ActualDist<SafeDist while actively following (gate==1); stays 1 for the rest of the run even if distance recovers.
Step.1.4.Char.2.Identifier = acc_csc_004_SafeDistViolated
Step.1.4.Char.2.Unit =
Step.1.4.Char.2.Param.0 = RTexpr {first()?Qu::acc_csc_004_SafeDistViolated=0:acc_csc_004_SafeDistViolated=max(acc_csc_004_SafeDistViolated,(FMU.CM_ACCController_V17.Out.Debug.Fusion.Active==1 && acc_csc_004_ActualDist<acc_csc_004_SafeDist))}
Step.1.4.Char.3.Name = acc_csc_004_TTC
Step.1.4.Char.3.Description:
	Time-to-collision (signal=AccelCtrl.ACC.Time2Collision)
Step.1.4.Char.3.Identifier = acc_csc_004_TTC
Step.1.4.Char.3.Unit =
Step.1.4.Char.3.Param.0 = RTexpr "Qu::acc_csc_004_TTC=AccelCtrl.ACC.Time2Collision"
Step.1.4.Char.4.Name = acc_csc_004_TTCWarnEver
Step.1.4.Char.4.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the warn zone [3.5,11)s.
Step.1.4.Char.4.Identifier = acc_csc_004_TTCWarnEver
Step.1.4.Char.4.Unit =
Step.1.4.Char.4.Param.0 = RTexpr {first()?Qu::acc_csc_004_TTCWarnEver=0:acc_csc_004_TTCWarnEver=max(acc_csc_004_TTCWarnEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_004_TTC>=3.5 && acc_csc_004_TTC<11))}
Step.1.4.Char.5.Name = acc_csc_004_TTCBadEver
Step.1.4.Char.5.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the bad zone (0,3.5)s.
Step.1.4.Char.5.Identifier = acc_csc_004_TTCBadEver
Step.1.4.Char.5.Unit =
Step.1.4.Char.5.Param.0 = RTexpr {first()?Qu::acc_csc_004_TTCBadEver=0:acc_csc_004_TTCBadEver=max(acc_csc_004_TTCBadEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_004_TTC>0 && acc_csc_004_TTC<3.5))}
Step.1.4.Char.6.Name = acc_csc_004_ComfortAx
Step.1.4.Char.6.Description:
	Comfort Deceleration Limit (signal=AccelCtrl.DesiredAx)
Step.1.4.Char.6.Identifier = acc_csc_004_ComfortAx
Step.1.4.Char.6.Unit =
Step.1.4.Char.6.Param.0 = RTexpr "Qu::acc_csc_004_ComfortAx=AccelCtrl.DesiredAx"
Step.1.4.Char.7.Name = acc_csc_004_ComfortAxOutOfBoundEver
Step.1.4.Char.7.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Comfort Deceleration Limit ever goes out of bound (min=-3, max=2.8).
Step.1.4.Char.7.Identifier = acc_csc_004_ComfortAxOutOfBoundEver
Step.1.4.Char.7.Unit =
Step.1.4.Char.7.Param.0 = RTexpr {first()?Qu::acc_csc_004_ComfortAxOutOfBoundEver=0:acc_csc_004_ComfortAxOutOfBoundEver=max(acc_csc_004_ComfortAxOutOfBoundEver,(acc_csc_004_ComfortAx<-3 || acc_csc_004_ComfortAx>2.8))}
Step.1.4.Char.8.Name = acc_csc_004_EmergencyAx
Step.1.4.Char.8.Description:
	Emergency Deceleration Bound (signal=AccelCtrl.DesiredAx)
Step.1.4.Char.8.Identifier = acc_csc_004_EmergencyAx
Step.1.4.Char.8.Unit =
Step.1.4.Char.8.Param.0 = RTexpr "Qu::acc_csc_004_EmergencyAx=AccelCtrl.DesiredAx"
Step.1.4.Char.9.Name = acc_csc_004_EmergencyAxOutOfBoundEver
Step.1.4.Char.9.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Emergency Deceleration Bound ever goes out of bound (min=-6).
Step.1.4.Char.9.Identifier = acc_csc_004_EmergencyAxOutOfBoundEver
Step.1.4.Char.9.Unit =
Step.1.4.Char.9.Param.0 = RTexpr {first()?Qu::acc_csc_004_EmergencyAxOutOfBoundEver=0:acc_csc_004_EmergencyAxOutOfBoundEver=max(acc_csc_004_EmergencyAxOutOfBoundEver,(acc_csc_004_EmergencyAx<-6))}
Step.1.4.Char.10.Name = acc_csc_004_Jerk
Step.1.4.Char.10.Description:
	Jerk = |d(DesiredAx)/dt|, base signal=AccelCtrl.DesiredAx
Step.1.4.Char.10.Identifier = acc_csc_004_Jerk
Step.1.4.Char.10.Unit =
Step.1.4.Char.10.Param.0 = RTexpr "Qu::acc_csc_004_Jerk=abs(diff(AccelCtrl.DesiredAx,Time))"
Step.1.4.Char.11.Name = acc_csc_004_JerkOverLimitEver
Step.1.4.Char.11.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment |jerk| ever exceeds 4 m/s3.
Step.1.4.Char.11.Identifier = acc_csc_004_JerkOverLimitEver
Step.1.4.Char.11.Unit =
Step.1.4.Char.11.Param.0 = RTexpr {first()?Qu::acc_csc_004_JerkOverLimitEver=0:acc_csc_004_JerkOverLimitEver=max(acc_csc_004_JerkOverLimitEver,(acc_csc_004_Jerk>4))}
Step.1.4.Char.12.Name = acc_csc_004_NoCollDist
Step.1.4.Char.12.Description:
	Distance to nearest lead object (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.4.Char.12.Identifier = acc_csc_004_NoCollDist
Step.1.4.Char.12.Unit =
Step.1.4.Char.12.Param.0 = RTexpr "Qu::acc_csc_004_NoCollDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.4.Char.13.Name = acc_csc_004_NoCollDistViolatedEver
Step.1.4.Char.13.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment distance ever drops below 0m.
Step.1.4.Char.13.Identifier = acc_csc_004_NoCollDistViolatedEver
Step.1.4.Char.13.Unit =
Step.1.4.Char.13.Param.0 = RTexpr {first()?Qu::acc_csc_004_NoCollDistViolatedEver=0:acc_csc_004_NoCollDistViolatedEver=max(acc_csc_004_NoCollDistViolatedEver,(acc_csc_004_NoCollDist<0))}
Step.1.4.Char.14.Name = acc_csc_004_CollisionFlag
Step.1.4.Char.14.Description:
	Collision flag derived from FMU.CM_ACCController_V17.Out.Debug.Target.DistX <= 0 (nearest lead object); instantaneous, used as the latch() trigger for ImpactSpeed below.
Step.1.4.Char.14.Identifier = acc_csc_004_CollisionFlag
Step.1.4.Char.14.Unit =
Step.1.4.Char.14.Param.0 = RTexpr "Qu::acc_csc_004_CollisionFlag=(FMU.CM_ACCController_V17.Out.Debug.Target.DistX<=0)"
Step.1.4.Char.15.Name = acc_csc_004_ImpactSpeed
Step.1.4.Char.15.Description:
	Ego speed latched at moment of first collision (nearest lead object)
Step.1.4.Char.15.Identifier = acc_csc_004_ImpactSpeed
Step.1.4.Char.15.Unit =
Step.1.4.Char.15.Param.0 = RTexpr {Qu::acc_csc_004_ImpactSpeed=latch(Speed("Ego"),Qu::acc_csc_004_CollisionFlag==1)}
Step.1.4.Char.16.Name = acc_csc_004_CollisionEver
Step.1.4.Char.16.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment a collision ever occurs (nearest lead object), even if the vehicles separate again before the run ends.
Step.1.4.Char.16.Identifier = acc_csc_004_CollisionEver
Step.1.4.Char.16.Unit =
Step.1.4.Char.16.Param.0 = RTexpr {first()?Qu::acc_csc_004_CollisionEver=0:acc_csc_004_CollisionEver=max(acc_csc_004_CollisionEver,(acc_csc_004_CollisionFlag==1))}
Step.1.4.Crit.0.Name = acc_csc_004 - Safe Distance Consistency
Step.1.4.Crit.0.Description:
	Good if SafeDist was never violated while actively following throughout the run. Bad if it was violated at any point.
Step.1.4.Crit.0.Good = [get acc_csc_004_SafeDistViolated] == 0
Step.1.4.Crit.0.Warn =
Step.1.4.Crit.0.Bad = [get acc_csc_004_SafeDistViolated] == 1
Step.1.4.Crit.1.Name = acc_csc_004 - Time To Collision
Step.1.4.Crit.1.Description:
	Good if TTC never entered the warn/bad zone while a valid target existed throughout the run. Warn if it ever entered [3.5,11)s. Bad if it ever entered (0,3.5)s.
Step.1.4.Crit.1.Good = [get acc_csc_004_TTCBadEver] == 0 && [get acc_csc_004_TTCWarnEver] == 0
Step.1.4.Crit.1.Warn = [get acc_csc_004_TTCBadEver] == 0 && [get acc_csc_004_TTCWarnEver] == 1
Step.1.4.Crit.1.Bad = [get acc_csc_004_TTCBadEver] == 1
Step.1.4.Crit.2.Name = acc_csc_004 - Comfort Deceleration Limit
Step.1.4.Crit.2.Description:
	Good if Comfort Deceleration Limit never went out of bound (min=-3, max=2.8) throughout the run.
Step.1.4.Crit.2.Good = [get acc_csc_004_ComfortAxOutOfBoundEver] == 0
Step.1.4.Crit.2.Warn =
Step.1.4.Crit.2.Bad = [get acc_csc_004_ComfortAxOutOfBoundEver] == 1
Step.1.4.Crit.3.Name = acc_csc_004 - Emergency Deceleration Bound
Step.1.4.Crit.3.Description:
	Good if Emergency Deceleration Bound never went out of bound (min=-6) throughout the run.
Step.1.4.Crit.3.Good = [get acc_csc_004_EmergencyAxOutOfBoundEver] == 0
Step.1.4.Crit.3.Warn =
Step.1.4.Crit.3.Bad = [get acc_csc_004_EmergencyAxOutOfBoundEver] == 1
Step.1.4.Crit.4.Name = acc_csc_004 - Jerk Limit
Step.1.4.Crit.4.Description:
	Good if |jerk| never exceeded 4 m/s3 throughout the run.
Step.1.4.Crit.4.Good = [get acc_csc_004_JerkOverLimitEver] == 0
Step.1.4.Crit.4.Warn =
Step.1.4.Crit.4.Bad = [get acc_csc_004_JerkOverLimitEver] == 1
Step.1.4.Crit.5.Name = acc_csc_004 - No Collision Distance
Step.1.4.Crit.5.Description:
	Good if distance never dropped below 0m throughout the run.
Step.1.4.Crit.5.Good = [get acc_csc_004_NoCollDistViolatedEver] == 0
Step.1.4.Crit.5.Warn =
Step.1.4.Crit.5.Bad = [get acc_csc_004_NoCollDistViolatedEver] == 1
Step.1.4.Crit.6.Name = acc_csc_004 - Collision Flag
Step.1.4.Crit.6.Description:
	Good if no collision ever occurred (nearest lead object) throughout the run.
Step.1.4.Crit.6.Good = [get acc_csc_004_CollisionEver] == 0
Step.1.4.Crit.6.Warn =
Step.1.4.Crit.6.Bad = [get acc_csc_004_CollisionEver] == 1
Step.1.4.Crit.7.Name = acc_csc_004 - Impact Speed
Step.1.4.Crit.7.Description:
	Good if no collision ever occurred, or impact speed = 0; Warn (0,5) m/s; Bad >= 5 m/s
Step.1.4.Crit.7.Good = [get acc_csc_004_CollisionEver] == 0 || [get acc_csc_004_ImpactSpeed] == 0
Step.1.4.Crit.7.Warn = [get acc_csc_004_CollisionEver] == 1 && [get acc_csc_004_ImpactSpeed] > 0 && [get acc_csc_004_ImpactSpeed] < 5
Step.1.4.Crit.7.Bad = [get acc_csc_004_CollisionEver] == 1 && [get acc_csc_004_ImpactSpeed] >= 5
Step.1.4.Var.0.Name = acc_csc_004_ds001
Step.1.4.Var.0.Param = 12 8 45
Step.1.4.Var.0.Result = bad
Step.1.4.Var.0.ResDate = 1782803312
Step.1.4.Var.0.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_004_140824.erg
Step.1.4.Var.0.Char.0.Ref = acc_csc_004_ActualDist
Step.1.4.Var.0.Char.0.Value = 140.75763105584468
Step.1.4.Var.0.Char.1.Ref = acc_csc_004_SafeDist
Step.1.4.Var.0.Char.1.Value = 15.0
Step.1.4.Var.0.Char.2.Ref = acc_csc_004_SafeDistViolated
Step.1.4.Var.0.Char.2.Value = 1.0
Step.1.4.Var.0.Char.3.Ref = acc_csc_004_TTC
Step.1.4.Var.0.Char.3.Value = 0.0
Step.1.4.Var.0.Char.4.Ref = acc_csc_004_TTCWarnEver
Step.1.4.Var.0.Char.4.Value = 0.0
Step.1.4.Var.0.Char.5.Ref = acc_csc_004_TTCBadEver
Step.1.4.Var.0.Char.5.Value = 0.0
Step.1.4.Var.0.Char.6.Ref = acc_csc_004_ComfortAx
Step.1.4.Var.0.Char.6.Value = 0.0
Step.1.4.Var.0.Char.7.Ref = acc_csc_004_ComfortAxOutOfBoundEver
Step.1.4.Var.0.Char.7.Value = 1.0
Step.1.4.Var.0.Char.8.Ref = acc_csc_004_EmergencyAx
Step.1.4.Var.0.Char.8.Value = 0.0
Step.1.4.Var.0.Char.9.Ref = acc_csc_004_EmergencyAxOutOfBoundEver
Step.1.4.Var.0.Char.9.Value = 0.0
Step.1.4.Var.0.Char.10.Ref = acc_csc_004_Jerk
Step.1.4.Var.0.Char.10.Value = 0.0
Step.1.4.Var.0.Char.11.Ref = acc_csc_004_JerkOverLimitEver
Step.1.4.Var.0.Char.11.Value = 1.0
Step.1.4.Var.0.Char.12.Ref = acc_csc_004_NoCollDist
Step.1.4.Var.0.Char.12.Value = 140.75763105584468
Step.1.4.Var.0.Char.13.Ref = acc_csc_004_NoCollDistViolatedEver
Step.1.4.Var.0.Char.13.Value = 0.0
Step.1.4.Var.0.Char.14.Ref = acc_csc_004_CollisionFlag
Step.1.4.Var.0.Char.14.Value = 0.0
Step.1.4.Var.0.Char.15.Ref = acc_csc_004_ImpactSpeed
Step.1.4.Var.0.Char.15.Value = 0.0
Step.1.4.Var.0.Char.16.Ref = acc_csc_004_CollisionEver
Step.1.4.Var.0.Char.16.Value = 0.0
Step.1.4.Var.0.Crit.0.Ref = acc_csc_004 - Safe Distance Consistency
Step.1.4.Var.0.Crit.0.Result = bad
Step.1.4.Var.0.Crit.1.Ref = acc_csc_004 - Time To Collision
Step.1.4.Var.0.Crit.1.Result = good
Step.1.4.Var.0.Crit.2.Ref = acc_csc_004 - Comfort Deceleration Limit
Step.1.4.Var.0.Crit.2.Result = bad
Step.1.4.Var.0.Crit.3.Ref = acc_csc_004 - Emergency Deceleration Bound
Step.1.4.Var.0.Crit.3.Result = good
Step.1.4.Var.0.Crit.4.Ref = acc_csc_004 - Jerk Limit
Step.1.4.Var.0.Crit.4.Result = bad
Step.1.4.Var.0.Crit.5.Ref = acc_csc_004 - No Collision Distance
Step.1.4.Var.0.Crit.5.Result = good
Step.1.4.Var.0.Crit.6.Ref = acc_csc_004 - Collision Flag
Step.1.4.Var.0.Crit.6.Result = good
Step.1.4.Var.0.Crit.7.Ref = acc_csc_004 - Impact Speed
Step.1.4.Var.0.Crit.7.Result = good
Step.1.4.Var.1.Name = acc_csc_004_ds002
Step.1.4.Var.1.Param = 15 10 55
Step.1.4.Var.1.Result = bad
Step.1.4.Var.1.ResDate = 1782803324
Step.1.4.Var.1.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_004_140836.erg
Step.1.4.Var.1.Char.0.Ref = acc_csc_004_ActualDist
Step.1.4.Var.1.Char.0.Value = 999.0
Step.1.4.Var.1.Char.1.Ref = acc_csc_004_SafeDist
Step.1.4.Var.1.Char.1.Value = 35.04325654764582
Step.1.4.Var.1.Char.2.Ref = acc_csc_004_SafeDistViolated
Step.1.4.Var.1.Char.2.Value = 1.0
Step.1.4.Var.1.Char.3.Ref = acc_csc_004_TTC
Step.1.4.Var.1.Char.3.Value = 0.0
Step.1.4.Var.1.Char.4.Ref = acc_csc_004_TTCWarnEver
Step.1.4.Var.1.Char.4.Value = 0.0
Step.1.4.Var.1.Char.5.Ref = acc_csc_004_TTCBadEver
Step.1.4.Var.1.Char.5.Value = 0.0
Step.1.4.Var.1.Char.6.Ref = acc_csc_004_ComfortAx
Step.1.4.Var.1.Char.6.Value = -0.004
Step.1.4.Var.1.Char.7.Ref = acc_csc_004_ComfortAxOutOfBoundEver
Step.1.4.Var.1.Char.7.Value = 1.0
Step.1.4.Var.1.Char.8.Ref = acc_csc_004_EmergencyAx
Step.1.4.Var.1.Char.8.Value = -0.004
Step.1.4.Var.1.Char.9.Ref = acc_csc_004_EmergencyAxOutOfBoundEver
Step.1.4.Var.1.Char.9.Value = 0.0
Step.1.4.Var.1.Char.10.Ref = acc_csc_004_Jerk
Step.1.4.Var.1.Char.10.Value = 0.0
Step.1.4.Var.1.Char.11.Ref = acc_csc_004_JerkOverLimitEver
Step.1.4.Var.1.Char.11.Value = 1.0
Step.1.4.Var.1.Char.12.Ref = acc_csc_004_NoCollDist
Step.1.4.Var.1.Char.12.Value = 999.0
Step.1.4.Var.1.Char.13.Ref = acc_csc_004_NoCollDistViolatedEver
Step.1.4.Var.1.Char.13.Value = 0.0
Step.1.4.Var.1.Char.14.Ref = acc_csc_004_CollisionFlag
Step.1.4.Var.1.Char.14.Value = 0.0
Step.1.4.Var.1.Char.15.Ref = acc_csc_004_ImpactSpeed
Step.1.4.Var.1.Char.15.Value = 0.0
Step.1.4.Var.1.Char.16.Ref = acc_csc_004_CollisionEver
Step.1.4.Var.1.Char.16.Value = 0.0
Step.1.4.Var.1.Crit.0.Ref = acc_csc_004 - Safe Distance Consistency
Step.1.4.Var.1.Crit.0.Result = bad
Step.1.4.Var.1.Crit.1.Ref = acc_csc_004 - Time To Collision
Step.1.4.Var.1.Crit.1.Result = good
Step.1.4.Var.1.Crit.2.Ref = acc_csc_004 - Comfort Deceleration Limit
Step.1.4.Var.1.Crit.2.Result = bad
Step.1.4.Var.1.Crit.3.Ref = acc_csc_004 - Emergency Deceleration Bound
Step.1.4.Var.1.Crit.3.Result = good
Step.1.4.Var.1.Crit.4.Ref = acc_csc_004 - Jerk Limit
Step.1.4.Var.1.Crit.4.Result = bad
Step.1.4.Var.1.Crit.5.Ref = acc_csc_004 - No Collision Distance
Step.1.4.Var.1.Crit.5.Result = good
Step.1.4.Var.1.Crit.6.Ref = acc_csc_004 - Collision Flag
Step.1.4.Var.1.Crit.6.Result = good
Step.1.4.Var.1.Crit.7.Ref = acc_csc_004 - Impact Speed
Step.1.4.Var.1.Crit.7.Result = good
Step.1.4.Var.2.Name = acc_csc_004_ds003
Step.1.4.Var.2.Param = 20 14 65
Step.1.4.Var.2.Result = bad
Step.1.4.Var.2.ResDate = 1782803336
Step.1.4.Var.2.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_004_140848.erg
Step.1.4.Var.2.Char.0.Ref = acc_csc_004_ActualDist
Step.1.4.Var.2.Char.0.Value = 999.0
Step.1.4.Var.2.Char.1.Ref = acc_csc_004_SafeDist
Step.1.4.Var.2.Char.1.Value = 46.11377499403011
Step.1.4.Var.2.Char.2.Ref = acc_csc_004_SafeDistViolated
Step.1.4.Var.2.Char.2.Value = 1.0
Step.1.4.Var.2.Char.3.Ref = acc_csc_004_TTC
Step.1.4.Var.2.Char.3.Value = 0.0
Step.1.4.Var.2.Char.4.Ref = acc_csc_004_TTCWarnEver
Step.1.4.Var.2.Char.4.Value = 0.0
Step.1.4.Var.2.Char.5.Ref = acc_csc_004_TTCBadEver
Step.1.4.Var.2.Char.5.Value = 0.0
Step.1.4.Var.2.Char.6.Ref = acc_csc_004_ComfortAx
Step.1.4.Var.2.Char.6.Value = -0.004
Step.1.4.Var.2.Char.7.Ref = acc_csc_004_ComfortAxOutOfBoundEver
Step.1.4.Var.2.Char.7.Value = 1.0
Step.1.4.Var.2.Char.8.Ref = acc_csc_004_EmergencyAx
Step.1.4.Var.2.Char.8.Value = -0.004
Step.1.4.Var.2.Char.9.Ref = acc_csc_004_EmergencyAxOutOfBoundEver
Step.1.4.Var.2.Char.9.Value = 0.0
Step.1.4.Var.2.Char.10.Ref = acc_csc_004_Jerk
Step.1.4.Var.2.Char.10.Value = 0.0
Step.1.4.Var.2.Char.11.Ref = acc_csc_004_JerkOverLimitEver
Step.1.4.Var.2.Char.11.Value = 1.0
Step.1.4.Var.2.Char.12.Ref = acc_csc_004_NoCollDist
Step.1.4.Var.2.Char.12.Value = 999.0
Step.1.4.Var.2.Char.13.Ref = acc_csc_004_NoCollDistViolatedEver
Step.1.4.Var.2.Char.13.Value = 0.0
Step.1.4.Var.2.Char.14.Ref = acc_csc_004_CollisionFlag
Step.1.4.Var.2.Char.14.Value = 0.0
Step.1.4.Var.2.Char.15.Ref = acc_csc_004_ImpactSpeed
Step.1.4.Var.2.Char.15.Value = 0.0
Step.1.4.Var.2.Char.16.Ref = acc_csc_004_CollisionEver
Step.1.4.Var.2.Char.16.Value = 0.0
Step.1.4.Var.2.Crit.0.Ref = acc_csc_004 - Safe Distance Consistency
Step.1.4.Var.2.Crit.0.Result = bad
Step.1.4.Var.2.Crit.1.Ref = acc_csc_004 - Time To Collision
Step.1.4.Var.2.Crit.1.Result = good
Step.1.4.Var.2.Crit.2.Ref = acc_csc_004 - Comfort Deceleration Limit
Step.1.4.Var.2.Crit.2.Result = bad
Step.1.4.Var.2.Crit.3.Ref = acc_csc_004 - Emergency Deceleration Bound
Step.1.4.Var.2.Crit.3.Result = good
Step.1.4.Var.2.Crit.4.Ref = acc_csc_004 - Jerk Limit
Step.1.4.Var.2.Crit.4.Result = bad
Step.1.4.Var.2.Crit.5.Ref = acc_csc_004 - No Collision Distance
Step.1.4.Var.2.Crit.5.Result = good
Step.1.4.Var.2.Crit.6.Ref = acc_csc_004 - Collision Flag
Step.1.4.Var.2.Crit.6.Result = good
Step.1.4.Var.2.Crit.7.Ref = acc_csc_004 - Impact Speed
Step.1.4.Var.2.Crit.7.Result = good
Step.1.4.Var.3.Name = acc_csc_004_ds004
Step.1.4.Var.3.Param = 25 18 75
Step.1.4.Var.3.Result = bad
Step.1.4.Var.3.ResDate = 1782803347
Step.1.4.Var.3.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_004_140900.erg
Step.1.4.Var.3.Char.0.Ref = acc_csc_004_ActualDist
Step.1.4.Var.3.Char.0.Value = 999.0
Step.1.4.Var.3.Char.1.Ref = acc_csc_004_SafeDist
Step.1.4.Var.3.Char.1.Value = 57.43512430462007
Step.1.4.Var.3.Char.2.Ref = acc_csc_004_SafeDistViolated
Step.1.4.Var.3.Char.2.Value = 1.0
Step.1.4.Var.3.Char.3.Ref = acc_csc_004_TTC
Step.1.4.Var.3.Char.3.Value = 0.0
Step.1.4.Var.3.Char.4.Ref = acc_csc_004_TTCWarnEver
Step.1.4.Var.3.Char.4.Value = 0.0
Step.1.4.Var.3.Char.5.Ref = acc_csc_004_TTCBadEver
Step.1.4.Var.3.Char.5.Value = 0.0
Step.1.4.Var.3.Char.6.Ref = acc_csc_004_ComfortAx
Step.1.4.Var.3.Char.6.Value = 0.02256545926258298
Step.1.4.Var.3.Char.7.Ref = acc_csc_004_ComfortAxOutOfBoundEver
Step.1.4.Var.3.Char.7.Value = 1.0
Step.1.4.Var.3.Char.8.Ref = acc_csc_004_EmergencyAx
Step.1.4.Var.3.Char.8.Value = 0.02256545926258298
Step.1.4.Var.3.Char.9.Ref = acc_csc_004_EmergencyAxOutOfBoundEver
Step.1.4.Var.3.Char.9.Value = 0.0
Step.1.4.Var.3.Char.10.Ref = acc_csc_004_Jerk
Step.1.4.Var.3.Char.10.Value = 5.3571639568997195e-5
Step.1.4.Var.3.Char.11.Ref = acc_csc_004_JerkOverLimitEver
Step.1.4.Var.3.Char.11.Value = 1.0
Step.1.4.Var.3.Char.12.Ref = acc_csc_004_NoCollDist
Step.1.4.Var.3.Char.12.Value = 999.0
Step.1.4.Var.3.Char.13.Ref = acc_csc_004_NoCollDistViolatedEver
Step.1.4.Var.3.Char.13.Value = 0.0
Step.1.4.Var.3.Char.14.Ref = acc_csc_004_CollisionFlag
Step.1.4.Var.3.Char.14.Value = 0.0
Step.1.4.Var.3.Char.15.Ref = acc_csc_004_ImpactSpeed
Step.1.4.Var.3.Char.15.Value = 0.0
Step.1.4.Var.3.Char.16.Ref = acc_csc_004_CollisionEver
Step.1.4.Var.3.Char.16.Value = 0.0
Step.1.4.Var.3.Crit.0.Ref = acc_csc_004 - Safe Distance Consistency
Step.1.4.Var.3.Crit.0.Result = bad
Step.1.4.Var.3.Crit.1.Ref = acc_csc_004 - Time To Collision
Step.1.4.Var.3.Crit.1.Result = good
Step.1.4.Var.3.Crit.2.Ref = acc_csc_004 - Comfort Deceleration Limit
Step.1.4.Var.3.Crit.2.Result = bad
Step.1.4.Var.3.Crit.3.Ref = acc_csc_004 - Emergency Deceleration Bound
Step.1.4.Var.3.Crit.3.Result = good
Step.1.4.Var.3.Crit.4.Ref = acc_csc_004 - Jerk Limit
Step.1.4.Var.3.Crit.4.Result = bad
Step.1.4.Var.3.Crit.5.Ref = acc_csc_004 - No Collision Distance
Step.1.4.Var.3.Crit.5.Result = good
Step.1.4.Var.3.Crit.6.Ref = acc_csc_004 - Collision Flag
Step.1.4.Var.3.Crit.6.Result = good
Step.1.4.Var.3.Crit.7.Ref = acc_csc_004 - Impact Speed
Step.1.4.Var.3.Crit.7.Result = good
Step.1.4.Var.4.Name = acc_csc_004_ds005
Step.1.4.Var.4.Param = 30 22 85
Step.1.4.Var.4.Result = bad
Step.1.4.Var.4.ResDate = 1782803359
Step.1.4.Var.4.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_004_140912.erg
Step.1.4.Var.4.Char.0.Ref = acc_csc_004_ActualDist
Step.1.4.Var.4.Char.0.Value = 999.0
Step.1.4.Var.4.Char.1.Ref = acc_csc_004_SafeDist
Step.1.4.Var.4.Char.1.Value = 69.00016723558197
Step.1.4.Var.4.Char.2.Ref = acc_csc_004_SafeDistViolated
Step.1.4.Var.4.Char.2.Value = 1.0
Step.1.4.Var.4.Char.3.Ref = acc_csc_004_TTC
Step.1.4.Var.4.Char.3.Value = 0.0
Step.1.4.Var.4.Char.4.Ref = acc_csc_004_TTCWarnEver
Step.1.4.Var.4.Char.4.Value = 0.0
Step.1.4.Var.4.Char.5.Ref = acc_csc_004_TTCBadEver
Step.1.4.Var.4.Char.5.Value = 0.0
Step.1.4.Var.4.Char.6.Ref = acc_csc_004_ComfortAx
Step.1.4.Var.4.Char.6.Value = -5.816889807590542e-5
Step.1.4.Var.4.Char.7.Ref = acc_csc_004_ComfortAxOutOfBoundEver
Step.1.4.Var.4.Char.7.Value = 1.0
Step.1.4.Var.4.Char.8.Ref = acc_csc_004_EmergencyAx
Step.1.4.Var.4.Char.8.Value = -5.816889807590542e-5
Step.1.4.Var.4.Char.9.Ref = acc_csc_004_EmergencyAxOutOfBoundEver
Step.1.4.Var.4.Char.9.Value = 0.0
Step.1.4.Var.4.Char.10.Ref = acc_csc_004_Jerk
Step.1.4.Var.4.Char.10.Value = 0.0004003569529241085
Step.1.4.Var.4.Char.11.Ref = acc_csc_004_JerkOverLimitEver
Step.1.4.Var.4.Char.11.Value = 1.0
Step.1.4.Var.4.Char.12.Ref = acc_csc_004_NoCollDist
Step.1.4.Var.4.Char.12.Value = 999.0
Step.1.4.Var.4.Char.13.Ref = acc_csc_004_NoCollDistViolatedEver
Step.1.4.Var.4.Char.13.Value = 0.0
Step.1.4.Var.4.Char.14.Ref = acc_csc_004_CollisionFlag
Step.1.4.Var.4.Char.14.Value = 0.0
Step.1.4.Var.4.Char.15.Ref = acc_csc_004_ImpactSpeed
Step.1.4.Var.4.Char.15.Value = 0.0
Step.1.4.Var.4.Char.16.Ref = acc_csc_004_CollisionEver
Step.1.4.Var.4.Char.16.Value = 0.0
Step.1.4.Var.4.Crit.0.Ref = acc_csc_004 - Safe Distance Consistency
Step.1.4.Var.4.Crit.0.Result = bad
Step.1.4.Var.4.Crit.1.Ref = acc_csc_004 - Time To Collision
Step.1.4.Var.4.Crit.1.Result = good
Step.1.4.Var.4.Crit.2.Ref = acc_csc_004 - Comfort Deceleration Limit
Step.1.4.Var.4.Crit.2.Result = bad
Step.1.4.Var.4.Crit.3.Ref = acc_csc_004 - Emergency Deceleration Bound
Step.1.4.Var.4.Crit.3.Result = good
Step.1.4.Var.4.Crit.4.Ref = acc_csc_004 - Jerk Limit
Step.1.4.Var.4.Crit.4.Result = bad
Step.1.4.Var.4.Crit.5.Ref = acc_csc_004 - No Collision Distance
Step.1.4.Var.4.Crit.5.Result = good
Step.1.4.Var.4.Crit.6.Ref = acc_csc_004 - Collision Flag
Step.1.4.Var.4.Crit.6.Result = good
Step.1.4.Var.4.Crit.7.Ref = acc_csc_004 - Impact Speed
Step.1.4.Var.4.Crit.7.Result = good
Step.1.5 = TestRun
Step.1.5.Name = OSC_Imported/longitudinal_feature/ACC/acc_csc_005
Step.1.5.Param.0 = EgoSpeed NValue
Step.1.5.Param.1 = TV1Speed NValue
Step.1.5.Param.2 = TV1_initPos NValue
Step.1.5.Param.3 = TV2Speed NValue
Step.1.5.Param.4 = TV2_initPos NValue
Step.1.5.Char.0.Name = acc_csc_005_ActualDist
Step.1.5.Char.0.Description:
	Actual distance to lead (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.5.Char.0.Identifier = acc_csc_005_ActualDist
Step.1.5.Char.0.Unit =
Step.1.5.Char.0.Param.0 = RTexpr "Qu::acc_csc_005_ActualDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.5.Char.1.Name = acc_csc_005_SafeDist
Step.1.5.Char.1.Description:
	Reference safe distance (signal=FMU.CM_ACCController_V17.Out.Debug.SafeDistance)
Step.1.5.Char.1.Identifier = acc_csc_005_SafeDist
Step.1.5.Char.1.Unit =
Step.1.5.Char.1.Param.0 = RTexpr "Qu::acc_csc_005_SafeDist=FMU.CM_ACCController_V17.Out.Debug.SafeDistance"
Step.1.5.Char.2.Name = acc_csc_005_SafeDistViolated
Step.1.5.Char.2.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment ActualDist<SafeDist while actively following (gate==1); stays 1 for the rest of the run even if distance recovers.
Step.1.5.Char.2.Identifier = acc_csc_005_SafeDistViolated
Step.1.5.Char.2.Unit =
Step.1.5.Char.2.Param.0 = RTexpr {first()?Qu::acc_csc_005_SafeDistViolated=0:acc_csc_005_SafeDistViolated=max(acc_csc_005_SafeDistViolated,(FMU.CM_ACCController_V17.Out.Debug.Fusion.Active==1 && acc_csc_005_ActualDist<acc_csc_005_SafeDist))}
Step.1.5.Char.3.Name = acc_csc_005_TTC
Step.1.5.Char.3.Description:
	Time-to-collision (signal=AccelCtrl.ACC.Time2Collision)
Step.1.5.Char.3.Identifier = acc_csc_005_TTC
Step.1.5.Char.3.Unit =
Step.1.5.Char.3.Param.0 = RTexpr "Qu::acc_csc_005_TTC=AccelCtrl.ACC.Time2Collision"
Step.1.5.Char.4.Name = acc_csc_005_TTCWarnEver
Step.1.5.Char.4.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the warn zone [3.5,11)s.
Step.1.5.Char.4.Identifier = acc_csc_005_TTCWarnEver
Step.1.5.Char.4.Unit =
Step.1.5.Char.4.Param.0 = RTexpr {first()?Qu::acc_csc_005_TTCWarnEver=0:acc_csc_005_TTCWarnEver=max(acc_csc_005_TTCWarnEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_005_TTC>=3.5 && acc_csc_005_TTC<11))}
Step.1.5.Char.5.Name = acc_csc_005_TTCBadEver
Step.1.5.Char.5.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the bad zone (0,3.5)s.
Step.1.5.Char.5.Identifier = acc_csc_005_TTCBadEver
Step.1.5.Char.5.Unit =
Step.1.5.Char.5.Param.0 = RTexpr {first()?Qu::acc_csc_005_TTCBadEver=0:acc_csc_005_TTCBadEver=max(acc_csc_005_TTCBadEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_005_TTC>0 && acc_csc_005_TTC<3.5))}
Step.1.5.Char.6.Name = acc_csc_005_ComfortAx
Step.1.5.Char.6.Description:
	Comfort Deceleration Limit (signal=AccelCtrl.DesiredAx)
Step.1.5.Char.6.Identifier = acc_csc_005_ComfortAx
Step.1.5.Char.6.Unit =
Step.1.5.Char.6.Param.0 = RTexpr "Qu::acc_csc_005_ComfortAx=AccelCtrl.DesiredAx"
Step.1.5.Char.7.Name = acc_csc_005_ComfortAxOutOfBoundEver
Step.1.5.Char.7.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Comfort Deceleration Limit ever goes out of bound (min=-3, max=2.8).
Step.1.5.Char.7.Identifier = acc_csc_005_ComfortAxOutOfBoundEver
Step.1.5.Char.7.Unit =
Step.1.5.Char.7.Param.0 = RTexpr {first()?Qu::acc_csc_005_ComfortAxOutOfBoundEver=0:acc_csc_005_ComfortAxOutOfBoundEver=max(acc_csc_005_ComfortAxOutOfBoundEver,(acc_csc_005_ComfortAx<-3 || acc_csc_005_ComfortAx>2.8))}
Step.1.5.Char.8.Name = acc_csc_005_EmergencyAx
Step.1.5.Char.8.Description:
	Emergency Deceleration Bound (signal=AccelCtrl.DesiredAx)
Step.1.5.Char.8.Identifier = acc_csc_005_EmergencyAx
Step.1.5.Char.8.Unit =
Step.1.5.Char.8.Param.0 = RTexpr "Qu::acc_csc_005_EmergencyAx=AccelCtrl.DesiredAx"
Step.1.5.Char.9.Name = acc_csc_005_EmergencyAxOutOfBoundEver
Step.1.5.Char.9.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Emergency Deceleration Bound ever goes out of bound (min=-6).
Step.1.5.Char.9.Identifier = acc_csc_005_EmergencyAxOutOfBoundEver
Step.1.5.Char.9.Unit =
Step.1.5.Char.9.Param.0 = RTexpr {first()?Qu::acc_csc_005_EmergencyAxOutOfBoundEver=0:acc_csc_005_EmergencyAxOutOfBoundEver=max(acc_csc_005_EmergencyAxOutOfBoundEver,(acc_csc_005_EmergencyAx<-6))}
Step.1.5.Char.10.Name = acc_csc_005_Jerk
Step.1.5.Char.10.Description:
	Jerk = |d(DesiredAx)/dt|, base signal=AccelCtrl.DesiredAx
Step.1.5.Char.10.Identifier = acc_csc_005_Jerk
Step.1.5.Char.10.Unit =
Step.1.5.Char.10.Param.0 = RTexpr "Qu::acc_csc_005_Jerk=abs(diff(AccelCtrl.DesiredAx,Time))"
Step.1.5.Char.11.Name = acc_csc_005_JerkOverLimitEver
Step.1.5.Char.11.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment |jerk| ever exceeds 4 m/s3.
Step.1.5.Char.11.Identifier = acc_csc_005_JerkOverLimitEver
Step.1.5.Char.11.Unit =
Step.1.5.Char.11.Param.0 = RTexpr {first()?Qu::acc_csc_005_JerkOverLimitEver=0:acc_csc_005_JerkOverLimitEver=max(acc_csc_005_JerkOverLimitEver,(acc_csc_005_Jerk>4))}
Step.1.5.Char.12.Name = acc_csc_005_NoCollDist
Step.1.5.Char.12.Description:
	Distance to nearest lead object (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.5.Char.12.Identifier = acc_csc_005_NoCollDist
Step.1.5.Char.12.Unit =
Step.1.5.Char.12.Param.0 = RTexpr "Qu::acc_csc_005_NoCollDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.5.Char.13.Name = acc_csc_005_NoCollDistViolatedEver
Step.1.5.Char.13.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment distance ever drops below 0m.
Step.1.5.Char.13.Identifier = acc_csc_005_NoCollDistViolatedEver
Step.1.5.Char.13.Unit =
Step.1.5.Char.13.Param.0 = RTexpr {first()?Qu::acc_csc_005_NoCollDistViolatedEver=0:acc_csc_005_NoCollDistViolatedEver=max(acc_csc_005_NoCollDistViolatedEver,(acc_csc_005_NoCollDist<0))}
Step.1.5.Char.14.Name = acc_csc_005_CollisionFlag
Step.1.5.Char.14.Description:
	Collision flag derived from FMU.CM_ACCController_V17.Out.Debug.Target.DistX <= 0 (nearest lead object); instantaneous, used as the latch() trigger for ImpactSpeed below.
Step.1.5.Char.14.Identifier = acc_csc_005_CollisionFlag
Step.1.5.Char.14.Unit =
Step.1.5.Char.14.Param.0 = RTexpr "Qu::acc_csc_005_CollisionFlag=(FMU.CM_ACCController_V17.Out.Debug.Target.DistX<=0)"
Step.1.5.Char.15.Name = acc_csc_005_ImpactSpeed
Step.1.5.Char.15.Description:
	Ego speed latched at moment of first collision (nearest lead object)
Step.1.5.Char.15.Identifier = acc_csc_005_ImpactSpeed
Step.1.5.Char.15.Unit =
Step.1.5.Char.15.Param.0 = RTexpr {Qu::acc_csc_005_ImpactSpeed=latch(Speed("Ego"),Qu::acc_csc_005_CollisionFlag==1)}
Step.1.5.Char.16.Name = acc_csc_005_CollisionEver
Step.1.5.Char.16.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment a collision ever occurs (nearest lead object), even if the vehicles separate again before the run ends.
Step.1.5.Char.16.Identifier = acc_csc_005_CollisionEver
Step.1.5.Char.16.Unit =
Step.1.5.Char.16.Param.0 = RTexpr {first()?Qu::acc_csc_005_CollisionEver=0:acc_csc_005_CollisionEver=max(acc_csc_005_CollisionEver,(acc_csc_005_CollisionFlag==1))}
Step.1.5.Crit.0.Name = acc_csc_005 - Safe Distance Consistency
Step.1.5.Crit.0.Description:
	Good if SafeDist was never violated while actively following throughout the run. Bad if it was violated at any point.
Step.1.5.Crit.0.Good = [get acc_csc_005_SafeDistViolated] == 0
Step.1.5.Crit.0.Warn =
Step.1.5.Crit.0.Bad = [get acc_csc_005_SafeDistViolated] == 1
Step.1.5.Crit.1.Name = acc_csc_005 - Time To Collision
Step.1.5.Crit.1.Description:
	Good if TTC never entered the warn/bad zone while a valid target existed throughout the run. Warn if it ever entered [3.5,11)s. Bad if it ever entered (0,3.5)s.
Step.1.5.Crit.1.Good = [get acc_csc_005_TTCBadEver] == 0 && [get acc_csc_005_TTCWarnEver] == 0
Step.1.5.Crit.1.Warn = [get acc_csc_005_TTCBadEver] == 0 && [get acc_csc_005_TTCWarnEver] == 1
Step.1.5.Crit.1.Bad = [get acc_csc_005_TTCBadEver] == 1
Step.1.5.Crit.2.Name = acc_csc_005 - Comfort Deceleration Limit
Step.1.5.Crit.2.Description:
	Good if Comfort Deceleration Limit never went out of bound (min=-3, max=2.8) throughout the run.
Step.1.5.Crit.2.Good = [get acc_csc_005_ComfortAxOutOfBoundEver] == 0
Step.1.5.Crit.2.Warn =
Step.1.5.Crit.2.Bad = [get acc_csc_005_ComfortAxOutOfBoundEver] == 1
Step.1.5.Crit.3.Name = acc_csc_005 - Emergency Deceleration Bound
Step.1.5.Crit.3.Description:
	Good if Emergency Deceleration Bound never went out of bound (min=-6) throughout the run.
Step.1.5.Crit.3.Good = [get acc_csc_005_EmergencyAxOutOfBoundEver] == 0
Step.1.5.Crit.3.Warn =
Step.1.5.Crit.3.Bad = [get acc_csc_005_EmergencyAxOutOfBoundEver] == 1
Step.1.5.Crit.4.Name = acc_csc_005 - Jerk Limit
Step.1.5.Crit.4.Description:
	Good if |jerk| never exceeded 4 m/s3 throughout the run.
Step.1.5.Crit.4.Good = [get acc_csc_005_JerkOverLimitEver] == 0
Step.1.5.Crit.4.Warn =
Step.1.5.Crit.4.Bad = [get acc_csc_005_JerkOverLimitEver] == 1
Step.1.5.Crit.5.Name = acc_csc_005 - No Collision Distance
Step.1.5.Crit.5.Description:
	Good if distance never dropped below 0m throughout the run.
Step.1.5.Crit.5.Good = [get acc_csc_005_NoCollDistViolatedEver] == 0
Step.1.5.Crit.5.Warn =
Step.1.5.Crit.5.Bad = [get acc_csc_005_NoCollDistViolatedEver] == 1
Step.1.5.Crit.6.Name = acc_csc_005 - Collision Flag
Step.1.5.Crit.6.Description:
	Good if no collision ever occurred (nearest lead object) throughout the run.
Step.1.5.Crit.6.Good = [get acc_csc_005_CollisionEver] == 0
Step.1.5.Crit.6.Warn =
Step.1.5.Crit.6.Bad = [get acc_csc_005_CollisionEver] == 1
Step.1.5.Crit.7.Name = acc_csc_005 - Impact Speed
Step.1.5.Crit.7.Description:
	Good if no collision ever occurred, or impact speed = 0; Warn (0,5) m/s; Bad >= 5 m/s
Step.1.5.Crit.7.Good = [get acc_csc_005_CollisionEver] == 0 || [get acc_csc_005_ImpactSpeed] == 0
Step.1.5.Crit.7.Warn = [get acc_csc_005_CollisionEver] == 1 && [get acc_csc_005_ImpactSpeed] > 0 && [get acc_csc_005_ImpactSpeed] < 5
Step.1.5.Crit.7.Bad = [get acc_csc_005_CollisionEver] == 1 && [get acc_csc_005_ImpactSpeed] >= 5
Step.1.5.Var.0.Name = acc_csc_005_ds001
Step.1.5.Var.0.Param = 9 8 42 7 35
Step.1.5.Var.0.Result = bad
Step.1.5.Var.0.ResDate = 1782803372
Step.1.5.Var.0.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_005_140924.erg
Step.1.5.Var.0.Char.0.Ref = acc_csc_005_ActualDist
Step.1.5.Var.0.Char.0.Value = 35.61465569058501
Step.1.5.Var.0.Char.1.Ref = acc_csc_005_SafeDist
Step.1.5.Var.0.Char.1.Value = 18.76866812439187
Step.1.5.Var.0.Char.2.Ref = acc_csc_005_SafeDistViolated
Step.1.5.Var.0.Char.2.Value = 1.0
Step.1.5.Var.0.Char.3.Ref = acc_csc_005_TTC
Step.1.5.Var.0.Char.3.Value = 0.0
Step.1.5.Var.0.Char.4.Ref = acc_csc_005_TTCWarnEver
Step.1.5.Var.0.Char.4.Value = 0.0
Step.1.5.Var.0.Char.5.Ref = acc_csc_005_TTCBadEver
Step.1.5.Var.0.Char.5.Value = 0.0
Step.1.5.Var.0.Char.6.Ref = acc_csc_005_ComfortAx
Step.1.5.Var.0.Char.6.Value = 0.0
Step.1.5.Var.0.Char.7.Ref = acc_csc_005_ComfortAxOutOfBoundEver
Step.1.5.Var.0.Char.7.Value = 0.0
Step.1.5.Var.0.Char.8.Ref = acc_csc_005_EmergencyAx
Step.1.5.Var.0.Char.8.Value = 0.0
Step.1.5.Var.0.Char.9.Ref = acc_csc_005_EmergencyAxOutOfBoundEver
Step.1.5.Var.0.Char.9.Value = 0.0
Step.1.5.Var.0.Char.10.Ref = acc_csc_005_Jerk
Step.1.5.Var.0.Char.10.Value = 0.0
Step.1.5.Var.0.Char.11.Ref = acc_csc_005_JerkOverLimitEver
Step.1.5.Var.0.Char.11.Value = 1.0
Step.1.5.Var.0.Char.12.Ref = acc_csc_005_NoCollDist
Step.1.5.Var.0.Char.12.Value = 35.61465569058501
Step.1.5.Var.0.Char.13.Ref = acc_csc_005_NoCollDistViolatedEver
Step.1.5.Var.0.Char.13.Value = 0.0
Step.1.5.Var.0.Char.14.Ref = acc_csc_005_CollisionFlag
Step.1.5.Var.0.Char.14.Value = 0.0
Step.1.5.Var.0.Char.15.Ref = acc_csc_005_ImpactSpeed
Step.1.5.Var.0.Char.15.Value = 0.0
Step.1.5.Var.0.Char.16.Ref = acc_csc_005_CollisionEver
Step.1.5.Var.0.Char.16.Value = 0.0
Step.1.5.Var.0.Crit.0.Ref = acc_csc_005 - Safe Distance Consistency
Step.1.5.Var.0.Crit.0.Result = bad
Step.1.5.Var.0.Crit.1.Ref = acc_csc_005 - Time To Collision
Step.1.5.Var.0.Crit.1.Result = good
Step.1.5.Var.0.Crit.2.Ref = acc_csc_005 - Comfort Deceleration Limit
Step.1.5.Var.0.Crit.2.Result = good
Step.1.5.Var.0.Crit.3.Ref = acc_csc_005 - Emergency Deceleration Bound
Step.1.5.Var.0.Crit.3.Result = good
Step.1.5.Var.0.Crit.4.Ref = acc_csc_005 - Jerk Limit
Step.1.5.Var.0.Crit.4.Result = bad
Step.1.5.Var.0.Crit.5.Ref = acc_csc_005 - No Collision Distance
Step.1.5.Var.0.Crit.5.Result = good
Step.1.5.Var.0.Crit.6.Ref = acc_csc_005 - Collision Flag
Step.1.5.Var.0.Crit.6.Result = good
Step.1.5.Var.0.Crit.7.Ref = acc_csc_005 - Impact Speed
Step.1.5.Var.0.Crit.7.Result = good
Step.1.5.Var.1.Name = acc_csc_005_ds002
Step.1.5.Var.1.Param = 11 10 52 9 40
Step.1.5.Var.1.Result = bad
Step.1.5.Var.1.ResDate = 1782803385
Step.1.5.Var.1.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_005_140936.erg
Step.1.5.Var.1.Char.0.Ref = acc_csc_005_ActualDist
Step.1.5.Var.1.Char.0.Value = 23.416308173820113
Step.1.5.Var.1.Char.1.Ref = acc_csc_005_SafeDist
Step.1.5.Var.1.Char.1.Value = 21.09370653499097
Step.1.5.Var.1.Char.2.Ref = acc_csc_005_SafeDistViolated
Step.1.5.Var.1.Char.2.Value = 1.0
Step.1.5.Var.1.Char.3.Ref = acc_csc_005_TTC
Step.1.5.Var.1.Char.3.Value = 0.0
Step.1.5.Var.1.Char.4.Ref = acc_csc_005_TTCWarnEver
Step.1.5.Var.1.Char.4.Value = 0.0
Step.1.5.Var.1.Char.5.Ref = acc_csc_005_TTCBadEver
Step.1.5.Var.1.Char.5.Value = 0.0
Step.1.5.Var.1.Char.6.Ref = acc_csc_005_ComfortAx
Step.1.5.Var.1.Char.6.Value = 0.0
Step.1.5.Var.1.Char.7.Ref = acc_csc_005_ComfortAxOutOfBoundEver
Step.1.5.Var.1.Char.7.Value = 0.0
Step.1.5.Var.1.Char.8.Ref = acc_csc_005_EmergencyAx
Step.1.5.Var.1.Char.8.Value = 0.0
Step.1.5.Var.1.Char.9.Ref = acc_csc_005_EmergencyAxOutOfBoundEver
Step.1.5.Var.1.Char.9.Value = 0.0
Step.1.5.Var.1.Char.10.Ref = acc_csc_005_Jerk
Step.1.5.Var.1.Char.10.Value = 0.0
Step.1.5.Var.1.Char.11.Ref = acc_csc_005_JerkOverLimitEver
Step.1.5.Var.1.Char.11.Value = 1.0
Step.1.5.Var.1.Char.12.Ref = acc_csc_005_NoCollDist
Step.1.5.Var.1.Char.12.Value = 23.416308173820113
Step.1.5.Var.1.Char.13.Ref = acc_csc_005_NoCollDistViolatedEver
Step.1.5.Var.1.Char.13.Value = 0.0
Step.1.5.Var.1.Char.14.Ref = acc_csc_005_CollisionFlag
Step.1.5.Var.1.Char.14.Value = 0.0
Step.1.5.Var.1.Char.15.Ref = acc_csc_005_ImpactSpeed
Step.1.5.Var.1.Char.15.Value = 0.0
Step.1.5.Var.1.Char.16.Ref = acc_csc_005_CollisionEver
Step.1.5.Var.1.Char.16.Value = 0.0
Step.1.5.Var.1.Crit.0.Ref = acc_csc_005 - Safe Distance Consistency
Step.1.5.Var.1.Crit.0.Result = bad
Step.1.5.Var.1.Crit.1.Ref = acc_csc_005 - Time To Collision
Step.1.5.Var.1.Crit.1.Result = good
Step.1.5.Var.1.Crit.2.Ref = acc_csc_005 - Comfort Deceleration Limit
Step.1.5.Var.1.Crit.2.Result = good
Step.1.5.Var.1.Crit.3.Ref = acc_csc_005 - Emergency Deceleration Bound
Step.1.5.Var.1.Crit.3.Result = good
Step.1.5.Var.1.Crit.4.Ref = acc_csc_005 - Jerk Limit
Step.1.5.Var.1.Crit.4.Result = bad
Step.1.5.Var.1.Crit.5.Ref = acc_csc_005 - No Collision Distance
Step.1.5.Var.1.Crit.5.Result = good
Step.1.5.Var.1.Crit.6.Ref = acc_csc_005 - Collision Flag
Step.1.5.Var.1.Crit.6.Result = good
Step.1.5.Var.1.Crit.7.Ref = acc_csc_005 - Impact Speed
Step.1.5.Var.1.Crit.7.Result = good
Step.1.5.Var.2.Name = acc_csc_005_ds003
Step.1.5.Var.2.Param = 15 13 58 11 55
Step.1.5.Var.2.Result = bad
Step.1.5.Var.2.ResDate = 1782803397
Step.1.5.Var.2.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_005_140949.erg
Step.1.5.Var.2.Char.0.Ref = acc_csc_005_ActualDist
Step.1.5.Var.2.Char.0.Value = 999.0
Step.1.5.Var.2.Char.1.Ref = acc_csc_005_SafeDist
Step.1.5.Var.2.Char.1.Value = 35.40138612164207
Step.1.5.Var.2.Char.2.Ref = acc_csc_005_SafeDistViolated
Step.1.5.Var.2.Char.2.Value = 1.0
Step.1.5.Var.2.Char.3.Ref = acc_csc_005_TTC
Step.1.5.Var.2.Char.3.Value = 0.0
Step.1.5.Var.2.Char.4.Ref = acc_csc_005_TTCWarnEver
Step.1.5.Var.2.Char.4.Value = 0.0
Step.1.5.Var.2.Char.5.Ref = acc_csc_005_TTCBadEver
Step.1.5.Var.2.Char.5.Value = 0.0
Step.1.5.Var.2.Char.6.Ref = acc_csc_005_ComfortAx
Step.1.5.Var.2.Char.6.Value = -0.004
Step.1.5.Var.2.Char.7.Ref = acc_csc_005_ComfortAxOutOfBoundEver
Step.1.5.Var.2.Char.7.Value = 1.0
Step.1.5.Var.2.Char.8.Ref = acc_csc_005_EmergencyAx
Step.1.5.Var.2.Char.8.Value = -0.004
Step.1.5.Var.2.Char.9.Ref = acc_csc_005_EmergencyAxOutOfBoundEver
Step.1.5.Var.2.Char.9.Value = 0.0
Step.1.5.Var.2.Char.10.Ref = acc_csc_005_Jerk
Step.1.5.Var.2.Char.10.Value = 0.0
Step.1.5.Var.2.Char.11.Ref = acc_csc_005_JerkOverLimitEver
Step.1.5.Var.2.Char.11.Value = 1.0
Step.1.5.Var.2.Char.12.Ref = acc_csc_005_NoCollDist
Step.1.5.Var.2.Char.12.Value = 999.0
Step.1.5.Var.2.Char.13.Ref = acc_csc_005_NoCollDistViolatedEver
Step.1.5.Var.2.Char.13.Value = 0.0
Step.1.5.Var.2.Char.14.Ref = acc_csc_005_CollisionFlag
Step.1.5.Var.2.Char.14.Value = 0.0
Step.1.5.Var.2.Char.15.Ref = acc_csc_005_ImpactSpeed
Step.1.5.Var.2.Char.15.Value = 0.0
Step.1.5.Var.2.Char.16.Ref = acc_csc_005_CollisionEver
Step.1.5.Var.2.Char.16.Value = 0.0
Step.1.5.Var.2.Crit.0.Ref = acc_csc_005 - Safe Distance Consistency
Step.1.5.Var.2.Crit.0.Result = bad
Step.1.5.Var.2.Crit.1.Ref = acc_csc_005 - Time To Collision
Step.1.5.Var.2.Crit.1.Result = good
Step.1.5.Var.2.Crit.2.Ref = acc_csc_005 - Comfort Deceleration Limit
Step.1.5.Var.2.Crit.2.Result = bad
Step.1.5.Var.2.Crit.3.Ref = acc_csc_005 - Emergency Deceleration Bound
Step.1.5.Var.2.Crit.3.Result = good
Step.1.5.Var.2.Crit.4.Ref = acc_csc_005 - Jerk Limit
Step.1.5.Var.2.Crit.4.Result = bad
Step.1.5.Var.2.Crit.5.Ref = acc_csc_005 - No Collision Distance
Step.1.5.Var.2.Crit.5.Result = good
Step.1.5.Var.2.Crit.6.Ref = acc_csc_005 - Collision Flag
Step.1.5.Var.2.Crit.6.Result = good
Step.1.5.Var.2.Crit.7.Ref = acc_csc_005 - Impact Speed
Step.1.5.Var.2.Crit.7.Result = good
Step.1.5.Var.3.Name = acc_csc_005_ds004
Step.1.5.Var.3.Param = 20 17 82 14 70
Step.1.5.Var.3.Result = bad
Step.1.5.Var.3.ResDate = 1782803410
Step.1.5.Var.3.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_005_141001.erg
Step.1.5.Var.3.Char.0.Ref = acc_csc_005_ActualDist
Step.1.5.Var.3.Char.0.Value = 999.0
Step.1.5.Var.3.Char.1.Ref = acc_csc_005_SafeDist
Step.1.5.Var.3.Char.1.Value = 46.50949066771752
Step.1.5.Var.3.Char.2.Ref = acc_csc_005_SafeDistViolated
Step.1.5.Var.3.Char.2.Value = 1.0
Step.1.5.Var.3.Char.3.Ref = acc_csc_005_TTC
Step.1.5.Var.3.Char.3.Value = 0.0
Step.1.5.Var.3.Char.4.Ref = acc_csc_005_TTCWarnEver
Step.1.5.Var.3.Char.4.Value = 0.0
Step.1.5.Var.3.Char.5.Ref = acc_csc_005_TTCBadEver
Step.1.5.Var.3.Char.5.Value = 0.0
Step.1.5.Var.3.Char.6.Ref = acc_csc_005_ComfortAx
Step.1.5.Var.3.Char.6.Value = -0.004
Step.1.5.Var.3.Char.7.Ref = acc_csc_005_ComfortAxOutOfBoundEver
Step.1.5.Var.3.Char.7.Value = 1.0
Step.1.5.Var.3.Char.8.Ref = acc_csc_005_EmergencyAx
Step.1.5.Var.3.Char.8.Value = -0.004
Step.1.5.Var.3.Char.9.Ref = acc_csc_005_EmergencyAxOutOfBoundEver
Step.1.5.Var.3.Char.9.Value = 0.0
Step.1.5.Var.3.Char.10.Ref = acc_csc_005_Jerk
Step.1.5.Var.3.Char.10.Value = 0.0
Step.1.5.Var.3.Char.11.Ref = acc_csc_005_JerkOverLimitEver
Step.1.5.Var.3.Char.11.Value = 1.0
Step.1.5.Var.3.Char.12.Ref = acc_csc_005_NoCollDist
Step.1.5.Var.3.Char.12.Value = 999.0
Step.1.5.Var.3.Char.13.Ref = acc_csc_005_NoCollDistViolatedEver
Step.1.5.Var.3.Char.13.Value = 0.0
Step.1.5.Var.3.Char.14.Ref = acc_csc_005_CollisionFlag
Step.1.5.Var.3.Char.14.Value = 0.0
Step.1.5.Var.3.Char.15.Ref = acc_csc_005_ImpactSpeed
Step.1.5.Var.3.Char.15.Value = 0.0
Step.1.5.Var.3.Char.16.Ref = acc_csc_005_CollisionEver
Step.1.5.Var.3.Char.16.Value = 0.0
Step.1.5.Var.3.Crit.0.Ref = acc_csc_005 - Safe Distance Consistency
Step.1.5.Var.3.Crit.0.Result = bad
Step.1.5.Var.3.Crit.1.Ref = acc_csc_005 - Time To Collision
Step.1.5.Var.3.Crit.1.Result = good
Step.1.5.Var.3.Crit.2.Ref = acc_csc_005 - Comfort Deceleration Limit
Step.1.5.Var.3.Crit.2.Result = bad
Step.1.5.Var.3.Crit.3.Ref = acc_csc_005 - Emergency Deceleration Bound
Step.1.5.Var.3.Crit.3.Result = good
Step.1.5.Var.3.Crit.4.Ref = acc_csc_005 - Jerk Limit
Step.1.5.Var.3.Crit.4.Result = bad
Step.1.5.Var.3.Crit.5.Ref = acc_csc_005 - No Collision Distance
Step.1.5.Var.3.Crit.5.Result = good
Step.1.5.Var.3.Crit.6.Ref = acc_csc_005 - Collision Flag
Step.1.5.Var.3.Crit.6.Result = good
Step.1.5.Var.3.Crit.7.Ref = acc_csc_005 - Impact Speed
Step.1.5.Var.3.Crit.7.Result = good
Step.1.5.Var.4.Name = acc_csc_005_ds005
Step.1.5.Var.4.Param = 25 21 98 17 85
Step.1.5.Var.4.Result = bad
Step.1.5.Var.4.ResDate = 1782803422
Step.1.5.Var.4.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_005_141014.erg
Step.1.5.Var.4.Char.0.Ref = acc_csc_005_ActualDist
Step.1.5.Var.4.Char.0.Value = 999.0
Step.1.5.Var.4.Char.1.Ref = acc_csc_005_SafeDist
Step.1.5.Var.4.Char.1.Value = 57.711942786527125
Step.1.5.Var.4.Char.2.Ref = acc_csc_005_SafeDistViolated
Step.1.5.Var.4.Char.2.Value = 1.0
Step.1.5.Var.4.Char.3.Ref = acc_csc_005_TTC
Step.1.5.Var.4.Char.3.Value = 0.0
Step.1.5.Var.4.Char.4.Ref = acc_csc_005_TTCWarnEver
Step.1.5.Var.4.Char.4.Value = 0.0
Step.1.5.Var.4.Char.5.Ref = acc_csc_005_TTCBadEver
Step.1.5.Var.4.Char.5.Value = 0.0
Step.1.5.Var.4.Char.6.Ref = acc_csc_005_ComfortAx
Step.1.5.Var.4.Char.6.Value = -0.004
Step.1.5.Var.4.Char.7.Ref = acc_csc_005_ComfortAxOutOfBoundEver
Step.1.5.Var.4.Char.7.Value = 1.0
Step.1.5.Var.4.Char.8.Ref = acc_csc_005_EmergencyAx
Step.1.5.Var.4.Char.8.Value = -0.004
Step.1.5.Var.4.Char.9.Ref = acc_csc_005_EmergencyAxOutOfBoundEver
Step.1.5.Var.4.Char.9.Value = 0.0
Step.1.5.Var.4.Char.10.Ref = acc_csc_005_Jerk
Step.1.5.Var.4.Char.10.Value = 0.0
Step.1.5.Var.4.Char.11.Ref = acc_csc_005_JerkOverLimitEver
Step.1.5.Var.4.Char.11.Value = 1.0
Step.1.5.Var.4.Char.12.Ref = acc_csc_005_NoCollDist
Step.1.5.Var.4.Char.12.Value = 999.0
Step.1.5.Var.4.Char.13.Ref = acc_csc_005_NoCollDistViolatedEver
Step.1.5.Var.4.Char.13.Value = 0.0
Step.1.5.Var.4.Char.14.Ref = acc_csc_005_CollisionFlag
Step.1.5.Var.4.Char.14.Value = 0.0
Step.1.5.Var.4.Char.15.Ref = acc_csc_005_ImpactSpeed
Step.1.5.Var.4.Char.15.Value = 0.0
Step.1.5.Var.4.Char.16.Ref = acc_csc_005_CollisionEver
Step.1.5.Var.4.Char.16.Value = 0.0
Step.1.5.Var.4.Crit.0.Ref = acc_csc_005 - Safe Distance Consistency
Step.1.5.Var.4.Crit.0.Result = bad
Step.1.5.Var.4.Crit.1.Ref = acc_csc_005 - Time To Collision
Step.1.5.Var.4.Crit.1.Result = good
Step.1.5.Var.4.Crit.2.Ref = acc_csc_005 - Comfort Deceleration Limit
Step.1.5.Var.4.Crit.2.Result = bad
Step.1.5.Var.4.Crit.3.Ref = acc_csc_005 - Emergency Deceleration Bound
Step.1.5.Var.4.Crit.3.Result = good
Step.1.5.Var.4.Crit.4.Ref = acc_csc_005 - Jerk Limit
Step.1.5.Var.4.Crit.4.Result = bad
Step.1.5.Var.4.Crit.5.Ref = acc_csc_005 - No Collision Distance
Step.1.5.Var.4.Crit.5.Result = good
Step.1.5.Var.4.Crit.6.Ref = acc_csc_005 - Collision Flag
Step.1.5.Var.4.Crit.6.Result = good
Step.1.5.Var.4.Crit.7.Ref = acc_csc_005 - Impact Speed
Step.1.5.Var.4.Crit.7.Result = good
Step.1.6 = TestRun
Step.1.6.Name = OSC_Imported/longitudinal_feature/ACC/acc_csc_006
Step.1.6.Param.0 = EgoSpeed NValue
Step.1.6.Param.1 = TV1Speed NValue
Step.1.6.Param.2 = TV1_initPos NValue
Step.1.6.Param.3 = TV2Speed NValue
Step.1.6.Param.4 = TV2_initPos NValue
Step.1.6.Char.0.Name = acc_csc_006_ActualDist
Step.1.6.Char.0.Description:
	Actual distance to lead (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.6.Char.0.Identifier = acc_csc_006_ActualDist
Step.1.6.Char.0.Unit =
Step.1.6.Char.0.Param.0 = RTexpr "Qu::acc_csc_006_ActualDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.6.Char.1.Name = acc_csc_006_SafeDist
Step.1.6.Char.1.Description:
	Reference safe distance (signal=FMU.CM_ACCController_V17.Out.Debug.SafeDistance)
Step.1.6.Char.1.Identifier = acc_csc_006_SafeDist
Step.1.6.Char.1.Unit =
Step.1.6.Char.1.Param.0 = RTexpr "Qu::acc_csc_006_SafeDist=FMU.CM_ACCController_V17.Out.Debug.SafeDistance"
Step.1.6.Char.2.Name = acc_csc_006_SafeDistViolated
Step.1.6.Char.2.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment ActualDist<SafeDist while actively following (gate==1); stays 1 for the rest of the run even if distance recovers.
Step.1.6.Char.2.Identifier = acc_csc_006_SafeDistViolated
Step.1.6.Char.2.Unit =
Step.1.6.Char.2.Param.0 = RTexpr {first()?Qu::acc_csc_006_SafeDistViolated=0:acc_csc_006_SafeDistViolated=max(acc_csc_006_SafeDistViolated,(FMU.CM_ACCController_V17.Out.Debug.Fusion.Active==1 && acc_csc_006_ActualDist<acc_csc_006_SafeDist))}
Step.1.6.Char.3.Name = acc_csc_006_TTC
Step.1.6.Char.3.Description:
	Time-to-collision (signal=AccelCtrl.ACC.Time2Collision)
Step.1.6.Char.3.Identifier = acc_csc_006_TTC
Step.1.6.Char.3.Unit =
Step.1.6.Char.3.Param.0 = RTexpr "Qu::acc_csc_006_TTC=AccelCtrl.ACC.Time2Collision"
Step.1.6.Char.4.Name = acc_csc_006_TTCWarnEver
Step.1.6.Char.4.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the warn zone [3.5,11)s.
Step.1.6.Char.4.Identifier = acc_csc_006_TTCWarnEver
Step.1.6.Char.4.Unit =
Step.1.6.Char.4.Param.0 = RTexpr {first()?Qu::acc_csc_006_TTCWarnEver=0:acc_csc_006_TTCWarnEver=max(acc_csc_006_TTCWarnEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_006_TTC>=3.5 && acc_csc_006_TTC<11))}
Step.1.6.Char.5.Name = acc_csc_006_TTCBadEver
Step.1.6.Char.5.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the bad zone (0,3.5)s.
Step.1.6.Char.5.Identifier = acc_csc_006_TTCBadEver
Step.1.6.Char.5.Unit =
Step.1.6.Char.5.Param.0 = RTexpr {first()?Qu::acc_csc_006_TTCBadEver=0:acc_csc_006_TTCBadEver=max(acc_csc_006_TTCBadEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_006_TTC>0 && acc_csc_006_TTC<3.5))}
Step.1.6.Char.6.Name = acc_csc_006_ComfortAx
Step.1.6.Char.6.Description:
	Comfort Deceleration Limit (signal=AccelCtrl.DesiredAx)
Step.1.6.Char.6.Identifier = acc_csc_006_ComfortAx
Step.1.6.Char.6.Unit =
Step.1.6.Char.6.Param.0 = RTexpr "Qu::acc_csc_006_ComfortAx=AccelCtrl.DesiredAx"
Step.1.6.Char.7.Name = acc_csc_006_ComfortAxOutOfBoundEver
Step.1.6.Char.7.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Comfort Deceleration Limit ever goes out of bound (min=-3, max=2.8).
Step.1.6.Char.7.Identifier = acc_csc_006_ComfortAxOutOfBoundEver
Step.1.6.Char.7.Unit =
Step.1.6.Char.7.Param.0 = RTexpr {first()?Qu::acc_csc_006_ComfortAxOutOfBoundEver=0:acc_csc_006_ComfortAxOutOfBoundEver=max(acc_csc_006_ComfortAxOutOfBoundEver,(acc_csc_006_ComfortAx<-3 || acc_csc_006_ComfortAx>2.8))}
Step.1.6.Char.8.Name = acc_csc_006_EmergencyAx
Step.1.6.Char.8.Description:
	Emergency Deceleration Bound (signal=AccelCtrl.DesiredAx)
Step.1.6.Char.8.Identifier = acc_csc_006_EmergencyAx
Step.1.6.Char.8.Unit =
Step.1.6.Char.8.Param.0 = RTexpr "Qu::acc_csc_006_EmergencyAx=AccelCtrl.DesiredAx"
Step.1.6.Char.9.Name = acc_csc_006_EmergencyAxOutOfBoundEver
Step.1.6.Char.9.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Emergency Deceleration Bound ever goes out of bound (min=-6).
Step.1.6.Char.9.Identifier = acc_csc_006_EmergencyAxOutOfBoundEver
Step.1.6.Char.9.Unit =
Step.1.6.Char.9.Param.0 = RTexpr {first()?Qu::acc_csc_006_EmergencyAxOutOfBoundEver=0:acc_csc_006_EmergencyAxOutOfBoundEver=max(acc_csc_006_EmergencyAxOutOfBoundEver,(acc_csc_006_EmergencyAx<-6))}
Step.1.6.Char.10.Name = acc_csc_006_Jerk
Step.1.6.Char.10.Description:
	Jerk = |d(DesiredAx)/dt|, base signal=AccelCtrl.DesiredAx
Step.1.6.Char.10.Identifier = acc_csc_006_Jerk
Step.1.6.Char.10.Unit =
Step.1.6.Char.10.Param.0 = RTexpr "Qu::acc_csc_006_Jerk=abs(diff(AccelCtrl.DesiredAx,Time))"
Step.1.6.Char.11.Name = acc_csc_006_JerkOverLimitEver
Step.1.6.Char.11.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment |jerk| ever exceeds 4 m/s3.
Step.1.6.Char.11.Identifier = acc_csc_006_JerkOverLimitEver
Step.1.6.Char.11.Unit =
Step.1.6.Char.11.Param.0 = RTexpr {first()?Qu::acc_csc_006_JerkOverLimitEver=0:acc_csc_006_JerkOverLimitEver=max(acc_csc_006_JerkOverLimitEver,(acc_csc_006_Jerk>4))}
Step.1.6.Char.12.Name = acc_csc_006_NoCollDist
Step.1.6.Char.12.Description:
	Distance to nearest lead object (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.6.Char.12.Identifier = acc_csc_006_NoCollDist
Step.1.6.Char.12.Unit =
Step.1.6.Char.12.Param.0 = RTexpr "Qu::acc_csc_006_NoCollDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.6.Char.13.Name = acc_csc_006_NoCollDistViolatedEver
Step.1.6.Char.13.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment distance ever drops below 0m.
Step.1.6.Char.13.Identifier = acc_csc_006_NoCollDistViolatedEver
Step.1.6.Char.13.Unit =
Step.1.6.Char.13.Param.0 = RTexpr {first()?Qu::acc_csc_006_NoCollDistViolatedEver=0:acc_csc_006_NoCollDistViolatedEver=max(acc_csc_006_NoCollDistViolatedEver,(acc_csc_006_NoCollDist<0))}
Step.1.6.Char.14.Name = acc_csc_006_CollisionFlag
Step.1.6.Char.14.Description:
	Collision flag derived from FMU.CM_ACCController_V17.Out.Debug.Target.DistX <= 0 (nearest lead object); instantaneous, used as the latch() trigger for ImpactSpeed below.
Step.1.6.Char.14.Identifier = acc_csc_006_CollisionFlag
Step.1.6.Char.14.Unit =
Step.1.6.Char.14.Param.0 = RTexpr "Qu::acc_csc_006_CollisionFlag=(FMU.CM_ACCController_V17.Out.Debug.Target.DistX<=0)"
Step.1.6.Char.15.Name = acc_csc_006_ImpactSpeed
Step.1.6.Char.15.Description:
	Ego speed latched at moment of first collision (nearest lead object)
Step.1.6.Char.15.Identifier = acc_csc_006_ImpactSpeed
Step.1.6.Char.15.Unit =
Step.1.6.Char.15.Param.0 = RTexpr {Qu::acc_csc_006_ImpactSpeed=latch(Speed("Ego"),Qu::acc_csc_006_CollisionFlag==1)}
Step.1.6.Char.16.Name = acc_csc_006_CollisionEver
Step.1.6.Char.16.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment a collision ever occurs (nearest lead object), even if the vehicles separate again before the run ends.
Step.1.6.Char.16.Identifier = acc_csc_006_CollisionEver
Step.1.6.Char.16.Unit =
Step.1.6.Char.16.Param.0 = RTexpr {first()?Qu::acc_csc_006_CollisionEver=0:acc_csc_006_CollisionEver=max(acc_csc_006_CollisionEver,(acc_csc_006_CollisionFlag==1))}
Step.1.6.Crit.0.Name = acc_csc_006 - Safe Distance Consistency
Step.1.6.Crit.0.Description:
	Good if SafeDist was never violated while actively following throughout the run. Bad if it was violated at any point.
Step.1.6.Crit.0.Good = [get acc_csc_006_SafeDistViolated] == 0
Step.1.6.Crit.0.Warn =
Step.1.6.Crit.0.Bad = [get acc_csc_006_SafeDistViolated] == 1
Step.1.6.Crit.1.Name = acc_csc_006 - Time To Collision
Step.1.6.Crit.1.Description:
	Good if TTC never entered the warn/bad zone while a valid target existed throughout the run. Warn if it ever entered [3.5,11)s. Bad if it ever entered (0,3.5)s.
Step.1.6.Crit.1.Good = [get acc_csc_006_TTCBadEver] == 0 && [get acc_csc_006_TTCWarnEver] == 0
Step.1.6.Crit.1.Warn = [get acc_csc_006_TTCBadEver] == 0 && [get acc_csc_006_TTCWarnEver] == 1
Step.1.6.Crit.1.Bad = [get acc_csc_006_TTCBadEver] == 1
Step.1.6.Crit.2.Name = acc_csc_006 - Comfort Deceleration Limit
Step.1.6.Crit.2.Description:
	Good if Comfort Deceleration Limit never went out of bound (min=-3, max=2.8) throughout the run.
Step.1.6.Crit.2.Good = [get acc_csc_006_ComfortAxOutOfBoundEver] == 0
Step.1.6.Crit.2.Warn =
Step.1.6.Crit.2.Bad = [get acc_csc_006_ComfortAxOutOfBoundEver] == 1
Step.1.6.Crit.3.Name = acc_csc_006 - Emergency Deceleration Bound
Step.1.6.Crit.3.Description:
	Good if Emergency Deceleration Bound never went out of bound (min=-6) throughout the run.
Step.1.6.Crit.3.Good = [get acc_csc_006_EmergencyAxOutOfBoundEver] == 0
Step.1.6.Crit.3.Warn =
Step.1.6.Crit.3.Bad = [get acc_csc_006_EmergencyAxOutOfBoundEver] == 1
Step.1.6.Crit.4.Name = acc_csc_006 - Jerk Limit
Step.1.6.Crit.4.Description:
	Good if |jerk| never exceeded 4 m/s3 throughout the run.
Step.1.6.Crit.4.Good = [get acc_csc_006_JerkOverLimitEver] == 0
Step.1.6.Crit.4.Warn =
Step.1.6.Crit.4.Bad = [get acc_csc_006_JerkOverLimitEver] == 1
Step.1.6.Crit.5.Name = acc_csc_006 - No Collision Distance
Step.1.6.Crit.5.Description:
	Good if distance never dropped below 0m throughout the run.
Step.1.6.Crit.5.Good = [get acc_csc_006_NoCollDistViolatedEver] == 0
Step.1.6.Crit.5.Warn =
Step.1.6.Crit.5.Bad = [get acc_csc_006_NoCollDistViolatedEver] == 1
Step.1.6.Crit.6.Name = acc_csc_006 - Collision Flag
Step.1.6.Crit.6.Description:
	Good if no collision ever occurred (nearest lead object) throughout the run.
Step.1.6.Crit.6.Good = [get acc_csc_006_CollisionEver] == 0
Step.1.6.Crit.6.Warn =
Step.1.6.Crit.6.Bad = [get acc_csc_006_CollisionEver] == 1
Step.1.6.Crit.7.Name = acc_csc_006 - Impact Speed
Step.1.6.Crit.7.Description:
	Good if no collision ever occurred, or impact speed = 0; Warn (0,5) m/s; Bad >= 5 m/s
Step.1.6.Crit.7.Good = [get acc_csc_006_CollisionEver] == 0 || [get acc_csc_006_ImpactSpeed] == 0
Step.1.6.Crit.7.Warn = [get acc_csc_006_CollisionEver] == 1 && [get acc_csc_006_ImpactSpeed] > 0 && [get acc_csc_006_ImpactSpeed] < 5
Step.1.6.Crit.7.Bad = [get acc_csc_006_CollisionEver] == 1 && [get acc_csc_006_ImpactSpeed] >= 5
Step.1.6.Var.0.Name = acc_csc_006_ds001
Step.1.6.Var.0.Param = 9 8 42 7 35
Step.1.6.Var.0.Result = bad
Step.1.6.Var.0.ResDate = 1782803435
Step.1.6.Var.0.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_006_141027.erg
Step.1.6.Var.0.Char.0.Ref = acc_csc_006_ActualDist
Step.1.6.Var.0.Char.0.Value = 35.39208818325701
Step.1.6.Var.0.Char.1.Ref = acc_csc_006_SafeDist
Step.1.6.Var.0.Char.1.Value = 18.80407233967081
Step.1.6.Var.0.Char.2.Ref = acc_csc_006_SafeDistViolated
Step.1.6.Var.0.Char.2.Value = 1.0
Step.1.6.Var.0.Char.3.Ref = acc_csc_006_TTC
Step.1.6.Var.0.Char.3.Value = 0.0
Step.1.6.Var.0.Char.4.Ref = acc_csc_006_TTCWarnEver
Step.1.6.Var.0.Char.4.Value = 0.0
Step.1.6.Var.0.Char.5.Ref = acc_csc_006_TTCBadEver
Step.1.6.Var.0.Char.5.Value = 0.0
Step.1.6.Var.0.Char.6.Ref = acc_csc_006_ComfortAx
Step.1.6.Var.0.Char.6.Value = 0.0
Step.1.6.Var.0.Char.7.Ref = acc_csc_006_ComfortAxOutOfBoundEver
Step.1.6.Var.0.Char.7.Value = 0.0
Step.1.6.Var.0.Char.8.Ref = acc_csc_006_EmergencyAx
Step.1.6.Var.0.Char.8.Value = 0.0
Step.1.6.Var.0.Char.9.Ref = acc_csc_006_EmergencyAxOutOfBoundEver
Step.1.6.Var.0.Char.9.Value = 0.0
Step.1.6.Var.0.Char.10.Ref = acc_csc_006_Jerk
Step.1.6.Var.0.Char.10.Value = 0.0
Step.1.6.Var.0.Char.11.Ref = acc_csc_006_JerkOverLimitEver
Step.1.6.Var.0.Char.11.Value = 1.0
Step.1.6.Var.0.Char.12.Ref = acc_csc_006_NoCollDist
Step.1.6.Var.0.Char.12.Value = 35.39208818325701
Step.1.6.Var.0.Char.13.Ref = acc_csc_006_NoCollDistViolatedEver
Step.1.6.Var.0.Char.13.Value = 0.0
Step.1.6.Var.0.Char.14.Ref = acc_csc_006_CollisionFlag
Step.1.6.Var.0.Char.14.Value = 0.0
Step.1.6.Var.0.Char.15.Ref = acc_csc_006_ImpactSpeed
Step.1.6.Var.0.Char.15.Value = 0.0
Step.1.6.Var.0.Char.16.Ref = acc_csc_006_CollisionEver
Step.1.6.Var.0.Char.16.Value = 0.0
Step.1.6.Var.0.Crit.0.Ref = acc_csc_006 - Safe Distance Consistency
Step.1.6.Var.0.Crit.0.Result = bad
Step.1.6.Var.0.Crit.1.Ref = acc_csc_006 - Time To Collision
Step.1.6.Var.0.Crit.1.Result = good
Step.1.6.Var.0.Crit.2.Ref = acc_csc_006 - Comfort Deceleration Limit
Step.1.6.Var.0.Crit.2.Result = good
Step.1.6.Var.0.Crit.3.Ref = acc_csc_006 - Emergency Deceleration Bound
Step.1.6.Var.0.Crit.3.Result = good
Step.1.6.Var.0.Crit.4.Ref = acc_csc_006 - Jerk Limit
Step.1.6.Var.0.Crit.4.Result = bad
Step.1.6.Var.0.Crit.5.Ref = acc_csc_006 - No Collision Distance
Step.1.6.Var.0.Crit.5.Result = good
Step.1.6.Var.0.Crit.6.Ref = acc_csc_006 - Collision Flag
Step.1.6.Var.0.Crit.6.Result = good
Step.1.6.Var.0.Crit.7.Ref = acc_csc_006 - Impact Speed
Step.1.6.Var.0.Crit.7.Result = good
Step.1.6.Var.1.Name = acc_csc_006_ds002
Step.1.6.Var.1.Param = 11 10 52 9 40
Step.1.6.Var.1.Result = bad
Step.1.6.Var.1.ResDate = 1782803448
Step.1.6.Var.1.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_006_141040.erg
Step.1.6.Var.1.Char.0.Ref = acc_csc_006_ActualDist
Step.1.6.Var.1.Char.0.Value = 23.68450005429535
Step.1.6.Var.1.Char.1.Ref = acc_csc_006_SafeDist
Step.1.6.Var.1.Char.1.Value = 21.072307309193356
Step.1.6.Var.1.Char.2.Ref = acc_csc_006_SafeDistViolated
Step.1.6.Var.1.Char.2.Value = 1.0
Step.1.6.Var.1.Char.3.Ref = acc_csc_006_TTC
Step.1.6.Var.1.Char.3.Value = 0.0
Step.1.6.Var.1.Char.4.Ref = acc_csc_006_TTCWarnEver
Step.1.6.Var.1.Char.4.Value = 0.0
Step.1.6.Var.1.Char.5.Ref = acc_csc_006_TTCBadEver
Step.1.6.Var.1.Char.5.Value = 0.0
Step.1.6.Var.1.Char.6.Ref = acc_csc_006_ComfortAx
Step.1.6.Var.1.Char.6.Value = 0.0
Step.1.6.Var.1.Char.7.Ref = acc_csc_006_ComfortAxOutOfBoundEver
Step.1.6.Var.1.Char.7.Value = 0.0
Step.1.6.Var.1.Char.8.Ref = acc_csc_006_EmergencyAx
Step.1.6.Var.1.Char.8.Value = 0.0
Step.1.6.Var.1.Char.9.Ref = acc_csc_006_EmergencyAxOutOfBoundEver
Step.1.6.Var.1.Char.9.Value = 0.0
Step.1.6.Var.1.Char.10.Ref = acc_csc_006_Jerk
Step.1.6.Var.1.Char.10.Value = 0.0
Step.1.6.Var.1.Char.11.Ref = acc_csc_006_JerkOverLimitEver
Step.1.6.Var.1.Char.11.Value = 1.0
Step.1.6.Var.1.Char.12.Ref = acc_csc_006_NoCollDist
Step.1.6.Var.1.Char.12.Value = 23.68450005429535
Step.1.6.Var.1.Char.13.Ref = acc_csc_006_NoCollDistViolatedEver
Step.1.6.Var.1.Char.13.Value = 0.0
Step.1.6.Var.1.Char.14.Ref = acc_csc_006_CollisionFlag
Step.1.6.Var.1.Char.14.Value = 0.0
Step.1.6.Var.1.Char.15.Ref = acc_csc_006_ImpactSpeed
Step.1.6.Var.1.Char.15.Value = 0.0
Step.1.6.Var.1.Char.16.Ref = acc_csc_006_CollisionEver
Step.1.6.Var.1.Char.16.Value = 0.0
Step.1.6.Var.1.Crit.0.Ref = acc_csc_006 - Safe Distance Consistency
Step.1.6.Var.1.Crit.0.Result = bad
Step.1.6.Var.1.Crit.1.Ref = acc_csc_006 - Time To Collision
Step.1.6.Var.1.Crit.1.Result = good
Step.1.6.Var.1.Crit.2.Ref = acc_csc_006 - Comfort Deceleration Limit
Step.1.6.Var.1.Crit.2.Result = good
Step.1.6.Var.1.Crit.3.Ref = acc_csc_006 - Emergency Deceleration Bound
Step.1.6.Var.1.Crit.3.Result = good
Step.1.6.Var.1.Crit.4.Ref = acc_csc_006 - Jerk Limit
Step.1.6.Var.1.Crit.4.Result = bad
Step.1.6.Var.1.Crit.5.Ref = acc_csc_006 - No Collision Distance
Step.1.6.Var.1.Crit.5.Result = good
Step.1.6.Var.1.Crit.6.Ref = acc_csc_006 - Collision Flag
Step.1.6.Var.1.Crit.6.Result = good
Step.1.6.Var.1.Crit.7.Ref = acc_csc_006 - Impact Speed
Step.1.6.Var.1.Crit.7.Result = good
Step.1.6.Var.2.Name = acc_csc_006_ds003
Step.1.6.Var.2.Param = 15 13 58 11 55
Step.1.6.Var.2.Result = bad
Step.1.6.Var.2.ResDate = 1782803461
Step.1.6.Var.2.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_006_141052.erg
Step.1.6.Var.2.Char.0.Ref = acc_csc_006_ActualDist
Step.1.6.Var.2.Char.0.Value = 999.0
Step.1.6.Var.2.Char.1.Ref = acc_csc_006_SafeDist
Step.1.6.Var.2.Char.1.Value = 35.40048363062607
Step.1.6.Var.2.Char.2.Ref = acc_csc_006_SafeDistViolated
Step.1.6.Var.2.Char.2.Value = 1.0
Step.1.6.Var.2.Char.3.Ref = acc_csc_006_TTC
Step.1.6.Var.2.Char.3.Value = 0.0
Step.1.6.Var.2.Char.4.Ref = acc_csc_006_TTCWarnEver
Step.1.6.Var.2.Char.4.Value = 0.0
Step.1.6.Var.2.Char.5.Ref = acc_csc_006_TTCBadEver
Step.1.6.Var.2.Char.5.Value = 0.0
Step.1.6.Var.2.Char.6.Ref = acc_csc_006_ComfortAx
Step.1.6.Var.2.Char.6.Value = -0.004
Step.1.6.Var.2.Char.7.Ref = acc_csc_006_ComfortAxOutOfBoundEver
Step.1.6.Var.2.Char.7.Value = 1.0
Step.1.6.Var.2.Char.8.Ref = acc_csc_006_EmergencyAx
Step.1.6.Var.2.Char.8.Value = -0.004
Step.1.6.Var.2.Char.9.Ref = acc_csc_006_EmergencyAxOutOfBoundEver
Step.1.6.Var.2.Char.9.Value = 0.0
Step.1.6.Var.2.Char.10.Ref = acc_csc_006_Jerk
Step.1.6.Var.2.Char.10.Value = 0.0
Step.1.6.Var.2.Char.11.Ref = acc_csc_006_JerkOverLimitEver
Step.1.6.Var.2.Char.11.Value = 1.0
Step.1.6.Var.2.Char.12.Ref = acc_csc_006_NoCollDist
Step.1.6.Var.2.Char.12.Value = 999.0
Step.1.6.Var.2.Char.13.Ref = acc_csc_006_NoCollDistViolatedEver
Step.1.6.Var.2.Char.13.Value = 0.0
Step.1.6.Var.2.Char.14.Ref = acc_csc_006_CollisionFlag
Step.1.6.Var.2.Char.14.Value = 0.0
Step.1.6.Var.2.Char.15.Ref = acc_csc_006_ImpactSpeed
Step.1.6.Var.2.Char.15.Value = 0.0
Step.1.6.Var.2.Char.16.Ref = acc_csc_006_CollisionEver
Step.1.6.Var.2.Char.16.Value = 0.0
Step.1.6.Var.2.Crit.0.Ref = acc_csc_006 - Safe Distance Consistency
Step.1.6.Var.2.Crit.0.Result = bad
Step.1.6.Var.2.Crit.1.Ref = acc_csc_006 - Time To Collision
Step.1.6.Var.2.Crit.1.Result = good
Step.1.6.Var.2.Crit.2.Ref = acc_csc_006 - Comfort Deceleration Limit
Step.1.6.Var.2.Crit.2.Result = bad
Step.1.6.Var.2.Crit.3.Ref = acc_csc_006 - Emergency Deceleration Bound
Step.1.6.Var.2.Crit.3.Result = good
Step.1.6.Var.2.Crit.4.Ref = acc_csc_006 - Jerk Limit
Step.1.6.Var.2.Crit.4.Result = bad
Step.1.6.Var.2.Crit.5.Ref = acc_csc_006 - No Collision Distance
Step.1.6.Var.2.Crit.5.Result = good
Step.1.6.Var.2.Crit.6.Ref = acc_csc_006 - Collision Flag
Step.1.6.Var.2.Crit.6.Result = good
Step.1.6.Var.2.Crit.7.Ref = acc_csc_006 - Impact Speed
Step.1.6.Var.2.Crit.7.Result = good
Step.1.6.Var.3.Name = acc_csc_006_ds004
Step.1.6.Var.3.Param = 20 17 82 14 70
Step.1.6.Var.3.Result = bad
Step.1.6.Var.3.ResDate = 1782803473
Step.1.6.Var.3.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_006_141105.erg
Step.1.6.Var.3.Char.0.Ref = acc_csc_006_ActualDist
Step.1.6.Var.3.Char.0.Value = 42.06129857263341
Step.1.6.Var.3.Char.1.Ref = acc_csc_006_SafeDist
Step.1.6.Var.3.Char.1.Value = 55.61465367709837
Step.1.6.Var.3.Char.2.Ref = acc_csc_006_SafeDistViolated
Step.1.6.Var.3.Char.2.Value = 1.0
Step.1.6.Var.3.Char.3.Ref = acc_csc_006_TTC
Step.1.6.Var.3.Char.3.Value = 0.0
Step.1.6.Var.3.Char.4.Ref = acc_csc_006_TTCWarnEver
Step.1.6.Var.3.Char.4.Value = 0.0
Step.1.6.Var.3.Char.5.Ref = acc_csc_006_TTCBadEver
Step.1.6.Var.3.Char.5.Value = 0.0
Step.1.6.Var.3.Char.6.Ref = acc_csc_006_ComfortAx
Step.1.6.Var.3.Char.6.Value = -2.058718849344178
Step.1.6.Var.3.Char.7.Ref = acc_csc_006_ComfortAxOutOfBoundEver
Step.1.6.Var.3.Char.7.Value = 1.0
Step.1.6.Var.3.Char.8.Ref = acc_csc_006_EmergencyAx
Step.1.6.Var.3.Char.8.Value = -2.058718849344178
Step.1.6.Var.3.Char.9.Ref = acc_csc_006_EmergencyAxOutOfBoundEver
Step.1.6.Var.3.Char.9.Value = 0.0
Step.1.6.Var.3.Char.10.Ref = acc_csc_006_Jerk
Step.1.6.Var.3.Char.10.Value = 0.07356097961270172
Step.1.6.Var.3.Char.11.Ref = acc_csc_006_JerkOverLimitEver
Step.1.6.Var.3.Char.11.Value = 1.0
Step.1.6.Var.3.Char.12.Ref = acc_csc_006_NoCollDist
Step.1.6.Var.3.Char.12.Value = 42.06129857263341
Step.1.6.Var.3.Char.13.Ref = acc_csc_006_NoCollDistViolatedEver
Step.1.6.Var.3.Char.13.Value = 0.0
Step.1.6.Var.3.Char.14.Ref = acc_csc_006_CollisionFlag
Step.1.6.Var.3.Char.14.Value = 0.0
Step.1.6.Var.3.Char.15.Ref = acc_csc_006_ImpactSpeed
Step.1.6.Var.3.Char.15.Value = 0.0
Step.1.6.Var.3.Char.16.Ref = acc_csc_006_CollisionEver
Step.1.6.Var.3.Char.16.Value = 0.0
Step.1.6.Var.3.Crit.0.Ref = acc_csc_006 - Safe Distance Consistency
Step.1.6.Var.3.Crit.0.Result = bad
Step.1.6.Var.3.Crit.1.Ref = acc_csc_006 - Time To Collision
Step.1.6.Var.3.Crit.1.Result = good
Step.1.6.Var.3.Crit.2.Ref = acc_csc_006 - Comfort Deceleration Limit
Step.1.6.Var.3.Crit.2.Result = bad
Step.1.6.Var.3.Crit.3.Ref = acc_csc_006 - Emergency Deceleration Bound
Step.1.6.Var.3.Crit.3.Result = good
Step.1.6.Var.3.Crit.4.Ref = acc_csc_006 - Jerk Limit
Step.1.6.Var.3.Crit.4.Result = bad
Step.1.6.Var.3.Crit.5.Ref = acc_csc_006 - No Collision Distance
Step.1.6.Var.3.Crit.5.Result = good
Step.1.6.Var.3.Crit.6.Ref = acc_csc_006 - Collision Flag
Step.1.6.Var.3.Crit.6.Result = good
Step.1.6.Var.3.Crit.7.Ref = acc_csc_006 - Impact Speed
Step.1.6.Var.3.Crit.7.Result = good
Step.1.6.Var.4.Name = acc_csc_006_ds005
Step.1.6.Var.4.Param = 25 21 98 17 85
Step.1.6.Var.4.Result = bad
Step.1.6.Var.4.ResDate = 1782803486
Step.1.6.Var.4.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_006_141117.erg
Step.1.6.Var.4.Char.0.Ref = acc_csc_006_ActualDist
Step.1.6.Var.4.Char.0.Value = 6.230629063271893
Step.1.6.Var.4.Char.1.Ref = acc_csc_006_SafeDist
Step.1.6.Var.4.Char.1.Value = 49.42450475553383
Step.1.6.Var.4.Char.2.Ref = acc_csc_006_SafeDistViolated
Step.1.6.Var.4.Char.2.Value = 1.0
Step.1.6.Var.4.Char.3.Ref = acc_csc_006_TTC
Step.1.6.Var.4.Char.3.Value = 0.0
Step.1.6.Var.4.Char.4.Ref = acc_csc_006_TTCWarnEver
Step.1.6.Var.4.Char.4.Value = 0.0
Step.1.6.Var.4.Char.5.Ref = acc_csc_006_TTCBadEver
Step.1.6.Var.4.Char.5.Value = 0.0
Step.1.6.Var.4.Char.6.Ref = acc_csc_006_ComfortAx
Step.1.6.Var.4.Char.6.Value = -6.0
Step.1.6.Var.4.Char.7.Ref = acc_csc_006_ComfortAxOutOfBoundEver
Step.1.6.Var.4.Char.7.Value = 1.0
Step.1.6.Var.4.Char.8.Ref = acc_csc_006_EmergencyAx
Step.1.6.Var.4.Char.8.Value = -6.0
Step.1.6.Var.4.Char.9.Ref = acc_csc_006_EmergencyAxOutOfBoundEver
Step.1.6.Var.4.Char.9.Value = 0.0
Step.1.6.Var.4.Char.10.Ref = acc_csc_006_Jerk
Step.1.6.Var.4.Char.10.Value = 0.0
Step.1.6.Var.4.Char.11.Ref = acc_csc_006_JerkOverLimitEver
Step.1.6.Var.4.Char.11.Value = 1.0
Step.1.6.Var.4.Char.12.Ref = acc_csc_006_NoCollDist
Step.1.6.Var.4.Char.12.Value = 6.230629063271893
Step.1.6.Var.4.Char.13.Ref = acc_csc_006_NoCollDistViolatedEver
Step.1.6.Var.4.Char.13.Value = 0.0
Step.1.6.Var.4.Char.14.Ref = acc_csc_006_CollisionFlag
Step.1.6.Var.4.Char.14.Value = 0.0
Step.1.6.Var.4.Char.15.Ref = acc_csc_006_ImpactSpeed
Step.1.6.Var.4.Char.15.Value = 0.0
Step.1.6.Var.4.Char.16.Ref = acc_csc_006_CollisionEver
Step.1.6.Var.4.Char.16.Value = 0.0
Step.1.6.Var.4.Crit.0.Ref = acc_csc_006 - Safe Distance Consistency
Step.1.6.Var.4.Crit.0.Result = bad
Step.1.6.Var.4.Crit.1.Ref = acc_csc_006 - Time To Collision
Step.1.6.Var.4.Crit.1.Result = good
Step.1.6.Var.4.Crit.2.Ref = acc_csc_006 - Comfort Deceleration Limit
Step.1.6.Var.4.Crit.2.Result = bad
Step.1.6.Var.4.Crit.3.Ref = acc_csc_006 - Emergency Deceleration Bound
Step.1.6.Var.4.Crit.3.Result = good
Step.1.6.Var.4.Crit.4.Ref = acc_csc_006 - Jerk Limit
Step.1.6.Var.4.Crit.4.Result = bad
Step.1.6.Var.4.Crit.5.Ref = acc_csc_006 - No Collision Distance
Step.1.6.Var.4.Crit.5.Result = good
Step.1.6.Var.4.Crit.6.Ref = acc_csc_006 - Collision Flag
Step.1.6.Var.4.Crit.6.Result = good
Step.1.6.Var.4.Crit.7.Ref = acc_csc_006 - Impact Speed
Step.1.6.Var.4.Crit.7.Result = good
Step.1.7 = TestRun
Step.1.7.Name = OSC_Imported/longitudinal_feature/ACC/acc_csc_007
Step.1.7.Param.0 = EgoSpeed NValue
Step.1.7.Param.1 = TVSpeed NValue
Step.1.7.Param.2 = TV_initPos NValue
Step.1.7.Char.0.Name = acc_csc_007_ActualDist
Step.1.7.Char.0.Description:
	Actual distance to lead (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.7.Char.0.Identifier = acc_csc_007_ActualDist
Step.1.7.Char.0.Unit =
Step.1.7.Char.0.Param.0 = RTexpr "Qu::acc_csc_007_ActualDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.7.Char.1.Name = acc_csc_007_SafeDist
Step.1.7.Char.1.Description:
	Reference safe distance (signal=FMU.CM_ACCController_V17.Out.Debug.SafeDistance)
Step.1.7.Char.1.Identifier = acc_csc_007_SafeDist
Step.1.7.Char.1.Unit =
Step.1.7.Char.1.Param.0 = RTexpr "Qu::acc_csc_007_SafeDist=FMU.CM_ACCController_V17.Out.Debug.SafeDistance"
Step.1.7.Char.2.Name = acc_csc_007_SafeDistViolated
Step.1.7.Char.2.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment ActualDist<SafeDist while actively following (gate==1); stays 1 for the rest of the run even if distance recovers.
Step.1.7.Char.2.Identifier = acc_csc_007_SafeDistViolated
Step.1.7.Char.2.Unit =
Step.1.7.Char.2.Param.0 = RTexpr {first()?Qu::acc_csc_007_SafeDistViolated=0:acc_csc_007_SafeDistViolated=max(acc_csc_007_SafeDistViolated,(FMU.CM_ACCController_V17.Out.Debug.Fusion.Active==1 && acc_csc_007_ActualDist<acc_csc_007_SafeDist))}
Step.1.7.Char.3.Name = acc_csc_007_TTC
Step.1.7.Char.3.Description:
	Time-to-collision (signal=AccelCtrl.ACC.Time2Collision)
Step.1.7.Char.3.Identifier = acc_csc_007_TTC
Step.1.7.Char.3.Unit =
Step.1.7.Char.3.Param.0 = RTexpr "Qu::acc_csc_007_TTC=AccelCtrl.ACC.Time2Collision"
Step.1.7.Char.4.Name = acc_csc_007_TTCWarnEver
Step.1.7.Char.4.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the warn zone [3.5,11)s.
Step.1.7.Char.4.Identifier = acc_csc_007_TTCWarnEver
Step.1.7.Char.4.Unit =
Step.1.7.Char.4.Param.0 = RTexpr {first()?Qu::acc_csc_007_TTCWarnEver=0:acc_csc_007_TTCWarnEver=max(acc_csc_007_TTCWarnEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_007_TTC>=3.5 && acc_csc_007_TTC<11))}
Step.1.7.Char.5.Name = acc_csc_007_TTCBadEver
Step.1.7.Char.5.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the bad zone (0,3.5)s.
Step.1.7.Char.5.Identifier = acc_csc_007_TTCBadEver
Step.1.7.Char.5.Unit =
Step.1.7.Char.5.Param.0 = RTexpr {first()?Qu::acc_csc_007_TTCBadEver=0:acc_csc_007_TTCBadEver=max(acc_csc_007_TTCBadEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_007_TTC>0 && acc_csc_007_TTC<3.5))}
Step.1.7.Char.6.Name = acc_csc_007_ComfortAx
Step.1.7.Char.6.Description:
	Comfort Deceleration Limit (signal=AccelCtrl.DesiredAx)
Step.1.7.Char.6.Identifier = acc_csc_007_ComfortAx
Step.1.7.Char.6.Unit =
Step.1.7.Char.6.Param.0 = RTexpr "Qu::acc_csc_007_ComfortAx=AccelCtrl.DesiredAx"
Step.1.7.Char.7.Name = acc_csc_007_ComfortAxOutOfBoundEver
Step.1.7.Char.7.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Comfort Deceleration Limit ever goes out of bound (min=-3, max=2.8).
Step.1.7.Char.7.Identifier = acc_csc_007_ComfortAxOutOfBoundEver
Step.1.7.Char.7.Unit =
Step.1.7.Char.7.Param.0 = RTexpr {first()?Qu::acc_csc_007_ComfortAxOutOfBoundEver=0:acc_csc_007_ComfortAxOutOfBoundEver=max(acc_csc_007_ComfortAxOutOfBoundEver,(acc_csc_007_ComfortAx<-3 || acc_csc_007_ComfortAx>2.8))}
Step.1.7.Char.8.Name = acc_csc_007_EmergencyAx
Step.1.7.Char.8.Description:
	Emergency Deceleration Bound (signal=AccelCtrl.DesiredAx)
Step.1.7.Char.8.Identifier = acc_csc_007_EmergencyAx
Step.1.7.Char.8.Unit =
Step.1.7.Char.8.Param.0 = RTexpr "Qu::acc_csc_007_EmergencyAx=AccelCtrl.DesiredAx"
Step.1.7.Char.9.Name = acc_csc_007_EmergencyAxOutOfBoundEver
Step.1.7.Char.9.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Emergency Deceleration Bound ever goes out of bound (min=-6).
Step.1.7.Char.9.Identifier = acc_csc_007_EmergencyAxOutOfBoundEver
Step.1.7.Char.9.Unit =
Step.1.7.Char.9.Param.0 = RTexpr {first()?Qu::acc_csc_007_EmergencyAxOutOfBoundEver=0:acc_csc_007_EmergencyAxOutOfBoundEver=max(acc_csc_007_EmergencyAxOutOfBoundEver,(acc_csc_007_EmergencyAx<-6))}
Step.1.7.Char.10.Name = acc_csc_007_Jerk
Step.1.7.Char.10.Description:
	Jerk = |d(DesiredAx)/dt|, base signal=AccelCtrl.DesiredAx
Step.1.7.Char.10.Identifier = acc_csc_007_Jerk
Step.1.7.Char.10.Unit =
Step.1.7.Char.10.Param.0 = RTexpr "Qu::acc_csc_007_Jerk=abs(diff(AccelCtrl.DesiredAx,Time))"
Step.1.7.Char.11.Name = acc_csc_007_JerkOverLimitEver
Step.1.7.Char.11.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment |jerk| ever exceeds 4 m/s3.
Step.1.7.Char.11.Identifier = acc_csc_007_JerkOverLimitEver
Step.1.7.Char.11.Unit =
Step.1.7.Char.11.Param.0 = RTexpr {first()?Qu::acc_csc_007_JerkOverLimitEver=0:acc_csc_007_JerkOverLimitEver=max(acc_csc_007_JerkOverLimitEver,(acc_csc_007_Jerk>4))}
Step.1.7.Char.12.Name = acc_csc_007_NoCollDist
Step.1.7.Char.12.Description:
	Distance to nearest lead object (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.7.Char.12.Identifier = acc_csc_007_NoCollDist
Step.1.7.Char.12.Unit =
Step.1.7.Char.12.Param.0 = RTexpr "Qu::acc_csc_007_NoCollDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.7.Char.13.Name = acc_csc_007_NoCollDistViolatedEver
Step.1.7.Char.13.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment distance ever drops below 0m.
Step.1.7.Char.13.Identifier = acc_csc_007_NoCollDistViolatedEver
Step.1.7.Char.13.Unit =
Step.1.7.Char.13.Param.0 = RTexpr {first()?Qu::acc_csc_007_NoCollDistViolatedEver=0:acc_csc_007_NoCollDistViolatedEver=max(acc_csc_007_NoCollDistViolatedEver,(acc_csc_007_NoCollDist<0))}
Step.1.7.Char.14.Name = acc_csc_007_CollisionFlag
Step.1.7.Char.14.Description:
	Collision flag derived from FMU.CM_ACCController_V17.Out.Debug.Target.DistX <= 0 (nearest lead object); instantaneous, used as the latch() trigger for ImpactSpeed below.
Step.1.7.Char.14.Identifier = acc_csc_007_CollisionFlag
Step.1.7.Char.14.Unit =
Step.1.7.Char.14.Param.0 = RTexpr "Qu::acc_csc_007_CollisionFlag=(FMU.CM_ACCController_V17.Out.Debug.Target.DistX<=0)"
Step.1.7.Char.15.Name = acc_csc_007_ImpactSpeed
Step.1.7.Char.15.Description:
	Ego speed latched at moment of first collision (nearest lead object)
Step.1.7.Char.15.Identifier = acc_csc_007_ImpactSpeed
Step.1.7.Char.15.Unit =
Step.1.7.Char.15.Param.0 = RTexpr {Qu::acc_csc_007_ImpactSpeed=latch(Speed("Ego"),Qu::acc_csc_007_CollisionFlag==1)}
Step.1.7.Char.16.Name = acc_csc_007_CollisionEver
Step.1.7.Char.16.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment a collision ever occurs (nearest lead object), even if the vehicles separate again before the run ends.
Step.1.7.Char.16.Identifier = acc_csc_007_CollisionEver
Step.1.7.Char.16.Unit =
Step.1.7.Char.16.Param.0 = RTexpr {first()?Qu::acc_csc_007_CollisionEver=0:acc_csc_007_CollisionEver=max(acc_csc_007_CollisionEver,(acc_csc_007_CollisionFlag==1))}
Step.1.7.Crit.0.Name = acc_csc_007 - Safe Distance Consistency
Step.1.7.Crit.0.Description:
	Good if SafeDist was never violated while actively following throughout the run. Bad if it was violated at any point.
Step.1.7.Crit.0.Good = [get acc_csc_007_SafeDistViolated] == 0
Step.1.7.Crit.0.Warn =
Step.1.7.Crit.0.Bad = [get acc_csc_007_SafeDistViolated] == 1
Step.1.7.Crit.1.Name = acc_csc_007 - Time To Collision
Step.1.7.Crit.1.Description:
	Good if TTC never entered the warn/bad zone while a valid target existed throughout the run. Warn if it ever entered [3.5,11)s. Bad if it ever entered (0,3.5)s.
Step.1.7.Crit.1.Good = [get acc_csc_007_TTCBadEver] == 0 && [get acc_csc_007_TTCWarnEver] == 0
Step.1.7.Crit.1.Warn = [get acc_csc_007_TTCBadEver] == 0 && [get acc_csc_007_TTCWarnEver] == 1
Step.1.7.Crit.1.Bad = [get acc_csc_007_TTCBadEver] == 1
Step.1.7.Crit.2.Name = acc_csc_007 - Comfort Deceleration Limit
Step.1.7.Crit.2.Description:
	Good if Comfort Deceleration Limit never went out of bound (min=-3, max=2.8) throughout the run.
Step.1.7.Crit.2.Good = [get acc_csc_007_ComfortAxOutOfBoundEver] == 0
Step.1.7.Crit.2.Warn =
Step.1.7.Crit.2.Bad = [get acc_csc_007_ComfortAxOutOfBoundEver] == 1
Step.1.7.Crit.3.Name = acc_csc_007 - Emergency Deceleration Bound
Step.1.7.Crit.3.Description:
	Good if Emergency Deceleration Bound never went out of bound (min=-6) throughout the run.
Step.1.7.Crit.3.Good = [get acc_csc_007_EmergencyAxOutOfBoundEver] == 0
Step.1.7.Crit.3.Warn =
Step.1.7.Crit.3.Bad = [get acc_csc_007_EmergencyAxOutOfBoundEver] == 1
Step.1.7.Crit.4.Name = acc_csc_007 - Jerk Limit
Step.1.7.Crit.4.Description:
	Good if |jerk| never exceeded 4 m/s3 throughout the run.
Step.1.7.Crit.4.Good = [get acc_csc_007_JerkOverLimitEver] == 0
Step.1.7.Crit.4.Warn =
Step.1.7.Crit.4.Bad = [get acc_csc_007_JerkOverLimitEver] == 1
Step.1.7.Crit.5.Name = acc_csc_007 - No Collision Distance
Step.1.7.Crit.5.Description:
	Good if distance never dropped below 0m throughout the run.
Step.1.7.Crit.5.Good = [get acc_csc_007_NoCollDistViolatedEver] == 0
Step.1.7.Crit.5.Warn =
Step.1.7.Crit.5.Bad = [get acc_csc_007_NoCollDistViolatedEver] == 1
Step.1.7.Crit.6.Name = acc_csc_007 - Collision Flag
Step.1.7.Crit.6.Description:
	Good if no collision ever occurred (nearest lead object) throughout the run.
Step.1.7.Crit.6.Good = [get acc_csc_007_CollisionEver] == 0
Step.1.7.Crit.6.Warn =
Step.1.7.Crit.6.Bad = [get acc_csc_007_CollisionEver] == 1
Step.1.7.Crit.7.Name = acc_csc_007 - Impact Speed
Step.1.7.Crit.7.Description:
	Good if no collision ever occurred, or impact speed = 0; Warn (0,5) m/s; Bad >= 5 m/s
Step.1.7.Crit.7.Good = [get acc_csc_007_CollisionEver] == 0 || [get acc_csc_007_ImpactSpeed] == 0
Step.1.7.Crit.7.Warn = [get acc_csc_007_CollisionEver] == 1 && [get acc_csc_007_ImpactSpeed] > 0 && [get acc_csc_007_ImpactSpeed] < 5
Step.1.7.Crit.7.Bad = [get acc_csc_007_CollisionEver] == 1 && [get acc_csc_007_ImpactSpeed] >= 5
Step.1.7.Var.0.Name = acc_csc_007_ds001
Step.1.7.Var.0.Param = 20 12 85
Step.1.7.Var.0.Result = bad
Step.1.7.Var.0.ResDate = 1782803498
Step.1.7.Var.0.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_007_141131.erg
Step.1.7.Var.0.Char.0.Ref = acc_csc_007_ActualDist
Step.1.7.Var.0.Char.0.Value = 999.0
Step.1.7.Var.0.Char.1.Ref = acc_csc_007_SafeDist
Step.1.7.Var.0.Char.1.Value = 46.08327718063006
Step.1.7.Var.0.Char.2.Ref = acc_csc_007_SafeDistViolated
Step.1.7.Var.0.Char.2.Value = 1.0
Step.1.7.Var.0.Char.3.Ref = acc_csc_007_TTC
Step.1.7.Var.0.Char.3.Value = 0.0
Step.1.7.Var.0.Char.4.Ref = acc_csc_007_TTCWarnEver
Step.1.7.Var.0.Char.4.Value = 0.0
Step.1.7.Var.0.Char.5.Ref = acc_csc_007_TTCBadEver
Step.1.7.Var.0.Char.5.Value = 0.0
Step.1.7.Var.0.Char.6.Ref = acc_csc_007_ComfortAx
Step.1.7.Var.0.Char.6.Value = -0.004
Step.1.7.Var.0.Char.7.Ref = acc_csc_007_ComfortAxOutOfBoundEver
Step.1.7.Var.0.Char.7.Value = 1.0
Step.1.7.Var.0.Char.8.Ref = acc_csc_007_EmergencyAx
Step.1.7.Var.0.Char.8.Value = -0.004
Step.1.7.Var.0.Char.9.Ref = acc_csc_007_EmergencyAxOutOfBoundEver
Step.1.7.Var.0.Char.9.Value = 0.0
Step.1.7.Var.0.Char.10.Ref = acc_csc_007_Jerk
Step.1.7.Var.0.Char.10.Value = 0.0
Step.1.7.Var.0.Char.11.Ref = acc_csc_007_JerkOverLimitEver
Step.1.7.Var.0.Char.11.Value = 1.0
Step.1.7.Var.0.Char.12.Ref = acc_csc_007_NoCollDist
Step.1.7.Var.0.Char.12.Value = 999.0
Step.1.7.Var.0.Char.13.Ref = acc_csc_007_NoCollDistViolatedEver
Step.1.7.Var.0.Char.13.Value = 0.0
Step.1.7.Var.0.Char.14.Ref = acc_csc_007_CollisionFlag
Step.1.7.Var.0.Char.14.Value = 0.0
Step.1.7.Var.0.Char.15.Ref = acc_csc_007_ImpactSpeed
Step.1.7.Var.0.Char.15.Value = 0.0
Step.1.7.Var.0.Char.16.Ref = acc_csc_007_CollisionEver
Step.1.7.Var.0.Char.16.Value = 0.0
Step.1.7.Var.0.Crit.0.Ref = acc_csc_007 - Safe Distance Consistency
Step.1.7.Var.0.Crit.0.Result = bad
Step.1.7.Var.0.Crit.1.Ref = acc_csc_007 - Time To Collision
Step.1.7.Var.0.Crit.1.Result = good
Step.1.7.Var.0.Crit.2.Ref = acc_csc_007 - Comfort Deceleration Limit
Step.1.7.Var.0.Crit.2.Result = bad
Step.1.7.Var.0.Crit.3.Ref = acc_csc_007 - Emergency Deceleration Bound
Step.1.7.Var.0.Crit.3.Result = good
Step.1.7.Var.0.Crit.4.Ref = acc_csc_007 - Jerk Limit
Step.1.7.Var.0.Crit.4.Result = bad
Step.1.7.Var.0.Crit.5.Ref = acc_csc_007 - No Collision Distance
Step.1.7.Var.0.Crit.5.Result = good
Step.1.7.Var.0.Crit.6.Ref = acc_csc_007 - Collision Flag
Step.1.7.Var.0.Crit.6.Result = good
Step.1.7.Var.0.Crit.7.Ref = acc_csc_007 - Impact Speed
Step.1.7.Var.0.Crit.7.Result = good
Step.1.7.Var.1.Name = acc_csc_007_ds002
Step.1.7.Var.1.Param = 25 15 105
Step.1.7.Var.1.Result = bad
Step.1.7.Var.1.ResDate = 1782803511
Step.1.7.Var.1.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_007_141143.erg
Step.1.7.Var.1.Char.0.Ref = acc_csc_007_ActualDist
Step.1.7.Var.1.Char.0.Value = 999.0
Step.1.7.Var.1.Char.1.Ref = acc_csc_007_SafeDist
Step.1.7.Var.1.Char.1.Value = 57.435128132168536
Step.1.7.Var.1.Char.2.Ref = acc_csc_007_SafeDistViolated
Step.1.7.Var.1.Char.2.Value = 1.0
Step.1.7.Var.1.Char.3.Ref = acc_csc_007_TTC
Step.1.7.Var.1.Char.3.Value = 0.0
Step.1.7.Var.1.Char.4.Ref = acc_csc_007_TTCWarnEver
Step.1.7.Var.1.Char.4.Value = 0.0
Step.1.7.Var.1.Char.5.Ref = acc_csc_007_TTCBadEver
Step.1.7.Var.1.Char.5.Value = 0.0
Step.1.7.Var.1.Char.6.Ref = acc_csc_007_ComfortAx
Step.1.7.Var.1.Char.6.Value = 0.022564127941376456
Step.1.7.Var.1.Char.7.Ref = acc_csc_007_ComfortAxOutOfBoundEver
Step.1.7.Var.1.Char.7.Value = 1.0
Step.1.7.Var.1.Char.8.Ref = acc_csc_007_EmergencyAx
Step.1.7.Var.1.Char.8.Value = 0.022564127941376456
Step.1.7.Var.1.Char.9.Ref = acc_csc_007_EmergencyAxOutOfBoundEver
Step.1.7.Var.1.Char.9.Value = 0.0
Step.1.7.Var.1.Char.10.Ref = acc_csc_007_Jerk
Step.1.7.Var.1.Char.10.Value = 3.599733417952785e-5
Step.1.7.Var.1.Char.11.Ref = acc_csc_007_JerkOverLimitEver
Step.1.7.Var.1.Char.11.Value = 1.0
Step.1.7.Var.1.Char.12.Ref = acc_csc_007_NoCollDist
Step.1.7.Var.1.Char.12.Value = 999.0
Step.1.7.Var.1.Char.13.Ref = acc_csc_007_NoCollDistViolatedEver
Step.1.7.Var.1.Char.13.Value = 0.0
Step.1.7.Var.1.Char.14.Ref = acc_csc_007_CollisionFlag
Step.1.7.Var.1.Char.14.Value = 0.0
Step.1.7.Var.1.Char.15.Ref = acc_csc_007_ImpactSpeed
Step.1.7.Var.1.Char.15.Value = 0.0
Step.1.7.Var.1.Char.16.Ref = acc_csc_007_CollisionEver
Step.1.7.Var.1.Char.16.Value = 0.0
Step.1.7.Var.1.Crit.0.Ref = acc_csc_007 - Safe Distance Consistency
Step.1.7.Var.1.Crit.0.Result = bad
Step.1.7.Var.1.Crit.1.Ref = acc_csc_007 - Time To Collision
Step.1.7.Var.1.Crit.1.Result = good
Step.1.7.Var.1.Crit.2.Ref = acc_csc_007 - Comfort Deceleration Limit
Step.1.7.Var.1.Crit.2.Result = bad
Step.1.7.Var.1.Crit.3.Ref = acc_csc_007 - Emergency Deceleration Bound
Step.1.7.Var.1.Crit.3.Result = good
Step.1.7.Var.1.Crit.4.Ref = acc_csc_007 - Jerk Limit
Step.1.7.Var.1.Crit.4.Result = bad
Step.1.7.Var.1.Crit.5.Ref = acc_csc_007 - No Collision Distance
Step.1.7.Var.1.Crit.5.Result = good
Step.1.7.Var.1.Crit.6.Ref = acc_csc_007 - Collision Flag
Step.1.7.Var.1.Crit.6.Result = good
Step.1.7.Var.1.Crit.7.Ref = acc_csc_007 - Impact Speed
Step.1.7.Var.1.Crit.7.Result = good
Step.1.7.Var.2.Name = acc_csc_007_ds003
Step.1.7.Var.2.Param = 30 20 115
Step.1.7.Var.2.Result = bad
Step.1.7.Var.2.ResDate = 1782803522
Step.1.7.Var.2.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_007_141155.erg
Step.1.7.Var.2.Char.0.Ref = acc_csc_007_ActualDist
Step.1.7.Var.2.Char.0.Value = 999.0
Step.1.7.Var.2.Char.1.Ref = acc_csc_007_SafeDist
Step.1.7.Var.2.Char.1.Value = 68.9998177428135
Step.1.7.Var.2.Char.2.Ref = acc_csc_007_SafeDistViolated
Step.1.7.Var.2.Char.2.Value = 1.0
Step.1.7.Var.2.Char.3.Ref = acc_csc_007_TTC
Step.1.7.Var.2.Char.3.Value = 0.0
Step.1.7.Var.2.Char.4.Ref = acc_csc_007_TTCWarnEver
Step.1.7.Var.2.Char.4.Value = 0.0
Step.1.7.Var.2.Char.5.Ref = acc_csc_007_TTCBadEver
Step.1.7.Var.2.Char.5.Value = 0.0
Step.1.7.Var.2.Char.6.Ref = acc_csc_007_ComfortAx
Step.1.7.Var.2.Char.6.Value = 6.339380399538186e-5
Step.1.7.Var.2.Char.7.Ref = acc_csc_007_ComfortAxOutOfBoundEver
Step.1.7.Var.2.Char.7.Value = 1.0
Step.1.7.Var.2.Char.8.Ref = acc_csc_007_EmergencyAx
Step.1.7.Var.2.Char.8.Value = 6.339380399538186e-5
Step.1.7.Var.2.Char.9.Ref = acc_csc_007_EmergencyAxOutOfBoundEver
Step.1.7.Var.2.Char.9.Value = 0.0
Step.1.7.Var.2.Char.10.Ref = acc_csc_007_Jerk
Step.1.7.Var.2.Char.10.Value = 0.000459506861717437
Step.1.7.Var.2.Char.11.Ref = acc_csc_007_JerkOverLimitEver
Step.1.7.Var.2.Char.11.Value = 1.0
Step.1.7.Var.2.Char.12.Ref = acc_csc_007_NoCollDist
Step.1.7.Var.2.Char.12.Value = 999.0
Step.1.7.Var.2.Char.13.Ref = acc_csc_007_NoCollDistViolatedEver
Step.1.7.Var.2.Char.13.Value = 0.0
Step.1.7.Var.2.Char.14.Ref = acc_csc_007_CollisionFlag
Step.1.7.Var.2.Char.14.Value = 0.0
Step.1.7.Var.2.Char.15.Ref = acc_csc_007_ImpactSpeed
Step.1.7.Var.2.Char.15.Value = 0.0
Step.1.7.Var.2.Char.16.Ref = acc_csc_007_CollisionEver
Step.1.7.Var.2.Char.16.Value = 0.0
Step.1.7.Var.2.Crit.0.Ref = acc_csc_007 - Safe Distance Consistency
Step.1.7.Var.2.Crit.0.Result = bad
Step.1.7.Var.2.Crit.1.Ref = acc_csc_007 - Time To Collision
Step.1.7.Var.2.Crit.1.Result = good
Step.1.7.Var.2.Crit.2.Ref = acc_csc_007 - Comfort Deceleration Limit
Step.1.7.Var.2.Crit.2.Result = bad
Step.1.7.Var.2.Crit.3.Ref = acc_csc_007 - Emergency Deceleration Bound
Step.1.7.Var.2.Crit.3.Result = good
Step.1.7.Var.2.Crit.4.Ref = acc_csc_007 - Jerk Limit
Step.1.7.Var.2.Crit.4.Result = bad
Step.1.7.Var.2.Crit.5.Ref = acc_csc_007 - No Collision Distance
Step.1.7.Var.2.Crit.5.Result = good
Step.1.7.Var.2.Crit.6.Ref = acc_csc_007 - Collision Flag
Step.1.7.Var.2.Crit.6.Result = good
Step.1.7.Var.2.Crit.7.Ref = acc_csc_007 - Impact Speed
Step.1.7.Var.2.Crit.7.Result = good
Step.1.7.Var.3.Name = acc_csc_007_ds004
Step.1.7.Var.3.Param = 22 14 103
Step.1.7.Var.3.Result = bad
Step.1.7.Var.3.ResDate = 1782803534
Step.1.7.Var.3.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_007_141206.erg
Step.1.7.Var.3.Char.0.Ref = acc_csc_007_ActualDist
Step.1.7.Var.3.Char.0.Value = 999.0
Step.1.7.Var.3.Char.1.Ref = acc_csc_007_SafeDist
Step.1.7.Var.3.Char.1.Value = 50.75574344308622
Step.1.7.Var.3.Char.2.Ref = acc_csc_007_SafeDistViolated
Step.1.7.Var.3.Char.2.Value = 1.0
Step.1.7.Var.3.Char.3.Ref = acc_csc_007_TTC
Step.1.7.Var.3.Char.3.Value = 0.0
Step.1.7.Var.3.Char.4.Ref = acc_csc_007_TTCWarnEver
Step.1.7.Var.3.Char.4.Value = 0.0
Step.1.7.Var.3.Char.5.Ref = acc_csc_007_TTCBadEver
Step.1.7.Var.3.Char.5.Value = 0.0
Step.1.7.Var.3.Char.6.Ref = acc_csc_007_ComfortAx
Step.1.7.Var.3.Char.6.Value = -0.004
Step.1.7.Var.3.Char.7.Ref = acc_csc_007_ComfortAxOutOfBoundEver
Step.1.7.Var.3.Char.7.Value = 1.0
Step.1.7.Var.3.Char.8.Ref = acc_csc_007_EmergencyAx
Step.1.7.Var.3.Char.8.Value = -0.004
Step.1.7.Var.3.Char.9.Ref = acc_csc_007_EmergencyAxOutOfBoundEver
Step.1.7.Var.3.Char.9.Value = 0.0
Step.1.7.Var.3.Char.10.Ref = acc_csc_007_Jerk
Step.1.7.Var.3.Char.10.Value = 0.0
Step.1.7.Var.3.Char.11.Ref = acc_csc_007_JerkOverLimitEver
Step.1.7.Var.3.Char.11.Value = 1.0
Step.1.7.Var.3.Char.12.Ref = acc_csc_007_NoCollDist
Step.1.7.Var.3.Char.12.Value = 999.0
Step.1.7.Var.3.Char.13.Ref = acc_csc_007_NoCollDistViolatedEver
Step.1.7.Var.3.Char.13.Value = 0.0
Step.1.7.Var.3.Char.14.Ref = acc_csc_007_CollisionFlag
Step.1.7.Var.3.Char.14.Value = 0.0
Step.1.7.Var.3.Char.15.Ref = acc_csc_007_ImpactSpeed
Step.1.7.Var.3.Char.15.Value = 0.0
Step.1.7.Var.3.Char.16.Ref = acc_csc_007_CollisionEver
Step.1.7.Var.3.Char.16.Value = 0.0
Step.1.7.Var.3.Crit.0.Ref = acc_csc_007 - Safe Distance Consistency
Step.1.7.Var.3.Crit.0.Result = bad
Step.1.7.Var.3.Crit.1.Ref = acc_csc_007 - Time To Collision
Step.1.7.Var.3.Crit.1.Result = good
Step.1.7.Var.3.Crit.2.Ref = acc_csc_007 - Comfort Deceleration Limit
Step.1.7.Var.3.Crit.2.Result = bad
Step.1.7.Var.3.Crit.3.Ref = acc_csc_007 - Emergency Deceleration Bound
Step.1.7.Var.3.Crit.3.Result = good
Step.1.7.Var.3.Crit.4.Ref = acc_csc_007 - Jerk Limit
Step.1.7.Var.3.Crit.4.Result = bad
Step.1.7.Var.3.Crit.5.Ref = acc_csc_007 - No Collision Distance
Step.1.7.Var.3.Crit.5.Result = good
Step.1.7.Var.3.Crit.6.Ref = acc_csc_007 - Collision Flag
Step.1.7.Var.3.Crit.6.Result = good
Step.1.7.Var.3.Crit.7.Ref = acc_csc_007 - Impact Speed
Step.1.7.Var.3.Crit.7.Result = good
Step.1.7.Var.4.Name = acc_csc_007_ds005
Step.1.7.Var.4.Param = 28 18 120
Step.1.7.Var.4.Result = bad
Step.1.7.Var.4.ResDate = 1782803546
Step.1.7.Var.4.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_007_141219.erg
Step.1.7.Var.4.Char.0.Ref = acc_csc_007_ActualDist
Step.1.7.Var.4.Char.0.Value = 999.0
Step.1.7.Var.4.Char.1.Ref = acc_csc_007_SafeDist
Step.1.7.Var.4.Char.1.Value = 64.39998943269904
Step.1.7.Var.4.Char.2.Ref = acc_csc_007_SafeDistViolated
Step.1.7.Var.4.Char.2.Value = 1.0
Step.1.7.Var.4.Char.3.Ref = acc_csc_007_TTC
Step.1.7.Var.4.Char.3.Value = 0.0
Step.1.7.Var.4.Char.4.Ref = acc_csc_007_TTCWarnEver
Step.1.7.Var.4.Char.4.Value = 0.0
Step.1.7.Var.4.Char.5.Ref = acc_csc_007_TTCBadEver
Step.1.7.Var.4.Char.5.Value = 0.0
Step.1.7.Var.4.Char.6.Ref = acc_csc_007_ComfortAx
Step.1.7.Var.4.Char.6.Value = 3.6755829398771315e-6
Step.1.7.Var.4.Char.7.Ref = acc_csc_007_ComfortAxOutOfBoundEver
Step.1.7.Var.4.Char.7.Value = 1.0
Step.1.7.Var.4.Char.8.Ref = acc_csc_007_EmergencyAx
Step.1.7.Var.4.Char.8.Value = 3.6755829398771315e-6
Step.1.7.Var.4.Char.9.Ref = acc_csc_007_EmergencyAxOutOfBoundEver
Step.1.7.Var.4.Char.9.Value = 0.0
Step.1.7.Var.4.Char.10.Ref = acc_csc_007_Jerk
Step.1.7.Var.4.Char.10.Value = 0.0023206537775931307
Step.1.7.Var.4.Char.11.Ref = acc_csc_007_JerkOverLimitEver
Step.1.7.Var.4.Char.11.Value = 1.0
Step.1.7.Var.4.Char.12.Ref = acc_csc_007_NoCollDist
Step.1.7.Var.4.Char.12.Value = 999.0
Step.1.7.Var.4.Char.13.Ref = acc_csc_007_NoCollDistViolatedEver
Step.1.7.Var.4.Char.13.Value = 0.0
Step.1.7.Var.4.Char.14.Ref = acc_csc_007_CollisionFlag
Step.1.7.Var.4.Char.14.Value = 0.0
Step.1.7.Var.4.Char.15.Ref = acc_csc_007_ImpactSpeed
Step.1.7.Var.4.Char.15.Value = 0.0
Step.1.7.Var.4.Char.16.Ref = acc_csc_007_CollisionEver
Step.1.7.Var.4.Char.16.Value = 0.0
Step.1.7.Var.4.Crit.0.Ref = acc_csc_007 - Safe Distance Consistency
Step.1.7.Var.4.Crit.0.Result = bad
Step.1.7.Var.4.Crit.1.Ref = acc_csc_007 - Time To Collision
Step.1.7.Var.4.Crit.1.Result = good
Step.1.7.Var.4.Crit.2.Ref = acc_csc_007 - Comfort Deceleration Limit
Step.1.7.Var.4.Crit.2.Result = bad
Step.1.7.Var.4.Crit.3.Ref = acc_csc_007 - Emergency Deceleration Bound
Step.1.7.Var.4.Crit.3.Result = good
Step.1.7.Var.4.Crit.4.Ref = acc_csc_007 - Jerk Limit
Step.1.7.Var.4.Crit.4.Result = bad
Step.1.7.Var.4.Crit.5.Ref = acc_csc_007 - No Collision Distance
Step.1.7.Var.4.Crit.5.Result = good
Step.1.7.Var.4.Crit.6.Ref = acc_csc_007 - Collision Flag
Step.1.7.Var.4.Crit.6.Result = good
Step.1.7.Var.4.Crit.7.Ref = acc_csc_007 - Impact Speed
Step.1.7.Var.4.Crit.7.Result = good
Step.1.8 = TestRun
Step.1.8.Name = OSC_Imported/longitudinal_feature/ACC/acc_csc_008
Step.1.8.Param.0 = EgoSpeed NValue
Step.1.8.Param.1 = TVSpeed NValue
Step.1.8.Param.2 = TV_initPos NValue
Step.1.8.Char.0.Name = acc_csc_008_ActualDist
Step.1.8.Char.0.Description:
	Actual distance to lead (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.8.Char.0.Identifier = acc_csc_008_ActualDist
Step.1.8.Char.0.Unit =
Step.1.8.Char.0.Param.0 = RTexpr "Qu::acc_csc_008_ActualDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.8.Char.1.Name = acc_csc_008_SafeDist
Step.1.8.Char.1.Description:
	Reference safe distance (signal=FMU.CM_ACCController_V17.Out.Debug.SafeDistance)
Step.1.8.Char.1.Identifier = acc_csc_008_SafeDist
Step.1.8.Char.1.Unit =
Step.1.8.Char.1.Param.0 = RTexpr "Qu::acc_csc_008_SafeDist=FMU.CM_ACCController_V17.Out.Debug.SafeDistance"
Step.1.8.Char.2.Name = acc_csc_008_SafeDistViolated
Step.1.8.Char.2.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment ActualDist<SafeDist while actively following (gate==1); stays 1 for the rest of the run even if distance recovers.
Step.1.8.Char.2.Identifier = acc_csc_008_SafeDistViolated
Step.1.8.Char.2.Unit =
Step.1.8.Char.2.Param.0 = RTexpr {first()?Qu::acc_csc_008_SafeDistViolated=0:acc_csc_008_SafeDistViolated=max(acc_csc_008_SafeDistViolated,(FMU.CM_ACCController_V17.Out.Debug.Fusion.Active==1 && acc_csc_008_ActualDist<acc_csc_008_SafeDist))}
Step.1.8.Char.3.Name = acc_csc_008_TTC
Step.1.8.Char.3.Description:
	Time-to-collision (signal=AccelCtrl.ACC.Time2Collision)
Step.1.8.Char.3.Identifier = acc_csc_008_TTC
Step.1.8.Char.3.Unit =
Step.1.8.Char.3.Param.0 = RTexpr "Qu::acc_csc_008_TTC=AccelCtrl.ACC.Time2Collision"
Step.1.8.Char.4.Name = acc_csc_008_TTCWarnEver
Step.1.8.Char.4.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the warn zone [3.5,11)s.
Step.1.8.Char.4.Identifier = acc_csc_008_TTCWarnEver
Step.1.8.Char.4.Unit =
Step.1.8.Char.4.Param.0 = RTexpr {first()?Qu::acc_csc_008_TTCWarnEver=0:acc_csc_008_TTCWarnEver=max(acc_csc_008_TTCWarnEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_008_TTC>=3.5 && acc_csc_008_TTC<11))}
Step.1.8.Char.5.Name = acc_csc_008_TTCBadEver
Step.1.8.Char.5.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the bad zone (0,3.5)s.
Step.1.8.Char.5.Identifier = acc_csc_008_TTCBadEver
Step.1.8.Char.5.Unit =
Step.1.8.Char.5.Param.0 = RTexpr {first()?Qu::acc_csc_008_TTCBadEver=0:acc_csc_008_TTCBadEver=max(acc_csc_008_TTCBadEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_008_TTC>0 && acc_csc_008_TTC<3.5))}
Step.1.8.Char.6.Name = acc_csc_008_ComfortAx
Step.1.8.Char.6.Description:
	Comfort Deceleration Limit (signal=AccelCtrl.DesiredAx)
Step.1.8.Char.6.Identifier = acc_csc_008_ComfortAx
Step.1.8.Char.6.Unit =
Step.1.8.Char.6.Param.0 = RTexpr "Qu::acc_csc_008_ComfortAx=AccelCtrl.DesiredAx"
Step.1.8.Char.7.Name = acc_csc_008_ComfortAxOutOfBoundEver
Step.1.8.Char.7.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Comfort Deceleration Limit ever goes out of bound (min=-3, max=2.8).
Step.1.8.Char.7.Identifier = acc_csc_008_ComfortAxOutOfBoundEver
Step.1.8.Char.7.Unit =
Step.1.8.Char.7.Param.0 = RTexpr {first()?Qu::acc_csc_008_ComfortAxOutOfBoundEver=0:acc_csc_008_ComfortAxOutOfBoundEver=max(acc_csc_008_ComfortAxOutOfBoundEver,(acc_csc_008_ComfortAx<-3 || acc_csc_008_ComfortAx>2.8))}
Step.1.8.Char.8.Name = acc_csc_008_EmergencyAx
Step.1.8.Char.8.Description:
	Emergency Deceleration Bound (signal=AccelCtrl.DesiredAx)
Step.1.8.Char.8.Identifier = acc_csc_008_EmergencyAx
Step.1.8.Char.8.Unit =
Step.1.8.Char.8.Param.0 = RTexpr "Qu::acc_csc_008_EmergencyAx=AccelCtrl.DesiredAx"
Step.1.8.Char.9.Name = acc_csc_008_EmergencyAxOutOfBoundEver
Step.1.8.Char.9.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Emergency Deceleration Bound ever goes out of bound (min=-6).
Step.1.8.Char.9.Identifier = acc_csc_008_EmergencyAxOutOfBoundEver
Step.1.8.Char.9.Unit =
Step.1.8.Char.9.Param.0 = RTexpr {first()?Qu::acc_csc_008_EmergencyAxOutOfBoundEver=0:acc_csc_008_EmergencyAxOutOfBoundEver=max(acc_csc_008_EmergencyAxOutOfBoundEver,(acc_csc_008_EmergencyAx<-6))}
Step.1.8.Char.10.Name = acc_csc_008_Jerk
Step.1.8.Char.10.Description:
	Jerk = |d(DesiredAx)/dt|, base signal=AccelCtrl.DesiredAx
Step.1.8.Char.10.Identifier = acc_csc_008_Jerk
Step.1.8.Char.10.Unit =
Step.1.8.Char.10.Param.0 = RTexpr "Qu::acc_csc_008_Jerk=abs(diff(AccelCtrl.DesiredAx,Time))"
Step.1.8.Char.11.Name = acc_csc_008_JerkOverLimitEver
Step.1.8.Char.11.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment |jerk| ever exceeds 4 m/s3.
Step.1.8.Char.11.Identifier = acc_csc_008_JerkOverLimitEver
Step.1.8.Char.11.Unit =
Step.1.8.Char.11.Param.0 = RTexpr {first()?Qu::acc_csc_008_JerkOverLimitEver=0:acc_csc_008_JerkOverLimitEver=max(acc_csc_008_JerkOverLimitEver,(acc_csc_008_Jerk>4))}
Step.1.8.Char.12.Name = acc_csc_008_NoCollDist
Step.1.8.Char.12.Description:
	Distance to nearest lead object (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.8.Char.12.Identifier = acc_csc_008_NoCollDist
Step.1.8.Char.12.Unit =
Step.1.8.Char.12.Param.0 = RTexpr "Qu::acc_csc_008_NoCollDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.8.Char.13.Name = acc_csc_008_NoCollDistViolatedEver
Step.1.8.Char.13.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment distance ever drops below 0m.
Step.1.8.Char.13.Identifier = acc_csc_008_NoCollDistViolatedEver
Step.1.8.Char.13.Unit =
Step.1.8.Char.13.Param.0 = RTexpr {first()?Qu::acc_csc_008_NoCollDistViolatedEver=0:acc_csc_008_NoCollDistViolatedEver=max(acc_csc_008_NoCollDistViolatedEver,(acc_csc_008_NoCollDist<0))}
Step.1.8.Char.14.Name = acc_csc_008_CollisionFlag
Step.1.8.Char.14.Description:
	Collision flag derived from FMU.CM_ACCController_V17.Out.Debug.Target.DistX <= 0 (nearest lead object); instantaneous, used as the latch() trigger for ImpactSpeed below.
Step.1.8.Char.14.Identifier = acc_csc_008_CollisionFlag
Step.1.8.Char.14.Unit =
Step.1.8.Char.14.Param.0 = RTexpr "Qu::acc_csc_008_CollisionFlag=(FMU.CM_ACCController_V17.Out.Debug.Target.DistX<=0)"
Step.1.8.Char.15.Name = acc_csc_008_ImpactSpeed
Step.1.8.Char.15.Description:
	Ego speed latched at moment of first collision (nearest lead object)
Step.1.8.Char.15.Identifier = acc_csc_008_ImpactSpeed
Step.1.8.Char.15.Unit =
Step.1.8.Char.15.Param.0 = RTexpr {Qu::acc_csc_008_ImpactSpeed=latch(Speed("Ego"),Qu::acc_csc_008_CollisionFlag==1)}
Step.1.8.Char.16.Name = acc_csc_008_CollisionEver
Step.1.8.Char.16.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment a collision ever occurs (nearest lead object), even if the vehicles separate again before the run ends.
Step.1.8.Char.16.Identifier = acc_csc_008_CollisionEver
Step.1.8.Char.16.Unit =
Step.1.8.Char.16.Param.0 = RTexpr {first()?Qu::acc_csc_008_CollisionEver=0:acc_csc_008_CollisionEver=max(acc_csc_008_CollisionEver,(acc_csc_008_CollisionFlag==1))}
Step.1.8.Crit.0.Name = acc_csc_008 - Safe Distance Consistency
Step.1.8.Crit.0.Description:
	Good if SafeDist was never violated while actively following throughout the run. Bad if it was violated at any point.
Step.1.8.Crit.0.Good = [get acc_csc_008_SafeDistViolated] == 0
Step.1.8.Crit.0.Warn =
Step.1.8.Crit.0.Bad = [get acc_csc_008_SafeDistViolated] == 1
Step.1.8.Crit.1.Name = acc_csc_008 - Time To Collision
Step.1.8.Crit.1.Description:
	Good if TTC never entered the warn/bad zone while a valid target existed throughout the run. Warn if it ever entered [3.5,11)s. Bad if it ever entered (0,3.5)s.
Step.1.8.Crit.1.Good = [get acc_csc_008_TTCBadEver] == 0 && [get acc_csc_008_TTCWarnEver] == 0
Step.1.8.Crit.1.Warn = [get acc_csc_008_TTCBadEver] == 0 && [get acc_csc_008_TTCWarnEver] == 1
Step.1.8.Crit.1.Bad = [get acc_csc_008_TTCBadEver] == 1
Step.1.8.Crit.2.Name = acc_csc_008 - Comfort Deceleration Limit
Step.1.8.Crit.2.Description:
	Good if Comfort Deceleration Limit never went out of bound (min=-3, max=2.8) throughout the run.
Step.1.8.Crit.2.Good = [get acc_csc_008_ComfortAxOutOfBoundEver] == 0
Step.1.8.Crit.2.Warn =
Step.1.8.Crit.2.Bad = [get acc_csc_008_ComfortAxOutOfBoundEver] == 1
Step.1.8.Crit.3.Name = acc_csc_008 - Emergency Deceleration Bound
Step.1.8.Crit.3.Description:
	Good if Emergency Deceleration Bound never went out of bound (min=-6) throughout the run.
Step.1.8.Crit.3.Good = [get acc_csc_008_EmergencyAxOutOfBoundEver] == 0
Step.1.8.Crit.3.Warn =
Step.1.8.Crit.3.Bad = [get acc_csc_008_EmergencyAxOutOfBoundEver] == 1
Step.1.8.Crit.4.Name = acc_csc_008 - Jerk Limit
Step.1.8.Crit.4.Description:
	Good if |jerk| never exceeded 4 m/s3 throughout the run.
Step.1.8.Crit.4.Good = [get acc_csc_008_JerkOverLimitEver] == 0
Step.1.8.Crit.4.Warn =
Step.1.8.Crit.4.Bad = [get acc_csc_008_JerkOverLimitEver] == 1
Step.1.8.Crit.5.Name = acc_csc_008 - No Collision Distance
Step.1.8.Crit.5.Description:
	Good if distance never dropped below 0m throughout the run.
Step.1.8.Crit.5.Good = [get acc_csc_008_NoCollDistViolatedEver] == 0
Step.1.8.Crit.5.Warn =
Step.1.8.Crit.5.Bad = [get acc_csc_008_NoCollDistViolatedEver] == 1
Step.1.8.Crit.6.Name = acc_csc_008 - Collision Flag
Step.1.8.Crit.6.Description:
	Good if no collision ever occurred (nearest lead object) throughout the run.
Step.1.8.Crit.6.Good = [get acc_csc_008_CollisionEver] == 0
Step.1.8.Crit.6.Warn =
Step.1.8.Crit.6.Bad = [get acc_csc_008_CollisionEver] == 1
Step.1.8.Crit.7.Name = acc_csc_008 - Impact Speed
Step.1.8.Crit.7.Description:
	Good if no collision ever occurred, or impact speed = 0; Warn (0,5) m/s; Bad >= 5 m/s
Step.1.8.Crit.7.Good = [get acc_csc_008_CollisionEver] == 0 || [get acc_csc_008_ImpactSpeed] == 0
Step.1.8.Crit.7.Warn = [get acc_csc_008_CollisionEver] == 1 && [get acc_csc_008_ImpactSpeed] > 0 && [get acc_csc_008_ImpactSpeed] < 5
Step.1.8.Crit.7.Bad = [get acc_csc_008_CollisionEver] == 1 && [get acc_csc_008_ImpactSpeed] >= 5
Step.1.8.Var.0.Name = acc_csc_008_ds001
Step.1.8.Var.0.Param = 12 8 55
Step.1.8.Var.0.Result = bad
Step.1.8.Var.0.ResDate = 1782803559
Step.1.8.Var.0.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_008_141231.erg
Step.1.8.Var.0.Char.0.Ref = acc_csc_008_ActualDist
Step.1.8.Var.0.Char.0.Value = 999.0
Step.1.8.Var.0.Char.1.Ref = acc_csc_008_SafeDist
Step.1.8.Var.0.Char.1.Value = 27.602918390130696
Step.1.8.Var.0.Char.2.Ref = acc_csc_008_SafeDistViolated
Step.1.8.Var.0.Char.2.Value = 0.0
Step.1.8.Var.0.Char.3.Ref = acc_csc_008_TTC
Step.1.8.Var.0.Char.3.Value = 0.0
Step.1.8.Var.0.Char.4.Ref = acc_csc_008_TTCWarnEver
Step.1.8.Var.0.Char.4.Value = 0.0
Step.1.8.Var.0.Char.5.Ref = acc_csc_008_TTCBadEver
Step.1.8.Var.0.Char.5.Value = 0.0
Step.1.8.Var.0.Char.6.Ref = acc_csc_008_ComfortAx
Step.1.8.Var.0.Char.6.Value = -0.0010150922193730594
Step.1.8.Var.0.Char.7.Ref = acc_csc_008_ComfortAxOutOfBoundEver
Step.1.8.Var.0.Char.7.Value = 0.0
Step.1.8.Var.0.Char.8.Ref = acc_csc_008_EmergencyAx
Step.1.8.Var.0.Char.8.Value = -0.0010150922193730594
Step.1.8.Var.0.Char.9.Ref = acc_csc_008_EmergencyAxOutOfBoundEver
Step.1.8.Var.0.Char.9.Value = 0.0
Step.1.8.Var.0.Char.10.Ref = acc_csc_008_Jerk
Step.1.8.Var.0.Char.10.Value = 0.00023045814714395892
Step.1.8.Var.0.Char.11.Ref = acc_csc_008_JerkOverLimitEver
Step.1.8.Var.0.Char.11.Value = 1.0
Step.1.8.Var.0.Char.12.Ref = acc_csc_008_NoCollDist
Step.1.8.Var.0.Char.12.Value = 999.0
Step.1.8.Var.0.Char.13.Ref = acc_csc_008_NoCollDistViolatedEver
Step.1.8.Var.0.Char.13.Value = 0.0
Step.1.8.Var.0.Char.14.Ref = acc_csc_008_CollisionFlag
Step.1.8.Var.0.Char.14.Value = 0.0
Step.1.8.Var.0.Char.15.Ref = acc_csc_008_ImpactSpeed
Step.1.8.Var.0.Char.15.Value = 0.0
Step.1.8.Var.0.Char.16.Ref = acc_csc_008_CollisionEver
Step.1.8.Var.0.Char.16.Value = 0.0
Step.1.8.Var.0.Crit.0.Ref = acc_csc_008 - Safe Distance Consistency
Step.1.8.Var.0.Crit.0.Result = good
Step.1.8.Var.0.Crit.1.Ref = acc_csc_008 - Time To Collision
Step.1.8.Var.0.Crit.1.Result = good
Step.1.8.Var.0.Crit.2.Ref = acc_csc_008 - Comfort Deceleration Limit
Step.1.8.Var.0.Crit.2.Result = good
Step.1.8.Var.0.Crit.3.Ref = acc_csc_008 - Emergency Deceleration Bound
Step.1.8.Var.0.Crit.3.Result = good
Step.1.8.Var.0.Crit.4.Ref = acc_csc_008 - Jerk Limit
Step.1.8.Var.0.Crit.4.Result = bad
Step.1.8.Var.0.Crit.5.Ref = acc_csc_008 - No Collision Distance
Step.1.8.Var.0.Crit.5.Result = good
Step.1.8.Var.0.Crit.6.Ref = acc_csc_008 - Collision Flag
Step.1.8.Var.0.Crit.6.Result = good
Step.1.8.Var.0.Crit.7.Ref = acc_csc_008 - Impact Speed
Step.1.8.Var.0.Crit.7.Result = good
Step.1.8.Var.1.Name = acc_csc_008_ds002
Step.1.8.Var.1.Param = 15 10 65
Step.1.8.Var.1.Result = bad
Step.1.8.Var.1.ResDate = 1782803571
Step.1.8.Var.1.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_008_141243.erg
Step.1.8.Var.1.Char.0.Ref = acc_csc_008_ActualDist
Step.1.8.Var.1.Char.0.Value = 999.0
Step.1.8.Var.1.Char.1.Ref = acc_csc_008_SafeDist
Step.1.8.Var.1.Char.1.Value = 34.50207052147314
Step.1.8.Var.1.Char.2.Ref = acc_csc_008_SafeDistViolated
Step.1.8.Var.1.Char.2.Value = 1.0
Step.1.8.Var.1.Char.3.Ref = acc_csc_008_TTC
Step.1.8.Var.1.Char.3.Value = 0.0
Step.1.8.Var.1.Char.4.Ref = acc_csc_008_TTCWarnEver
Step.1.8.Var.1.Char.4.Value = 0.0
Step.1.8.Var.1.Char.5.Ref = acc_csc_008_TTCBadEver
Step.1.8.Var.1.Char.5.Value = 0.0
Step.1.8.Var.1.Char.6.Ref = acc_csc_008_ComfortAx
Step.1.8.Var.1.Char.6.Value = -0.0007201813819619929
Step.1.8.Var.1.Char.7.Ref = acc_csc_008_ComfortAxOutOfBoundEver
Step.1.8.Var.1.Char.7.Value = 0.0
Step.1.8.Var.1.Char.8.Ref = acc_csc_008_EmergencyAx
Step.1.8.Var.1.Char.8.Value = -0.0007201813819619929
Step.1.8.Var.1.Char.9.Ref = acc_csc_008_EmergencyAxOutOfBoundEver
Step.1.8.Var.1.Char.9.Value = 0.0
Step.1.8.Var.1.Char.10.Ref = acc_csc_008_Jerk
Step.1.8.Var.1.Char.10.Value = 6.632618010603815e-7
Step.1.8.Var.1.Char.11.Ref = acc_csc_008_JerkOverLimitEver
Step.1.8.Var.1.Char.11.Value = 1.0
Step.1.8.Var.1.Char.12.Ref = acc_csc_008_NoCollDist
Step.1.8.Var.1.Char.12.Value = 999.0
Step.1.8.Var.1.Char.13.Ref = acc_csc_008_NoCollDistViolatedEver
Step.1.8.Var.1.Char.13.Value = 0.0
Step.1.8.Var.1.Char.14.Ref = acc_csc_008_CollisionFlag
Step.1.8.Var.1.Char.14.Value = 0.0
Step.1.8.Var.1.Char.15.Ref = acc_csc_008_ImpactSpeed
Step.1.8.Var.1.Char.15.Value = 0.0
Step.1.8.Var.1.Char.16.Ref = acc_csc_008_CollisionEver
Step.1.8.Var.1.Char.16.Value = 0.0
Step.1.8.Var.1.Crit.0.Ref = acc_csc_008 - Safe Distance Consistency
Step.1.8.Var.1.Crit.0.Result = bad
Step.1.8.Var.1.Crit.1.Ref = acc_csc_008 - Time To Collision
Step.1.8.Var.1.Crit.1.Result = good
Step.1.8.Var.1.Crit.2.Ref = acc_csc_008 - Comfort Deceleration Limit
Step.1.8.Var.1.Crit.2.Result = good
Step.1.8.Var.1.Crit.3.Ref = acc_csc_008 - Emergency Deceleration Bound
Step.1.8.Var.1.Crit.3.Result = good
Step.1.8.Var.1.Crit.4.Ref = acc_csc_008 - Jerk Limit
Step.1.8.Var.1.Crit.4.Result = bad
Step.1.8.Var.1.Crit.5.Ref = acc_csc_008 - No Collision Distance
Step.1.8.Var.1.Crit.5.Result = good
Step.1.8.Var.1.Crit.6.Ref = acc_csc_008 - Collision Flag
Step.1.8.Var.1.Crit.6.Result = good
Step.1.8.Var.1.Crit.7.Ref = acc_csc_008 - Impact Speed
Step.1.8.Var.1.Crit.7.Result = good
Step.1.8.Var.2.Name = acc_csc_008_ds003
Step.1.8.Var.2.Param = 20 14 80
Step.1.8.Var.2.Result = bad
Step.1.8.Var.2.ResDate = 1782803583
Step.1.8.Var.2.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_008_141255.erg
Step.1.8.Var.2.Char.0.Ref = acc_csc_008_ActualDist
Step.1.8.Var.2.Char.0.Value = 999.0
Step.1.8.Var.2.Char.1.Ref = acc_csc_008_SafeDist
Step.1.8.Var.2.Char.1.Value = 45.99999923983416
Step.1.8.Var.2.Char.2.Ref = acc_csc_008_SafeDistViolated
Step.1.8.Var.2.Char.2.Value = 1.0
Step.1.8.Var.2.Char.3.Ref = acc_csc_008_TTC
Step.1.8.Var.2.Char.3.Value = 0.0
Step.1.8.Var.2.Char.4.Ref = acc_csc_008_TTCWarnEver
Step.1.8.Var.2.Char.4.Value = 0.0
Step.1.8.Var.2.Char.5.Ref = acc_csc_008_TTCBadEver
Step.1.8.Var.2.Char.5.Value = 0.0
Step.1.8.Var.2.Char.6.Ref = acc_csc_008_ComfortAx
Step.1.8.Var.2.Char.6.Value = 2.6440550868755965e-7
Step.1.8.Var.2.Char.7.Ref = acc_csc_008_ComfortAxOutOfBoundEver
Step.1.8.Var.2.Char.7.Value = 0.0
Step.1.8.Var.2.Char.8.Ref = acc_csc_008_EmergencyAx
Step.1.8.Var.2.Char.8.Value = 2.6440550868755965e-7
Step.1.8.Var.2.Char.9.Ref = acc_csc_008_EmergencyAxOutOfBoundEver
Step.1.8.Var.2.Char.9.Value = 0.0
Step.1.8.Var.2.Char.10.Ref = acc_csc_008_Jerk
Step.1.8.Var.2.Char.10.Value = 8.622214409135386e-6
Step.1.8.Var.2.Char.11.Ref = acc_csc_008_JerkOverLimitEver
Step.1.8.Var.2.Char.11.Value = 1.0
Step.1.8.Var.2.Char.12.Ref = acc_csc_008_NoCollDist
Step.1.8.Var.2.Char.12.Value = 999.0
Step.1.8.Var.2.Char.13.Ref = acc_csc_008_NoCollDistViolatedEver
Step.1.8.Var.2.Char.13.Value = 0.0
Step.1.8.Var.2.Char.14.Ref = acc_csc_008_CollisionFlag
Step.1.8.Var.2.Char.14.Value = 0.0
Step.1.8.Var.2.Char.15.Ref = acc_csc_008_ImpactSpeed
Step.1.8.Var.2.Char.15.Value = 0.0
Step.1.8.Var.2.Char.16.Ref = acc_csc_008_CollisionEver
Step.1.8.Var.2.Char.16.Value = 0.0
Step.1.8.Var.2.Crit.0.Ref = acc_csc_008 - Safe Distance Consistency
Step.1.8.Var.2.Crit.0.Result = bad
Step.1.8.Var.2.Crit.1.Ref = acc_csc_008 - Time To Collision
Step.1.8.Var.2.Crit.1.Result = good
Step.1.8.Var.2.Crit.2.Ref = acc_csc_008 - Comfort Deceleration Limit
Step.1.8.Var.2.Crit.2.Result = good
Step.1.8.Var.2.Crit.3.Ref = acc_csc_008 - Emergency Deceleration Bound
Step.1.8.Var.2.Crit.3.Result = good
Step.1.8.Var.2.Crit.4.Ref = acc_csc_008 - Jerk Limit
Step.1.8.Var.2.Crit.4.Result = bad
Step.1.8.Var.2.Crit.5.Ref = acc_csc_008 - No Collision Distance
Step.1.8.Var.2.Crit.5.Result = good
Step.1.8.Var.2.Crit.6.Ref = acc_csc_008 - Collision Flag
Step.1.8.Var.2.Crit.6.Result = good
Step.1.8.Var.2.Crit.7.Ref = acc_csc_008 - Impact Speed
Step.1.8.Var.2.Crit.7.Result = good
Step.1.8.Var.3.Name = acc_csc_008_ds004
Step.1.8.Var.3.Param = 25 18 92
Step.1.8.Var.3.Result = bad
Step.1.8.Var.3.ResDate = 1782803595
Step.1.8.Var.3.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_008_141307.erg
Step.1.8.Var.3.Char.0.Ref = acc_csc_008_ActualDist
Step.1.8.Var.3.Char.0.Value = 999.0
Step.1.8.Var.3.Char.1.Ref = acc_csc_008_SafeDist
Step.1.8.Var.3.Char.1.Value = 57.43509907468441
Step.1.8.Var.3.Char.2.Ref = acc_csc_008_SafeDistViolated
Step.1.8.Var.3.Char.2.Value = 1.0
Step.1.8.Var.3.Char.3.Ref = acc_csc_008_TTC
Step.1.8.Var.3.Char.3.Value = 0.0
Step.1.8.Var.3.Char.4.Ref = acc_csc_008_TTCWarnEver
Step.1.8.Var.3.Char.4.Value = 0.0
Step.1.8.Var.3.Char.5.Ref = acc_csc_008_TTCBadEver
Step.1.8.Var.3.Char.5.Value = 0.0
Step.1.8.Var.3.Char.6.Ref = acc_csc_008_ComfortAx
Step.1.8.Var.3.Char.6.Value = 0.02257423489237738
Step.1.8.Var.3.Char.7.Ref = acc_csc_008_ComfortAxOutOfBoundEver
Step.1.8.Var.3.Char.7.Value = 0.0
Step.1.8.Var.3.Char.8.Ref = acc_csc_008_EmergencyAx
Step.1.8.Var.3.Char.8.Value = 0.02257423489237738
Step.1.8.Var.3.Char.9.Ref = acc_csc_008_EmergencyAxOutOfBoundEver
Step.1.8.Var.3.Char.9.Value = 0.0
Step.1.8.Var.3.Char.10.Ref = acc_csc_008_Jerk
Step.1.8.Var.3.Char.10.Value = 9.456103668864346e-5
Step.1.8.Var.3.Char.11.Ref = acc_csc_008_JerkOverLimitEver
Step.1.8.Var.3.Char.11.Value = 1.0
Step.1.8.Var.3.Char.12.Ref = acc_csc_008_NoCollDist
Step.1.8.Var.3.Char.12.Value = 999.0
Step.1.8.Var.3.Char.13.Ref = acc_csc_008_NoCollDistViolatedEver
Step.1.8.Var.3.Char.13.Value = 0.0
Step.1.8.Var.3.Char.14.Ref = acc_csc_008_CollisionFlag
Step.1.8.Var.3.Char.14.Value = 0.0
Step.1.8.Var.3.Char.15.Ref = acc_csc_008_ImpactSpeed
Step.1.8.Var.3.Char.15.Value = 0.0
Step.1.8.Var.3.Char.16.Ref = acc_csc_008_CollisionEver
Step.1.8.Var.3.Char.16.Value = 0.0
Step.1.8.Var.3.Crit.0.Ref = acc_csc_008 - Safe Distance Consistency
Step.1.8.Var.3.Crit.0.Result = bad
Step.1.8.Var.3.Crit.1.Ref = acc_csc_008 - Time To Collision
Step.1.8.Var.3.Crit.1.Result = good
Step.1.8.Var.3.Crit.2.Ref = acc_csc_008 - Comfort Deceleration Limit
Step.1.8.Var.3.Crit.2.Result = good
Step.1.8.Var.3.Crit.3.Ref = acc_csc_008 - Emergency Deceleration Bound
Step.1.8.Var.3.Crit.3.Result = good
Step.1.8.Var.3.Crit.4.Ref = acc_csc_008 - Jerk Limit
Step.1.8.Var.3.Crit.4.Result = bad
Step.1.8.Var.3.Crit.5.Ref = acc_csc_008 - No Collision Distance
Step.1.8.Var.3.Crit.5.Result = good
Step.1.8.Var.3.Crit.6.Ref = acc_csc_008 - Collision Flag
Step.1.8.Var.3.Crit.6.Result = good
Step.1.8.Var.3.Crit.7.Ref = acc_csc_008 - Impact Speed
Step.1.8.Var.3.Crit.7.Result = good
Step.1.8.Var.4.Name = acc_csc_008_ds005
Step.1.8.Var.4.Param = 30 22 98
Step.1.8.Var.4.Result = bad
Step.1.8.Var.4.ResDate = 1782803607
Step.1.8.Var.4.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_008_141319.erg
Step.1.8.Var.4.Char.0.Ref = acc_csc_008_ActualDist
Step.1.8.Var.4.Char.0.Value = 999.0
Step.1.8.Var.4.Char.1.Ref = acc_csc_008_SafeDist
Step.1.8.Var.4.Char.1.Value = 69.00031801422702
Step.1.8.Var.4.Char.2.Ref = acc_csc_008_SafeDistViolated
Step.1.8.Var.4.Char.2.Value = 1.0
Step.1.8.Var.4.Char.3.Ref = acc_csc_008_TTC
Step.1.8.Var.4.Char.3.Value = 0.0
Step.1.8.Var.4.Char.4.Ref = acc_csc_008_TTCWarnEver
Step.1.8.Var.4.Char.4.Value = 0.0
Step.1.8.Var.4.Char.5.Ref = acc_csc_008_TTCBadEver
Step.1.8.Var.4.Char.5.Value = 0.0
Step.1.8.Var.4.Char.6.Ref = acc_csc_008_ComfortAx
Step.1.8.Var.4.Char.6.Value = -0.00011061364418196717
Step.1.8.Var.4.Char.7.Ref = acc_csc_008_ComfortAxOutOfBoundEver
Step.1.8.Var.4.Char.7.Value = 1.0
Step.1.8.Var.4.Char.8.Ref = acc_csc_008_EmergencyAx
Step.1.8.Var.4.Char.8.Value = -0.00011061364418196717
Step.1.8.Var.4.Char.9.Ref = acc_csc_008_EmergencyAxOutOfBoundEver
Step.1.8.Var.4.Char.9.Value = 0.0
Step.1.8.Var.4.Char.10.Ref = acc_csc_008_Jerk
Step.1.8.Var.4.Char.10.Value = 0.00039498979731525846
Step.1.8.Var.4.Char.11.Ref = acc_csc_008_JerkOverLimitEver
Step.1.8.Var.4.Char.11.Value = 1.0
Step.1.8.Var.4.Char.12.Ref = acc_csc_008_NoCollDist
Step.1.8.Var.4.Char.12.Value = 999.0
Step.1.8.Var.4.Char.13.Ref = acc_csc_008_NoCollDistViolatedEver
Step.1.8.Var.4.Char.13.Value = 0.0
Step.1.8.Var.4.Char.14.Ref = acc_csc_008_CollisionFlag
Step.1.8.Var.4.Char.14.Value = 0.0
Step.1.8.Var.4.Char.15.Ref = acc_csc_008_ImpactSpeed
Step.1.8.Var.4.Char.15.Value = 0.0
Step.1.8.Var.4.Char.16.Ref = acc_csc_008_CollisionEver
Step.1.8.Var.4.Char.16.Value = 0.0
Step.1.8.Var.4.Crit.0.Ref = acc_csc_008 - Safe Distance Consistency
Step.1.8.Var.4.Crit.0.Result = bad
Step.1.8.Var.4.Crit.1.Ref = acc_csc_008 - Time To Collision
Step.1.8.Var.4.Crit.1.Result = good
Step.1.8.Var.4.Crit.2.Ref = acc_csc_008 - Comfort Deceleration Limit
Step.1.8.Var.4.Crit.2.Result = bad
Step.1.8.Var.4.Crit.3.Ref = acc_csc_008 - Emergency Deceleration Bound
Step.1.8.Var.4.Crit.3.Result = good
Step.1.8.Var.4.Crit.4.Ref = acc_csc_008 - Jerk Limit
Step.1.8.Var.4.Crit.4.Result = bad
Step.1.8.Var.4.Crit.5.Ref = acc_csc_008 - No Collision Distance
Step.1.8.Var.4.Crit.5.Result = good
Step.1.8.Var.4.Crit.6.Ref = acc_csc_008 - Collision Flag
Step.1.8.Var.4.Crit.6.Result = good
Step.1.8.Var.4.Crit.7.Ref = acc_csc_008 - Impact Speed
Step.1.8.Var.4.Crit.7.Result = good
Step.1.9 = TestRun
Step.1.9.Name = OSC_Imported/longitudinal_feature/ACC/acc_csc_009
Step.1.9.Param.0 = EgoSpeed NValue
Step.1.9.Param.1 = TVSpeed NValue
Step.1.9.Param.2 = TV_initPos NValue
Step.1.9.Char.0.Name = acc_csc_009_ActualDist
Step.1.9.Char.0.Description:
	Actual distance to lead (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.9.Char.0.Identifier = acc_csc_009_ActualDist
Step.1.9.Char.0.Unit =
Step.1.9.Char.0.Param.0 = RTexpr "Qu::acc_csc_009_ActualDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.9.Char.1.Name = acc_csc_009_SafeDist
Step.1.9.Char.1.Description:
	Reference safe distance (signal=FMU.CM_ACCController_V17.Out.Debug.SafeDistance)
Step.1.9.Char.1.Identifier = acc_csc_009_SafeDist
Step.1.9.Char.1.Unit =
Step.1.9.Char.1.Param.0 = RTexpr "Qu::acc_csc_009_SafeDist=FMU.CM_ACCController_V17.Out.Debug.SafeDistance"
Step.1.9.Char.2.Name = acc_csc_009_SafeDistViolated
Step.1.9.Char.2.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment ActualDist<SafeDist while actively following (gate==1); stays 1 for the rest of the run even if distance recovers.
Step.1.9.Char.2.Identifier = acc_csc_009_SafeDistViolated
Step.1.9.Char.2.Unit =
Step.1.9.Char.2.Param.0 = RTexpr {first()?Qu::acc_csc_009_SafeDistViolated=0:acc_csc_009_SafeDistViolated=max(acc_csc_009_SafeDistViolated,(FMU.CM_ACCController_V17.Out.Debug.Fusion.Active==1 && acc_csc_009_ActualDist<acc_csc_009_SafeDist))}
Step.1.9.Char.3.Name = acc_csc_009_TTC
Step.1.9.Char.3.Description:
	Time-to-collision (signal=AccelCtrl.ACC.Time2Collision)
Step.1.9.Char.3.Identifier = acc_csc_009_TTC
Step.1.9.Char.3.Unit =
Step.1.9.Char.3.Param.0 = RTexpr "Qu::acc_csc_009_TTC=AccelCtrl.ACC.Time2Collision"
Step.1.9.Char.4.Name = acc_csc_009_TTCWarnEver
Step.1.9.Char.4.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the warn zone [3.5,11)s.
Step.1.9.Char.4.Identifier = acc_csc_009_TTCWarnEver
Step.1.9.Char.4.Unit =
Step.1.9.Char.4.Param.0 = RTexpr {first()?Qu::acc_csc_009_TTCWarnEver=0:acc_csc_009_TTCWarnEver=max(acc_csc_009_TTCWarnEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_009_TTC>=3.5 && acc_csc_009_TTC<11))}
Step.1.9.Char.5.Name = acc_csc_009_TTCBadEver
Step.1.9.Char.5.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the bad zone (0,3.5)s.
Step.1.9.Char.5.Identifier = acc_csc_009_TTCBadEver
Step.1.9.Char.5.Unit =
Step.1.9.Char.5.Param.0 = RTexpr {first()?Qu::acc_csc_009_TTCBadEver=0:acc_csc_009_TTCBadEver=max(acc_csc_009_TTCBadEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_009_TTC>0 && acc_csc_009_TTC<3.5))}
Step.1.9.Char.6.Name = acc_csc_009_ComfortAx
Step.1.9.Char.6.Description:
	Comfort Deceleration Limit (signal=AccelCtrl.DesiredAx)
Step.1.9.Char.6.Identifier = acc_csc_009_ComfortAx
Step.1.9.Char.6.Unit =
Step.1.9.Char.6.Param.0 = RTexpr "Qu::acc_csc_009_ComfortAx=AccelCtrl.DesiredAx"
Step.1.9.Char.7.Name = acc_csc_009_ComfortAxOutOfBoundEver
Step.1.9.Char.7.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Comfort Deceleration Limit ever goes out of bound (min=-3, max=2.8).
Step.1.9.Char.7.Identifier = acc_csc_009_ComfortAxOutOfBoundEver
Step.1.9.Char.7.Unit =
Step.1.9.Char.7.Param.0 = RTexpr {first()?Qu::acc_csc_009_ComfortAxOutOfBoundEver=0:acc_csc_009_ComfortAxOutOfBoundEver=max(acc_csc_009_ComfortAxOutOfBoundEver,(acc_csc_009_ComfortAx<-3 || acc_csc_009_ComfortAx>2.8))}
Step.1.9.Char.8.Name = acc_csc_009_EmergencyAx
Step.1.9.Char.8.Description:
	Emergency Deceleration Bound (signal=AccelCtrl.DesiredAx)
Step.1.9.Char.8.Identifier = acc_csc_009_EmergencyAx
Step.1.9.Char.8.Unit =
Step.1.9.Char.8.Param.0 = RTexpr "Qu::acc_csc_009_EmergencyAx=AccelCtrl.DesiredAx"
Step.1.9.Char.9.Name = acc_csc_009_EmergencyAxOutOfBoundEver
Step.1.9.Char.9.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Emergency Deceleration Bound ever goes out of bound (min=-6).
Step.1.9.Char.9.Identifier = acc_csc_009_EmergencyAxOutOfBoundEver
Step.1.9.Char.9.Unit =
Step.1.9.Char.9.Param.0 = RTexpr {first()?Qu::acc_csc_009_EmergencyAxOutOfBoundEver=0:acc_csc_009_EmergencyAxOutOfBoundEver=max(acc_csc_009_EmergencyAxOutOfBoundEver,(acc_csc_009_EmergencyAx<-6))}
Step.1.9.Char.10.Name = acc_csc_009_Jerk
Step.1.9.Char.10.Description:
	Jerk = |d(DesiredAx)/dt|, base signal=AccelCtrl.DesiredAx
Step.1.9.Char.10.Identifier = acc_csc_009_Jerk
Step.1.9.Char.10.Unit =
Step.1.9.Char.10.Param.0 = RTexpr "Qu::acc_csc_009_Jerk=abs(diff(AccelCtrl.DesiredAx,Time))"
Step.1.9.Char.11.Name = acc_csc_009_JerkOverLimitEver
Step.1.9.Char.11.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment |jerk| ever exceeds 4 m/s3.
Step.1.9.Char.11.Identifier = acc_csc_009_JerkOverLimitEver
Step.1.9.Char.11.Unit =
Step.1.9.Char.11.Param.0 = RTexpr {first()?Qu::acc_csc_009_JerkOverLimitEver=0:acc_csc_009_JerkOverLimitEver=max(acc_csc_009_JerkOverLimitEver,(acc_csc_009_Jerk>4))}
Step.1.9.Char.12.Name = acc_csc_009_NoCollDist
Step.1.9.Char.12.Description:
	Distance to nearest lead object (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.9.Char.12.Identifier = acc_csc_009_NoCollDist
Step.1.9.Char.12.Unit =
Step.1.9.Char.12.Param.0 = RTexpr "Qu::acc_csc_009_NoCollDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.9.Char.13.Name = acc_csc_009_NoCollDistViolatedEver
Step.1.9.Char.13.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment distance ever drops below 0m.
Step.1.9.Char.13.Identifier = acc_csc_009_NoCollDistViolatedEver
Step.1.9.Char.13.Unit =
Step.1.9.Char.13.Param.0 = RTexpr {first()?Qu::acc_csc_009_NoCollDistViolatedEver=0:acc_csc_009_NoCollDistViolatedEver=max(acc_csc_009_NoCollDistViolatedEver,(acc_csc_009_NoCollDist<0))}
Step.1.9.Char.14.Name = acc_csc_009_CollisionFlag
Step.1.9.Char.14.Description:
	Collision flag derived from FMU.CM_ACCController_V17.Out.Debug.Target.DistX <= 0 (nearest lead object); instantaneous, used as the latch() trigger for ImpactSpeed below.
Step.1.9.Char.14.Identifier = acc_csc_009_CollisionFlag
Step.1.9.Char.14.Unit =
Step.1.9.Char.14.Param.0 = RTexpr "Qu::acc_csc_009_CollisionFlag=(FMU.CM_ACCController_V17.Out.Debug.Target.DistX<=0)"
Step.1.9.Char.15.Name = acc_csc_009_ImpactSpeed
Step.1.9.Char.15.Description:
	Ego speed latched at moment of first collision (nearest lead object)
Step.1.9.Char.15.Identifier = acc_csc_009_ImpactSpeed
Step.1.9.Char.15.Unit =
Step.1.9.Char.15.Param.0 = RTexpr {Qu::acc_csc_009_ImpactSpeed=latch(Speed("Ego"),Qu::acc_csc_009_CollisionFlag==1)}
Step.1.9.Char.16.Name = acc_csc_009_CollisionEver
Step.1.9.Char.16.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment a collision ever occurs (nearest lead object), even if the vehicles separate again before the run ends.
Step.1.9.Char.16.Identifier = acc_csc_009_CollisionEver
Step.1.9.Char.16.Unit =
Step.1.9.Char.16.Param.0 = RTexpr {first()?Qu::acc_csc_009_CollisionEver=0:acc_csc_009_CollisionEver=max(acc_csc_009_CollisionEver,(acc_csc_009_CollisionFlag==1))}
Step.1.9.Crit.0.Name = acc_csc_009 - Safe Distance Consistency
Step.1.9.Crit.0.Description:
	Good if SafeDist was never violated while actively following throughout the run. Bad if it was violated at any point.
Step.1.9.Crit.0.Good = [get acc_csc_009_SafeDistViolated] == 0
Step.1.9.Crit.0.Warn =
Step.1.9.Crit.0.Bad = [get acc_csc_009_SafeDistViolated] == 1
Step.1.9.Crit.1.Name = acc_csc_009 - Time To Collision
Step.1.9.Crit.1.Description:
	Good if TTC never entered the warn/bad zone while a valid target existed throughout the run. Warn if it ever entered [3.5,11)s. Bad if it ever entered (0,3.5)s.
Step.1.9.Crit.1.Good = [get acc_csc_009_TTCBadEver] == 0 && [get acc_csc_009_TTCWarnEver] == 0
Step.1.9.Crit.1.Warn = [get acc_csc_009_TTCBadEver] == 0 && [get acc_csc_009_TTCWarnEver] == 1
Step.1.9.Crit.1.Bad = [get acc_csc_009_TTCBadEver] == 1
Step.1.9.Crit.2.Name = acc_csc_009 - Comfort Deceleration Limit
Step.1.9.Crit.2.Description:
	Good if Comfort Deceleration Limit never went out of bound (min=-3, max=2.8) throughout the run.
Step.1.9.Crit.2.Good = [get acc_csc_009_ComfortAxOutOfBoundEver] == 0
Step.1.9.Crit.2.Warn =
Step.1.9.Crit.2.Bad = [get acc_csc_009_ComfortAxOutOfBoundEver] == 1
Step.1.9.Crit.3.Name = acc_csc_009 - Emergency Deceleration Bound
Step.1.9.Crit.3.Description:
	Good if Emergency Deceleration Bound never went out of bound (min=-6) throughout the run.
Step.1.9.Crit.3.Good = [get acc_csc_009_EmergencyAxOutOfBoundEver] == 0
Step.1.9.Crit.3.Warn =
Step.1.9.Crit.3.Bad = [get acc_csc_009_EmergencyAxOutOfBoundEver] == 1
Step.1.9.Crit.4.Name = acc_csc_009 - Jerk Limit
Step.1.9.Crit.4.Description:
	Good if |jerk| never exceeded 4 m/s3 throughout the run.
Step.1.9.Crit.4.Good = [get acc_csc_009_JerkOverLimitEver] == 0
Step.1.9.Crit.4.Warn =
Step.1.9.Crit.4.Bad = [get acc_csc_009_JerkOverLimitEver] == 1
Step.1.9.Crit.5.Name = acc_csc_009 - No Collision Distance
Step.1.9.Crit.5.Description:
	Good if distance never dropped below 0m throughout the run.
Step.1.9.Crit.5.Good = [get acc_csc_009_NoCollDistViolatedEver] == 0
Step.1.9.Crit.5.Warn =
Step.1.9.Crit.5.Bad = [get acc_csc_009_NoCollDistViolatedEver] == 1
Step.1.9.Crit.6.Name = acc_csc_009 - Collision Flag
Step.1.9.Crit.6.Description:
	Good if no collision ever occurred (nearest lead object) throughout the run.
Step.1.9.Crit.6.Good = [get acc_csc_009_CollisionEver] == 0
Step.1.9.Crit.6.Warn =
Step.1.9.Crit.6.Bad = [get acc_csc_009_CollisionEver] == 1
Step.1.9.Crit.7.Name = acc_csc_009 - Impact Speed
Step.1.9.Crit.7.Description:
	Good if no collision ever occurred, or impact speed = 0; Warn (0,5) m/s; Bad >= 5 m/s
Step.1.9.Crit.7.Good = [get acc_csc_009_CollisionEver] == 0 || [get acc_csc_009_ImpactSpeed] == 0
Step.1.9.Crit.7.Warn = [get acc_csc_009_CollisionEver] == 1 && [get acc_csc_009_ImpactSpeed] > 0 && [get acc_csc_009_ImpactSpeed] < 5
Step.1.9.Crit.7.Bad = [get acc_csc_009_CollisionEver] == 1 && [get acc_csc_009_ImpactSpeed] >= 5
Step.1.9.Var.0.Name = acc_csc_009_ds001
Step.1.9.Var.0.Param = 12 8 55
Step.1.9.Var.0.Result = bad
Step.1.9.Var.0.ResDate = 1782803619
Step.1.9.Var.0.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_009_141332.erg
Step.1.9.Var.0.Char.0.Ref = acc_csc_009_ActualDist
Step.1.9.Var.0.Char.0.Value = 999.0
Step.1.9.Var.0.Char.1.Ref = acc_csc_009_SafeDist
Step.1.9.Var.0.Char.1.Value = 27.60291839176542
Step.1.9.Var.0.Char.2.Ref = acc_csc_009_SafeDistViolated
Step.1.9.Var.0.Char.2.Value = 0.0
Step.1.9.Var.0.Char.3.Ref = acc_csc_009_TTC
Step.1.9.Var.0.Char.3.Value = 0.0
Step.1.9.Var.0.Char.4.Ref = acc_csc_009_TTCWarnEver
Step.1.9.Var.0.Char.4.Value = 0.0
Step.1.9.Var.0.Char.5.Ref = acc_csc_009_TTCBadEver
Step.1.9.Var.0.Char.5.Value = 0.0
Step.1.9.Var.0.Char.6.Ref = acc_csc_009_ComfortAx
Step.1.9.Var.0.Char.6.Value = -0.001015092787973515
Step.1.9.Var.0.Char.7.Ref = acc_csc_009_ComfortAxOutOfBoundEver
Step.1.9.Var.0.Char.7.Value = 0.0
Step.1.9.Var.0.Char.8.Ref = acc_csc_009_EmergencyAx
Step.1.9.Var.0.Char.8.Value = -0.001015092787973515
Step.1.9.Var.0.Char.9.Ref = acc_csc_009_EmergencyAxOutOfBoundEver
Step.1.9.Var.0.Char.9.Value = 0.0
Step.1.9.Var.0.Char.10.Ref = acc_csc_009_Jerk
Step.1.9.Var.0.Char.10.Value = 0.00023045807893181292
Step.1.9.Var.0.Char.11.Ref = acc_csc_009_JerkOverLimitEver
Step.1.9.Var.0.Char.11.Value = 1.0
Step.1.9.Var.0.Char.12.Ref = acc_csc_009_NoCollDist
Step.1.9.Var.0.Char.12.Value = 999.0
Step.1.9.Var.0.Char.13.Ref = acc_csc_009_NoCollDistViolatedEver
Step.1.9.Var.0.Char.13.Value = 0.0
Step.1.9.Var.0.Char.14.Ref = acc_csc_009_CollisionFlag
Step.1.9.Var.0.Char.14.Value = 0.0
Step.1.9.Var.0.Char.15.Ref = acc_csc_009_ImpactSpeed
Step.1.9.Var.0.Char.15.Value = 0.0
Step.1.9.Var.0.Char.16.Ref = acc_csc_009_CollisionEver
Step.1.9.Var.0.Char.16.Value = 0.0
Step.1.9.Var.0.Crit.0.Ref = acc_csc_009 - Safe Distance Consistency
Step.1.9.Var.0.Crit.0.Result = good
Step.1.9.Var.0.Crit.1.Ref = acc_csc_009 - Time To Collision
Step.1.9.Var.0.Crit.1.Result = good
Step.1.9.Var.0.Crit.2.Ref = acc_csc_009 - Comfort Deceleration Limit
Step.1.9.Var.0.Crit.2.Result = good
Step.1.9.Var.0.Crit.3.Ref = acc_csc_009 - Emergency Deceleration Bound
Step.1.9.Var.0.Crit.3.Result = good
Step.1.9.Var.0.Crit.4.Ref = acc_csc_009 - Jerk Limit
Step.1.9.Var.0.Crit.4.Result = bad
Step.1.9.Var.0.Crit.5.Ref = acc_csc_009 - No Collision Distance
Step.1.9.Var.0.Crit.5.Result = good
Step.1.9.Var.0.Crit.6.Ref = acc_csc_009 - Collision Flag
Step.1.9.Var.0.Crit.6.Result = good
Step.1.9.Var.0.Crit.7.Ref = acc_csc_009 - Impact Speed
Step.1.9.Var.0.Crit.7.Result = good
Step.1.9.Var.1.Name = acc_csc_009_ds002
Step.1.9.Var.1.Param = 15 10 65
Step.1.9.Var.1.Result = bad
Step.1.9.Var.1.ResDate = 1782803631
Step.1.9.Var.1.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_009_141344.erg
Step.1.9.Var.1.Char.0.Ref = acc_csc_009_ActualDist
Step.1.9.Var.1.Char.0.Value = 999.0
Step.1.9.Var.1.Char.1.Ref = acc_csc_009_SafeDist
Step.1.9.Var.1.Char.1.Value = 34.502070507992954
Step.1.9.Var.1.Char.2.Ref = acc_csc_009_SafeDistViolated
Step.1.9.Var.1.Char.2.Value = 1.0
Step.1.9.Var.1.Char.3.Ref = acc_csc_009_TTC
Step.1.9.Var.1.Char.3.Value = 0.0
Step.1.9.Var.1.Char.4.Ref = acc_csc_009_TTCWarnEver
Step.1.9.Var.1.Char.4.Value = 0.0
Step.1.9.Var.1.Char.5.Ref = acc_csc_009_TTCBadEver
Step.1.9.Var.1.Char.5.Value = 0.0
Step.1.9.Var.1.Char.6.Ref = acc_csc_009_ComfortAx
Step.1.9.Var.1.Char.6.Value = -0.0007201766932013244
Step.1.9.Var.1.Char.7.Ref = acc_csc_009_ComfortAxOutOfBoundEver
Step.1.9.Var.1.Char.7.Value = 0.0
Step.1.9.Var.1.Char.8.Ref = acc_csc_009_EmergencyAx
Step.1.9.Var.1.Char.8.Value = -0.0007201766932013244
Step.1.9.Var.1.Char.9.Ref = acc_csc_009_EmergencyAxOutOfBoundEver
Step.1.9.Var.1.Char.9.Value = 0.0
Step.1.9.Var.1.Char.10.Ref = acc_csc_009_Jerk
Step.1.9.Var.1.Char.10.Value = 6.655156425965337e-7
Step.1.9.Var.1.Char.11.Ref = acc_csc_009_JerkOverLimitEver
Step.1.9.Var.1.Char.11.Value = 1.0
Step.1.9.Var.1.Char.12.Ref = acc_csc_009_NoCollDist
Step.1.9.Var.1.Char.12.Value = 999.0
Step.1.9.Var.1.Char.13.Ref = acc_csc_009_NoCollDistViolatedEver
Step.1.9.Var.1.Char.13.Value = 0.0
Step.1.9.Var.1.Char.14.Ref = acc_csc_009_CollisionFlag
Step.1.9.Var.1.Char.14.Value = 0.0
Step.1.9.Var.1.Char.15.Ref = acc_csc_009_ImpactSpeed
Step.1.9.Var.1.Char.15.Value = 0.0
Step.1.9.Var.1.Char.16.Ref = acc_csc_009_CollisionEver
Step.1.9.Var.1.Char.16.Value = 0.0
Step.1.9.Var.1.Crit.0.Ref = acc_csc_009 - Safe Distance Consistency
Step.1.9.Var.1.Crit.0.Result = bad
Step.1.9.Var.1.Crit.1.Ref = acc_csc_009 - Time To Collision
Step.1.9.Var.1.Crit.1.Result = good
Step.1.9.Var.1.Crit.2.Ref = acc_csc_009 - Comfort Deceleration Limit
Step.1.9.Var.1.Crit.2.Result = good
Step.1.9.Var.1.Crit.3.Ref = acc_csc_009 - Emergency Deceleration Bound
Step.1.9.Var.1.Crit.3.Result = good
Step.1.9.Var.1.Crit.4.Ref = acc_csc_009 - Jerk Limit
Step.1.9.Var.1.Crit.4.Result = bad
Step.1.9.Var.1.Crit.5.Ref = acc_csc_009 - No Collision Distance
Step.1.9.Var.1.Crit.5.Result = good
Step.1.9.Var.1.Crit.6.Ref = acc_csc_009 - Collision Flag
Step.1.9.Var.1.Crit.6.Result = good
Step.1.9.Var.1.Crit.7.Ref = acc_csc_009 - Impact Speed
Step.1.9.Var.1.Crit.7.Result = good
Step.1.9.Var.2.Name = acc_csc_009_ds003
Step.1.9.Var.2.Param = 20 14 80
Step.1.9.Var.2.Result = bad
Step.1.9.Var.2.ResDate = 1782803643
Step.1.9.Var.2.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_009_141356.erg
Step.1.9.Var.2.Char.0.Ref = acc_csc_009_ActualDist
Step.1.9.Var.2.Char.0.Value = 999.0
Step.1.9.Var.2.Char.1.Ref = acc_csc_009_SafeDist
Step.1.9.Var.2.Char.1.Value = 45.999999674100536
Step.1.9.Var.2.Char.2.Ref = acc_csc_009_SafeDistViolated
Step.1.9.Var.2.Char.2.Value = 1.0
Step.1.9.Var.2.Char.3.Ref = acc_csc_009_TTC
Step.1.9.Var.2.Char.3.Value = 0.0
Step.1.9.Var.2.Char.4.Ref = acc_csc_009_TTCWarnEver
Step.1.9.Var.2.Char.4.Value = 0.0
Step.1.9.Var.2.Char.5.Ref = acc_csc_009_TTCBadEver
Step.1.9.Var.2.Char.5.Value = 0.0
Step.1.9.Var.2.Char.6.Ref = acc_csc_009_ComfortAx
Step.1.9.Var.2.Char.6.Value = 1.1335633303133364e-7
Step.1.9.Var.2.Char.7.Ref = acc_csc_009_ComfortAxOutOfBoundEver
Step.1.9.Var.2.Char.7.Value = 0.0
Step.1.9.Var.2.Char.8.Ref = acc_csc_009_EmergencyAx
Step.1.9.Var.2.Char.8.Value = 1.1335633303133364e-7
Step.1.9.Var.2.Char.9.Ref = acc_csc_009_EmergencyAxOutOfBoundEver
Step.1.9.Var.2.Char.9.Value = 0.0
Step.1.9.Var.2.Char.10.Ref = acc_csc_009_Jerk
Step.1.9.Var.2.Char.10.Value = 8.18187970710003e-6
Step.1.9.Var.2.Char.11.Ref = acc_csc_009_JerkOverLimitEver
Step.1.9.Var.2.Char.11.Value = 1.0
Step.1.9.Var.2.Char.12.Ref = acc_csc_009_NoCollDist
Step.1.9.Var.2.Char.12.Value = 999.0
Step.1.9.Var.2.Char.13.Ref = acc_csc_009_NoCollDistViolatedEver
Step.1.9.Var.2.Char.13.Value = 0.0
Step.1.9.Var.2.Char.14.Ref = acc_csc_009_CollisionFlag
Step.1.9.Var.2.Char.14.Value = 0.0
Step.1.9.Var.2.Char.15.Ref = acc_csc_009_ImpactSpeed
Step.1.9.Var.2.Char.15.Value = 0.0
Step.1.9.Var.2.Char.16.Ref = acc_csc_009_CollisionEver
Step.1.9.Var.2.Char.16.Value = 0.0
Step.1.9.Var.2.Crit.0.Ref = acc_csc_009 - Safe Distance Consistency
Step.1.9.Var.2.Crit.0.Result = bad
Step.1.9.Var.2.Crit.1.Ref = acc_csc_009 - Time To Collision
Step.1.9.Var.2.Crit.1.Result = good
Step.1.9.Var.2.Crit.2.Ref = acc_csc_009 - Comfort Deceleration Limit
Step.1.9.Var.2.Crit.2.Result = good
Step.1.9.Var.2.Crit.3.Ref = acc_csc_009 - Emergency Deceleration Bound
Step.1.9.Var.2.Crit.3.Result = good
Step.1.9.Var.2.Crit.4.Ref = acc_csc_009 - Jerk Limit
Step.1.9.Var.2.Crit.4.Result = bad
Step.1.9.Var.2.Crit.5.Ref = acc_csc_009 - No Collision Distance
Step.1.9.Var.2.Crit.5.Result = good
Step.1.9.Var.2.Crit.6.Ref = acc_csc_009 - Collision Flag
Step.1.9.Var.2.Crit.6.Result = good
Step.1.9.Var.2.Crit.7.Ref = acc_csc_009 - Impact Speed
Step.1.9.Var.2.Crit.7.Result = good
Step.1.9.Var.3.Name = acc_csc_009_ds004
Step.1.9.Var.3.Param = 25 18 92
Step.1.9.Var.3.Result = bad
Step.1.9.Var.3.ResDate = 1782803656
Step.1.9.Var.3.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_009_141408.erg
Step.1.9.Var.3.Char.0.Ref = acc_csc_009_ActualDist
Step.1.9.Var.3.Char.0.Value = 999.0
Step.1.9.Var.3.Char.1.Ref = acc_csc_009_SafeDist
Step.1.9.Var.3.Char.1.Value = 57.43509567188126
Step.1.9.Var.3.Char.2.Ref = acc_csc_009_SafeDistViolated
Step.1.9.Var.3.Char.2.Value = 1.0
Step.1.9.Var.3.Char.3.Ref = acc_csc_009_TTC
Step.1.9.Var.3.Char.3.Value = 0.0
Step.1.9.Var.3.Char.4.Ref = acc_csc_009_TTCWarnEver
Step.1.9.Var.3.Char.4.Value = 0.0
Step.1.9.Var.3.Char.5.Ref = acc_csc_009_TTCBadEver
Step.1.9.Var.3.Char.5.Value = 0.0
Step.1.9.Var.3.Char.6.Ref = acc_csc_009_ComfortAx
Step.1.9.Var.3.Char.6.Value = 0.02257541847608309
Step.1.9.Var.3.Char.7.Ref = acc_csc_009_ComfortAxOutOfBoundEver
Step.1.9.Var.3.Char.7.Value = 0.0
Step.1.9.Var.3.Char.8.Ref = acc_csc_009_EmergencyAx
Step.1.9.Var.3.Char.8.Value = 0.02257541847608309
Step.1.9.Var.3.Char.9.Ref = acc_csc_009_EmergencyAxOutOfBoundEver
Step.1.9.Var.3.Char.9.Value = 0.0
Step.1.9.Var.3.Char.10.Ref = acc_csc_009_Jerk
Step.1.9.Var.3.Char.10.Value = 9.893618084534116e-5
Step.1.9.Var.3.Char.11.Ref = acc_csc_009_JerkOverLimitEver
Step.1.9.Var.3.Char.11.Value = 1.0
Step.1.9.Var.3.Char.12.Ref = acc_csc_009_NoCollDist
Step.1.9.Var.3.Char.12.Value = 999.0
Step.1.9.Var.3.Char.13.Ref = acc_csc_009_NoCollDistViolatedEver
Step.1.9.Var.3.Char.13.Value = 0.0
Step.1.9.Var.3.Char.14.Ref = acc_csc_009_CollisionFlag
Step.1.9.Var.3.Char.14.Value = 0.0
Step.1.9.Var.3.Char.15.Ref = acc_csc_009_ImpactSpeed
Step.1.9.Var.3.Char.15.Value = 0.0
Step.1.9.Var.3.Char.16.Ref = acc_csc_009_CollisionEver
Step.1.9.Var.3.Char.16.Value = 0.0
Step.1.9.Var.3.Crit.0.Ref = acc_csc_009 - Safe Distance Consistency
Step.1.9.Var.3.Crit.0.Result = bad
Step.1.9.Var.3.Crit.1.Ref = acc_csc_009 - Time To Collision
Step.1.9.Var.3.Crit.1.Result = good
Step.1.9.Var.3.Crit.2.Ref = acc_csc_009 - Comfort Deceleration Limit
Step.1.9.Var.3.Crit.2.Result = good
Step.1.9.Var.3.Crit.3.Ref = acc_csc_009 - Emergency Deceleration Bound
Step.1.9.Var.3.Crit.3.Result = good
Step.1.9.Var.3.Crit.4.Ref = acc_csc_009 - Jerk Limit
Step.1.9.Var.3.Crit.4.Result = bad
Step.1.9.Var.3.Crit.5.Ref = acc_csc_009 - No Collision Distance
Step.1.9.Var.3.Crit.5.Result = good
Step.1.9.Var.3.Crit.6.Ref = acc_csc_009 - Collision Flag
Step.1.9.Var.3.Crit.6.Result = good
Step.1.9.Var.3.Crit.7.Ref = acc_csc_009 - Impact Speed
Step.1.9.Var.3.Crit.7.Result = good
Step.1.9.Var.4.Name = acc_csc_009_ds005
Step.1.9.Var.4.Param = 30 22 98
Step.1.9.Var.4.Result = bad
Step.1.9.Var.4.ResDate = 1782803667
Step.1.9.Var.4.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_009_141420.erg
Step.1.9.Var.4.Char.0.Ref = acc_csc_009_ActualDist
Step.1.9.Var.4.Char.0.Value = 999.0
Step.1.9.Var.4.Char.1.Ref = acc_csc_009_SafeDist
Step.1.9.Var.4.Char.1.Value = 69.00032514398293
Step.1.9.Var.4.Char.2.Ref = acc_csc_009_SafeDistViolated
Step.1.9.Var.4.Char.2.Value = 1.0
Step.1.9.Var.4.Char.3.Ref = acc_csc_009_TTC
Step.1.9.Var.4.Char.3.Value = 0.0
Step.1.9.Var.4.Char.4.Ref = acc_csc_009_TTCWarnEver
Step.1.9.Var.4.Char.4.Value = 0.0
Step.1.9.Var.4.Char.5.Ref = acc_csc_009_TTCBadEver
Step.1.9.Var.4.Char.5.Value = 0.0
Step.1.9.Var.4.Char.6.Ref = acc_csc_009_ComfortAx
Step.1.9.Var.4.Char.6.Value = -0.00011309355928119659
Step.1.9.Var.4.Char.7.Ref = acc_csc_009_ComfortAxOutOfBoundEver
Step.1.9.Var.4.Char.7.Value = 1.0
Step.1.9.Var.4.Char.8.Ref = acc_csc_009_EmergencyAx
Step.1.9.Var.4.Char.8.Value = -0.00011309355928119659
Step.1.9.Var.4.Char.9.Ref = acc_csc_009_EmergencyAxOutOfBoundEver
Step.1.9.Var.4.Char.9.Value = 0.0
Step.1.9.Var.4.Char.10.Ref = acc_csc_009_Jerk
Step.1.9.Var.4.Char.10.Value = 0.0003950342886591901
Step.1.9.Var.4.Char.11.Ref = acc_csc_009_JerkOverLimitEver
Step.1.9.Var.4.Char.11.Value = 1.0
Step.1.9.Var.4.Char.12.Ref = acc_csc_009_NoCollDist
Step.1.9.Var.4.Char.12.Value = 999.0
Step.1.9.Var.4.Char.13.Ref = acc_csc_009_NoCollDistViolatedEver
Step.1.9.Var.4.Char.13.Value = 0.0
Step.1.9.Var.4.Char.14.Ref = acc_csc_009_CollisionFlag
Step.1.9.Var.4.Char.14.Value = 0.0
Step.1.9.Var.4.Char.15.Ref = acc_csc_009_ImpactSpeed
Step.1.9.Var.4.Char.15.Value = 0.0
Step.1.9.Var.4.Char.16.Ref = acc_csc_009_CollisionEver
Step.1.9.Var.4.Char.16.Value = 0.0
Step.1.9.Var.4.Crit.0.Ref = acc_csc_009 - Safe Distance Consistency
Step.1.9.Var.4.Crit.0.Result = bad
Step.1.9.Var.4.Crit.1.Ref = acc_csc_009 - Time To Collision
Step.1.9.Var.4.Crit.1.Result = good
Step.1.9.Var.4.Crit.2.Ref = acc_csc_009 - Comfort Deceleration Limit
Step.1.9.Var.4.Crit.2.Result = bad
Step.1.9.Var.4.Crit.3.Ref = acc_csc_009 - Emergency Deceleration Bound
Step.1.9.Var.4.Crit.3.Result = good
Step.1.9.Var.4.Crit.4.Ref = acc_csc_009 - Jerk Limit
Step.1.9.Var.4.Crit.4.Result = bad
Step.1.9.Var.4.Crit.5.Ref = acc_csc_009 - No Collision Distance
Step.1.9.Var.4.Crit.5.Result = good
Step.1.9.Var.4.Crit.6.Ref = acc_csc_009 - Collision Flag
Step.1.9.Var.4.Crit.6.Result = good
Step.1.9.Var.4.Crit.7.Ref = acc_csc_009 - Impact Speed
Step.1.9.Var.4.Crit.7.Result = good
Step.1.10 = TestRun
Step.1.10.Name = OSC_Imported/longitudinal_feature/ACC/acc_csc_010
Step.1.10.Param.0 = EgoSpeed NValue
Step.1.10.Param.1 = TV1Speed NValue
Step.1.10.Param.2 = TV1_initPos NValue
Step.1.10.Param.3 = TV2Speed NValue
Step.1.10.Param.4 = TV2_initPos NValue
Step.1.10.Char.0.Name = acc_csc_010_ActualDist
Step.1.10.Char.0.Description:
	Actual distance to lead (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.10.Char.0.Identifier = acc_csc_010_ActualDist
Step.1.10.Char.0.Unit =
Step.1.10.Char.0.Param.0 = RTexpr "Qu::acc_csc_010_ActualDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.10.Char.1.Name = acc_csc_010_SafeDist
Step.1.10.Char.1.Description:
	Reference safe distance (signal=FMU.CM_ACCController_V17.Out.Debug.SafeDistance)
Step.1.10.Char.1.Identifier = acc_csc_010_SafeDist
Step.1.10.Char.1.Unit =
Step.1.10.Char.1.Param.0 = RTexpr "Qu::acc_csc_010_SafeDist=FMU.CM_ACCController_V17.Out.Debug.SafeDistance"
Step.1.10.Char.2.Name = acc_csc_010_SafeDistViolated
Step.1.10.Char.2.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment ActualDist<SafeDist while actively following (gate==1); stays 1 for the rest of the run even if distance recovers.
Step.1.10.Char.2.Identifier = acc_csc_010_SafeDistViolated
Step.1.10.Char.2.Unit =
Step.1.10.Char.2.Param.0 = RTexpr {first()?Qu::acc_csc_010_SafeDistViolated=0:acc_csc_010_SafeDistViolated=max(acc_csc_010_SafeDistViolated,(FMU.CM_ACCController_V17.Out.Debug.Fusion.Active==1 && acc_csc_010_ActualDist<acc_csc_010_SafeDist))}
Step.1.10.Char.3.Name = acc_csc_010_TTC
Step.1.10.Char.3.Description:
	Time-to-collision (signal=AccelCtrl.ACC.Time2Collision)
Step.1.10.Char.3.Identifier = acc_csc_010_TTC
Step.1.10.Char.3.Unit =
Step.1.10.Char.3.Param.0 = RTexpr "Qu::acc_csc_010_TTC=AccelCtrl.ACC.Time2Collision"
Step.1.10.Char.4.Name = acc_csc_010_TTCWarnEver
Step.1.10.Char.4.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the warn zone [3.5,11)s.
Step.1.10.Char.4.Identifier = acc_csc_010_TTCWarnEver
Step.1.10.Char.4.Unit =
Step.1.10.Char.4.Param.0 = RTexpr {first()?Qu::acc_csc_010_TTCWarnEver=0:acc_csc_010_TTCWarnEver=max(acc_csc_010_TTCWarnEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_010_TTC>=3.5 && acc_csc_010_TTC<11))}
Step.1.10.Char.5.Name = acc_csc_010_TTCBadEver
Step.1.10.Char.5.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the bad zone (0,3.5)s.
Step.1.10.Char.5.Identifier = acc_csc_010_TTCBadEver
Step.1.10.Char.5.Unit =
Step.1.10.Char.5.Param.0 = RTexpr {first()?Qu::acc_csc_010_TTCBadEver=0:acc_csc_010_TTCBadEver=max(acc_csc_010_TTCBadEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_010_TTC>0 && acc_csc_010_TTC<3.5))}
Step.1.10.Char.6.Name = acc_csc_010_ComfortAx
Step.1.10.Char.6.Description:
	Comfort Deceleration Limit (signal=AccelCtrl.DesiredAx)
Step.1.10.Char.6.Identifier = acc_csc_010_ComfortAx
Step.1.10.Char.6.Unit =
Step.1.10.Char.6.Param.0 = RTexpr "Qu::acc_csc_010_ComfortAx=AccelCtrl.DesiredAx"
Step.1.10.Char.7.Name = acc_csc_010_ComfortAxOutOfBoundEver
Step.1.10.Char.7.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Comfort Deceleration Limit ever goes out of bound (min=-3, max=2.8).
Step.1.10.Char.7.Identifier = acc_csc_010_ComfortAxOutOfBoundEver
Step.1.10.Char.7.Unit =
Step.1.10.Char.7.Param.0 = RTexpr {first()?Qu::acc_csc_010_ComfortAxOutOfBoundEver=0:acc_csc_010_ComfortAxOutOfBoundEver=max(acc_csc_010_ComfortAxOutOfBoundEver,(acc_csc_010_ComfortAx<-3 || acc_csc_010_ComfortAx>2.8))}
Step.1.10.Char.8.Name = acc_csc_010_EmergencyAx
Step.1.10.Char.8.Description:
	Emergency Deceleration Bound (signal=AccelCtrl.DesiredAx)
Step.1.10.Char.8.Identifier = acc_csc_010_EmergencyAx
Step.1.10.Char.8.Unit =
Step.1.10.Char.8.Param.0 = RTexpr "Qu::acc_csc_010_EmergencyAx=AccelCtrl.DesiredAx"
Step.1.10.Char.9.Name = acc_csc_010_EmergencyAxOutOfBoundEver
Step.1.10.Char.9.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Emergency Deceleration Bound ever goes out of bound (min=-6).
Step.1.10.Char.9.Identifier = acc_csc_010_EmergencyAxOutOfBoundEver
Step.1.10.Char.9.Unit =
Step.1.10.Char.9.Param.0 = RTexpr {first()?Qu::acc_csc_010_EmergencyAxOutOfBoundEver=0:acc_csc_010_EmergencyAxOutOfBoundEver=max(acc_csc_010_EmergencyAxOutOfBoundEver,(acc_csc_010_EmergencyAx<-6))}
Step.1.10.Char.10.Name = acc_csc_010_Jerk
Step.1.10.Char.10.Description:
	Jerk = |d(DesiredAx)/dt|, base signal=AccelCtrl.DesiredAx
Step.1.10.Char.10.Identifier = acc_csc_010_Jerk
Step.1.10.Char.10.Unit =
Step.1.10.Char.10.Param.0 = RTexpr "Qu::acc_csc_010_Jerk=abs(diff(AccelCtrl.DesiredAx,Time))"
Step.1.10.Char.11.Name = acc_csc_010_JerkOverLimitEver
Step.1.10.Char.11.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment |jerk| ever exceeds 4 m/s3.
Step.1.10.Char.11.Identifier = acc_csc_010_JerkOverLimitEver
Step.1.10.Char.11.Unit =
Step.1.10.Char.11.Param.0 = RTexpr {first()?Qu::acc_csc_010_JerkOverLimitEver=0:acc_csc_010_JerkOverLimitEver=max(acc_csc_010_JerkOverLimitEver,(acc_csc_010_Jerk>4))}
Step.1.10.Char.12.Name = acc_csc_010_NoCollDist
Step.1.10.Char.12.Description:
	Distance to nearest lead object (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.10.Char.12.Identifier = acc_csc_010_NoCollDist
Step.1.10.Char.12.Unit =
Step.1.10.Char.12.Param.0 = RTexpr "Qu::acc_csc_010_NoCollDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.10.Char.13.Name = acc_csc_010_NoCollDistViolatedEver
Step.1.10.Char.13.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment distance ever drops below 0m.
Step.1.10.Char.13.Identifier = acc_csc_010_NoCollDistViolatedEver
Step.1.10.Char.13.Unit =
Step.1.10.Char.13.Param.0 = RTexpr {first()?Qu::acc_csc_010_NoCollDistViolatedEver=0:acc_csc_010_NoCollDistViolatedEver=max(acc_csc_010_NoCollDistViolatedEver,(acc_csc_010_NoCollDist<0))}
Step.1.10.Char.14.Name = acc_csc_010_CollisionFlag
Step.1.10.Char.14.Description:
	Collision flag derived from FMU.CM_ACCController_V17.Out.Debug.Target.DistX <= 0 (nearest lead object); instantaneous, used as the latch() trigger for ImpactSpeed below.
Step.1.10.Char.14.Identifier = acc_csc_010_CollisionFlag
Step.1.10.Char.14.Unit =
Step.1.10.Char.14.Param.0 = RTexpr "Qu::acc_csc_010_CollisionFlag=(FMU.CM_ACCController_V17.Out.Debug.Target.DistX<=0)"
Step.1.10.Char.15.Name = acc_csc_010_ImpactSpeed
Step.1.10.Char.15.Description:
	Ego speed latched at moment of first collision (nearest lead object)
Step.1.10.Char.15.Identifier = acc_csc_010_ImpactSpeed
Step.1.10.Char.15.Unit =
Step.1.10.Char.15.Param.0 = RTexpr {Qu::acc_csc_010_ImpactSpeed=latch(Speed("Ego"),Qu::acc_csc_010_CollisionFlag==1)}
Step.1.10.Char.16.Name = acc_csc_010_CollisionEver
Step.1.10.Char.16.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment a collision ever occurs (nearest lead object), even if the vehicles separate again before the run ends.
Step.1.10.Char.16.Identifier = acc_csc_010_CollisionEver
Step.1.10.Char.16.Unit =
Step.1.10.Char.16.Param.0 = RTexpr {first()?Qu::acc_csc_010_CollisionEver=0:acc_csc_010_CollisionEver=max(acc_csc_010_CollisionEver,(acc_csc_010_CollisionFlag==1))}
Step.1.10.Crit.0.Name = acc_csc_010 - Safe Distance Consistency
Step.1.10.Crit.0.Description:
	Good if SafeDist was never violated while actively following throughout the run. Bad if it was violated at any point.
Step.1.10.Crit.0.Good = [get acc_csc_010_SafeDistViolated] == 0
Step.1.10.Crit.0.Warn =
Step.1.10.Crit.0.Bad = [get acc_csc_010_SafeDistViolated] == 1
Step.1.10.Crit.1.Name = acc_csc_010 - Time To Collision
Step.1.10.Crit.1.Description:
	Good if TTC never entered the warn/bad zone while a valid target existed throughout the run. Warn if it ever entered [3.5,11)s. Bad if it ever entered (0,3.5)s.
Step.1.10.Crit.1.Good = [get acc_csc_010_TTCBadEver] == 0 && [get acc_csc_010_TTCWarnEver] == 0
Step.1.10.Crit.1.Warn = [get acc_csc_010_TTCBadEver] == 0 && [get acc_csc_010_TTCWarnEver] == 1
Step.1.10.Crit.1.Bad = [get acc_csc_010_TTCBadEver] == 1
Step.1.10.Crit.2.Name = acc_csc_010 - Comfort Deceleration Limit
Step.1.10.Crit.2.Description:
	Good if Comfort Deceleration Limit never went out of bound (min=-3, max=2.8) throughout the run.
Step.1.10.Crit.2.Good = [get acc_csc_010_ComfortAxOutOfBoundEver] == 0
Step.1.10.Crit.2.Warn =
Step.1.10.Crit.2.Bad = [get acc_csc_010_ComfortAxOutOfBoundEver] == 1
Step.1.10.Crit.3.Name = acc_csc_010 - Emergency Deceleration Bound
Step.1.10.Crit.3.Description:
	Good if Emergency Deceleration Bound never went out of bound (min=-6) throughout the run.
Step.1.10.Crit.3.Good = [get acc_csc_010_EmergencyAxOutOfBoundEver] == 0
Step.1.10.Crit.3.Warn =
Step.1.10.Crit.3.Bad = [get acc_csc_010_EmergencyAxOutOfBoundEver] == 1
Step.1.10.Crit.4.Name = acc_csc_010 - Jerk Limit
Step.1.10.Crit.4.Description:
	Good if |jerk| never exceeded 4 m/s3 throughout the run.
Step.1.10.Crit.4.Good = [get acc_csc_010_JerkOverLimitEver] == 0
Step.1.10.Crit.4.Warn =
Step.1.10.Crit.4.Bad = [get acc_csc_010_JerkOverLimitEver] == 1
Step.1.10.Crit.5.Name = acc_csc_010 - No Collision Distance
Step.1.10.Crit.5.Description:
	Good if distance never dropped below 0m throughout the run.
Step.1.10.Crit.5.Good = [get acc_csc_010_NoCollDistViolatedEver] == 0
Step.1.10.Crit.5.Warn =
Step.1.10.Crit.5.Bad = [get acc_csc_010_NoCollDistViolatedEver] == 1
Step.1.10.Crit.6.Name = acc_csc_010 - Collision Flag
Step.1.10.Crit.6.Description:
	Good if no collision ever occurred (nearest lead object) throughout the run.
Step.1.10.Crit.6.Good = [get acc_csc_010_CollisionEver] == 0
Step.1.10.Crit.6.Warn =
Step.1.10.Crit.6.Bad = [get acc_csc_010_CollisionEver] == 1
Step.1.10.Crit.7.Name = acc_csc_010 - Impact Speed
Step.1.10.Crit.7.Description:
	Good if no collision ever occurred, or impact speed = 0; Warn (0,5) m/s; Bad >= 5 m/s
Step.1.10.Crit.7.Good = [get acc_csc_010_CollisionEver] == 0 || [get acc_csc_010_ImpactSpeed] == 0
Step.1.10.Crit.7.Warn = [get acc_csc_010_CollisionEver] == 1 && [get acc_csc_010_ImpactSpeed] > 0 && [get acc_csc_010_ImpactSpeed] < 5
Step.1.10.Crit.7.Bad = [get acc_csc_010_CollisionEver] == 1 && [get acc_csc_010_ImpactSpeed] >= 5
Step.1.10.Var.0.Name = acc_csc_010_ds001
Step.1.10.Var.0.Param = 18 13 50 13 70
Step.1.10.Var.0.Result = bad
Step.1.10.Var.0.ResDate = 1782803681
Step.1.10.Var.0.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_010_141432.erg
Step.1.10.Var.0.Char.0.Ref = acc_csc_010_ActualDist
Step.1.10.Var.0.Char.0.Value = 999.0
Step.1.10.Var.0.Char.1.Ref = acc_csc_010_SafeDist
Step.1.10.Var.0.Char.1.Value = 35.85527719877385
Step.1.10.Var.0.Char.2.Ref = acc_csc_010_SafeDistViolated
Step.1.10.Var.0.Char.2.Value = 1.0
Step.1.10.Var.0.Char.3.Ref = acc_csc_010_TTC
Step.1.10.Var.0.Char.3.Value = 0.0
Step.1.10.Var.0.Char.4.Ref = acc_csc_010_TTCWarnEver
Step.1.10.Var.0.Char.4.Value = 0.0
Step.1.10.Var.0.Char.5.Ref = acc_csc_010_TTCBadEver
Step.1.10.Var.0.Char.5.Value = 0.0
Step.1.10.Var.0.Char.6.Ref = acc_csc_010_ComfortAx
Step.1.10.Var.0.Char.6.Value = 1.9285992352090944
Step.1.10.Var.0.Char.7.Ref = acc_csc_010_ComfortAxOutOfBoundEver
Step.1.10.Var.0.Char.7.Value = 0.0
Step.1.10.Var.0.Char.8.Ref = acc_csc_010_EmergencyAx
Step.1.10.Var.0.Char.8.Value = 1.9285992352090944
Step.1.10.Var.0.Char.9.Ref = acc_csc_010_EmergencyAxOutOfBoundEver
Step.1.10.Var.0.Char.9.Value = 0.0
Step.1.10.Var.0.Char.10.Ref = acc_csc_010_Jerk
Step.1.10.Var.0.Char.10.Value = 0.3399337664881248
Step.1.10.Var.0.Char.11.Ref = acc_csc_010_JerkOverLimitEver
Step.1.10.Var.0.Char.11.Value = 1.0
Step.1.10.Var.0.Char.12.Ref = acc_csc_010_NoCollDist
Step.1.10.Var.0.Char.12.Value = 999.0
Step.1.10.Var.0.Char.13.Ref = acc_csc_010_NoCollDistViolatedEver
Step.1.10.Var.0.Char.13.Value = 0.0
Step.1.10.Var.0.Char.14.Ref = acc_csc_010_CollisionFlag
Step.1.10.Var.0.Char.14.Value = 0.0
Step.1.10.Var.0.Char.15.Ref = acc_csc_010_ImpactSpeed
Step.1.10.Var.0.Char.15.Value = 0.0
Step.1.10.Var.0.Char.16.Ref = acc_csc_010_CollisionEver
Step.1.10.Var.0.Char.16.Value = 0.0
Step.1.10.Var.0.Crit.0.Ref = acc_csc_010 - Safe Distance Consistency
Step.1.10.Var.0.Crit.0.Result = bad
Step.1.10.Var.0.Crit.1.Ref = acc_csc_010 - Time To Collision
Step.1.10.Var.0.Crit.1.Result = good
Step.1.10.Var.0.Crit.2.Ref = acc_csc_010 - Comfort Deceleration Limit
Step.1.10.Var.0.Crit.2.Result = good
Step.1.10.Var.0.Crit.3.Ref = acc_csc_010 - Emergency Deceleration Bound
Step.1.10.Var.0.Crit.3.Result = good
Step.1.10.Var.0.Crit.4.Ref = acc_csc_010 - Jerk Limit
Step.1.10.Var.0.Crit.4.Result = bad
Step.1.10.Var.0.Crit.5.Ref = acc_csc_010 - No Collision Distance
Step.1.10.Var.0.Crit.5.Result = good
Step.1.10.Var.0.Crit.6.Ref = acc_csc_010 - Collision Flag
Step.1.10.Var.0.Crit.6.Result = good
Step.1.10.Var.0.Crit.7.Ref = acc_csc_010 - Impact Speed
Step.1.10.Var.0.Crit.7.Result = good
Step.1.10.Var.1.Name = acc_csc_010_ds002
Step.1.10.Var.1.Param = 20 15 55 15 75
Step.1.10.Var.1.Result = bad
Step.1.10.Var.1.ResDate = 1782803693
Step.1.10.Var.1.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_010_141445.erg
Step.1.10.Var.1.Char.0.Ref = acc_csc_010_ActualDist
Step.1.10.Var.1.Char.0.Value = 999.0
Step.1.10.Var.1.Char.1.Ref = acc_csc_010_SafeDist
Step.1.10.Var.1.Char.1.Value = 32.477534593357326
Step.1.10.Var.1.Char.2.Ref = acc_csc_010_SafeDistViolated
Step.1.10.Var.1.Char.2.Value = 1.0
Step.1.10.Var.1.Char.3.Ref = acc_csc_010_TTC
Step.1.10.Var.1.Char.3.Value = 0.0
Step.1.10.Var.1.Char.4.Ref = acc_csc_010_TTCWarnEver
Step.1.10.Var.1.Char.4.Value = 0.0
Step.1.10.Var.1.Char.5.Ref = acc_csc_010_TTCBadEver
Step.1.10.Var.1.Char.5.Value = 0.0
Step.1.10.Var.1.Char.6.Ref = acc_csc_010_ComfortAx
Step.1.10.Var.1.Char.6.Value = 2.8
Step.1.10.Var.1.Char.7.Ref = acc_csc_010_ComfortAxOutOfBoundEver
Step.1.10.Var.1.Char.7.Value = 0.0
Step.1.10.Var.1.Char.8.Ref = acc_csc_010_EmergencyAx
Step.1.10.Var.1.Char.8.Value = 2.8
Step.1.10.Var.1.Char.9.Ref = acc_csc_010_EmergencyAxOutOfBoundEver
Step.1.10.Var.1.Char.9.Value = 0.0
Step.1.10.Var.1.Char.10.Ref = acc_csc_010_Jerk
Step.1.10.Var.1.Char.10.Value = 0.0
Step.1.10.Var.1.Char.11.Ref = acc_csc_010_JerkOverLimitEver
Step.1.10.Var.1.Char.11.Value = 1.0
Step.1.10.Var.1.Char.12.Ref = acc_csc_010_NoCollDist
Step.1.10.Var.1.Char.12.Value = 999.0
Step.1.10.Var.1.Char.13.Ref = acc_csc_010_NoCollDistViolatedEver
Step.1.10.Var.1.Char.13.Value = 0.0
Step.1.10.Var.1.Char.14.Ref = acc_csc_010_CollisionFlag
Step.1.10.Var.1.Char.14.Value = 0.0
Step.1.10.Var.1.Char.15.Ref = acc_csc_010_ImpactSpeed
Step.1.10.Var.1.Char.15.Value = 0.0
Step.1.10.Var.1.Char.16.Ref = acc_csc_010_CollisionEver
Step.1.10.Var.1.Char.16.Value = 0.0
Step.1.10.Var.1.Crit.0.Ref = acc_csc_010 - Safe Distance Consistency
Step.1.10.Var.1.Crit.0.Result = bad
Step.1.10.Var.1.Crit.1.Ref = acc_csc_010 - Time To Collision
Step.1.10.Var.1.Crit.1.Result = good
Step.1.10.Var.1.Crit.2.Ref = acc_csc_010 - Comfort Deceleration Limit
Step.1.10.Var.1.Crit.2.Result = good
Step.1.10.Var.1.Crit.3.Ref = acc_csc_010 - Emergency Deceleration Bound
Step.1.10.Var.1.Crit.3.Result = good
Step.1.10.Var.1.Crit.4.Ref = acc_csc_010 - Jerk Limit
Step.1.10.Var.1.Crit.4.Result = bad
Step.1.10.Var.1.Crit.5.Ref = acc_csc_010 - No Collision Distance
Step.1.10.Var.1.Crit.5.Result = good
Step.1.10.Var.1.Crit.6.Ref = acc_csc_010 - Collision Flag
Step.1.10.Var.1.Crit.6.Result = good
Step.1.10.Var.1.Crit.7.Ref = acc_csc_010 - Impact Speed
Step.1.10.Var.1.Crit.7.Result = good
Step.1.10.Var.2.Name = acc_csc_010_ds003
Step.1.10.Var.2.Param = 24 18 62 17 90
Step.1.10.Var.2.Result = bad
Step.1.10.Var.2.ResDate = 1782803705
Step.1.10.Var.2.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_010_141457.erg
Step.1.10.Var.2.Char.0.Ref = acc_csc_010_ActualDist
Step.1.10.Var.2.Char.0.Value = 999.0
Step.1.10.Var.2.Char.1.Ref = acc_csc_010_SafeDist
Step.1.10.Var.2.Char.1.Value = 55.19668402110511
Step.1.10.Var.2.Char.2.Ref = acc_csc_010_SafeDistViolated
Step.1.10.Var.2.Char.2.Value = 1.0
Step.1.10.Var.2.Char.3.Ref = acc_csc_010_TTC
Step.1.10.Var.2.Char.3.Value = 0.0
Step.1.10.Var.2.Char.4.Ref = acc_csc_010_TTCWarnEver
Step.1.10.Var.2.Char.4.Value = 0.0
Step.1.10.Var.2.Char.5.Ref = acc_csc_010_TTCBadEver
Step.1.10.Var.2.Char.5.Value = 0.0
Step.1.10.Var.2.Char.6.Ref = acc_csc_010_ComfortAx
Step.1.10.Var.2.Char.6.Value = 0.0011533839634381593
Step.1.10.Var.2.Char.7.Ref = acc_csc_010_ComfortAxOutOfBoundEver
Step.1.10.Var.2.Char.7.Value = 0.0
Step.1.10.Var.2.Char.8.Ref = acc_csc_010_EmergencyAx
Step.1.10.Var.2.Char.8.Value = 0.0011533839634381593
Step.1.10.Var.2.Char.9.Ref = acc_csc_010_EmergencyAxOutOfBoundEver
Step.1.10.Var.2.Char.9.Value = 0.0
Step.1.10.Var.2.Char.10.Ref = acc_csc_010_Jerk
Step.1.10.Var.2.Char.10.Value = 0.001739319941411356
Step.1.10.Var.2.Char.11.Ref = acc_csc_010_JerkOverLimitEver
Step.1.10.Var.2.Char.11.Value = 1.0
Step.1.10.Var.2.Char.12.Ref = acc_csc_010_NoCollDist
Step.1.10.Var.2.Char.12.Value = 999.0
Step.1.10.Var.2.Char.13.Ref = acc_csc_010_NoCollDistViolatedEver
Step.1.10.Var.2.Char.13.Value = 0.0
Step.1.10.Var.2.Char.14.Ref = acc_csc_010_CollisionFlag
Step.1.10.Var.2.Char.14.Value = 0.0
Step.1.10.Var.2.Char.15.Ref = acc_csc_010_ImpactSpeed
Step.1.10.Var.2.Char.15.Value = 0.0
Step.1.10.Var.2.Char.16.Ref = acc_csc_010_CollisionEver
Step.1.10.Var.2.Char.16.Value = 0.0
Step.1.10.Var.2.Crit.0.Ref = acc_csc_010 - Safe Distance Consistency
Step.1.10.Var.2.Crit.0.Result = bad
Step.1.10.Var.2.Crit.1.Ref = acc_csc_010 - Time To Collision
Step.1.10.Var.2.Crit.1.Result = good
Step.1.10.Var.2.Crit.2.Ref = acc_csc_010 - Comfort Deceleration Limit
Step.1.10.Var.2.Crit.2.Result = good
Step.1.10.Var.2.Crit.3.Ref = acc_csc_010 - Emergency Deceleration Bound
Step.1.10.Var.2.Crit.3.Result = good
Step.1.10.Var.2.Crit.4.Ref = acc_csc_010 - Jerk Limit
Step.1.10.Var.2.Crit.4.Result = bad
Step.1.10.Var.2.Crit.5.Ref = acc_csc_010 - No Collision Distance
Step.1.10.Var.2.Crit.5.Result = good
Step.1.10.Var.2.Crit.6.Ref = acc_csc_010 - Collision Flag
Step.1.10.Var.2.Crit.6.Result = good
Step.1.10.Var.2.Crit.7.Ref = acc_csc_010 - Impact Speed
Step.1.10.Var.2.Crit.7.Result = good
Step.1.10.Var.3.Name = acc_csc_010_ds004
Step.1.10.Var.3.Param = 28 21 70 20 100
Step.1.10.Var.3.Result = bad
Step.1.10.Var.3.ResDate = 1782803718
Step.1.10.Var.3.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_010_141509.erg
Step.1.10.Var.3.Char.0.Ref = acc_csc_010_ActualDist
Step.1.10.Var.3.Char.0.Value = 999.0
Step.1.10.Var.3.Char.1.Ref = acc_csc_010_SafeDist
Step.1.10.Var.3.Char.1.Value = 64.28009038659081
Step.1.10.Var.3.Char.2.Ref = acc_csc_010_SafeDistViolated
Step.1.10.Var.3.Char.2.Value = 1.0
Step.1.10.Var.3.Char.3.Ref = acc_csc_010_TTC
Step.1.10.Var.3.Char.3.Value = 0.0
Step.1.10.Var.3.Char.4.Ref = acc_csc_010_TTCWarnEver
Step.1.10.Var.3.Char.4.Value = 0.0
Step.1.10.Var.3.Char.5.Ref = acc_csc_010_TTCBadEver
Step.1.10.Var.3.Char.5.Value = 0.0
Step.1.10.Var.3.Char.6.Ref = acc_csc_010_ComfortAx
Step.1.10.Var.3.Char.6.Value = 0.041707691620587184
Step.1.10.Var.3.Char.7.Ref = acc_csc_010_ComfortAxOutOfBoundEver
Step.1.10.Var.3.Char.7.Value = 1.0
Step.1.10.Var.3.Char.8.Ref = acc_csc_010_EmergencyAx
Step.1.10.Var.3.Char.8.Value = 0.041707691620587184
Step.1.10.Var.3.Char.9.Ref = acc_csc_010_EmergencyAxOutOfBoundEver
Step.1.10.Var.3.Char.9.Value = 0.0
Step.1.10.Var.3.Char.10.Ref = acc_csc_010_Jerk
Step.1.10.Var.3.Char.10.Value = 0.00305750548932495
Step.1.10.Var.3.Char.11.Ref = acc_csc_010_JerkOverLimitEver
Step.1.10.Var.3.Char.11.Value = 1.0
Step.1.10.Var.3.Char.12.Ref = acc_csc_010_NoCollDist
Step.1.10.Var.3.Char.12.Value = 999.0
Step.1.10.Var.3.Char.13.Ref = acc_csc_010_NoCollDistViolatedEver
Step.1.10.Var.3.Char.13.Value = 0.0
Step.1.10.Var.3.Char.14.Ref = acc_csc_010_CollisionFlag
Step.1.10.Var.3.Char.14.Value = 0.0
Step.1.10.Var.3.Char.15.Ref = acc_csc_010_ImpactSpeed
Step.1.10.Var.3.Char.15.Value = 0.0
Step.1.10.Var.3.Char.16.Ref = acc_csc_010_CollisionEver
Step.1.10.Var.3.Char.16.Value = 0.0
Step.1.10.Var.3.Crit.0.Ref = acc_csc_010 - Safe Distance Consistency
Step.1.10.Var.3.Crit.0.Result = bad
Step.1.10.Var.3.Crit.1.Ref = acc_csc_010 - Time To Collision
Step.1.10.Var.3.Crit.1.Result = good
Step.1.10.Var.3.Crit.2.Ref = acc_csc_010 - Comfort Deceleration Limit
Step.1.10.Var.3.Crit.2.Result = bad
Step.1.10.Var.3.Crit.3.Ref = acc_csc_010 - Emergency Deceleration Bound
Step.1.10.Var.3.Crit.3.Result = good
Step.1.10.Var.3.Crit.4.Ref = acc_csc_010 - Jerk Limit
Step.1.10.Var.3.Crit.4.Result = bad
Step.1.10.Var.3.Crit.5.Ref = acc_csc_010 - No Collision Distance
Step.1.10.Var.3.Crit.5.Result = good
Step.1.10.Var.3.Crit.6.Ref = acc_csc_010 - Collision Flag
Step.1.10.Var.3.Crit.6.Result = good
Step.1.10.Var.3.Crit.7.Ref = acc_csc_010 - Impact Speed
Step.1.10.Var.3.Crit.7.Result = good
Step.1.10.Var.4.Name = acc_csc_010_ds005
Step.1.10.Var.4.Param = 30 22 75 21 105
Step.1.10.Var.4.Result = bad
Step.1.10.Var.4.ResDate = 1782803730
Step.1.10.Var.4.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_010_141522.erg
Step.1.10.Var.4.Char.0.Ref = acc_csc_010_ActualDist
Step.1.10.Var.4.Char.0.Value = 999.0
Step.1.10.Var.4.Char.1.Ref = acc_csc_010_SafeDist
Step.1.10.Var.4.Char.1.Value = 68.84923648196133
Step.1.10.Var.4.Char.2.Ref = acc_csc_010_SafeDistViolated
Step.1.10.Var.4.Char.2.Value = 1.0
Step.1.10.Var.4.Char.3.Ref = acc_csc_010_TTC
Step.1.10.Var.4.Char.3.Value = 0.0
Step.1.10.Var.4.Char.4.Ref = acc_csc_010_TTCWarnEver
Step.1.10.Var.4.Char.4.Value = 0.0
Step.1.10.Var.4.Char.5.Ref = acc_csc_010_TTCBadEver
Step.1.10.Var.4.Char.5.Value = 0.0
Step.1.10.Var.4.Char.6.Ref = acc_csc_010_ComfortAx
Step.1.10.Var.4.Char.6.Value = 0.05243948453518783
Step.1.10.Var.4.Char.7.Ref = acc_csc_010_ComfortAxOutOfBoundEver
Step.1.10.Var.4.Char.7.Value = 1.0
Step.1.10.Var.4.Char.8.Ref = acc_csc_010_EmergencyAx
Step.1.10.Var.4.Char.8.Value = 0.05243948453518783
Step.1.10.Var.4.Char.9.Ref = acc_csc_010_EmergencyAxOutOfBoundEver
Step.1.10.Var.4.Char.9.Value = 0.0
Step.1.10.Var.4.Char.10.Ref = acc_csc_010_Jerk
Step.1.10.Var.4.Char.10.Value = 0.018964209138559517
Step.1.10.Var.4.Char.11.Ref = acc_csc_010_JerkOverLimitEver
Step.1.10.Var.4.Char.11.Value = 1.0
Step.1.10.Var.4.Char.12.Ref = acc_csc_010_NoCollDist
Step.1.10.Var.4.Char.12.Value = 999.0
Step.1.10.Var.4.Char.13.Ref = acc_csc_010_NoCollDistViolatedEver
Step.1.10.Var.4.Char.13.Value = 0.0
Step.1.10.Var.4.Char.14.Ref = acc_csc_010_CollisionFlag
Step.1.10.Var.4.Char.14.Value = 0.0
Step.1.10.Var.4.Char.15.Ref = acc_csc_010_ImpactSpeed
Step.1.10.Var.4.Char.15.Value = 0.0
Step.1.10.Var.4.Char.16.Ref = acc_csc_010_CollisionEver
Step.1.10.Var.4.Char.16.Value = 0.0
Step.1.10.Var.4.Crit.0.Ref = acc_csc_010 - Safe Distance Consistency
Step.1.10.Var.4.Crit.0.Result = bad
Step.1.10.Var.4.Crit.1.Ref = acc_csc_010 - Time To Collision
Step.1.10.Var.4.Crit.1.Result = good
Step.1.10.Var.4.Crit.2.Ref = acc_csc_010 - Comfort Deceleration Limit
Step.1.10.Var.4.Crit.2.Result = bad
Step.1.10.Var.4.Crit.3.Ref = acc_csc_010 - Emergency Deceleration Bound
Step.1.10.Var.4.Crit.3.Result = good
Step.1.10.Var.4.Crit.4.Ref = acc_csc_010 - Jerk Limit
Step.1.10.Var.4.Crit.4.Result = bad
Step.1.10.Var.4.Crit.5.Ref = acc_csc_010 - No Collision Distance
Step.1.10.Var.4.Crit.5.Result = good
Step.1.10.Var.4.Crit.6.Ref = acc_csc_010 - Collision Flag
Step.1.10.Var.4.Crit.6.Result = good
Step.1.10.Var.4.Crit.7.Ref = acc_csc_010 - Impact Speed
Step.1.10.Var.4.Crit.7.Result = good
Step.1.11 = TestRun
Step.1.11.Name = OSC_Imported/longitudinal_feature/ACC/acc_csc_011
Step.1.11.Param.0 = EgoSpeed NValue
Step.1.11.Param.1 = TV1Speed NValue
Step.1.11.Param.2 = TV1_initPos NValue
Step.1.11.Param.3 = TV2Speed NValue
Step.1.11.Param.4 = TV2_initPos NValue
Step.1.11.Char.0.Name = acc_csc_011_ActualDist
Step.1.11.Char.0.Description:
	Actual distance to lead (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.11.Char.0.Identifier = acc_csc_011_ActualDist
Step.1.11.Char.0.Unit =
Step.1.11.Char.0.Param.0 = RTexpr "Qu::acc_csc_011_ActualDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.11.Char.1.Name = acc_csc_011_SafeDist
Step.1.11.Char.1.Description:
	Reference safe distance (signal=FMU.CM_ACCController_V17.Out.Debug.SafeDistance)
Step.1.11.Char.1.Identifier = acc_csc_011_SafeDist
Step.1.11.Char.1.Unit =
Step.1.11.Char.1.Param.0 = RTexpr "Qu::acc_csc_011_SafeDist=FMU.CM_ACCController_V17.Out.Debug.SafeDistance"
Step.1.11.Char.2.Name = acc_csc_011_SafeDistViolated
Step.1.11.Char.2.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment ActualDist<SafeDist while actively following (gate==1); stays 1 for the rest of the run even if distance recovers.
Step.1.11.Char.2.Identifier = acc_csc_011_SafeDistViolated
Step.1.11.Char.2.Unit =
Step.1.11.Char.2.Param.0 = RTexpr {first()?Qu::acc_csc_011_SafeDistViolated=0:acc_csc_011_SafeDistViolated=max(acc_csc_011_SafeDistViolated,(FMU.CM_ACCController_V17.Out.Debug.Fusion.Active==1 && acc_csc_011_ActualDist<acc_csc_011_SafeDist))}
Step.1.11.Char.3.Name = acc_csc_011_TTC
Step.1.11.Char.3.Description:
	Time-to-collision (signal=AccelCtrl.ACC.Time2Collision)
Step.1.11.Char.3.Identifier = acc_csc_011_TTC
Step.1.11.Char.3.Unit =
Step.1.11.Char.3.Param.0 = RTexpr "Qu::acc_csc_011_TTC=AccelCtrl.ACC.Time2Collision"
Step.1.11.Char.4.Name = acc_csc_011_TTCWarnEver
Step.1.11.Char.4.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the warn zone [3.5,11)s.
Step.1.11.Char.4.Identifier = acc_csc_011_TTCWarnEver
Step.1.11.Char.4.Unit =
Step.1.11.Char.4.Param.0 = RTexpr {first()?Qu::acc_csc_011_TTCWarnEver=0:acc_csc_011_TTCWarnEver=max(acc_csc_011_TTCWarnEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_011_TTC>=3.5 && acc_csc_011_TTC<11))}
Step.1.11.Char.5.Name = acc_csc_011_TTCBadEver
Step.1.11.Char.5.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the bad zone (0,3.5)s.
Step.1.11.Char.5.Identifier = acc_csc_011_TTCBadEver
Step.1.11.Char.5.Unit =
Step.1.11.Char.5.Param.0 = RTexpr {first()?Qu::acc_csc_011_TTCBadEver=0:acc_csc_011_TTCBadEver=max(acc_csc_011_TTCBadEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_011_TTC>0 && acc_csc_011_TTC<3.5))}
Step.1.11.Char.6.Name = acc_csc_011_ComfortAx
Step.1.11.Char.6.Description:
	Comfort Deceleration Limit (signal=AccelCtrl.DesiredAx)
Step.1.11.Char.6.Identifier = acc_csc_011_ComfortAx
Step.1.11.Char.6.Unit =
Step.1.11.Char.6.Param.0 = RTexpr "Qu::acc_csc_011_ComfortAx=AccelCtrl.DesiredAx"
Step.1.11.Char.7.Name = acc_csc_011_ComfortAxOutOfBoundEver
Step.1.11.Char.7.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Comfort Deceleration Limit ever goes out of bound (min=-3, max=2.8).
Step.1.11.Char.7.Identifier = acc_csc_011_ComfortAxOutOfBoundEver
Step.1.11.Char.7.Unit =
Step.1.11.Char.7.Param.0 = RTexpr {first()?Qu::acc_csc_011_ComfortAxOutOfBoundEver=0:acc_csc_011_ComfortAxOutOfBoundEver=max(acc_csc_011_ComfortAxOutOfBoundEver,(acc_csc_011_ComfortAx<-3 || acc_csc_011_ComfortAx>2.8))}
Step.1.11.Char.8.Name = acc_csc_011_EmergencyAx
Step.1.11.Char.8.Description:
	Emergency Deceleration Bound (signal=AccelCtrl.DesiredAx)
Step.1.11.Char.8.Identifier = acc_csc_011_EmergencyAx
Step.1.11.Char.8.Unit =
Step.1.11.Char.8.Param.0 = RTexpr "Qu::acc_csc_011_EmergencyAx=AccelCtrl.DesiredAx"
Step.1.11.Char.9.Name = acc_csc_011_EmergencyAxOutOfBoundEver
Step.1.11.Char.9.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Emergency Deceleration Bound ever goes out of bound (min=-6).
Step.1.11.Char.9.Identifier = acc_csc_011_EmergencyAxOutOfBoundEver
Step.1.11.Char.9.Unit =
Step.1.11.Char.9.Param.0 = RTexpr {first()?Qu::acc_csc_011_EmergencyAxOutOfBoundEver=0:acc_csc_011_EmergencyAxOutOfBoundEver=max(acc_csc_011_EmergencyAxOutOfBoundEver,(acc_csc_011_EmergencyAx<-6))}
Step.1.11.Char.10.Name = acc_csc_011_Jerk
Step.1.11.Char.10.Description:
	Jerk = |d(DesiredAx)/dt|, base signal=AccelCtrl.DesiredAx
Step.1.11.Char.10.Identifier = acc_csc_011_Jerk
Step.1.11.Char.10.Unit =
Step.1.11.Char.10.Param.0 = RTexpr "Qu::acc_csc_011_Jerk=abs(diff(AccelCtrl.DesiredAx,Time))"
Step.1.11.Char.11.Name = acc_csc_011_JerkOverLimitEver
Step.1.11.Char.11.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment |jerk| ever exceeds 4 m/s3.
Step.1.11.Char.11.Identifier = acc_csc_011_JerkOverLimitEver
Step.1.11.Char.11.Unit =
Step.1.11.Char.11.Param.0 = RTexpr {first()?Qu::acc_csc_011_JerkOverLimitEver=0:acc_csc_011_JerkOverLimitEver=max(acc_csc_011_JerkOverLimitEver,(acc_csc_011_Jerk>4))}
Step.1.11.Char.12.Name = acc_csc_011_NoCollDist
Step.1.11.Char.12.Description:
	Distance to nearest lead object (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.11.Char.12.Identifier = acc_csc_011_NoCollDist
Step.1.11.Char.12.Unit =
Step.1.11.Char.12.Param.0 = RTexpr "Qu::acc_csc_011_NoCollDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.11.Char.13.Name = acc_csc_011_NoCollDistViolatedEver
Step.1.11.Char.13.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment distance ever drops below 0m.
Step.1.11.Char.13.Identifier = acc_csc_011_NoCollDistViolatedEver
Step.1.11.Char.13.Unit =
Step.1.11.Char.13.Param.0 = RTexpr {first()?Qu::acc_csc_011_NoCollDistViolatedEver=0:acc_csc_011_NoCollDistViolatedEver=max(acc_csc_011_NoCollDistViolatedEver,(acc_csc_011_NoCollDist<0))}
Step.1.11.Char.14.Name = acc_csc_011_CollisionFlag
Step.1.11.Char.14.Description:
	Collision flag derived from FMU.CM_ACCController_V17.Out.Debug.Target.DistX <= 0 (nearest lead object); instantaneous, used as the latch() trigger for ImpactSpeed below.
Step.1.11.Char.14.Identifier = acc_csc_011_CollisionFlag
Step.1.11.Char.14.Unit =
Step.1.11.Char.14.Param.0 = RTexpr "Qu::acc_csc_011_CollisionFlag=(FMU.CM_ACCController_V17.Out.Debug.Target.DistX<=0)"
Step.1.11.Char.15.Name = acc_csc_011_ImpactSpeed
Step.1.11.Char.15.Description:
	Ego speed latched at moment of first collision (nearest lead object)
Step.1.11.Char.15.Identifier = acc_csc_011_ImpactSpeed
Step.1.11.Char.15.Unit =
Step.1.11.Char.15.Param.0 = RTexpr {Qu::acc_csc_011_ImpactSpeed=latch(Speed("Ego"),Qu::acc_csc_011_CollisionFlag==1)}
Step.1.11.Char.16.Name = acc_csc_011_CollisionEver
Step.1.11.Char.16.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment a collision ever occurs (nearest lead object), even if the vehicles separate again before the run ends.
Step.1.11.Char.16.Identifier = acc_csc_011_CollisionEver
Step.1.11.Char.16.Unit =
Step.1.11.Char.16.Param.0 = RTexpr {first()?Qu::acc_csc_011_CollisionEver=0:acc_csc_011_CollisionEver=max(acc_csc_011_CollisionEver,(acc_csc_011_CollisionFlag==1))}
Step.1.11.Crit.0.Name = acc_csc_011 - Safe Distance Consistency
Step.1.11.Crit.0.Description:
	Good if SafeDist was never violated while actively following throughout the run. Bad if it was violated at any point.
Step.1.11.Crit.0.Good = [get acc_csc_011_SafeDistViolated] == 0
Step.1.11.Crit.0.Warn =
Step.1.11.Crit.0.Bad = [get acc_csc_011_SafeDistViolated] == 1
Step.1.11.Crit.1.Name = acc_csc_011 - Time To Collision
Step.1.11.Crit.1.Description:
	Good if TTC never entered the warn/bad zone while a valid target existed throughout the run. Warn if it ever entered [3.5,11)s. Bad if it ever entered (0,3.5)s.
Step.1.11.Crit.1.Good = [get acc_csc_011_TTCBadEver] == 0 && [get acc_csc_011_TTCWarnEver] == 0
Step.1.11.Crit.1.Warn = [get acc_csc_011_TTCBadEver] == 0 && [get acc_csc_011_TTCWarnEver] == 1
Step.1.11.Crit.1.Bad = [get acc_csc_011_TTCBadEver] == 1
Step.1.11.Crit.2.Name = acc_csc_011 - Comfort Deceleration Limit
Step.1.11.Crit.2.Description:
	Good if Comfort Deceleration Limit never went out of bound (min=-3, max=2.8) throughout the run.
Step.1.11.Crit.2.Good = [get acc_csc_011_ComfortAxOutOfBoundEver] == 0
Step.1.11.Crit.2.Warn =
Step.1.11.Crit.2.Bad = [get acc_csc_011_ComfortAxOutOfBoundEver] == 1
Step.1.11.Crit.3.Name = acc_csc_011 - Emergency Deceleration Bound
Step.1.11.Crit.3.Description:
	Good if Emergency Deceleration Bound never went out of bound (min=-6) throughout the run.
Step.1.11.Crit.3.Good = [get acc_csc_011_EmergencyAxOutOfBoundEver] == 0
Step.1.11.Crit.3.Warn =
Step.1.11.Crit.3.Bad = [get acc_csc_011_EmergencyAxOutOfBoundEver] == 1
Step.1.11.Crit.4.Name = acc_csc_011 - Jerk Limit
Step.1.11.Crit.4.Description:
	Good if |jerk| never exceeded 4 m/s3 throughout the run.
Step.1.11.Crit.4.Good = [get acc_csc_011_JerkOverLimitEver] == 0
Step.1.11.Crit.4.Warn =
Step.1.11.Crit.4.Bad = [get acc_csc_011_JerkOverLimitEver] == 1
Step.1.11.Crit.5.Name = acc_csc_011 - No Collision Distance
Step.1.11.Crit.5.Description:
	Good if distance never dropped below 0m throughout the run.
Step.1.11.Crit.5.Good = [get acc_csc_011_NoCollDistViolatedEver] == 0
Step.1.11.Crit.5.Warn =
Step.1.11.Crit.5.Bad = [get acc_csc_011_NoCollDistViolatedEver] == 1
Step.1.11.Crit.6.Name = acc_csc_011 - Collision Flag
Step.1.11.Crit.6.Description:
	Good if no collision ever occurred (nearest lead object) throughout the run.
Step.1.11.Crit.6.Good = [get acc_csc_011_CollisionEver] == 0
Step.1.11.Crit.6.Warn =
Step.1.11.Crit.6.Bad = [get acc_csc_011_CollisionEver] == 1
Step.1.11.Crit.7.Name = acc_csc_011 - Impact Speed
Step.1.11.Crit.7.Description:
	Good if no collision ever occurred, or impact speed = 0; Warn (0,5) m/s; Bad >= 5 m/s
Step.1.11.Crit.7.Good = [get acc_csc_011_CollisionEver] == 0 || [get acc_csc_011_ImpactSpeed] == 0
Step.1.11.Crit.7.Warn = [get acc_csc_011_CollisionEver] == 1 && [get acc_csc_011_ImpactSpeed] > 0 && [get acc_csc_011_ImpactSpeed] < 5
Step.1.11.Crit.7.Bad = [get acc_csc_011_CollisionEver] == 1 && [get acc_csc_011_ImpactSpeed] >= 5
Step.1.11.Var.0.Name = acc_csc_011_ds001
Step.1.11.Var.0.Param = 18 13 50 13 70
Step.1.11.Var.0.Result = bad
Step.1.11.Var.0.ResDate = 1782803743
Step.1.11.Var.0.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_011_141535.erg
Step.1.11.Var.0.Char.0.Ref = acc_csc_011_ActualDist
Step.1.11.Var.0.Char.0.Value = 999.0
Step.1.11.Var.0.Char.1.Ref = acc_csc_011_SafeDist
Step.1.11.Var.0.Char.1.Value = 35.65137054398542
Step.1.11.Var.0.Char.2.Ref = acc_csc_011_SafeDistViolated
Step.1.11.Var.0.Char.2.Value = 1.0
Step.1.11.Var.0.Char.3.Ref = acc_csc_011_TTC
Step.1.11.Var.0.Char.3.Value = 0.0
Step.1.11.Var.0.Char.4.Ref = acc_csc_011_TTCWarnEver
Step.1.11.Var.0.Char.4.Value = 0.0
Step.1.11.Var.0.Char.5.Ref = acc_csc_011_TTCBadEver
Step.1.11.Var.0.Char.5.Value = 0.0
Step.1.11.Var.0.Char.6.Ref = acc_csc_011_ComfortAx
Step.1.11.Var.0.Char.6.Value = 1.9995232890485484
Step.1.11.Var.0.Char.7.Ref = acc_csc_011_ComfortAxOutOfBoundEver
Step.1.11.Var.0.Char.7.Value = 0.0
Step.1.11.Var.0.Char.8.Ref = acc_csc_011_EmergencyAx
Step.1.11.Var.0.Char.8.Value = 1.9995232890485484
Step.1.11.Var.0.Char.9.Ref = acc_csc_011_EmergencyAxOutOfBoundEver
Step.1.11.Var.0.Char.9.Value = 0.0
Step.1.11.Var.0.Char.10.Ref = acc_csc_011_Jerk
Step.1.11.Var.0.Char.10.Value = 0.33815351767930696
Step.1.11.Var.0.Char.11.Ref = acc_csc_011_JerkOverLimitEver
Step.1.11.Var.0.Char.11.Value = 1.0
Step.1.11.Var.0.Char.12.Ref = acc_csc_011_NoCollDist
Step.1.11.Var.0.Char.12.Value = 999.0
Step.1.11.Var.0.Char.13.Ref = acc_csc_011_NoCollDistViolatedEver
Step.1.11.Var.0.Char.13.Value = 0.0
Step.1.11.Var.0.Char.14.Ref = acc_csc_011_CollisionFlag
Step.1.11.Var.0.Char.14.Value = 0.0
Step.1.11.Var.0.Char.15.Ref = acc_csc_011_ImpactSpeed
Step.1.11.Var.0.Char.15.Value = 0.0
Step.1.11.Var.0.Char.16.Ref = acc_csc_011_CollisionEver
Step.1.11.Var.0.Char.16.Value = 0.0
Step.1.11.Var.0.Crit.0.Ref = acc_csc_011 - Safe Distance Consistency
Step.1.11.Var.0.Crit.0.Result = bad
Step.1.11.Var.0.Crit.1.Ref = acc_csc_011 - Time To Collision
Step.1.11.Var.0.Crit.1.Result = good
Step.1.11.Var.0.Crit.2.Ref = acc_csc_011 - Comfort Deceleration Limit
Step.1.11.Var.0.Crit.2.Result = good
Step.1.11.Var.0.Crit.3.Ref = acc_csc_011 - Emergency Deceleration Bound
Step.1.11.Var.0.Crit.3.Result = good
Step.1.11.Var.0.Crit.4.Ref = acc_csc_011 - Jerk Limit
Step.1.11.Var.0.Crit.4.Result = bad
Step.1.11.Var.0.Crit.5.Ref = acc_csc_011 - No Collision Distance
Step.1.11.Var.0.Crit.5.Result = good
Step.1.11.Var.0.Crit.6.Ref = acc_csc_011 - Collision Flag
Step.1.11.Var.0.Crit.6.Result = good
Step.1.11.Var.0.Crit.7.Ref = acc_csc_011 - Impact Speed
Step.1.11.Var.0.Crit.7.Result = good
Step.1.11.Var.1.Name = acc_csc_011_ds002
Step.1.11.Var.1.Param = 20 15 55 15 75
Step.1.11.Var.1.Result = bad
Step.1.11.Var.1.ResDate = 1782803756
Step.1.11.Var.1.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_011_141547.erg
Step.1.11.Var.1.Char.0.Ref = acc_csc_011_ActualDist
Step.1.11.Var.1.Char.0.Value = 999.0
Step.1.11.Var.1.Char.1.Ref = acc_csc_011_SafeDist
Step.1.11.Var.1.Char.1.Value = 32.20073838294253
Step.1.11.Var.1.Char.2.Ref = acc_csc_011_SafeDistViolated
Step.1.11.Var.1.Char.2.Value = 1.0
Step.1.11.Var.1.Char.3.Ref = acc_csc_011_TTC
Step.1.11.Var.1.Char.3.Value = 0.0
Step.1.11.Var.1.Char.4.Ref = acc_csc_011_TTCWarnEver
Step.1.11.Var.1.Char.4.Value = 0.0
Step.1.11.Var.1.Char.5.Ref = acc_csc_011_TTCBadEver
Step.1.11.Var.1.Char.5.Value = 0.0
Step.1.11.Var.1.Char.6.Ref = acc_csc_011_ComfortAx
Step.1.11.Var.1.Char.6.Value = 2.8
Step.1.11.Var.1.Char.7.Ref = acc_csc_011_ComfortAxOutOfBoundEver
Step.1.11.Var.1.Char.7.Value = 0.0
Step.1.11.Var.1.Char.8.Ref = acc_csc_011_EmergencyAx
Step.1.11.Var.1.Char.8.Value = 2.8
Step.1.11.Var.1.Char.9.Ref = acc_csc_011_EmergencyAxOutOfBoundEver
Step.1.11.Var.1.Char.9.Value = 0.0
Step.1.11.Var.1.Char.10.Ref = acc_csc_011_Jerk
Step.1.11.Var.1.Char.10.Value = 0.0
Step.1.11.Var.1.Char.11.Ref = acc_csc_011_JerkOverLimitEver
Step.1.11.Var.1.Char.11.Value = 1.0
Step.1.11.Var.1.Char.12.Ref = acc_csc_011_NoCollDist
Step.1.11.Var.1.Char.12.Value = 999.0
Step.1.11.Var.1.Char.13.Ref = acc_csc_011_NoCollDistViolatedEver
Step.1.11.Var.1.Char.13.Value = 0.0
Step.1.11.Var.1.Char.14.Ref = acc_csc_011_CollisionFlag
Step.1.11.Var.1.Char.14.Value = 0.0
Step.1.11.Var.1.Char.15.Ref = acc_csc_011_ImpactSpeed
Step.1.11.Var.1.Char.15.Value = 0.0
Step.1.11.Var.1.Char.16.Ref = acc_csc_011_CollisionEver
Step.1.11.Var.1.Char.16.Value = 0.0
Step.1.11.Var.1.Crit.0.Ref = acc_csc_011 - Safe Distance Consistency
Step.1.11.Var.1.Crit.0.Result = bad
Step.1.11.Var.1.Crit.1.Ref = acc_csc_011 - Time To Collision
Step.1.11.Var.1.Crit.1.Result = good
Step.1.11.Var.1.Crit.2.Ref = acc_csc_011 - Comfort Deceleration Limit
Step.1.11.Var.1.Crit.2.Result = good
Step.1.11.Var.1.Crit.3.Ref = acc_csc_011 - Emergency Deceleration Bound
Step.1.11.Var.1.Crit.3.Result = good
Step.1.11.Var.1.Crit.4.Ref = acc_csc_011 - Jerk Limit
Step.1.11.Var.1.Crit.4.Result = bad
Step.1.11.Var.1.Crit.5.Ref = acc_csc_011 - No Collision Distance
Step.1.11.Var.1.Crit.5.Result = good
Step.1.11.Var.1.Crit.6.Ref = acc_csc_011 - Collision Flag
Step.1.11.Var.1.Crit.6.Result = good
Step.1.11.Var.1.Crit.7.Ref = acc_csc_011 - Impact Speed
Step.1.11.Var.1.Crit.7.Result = good
Step.1.11.Var.2.Name = acc_csc_011_ds003
Step.1.11.Var.2.Param = 24 18 62 17 90
Step.1.11.Var.2.Result = bad
Step.1.11.Var.2.ResDate = 1782803768
Step.1.11.Var.2.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_011_141600.erg
Step.1.11.Var.2.Char.0.Ref = acc_csc_011_ActualDist
Step.1.11.Var.2.Char.0.Value = 999.0
Step.1.11.Var.2.Char.1.Ref = acc_csc_011_SafeDist
Step.1.11.Var.2.Char.1.Value = 55.19690773675536
Step.1.11.Var.2.Char.2.Ref = acc_csc_011_SafeDistViolated
Step.1.11.Var.2.Char.2.Value = 1.0
Step.1.11.Var.2.Char.3.Ref = acc_csc_011_TTC
Step.1.11.Var.2.Char.3.Value = 0.0
Step.1.11.Var.2.Char.4.Ref = acc_csc_011_TTCWarnEver
Step.1.11.Var.2.Char.4.Value = 0.0
Step.1.11.Var.2.Char.5.Ref = acc_csc_011_TTCBadEver
Step.1.11.Var.2.Char.5.Value = 0.0
Step.1.11.Var.2.Char.6.Ref = acc_csc_011_ComfortAx
Step.1.11.Var.2.Char.6.Value = 0.0010755698242235212
Step.1.11.Var.2.Char.7.Ref = acc_csc_011_ComfortAxOutOfBoundEver
Step.1.11.Var.2.Char.7.Value = 0.0
Step.1.11.Var.2.Char.8.Ref = acc_csc_011_EmergencyAx
Step.1.11.Var.2.Char.8.Value = 0.0010755698242235212
Step.1.11.Var.2.Char.9.Ref = acc_csc_011_EmergencyAxOutOfBoundEver
Step.1.11.Var.2.Char.9.Value = 0.0
Step.1.11.Var.2.Char.10.Ref = acc_csc_011_Jerk
Step.1.11.Var.2.Char.10.Value = 0.0016563993398259747
Step.1.11.Var.2.Char.11.Ref = acc_csc_011_JerkOverLimitEver
Step.1.11.Var.2.Char.11.Value = 1.0
Step.1.11.Var.2.Char.12.Ref = acc_csc_011_NoCollDist
Step.1.11.Var.2.Char.12.Value = 999.0
Step.1.11.Var.2.Char.13.Ref = acc_csc_011_NoCollDistViolatedEver
Step.1.11.Var.2.Char.13.Value = 0.0
Step.1.11.Var.2.Char.14.Ref = acc_csc_011_CollisionFlag
Step.1.11.Var.2.Char.14.Value = 0.0
Step.1.11.Var.2.Char.15.Ref = acc_csc_011_ImpactSpeed
Step.1.11.Var.2.Char.15.Value = 0.0
Step.1.11.Var.2.Char.16.Ref = acc_csc_011_CollisionEver
Step.1.11.Var.2.Char.16.Value = 0.0
Step.1.11.Var.2.Crit.0.Ref = acc_csc_011 - Safe Distance Consistency
Step.1.11.Var.2.Crit.0.Result = bad
Step.1.11.Var.2.Crit.1.Ref = acc_csc_011 - Time To Collision
Step.1.11.Var.2.Crit.1.Result = good
Step.1.11.Var.2.Crit.2.Ref = acc_csc_011 - Comfort Deceleration Limit
Step.1.11.Var.2.Crit.2.Result = good
Step.1.11.Var.2.Crit.3.Ref = acc_csc_011 - Emergency Deceleration Bound
Step.1.11.Var.2.Crit.3.Result = good
Step.1.11.Var.2.Crit.4.Ref = acc_csc_011 - Jerk Limit
Step.1.11.Var.2.Crit.4.Result = bad
Step.1.11.Var.2.Crit.5.Ref = acc_csc_011 - No Collision Distance
Step.1.11.Var.2.Crit.5.Result = good
Step.1.11.Var.2.Crit.6.Ref = acc_csc_011 - Collision Flag
Step.1.11.Var.2.Crit.6.Result = good
Step.1.11.Var.2.Crit.7.Ref = acc_csc_011 - Impact Speed
Step.1.11.Var.2.Crit.7.Result = good
Step.1.11.Var.3.Name = acc_csc_011_ds004
Step.1.11.Var.3.Param = 28 21 70 20 100
Step.1.11.Var.3.Result = bad
Step.1.11.Var.3.ResDate = 1782803781
Step.1.11.Var.3.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_011_141613.erg
Step.1.11.Var.3.Char.0.Ref = acc_csc_011_ActualDist
Step.1.11.Var.3.Char.0.Value = 999.0
Step.1.11.Var.3.Char.1.Ref = acc_csc_011_SafeDist
Step.1.11.Var.3.Char.1.Value = 64.28162307909176
Step.1.11.Var.3.Char.2.Ref = acc_csc_011_SafeDistViolated
Step.1.11.Var.3.Char.2.Value = 1.0
Step.1.11.Var.3.Char.3.Ref = acc_csc_011_TTC
Step.1.11.Var.3.Char.3.Value = 0.0
Step.1.11.Var.3.Char.4.Ref = acc_csc_011_TTCWarnEver
Step.1.11.Var.3.Char.4.Value = 0.0
Step.1.11.Var.3.Char.5.Ref = acc_csc_011_TTCBadEver
Step.1.11.Var.3.Char.5.Value = 0.0
Step.1.11.Var.3.Char.6.Ref = acc_csc_011_ComfortAx
Step.1.11.Var.3.Char.6.Value = 0.0411745811854729
Step.1.11.Var.3.Char.7.Ref = acc_csc_011_ComfortAxOutOfBoundEver
Step.1.11.Var.3.Char.7.Value = 1.0
Step.1.11.Var.3.Char.8.Ref = acc_csc_011_EmergencyAx
Step.1.11.Var.3.Char.8.Value = 0.0411745811854729
Step.1.11.Var.3.Char.9.Ref = acc_csc_011_EmergencyAxOutOfBoundEver
Step.1.11.Var.3.Char.9.Value = 0.0
Step.1.11.Var.3.Char.10.Ref = acc_csc_011_Jerk
Step.1.11.Var.3.Char.10.Value = 0.0037657515832794143
Step.1.11.Var.3.Char.11.Ref = acc_csc_011_JerkOverLimitEver
Step.1.11.Var.3.Char.11.Value = 1.0
Step.1.11.Var.3.Char.12.Ref = acc_csc_011_NoCollDist
Step.1.11.Var.3.Char.12.Value = 999.0
Step.1.11.Var.3.Char.13.Ref = acc_csc_011_NoCollDistViolatedEver
Step.1.11.Var.3.Char.13.Value = 0.0
Step.1.11.Var.3.Char.14.Ref = acc_csc_011_CollisionFlag
Step.1.11.Var.3.Char.14.Value = 0.0
Step.1.11.Var.3.Char.15.Ref = acc_csc_011_ImpactSpeed
Step.1.11.Var.3.Char.15.Value = 0.0
Step.1.11.Var.3.Char.16.Ref = acc_csc_011_CollisionEver
Step.1.11.Var.3.Char.16.Value = 0.0
Step.1.11.Var.3.Crit.0.Ref = acc_csc_011 - Safe Distance Consistency
Step.1.11.Var.3.Crit.0.Result = bad
Step.1.11.Var.3.Crit.1.Ref = acc_csc_011 - Time To Collision
Step.1.11.Var.3.Crit.1.Result = good
Step.1.11.Var.3.Crit.2.Ref = acc_csc_011 - Comfort Deceleration Limit
Step.1.11.Var.3.Crit.2.Result = bad
Step.1.11.Var.3.Crit.3.Ref = acc_csc_011 - Emergency Deceleration Bound
Step.1.11.Var.3.Crit.3.Result = good
Step.1.11.Var.3.Crit.4.Ref = acc_csc_011 - Jerk Limit
Step.1.11.Var.3.Crit.4.Result = bad
Step.1.11.Var.3.Crit.5.Ref = acc_csc_011 - No Collision Distance
Step.1.11.Var.3.Crit.5.Result = good
Step.1.11.Var.3.Crit.6.Ref = acc_csc_011 - Collision Flag
Step.1.11.Var.3.Crit.6.Result = good
Step.1.11.Var.3.Crit.7.Ref = acc_csc_011 - Impact Speed
Step.1.11.Var.3.Crit.7.Result = good
Step.1.11.Var.4.Name = acc_csc_011_ds005
Step.1.11.Var.4.Param = 30 22 75 21 105
Step.1.11.Var.4.Result = bad
Step.1.11.Var.4.ResDate = 1782803793
Step.1.11.Var.4.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_011_141625.erg
Step.1.11.Var.4.Char.0.Ref = acc_csc_011_ActualDist
Step.1.11.Var.4.Char.0.Value = 999.0
Step.1.11.Var.4.Char.1.Ref = acc_csc_011_SafeDist
Step.1.11.Var.4.Char.1.Value = 68.85113245665268
Step.1.11.Var.4.Char.2.Ref = acc_csc_011_SafeDistViolated
Step.1.11.Var.4.Char.2.Value = 1.0
Step.1.11.Var.4.Char.3.Ref = acc_csc_011_TTC
Step.1.11.Var.4.Char.3.Value = 0.0
Step.1.11.Var.4.Char.4.Ref = acc_csc_011_TTCWarnEver
Step.1.11.Var.4.Char.4.Value = 0.0
Step.1.11.Var.4.Char.5.Ref = acc_csc_011_TTCBadEver
Step.1.11.Var.4.Char.5.Value = 0.0
Step.1.11.Var.4.Char.6.Ref = acc_csc_011_ComfortAx
Step.1.11.Var.4.Char.6.Value = 0.051780015077329725
Step.1.11.Var.4.Char.7.Ref = acc_csc_011_ComfortAxOutOfBoundEver
Step.1.11.Var.4.Char.7.Value = 1.0
Step.1.11.Var.4.Char.8.Ref = acc_csc_011_EmergencyAx
Step.1.11.Var.4.Char.8.Value = 0.051780015077329725
Step.1.11.Var.4.Char.9.Ref = acc_csc_011_EmergencyAxOutOfBoundEver
Step.1.11.Var.4.Char.9.Value = 0.0
Step.1.11.Var.4.Char.10.Ref = acc_csc_011_Jerk
Step.1.11.Var.4.Char.10.Value = 0.019419918498939943
Step.1.11.Var.4.Char.11.Ref = acc_csc_011_JerkOverLimitEver
Step.1.11.Var.4.Char.11.Value = 1.0
Step.1.11.Var.4.Char.12.Ref = acc_csc_011_NoCollDist
Step.1.11.Var.4.Char.12.Value = 999.0
Step.1.11.Var.4.Char.13.Ref = acc_csc_011_NoCollDistViolatedEver
Step.1.11.Var.4.Char.13.Value = 0.0
Step.1.11.Var.4.Char.14.Ref = acc_csc_011_CollisionFlag
Step.1.11.Var.4.Char.14.Value = 0.0
Step.1.11.Var.4.Char.15.Ref = acc_csc_011_ImpactSpeed
Step.1.11.Var.4.Char.15.Value = 0.0
Step.1.11.Var.4.Char.16.Ref = acc_csc_011_CollisionEver
Step.1.11.Var.4.Char.16.Value = 0.0
Step.1.11.Var.4.Crit.0.Ref = acc_csc_011 - Safe Distance Consistency
Step.1.11.Var.4.Crit.0.Result = bad
Step.1.11.Var.4.Crit.1.Ref = acc_csc_011 - Time To Collision
Step.1.11.Var.4.Crit.1.Result = good
Step.1.11.Var.4.Crit.2.Ref = acc_csc_011 - Comfort Deceleration Limit
Step.1.11.Var.4.Crit.2.Result = bad
Step.1.11.Var.4.Crit.3.Ref = acc_csc_011 - Emergency Deceleration Bound
Step.1.11.Var.4.Crit.3.Result = good
Step.1.11.Var.4.Crit.4.Ref = acc_csc_011 - Jerk Limit
Step.1.11.Var.4.Crit.4.Result = bad
Step.1.11.Var.4.Crit.5.Ref = acc_csc_011 - No Collision Distance
Step.1.11.Var.4.Crit.5.Result = good
Step.1.11.Var.4.Crit.6.Ref = acc_csc_011 - Collision Flag
Step.1.11.Var.4.Crit.6.Result = good
Step.1.11.Var.4.Crit.7.Ref = acc_csc_011 - Impact Speed
Step.1.11.Var.4.Crit.7.Result = good
Step.1.12 = TestRun
Step.1.12.Name = OSC_Imported/longitudinal_feature/ACC/acc_csc_012
Step.1.12.Param.0 = EgoSpeed NValue
Step.1.12.Param.1 = TV1Speed NValue
Step.1.12.Param.2 = TV1_initPos NValue
Step.1.12.Param.3 = TV2Speed NValue
Step.1.12.Param.4 = TV2_initPos NValue
Step.1.12.Char.0.Name = acc_csc_012_ActualDist
Step.1.12.Char.0.Description:
	Actual distance to lead (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.12.Char.0.Identifier = acc_csc_012_ActualDist
Step.1.12.Char.0.Unit =
Step.1.12.Char.0.Param.0 = RTexpr "Qu::acc_csc_012_ActualDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.12.Char.1.Name = acc_csc_012_SafeDist
Step.1.12.Char.1.Description:
	Reference safe distance (signal=FMU.CM_ACCController_V17.Out.Debug.SafeDistance)
Step.1.12.Char.1.Identifier = acc_csc_012_SafeDist
Step.1.12.Char.1.Unit =
Step.1.12.Char.1.Param.0 = RTexpr "Qu::acc_csc_012_SafeDist=FMU.CM_ACCController_V17.Out.Debug.SafeDistance"
Step.1.12.Char.2.Name = acc_csc_012_SafeDistViolated
Step.1.12.Char.2.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment ActualDist<SafeDist while actively following (gate==1); stays 1 for the rest of the run even if distance recovers.
Step.1.12.Char.2.Identifier = acc_csc_012_SafeDistViolated
Step.1.12.Char.2.Unit =
Step.1.12.Char.2.Param.0 = RTexpr {first()?Qu::acc_csc_012_SafeDistViolated=0:acc_csc_012_SafeDistViolated=max(acc_csc_012_SafeDistViolated,(FMU.CM_ACCController_V17.Out.Debug.Fusion.Active==1 && acc_csc_012_ActualDist<acc_csc_012_SafeDist))}
Step.1.12.Char.3.Name = acc_csc_012_TTC
Step.1.12.Char.3.Description:
	Time-to-collision (signal=AccelCtrl.ACC.Time2Collision)
Step.1.12.Char.3.Identifier = acc_csc_012_TTC
Step.1.12.Char.3.Unit =
Step.1.12.Char.3.Param.0 = RTexpr "Qu::acc_csc_012_TTC=AccelCtrl.ACC.Time2Collision"
Step.1.12.Char.4.Name = acc_csc_012_TTCWarnEver
Step.1.12.Char.4.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the warn zone [3.5,11)s.
Step.1.12.Char.4.Identifier = acc_csc_012_TTCWarnEver
Step.1.12.Char.4.Unit =
Step.1.12.Char.4.Param.0 = RTexpr {first()?Qu::acc_csc_012_TTCWarnEver=0:acc_csc_012_TTCWarnEver=max(acc_csc_012_TTCWarnEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_012_TTC>=3.5 && acc_csc_012_TTC<11))}
Step.1.12.Char.5.Name = acc_csc_012_TTCBadEver
Step.1.12.Char.5.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the bad zone (0,3.5)s.
Step.1.12.Char.5.Identifier = acc_csc_012_TTCBadEver
Step.1.12.Char.5.Unit =
Step.1.12.Char.5.Param.0 = RTexpr {first()?Qu::acc_csc_012_TTCBadEver=0:acc_csc_012_TTCBadEver=max(acc_csc_012_TTCBadEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_012_TTC>0 && acc_csc_012_TTC<3.5))}
Step.1.12.Char.6.Name = acc_csc_012_ComfortAx
Step.1.12.Char.6.Description:
	Comfort Deceleration Limit (signal=AccelCtrl.DesiredAx)
Step.1.12.Char.6.Identifier = acc_csc_012_ComfortAx
Step.1.12.Char.6.Unit =
Step.1.12.Char.6.Param.0 = RTexpr "Qu::acc_csc_012_ComfortAx=AccelCtrl.DesiredAx"
Step.1.12.Char.7.Name = acc_csc_012_ComfortAxOutOfBoundEver
Step.1.12.Char.7.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Comfort Deceleration Limit ever goes out of bound (min=-3, max=2.8).
Step.1.12.Char.7.Identifier = acc_csc_012_ComfortAxOutOfBoundEver
Step.1.12.Char.7.Unit =
Step.1.12.Char.7.Param.0 = RTexpr {first()?Qu::acc_csc_012_ComfortAxOutOfBoundEver=0:acc_csc_012_ComfortAxOutOfBoundEver=max(acc_csc_012_ComfortAxOutOfBoundEver,(acc_csc_012_ComfortAx<-3 || acc_csc_012_ComfortAx>2.8))}
Step.1.12.Char.8.Name = acc_csc_012_EmergencyAx
Step.1.12.Char.8.Description:
	Emergency Deceleration Bound (signal=AccelCtrl.DesiredAx)
Step.1.12.Char.8.Identifier = acc_csc_012_EmergencyAx
Step.1.12.Char.8.Unit =
Step.1.12.Char.8.Param.0 = RTexpr "Qu::acc_csc_012_EmergencyAx=AccelCtrl.DesiredAx"
Step.1.12.Char.9.Name = acc_csc_012_EmergencyAxOutOfBoundEver
Step.1.12.Char.9.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Emergency Deceleration Bound ever goes out of bound (min=-6).
Step.1.12.Char.9.Identifier = acc_csc_012_EmergencyAxOutOfBoundEver
Step.1.12.Char.9.Unit =
Step.1.12.Char.9.Param.0 = RTexpr {first()?Qu::acc_csc_012_EmergencyAxOutOfBoundEver=0:acc_csc_012_EmergencyAxOutOfBoundEver=max(acc_csc_012_EmergencyAxOutOfBoundEver,(acc_csc_012_EmergencyAx<-6))}
Step.1.12.Char.10.Name = acc_csc_012_Jerk
Step.1.12.Char.10.Description:
	Jerk = |d(DesiredAx)/dt|, base signal=AccelCtrl.DesiredAx
Step.1.12.Char.10.Identifier = acc_csc_012_Jerk
Step.1.12.Char.10.Unit =
Step.1.12.Char.10.Param.0 = RTexpr "Qu::acc_csc_012_Jerk=abs(diff(AccelCtrl.DesiredAx,Time))"
Step.1.12.Char.11.Name = acc_csc_012_JerkOverLimitEver
Step.1.12.Char.11.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment |jerk| ever exceeds 4 m/s3.
Step.1.12.Char.11.Identifier = acc_csc_012_JerkOverLimitEver
Step.1.12.Char.11.Unit =
Step.1.12.Char.11.Param.0 = RTexpr {first()?Qu::acc_csc_012_JerkOverLimitEver=0:acc_csc_012_JerkOverLimitEver=max(acc_csc_012_JerkOverLimitEver,(acc_csc_012_Jerk>4))}
Step.1.12.Char.12.Name = acc_csc_012_NoCollDist
Step.1.12.Char.12.Description:
	Distance to nearest lead object (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.12.Char.12.Identifier = acc_csc_012_NoCollDist
Step.1.12.Char.12.Unit =
Step.1.12.Char.12.Param.0 = RTexpr "Qu::acc_csc_012_NoCollDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.12.Char.13.Name = acc_csc_012_NoCollDistViolatedEver
Step.1.12.Char.13.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment distance ever drops below 0m.
Step.1.12.Char.13.Identifier = acc_csc_012_NoCollDistViolatedEver
Step.1.12.Char.13.Unit =
Step.1.12.Char.13.Param.0 = RTexpr {first()?Qu::acc_csc_012_NoCollDistViolatedEver=0:acc_csc_012_NoCollDistViolatedEver=max(acc_csc_012_NoCollDistViolatedEver,(acc_csc_012_NoCollDist<0))}
Step.1.12.Char.14.Name = acc_csc_012_CollisionFlag
Step.1.12.Char.14.Description:
	Collision flag derived from FMU.CM_ACCController_V17.Out.Debug.Target.DistX <= 0 (nearest lead object); instantaneous, used as the latch() trigger for ImpactSpeed below.
Step.1.12.Char.14.Identifier = acc_csc_012_CollisionFlag
Step.1.12.Char.14.Unit =
Step.1.12.Char.14.Param.0 = RTexpr "Qu::acc_csc_012_CollisionFlag=(FMU.CM_ACCController_V17.Out.Debug.Target.DistX<=0)"
Step.1.12.Char.15.Name = acc_csc_012_ImpactSpeed
Step.1.12.Char.15.Description:
	Ego speed latched at moment of first collision (nearest lead object)
Step.1.12.Char.15.Identifier = acc_csc_012_ImpactSpeed
Step.1.12.Char.15.Unit =
Step.1.12.Char.15.Param.0 = RTexpr {Qu::acc_csc_012_ImpactSpeed=latch(Speed("Ego"),Qu::acc_csc_012_CollisionFlag==1)}
Step.1.12.Char.16.Name = acc_csc_012_CollisionEver
Step.1.12.Char.16.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment a collision ever occurs (nearest lead object), even if the vehicles separate again before the run ends.
Step.1.12.Char.16.Identifier = acc_csc_012_CollisionEver
Step.1.12.Char.16.Unit =
Step.1.12.Char.16.Param.0 = RTexpr {first()?Qu::acc_csc_012_CollisionEver=0:acc_csc_012_CollisionEver=max(acc_csc_012_CollisionEver,(acc_csc_012_CollisionFlag==1))}
Step.1.12.Crit.0.Name = acc_csc_012 - Safe Distance Consistency
Step.1.12.Crit.0.Description:
	Good if SafeDist was never violated while actively following throughout the run. Bad if it was violated at any point.
Step.1.12.Crit.0.Good = [get acc_csc_012_SafeDistViolated] == 0
Step.1.12.Crit.0.Warn =
Step.1.12.Crit.0.Bad = [get acc_csc_012_SafeDistViolated] == 1
Step.1.12.Crit.1.Name = acc_csc_012 - Time To Collision
Step.1.12.Crit.1.Description:
	Good if TTC never entered the warn/bad zone while a valid target existed throughout the run. Warn if it ever entered [3.5,11)s. Bad if it ever entered (0,3.5)s.
Step.1.12.Crit.1.Good = [get acc_csc_012_TTCBadEver] == 0 && [get acc_csc_012_TTCWarnEver] == 0
Step.1.12.Crit.1.Warn = [get acc_csc_012_TTCBadEver] == 0 && [get acc_csc_012_TTCWarnEver] == 1
Step.1.12.Crit.1.Bad = [get acc_csc_012_TTCBadEver] == 1
Step.1.12.Crit.2.Name = acc_csc_012 - Comfort Deceleration Limit
Step.1.12.Crit.2.Description:
	Good if Comfort Deceleration Limit never went out of bound (min=-3, max=2.8) throughout the run.
Step.1.12.Crit.2.Good = [get acc_csc_012_ComfortAxOutOfBoundEver] == 0
Step.1.12.Crit.2.Warn =
Step.1.12.Crit.2.Bad = [get acc_csc_012_ComfortAxOutOfBoundEver] == 1
Step.1.12.Crit.3.Name = acc_csc_012 - Emergency Deceleration Bound
Step.1.12.Crit.3.Description:
	Good if Emergency Deceleration Bound never went out of bound (min=-6) throughout the run.
Step.1.12.Crit.3.Good = [get acc_csc_012_EmergencyAxOutOfBoundEver] == 0
Step.1.12.Crit.3.Warn =
Step.1.12.Crit.3.Bad = [get acc_csc_012_EmergencyAxOutOfBoundEver] == 1
Step.1.12.Crit.4.Name = acc_csc_012 - Jerk Limit
Step.1.12.Crit.4.Description:
	Good if |jerk| never exceeded 4 m/s3 throughout the run.
Step.1.12.Crit.4.Good = [get acc_csc_012_JerkOverLimitEver] == 0
Step.1.12.Crit.4.Warn =
Step.1.12.Crit.4.Bad = [get acc_csc_012_JerkOverLimitEver] == 1
Step.1.12.Crit.5.Name = acc_csc_012 - No Collision Distance
Step.1.12.Crit.5.Description:
	Good if distance never dropped below 0m throughout the run.
Step.1.12.Crit.5.Good = [get acc_csc_012_NoCollDistViolatedEver] == 0
Step.1.12.Crit.5.Warn =
Step.1.12.Crit.5.Bad = [get acc_csc_012_NoCollDistViolatedEver] == 1
Step.1.12.Crit.6.Name = acc_csc_012 - Collision Flag
Step.1.12.Crit.6.Description:
	Good if no collision ever occurred (nearest lead object) throughout the run.
Step.1.12.Crit.6.Good = [get acc_csc_012_CollisionEver] == 0
Step.1.12.Crit.6.Warn =
Step.1.12.Crit.6.Bad = [get acc_csc_012_CollisionEver] == 1
Step.1.12.Crit.7.Name = acc_csc_012 - Impact Speed
Step.1.12.Crit.7.Description:
	Good if no collision ever occurred, or impact speed = 0; Warn (0,5) m/s; Bad >= 5 m/s
Step.1.12.Crit.7.Good = [get acc_csc_012_CollisionEver] == 0 || [get acc_csc_012_ImpactSpeed] == 0
Step.1.12.Crit.7.Warn = [get acc_csc_012_CollisionEver] == 1 && [get acc_csc_012_ImpactSpeed] > 0 && [get acc_csc_012_ImpactSpeed] < 5
Step.1.12.Crit.7.Bad = [get acc_csc_012_CollisionEver] == 1 && [get acc_csc_012_ImpactSpeed] >= 5
Step.1.12.Var.0.Name = acc_csc_012_ds001
Step.1.12.Var.0.Param = 5 3 33 0 65
Step.1.12.Var.0.Result = bad
Step.1.12.Var.0.ResDate = 1782803807
Step.1.12.Var.0.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_012_141638.erg
Step.1.12.Var.0.Char.0.Ref = acc_csc_012_ActualDist
Step.1.12.Var.0.Char.0.Value = 999.0
Step.1.12.Var.0.Char.1.Ref = acc_csc_012_SafeDist
Step.1.12.Var.0.Char.1.Value = 15.0
Step.1.12.Var.0.Char.2.Ref = acc_csc_012_SafeDistViolated
Step.1.12.Var.0.Char.2.Value = 1.0
Step.1.12.Var.0.Char.3.Ref = acc_csc_012_TTC
Step.1.12.Var.0.Char.3.Value = 0.0
Step.1.12.Var.0.Char.4.Ref = acc_csc_012_TTCWarnEver
Step.1.12.Var.0.Char.4.Value = 0.0
Step.1.12.Var.0.Char.5.Ref = acc_csc_012_TTCBadEver
Step.1.12.Var.0.Char.5.Value = 0.0
Step.1.12.Var.0.Char.6.Ref = acc_csc_012_ComfortAx
Step.1.12.Var.0.Char.6.Value = -0.004
Step.1.12.Var.0.Char.7.Ref = acc_csc_012_ComfortAxOutOfBoundEver
Step.1.12.Var.0.Char.7.Value = 1.0
Step.1.12.Var.0.Char.8.Ref = acc_csc_012_EmergencyAx
Step.1.12.Var.0.Char.8.Value = -0.004
Step.1.12.Var.0.Char.9.Ref = acc_csc_012_EmergencyAxOutOfBoundEver
Step.1.12.Var.0.Char.9.Value = 0.0
Step.1.12.Var.0.Char.10.Ref = acc_csc_012_Jerk
Step.1.12.Var.0.Char.10.Value = 0.0
Step.1.12.Var.0.Char.11.Ref = acc_csc_012_JerkOverLimitEver
Step.1.12.Var.0.Char.11.Value = 1.0
Step.1.12.Var.0.Char.12.Ref = acc_csc_012_NoCollDist
Step.1.12.Var.0.Char.12.Value = 999.0
Step.1.12.Var.0.Char.13.Ref = acc_csc_012_NoCollDistViolatedEver
Step.1.12.Var.0.Char.13.Value = 0.0
Step.1.12.Var.0.Char.14.Ref = acc_csc_012_CollisionFlag
Step.1.12.Var.0.Char.14.Value = 0.0
Step.1.12.Var.0.Char.15.Ref = acc_csc_012_ImpactSpeed
Step.1.12.Var.0.Char.15.Value = 0.0
Step.1.12.Var.0.Char.16.Ref = acc_csc_012_CollisionEver
Step.1.12.Var.0.Char.16.Value = 0.0
Step.1.12.Var.0.Crit.0.Ref = acc_csc_012 - Safe Distance Consistency
Step.1.12.Var.0.Crit.0.Result = bad
Step.1.12.Var.0.Crit.1.Ref = acc_csc_012 - Time To Collision
Step.1.12.Var.0.Crit.1.Result = good
Step.1.12.Var.0.Crit.2.Ref = acc_csc_012 - Comfort Deceleration Limit
Step.1.12.Var.0.Crit.2.Result = bad
Step.1.12.Var.0.Crit.3.Ref = acc_csc_012 - Emergency Deceleration Bound
Step.1.12.Var.0.Crit.3.Result = good
Step.1.12.Var.0.Crit.4.Ref = acc_csc_012 - Jerk Limit
Step.1.12.Var.0.Crit.4.Result = bad
Step.1.12.Var.0.Crit.5.Ref = acc_csc_012 - No Collision Distance
Step.1.12.Var.0.Crit.5.Result = good
Step.1.12.Var.0.Crit.6.Ref = acc_csc_012 - Collision Flag
Step.1.12.Var.0.Crit.6.Result = good
Step.1.12.Var.0.Crit.7.Ref = acc_csc_012 - Impact Speed
Step.1.12.Var.0.Crit.7.Result = good
Step.1.12.Var.1.Name = acc_csc_012_ds002
Step.1.12.Var.1.Param = 7 5 40 0 83
Step.1.12.Var.1.Result = bad
Step.1.12.Var.1.ResDate = 1782803819
Step.1.12.Var.1.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_012_141651.erg
Step.1.12.Var.1.Char.0.Ref = acc_csc_012_ActualDist
Step.1.12.Var.1.Char.0.Value = 999.0
Step.1.12.Var.1.Char.1.Ref = acc_csc_012_SafeDist
Step.1.12.Var.1.Char.1.Value = 16.484816771649218
Step.1.12.Var.1.Char.2.Ref = acc_csc_012_SafeDistViolated
Step.1.12.Var.1.Char.2.Value = 1.0
Step.1.12.Var.1.Char.3.Ref = acc_csc_012_TTC
Step.1.12.Var.1.Char.3.Value = 0.0
Step.1.12.Var.1.Char.4.Ref = acc_csc_012_TTCWarnEver
Step.1.12.Var.1.Char.4.Value = 0.0
Step.1.12.Var.1.Char.5.Ref = acc_csc_012_TTCBadEver
Step.1.12.Var.1.Char.5.Value = 0.0
Step.1.12.Var.1.Char.6.Ref = acc_csc_012_ComfortAx
Step.1.12.Var.1.Char.6.Value = -0.004
Step.1.12.Var.1.Char.7.Ref = acc_csc_012_ComfortAxOutOfBoundEver
Step.1.12.Var.1.Char.7.Value = 1.0
Step.1.12.Var.1.Char.8.Ref = acc_csc_012_EmergencyAx
Step.1.12.Var.1.Char.8.Value = -0.004
Step.1.12.Var.1.Char.9.Ref = acc_csc_012_EmergencyAxOutOfBoundEver
Step.1.12.Var.1.Char.9.Value = 0.0
Step.1.12.Var.1.Char.10.Ref = acc_csc_012_Jerk
Step.1.12.Var.1.Char.10.Value = 0.0
Step.1.12.Var.1.Char.11.Ref = acc_csc_012_JerkOverLimitEver
Step.1.12.Var.1.Char.11.Value = 1.0
Step.1.12.Var.1.Char.12.Ref = acc_csc_012_NoCollDist
Step.1.12.Var.1.Char.12.Value = 999.0
Step.1.12.Var.1.Char.13.Ref = acc_csc_012_NoCollDistViolatedEver
Step.1.12.Var.1.Char.13.Value = 0.0
Step.1.12.Var.1.Char.14.Ref = acc_csc_012_CollisionFlag
Step.1.12.Var.1.Char.14.Value = 0.0
Step.1.12.Var.1.Char.15.Ref = acc_csc_012_ImpactSpeed
Step.1.12.Var.1.Char.15.Value = 0.0
Step.1.12.Var.1.Char.16.Ref = acc_csc_012_CollisionEver
Step.1.12.Var.1.Char.16.Value = 0.0
Step.1.12.Var.1.Crit.0.Ref = acc_csc_012 - Safe Distance Consistency
Step.1.12.Var.1.Crit.0.Result = bad
Step.1.12.Var.1.Crit.1.Ref = acc_csc_012 - Time To Collision
Step.1.12.Var.1.Crit.1.Result = good
Step.1.12.Var.1.Crit.2.Ref = acc_csc_012 - Comfort Deceleration Limit
Step.1.12.Var.1.Crit.2.Result = bad
Step.1.12.Var.1.Crit.3.Ref = acc_csc_012 - Emergency Deceleration Bound
Step.1.12.Var.1.Crit.3.Result = good
Step.1.12.Var.1.Crit.4.Ref = acc_csc_012 - Jerk Limit
Step.1.12.Var.1.Crit.4.Result = bad
Step.1.12.Var.1.Crit.5.Ref = acc_csc_012 - No Collision Distance
Step.1.12.Var.1.Crit.5.Result = good
Step.1.12.Var.1.Crit.6.Ref = acc_csc_012 - Collision Flag
Step.1.12.Var.1.Crit.6.Result = good
Step.1.12.Var.1.Crit.7.Ref = acc_csc_012 - Impact Speed
Step.1.12.Var.1.Crit.7.Result = good
Step.1.12.Var.2.Name = acc_csc_012_ds003
Step.1.12.Var.2.Param = 10 7 47 0 100
Step.1.12.Var.2.Result = bad
Step.1.12.Var.2.ResDate = 1782803831
Step.1.12.Var.2.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_012_141703.erg
Step.1.12.Var.2.Char.0.Ref = acc_csc_012_ActualDist
Step.1.12.Var.2.Char.0.Value = 999.0
Step.1.12.Var.2.Char.1.Ref = acc_csc_012_SafeDist
Step.1.12.Var.2.Char.1.Value = 23.0000009141985
Step.1.12.Var.2.Char.2.Ref = acc_csc_012_SafeDistViolated
Step.1.12.Var.2.Char.2.Value = 1.0
Step.1.12.Var.2.Char.3.Ref = acc_csc_012_TTC
Step.1.12.Var.2.Char.3.Value = 0.0
Step.1.12.Var.2.Char.4.Ref = acc_csc_012_TTCWarnEver
Step.1.12.Var.2.Char.4.Value = 0.0
Step.1.12.Var.2.Char.5.Ref = acc_csc_012_TTCBadEver
Step.1.12.Var.2.Char.5.Value = 0.0
Step.1.12.Var.2.Char.6.Ref = acc_csc_012_ComfortAx
Step.1.12.Var.2.Char.6.Value = -3.1798208652844553e-7
Step.1.12.Var.2.Char.7.Ref = acc_csc_012_ComfortAxOutOfBoundEver
Step.1.12.Var.2.Char.7.Value = 1.0
Step.1.12.Var.2.Char.8.Ref = acc_csc_012_EmergencyAx
Step.1.12.Var.2.Char.8.Value = -3.1798208652844553e-7
Step.1.12.Var.2.Char.9.Ref = acc_csc_012_EmergencyAxOutOfBoundEver
Step.1.12.Var.2.Char.9.Value = 0.0
Step.1.12.Var.2.Char.10.Ref = acc_csc_012_Jerk
Step.1.12.Var.2.Char.10.Value = 4.591100832849952e-8
Step.1.12.Var.2.Char.11.Ref = acc_csc_012_JerkOverLimitEver
Step.1.12.Var.2.Char.11.Value = 1.0
Step.1.12.Var.2.Char.12.Ref = acc_csc_012_NoCollDist
Step.1.12.Var.2.Char.12.Value = 999.0
Step.1.12.Var.2.Char.13.Ref = acc_csc_012_NoCollDistViolatedEver
Step.1.12.Var.2.Char.13.Value = 0.0
Step.1.12.Var.2.Char.14.Ref = acc_csc_012_CollisionFlag
Step.1.12.Var.2.Char.14.Value = 0.0
Step.1.12.Var.2.Char.15.Ref = acc_csc_012_ImpactSpeed
Step.1.12.Var.2.Char.15.Value = 0.0
Step.1.12.Var.2.Char.16.Ref = acc_csc_012_CollisionEver
Step.1.12.Var.2.Char.16.Value = 0.0
Step.1.12.Var.2.Crit.0.Ref = acc_csc_012 - Safe Distance Consistency
Step.1.12.Var.2.Crit.0.Result = bad
Step.1.12.Var.2.Crit.1.Ref = acc_csc_012 - Time To Collision
Step.1.12.Var.2.Crit.1.Result = good
Step.1.12.Var.2.Crit.2.Ref = acc_csc_012 - Comfort Deceleration Limit
Step.1.12.Var.2.Crit.2.Result = bad
Step.1.12.Var.2.Crit.3.Ref = acc_csc_012 - Emergency Deceleration Bound
Step.1.12.Var.2.Crit.3.Result = good
Step.1.12.Var.2.Crit.4.Ref = acc_csc_012 - Jerk Limit
Step.1.12.Var.2.Crit.4.Result = bad
Step.1.12.Var.2.Crit.5.Ref = acc_csc_012 - No Collision Distance
Step.1.12.Var.2.Crit.5.Result = good
Step.1.12.Var.2.Crit.6.Ref = acc_csc_012 - Collision Flag
Step.1.12.Var.2.Crit.6.Result = good
Step.1.12.Var.2.Crit.7.Ref = acc_csc_012 - Impact Speed
Step.1.12.Var.2.Crit.7.Result = good
Step.1.12.Var.3.Name = acc_csc_012_ds004
Step.1.12.Var.3.Param = 12 9 54 0 115
Step.1.12.Var.3.Result = bad
Step.1.12.Var.3.ResDate = 1782803844
Step.1.12.Var.3.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_012_141715.erg
Step.1.12.Var.3.Char.0.Ref = acc_csc_012_ActualDist
Step.1.12.Var.3.Char.0.Value = 999.0
Step.1.12.Var.3.Char.1.Ref = acc_csc_012_SafeDist
Step.1.12.Var.3.Char.1.Value = 28.399969737421046
Step.1.12.Var.3.Char.2.Ref = acc_csc_012_SafeDistViolated
Step.1.12.Var.3.Char.2.Value = 1.0
Step.1.12.Var.3.Char.3.Ref = acc_csc_012_TTC
Step.1.12.Var.3.Char.3.Value = 0.0
Step.1.12.Var.3.Char.4.Ref = acc_csc_012_TTCWarnEver
Step.1.12.Var.3.Char.4.Value = 0.0
Step.1.12.Var.3.Char.5.Ref = acc_csc_012_TTCBadEver
Step.1.12.Var.3.Char.5.Value = 0.0
Step.1.12.Var.3.Char.6.Ref = acc_csc_012_ComfortAx
Step.1.12.Var.3.Char.6.Value = -0.004
Step.1.12.Var.3.Char.7.Ref = acc_csc_012_ComfortAxOutOfBoundEver
Step.1.12.Var.3.Char.7.Value = 1.0
Step.1.12.Var.3.Char.8.Ref = acc_csc_012_EmergencyAx
Step.1.12.Var.3.Char.8.Value = -0.004
Step.1.12.Var.3.Char.9.Ref = acc_csc_012_EmergencyAxOutOfBoundEver
Step.1.12.Var.3.Char.9.Value = 0.0
Step.1.12.Var.3.Char.10.Ref = acc_csc_012_Jerk
Step.1.12.Var.3.Char.10.Value = 0.0
Step.1.12.Var.3.Char.11.Ref = acc_csc_012_JerkOverLimitEver
Step.1.12.Var.3.Char.11.Value = 1.0
Step.1.12.Var.3.Char.12.Ref = acc_csc_012_NoCollDist
Step.1.12.Var.3.Char.12.Value = 999.0
Step.1.12.Var.3.Char.13.Ref = acc_csc_012_NoCollDistViolatedEver
Step.1.12.Var.3.Char.13.Value = 0.0
Step.1.12.Var.3.Char.14.Ref = acc_csc_012_CollisionFlag
Step.1.12.Var.3.Char.14.Value = 0.0
Step.1.12.Var.3.Char.15.Ref = acc_csc_012_ImpactSpeed
Step.1.12.Var.3.Char.15.Value = 0.0
Step.1.12.Var.3.Char.16.Ref = acc_csc_012_CollisionEver
Step.1.12.Var.3.Char.16.Value = 0.0
Step.1.12.Var.3.Crit.0.Ref = acc_csc_012 - Safe Distance Consistency
Step.1.12.Var.3.Crit.0.Result = bad
Step.1.12.Var.3.Crit.1.Ref = acc_csc_012 - Time To Collision
Step.1.12.Var.3.Crit.1.Result = good
Step.1.12.Var.3.Crit.2.Ref = acc_csc_012 - Comfort Deceleration Limit
Step.1.12.Var.3.Crit.2.Result = bad
Step.1.12.Var.3.Crit.3.Ref = acc_csc_012 - Emergency Deceleration Bound
Step.1.12.Var.3.Crit.3.Result = good
Step.1.12.Var.3.Crit.4.Ref = acc_csc_012 - Jerk Limit
Step.1.12.Var.3.Crit.4.Result = bad
Step.1.12.Var.3.Crit.5.Ref = acc_csc_012 - No Collision Distance
Step.1.12.Var.3.Crit.5.Result = good
Step.1.12.Var.3.Crit.6.Ref = acc_csc_012 - Collision Flag
Step.1.12.Var.3.Crit.6.Result = good
Step.1.12.Var.3.Crit.7.Ref = acc_csc_012 - Impact Speed
Step.1.12.Var.3.Crit.7.Result = good
Step.1.12.Var.4.Name = acc_csc_012_ds005
Step.1.12.Var.4.Param = 15 11 61 0 125
Step.1.12.Var.4.Result = bad
Step.1.12.Var.4.ResDate = 1782803856
Step.1.12.Var.4.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_012_141728.erg
Step.1.12.Var.4.Char.0.Ref = acc_csc_012_ActualDist
Step.1.12.Var.4.Char.0.Value = 999.0
Step.1.12.Var.4.Char.1.Ref = acc_csc_012_SafeDist
Step.1.12.Var.4.Char.1.Value = 35.05216099714767
Step.1.12.Var.4.Char.2.Ref = acc_csc_012_SafeDistViolated
Step.1.12.Var.4.Char.2.Value = 1.0
Step.1.12.Var.4.Char.3.Ref = acc_csc_012_TTC
Step.1.12.Var.4.Char.3.Value = 0.0
Step.1.12.Var.4.Char.4.Ref = acc_csc_012_TTCWarnEver
Step.1.12.Var.4.Char.4.Value = 0.0
Step.1.12.Var.4.Char.5.Ref = acc_csc_012_TTCBadEver
Step.1.12.Var.4.Char.5.Value = 0.0
Step.1.12.Var.4.Char.6.Ref = acc_csc_012_ComfortAx
Step.1.12.Var.4.Char.6.Value = -0.004
Step.1.12.Var.4.Char.7.Ref = acc_csc_012_ComfortAxOutOfBoundEver
Step.1.12.Var.4.Char.7.Value = 1.0
Step.1.12.Var.4.Char.8.Ref = acc_csc_012_EmergencyAx
Step.1.12.Var.4.Char.8.Value = -0.004
Step.1.12.Var.4.Char.9.Ref = acc_csc_012_EmergencyAxOutOfBoundEver
Step.1.12.Var.4.Char.9.Value = 0.0
Step.1.12.Var.4.Char.10.Ref = acc_csc_012_Jerk
Step.1.12.Var.4.Char.10.Value = 0.0
Step.1.12.Var.4.Char.11.Ref = acc_csc_012_JerkOverLimitEver
Step.1.12.Var.4.Char.11.Value = 1.0
Step.1.12.Var.4.Char.12.Ref = acc_csc_012_NoCollDist
Step.1.12.Var.4.Char.12.Value = 999.0
Step.1.12.Var.4.Char.13.Ref = acc_csc_012_NoCollDistViolatedEver
Step.1.12.Var.4.Char.13.Value = 0.0
Step.1.12.Var.4.Char.14.Ref = acc_csc_012_CollisionFlag
Step.1.12.Var.4.Char.14.Value = 0.0
Step.1.12.Var.4.Char.15.Ref = acc_csc_012_ImpactSpeed
Step.1.12.Var.4.Char.15.Value = 0.0
Step.1.12.Var.4.Char.16.Ref = acc_csc_012_CollisionEver
Step.1.12.Var.4.Char.16.Value = 0.0
Step.1.12.Var.4.Crit.0.Ref = acc_csc_012 - Safe Distance Consistency
Step.1.12.Var.4.Crit.0.Result = bad
Step.1.12.Var.4.Crit.1.Ref = acc_csc_012 - Time To Collision
Step.1.12.Var.4.Crit.1.Result = good
Step.1.12.Var.4.Crit.2.Ref = acc_csc_012 - Comfort Deceleration Limit
Step.1.12.Var.4.Crit.2.Result = bad
Step.1.12.Var.4.Crit.3.Ref = acc_csc_012 - Emergency Deceleration Bound
Step.1.12.Var.4.Crit.3.Result = good
Step.1.12.Var.4.Crit.4.Ref = acc_csc_012 - Jerk Limit
Step.1.12.Var.4.Crit.4.Result = bad
Step.1.12.Var.4.Crit.5.Ref = acc_csc_012 - No Collision Distance
Step.1.12.Var.4.Crit.5.Result = good
Step.1.12.Var.4.Crit.6.Ref = acc_csc_012 - Collision Flag
Step.1.12.Var.4.Crit.6.Result = good
Step.1.12.Var.4.Crit.7.Ref = acc_csc_012 - Impact Speed
Step.1.12.Var.4.Crit.7.Result = good
Step.1.13 = TestRun
Step.1.13.Name = OSC_Imported/longitudinal_feature/ACC/acc_csc_013
Step.1.13.Param.0 = EgoSpeed NValue
Step.1.13.Param.1 = TV1Speed NValue
Step.1.13.Param.2 = TV1_initPos NValue
Step.1.13.Param.3 = TV2Speed NValue
Step.1.13.Param.4 = TV2_initPos NValue
Step.1.13.Char.0.Name = acc_csc_013_ActualDist
Step.1.13.Char.0.Description:
	Actual distance to lead (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.13.Char.0.Identifier = acc_csc_013_ActualDist
Step.1.13.Char.0.Unit =
Step.1.13.Char.0.Param.0 = RTexpr "Qu::acc_csc_013_ActualDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.13.Char.1.Name = acc_csc_013_SafeDist
Step.1.13.Char.1.Description:
	Reference safe distance (signal=FMU.CM_ACCController_V17.Out.Debug.SafeDistance)
Step.1.13.Char.1.Identifier = acc_csc_013_SafeDist
Step.1.13.Char.1.Unit =
Step.1.13.Char.1.Param.0 = RTexpr "Qu::acc_csc_013_SafeDist=FMU.CM_ACCController_V17.Out.Debug.SafeDistance"
Step.1.13.Char.2.Name = acc_csc_013_SafeDistViolated
Step.1.13.Char.2.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment ActualDist<SafeDist while actively following (gate==1); stays 1 for the rest of the run even if distance recovers.
Step.1.13.Char.2.Identifier = acc_csc_013_SafeDistViolated
Step.1.13.Char.2.Unit =
Step.1.13.Char.2.Param.0 = RTexpr {first()?Qu::acc_csc_013_SafeDistViolated=0:acc_csc_013_SafeDistViolated=max(acc_csc_013_SafeDistViolated,(FMU.CM_ACCController_V17.Out.Debug.Fusion.Active==1 && acc_csc_013_ActualDist<acc_csc_013_SafeDist))}
Step.1.13.Char.3.Name = acc_csc_013_TTC
Step.1.13.Char.3.Description:
	Time-to-collision (signal=AccelCtrl.ACC.Time2Collision)
Step.1.13.Char.3.Identifier = acc_csc_013_TTC
Step.1.13.Char.3.Unit =
Step.1.13.Char.3.Param.0 = RTexpr "Qu::acc_csc_013_TTC=AccelCtrl.ACC.Time2Collision"
Step.1.13.Char.4.Name = acc_csc_013_TTCWarnEver
Step.1.13.Char.4.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the warn zone [3.5,11)s.
Step.1.13.Char.4.Identifier = acc_csc_013_TTCWarnEver
Step.1.13.Char.4.Unit =
Step.1.13.Char.4.Param.0 = RTexpr {first()?Qu::acc_csc_013_TTCWarnEver=0:acc_csc_013_TTCWarnEver=max(acc_csc_013_TTCWarnEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_013_TTC>=3.5 && acc_csc_013_TTC<11))}
Step.1.13.Char.5.Name = acc_csc_013_TTCBadEver
Step.1.13.Char.5.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the bad zone (0,3.5)s.
Step.1.13.Char.5.Identifier = acc_csc_013_TTCBadEver
Step.1.13.Char.5.Unit =
Step.1.13.Char.5.Param.0 = RTexpr {first()?Qu::acc_csc_013_TTCBadEver=0:acc_csc_013_TTCBadEver=max(acc_csc_013_TTCBadEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_013_TTC>0 && acc_csc_013_TTC<3.5))}
Step.1.13.Char.6.Name = acc_csc_013_ComfortAx
Step.1.13.Char.6.Description:
	Comfort Deceleration Limit (signal=AccelCtrl.DesiredAx)
Step.1.13.Char.6.Identifier = acc_csc_013_ComfortAx
Step.1.13.Char.6.Unit =
Step.1.13.Char.6.Param.0 = RTexpr "Qu::acc_csc_013_ComfortAx=AccelCtrl.DesiredAx"
Step.1.13.Char.7.Name = acc_csc_013_ComfortAxOutOfBoundEver
Step.1.13.Char.7.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Comfort Deceleration Limit ever goes out of bound (min=-3, max=2.8).
Step.1.13.Char.7.Identifier = acc_csc_013_ComfortAxOutOfBoundEver
Step.1.13.Char.7.Unit =
Step.1.13.Char.7.Param.0 = RTexpr {first()?Qu::acc_csc_013_ComfortAxOutOfBoundEver=0:acc_csc_013_ComfortAxOutOfBoundEver=max(acc_csc_013_ComfortAxOutOfBoundEver,(acc_csc_013_ComfortAx<-3 || acc_csc_013_ComfortAx>2.8))}
Step.1.13.Char.8.Name = acc_csc_013_EmergencyAx
Step.1.13.Char.8.Description:
	Emergency Deceleration Bound (signal=AccelCtrl.DesiredAx)
Step.1.13.Char.8.Identifier = acc_csc_013_EmergencyAx
Step.1.13.Char.8.Unit =
Step.1.13.Char.8.Param.0 = RTexpr "Qu::acc_csc_013_EmergencyAx=AccelCtrl.DesiredAx"
Step.1.13.Char.9.Name = acc_csc_013_EmergencyAxOutOfBoundEver
Step.1.13.Char.9.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Emergency Deceleration Bound ever goes out of bound (min=-6).
Step.1.13.Char.9.Identifier = acc_csc_013_EmergencyAxOutOfBoundEver
Step.1.13.Char.9.Unit =
Step.1.13.Char.9.Param.0 = RTexpr {first()?Qu::acc_csc_013_EmergencyAxOutOfBoundEver=0:acc_csc_013_EmergencyAxOutOfBoundEver=max(acc_csc_013_EmergencyAxOutOfBoundEver,(acc_csc_013_EmergencyAx<-6))}
Step.1.13.Char.10.Name = acc_csc_013_Jerk
Step.1.13.Char.10.Description:
	Jerk = |d(DesiredAx)/dt|, base signal=AccelCtrl.DesiredAx
Step.1.13.Char.10.Identifier = acc_csc_013_Jerk
Step.1.13.Char.10.Unit =
Step.1.13.Char.10.Param.0 = RTexpr "Qu::acc_csc_013_Jerk=abs(diff(AccelCtrl.DesiredAx,Time))"
Step.1.13.Char.11.Name = acc_csc_013_JerkOverLimitEver
Step.1.13.Char.11.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment |jerk| ever exceeds 4 m/s3.
Step.1.13.Char.11.Identifier = acc_csc_013_JerkOverLimitEver
Step.1.13.Char.11.Unit =
Step.1.13.Char.11.Param.0 = RTexpr {first()?Qu::acc_csc_013_JerkOverLimitEver=0:acc_csc_013_JerkOverLimitEver=max(acc_csc_013_JerkOverLimitEver,(acc_csc_013_Jerk>4))}
Step.1.13.Char.12.Name = acc_csc_013_NoCollDist
Step.1.13.Char.12.Description:
	Distance to nearest lead object (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.13.Char.12.Identifier = acc_csc_013_NoCollDist
Step.1.13.Char.12.Unit =
Step.1.13.Char.12.Param.0 = RTexpr "Qu::acc_csc_013_NoCollDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.13.Char.13.Name = acc_csc_013_NoCollDistViolatedEver
Step.1.13.Char.13.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment distance ever drops below 0m.
Step.1.13.Char.13.Identifier = acc_csc_013_NoCollDistViolatedEver
Step.1.13.Char.13.Unit =
Step.1.13.Char.13.Param.0 = RTexpr {first()?Qu::acc_csc_013_NoCollDistViolatedEver=0:acc_csc_013_NoCollDistViolatedEver=max(acc_csc_013_NoCollDistViolatedEver,(acc_csc_013_NoCollDist<0))}
Step.1.13.Char.14.Name = acc_csc_013_CollisionFlag
Step.1.13.Char.14.Description:
	Collision flag derived from FMU.CM_ACCController_V17.Out.Debug.Target.DistX <= 0 (nearest lead object); instantaneous, used as the latch() trigger for ImpactSpeed below.
Step.1.13.Char.14.Identifier = acc_csc_013_CollisionFlag
Step.1.13.Char.14.Unit =
Step.1.13.Char.14.Param.0 = RTexpr "Qu::acc_csc_013_CollisionFlag=(FMU.CM_ACCController_V17.Out.Debug.Target.DistX<=0)"
Step.1.13.Char.15.Name = acc_csc_013_ImpactSpeed
Step.1.13.Char.15.Description:
	Ego speed latched at moment of first collision (nearest lead object)
Step.1.13.Char.15.Identifier = acc_csc_013_ImpactSpeed
Step.1.13.Char.15.Unit =
Step.1.13.Char.15.Param.0 = RTexpr {Qu::acc_csc_013_ImpactSpeed=latch(Speed("Ego"),Qu::acc_csc_013_CollisionFlag==1)}
Step.1.13.Char.16.Name = acc_csc_013_CollisionEver
Step.1.13.Char.16.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment a collision ever occurs (nearest lead object), even if the vehicles separate again before the run ends.
Step.1.13.Char.16.Identifier = acc_csc_013_CollisionEver
Step.1.13.Char.16.Unit =
Step.1.13.Char.16.Param.0 = RTexpr {first()?Qu::acc_csc_013_CollisionEver=0:acc_csc_013_CollisionEver=max(acc_csc_013_CollisionEver,(acc_csc_013_CollisionFlag==1))}
Step.1.13.Crit.0.Name = acc_csc_013 - Safe Distance Consistency
Step.1.13.Crit.0.Description:
	Good if SafeDist was never violated while actively following throughout the run. Bad if it was violated at any point.
Step.1.13.Crit.0.Good = [get acc_csc_013_SafeDistViolated] == 0
Step.1.13.Crit.0.Warn =
Step.1.13.Crit.0.Bad = [get acc_csc_013_SafeDistViolated] == 1
Step.1.13.Crit.1.Name = acc_csc_013 - Time To Collision
Step.1.13.Crit.1.Description:
	Good if TTC never entered the warn/bad zone while a valid target existed throughout the run. Warn if it ever entered [3.5,11)s. Bad if it ever entered (0,3.5)s.
Step.1.13.Crit.1.Good = [get acc_csc_013_TTCBadEver] == 0 && [get acc_csc_013_TTCWarnEver] == 0
Step.1.13.Crit.1.Warn = [get acc_csc_013_TTCBadEver] == 0 && [get acc_csc_013_TTCWarnEver] == 1
Step.1.13.Crit.1.Bad = [get acc_csc_013_TTCBadEver] == 1
Step.1.13.Crit.2.Name = acc_csc_013 - Comfort Deceleration Limit
Step.1.13.Crit.2.Description:
	Good if Comfort Deceleration Limit never went out of bound (min=-3, max=2.8) throughout the run.
Step.1.13.Crit.2.Good = [get acc_csc_013_ComfortAxOutOfBoundEver] == 0
Step.1.13.Crit.2.Warn =
Step.1.13.Crit.2.Bad = [get acc_csc_013_ComfortAxOutOfBoundEver] == 1
Step.1.13.Crit.3.Name = acc_csc_013 - Emergency Deceleration Bound
Step.1.13.Crit.3.Description:
	Good if Emergency Deceleration Bound never went out of bound (min=-6) throughout the run.
Step.1.13.Crit.3.Good = [get acc_csc_013_EmergencyAxOutOfBoundEver] == 0
Step.1.13.Crit.3.Warn =
Step.1.13.Crit.3.Bad = [get acc_csc_013_EmergencyAxOutOfBoundEver] == 1
Step.1.13.Crit.4.Name = acc_csc_013 - Jerk Limit
Step.1.13.Crit.4.Description:
	Good if |jerk| never exceeded 4 m/s3 throughout the run.
Step.1.13.Crit.4.Good = [get acc_csc_013_JerkOverLimitEver] == 0
Step.1.13.Crit.4.Warn =
Step.1.13.Crit.4.Bad = [get acc_csc_013_JerkOverLimitEver] == 1
Step.1.13.Crit.5.Name = acc_csc_013 - No Collision Distance
Step.1.13.Crit.5.Description:
	Good if distance never dropped below 0m throughout the run.
Step.1.13.Crit.5.Good = [get acc_csc_013_NoCollDistViolatedEver] == 0
Step.1.13.Crit.5.Warn =
Step.1.13.Crit.5.Bad = [get acc_csc_013_NoCollDistViolatedEver] == 1
Step.1.13.Crit.6.Name = acc_csc_013 - Collision Flag
Step.1.13.Crit.6.Description:
	Good if no collision ever occurred (nearest lead object) throughout the run.
Step.1.13.Crit.6.Good = [get acc_csc_013_CollisionEver] == 0
Step.1.13.Crit.6.Warn =
Step.1.13.Crit.6.Bad = [get acc_csc_013_CollisionEver] == 1
Step.1.13.Crit.7.Name = acc_csc_013 - Impact Speed
Step.1.13.Crit.7.Description:
	Good if no collision ever occurred, or impact speed = 0; Warn (0,5) m/s; Bad >= 5 m/s
Step.1.13.Crit.7.Good = [get acc_csc_013_CollisionEver] == 0 || [get acc_csc_013_ImpactSpeed] == 0
Step.1.13.Crit.7.Warn = [get acc_csc_013_CollisionEver] == 1 && [get acc_csc_013_ImpactSpeed] > 0 && [get acc_csc_013_ImpactSpeed] < 5
Step.1.13.Crit.7.Bad = [get acc_csc_013_CollisionEver] == 1 && [get acc_csc_013_ImpactSpeed] >= 5
Step.1.13.Var.0.Name = acc_csc_013_ds001
Step.1.13.Var.0.Param = 5 3 33 0 65
Step.1.13.Var.0.Result = bad
Step.1.13.Var.0.ResDate = 1782803870
Step.1.13.Var.0.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_013_141741.erg
Step.1.13.Var.0.Char.0.Ref = acc_csc_013_ActualDist
Step.1.13.Var.0.Char.0.Value = 999.0
Step.1.13.Var.0.Char.1.Ref = acc_csc_013_SafeDist
Step.1.13.Var.0.Char.1.Value = 15.0
Step.1.13.Var.0.Char.2.Ref = acc_csc_013_SafeDistViolated
Step.1.13.Var.0.Char.2.Value = 1.0
Step.1.13.Var.0.Char.3.Ref = acc_csc_013_TTC
Step.1.13.Var.0.Char.3.Value = 0.0
Step.1.13.Var.0.Char.4.Ref = acc_csc_013_TTCWarnEver
Step.1.13.Var.0.Char.4.Value = 0.0
Step.1.13.Var.0.Char.5.Ref = acc_csc_013_TTCBadEver
Step.1.13.Var.0.Char.5.Value = 0.0
Step.1.13.Var.0.Char.6.Ref = acc_csc_013_ComfortAx
Step.1.13.Var.0.Char.6.Value = -0.004
Step.1.13.Var.0.Char.7.Ref = acc_csc_013_ComfortAxOutOfBoundEver
Step.1.13.Var.0.Char.7.Value = 1.0
Step.1.13.Var.0.Char.8.Ref = acc_csc_013_EmergencyAx
Step.1.13.Var.0.Char.8.Value = -0.004
Step.1.13.Var.0.Char.9.Ref = acc_csc_013_EmergencyAxOutOfBoundEver
Step.1.13.Var.0.Char.9.Value = 0.0
Step.1.13.Var.0.Char.10.Ref = acc_csc_013_Jerk
Step.1.13.Var.0.Char.10.Value = 0.0
Step.1.13.Var.0.Char.11.Ref = acc_csc_013_JerkOverLimitEver
Step.1.13.Var.0.Char.11.Value = 1.0
Step.1.13.Var.0.Char.12.Ref = acc_csc_013_NoCollDist
Step.1.13.Var.0.Char.12.Value = 999.0
Step.1.13.Var.0.Char.13.Ref = acc_csc_013_NoCollDistViolatedEver
Step.1.13.Var.0.Char.13.Value = 0.0
Step.1.13.Var.0.Char.14.Ref = acc_csc_013_CollisionFlag
Step.1.13.Var.0.Char.14.Value = 0.0
Step.1.13.Var.0.Char.15.Ref = acc_csc_013_ImpactSpeed
Step.1.13.Var.0.Char.15.Value = 0.0
Step.1.13.Var.0.Char.16.Ref = acc_csc_013_CollisionEver
Step.1.13.Var.0.Char.16.Value = 0.0
Step.1.13.Var.0.Crit.0.Ref = acc_csc_013 - Safe Distance Consistency
Step.1.13.Var.0.Crit.0.Result = bad
Step.1.13.Var.0.Crit.1.Ref = acc_csc_013 - Time To Collision
Step.1.13.Var.0.Crit.1.Result = good
Step.1.13.Var.0.Crit.2.Ref = acc_csc_013 - Comfort Deceleration Limit
Step.1.13.Var.0.Crit.2.Result = bad
Step.1.13.Var.0.Crit.3.Ref = acc_csc_013 - Emergency Deceleration Bound
Step.1.13.Var.0.Crit.3.Result = good
Step.1.13.Var.0.Crit.4.Ref = acc_csc_013 - Jerk Limit
Step.1.13.Var.0.Crit.4.Result = bad
Step.1.13.Var.0.Crit.5.Ref = acc_csc_013 - No Collision Distance
Step.1.13.Var.0.Crit.5.Result = good
Step.1.13.Var.0.Crit.6.Ref = acc_csc_013 - Collision Flag
Step.1.13.Var.0.Crit.6.Result = good
Step.1.13.Var.0.Crit.7.Ref = acc_csc_013 - Impact Speed
Step.1.13.Var.0.Crit.7.Result = good
Step.1.13.Var.1.Name = acc_csc_013_ds002
Step.1.13.Var.1.Param = 7 5 40 0 83
Step.1.13.Var.1.Result = bad
Step.1.13.Var.1.ResDate = 1782803882
Step.1.13.Var.1.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_013_141754.erg
Step.1.13.Var.1.Char.0.Ref = acc_csc_013_ActualDist
Step.1.13.Var.1.Char.0.Value = 999.0
Step.1.13.Var.1.Char.1.Ref = acc_csc_013_SafeDist
Step.1.13.Var.1.Char.1.Value = 16.484816771649218
Step.1.13.Var.1.Char.2.Ref = acc_csc_013_SafeDistViolated
Step.1.13.Var.1.Char.2.Value = 1.0
Step.1.13.Var.1.Char.3.Ref = acc_csc_013_TTC
Step.1.13.Var.1.Char.3.Value = 0.0
Step.1.13.Var.1.Char.4.Ref = acc_csc_013_TTCWarnEver
Step.1.13.Var.1.Char.4.Value = 0.0
Step.1.13.Var.1.Char.5.Ref = acc_csc_013_TTCBadEver
Step.1.13.Var.1.Char.5.Value = 0.0
Step.1.13.Var.1.Char.6.Ref = acc_csc_013_ComfortAx
Step.1.13.Var.1.Char.6.Value = -0.004
Step.1.13.Var.1.Char.7.Ref = acc_csc_013_ComfortAxOutOfBoundEver
Step.1.13.Var.1.Char.7.Value = 1.0
Step.1.13.Var.1.Char.8.Ref = acc_csc_013_EmergencyAx
Step.1.13.Var.1.Char.8.Value = -0.004
Step.1.13.Var.1.Char.9.Ref = acc_csc_013_EmergencyAxOutOfBoundEver
Step.1.13.Var.1.Char.9.Value = 0.0
Step.1.13.Var.1.Char.10.Ref = acc_csc_013_Jerk
Step.1.13.Var.1.Char.10.Value = 0.0
Step.1.13.Var.1.Char.11.Ref = acc_csc_013_JerkOverLimitEver
Step.1.13.Var.1.Char.11.Value = 1.0
Step.1.13.Var.1.Char.12.Ref = acc_csc_013_NoCollDist
Step.1.13.Var.1.Char.12.Value = 999.0
Step.1.13.Var.1.Char.13.Ref = acc_csc_013_NoCollDistViolatedEver
Step.1.13.Var.1.Char.13.Value = 0.0
Step.1.13.Var.1.Char.14.Ref = acc_csc_013_CollisionFlag
Step.1.13.Var.1.Char.14.Value = 0.0
Step.1.13.Var.1.Char.15.Ref = acc_csc_013_ImpactSpeed
Step.1.13.Var.1.Char.15.Value = 0.0
Step.1.13.Var.1.Char.16.Ref = acc_csc_013_CollisionEver
Step.1.13.Var.1.Char.16.Value = 0.0
Step.1.13.Var.1.Crit.0.Ref = acc_csc_013 - Safe Distance Consistency
Step.1.13.Var.1.Crit.0.Result = bad
Step.1.13.Var.1.Crit.1.Ref = acc_csc_013 - Time To Collision
Step.1.13.Var.1.Crit.1.Result = good
Step.1.13.Var.1.Crit.2.Ref = acc_csc_013 - Comfort Deceleration Limit
Step.1.13.Var.1.Crit.2.Result = bad
Step.1.13.Var.1.Crit.3.Ref = acc_csc_013 - Emergency Deceleration Bound
Step.1.13.Var.1.Crit.3.Result = good
Step.1.13.Var.1.Crit.4.Ref = acc_csc_013 - Jerk Limit
Step.1.13.Var.1.Crit.4.Result = bad
Step.1.13.Var.1.Crit.5.Ref = acc_csc_013 - No Collision Distance
Step.1.13.Var.1.Crit.5.Result = good
Step.1.13.Var.1.Crit.6.Ref = acc_csc_013 - Collision Flag
Step.1.13.Var.1.Crit.6.Result = good
Step.1.13.Var.1.Crit.7.Ref = acc_csc_013 - Impact Speed
Step.1.13.Var.1.Crit.7.Result = good
Step.1.13.Var.2.Name = acc_csc_013_ds003
Step.1.13.Var.2.Param = 10 7 47 0 100
Step.1.13.Var.2.Result = bad
Step.1.13.Var.2.ResDate = 1782803895
Step.1.13.Var.2.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_013_141806.erg
Step.1.13.Var.2.Char.0.Ref = acc_csc_013_ActualDist
Step.1.13.Var.2.Char.0.Value = 999.0
Step.1.13.Var.2.Char.1.Ref = acc_csc_013_SafeDist
Step.1.13.Var.2.Char.1.Value = 23.0000009141985
Step.1.13.Var.2.Char.2.Ref = acc_csc_013_SafeDistViolated
Step.1.13.Var.2.Char.2.Value = 1.0
Step.1.13.Var.2.Char.3.Ref = acc_csc_013_TTC
Step.1.13.Var.2.Char.3.Value = 0.0
Step.1.13.Var.2.Char.4.Ref = acc_csc_013_TTCWarnEver
Step.1.13.Var.2.Char.4.Value = 0.0
Step.1.13.Var.2.Char.5.Ref = acc_csc_013_TTCBadEver
Step.1.13.Var.2.Char.5.Value = 0.0
Step.1.13.Var.2.Char.6.Ref = acc_csc_013_ComfortAx
Step.1.13.Var.2.Char.6.Value = -3.1798208652844553e-7
Step.1.13.Var.2.Char.7.Ref = acc_csc_013_ComfortAxOutOfBoundEver
Step.1.13.Var.2.Char.7.Value = 1.0
Step.1.13.Var.2.Char.8.Ref = acc_csc_013_EmergencyAx
Step.1.13.Var.2.Char.8.Value = -3.1798208652844553e-7
Step.1.13.Var.2.Char.9.Ref = acc_csc_013_EmergencyAxOutOfBoundEver
Step.1.13.Var.2.Char.9.Value = 0.0
Step.1.13.Var.2.Char.10.Ref = acc_csc_013_Jerk
Step.1.13.Var.2.Char.10.Value = 4.591100832849952e-8
Step.1.13.Var.2.Char.11.Ref = acc_csc_013_JerkOverLimitEver
Step.1.13.Var.2.Char.11.Value = 1.0
Step.1.13.Var.2.Char.12.Ref = acc_csc_013_NoCollDist
Step.1.13.Var.2.Char.12.Value = 999.0
Step.1.13.Var.2.Char.13.Ref = acc_csc_013_NoCollDistViolatedEver
Step.1.13.Var.2.Char.13.Value = 0.0
Step.1.13.Var.2.Char.14.Ref = acc_csc_013_CollisionFlag
Step.1.13.Var.2.Char.14.Value = 0.0
Step.1.13.Var.2.Char.15.Ref = acc_csc_013_ImpactSpeed
Step.1.13.Var.2.Char.15.Value = 0.0
Step.1.13.Var.2.Char.16.Ref = acc_csc_013_CollisionEver
Step.1.13.Var.2.Char.16.Value = 0.0
Step.1.13.Var.2.Crit.0.Ref = acc_csc_013 - Safe Distance Consistency
Step.1.13.Var.2.Crit.0.Result = bad
Step.1.13.Var.2.Crit.1.Ref = acc_csc_013 - Time To Collision
Step.1.13.Var.2.Crit.1.Result = good
Step.1.13.Var.2.Crit.2.Ref = acc_csc_013 - Comfort Deceleration Limit
Step.1.13.Var.2.Crit.2.Result = bad
Step.1.13.Var.2.Crit.3.Ref = acc_csc_013 - Emergency Deceleration Bound
Step.1.13.Var.2.Crit.3.Result = good
Step.1.13.Var.2.Crit.4.Ref = acc_csc_013 - Jerk Limit
Step.1.13.Var.2.Crit.4.Result = bad
Step.1.13.Var.2.Crit.5.Ref = acc_csc_013 - No Collision Distance
Step.1.13.Var.2.Crit.5.Result = good
Step.1.13.Var.2.Crit.6.Ref = acc_csc_013 - Collision Flag
Step.1.13.Var.2.Crit.6.Result = good
Step.1.13.Var.2.Crit.7.Ref = acc_csc_013 - Impact Speed
Step.1.13.Var.2.Crit.7.Result = good
Step.1.13.Var.3.Name = acc_csc_013_ds004
Step.1.13.Var.3.Param = 12 9 54 0 115
Step.1.13.Var.3.Result = bad
Step.1.13.Var.3.ResDate = 1782803907
Step.1.13.Var.3.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_013_141819.erg
Step.1.13.Var.3.Char.0.Ref = acc_csc_013_ActualDist
Step.1.13.Var.3.Char.0.Value = 999.0
Step.1.13.Var.3.Char.1.Ref = acc_csc_013_SafeDist
Step.1.13.Var.3.Char.1.Value = 28.399972512010184
Step.1.13.Var.3.Char.2.Ref = acc_csc_013_SafeDistViolated
Step.1.13.Var.3.Char.2.Value = 1.0
Step.1.13.Var.3.Char.3.Ref = acc_csc_013_TTC
Step.1.13.Var.3.Char.3.Value = 0.0
Step.1.13.Var.3.Char.4.Ref = acc_csc_013_TTCWarnEver
Step.1.13.Var.3.Char.4.Value = 0.0
Step.1.13.Var.3.Char.5.Ref = acc_csc_013_TTCBadEver
Step.1.13.Var.3.Char.5.Value = 0.0
Step.1.13.Var.3.Char.6.Ref = acc_csc_013_ComfortAx
Step.1.13.Var.3.Char.6.Value = -0.004
Step.1.13.Var.3.Char.7.Ref = acc_csc_013_ComfortAxOutOfBoundEver
Step.1.13.Var.3.Char.7.Value = 1.0
Step.1.13.Var.3.Char.8.Ref = acc_csc_013_EmergencyAx
Step.1.13.Var.3.Char.8.Value = -0.004
Step.1.13.Var.3.Char.9.Ref = acc_csc_013_EmergencyAxOutOfBoundEver
Step.1.13.Var.3.Char.9.Value = 0.0
Step.1.13.Var.3.Char.10.Ref = acc_csc_013_Jerk
Step.1.13.Var.3.Char.10.Value = 0.0
Step.1.13.Var.3.Char.11.Ref = acc_csc_013_JerkOverLimitEver
Step.1.13.Var.3.Char.11.Value = 1.0
Step.1.13.Var.3.Char.12.Ref = acc_csc_013_NoCollDist
Step.1.13.Var.3.Char.12.Value = 999.0
Step.1.13.Var.3.Char.13.Ref = acc_csc_013_NoCollDistViolatedEver
Step.1.13.Var.3.Char.13.Value = 0.0
Step.1.13.Var.3.Char.14.Ref = acc_csc_013_CollisionFlag
Step.1.13.Var.3.Char.14.Value = 0.0
Step.1.13.Var.3.Char.15.Ref = acc_csc_013_ImpactSpeed
Step.1.13.Var.3.Char.15.Value = 0.0
Step.1.13.Var.3.Char.16.Ref = acc_csc_013_CollisionEver
Step.1.13.Var.3.Char.16.Value = 0.0
Step.1.13.Var.3.Crit.0.Ref = acc_csc_013 - Safe Distance Consistency
Step.1.13.Var.3.Crit.0.Result = bad
Step.1.13.Var.3.Crit.1.Ref = acc_csc_013 - Time To Collision
Step.1.13.Var.3.Crit.1.Result = good
Step.1.13.Var.3.Crit.2.Ref = acc_csc_013 - Comfort Deceleration Limit
Step.1.13.Var.3.Crit.2.Result = bad
Step.1.13.Var.3.Crit.3.Ref = acc_csc_013 - Emergency Deceleration Bound
Step.1.13.Var.3.Crit.3.Result = good
Step.1.13.Var.3.Crit.4.Ref = acc_csc_013 - Jerk Limit
Step.1.13.Var.3.Crit.4.Result = bad
Step.1.13.Var.3.Crit.5.Ref = acc_csc_013 - No Collision Distance
Step.1.13.Var.3.Crit.5.Result = good
Step.1.13.Var.3.Crit.6.Ref = acc_csc_013 - Collision Flag
Step.1.13.Var.3.Crit.6.Result = good
Step.1.13.Var.3.Crit.7.Ref = acc_csc_013 - Impact Speed
Step.1.13.Var.3.Crit.7.Result = good
Step.1.13.Var.4.Name = acc_csc_013_ds005
Step.1.13.Var.4.Param = 15 11 61 0 125
Step.1.13.Var.4.Result = bad
Step.1.13.Var.4.ResDate = 1782803920
Step.1.13.Var.4.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_013_141831.erg
Step.1.13.Var.4.Char.0.Ref = acc_csc_013_ActualDist
Step.1.13.Var.4.Char.0.Value = 999.0
Step.1.13.Var.4.Char.1.Ref = acc_csc_013_SafeDist
Step.1.13.Var.4.Char.1.Value = 35.05149751883511
Step.1.13.Var.4.Char.2.Ref = acc_csc_013_SafeDistViolated
Step.1.13.Var.4.Char.2.Value = 1.0
Step.1.13.Var.4.Char.3.Ref = acc_csc_013_TTC
Step.1.13.Var.4.Char.3.Value = 0.0
Step.1.13.Var.4.Char.4.Ref = acc_csc_013_TTCWarnEver
Step.1.13.Var.4.Char.4.Value = 0.0
Step.1.13.Var.4.Char.5.Ref = acc_csc_013_TTCBadEver
Step.1.13.Var.4.Char.5.Value = 0.0
Step.1.13.Var.4.Char.6.Ref = acc_csc_013_ComfortAx
Step.1.13.Var.4.Char.6.Value = -0.004
Step.1.13.Var.4.Char.7.Ref = acc_csc_013_ComfortAxOutOfBoundEver
Step.1.13.Var.4.Char.7.Value = 1.0
Step.1.13.Var.4.Char.8.Ref = acc_csc_013_EmergencyAx
Step.1.13.Var.4.Char.8.Value = -0.004
Step.1.13.Var.4.Char.9.Ref = acc_csc_013_EmergencyAxOutOfBoundEver
Step.1.13.Var.4.Char.9.Value = 0.0
Step.1.13.Var.4.Char.10.Ref = acc_csc_013_Jerk
Step.1.13.Var.4.Char.10.Value = 0.0
Step.1.13.Var.4.Char.11.Ref = acc_csc_013_JerkOverLimitEver
Step.1.13.Var.4.Char.11.Value = 1.0
Step.1.13.Var.4.Char.12.Ref = acc_csc_013_NoCollDist
Step.1.13.Var.4.Char.12.Value = 999.0
Step.1.13.Var.4.Char.13.Ref = acc_csc_013_NoCollDistViolatedEver
Step.1.13.Var.4.Char.13.Value = 0.0
Step.1.13.Var.4.Char.14.Ref = acc_csc_013_CollisionFlag
Step.1.13.Var.4.Char.14.Value = 0.0
Step.1.13.Var.4.Char.15.Ref = acc_csc_013_ImpactSpeed
Step.1.13.Var.4.Char.15.Value = 0.0
Step.1.13.Var.4.Char.16.Ref = acc_csc_013_CollisionEver
Step.1.13.Var.4.Char.16.Value = 0.0
Step.1.13.Var.4.Crit.0.Ref = acc_csc_013 - Safe Distance Consistency
Step.1.13.Var.4.Crit.0.Result = bad
Step.1.13.Var.4.Crit.1.Ref = acc_csc_013 - Time To Collision
Step.1.13.Var.4.Crit.1.Result = good
Step.1.13.Var.4.Crit.2.Ref = acc_csc_013 - Comfort Deceleration Limit
Step.1.13.Var.4.Crit.2.Result = bad
Step.1.13.Var.4.Crit.3.Ref = acc_csc_013 - Emergency Deceleration Bound
Step.1.13.Var.4.Crit.3.Result = good
Step.1.13.Var.4.Crit.4.Ref = acc_csc_013 - Jerk Limit
Step.1.13.Var.4.Crit.4.Result = bad
Step.1.13.Var.4.Crit.5.Ref = acc_csc_013 - No Collision Distance
Step.1.13.Var.4.Crit.5.Result = good
Step.1.13.Var.4.Crit.6.Ref = acc_csc_013 - Collision Flag
Step.1.13.Var.4.Crit.6.Result = good
Step.1.13.Var.4.Crit.7.Ref = acc_csc_013 - Impact Speed
Step.1.13.Var.4.Crit.7.Result = good
Step.1.14 = TestRun
Step.1.14.Name = OSC_Imported/longitudinal_feature/ACC/acc_csc_014
Step.1.14.Param.0 = EgoSpeed NValue
Step.1.14.Param.1 = TVSpeed NValue
Step.1.14.Param.2 = TV_initPos NValue
Step.1.14.Char.0.Name = acc_csc_014_ActualDist
Step.1.14.Char.0.Description:
	Actual distance to lead (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.14.Char.0.Identifier = acc_csc_014_ActualDist
Step.1.14.Char.0.Unit =
Step.1.14.Char.0.Param.0 = RTexpr "Qu::acc_csc_014_ActualDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.14.Char.1.Name = acc_csc_014_SafeDist
Step.1.14.Char.1.Description:
	Reference safe distance (signal=FMU.CM_ACCController_V17.Out.Debug.SafeDistance)
Step.1.14.Char.1.Identifier = acc_csc_014_SafeDist
Step.1.14.Char.1.Unit =
Step.1.14.Char.1.Param.0 = RTexpr "Qu::acc_csc_014_SafeDist=FMU.CM_ACCController_V17.Out.Debug.SafeDistance"
Step.1.14.Char.2.Name = acc_csc_014_SafeDistViolated
Step.1.14.Char.2.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment ActualDist<SafeDist while actively following (gate==1); stays 1 for the rest of the run even if distance recovers.
Step.1.14.Char.2.Identifier = acc_csc_014_SafeDistViolated
Step.1.14.Char.2.Unit =
Step.1.14.Char.2.Param.0 = RTexpr {first()?Qu::acc_csc_014_SafeDistViolated=0:acc_csc_014_SafeDistViolated=max(acc_csc_014_SafeDistViolated,(FMU.CM_ACCController_V17.Out.Debug.Fusion.Active==1 && acc_csc_014_ActualDist<acc_csc_014_SafeDist))}
Step.1.14.Char.3.Name = acc_csc_014_TTC
Step.1.14.Char.3.Description:
	Time-to-collision (signal=AccelCtrl.ACC.Time2Collision)
Step.1.14.Char.3.Identifier = acc_csc_014_TTC
Step.1.14.Char.3.Unit =
Step.1.14.Char.3.Param.0 = RTexpr "Qu::acc_csc_014_TTC=AccelCtrl.ACC.Time2Collision"
Step.1.14.Char.4.Name = acc_csc_014_TTCWarnEver
Step.1.14.Char.4.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the warn zone [3.5,11)s.
Step.1.14.Char.4.Identifier = acc_csc_014_TTCWarnEver
Step.1.14.Char.4.Unit =
Step.1.14.Char.4.Param.0 = RTexpr {first()?Qu::acc_csc_014_TTCWarnEver=0:acc_csc_014_TTCWarnEver=max(acc_csc_014_TTCWarnEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_014_TTC>=3.5 && acc_csc_014_TTC<11))}
Step.1.14.Char.5.Name = acc_csc_014_TTCBadEver
Step.1.14.Char.5.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the bad zone (0,3.5)s.
Step.1.14.Char.5.Identifier = acc_csc_014_TTCBadEver
Step.1.14.Char.5.Unit =
Step.1.14.Char.5.Param.0 = RTexpr {first()?Qu::acc_csc_014_TTCBadEver=0:acc_csc_014_TTCBadEver=max(acc_csc_014_TTCBadEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_014_TTC>0 && acc_csc_014_TTC<3.5))}
Step.1.14.Char.6.Name = acc_csc_014_ComfortAx
Step.1.14.Char.6.Description:
	Comfort Deceleration Limit (signal=AccelCtrl.DesiredAx)
Step.1.14.Char.6.Identifier = acc_csc_014_ComfortAx
Step.1.14.Char.6.Unit =
Step.1.14.Char.6.Param.0 = RTexpr "Qu::acc_csc_014_ComfortAx=AccelCtrl.DesiredAx"
Step.1.14.Char.7.Name = acc_csc_014_ComfortAxOutOfBoundEver
Step.1.14.Char.7.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Comfort Deceleration Limit ever goes out of bound (min=-3, max=2.8).
Step.1.14.Char.7.Identifier = acc_csc_014_ComfortAxOutOfBoundEver
Step.1.14.Char.7.Unit =
Step.1.14.Char.7.Param.0 = RTexpr {first()?Qu::acc_csc_014_ComfortAxOutOfBoundEver=0:acc_csc_014_ComfortAxOutOfBoundEver=max(acc_csc_014_ComfortAxOutOfBoundEver,(acc_csc_014_ComfortAx<-3 || acc_csc_014_ComfortAx>2.8))}
Step.1.14.Char.8.Name = acc_csc_014_EmergencyAx
Step.1.14.Char.8.Description:
	Emergency Deceleration Bound (signal=AccelCtrl.DesiredAx)
Step.1.14.Char.8.Identifier = acc_csc_014_EmergencyAx
Step.1.14.Char.8.Unit =
Step.1.14.Char.8.Param.0 = RTexpr "Qu::acc_csc_014_EmergencyAx=AccelCtrl.DesiredAx"
Step.1.14.Char.9.Name = acc_csc_014_EmergencyAxOutOfBoundEver
Step.1.14.Char.9.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Emergency Deceleration Bound ever goes out of bound (min=-6).
Step.1.14.Char.9.Identifier = acc_csc_014_EmergencyAxOutOfBoundEver
Step.1.14.Char.9.Unit =
Step.1.14.Char.9.Param.0 = RTexpr {first()?Qu::acc_csc_014_EmergencyAxOutOfBoundEver=0:acc_csc_014_EmergencyAxOutOfBoundEver=max(acc_csc_014_EmergencyAxOutOfBoundEver,(acc_csc_014_EmergencyAx<-6))}
Step.1.14.Char.10.Name = acc_csc_014_Jerk
Step.1.14.Char.10.Description:
	Jerk = |d(DesiredAx)/dt|, base signal=AccelCtrl.DesiredAx
Step.1.14.Char.10.Identifier = acc_csc_014_Jerk
Step.1.14.Char.10.Unit =
Step.1.14.Char.10.Param.0 = RTexpr "Qu::acc_csc_014_Jerk=abs(diff(AccelCtrl.DesiredAx,Time))"
Step.1.14.Char.11.Name = acc_csc_014_JerkOverLimitEver
Step.1.14.Char.11.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment |jerk| ever exceeds 4 m/s3.
Step.1.14.Char.11.Identifier = acc_csc_014_JerkOverLimitEver
Step.1.14.Char.11.Unit =
Step.1.14.Char.11.Param.0 = RTexpr {first()?Qu::acc_csc_014_JerkOverLimitEver=0:acc_csc_014_JerkOverLimitEver=max(acc_csc_014_JerkOverLimitEver,(acc_csc_014_Jerk>4))}
Step.1.14.Char.12.Name = acc_csc_014_NoCollDist
Step.1.14.Char.12.Description:
	Distance to nearest lead object (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.14.Char.12.Identifier = acc_csc_014_NoCollDist
Step.1.14.Char.12.Unit =
Step.1.14.Char.12.Param.0 = RTexpr "Qu::acc_csc_014_NoCollDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.14.Char.13.Name = acc_csc_014_NoCollDistViolatedEver
Step.1.14.Char.13.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment distance ever drops below 0m.
Step.1.14.Char.13.Identifier = acc_csc_014_NoCollDistViolatedEver
Step.1.14.Char.13.Unit =
Step.1.14.Char.13.Param.0 = RTexpr {first()?Qu::acc_csc_014_NoCollDistViolatedEver=0:acc_csc_014_NoCollDistViolatedEver=max(acc_csc_014_NoCollDistViolatedEver,(acc_csc_014_NoCollDist<0))}
Step.1.14.Char.14.Name = acc_csc_014_CollisionFlag
Step.1.14.Char.14.Description:
	Collision flag derived from FMU.CM_ACCController_V17.Out.Debug.Target.DistX <= 0 (nearest lead object); instantaneous, used as the latch() trigger for ImpactSpeed below.
Step.1.14.Char.14.Identifier = acc_csc_014_CollisionFlag
Step.1.14.Char.14.Unit =
Step.1.14.Char.14.Param.0 = RTexpr "Qu::acc_csc_014_CollisionFlag=(FMU.CM_ACCController_V17.Out.Debug.Target.DistX<=0)"
Step.1.14.Char.15.Name = acc_csc_014_ImpactSpeed
Step.1.14.Char.15.Description:
	Ego speed latched at moment of first collision (nearest lead object)
Step.1.14.Char.15.Identifier = acc_csc_014_ImpactSpeed
Step.1.14.Char.15.Unit =
Step.1.14.Char.15.Param.0 = RTexpr {Qu::acc_csc_014_ImpactSpeed=latch(Speed("Ego"),Qu::acc_csc_014_CollisionFlag==1)}
Step.1.14.Char.16.Name = acc_csc_014_CollisionEver
Step.1.14.Char.16.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment a collision ever occurs (nearest lead object), even if the vehicles separate again before the run ends.
Step.1.14.Char.16.Identifier = acc_csc_014_CollisionEver
Step.1.14.Char.16.Unit =
Step.1.14.Char.16.Param.0 = RTexpr {first()?Qu::acc_csc_014_CollisionEver=0:acc_csc_014_CollisionEver=max(acc_csc_014_CollisionEver,(acc_csc_014_CollisionFlag==1))}
Step.1.14.Crit.0.Name = acc_csc_014 - Safe Distance Consistency
Step.1.14.Crit.0.Description:
	Good if SafeDist was never violated while actively following throughout the run. Bad if it was violated at any point.
Step.1.14.Crit.0.Good = [get acc_csc_014_SafeDistViolated] == 0
Step.1.14.Crit.0.Warn =
Step.1.14.Crit.0.Bad = [get acc_csc_014_SafeDistViolated] == 1
Step.1.14.Crit.1.Name = acc_csc_014 - Time To Collision
Step.1.14.Crit.1.Description:
	Good if TTC never entered the warn/bad zone while a valid target existed throughout the run. Warn if it ever entered [3.5,11)s. Bad if it ever entered (0,3.5)s.
Step.1.14.Crit.1.Good = [get acc_csc_014_TTCBadEver] == 0 && [get acc_csc_014_TTCWarnEver] == 0
Step.1.14.Crit.1.Warn = [get acc_csc_014_TTCBadEver] == 0 && [get acc_csc_014_TTCWarnEver] == 1
Step.1.14.Crit.1.Bad = [get acc_csc_014_TTCBadEver] == 1
Step.1.14.Crit.2.Name = acc_csc_014 - Comfort Deceleration Limit
Step.1.14.Crit.2.Description:
	Good if Comfort Deceleration Limit never went out of bound (min=-3, max=2.8) throughout the run.
Step.1.14.Crit.2.Good = [get acc_csc_014_ComfortAxOutOfBoundEver] == 0
Step.1.14.Crit.2.Warn =
Step.1.14.Crit.2.Bad = [get acc_csc_014_ComfortAxOutOfBoundEver] == 1
Step.1.14.Crit.3.Name = acc_csc_014 - Emergency Deceleration Bound
Step.1.14.Crit.3.Description:
	Good if Emergency Deceleration Bound never went out of bound (min=-6) throughout the run.
Step.1.14.Crit.3.Good = [get acc_csc_014_EmergencyAxOutOfBoundEver] == 0
Step.1.14.Crit.3.Warn =
Step.1.14.Crit.3.Bad = [get acc_csc_014_EmergencyAxOutOfBoundEver] == 1
Step.1.14.Crit.4.Name = acc_csc_014 - Jerk Limit
Step.1.14.Crit.4.Description:
	Good if |jerk| never exceeded 4 m/s3 throughout the run.
Step.1.14.Crit.4.Good = [get acc_csc_014_JerkOverLimitEver] == 0
Step.1.14.Crit.4.Warn =
Step.1.14.Crit.4.Bad = [get acc_csc_014_JerkOverLimitEver] == 1
Step.1.14.Crit.5.Name = acc_csc_014 - No Collision Distance
Step.1.14.Crit.5.Description:
	Good if distance never dropped below 0m throughout the run.
Step.1.14.Crit.5.Good = [get acc_csc_014_NoCollDistViolatedEver] == 0
Step.1.14.Crit.5.Warn =
Step.1.14.Crit.5.Bad = [get acc_csc_014_NoCollDistViolatedEver] == 1
Step.1.14.Crit.6.Name = acc_csc_014 - Collision Flag
Step.1.14.Crit.6.Description:
	Good if no collision ever occurred (nearest lead object) throughout the run.
Step.1.14.Crit.6.Good = [get acc_csc_014_CollisionEver] == 0
Step.1.14.Crit.6.Warn =
Step.1.14.Crit.6.Bad = [get acc_csc_014_CollisionEver] == 1
Step.1.14.Crit.7.Name = acc_csc_014 - Impact Speed
Step.1.14.Crit.7.Description:
	Good if no collision ever occurred, or impact speed = 0; Warn (0,5) m/s; Bad >= 5 m/s
Step.1.14.Crit.7.Good = [get acc_csc_014_CollisionEver] == 0 || [get acc_csc_014_ImpactSpeed] == 0
Step.1.14.Crit.7.Warn = [get acc_csc_014_CollisionEver] == 1 && [get acc_csc_014_ImpactSpeed] > 0 && [get acc_csc_014_ImpactSpeed] < 5
Step.1.14.Crit.7.Bad = [get acc_csc_014_CollisionEver] == 1 && [get acc_csc_014_ImpactSpeed] >= 5
Step.1.14.Var.0.Name = acc_csc_014_ds001
Step.1.14.Var.0.Param = 12 8 67
Step.1.14.Var.0.Result = bad
Step.1.14.Var.0.ResDate = 1782803932
Step.1.14.Var.0.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_014_141844.erg
Step.1.14.Var.0.ManLst = 0:lat0 1:long0
Step.1.14.Var.0.Char.0.Ref = acc_csc_014_ActualDist
Step.1.14.Var.0.Char.0.Value = 999.0
Step.1.14.Var.0.Char.1.Ref = acc_csc_014_SafeDist
Step.1.14.Var.0.Char.1.Value = 34.50213557455751
Step.1.14.Var.0.Char.2.Ref = acc_csc_014_SafeDistViolated
Step.1.14.Var.0.Char.2.Value = 0.0
Step.1.14.Var.0.Char.3.Ref = acc_csc_014_TTC
Step.1.14.Var.0.Char.3.Value = 0.0
Step.1.14.Var.0.Char.4.Ref = acc_csc_014_TTCWarnEver
Step.1.14.Var.0.Char.4.Value = 0.0
Step.1.14.Var.0.Char.5.Ref = acc_csc_014_TTCBadEver
Step.1.14.Var.0.Char.5.Value = 0.0
Step.1.14.Var.0.Char.6.Ref = acc_csc_014_ComfortAx
Step.1.14.Var.0.Char.6.Value = -0.0007428085417430452
Step.1.14.Var.0.Char.7.Ref = acc_csc_014_ComfortAxOutOfBoundEver
Step.1.14.Var.0.Char.7.Value = 0.0
Step.1.14.Var.0.Char.8.Ref = acc_csc_014_EmergencyAx
Step.1.14.Var.0.Char.8.Value = -0.0007428085417430452
Step.1.14.Var.0.Char.9.Ref = acc_csc_014_EmergencyAxOutOfBoundEver
Step.1.14.Var.0.Char.9.Value = 0.0
Step.1.14.Var.0.Char.10.Ref = acc_csc_014_Jerk
Step.1.14.Var.0.Char.10.Value = 3.142368143479009e-6
Step.1.14.Var.0.Char.11.Ref = acc_csc_014_JerkOverLimitEver
Step.1.14.Var.0.Char.11.Value = 1.0
Step.1.14.Var.0.Char.12.Ref = acc_csc_014_NoCollDist
Step.1.14.Var.0.Char.12.Value = 999.0
Step.1.14.Var.0.Char.13.Ref = acc_csc_014_NoCollDistViolatedEver
Step.1.14.Var.0.Char.13.Value = 0.0
Step.1.14.Var.0.Char.14.Ref = acc_csc_014_CollisionFlag
Step.1.14.Var.0.Char.14.Value = 0.0
Step.1.14.Var.0.Char.15.Ref = acc_csc_014_ImpactSpeed
Step.1.14.Var.0.Char.15.Value = 0.0
Step.1.14.Var.0.Char.16.Ref = acc_csc_014_CollisionEver
Step.1.14.Var.0.Char.16.Value = 0.0
Step.1.14.Var.0.Crit.0.Ref = acc_csc_014 - Safe Distance Consistency
Step.1.14.Var.0.Crit.0.Result = good
Step.1.14.Var.0.Crit.1.Ref = acc_csc_014 - Time To Collision
Step.1.14.Var.0.Crit.1.Result = good
Step.1.14.Var.0.Crit.2.Ref = acc_csc_014 - Comfort Deceleration Limit
Step.1.14.Var.0.Crit.2.Result = good
Step.1.14.Var.0.Crit.3.Ref = acc_csc_014 - Emergency Deceleration Bound
Step.1.14.Var.0.Crit.3.Result = good
Step.1.14.Var.0.Crit.4.Ref = acc_csc_014 - Jerk Limit
Step.1.14.Var.0.Crit.4.Result = bad
Step.1.14.Var.0.Crit.5.Ref = acc_csc_014 - No Collision Distance
Step.1.14.Var.0.Crit.5.Result = good
Step.1.14.Var.0.Crit.6.Ref = acc_csc_014 - Collision Flag
Step.1.14.Var.0.Crit.6.Result = good
Step.1.14.Var.0.Crit.7.Ref = acc_csc_014 - Impact Speed
Step.1.14.Var.0.Crit.7.Result = good
Step.1.14.Var.1.Name = acc_csc_014_ds002
Step.1.14.Var.1.Param = 15 10 80
Step.1.14.Var.1.Result = bad
Step.1.14.Var.1.ResDate = 1782803944
Step.1.14.Var.1.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_014_141856.erg
Step.1.14.Var.1.ManLst = 0:lat0 1:long0
Step.1.14.Var.1.Char.0.Ref = acc_csc_014_ActualDist
Step.1.14.Var.1.Char.0.Value = 999.0
Step.1.14.Var.1.Char.1.Ref = acc_csc_014_SafeDist
Step.1.14.Var.1.Char.1.Value = 34.502129636587895
Step.1.14.Var.1.Char.2.Ref = acc_csc_014_SafeDistViolated
Step.1.14.Var.1.Char.2.Value = 0.0
Step.1.14.Var.1.Char.3.Ref = acc_csc_014_TTC
Step.1.14.Var.1.Char.3.Value = 0.0
Step.1.14.Var.1.Char.4.Ref = acc_csc_014_TTCWarnEver
Step.1.14.Var.1.Char.4.Value = 0.0
Step.1.14.Var.1.Char.5.Ref = acc_csc_014_TTCBadEver
Step.1.14.Var.1.Char.5.Value = 0.0
Step.1.14.Var.1.Char.6.Ref = acc_csc_014_ComfortAx
Step.1.14.Var.1.Char.6.Value = -0.0007407431610076288
Step.1.14.Var.1.Char.7.Ref = acc_csc_014_ComfortAxOutOfBoundEver
Step.1.14.Var.1.Char.7.Value = 0.0
Step.1.14.Var.1.Char.8.Ref = acc_csc_014_EmergencyAx
Step.1.14.Var.1.Char.8.Value = -0.0007407431610076288
Step.1.14.Var.1.Char.9.Ref = acc_csc_014_EmergencyAxOutOfBoundEver
Step.1.14.Var.1.Char.9.Value = 0.0
Step.1.14.Var.1.Char.10.Ref = acc_csc_014_Jerk
Step.1.14.Var.1.Char.10.Value = 2.0801707025782425e-7
Step.1.14.Var.1.Char.11.Ref = acc_csc_014_JerkOverLimitEver
Step.1.14.Var.1.Char.11.Value = 1.0
Step.1.14.Var.1.Char.12.Ref = acc_csc_014_NoCollDist
Step.1.14.Var.1.Char.12.Value = 999.0
Step.1.14.Var.1.Char.13.Ref = acc_csc_014_NoCollDistViolatedEver
Step.1.14.Var.1.Char.13.Value = 0.0
Step.1.14.Var.1.Char.14.Ref = acc_csc_014_CollisionFlag
Step.1.14.Var.1.Char.14.Value = 0.0
Step.1.14.Var.1.Char.15.Ref = acc_csc_014_ImpactSpeed
Step.1.14.Var.1.Char.15.Value = 0.0
Step.1.14.Var.1.Char.16.Ref = acc_csc_014_CollisionEver
Step.1.14.Var.1.Char.16.Value = 0.0
Step.1.14.Var.1.Crit.0.Ref = acc_csc_014 - Safe Distance Consistency
Step.1.14.Var.1.Crit.0.Result = good
Step.1.14.Var.1.Crit.1.Ref = acc_csc_014 - Time To Collision
Step.1.14.Var.1.Crit.1.Result = good
Step.1.14.Var.1.Crit.2.Ref = acc_csc_014 - Comfort Deceleration Limit
Step.1.14.Var.1.Crit.2.Result = good
Step.1.14.Var.1.Crit.3.Ref = acc_csc_014 - Emergency Deceleration Bound
Step.1.14.Var.1.Crit.3.Result = good
Step.1.14.Var.1.Crit.4.Ref = acc_csc_014 - Jerk Limit
Step.1.14.Var.1.Crit.4.Result = bad
Step.1.14.Var.1.Crit.5.Ref = acc_csc_014 - No Collision Distance
Step.1.14.Var.1.Crit.5.Result = good
Step.1.14.Var.1.Crit.6.Ref = acc_csc_014 - Collision Flag
Step.1.14.Var.1.Crit.6.Result = good
Step.1.14.Var.1.Crit.7.Ref = acc_csc_014 - Impact Speed
Step.1.14.Var.1.Crit.7.Result = good
Step.1.14.Var.2.Name = acc_csc_014_ds003
Step.1.14.Var.2.Param = 20 14 93
Step.1.14.Var.2.Result = bad
Step.1.14.Var.2.ResDate = 1782803956
Step.1.14.Var.2.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_014_141908.erg
Step.1.14.Var.2.ManLst = 0:lat0 1:long0
Step.1.14.Var.2.Char.0.Ref = acc_csc_014_ActualDist
Step.1.14.Var.2.Char.0.Value = 999.0
Step.1.14.Var.2.Char.1.Ref = acc_csc_014_SafeDist
Step.1.14.Var.2.Char.1.Value = 45.46833214446547
Step.1.14.Var.2.Char.2.Ref = acc_csc_014_SafeDistViolated
Step.1.14.Var.2.Char.2.Value = 0.0
Step.1.14.Var.2.Char.3.Ref = acc_csc_014_TTC
Step.1.14.Var.2.Char.3.Value = 0.0
Step.1.14.Var.2.Char.4.Ref = acc_csc_014_TTCWarnEver
Step.1.14.Var.2.Char.4.Value = 0.0
Step.1.14.Var.2.Char.5.Ref = acc_csc_014_TTCBadEver
Step.1.14.Var.2.Char.5.Value = 0.0
Step.1.14.Var.2.Char.6.Ref = acc_csc_014_ComfortAx
Step.1.14.Var.2.Char.6.Value = -0.004
Step.1.14.Var.2.Char.7.Ref = acc_csc_014_ComfortAxOutOfBoundEver
Step.1.14.Var.2.Char.7.Value = 0.0
Step.1.14.Var.2.Char.8.Ref = acc_csc_014_EmergencyAx
Step.1.14.Var.2.Char.8.Value = -0.004
Step.1.14.Var.2.Char.9.Ref = acc_csc_014_EmergencyAxOutOfBoundEver
Step.1.14.Var.2.Char.9.Value = 0.0
Step.1.14.Var.2.Char.10.Ref = acc_csc_014_Jerk
Step.1.14.Var.2.Char.10.Value = 0.0
Step.1.14.Var.2.Char.11.Ref = acc_csc_014_JerkOverLimitEver
Step.1.14.Var.2.Char.11.Value = 1.0
Step.1.14.Var.2.Char.12.Ref = acc_csc_014_NoCollDist
Step.1.14.Var.2.Char.12.Value = 999.0
Step.1.14.Var.2.Char.13.Ref = acc_csc_014_NoCollDistViolatedEver
Step.1.14.Var.2.Char.13.Value = 0.0
Step.1.14.Var.2.Char.14.Ref = acc_csc_014_CollisionFlag
Step.1.14.Var.2.Char.14.Value = 0.0
Step.1.14.Var.2.Char.15.Ref = acc_csc_014_ImpactSpeed
Step.1.14.Var.2.Char.15.Value = 0.0
Step.1.14.Var.2.Char.16.Ref = acc_csc_014_CollisionEver
Step.1.14.Var.2.Char.16.Value = 0.0
Step.1.14.Var.2.Crit.0.Ref = acc_csc_014 - Safe Distance Consistency
Step.1.14.Var.2.Crit.0.Result = good
Step.1.14.Var.2.Crit.1.Ref = acc_csc_014 - Time To Collision
Step.1.14.Var.2.Crit.1.Result = good
Step.1.14.Var.2.Crit.2.Ref = acc_csc_014 - Comfort Deceleration Limit
Step.1.14.Var.2.Crit.2.Result = good
Step.1.14.Var.2.Crit.3.Ref = acc_csc_014 - Emergency Deceleration Bound
Step.1.14.Var.2.Crit.3.Result = good
Step.1.14.Var.2.Crit.4.Ref = acc_csc_014 - Jerk Limit
Step.1.14.Var.2.Crit.4.Result = bad
Step.1.14.Var.2.Crit.5.Ref = acc_csc_014 - No Collision Distance
Step.1.14.Var.2.Crit.5.Result = good
Step.1.14.Var.2.Crit.6.Ref = acc_csc_014 - Collision Flag
Step.1.14.Var.2.Crit.6.Result = good
Step.1.14.Var.2.Crit.7.Ref = acc_csc_014 - Impact Speed
Step.1.14.Var.2.Crit.7.Result = good
Step.1.14.Var.3.Name = acc_csc_014_ds004
Step.1.14.Var.3.Param = 25 18 106
Step.1.14.Var.3.Result = bad
Step.1.14.Var.3.ResDate = 1782803968
Step.1.14.Var.3.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_014_141920.erg
Step.1.14.Var.3.ManLst = 0:lat0 1:long0
Step.1.14.Var.3.Char.0.Ref = acc_csc_014_ActualDist
Step.1.14.Var.3.Char.0.Value = 999.0
Step.1.14.Var.3.Char.1.Ref = acc_csc_014_SafeDist
Step.1.14.Var.3.Char.1.Value = 56.17815110965591
Step.1.14.Var.3.Char.2.Ref = acc_csc_014_SafeDistViolated
Step.1.14.Var.3.Char.2.Value = 1.0
Step.1.14.Var.3.Char.3.Ref = acc_csc_014_TTC
Step.1.14.Var.3.Char.3.Value = 0.0
Step.1.14.Var.3.Char.4.Ref = acc_csc_014_TTCWarnEver
Step.1.14.Var.3.Char.4.Value = 0.0
Step.1.14.Var.3.Char.5.Ref = acc_csc_014_TTCBadEver
Step.1.14.Var.3.Char.5.Value = 0.0
Step.1.14.Var.3.Char.6.Ref = acc_csc_014_ComfortAx
Step.1.14.Var.3.Char.6.Value = -0.004
Step.1.14.Var.3.Char.7.Ref = acc_csc_014_ComfortAxOutOfBoundEver
Step.1.14.Var.3.Char.7.Value = 1.0
Step.1.14.Var.3.Char.8.Ref = acc_csc_014_EmergencyAx
Step.1.14.Var.3.Char.8.Value = -0.004
Step.1.14.Var.3.Char.9.Ref = acc_csc_014_EmergencyAxOutOfBoundEver
Step.1.14.Var.3.Char.9.Value = 0.0
Step.1.14.Var.3.Char.10.Ref = acc_csc_014_Jerk
Step.1.14.Var.3.Char.10.Value = 0.0
Step.1.14.Var.3.Char.11.Ref = acc_csc_014_JerkOverLimitEver
Step.1.14.Var.3.Char.11.Value = 1.0
Step.1.14.Var.3.Char.12.Ref = acc_csc_014_NoCollDist
Step.1.14.Var.3.Char.12.Value = 999.0
Step.1.14.Var.3.Char.13.Ref = acc_csc_014_NoCollDistViolatedEver
Step.1.14.Var.3.Char.13.Value = 0.0
Step.1.14.Var.3.Char.14.Ref = acc_csc_014_CollisionFlag
Step.1.14.Var.3.Char.14.Value = 0.0
Step.1.14.Var.3.Char.15.Ref = acc_csc_014_ImpactSpeed
Step.1.14.Var.3.Char.15.Value = 0.0
Step.1.14.Var.3.Char.16.Ref = acc_csc_014_CollisionEver
Step.1.14.Var.3.Char.16.Value = 0.0
Step.1.14.Var.3.Crit.0.Ref = acc_csc_014 - Safe Distance Consistency
Step.1.14.Var.3.Crit.0.Result = bad
Step.1.14.Var.3.Crit.1.Ref = acc_csc_014 - Time To Collision
Step.1.14.Var.3.Crit.1.Result = good
Step.1.14.Var.3.Crit.2.Ref = acc_csc_014 - Comfort Deceleration Limit
Step.1.14.Var.3.Crit.2.Result = bad
Step.1.14.Var.3.Crit.3.Ref = acc_csc_014 - Emergency Deceleration Bound
Step.1.14.Var.3.Crit.3.Result = good
Step.1.14.Var.3.Crit.4.Ref = acc_csc_014 - Jerk Limit
Step.1.14.Var.3.Crit.4.Result = bad
Step.1.14.Var.3.Crit.5.Ref = acc_csc_014 - No Collision Distance
Step.1.14.Var.3.Crit.5.Result = good
Step.1.14.Var.3.Crit.6.Ref = acc_csc_014 - Collision Flag
Step.1.14.Var.3.Crit.6.Result = good
Step.1.14.Var.3.Crit.7.Ref = acc_csc_014 - Impact Speed
Step.1.14.Var.3.Crit.7.Result = good
Step.1.14.Var.4.Name = acc_csc_014_ds005
Step.1.14.Var.4.Param = 30 22 119
Step.1.14.Var.4.Result = bad
Step.1.14.Var.4.ResDate = 1782803980
Step.1.14.Var.4.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_014_141932.erg
Step.1.14.Var.4.ManLst = 0:lat0 1:long0
Step.1.14.Var.4.Char.0.Ref = acc_csc_014_ActualDist
Step.1.14.Var.4.Char.0.Value = 999.0
Step.1.14.Var.4.Char.1.Ref = acc_csc_014_SafeDist
Step.1.14.Var.4.Char.1.Value = 66.03701741558015
Step.1.14.Var.4.Char.2.Ref = acc_csc_014_SafeDistViolated
Step.1.14.Var.4.Char.2.Value = 1.0
Step.1.14.Var.4.Char.3.Ref = acc_csc_014_TTC
Step.1.14.Var.4.Char.3.Value = 0.0
Step.1.14.Var.4.Char.4.Ref = acc_csc_014_TTCWarnEver
Step.1.14.Var.4.Char.4.Value = 0.0
Step.1.14.Var.4.Char.5.Ref = acc_csc_014_TTCBadEver
Step.1.14.Var.4.Char.5.Value = 0.0
Step.1.14.Var.4.Char.6.Ref = acc_csc_014_ComfortAx
Step.1.14.Var.4.Char.6.Value = -0.004
Step.1.14.Var.4.Char.7.Ref = acc_csc_014_ComfortAxOutOfBoundEver
Step.1.14.Var.4.Char.7.Value = 1.0
Step.1.14.Var.4.Char.8.Ref = acc_csc_014_EmergencyAx
Step.1.14.Var.4.Char.8.Value = -0.004
Step.1.14.Var.4.Char.9.Ref = acc_csc_014_EmergencyAxOutOfBoundEver
Step.1.14.Var.4.Char.9.Value = 0.0
Step.1.14.Var.4.Char.10.Ref = acc_csc_014_Jerk
Step.1.14.Var.4.Char.10.Value = 0.0
Step.1.14.Var.4.Char.11.Ref = acc_csc_014_JerkOverLimitEver
Step.1.14.Var.4.Char.11.Value = 1.0
Step.1.14.Var.4.Char.12.Ref = acc_csc_014_NoCollDist
Step.1.14.Var.4.Char.12.Value = 999.0
Step.1.14.Var.4.Char.13.Ref = acc_csc_014_NoCollDistViolatedEver
Step.1.14.Var.4.Char.13.Value = 0.0
Step.1.14.Var.4.Char.14.Ref = acc_csc_014_CollisionFlag
Step.1.14.Var.4.Char.14.Value = 0.0
Step.1.14.Var.4.Char.15.Ref = acc_csc_014_ImpactSpeed
Step.1.14.Var.4.Char.15.Value = 0.0
Step.1.14.Var.4.Char.16.Ref = acc_csc_014_CollisionEver
Step.1.14.Var.4.Char.16.Value = 0.0
Step.1.14.Var.4.Crit.0.Ref = acc_csc_014 - Safe Distance Consistency
Step.1.14.Var.4.Crit.0.Result = bad
Step.1.14.Var.4.Crit.1.Ref = acc_csc_014 - Time To Collision
Step.1.14.Var.4.Crit.1.Result = good
Step.1.14.Var.4.Crit.2.Ref = acc_csc_014 - Comfort Deceleration Limit
Step.1.14.Var.4.Crit.2.Result = bad
Step.1.14.Var.4.Crit.3.Ref = acc_csc_014 - Emergency Deceleration Bound
Step.1.14.Var.4.Crit.3.Result = good
Step.1.14.Var.4.Crit.4.Ref = acc_csc_014 - Jerk Limit
Step.1.14.Var.4.Crit.4.Result = bad
Step.1.14.Var.4.Crit.5.Ref = acc_csc_014 - No Collision Distance
Step.1.14.Var.4.Crit.5.Result = good
Step.1.14.Var.4.Crit.6.Ref = acc_csc_014 - Collision Flag
Step.1.14.Var.4.Crit.6.Result = good
Step.1.14.Var.4.Crit.7.Ref = acc_csc_014 - Impact Speed
Step.1.14.Var.4.Crit.7.Result = good
Step.1.15 = TestRun
Step.1.15.Name = OSC_Imported/longitudinal_feature/ACC/acc_csc_015
Step.1.15.Param.0 = EgoSpeed NValue
Step.1.15.Param.1 = TVSpeed NValue
Step.1.15.Param.2 = TV_initPos NValue
Step.1.15.Char.0.Name = acc_csc_015_ActualDist
Step.1.15.Char.0.Description:
	Actual distance to lead (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.15.Char.0.Identifier = acc_csc_015_ActualDist
Step.1.15.Char.0.Unit =
Step.1.15.Char.0.Param.0 = RTexpr "Qu::acc_csc_015_ActualDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.15.Char.1.Name = acc_csc_015_SafeDist
Step.1.15.Char.1.Description:
	Reference safe distance (signal=FMU.CM_ACCController_V17.Out.Debug.SafeDistance)
Step.1.15.Char.1.Identifier = acc_csc_015_SafeDist
Step.1.15.Char.1.Unit =
Step.1.15.Char.1.Param.0 = RTexpr "Qu::acc_csc_015_SafeDist=FMU.CM_ACCController_V17.Out.Debug.SafeDistance"
Step.1.15.Char.2.Name = acc_csc_015_SafeDistViolated
Step.1.15.Char.2.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment ActualDist<SafeDist while actively following (gate==1); stays 1 for the rest of the run even if distance recovers.
Step.1.15.Char.2.Identifier = acc_csc_015_SafeDistViolated
Step.1.15.Char.2.Unit =
Step.1.15.Char.2.Param.0 = RTexpr {first()?Qu::acc_csc_015_SafeDistViolated=0:acc_csc_015_SafeDistViolated=max(acc_csc_015_SafeDistViolated,(FMU.CM_ACCController_V17.Out.Debug.Fusion.Active==1 && acc_csc_015_ActualDist<acc_csc_015_SafeDist))}
Step.1.15.Char.3.Name = acc_csc_015_TTC
Step.1.15.Char.3.Description:
	Time-to-collision (signal=AccelCtrl.ACC.Time2Collision)
Step.1.15.Char.3.Identifier = acc_csc_015_TTC
Step.1.15.Char.3.Unit =
Step.1.15.Char.3.Param.0 = RTexpr "Qu::acc_csc_015_TTC=AccelCtrl.ACC.Time2Collision"
Step.1.15.Char.4.Name = acc_csc_015_TTCWarnEver
Step.1.15.Char.4.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the warn zone [3.5,11)s.
Step.1.15.Char.4.Identifier = acc_csc_015_TTCWarnEver
Step.1.15.Char.4.Unit =
Step.1.15.Char.4.Param.0 = RTexpr {first()?Qu::acc_csc_015_TTCWarnEver=0:acc_csc_015_TTCWarnEver=max(acc_csc_015_TTCWarnEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_015_TTC>=3.5 && acc_csc_015_TTC<11))}
Step.1.15.Char.5.Name = acc_csc_015_TTCBadEver
Step.1.15.Char.5.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the bad zone (0,3.5)s.
Step.1.15.Char.5.Identifier = acc_csc_015_TTCBadEver
Step.1.15.Char.5.Unit =
Step.1.15.Char.5.Param.0 = RTexpr {first()?Qu::acc_csc_015_TTCBadEver=0:acc_csc_015_TTCBadEver=max(acc_csc_015_TTCBadEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_015_TTC>0 && acc_csc_015_TTC<3.5))}
Step.1.15.Char.6.Name = acc_csc_015_ComfortAx
Step.1.15.Char.6.Description:
	Comfort Deceleration Limit (signal=AccelCtrl.DesiredAx)
Step.1.15.Char.6.Identifier = acc_csc_015_ComfortAx
Step.1.15.Char.6.Unit =
Step.1.15.Char.6.Param.0 = RTexpr "Qu::acc_csc_015_ComfortAx=AccelCtrl.DesiredAx"
Step.1.15.Char.7.Name = acc_csc_015_ComfortAxOutOfBoundEver
Step.1.15.Char.7.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Comfort Deceleration Limit ever goes out of bound (min=-3, max=2.8).
Step.1.15.Char.7.Identifier = acc_csc_015_ComfortAxOutOfBoundEver
Step.1.15.Char.7.Unit =
Step.1.15.Char.7.Param.0 = RTexpr {first()?Qu::acc_csc_015_ComfortAxOutOfBoundEver=0:acc_csc_015_ComfortAxOutOfBoundEver=max(acc_csc_015_ComfortAxOutOfBoundEver,(acc_csc_015_ComfortAx<-3 || acc_csc_015_ComfortAx>2.8))}
Step.1.15.Char.8.Name = acc_csc_015_EmergencyAx
Step.1.15.Char.8.Description:
	Emergency Deceleration Bound (signal=AccelCtrl.DesiredAx)
Step.1.15.Char.8.Identifier = acc_csc_015_EmergencyAx
Step.1.15.Char.8.Unit =
Step.1.15.Char.8.Param.0 = RTexpr "Qu::acc_csc_015_EmergencyAx=AccelCtrl.DesiredAx"
Step.1.15.Char.9.Name = acc_csc_015_EmergencyAxOutOfBoundEver
Step.1.15.Char.9.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Emergency Deceleration Bound ever goes out of bound (min=-6).
Step.1.15.Char.9.Identifier = acc_csc_015_EmergencyAxOutOfBoundEver
Step.1.15.Char.9.Unit =
Step.1.15.Char.9.Param.0 = RTexpr {first()?Qu::acc_csc_015_EmergencyAxOutOfBoundEver=0:acc_csc_015_EmergencyAxOutOfBoundEver=max(acc_csc_015_EmergencyAxOutOfBoundEver,(acc_csc_015_EmergencyAx<-6))}
Step.1.15.Char.10.Name = acc_csc_015_Jerk
Step.1.15.Char.10.Description:
	Jerk = |d(DesiredAx)/dt|, base signal=AccelCtrl.DesiredAx
Step.1.15.Char.10.Identifier = acc_csc_015_Jerk
Step.1.15.Char.10.Unit =
Step.1.15.Char.10.Param.0 = RTexpr "Qu::acc_csc_015_Jerk=abs(diff(AccelCtrl.DesiredAx,Time))"
Step.1.15.Char.11.Name = acc_csc_015_JerkOverLimitEver
Step.1.15.Char.11.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment |jerk| ever exceeds 4 m/s3.
Step.1.15.Char.11.Identifier = acc_csc_015_JerkOverLimitEver
Step.1.15.Char.11.Unit =
Step.1.15.Char.11.Param.0 = RTexpr {first()?Qu::acc_csc_015_JerkOverLimitEver=0:acc_csc_015_JerkOverLimitEver=max(acc_csc_015_JerkOverLimitEver,(acc_csc_015_Jerk>4))}
Step.1.15.Char.12.Name = acc_csc_015_NoCollDist
Step.1.15.Char.12.Description:
	Distance to nearest lead object (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.15.Char.12.Identifier = acc_csc_015_NoCollDist
Step.1.15.Char.12.Unit =
Step.1.15.Char.12.Param.0 = RTexpr "Qu::acc_csc_015_NoCollDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.15.Char.13.Name = acc_csc_015_NoCollDistViolatedEver
Step.1.15.Char.13.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment distance ever drops below 0m.
Step.1.15.Char.13.Identifier = acc_csc_015_NoCollDistViolatedEver
Step.1.15.Char.13.Unit =
Step.1.15.Char.13.Param.0 = RTexpr {first()?Qu::acc_csc_015_NoCollDistViolatedEver=0:acc_csc_015_NoCollDistViolatedEver=max(acc_csc_015_NoCollDistViolatedEver,(acc_csc_015_NoCollDist<0))}
Step.1.15.Char.14.Name = acc_csc_015_CollisionFlag
Step.1.15.Char.14.Description:
	Collision flag derived from FMU.CM_ACCController_V17.Out.Debug.Target.DistX <= 0 (nearest lead object); instantaneous, used as the latch() trigger for ImpactSpeed below.
Step.1.15.Char.14.Identifier = acc_csc_015_CollisionFlag
Step.1.15.Char.14.Unit =
Step.1.15.Char.14.Param.0 = RTexpr "Qu::acc_csc_015_CollisionFlag=(FMU.CM_ACCController_V17.Out.Debug.Target.DistX<=0)"
Step.1.15.Char.15.Name = acc_csc_015_ImpactSpeed
Step.1.15.Char.15.Description:
	Ego speed latched at moment of first collision (nearest lead object)
Step.1.15.Char.15.Identifier = acc_csc_015_ImpactSpeed
Step.1.15.Char.15.Unit =
Step.1.15.Char.15.Param.0 = RTexpr {Qu::acc_csc_015_ImpactSpeed=latch(Speed("Ego"),Qu::acc_csc_015_CollisionFlag==1)}
Step.1.15.Char.16.Name = acc_csc_015_CollisionEver
Step.1.15.Char.16.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment a collision ever occurs (nearest lead object), even if the vehicles separate again before the run ends.
Step.1.15.Char.16.Identifier = acc_csc_015_CollisionEver
Step.1.15.Char.16.Unit =
Step.1.15.Char.16.Param.0 = RTexpr {first()?Qu::acc_csc_015_CollisionEver=0:acc_csc_015_CollisionEver=max(acc_csc_015_CollisionEver,(acc_csc_015_CollisionFlag==1))}
Step.1.15.Crit.0.Name = acc_csc_015 - Safe Distance Consistency
Step.1.15.Crit.0.Description:
	Good if SafeDist was never violated while actively following throughout the run. Bad if it was violated at any point.
Step.1.15.Crit.0.Good = [get acc_csc_015_SafeDistViolated] == 0
Step.1.15.Crit.0.Warn =
Step.1.15.Crit.0.Bad = [get acc_csc_015_SafeDistViolated] == 1
Step.1.15.Crit.1.Name = acc_csc_015 - Time To Collision
Step.1.15.Crit.1.Description:
	Good if TTC never entered the warn/bad zone while a valid target existed throughout the run. Warn if it ever entered [3.5,11)s. Bad if it ever entered (0,3.5)s.
Step.1.15.Crit.1.Good = [get acc_csc_015_TTCBadEver] == 0 && [get acc_csc_015_TTCWarnEver] == 0
Step.1.15.Crit.1.Warn = [get acc_csc_015_TTCBadEver] == 0 && [get acc_csc_015_TTCWarnEver] == 1
Step.1.15.Crit.1.Bad = [get acc_csc_015_TTCBadEver] == 1
Step.1.15.Crit.2.Name = acc_csc_015 - Comfort Deceleration Limit
Step.1.15.Crit.2.Description:
	Good if Comfort Deceleration Limit never went out of bound (min=-3, max=2.8) throughout the run.
Step.1.15.Crit.2.Good = [get acc_csc_015_ComfortAxOutOfBoundEver] == 0
Step.1.15.Crit.2.Warn =
Step.1.15.Crit.2.Bad = [get acc_csc_015_ComfortAxOutOfBoundEver] == 1
Step.1.15.Crit.3.Name = acc_csc_015 - Emergency Deceleration Bound
Step.1.15.Crit.3.Description:
	Good if Emergency Deceleration Bound never went out of bound (min=-6) throughout the run.
Step.1.15.Crit.3.Good = [get acc_csc_015_EmergencyAxOutOfBoundEver] == 0
Step.1.15.Crit.3.Warn =
Step.1.15.Crit.3.Bad = [get acc_csc_015_EmergencyAxOutOfBoundEver] == 1
Step.1.15.Crit.4.Name = acc_csc_015 - Jerk Limit
Step.1.15.Crit.4.Description:
	Good if |jerk| never exceeded 4 m/s3 throughout the run.
Step.1.15.Crit.4.Good = [get acc_csc_015_JerkOverLimitEver] == 0
Step.1.15.Crit.4.Warn =
Step.1.15.Crit.4.Bad = [get acc_csc_015_JerkOverLimitEver] == 1
Step.1.15.Crit.5.Name = acc_csc_015 - No Collision Distance
Step.1.15.Crit.5.Description:
	Good if distance never dropped below 0m throughout the run.
Step.1.15.Crit.5.Good = [get acc_csc_015_NoCollDistViolatedEver] == 0
Step.1.15.Crit.5.Warn =
Step.1.15.Crit.5.Bad = [get acc_csc_015_NoCollDistViolatedEver] == 1
Step.1.15.Crit.6.Name = acc_csc_015 - Collision Flag
Step.1.15.Crit.6.Description:
	Good if no collision ever occurred (nearest lead object) throughout the run.
Step.1.15.Crit.6.Good = [get acc_csc_015_CollisionEver] == 0
Step.1.15.Crit.6.Warn =
Step.1.15.Crit.6.Bad = [get acc_csc_015_CollisionEver] == 1
Step.1.15.Crit.7.Name = acc_csc_015 - Impact Speed
Step.1.15.Crit.7.Description:
	Good if no collision ever occurred, or impact speed = 0; Warn (0,5) m/s; Bad >= 5 m/s
Step.1.15.Crit.7.Good = [get acc_csc_015_CollisionEver] == 0 || [get acc_csc_015_ImpactSpeed] == 0
Step.1.15.Crit.7.Warn = [get acc_csc_015_CollisionEver] == 1 && [get acc_csc_015_ImpactSpeed] > 0 && [get acc_csc_015_ImpactSpeed] < 5
Step.1.15.Crit.7.Bad = [get acc_csc_015_CollisionEver] == 1 && [get acc_csc_015_ImpactSpeed] >= 5
Step.1.15.Var.0.Name = acc_csc_015_ds001
Step.1.15.Var.0.Param = 12 8 67
Step.1.15.Var.0.Result = bad
Step.1.15.Var.0.ResDate = 1782803993
Step.1.15.Var.0.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_015_141945.erg
Step.1.15.Var.0.ManLst = 0:lat0 1:long0
Step.1.15.Var.0.Char.0.Ref = acc_csc_015_ActualDist
Step.1.15.Var.0.Char.0.Value = 999.0
Step.1.15.Var.0.Char.1.Ref = acc_csc_015_SafeDist
Step.1.15.Var.0.Char.1.Value = 34.50202317943187
Step.1.15.Var.0.Char.2.Ref = acc_csc_015_SafeDistViolated
Step.1.15.Var.0.Char.2.Value = 0.0
Step.1.15.Var.0.Char.3.Ref = acc_csc_015_TTC
Step.1.15.Var.0.Char.3.Value = 0.0
Step.1.15.Var.0.Char.4.Ref = acc_csc_015_TTCWarnEver
Step.1.15.Var.0.Char.4.Value = 0.0
Step.1.15.Var.0.Char.5.Ref = acc_csc_015_TTCBadEver
Step.1.15.Var.0.Char.5.Value = 0.0
Step.1.15.Var.0.Char.6.Ref = acc_csc_015_ComfortAx
Step.1.15.Var.0.Char.6.Value = -0.0007037145850006254
Step.1.15.Var.0.Char.7.Ref = acc_csc_015_ComfortAxOutOfBoundEver
Step.1.15.Var.0.Char.7.Value = 0.0
Step.1.15.Var.0.Char.8.Ref = acc_csc_015_EmergencyAx
Step.1.15.Var.0.Char.8.Value = -0.0007037145850006254
Step.1.15.Var.0.Char.9.Ref = acc_csc_015_EmergencyAxOutOfBoundEver
Step.1.15.Var.0.Char.9.Value = 0.0
Step.1.15.Var.0.Char.10.Ref = acc_csc_015_Jerk
Step.1.15.Var.0.Char.10.Value = 3.5763846995730003e-6
Step.1.15.Var.0.Char.11.Ref = acc_csc_015_JerkOverLimitEver
Step.1.15.Var.0.Char.11.Value = 1.0
Step.1.15.Var.0.Char.12.Ref = acc_csc_015_NoCollDist
Step.1.15.Var.0.Char.12.Value = 999.0
Step.1.15.Var.0.Char.13.Ref = acc_csc_015_NoCollDistViolatedEver
Step.1.15.Var.0.Char.13.Value = 0.0
Step.1.15.Var.0.Char.14.Ref = acc_csc_015_CollisionFlag
Step.1.15.Var.0.Char.14.Value = 0.0
Step.1.15.Var.0.Char.15.Ref = acc_csc_015_ImpactSpeed
Step.1.15.Var.0.Char.15.Value = 0.0
Step.1.15.Var.0.Char.16.Ref = acc_csc_015_CollisionEver
Step.1.15.Var.0.Char.16.Value = 0.0
Step.1.15.Var.0.Crit.0.Ref = acc_csc_015 - Safe Distance Consistency
Step.1.15.Var.0.Crit.0.Result = good
Step.1.15.Var.0.Crit.1.Ref = acc_csc_015 - Time To Collision
Step.1.15.Var.0.Crit.1.Result = good
Step.1.15.Var.0.Crit.2.Ref = acc_csc_015 - Comfort Deceleration Limit
Step.1.15.Var.0.Crit.2.Result = good
Step.1.15.Var.0.Crit.3.Ref = acc_csc_015 - Emergency Deceleration Bound
Step.1.15.Var.0.Crit.3.Result = good
Step.1.15.Var.0.Crit.4.Ref = acc_csc_015 - Jerk Limit
Step.1.15.Var.0.Crit.4.Result = bad
Step.1.15.Var.0.Crit.5.Ref = acc_csc_015 - No Collision Distance
Step.1.15.Var.0.Crit.5.Result = good
Step.1.15.Var.0.Crit.6.Ref = acc_csc_015 - Collision Flag
Step.1.15.Var.0.Crit.6.Result = good
Step.1.15.Var.0.Crit.7.Ref = acc_csc_015 - Impact Speed
Step.1.15.Var.0.Crit.7.Result = good
Step.1.15.Var.1.Name = acc_csc_015_ds002
Step.1.15.Var.1.Param = 15 10 80
Step.1.15.Var.1.Result = err
Step.1.15.Var.1.ResDate = 1782804000
Step.1.15.Var.1.ManLst = 0:lat0 1:long0
Step.1.15.Var.1.Log.0.Time = 10.577
Step.1.15.Var.1.Log.0.Kind = err
Step.1.15.Var.1.Log.0.Text = Simulation ended with errors
Step.1.15.Var.1.Char.0.Ref = acc_csc_015_ActualDist
Step.1.15.Var.1.Char.0.Value = 999.0
Step.1.15.Var.1.Char.1.Ref = acc_csc_015_SafeDist
Step.1.15.Var.1.Char.1.Value = 31.57015804447158
Step.1.15.Var.1.Char.2.Ref = acc_csc_015_SafeDistViolated
Step.1.15.Var.1.Char.2.Value = 0.0
Step.1.15.Var.1.Char.3.Ref = acc_csc_015_TTC
Step.1.15.Var.1.Char.3.Value = 0.0
Step.1.15.Var.1.Char.4.Ref = acc_csc_015_TTCWarnEver
Step.1.15.Var.1.Char.4.Value = 0.0
Step.1.15.Var.1.Char.5.Ref = acc_csc_015_TTCBadEver
Step.1.15.Var.1.Char.5.Value = 0.0
Step.1.15.Var.1.Char.6.Ref = acc_csc_015_ComfortAx
Step.1.15.Var.1.Char.6.Value = 1.9599999999999997
Step.1.15.Var.1.Char.7.Ref = acc_csc_015_ComfortAxOutOfBoundEver
Step.1.15.Var.1.Char.7.Value = 0.0
Step.1.15.Var.1.Char.8.Ref = acc_csc_015_EmergencyAx
Step.1.15.Var.1.Char.8.Value = 1.9599999999999997
Step.1.15.Var.1.Char.9.Ref = acc_csc_015_EmergencyAxOutOfBoundEver
Step.1.15.Var.1.Char.9.Value = 0.0
Step.1.15.Var.1.Char.10.Ref = acc_csc_015_Jerk
Step.1.15.Var.1.Char.10.Value = 0.0
Step.1.15.Var.1.Char.11.Ref = acc_csc_015_JerkOverLimitEver
Step.1.15.Var.1.Char.11.Value = 1.0
Step.1.15.Var.1.Char.12.Ref = acc_csc_015_NoCollDist
Step.1.15.Var.1.Char.12.Value = 999.0
Step.1.15.Var.1.Char.13.Ref = acc_csc_015_NoCollDistViolatedEver
Step.1.15.Var.1.Char.13.Value = 0.0
Step.1.15.Var.1.Char.14.Ref = acc_csc_015_CollisionFlag
Step.1.15.Var.1.Char.14.Value = 0.0
Step.1.15.Var.1.Char.15.Ref = acc_csc_015_ImpactSpeed
Step.1.15.Var.1.Char.15.Value = 0.0
Step.1.15.Var.1.Char.16.Ref = acc_csc_015_CollisionEver
Step.1.15.Var.1.Char.16.Value = 0.0
Step.1.15.Var.1.Crit.0.Ref = acc_csc_015 - Safe Distance Consistency
Step.1.15.Var.1.Crit.0.Result = good
Step.1.15.Var.1.Crit.1.Ref = acc_csc_015 - Time To Collision
Step.1.15.Var.1.Crit.1.Result = good
Step.1.15.Var.1.Crit.2.Ref = acc_csc_015 - Comfort Deceleration Limit
Step.1.15.Var.1.Crit.2.Result = good
Step.1.15.Var.1.Crit.3.Ref = acc_csc_015 - Emergency Deceleration Bound
Step.1.15.Var.1.Crit.3.Result = good
Step.1.15.Var.1.Crit.4.Ref = acc_csc_015 - Jerk Limit
Step.1.15.Var.1.Crit.4.Result = bad
Step.1.15.Var.1.Crit.5.Ref = acc_csc_015 - No Collision Distance
Step.1.15.Var.1.Crit.5.Result = good
Step.1.15.Var.1.Crit.6.Ref = acc_csc_015 - Collision Flag
Step.1.15.Var.1.Crit.6.Result = good
Step.1.15.Var.1.Crit.7.Ref = acc_csc_015 - Impact Speed
Step.1.15.Var.1.Crit.7.Result = good
Step.1.15.Var.2.Name = acc_csc_015_ds003
Step.1.15.Var.2.Param = 20 14 93
Step.1.15.Var.2.Result = bad
Step.1.15.Var.2.ResDate = 1782804013
Step.1.15.Var.2.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_015_142005.erg
Step.1.15.Var.2.ManLst = 0:lat0 1:long0
Step.1.15.Var.2.Char.0.Ref = acc_csc_015_ActualDist
Step.1.15.Var.2.Char.0.Value = 999.0
Step.1.15.Var.2.Char.1.Ref = acc_csc_015_SafeDist
Step.1.15.Var.2.Char.1.Value = 45.49968047826286
Step.1.15.Var.2.Char.2.Ref = acc_csc_015_SafeDistViolated
Step.1.15.Var.2.Char.2.Value = 1.0
Step.1.15.Var.2.Char.3.Ref = acc_csc_015_TTC
Step.1.15.Var.2.Char.3.Value = 0.0
Step.1.15.Var.2.Char.4.Ref = acc_csc_015_TTCWarnEver
Step.1.15.Var.2.Char.4.Value = 0.0
Step.1.15.Var.2.Char.5.Ref = acc_csc_015_TTCBadEver
Step.1.15.Var.2.Char.5.Value = 0.0
Step.1.15.Var.2.Char.6.Ref = acc_csc_015_ComfortAx
Step.1.15.Var.2.Char.6.Value = -0.004
Step.1.15.Var.2.Char.7.Ref = acc_csc_015_ComfortAxOutOfBoundEver
Step.1.15.Var.2.Char.7.Value = 0.0
Step.1.15.Var.2.Char.8.Ref = acc_csc_015_EmergencyAx
Step.1.15.Var.2.Char.8.Value = -0.004
Step.1.15.Var.2.Char.9.Ref = acc_csc_015_EmergencyAxOutOfBoundEver
Step.1.15.Var.2.Char.9.Value = 0.0
Step.1.15.Var.2.Char.10.Ref = acc_csc_015_Jerk
Step.1.15.Var.2.Char.10.Value = 0.0
Step.1.15.Var.2.Char.11.Ref = acc_csc_015_JerkOverLimitEver
Step.1.15.Var.2.Char.11.Value = 1.0
Step.1.15.Var.2.Char.12.Ref = acc_csc_015_NoCollDist
Step.1.15.Var.2.Char.12.Value = 999.0
Step.1.15.Var.2.Char.13.Ref = acc_csc_015_NoCollDistViolatedEver
Step.1.15.Var.2.Char.13.Value = 0.0
Step.1.15.Var.2.Char.14.Ref = acc_csc_015_CollisionFlag
Step.1.15.Var.2.Char.14.Value = 0.0
Step.1.15.Var.2.Char.15.Ref = acc_csc_015_ImpactSpeed
Step.1.15.Var.2.Char.15.Value = 0.0
Step.1.15.Var.2.Char.16.Ref = acc_csc_015_CollisionEver
Step.1.15.Var.2.Char.16.Value = 0.0
Step.1.15.Var.2.Crit.0.Ref = acc_csc_015 - Safe Distance Consistency
Step.1.15.Var.2.Crit.0.Result = bad
Step.1.15.Var.2.Crit.1.Ref = acc_csc_015 - Time To Collision
Step.1.15.Var.2.Crit.1.Result = good
Step.1.15.Var.2.Crit.2.Ref = acc_csc_015 - Comfort Deceleration Limit
Step.1.15.Var.2.Crit.2.Result = good
Step.1.15.Var.2.Crit.3.Ref = acc_csc_015 - Emergency Deceleration Bound
Step.1.15.Var.2.Crit.3.Result = good
Step.1.15.Var.2.Crit.4.Ref = acc_csc_015 - Jerk Limit
Step.1.15.Var.2.Crit.4.Result = bad
Step.1.15.Var.2.Crit.5.Ref = acc_csc_015 - No Collision Distance
Step.1.15.Var.2.Crit.5.Result = good
Step.1.15.Var.2.Crit.6.Ref = acc_csc_015 - Collision Flag
Step.1.15.Var.2.Crit.6.Result = good
Step.1.15.Var.2.Crit.7.Ref = acc_csc_015 - Impact Speed
Step.1.15.Var.2.Crit.7.Result = good
Step.1.15.Var.3.Name = acc_csc_015_ds004
Step.1.15.Var.3.Param = 25 18 106
Step.1.15.Var.3.Result = bad
Step.1.15.Var.3.ResDate = 1782804025
Step.1.15.Var.3.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_015_142017.erg
Step.1.15.Var.3.ManLst = 0:lat0 1:long0
Step.1.15.Var.3.Char.0.Ref = acc_csc_015_ActualDist
Step.1.15.Var.3.Char.0.Value = 999.0
Step.1.15.Var.3.Char.1.Ref = acc_csc_015_SafeDist
Step.1.15.Var.3.Char.1.Value = 56.178895204276095
Step.1.15.Var.3.Char.2.Ref = acc_csc_015_SafeDistViolated
Step.1.15.Var.3.Char.2.Value = 1.0
Step.1.15.Var.3.Char.3.Ref = acc_csc_015_TTC
Step.1.15.Var.3.Char.3.Value = 0.0
Step.1.15.Var.3.Char.4.Ref = acc_csc_015_TTCWarnEver
Step.1.15.Var.3.Char.4.Value = 0.0
Step.1.15.Var.3.Char.5.Ref = acc_csc_015_TTCBadEver
Step.1.15.Var.3.Char.5.Value = 0.0
Step.1.15.Var.3.Char.6.Ref = acc_csc_015_ComfortAx
Step.1.15.Var.3.Char.6.Value = -0.004
Step.1.15.Var.3.Char.7.Ref = acc_csc_015_ComfortAxOutOfBoundEver
Step.1.15.Var.3.Char.7.Value = 1.0
Step.1.15.Var.3.Char.8.Ref = acc_csc_015_EmergencyAx
Step.1.15.Var.3.Char.8.Value = -0.004
Step.1.15.Var.3.Char.9.Ref = acc_csc_015_EmergencyAxOutOfBoundEver
Step.1.15.Var.3.Char.9.Value = 0.0
Step.1.15.Var.3.Char.10.Ref = acc_csc_015_Jerk
Step.1.15.Var.3.Char.10.Value = 0.0
Step.1.15.Var.3.Char.11.Ref = acc_csc_015_JerkOverLimitEver
Step.1.15.Var.3.Char.11.Value = 1.0
Step.1.15.Var.3.Char.12.Ref = acc_csc_015_NoCollDist
Step.1.15.Var.3.Char.12.Value = 999.0
Step.1.15.Var.3.Char.13.Ref = acc_csc_015_NoCollDistViolatedEver
Step.1.15.Var.3.Char.13.Value = 0.0
Step.1.15.Var.3.Char.14.Ref = acc_csc_015_CollisionFlag
Step.1.15.Var.3.Char.14.Value = 0.0
Step.1.15.Var.3.Char.15.Ref = acc_csc_015_ImpactSpeed
Step.1.15.Var.3.Char.15.Value = 0.0
Step.1.15.Var.3.Char.16.Ref = acc_csc_015_CollisionEver
Step.1.15.Var.3.Char.16.Value = 0.0
Step.1.15.Var.3.Crit.0.Ref = acc_csc_015 - Safe Distance Consistency
Step.1.15.Var.3.Crit.0.Result = bad
Step.1.15.Var.3.Crit.1.Ref = acc_csc_015 - Time To Collision
Step.1.15.Var.3.Crit.1.Result = good
Step.1.15.Var.3.Crit.2.Ref = acc_csc_015 - Comfort Deceleration Limit
Step.1.15.Var.3.Crit.2.Result = bad
Step.1.15.Var.3.Crit.3.Ref = acc_csc_015 - Emergency Deceleration Bound
Step.1.15.Var.3.Crit.3.Result = good
Step.1.15.Var.3.Crit.4.Ref = acc_csc_015 - Jerk Limit
Step.1.15.Var.3.Crit.4.Result = bad
Step.1.15.Var.3.Crit.5.Ref = acc_csc_015 - No Collision Distance
Step.1.15.Var.3.Crit.5.Result = good
Step.1.15.Var.3.Crit.6.Ref = acc_csc_015 - Collision Flag
Step.1.15.Var.3.Crit.6.Result = good
Step.1.15.Var.3.Crit.7.Ref = acc_csc_015 - Impact Speed
Step.1.15.Var.3.Crit.7.Result = good
Step.1.15.Var.4.Name = acc_csc_015_ds005
Step.1.15.Var.4.Param = 30 22 119
Step.1.15.Var.4.Result = bad
Step.1.15.Var.4.ResDate = 1782804037
Step.1.15.Var.4.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_015_142029.erg
Step.1.15.Var.4.ManLst = 0:lat0 1:long0
Step.1.15.Var.4.Char.0.Ref = acc_csc_015_ActualDist
Step.1.15.Var.4.Char.0.Value = 999.0
Step.1.15.Var.4.Char.1.Ref = acc_csc_015_SafeDist
Step.1.15.Var.4.Char.1.Value = 66.00055922239747
Step.1.15.Var.4.Char.2.Ref = acc_csc_015_SafeDistViolated
Step.1.15.Var.4.Char.2.Value = 1.0
Step.1.15.Var.4.Char.3.Ref = acc_csc_015_TTC
Step.1.15.Var.4.Char.3.Value = 0.0
Step.1.15.Var.4.Char.4.Ref = acc_csc_015_TTCWarnEver
Step.1.15.Var.4.Char.4.Value = 0.0
Step.1.15.Var.4.Char.5.Ref = acc_csc_015_TTCBadEver
Step.1.15.Var.4.Char.5.Value = 0.0
Step.1.15.Var.4.Char.6.Ref = acc_csc_015_ComfortAx
Step.1.15.Var.4.Char.6.Value = -0.004
Step.1.15.Var.4.Char.7.Ref = acc_csc_015_ComfortAxOutOfBoundEver
Step.1.15.Var.4.Char.7.Value = 1.0
Step.1.15.Var.4.Char.8.Ref = acc_csc_015_EmergencyAx
Step.1.15.Var.4.Char.8.Value = -0.004
Step.1.15.Var.4.Char.9.Ref = acc_csc_015_EmergencyAxOutOfBoundEver
Step.1.15.Var.4.Char.9.Value = 0.0
Step.1.15.Var.4.Char.10.Ref = acc_csc_015_Jerk
Step.1.15.Var.4.Char.10.Value = 0.0
Step.1.15.Var.4.Char.11.Ref = acc_csc_015_JerkOverLimitEver
Step.1.15.Var.4.Char.11.Value = 1.0
Step.1.15.Var.4.Char.12.Ref = acc_csc_015_NoCollDist
Step.1.15.Var.4.Char.12.Value = 999.0
Step.1.15.Var.4.Char.13.Ref = acc_csc_015_NoCollDistViolatedEver
Step.1.15.Var.4.Char.13.Value = 0.0
Step.1.15.Var.4.Char.14.Ref = acc_csc_015_CollisionFlag
Step.1.15.Var.4.Char.14.Value = 0.0
Step.1.15.Var.4.Char.15.Ref = acc_csc_015_ImpactSpeed
Step.1.15.Var.4.Char.15.Value = 0.0
Step.1.15.Var.4.Char.16.Ref = acc_csc_015_CollisionEver
Step.1.15.Var.4.Char.16.Value = 0.0
Step.1.15.Var.4.Crit.0.Ref = acc_csc_015 - Safe Distance Consistency
Step.1.15.Var.4.Crit.0.Result = bad
Step.1.15.Var.4.Crit.1.Ref = acc_csc_015 - Time To Collision
Step.1.15.Var.4.Crit.1.Result = good
Step.1.15.Var.4.Crit.2.Ref = acc_csc_015 - Comfort Deceleration Limit
Step.1.15.Var.4.Crit.2.Result = bad
Step.1.15.Var.4.Crit.3.Ref = acc_csc_015 - Emergency Deceleration Bound
Step.1.15.Var.4.Crit.3.Result = good
Step.1.15.Var.4.Crit.4.Ref = acc_csc_015 - Jerk Limit
Step.1.15.Var.4.Crit.4.Result = bad
Step.1.15.Var.4.Crit.5.Ref = acc_csc_015 - No Collision Distance
Step.1.15.Var.4.Crit.5.Result = good
Step.1.15.Var.4.Crit.6.Ref = acc_csc_015 - Collision Flag
Step.1.15.Var.4.Crit.6.Result = good
Step.1.15.Var.4.Crit.7.Ref = acc_csc_015 - Impact Speed
Step.1.15.Var.4.Crit.7.Result = good
Step.1.16 = TestRun
Step.1.16.Name = OSC_Imported/longitudinal_feature/ACC/acc_csc_016
Step.1.16.Param.0 = EgoSpeed NValue
Step.1.16.Param.1 = TVSpeed NValue
Step.1.16.Param.2 = TV_initPos NValue
Step.1.16.Char.0.Name = acc_csc_016_ActualDist
Step.1.16.Char.0.Description:
	Actual distance to lead (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.16.Char.0.Identifier = acc_csc_016_ActualDist
Step.1.16.Char.0.Unit =
Step.1.16.Char.0.Param.0 = RTexpr "Qu::acc_csc_016_ActualDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.16.Char.1.Name = acc_csc_016_SafeDist
Step.1.16.Char.1.Description:
	Reference safe distance (signal=FMU.CM_ACCController_V17.Out.Debug.SafeDistance)
Step.1.16.Char.1.Identifier = acc_csc_016_SafeDist
Step.1.16.Char.1.Unit =
Step.1.16.Char.1.Param.0 = RTexpr "Qu::acc_csc_016_SafeDist=FMU.CM_ACCController_V17.Out.Debug.SafeDistance"
Step.1.16.Char.2.Name = acc_csc_016_SafeDistViolated
Step.1.16.Char.2.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment ActualDist<SafeDist while actively following (gate==1); stays 1 for the rest of the run even if distance recovers.
Step.1.16.Char.2.Identifier = acc_csc_016_SafeDistViolated
Step.1.16.Char.2.Unit =
Step.1.16.Char.2.Param.0 = RTexpr {first()?Qu::acc_csc_016_SafeDistViolated=0:acc_csc_016_SafeDistViolated=max(acc_csc_016_SafeDistViolated,(FMU.CM_ACCController_V17.Out.Debug.Fusion.Active==1 && acc_csc_016_ActualDist<acc_csc_016_SafeDist))}
Step.1.16.Char.3.Name = acc_csc_016_TTC
Step.1.16.Char.3.Description:
	Time-to-collision (signal=AccelCtrl.ACC.Time2Collision)
Step.1.16.Char.3.Identifier = acc_csc_016_TTC
Step.1.16.Char.3.Unit =
Step.1.16.Char.3.Param.0 = RTexpr "Qu::acc_csc_016_TTC=AccelCtrl.ACC.Time2Collision"
Step.1.16.Char.4.Name = acc_csc_016_TTCWarnEver
Step.1.16.Char.4.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the warn zone [3.5,11)s.
Step.1.16.Char.4.Identifier = acc_csc_016_TTCWarnEver
Step.1.16.Char.4.Unit =
Step.1.16.Char.4.Param.0 = RTexpr {first()?Qu::acc_csc_016_TTCWarnEver=0:acc_csc_016_TTCWarnEver=max(acc_csc_016_TTCWarnEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_016_TTC>=3.5 && acc_csc_016_TTC<11))}
Step.1.16.Char.5.Name = acc_csc_016_TTCBadEver
Step.1.16.Char.5.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the bad zone (0,3.5)s.
Step.1.16.Char.5.Identifier = acc_csc_016_TTCBadEver
Step.1.16.Char.5.Unit =
Step.1.16.Char.5.Param.0 = RTexpr {first()?Qu::acc_csc_016_TTCBadEver=0:acc_csc_016_TTCBadEver=max(acc_csc_016_TTCBadEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_016_TTC>0 && acc_csc_016_TTC<3.5))}
Step.1.16.Char.6.Name = acc_csc_016_ComfortAx
Step.1.16.Char.6.Description:
	Comfort Deceleration Limit (signal=AccelCtrl.DesiredAx)
Step.1.16.Char.6.Identifier = acc_csc_016_ComfortAx
Step.1.16.Char.6.Unit =
Step.1.16.Char.6.Param.0 = RTexpr "Qu::acc_csc_016_ComfortAx=AccelCtrl.DesiredAx"
Step.1.16.Char.7.Name = acc_csc_016_ComfortAxOutOfBoundEver
Step.1.16.Char.7.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Comfort Deceleration Limit ever goes out of bound (min=-3, max=2.8).
Step.1.16.Char.7.Identifier = acc_csc_016_ComfortAxOutOfBoundEver
Step.1.16.Char.7.Unit =
Step.1.16.Char.7.Param.0 = RTexpr {first()?Qu::acc_csc_016_ComfortAxOutOfBoundEver=0:acc_csc_016_ComfortAxOutOfBoundEver=max(acc_csc_016_ComfortAxOutOfBoundEver,(acc_csc_016_ComfortAx<-3 || acc_csc_016_ComfortAx>2.8))}
Step.1.16.Char.8.Name = acc_csc_016_EmergencyAx
Step.1.16.Char.8.Description:
	Emergency Deceleration Bound (signal=AccelCtrl.DesiredAx)
Step.1.16.Char.8.Identifier = acc_csc_016_EmergencyAx
Step.1.16.Char.8.Unit =
Step.1.16.Char.8.Param.0 = RTexpr "Qu::acc_csc_016_EmergencyAx=AccelCtrl.DesiredAx"
Step.1.16.Char.9.Name = acc_csc_016_EmergencyAxOutOfBoundEver
Step.1.16.Char.9.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Emergency Deceleration Bound ever goes out of bound (min=-6).
Step.1.16.Char.9.Identifier = acc_csc_016_EmergencyAxOutOfBoundEver
Step.1.16.Char.9.Unit =
Step.1.16.Char.9.Param.0 = RTexpr {first()?Qu::acc_csc_016_EmergencyAxOutOfBoundEver=0:acc_csc_016_EmergencyAxOutOfBoundEver=max(acc_csc_016_EmergencyAxOutOfBoundEver,(acc_csc_016_EmergencyAx<-6))}
Step.1.16.Char.10.Name = acc_csc_016_Jerk
Step.1.16.Char.10.Description:
	Jerk = |d(DesiredAx)/dt|, base signal=AccelCtrl.DesiredAx
Step.1.16.Char.10.Identifier = acc_csc_016_Jerk
Step.1.16.Char.10.Unit =
Step.1.16.Char.10.Param.0 = RTexpr "Qu::acc_csc_016_Jerk=abs(diff(AccelCtrl.DesiredAx,Time))"
Step.1.16.Char.11.Name = acc_csc_016_JerkOverLimitEver
Step.1.16.Char.11.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment |jerk| ever exceeds 4 m/s3.
Step.1.16.Char.11.Identifier = acc_csc_016_JerkOverLimitEver
Step.1.16.Char.11.Unit =
Step.1.16.Char.11.Param.0 = RTexpr {first()?Qu::acc_csc_016_JerkOverLimitEver=0:acc_csc_016_JerkOverLimitEver=max(acc_csc_016_JerkOverLimitEver,(acc_csc_016_Jerk>4))}
Step.1.16.Char.12.Name = acc_csc_016_NoCollDist
Step.1.16.Char.12.Description:
	Distance to nearest lead object (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.16.Char.12.Identifier = acc_csc_016_NoCollDist
Step.1.16.Char.12.Unit =
Step.1.16.Char.12.Param.0 = RTexpr "Qu::acc_csc_016_NoCollDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.16.Char.13.Name = acc_csc_016_NoCollDistViolatedEver
Step.1.16.Char.13.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment distance ever drops below 0m.
Step.1.16.Char.13.Identifier = acc_csc_016_NoCollDistViolatedEver
Step.1.16.Char.13.Unit =
Step.1.16.Char.13.Param.0 = RTexpr {first()?Qu::acc_csc_016_NoCollDistViolatedEver=0:acc_csc_016_NoCollDistViolatedEver=max(acc_csc_016_NoCollDistViolatedEver,(acc_csc_016_NoCollDist<0))}
Step.1.16.Char.14.Name = acc_csc_016_CollisionFlag
Step.1.16.Char.14.Description:
	Collision flag derived from FMU.CM_ACCController_V17.Out.Debug.Target.DistX <= 0 (nearest lead object); instantaneous, used as the latch() trigger for ImpactSpeed below.
Step.1.16.Char.14.Identifier = acc_csc_016_CollisionFlag
Step.1.16.Char.14.Unit =
Step.1.16.Char.14.Param.0 = RTexpr "Qu::acc_csc_016_CollisionFlag=(FMU.CM_ACCController_V17.Out.Debug.Target.DistX<=0)"
Step.1.16.Char.15.Name = acc_csc_016_ImpactSpeed
Step.1.16.Char.15.Description:
	Ego speed latched at moment of first collision (nearest lead object)
Step.1.16.Char.15.Identifier = acc_csc_016_ImpactSpeed
Step.1.16.Char.15.Unit =
Step.1.16.Char.15.Param.0 = RTexpr {Qu::acc_csc_016_ImpactSpeed=latch(Speed("Ego"),Qu::acc_csc_016_CollisionFlag==1)}
Step.1.16.Char.16.Name = acc_csc_016_CollisionEver
Step.1.16.Char.16.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment a collision ever occurs (nearest lead object), even if the vehicles separate again before the run ends.
Step.1.16.Char.16.Identifier = acc_csc_016_CollisionEver
Step.1.16.Char.16.Unit =
Step.1.16.Char.16.Param.0 = RTexpr {first()?Qu::acc_csc_016_CollisionEver=0:acc_csc_016_CollisionEver=max(acc_csc_016_CollisionEver,(acc_csc_016_CollisionFlag==1))}
Step.1.16.Crit.0.Name = acc_csc_016 - Safe Distance Consistency
Step.1.16.Crit.0.Description:
	Good if SafeDist was never violated while actively following throughout the run. Bad if it was violated at any point.
Step.1.16.Crit.0.Good = [get acc_csc_016_SafeDistViolated] == 0
Step.1.16.Crit.0.Warn =
Step.1.16.Crit.0.Bad = [get acc_csc_016_SafeDistViolated] == 1
Step.1.16.Crit.1.Name = acc_csc_016 - Time To Collision
Step.1.16.Crit.1.Description:
	Good if TTC never entered the warn/bad zone while a valid target existed throughout the run. Warn if it ever entered [3.5,11)s. Bad if it ever entered (0,3.5)s.
Step.1.16.Crit.1.Good = [get acc_csc_016_TTCBadEver] == 0 && [get acc_csc_016_TTCWarnEver] == 0
Step.1.16.Crit.1.Warn = [get acc_csc_016_TTCBadEver] == 0 && [get acc_csc_016_TTCWarnEver] == 1
Step.1.16.Crit.1.Bad = [get acc_csc_016_TTCBadEver] == 1
Step.1.16.Crit.2.Name = acc_csc_016 - Comfort Deceleration Limit
Step.1.16.Crit.2.Description:
	Good if Comfort Deceleration Limit never went out of bound (min=-3, max=2.8) throughout the run.
Step.1.16.Crit.2.Good = [get acc_csc_016_ComfortAxOutOfBoundEver] == 0
Step.1.16.Crit.2.Warn =
Step.1.16.Crit.2.Bad = [get acc_csc_016_ComfortAxOutOfBoundEver] == 1
Step.1.16.Crit.3.Name = acc_csc_016 - Emergency Deceleration Bound
Step.1.16.Crit.3.Description:
	Good if Emergency Deceleration Bound never went out of bound (min=-6) throughout the run.
Step.1.16.Crit.3.Good = [get acc_csc_016_EmergencyAxOutOfBoundEver] == 0
Step.1.16.Crit.3.Warn =
Step.1.16.Crit.3.Bad = [get acc_csc_016_EmergencyAxOutOfBoundEver] == 1
Step.1.16.Crit.4.Name = acc_csc_016 - Jerk Limit
Step.1.16.Crit.4.Description:
	Good if |jerk| never exceeded 4 m/s3 throughout the run.
Step.1.16.Crit.4.Good = [get acc_csc_016_JerkOverLimitEver] == 0
Step.1.16.Crit.4.Warn =
Step.1.16.Crit.4.Bad = [get acc_csc_016_JerkOverLimitEver] == 1
Step.1.16.Crit.5.Name = acc_csc_016 - No Collision Distance
Step.1.16.Crit.5.Description:
	Good if distance never dropped below 0m throughout the run.
Step.1.16.Crit.5.Good = [get acc_csc_016_NoCollDistViolatedEver] == 0
Step.1.16.Crit.5.Warn =
Step.1.16.Crit.5.Bad = [get acc_csc_016_NoCollDistViolatedEver] == 1
Step.1.16.Crit.6.Name = acc_csc_016 - Collision Flag
Step.1.16.Crit.6.Description:
	Good if no collision ever occurred (nearest lead object) throughout the run.
Step.1.16.Crit.6.Good = [get acc_csc_016_CollisionEver] == 0
Step.1.16.Crit.6.Warn =
Step.1.16.Crit.6.Bad = [get acc_csc_016_CollisionEver] == 1
Step.1.16.Crit.7.Name = acc_csc_016 - Impact Speed
Step.1.16.Crit.7.Description:
	Good if no collision ever occurred, or impact speed = 0; Warn (0,5) m/s; Bad >= 5 m/s
Step.1.16.Crit.7.Good = [get acc_csc_016_CollisionEver] == 0 || [get acc_csc_016_ImpactSpeed] == 0
Step.1.16.Crit.7.Warn = [get acc_csc_016_CollisionEver] == 1 && [get acc_csc_016_ImpactSpeed] > 0 && [get acc_csc_016_ImpactSpeed] < 5
Step.1.16.Crit.7.Bad = [get acc_csc_016_CollisionEver] == 1 && [get acc_csc_016_ImpactSpeed] >= 5
Step.1.16.Var.0.Name = acc_csc_016_ds001
Step.1.16.Var.0.Param = 12 8 58
Step.1.16.Var.0.Result = bad
Step.1.16.Var.0.ResDate = 1782804049
Step.1.16.Var.0.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_016_142041.erg
Step.1.16.Var.0.ManLst = 0:lat0 1:long0
Step.1.16.Var.0.Char.0.Ref = acc_csc_016_ActualDist
Step.1.16.Var.0.Char.0.Value = 999.0
Step.1.16.Var.0.Char.1.Ref = acc_csc_016_SafeDist
Step.1.16.Var.0.Char.1.Value = 34.50212888854423
Step.1.16.Var.0.Char.2.Ref = acc_csc_016_SafeDistViolated
Step.1.16.Var.0.Char.2.Value = 0.0
Step.1.16.Var.0.Char.3.Ref = acc_csc_016_TTC
Step.1.16.Var.0.Char.3.Value = 0.0
Step.1.16.Var.0.Char.4.Ref = acc_csc_016_TTCWarnEver
Step.1.16.Var.0.Char.4.Value = 0.0
Step.1.16.Var.0.Char.5.Ref = acc_csc_016_TTCBadEver
Step.1.16.Var.0.Char.5.Value = 0.0
Step.1.16.Var.0.Char.6.Ref = acc_csc_016_ComfortAx
Step.1.16.Var.0.Char.6.Value = -0.0007404829719050099
Step.1.16.Var.0.Char.7.Ref = acc_csc_016_ComfortAxOutOfBoundEver
Step.1.16.Var.0.Char.7.Value = 0.0
Step.1.16.Var.0.Char.8.Ref = acc_csc_016_EmergencyAx
Step.1.16.Var.0.Char.8.Value = -0.0007404829719050099
Step.1.16.Var.0.Char.9.Ref = acc_csc_016_EmergencyAxOutOfBoundEver
Step.1.16.Var.0.Char.9.Value = 0.0
Step.1.16.Var.0.Char.10.Ref = acc_csc_016_Jerk
Step.1.16.Var.0.Char.10.Value = 9.218581453773025e-7
Step.1.16.Var.0.Char.11.Ref = acc_csc_016_JerkOverLimitEver
Step.1.16.Var.0.Char.11.Value = 1.0
Step.1.16.Var.0.Char.12.Ref = acc_csc_016_NoCollDist
Step.1.16.Var.0.Char.12.Value = 999.0
Step.1.16.Var.0.Char.13.Ref = acc_csc_016_NoCollDistViolatedEver
Step.1.16.Var.0.Char.13.Value = 0.0
Step.1.16.Var.0.Char.14.Ref = acc_csc_016_CollisionFlag
Step.1.16.Var.0.Char.14.Value = 0.0
Step.1.16.Var.0.Char.15.Ref = acc_csc_016_ImpactSpeed
Step.1.16.Var.0.Char.15.Value = 0.0
Step.1.16.Var.0.Char.16.Ref = acc_csc_016_CollisionEver
Step.1.16.Var.0.Char.16.Value = 0.0
Step.1.16.Var.0.Crit.0.Ref = acc_csc_016 - Safe Distance Consistency
Step.1.16.Var.0.Crit.0.Result = good
Step.1.16.Var.0.Crit.1.Ref = acc_csc_016 - Time To Collision
Step.1.16.Var.0.Crit.1.Result = good
Step.1.16.Var.0.Crit.2.Ref = acc_csc_016 - Comfort Deceleration Limit
Step.1.16.Var.0.Crit.2.Result = good
Step.1.16.Var.0.Crit.3.Ref = acc_csc_016 - Emergency Deceleration Bound
Step.1.16.Var.0.Crit.3.Result = good
Step.1.16.Var.0.Crit.4.Ref = acc_csc_016 - Jerk Limit
Step.1.16.Var.0.Crit.4.Result = bad
Step.1.16.Var.0.Crit.5.Ref = acc_csc_016 - No Collision Distance
Step.1.16.Var.0.Crit.5.Result = good
Step.1.16.Var.0.Crit.6.Ref = acc_csc_016 - Collision Flag
Step.1.16.Var.0.Crit.6.Result = good
Step.1.16.Var.0.Crit.7.Ref = acc_csc_016 - Impact Speed
Step.1.16.Var.0.Crit.7.Result = good
Step.1.16.Var.1.Name = acc_csc_016_ds002
Step.1.16.Var.1.Param = 15 10 65
Step.1.16.Var.1.Result = bad
Step.1.16.Var.1.ResDate = 1782804062
Step.1.16.Var.1.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_016_142054.erg
Step.1.16.Var.1.ManLst = 0:lat0 1:long0
Step.1.16.Var.1.Char.0.Ref = acc_csc_016_ActualDist
Step.1.16.Var.1.Char.0.Value = 999.0
Step.1.16.Var.1.Char.1.Ref = acc_csc_016_SafeDist
Step.1.16.Var.1.Char.1.Value = 35.08409447321023
Step.1.16.Var.1.Char.2.Ref = acc_csc_016_SafeDistViolated
Step.1.16.Var.1.Char.2.Value = 1.0
Step.1.16.Var.1.Char.3.Ref = acc_csc_016_TTC
Step.1.16.Var.1.Char.3.Value = 0.0
Step.1.16.Var.1.Char.4.Ref = acc_csc_016_TTCWarnEver
Step.1.16.Var.1.Char.4.Value = 0.0
Step.1.16.Var.1.Char.5.Ref = acc_csc_016_TTCBadEver
Step.1.16.Var.1.Char.5.Value = 0.0
Step.1.16.Var.1.Char.6.Ref = acc_csc_016_ComfortAx
Step.1.16.Var.1.Char.6.Value = -0.004
Step.1.16.Var.1.Char.7.Ref = acc_csc_016_ComfortAxOutOfBoundEver
Step.1.16.Var.1.Char.7.Value = 1.0
Step.1.16.Var.1.Char.8.Ref = acc_csc_016_EmergencyAx
Step.1.16.Var.1.Char.8.Value = -0.004
Step.1.16.Var.1.Char.9.Ref = acc_csc_016_EmergencyAxOutOfBoundEver
Step.1.16.Var.1.Char.9.Value = 0.0
Step.1.16.Var.1.Char.10.Ref = acc_csc_016_Jerk
Step.1.16.Var.1.Char.10.Value = 0.0
Step.1.16.Var.1.Char.11.Ref = acc_csc_016_JerkOverLimitEver
Step.1.16.Var.1.Char.11.Value = 1.0
Step.1.16.Var.1.Char.12.Ref = acc_csc_016_NoCollDist
Step.1.16.Var.1.Char.12.Value = 999.0
Step.1.16.Var.1.Char.13.Ref = acc_csc_016_NoCollDistViolatedEver
Step.1.16.Var.1.Char.13.Value = 0.0
Step.1.16.Var.1.Char.14.Ref = acc_csc_016_CollisionFlag
Step.1.16.Var.1.Char.14.Value = 0.0
Step.1.16.Var.1.Char.15.Ref = acc_csc_016_ImpactSpeed
Step.1.16.Var.1.Char.15.Value = 0.0
Step.1.16.Var.1.Char.16.Ref = acc_csc_016_CollisionEver
Step.1.16.Var.1.Char.16.Value = 0.0
Step.1.16.Var.1.Crit.0.Ref = acc_csc_016 - Safe Distance Consistency
Step.1.16.Var.1.Crit.0.Result = bad
Step.1.16.Var.1.Crit.1.Ref = acc_csc_016 - Time To Collision
Step.1.16.Var.1.Crit.1.Result = good
Step.1.16.Var.1.Crit.2.Ref = acc_csc_016 - Comfort Deceleration Limit
Step.1.16.Var.1.Crit.2.Result = bad
Step.1.16.Var.1.Crit.3.Ref = acc_csc_016 - Emergency Deceleration Bound
Step.1.16.Var.1.Crit.3.Result = good
Step.1.16.Var.1.Crit.4.Ref = acc_csc_016 - Jerk Limit
Step.1.16.Var.1.Crit.4.Result = bad
Step.1.16.Var.1.Crit.5.Ref = acc_csc_016 - No Collision Distance
Step.1.16.Var.1.Crit.5.Result = good
Step.1.16.Var.1.Crit.6.Ref = acc_csc_016 - Collision Flag
Step.1.16.Var.1.Crit.6.Result = good
Step.1.16.Var.1.Crit.7.Ref = acc_csc_016 - Impact Speed
Step.1.16.Var.1.Crit.7.Result = good
Step.1.16.Var.2.Name = acc_csc_016_ds003
Step.1.16.Var.2.Param = 20 14 80
Step.1.16.Var.2.Result = bad
Step.1.16.Var.2.ResDate = 1782804074
Step.1.16.Var.2.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_016_142106.erg
Step.1.16.Var.2.ManLst = 0:lat0 1:long0
Step.1.16.Var.2.Char.0.Ref = acc_csc_016_ActualDist
Step.1.16.Var.2.Char.0.Value = 999.0
Step.1.16.Var.2.Char.1.Ref = acc_csc_016_SafeDist
Step.1.16.Var.2.Char.1.Value = 35.810565678317985
Step.1.16.Var.2.Char.2.Ref = acc_csc_016_SafeDistViolated
Step.1.16.Var.2.Char.2.Value = 1.0
Step.1.16.Var.2.Char.3.Ref = acc_csc_016_TTC
Step.1.16.Var.2.Char.3.Value = 0.0
Step.1.16.Var.2.Char.4.Ref = acc_csc_016_TTCWarnEver
Step.1.16.Var.2.Char.4.Value = 0.0
Step.1.16.Var.2.Char.5.Ref = acc_csc_016_TTCBadEver
Step.1.16.Var.2.Char.5.Value = 0.0
Step.1.16.Var.2.Char.6.Ref = acc_csc_016_ComfortAx
Step.1.16.Var.2.Char.6.Value = -0.004
Step.1.16.Var.2.Char.7.Ref = acc_csc_016_ComfortAxOutOfBoundEver
Step.1.16.Var.2.Char.7.Value = 1.0
Step.1.16.Var.2.Char.8.Ref = acc_csc_016_EmergencyAx
Step.1.16.Var.2.Char.8.Value = -0.004
Step.1.16.Var.2.Char.9.Ref = acc_csc_016_EmergencyAxOutOfBoundEver
Step.1.16.Var.2.Char.9.Value = 0.0
Step.1.16.Var.2.Char.10.Ref = acc_csc_016_Jerk
Step.1.16.Var.2.Char.10.Value = 0.0
Step.1.16.Var.2.Char.11.Ref = acc_csc_016_JerkOverLimitEver
Step.1.16.Var.2.Char.11.Value = 1.0
Step.1.16.Var.2.Char.12.Ref = acc_csc_016_NoCollDist
Step.1.16.Var.2.Char.12.Value = 999.0
Step.1.16.Var.2.Char.13.Ref = acc_csc_016_NoCollDistViolatedEver
Step.1.16.Var.2.Char.13.Value = 0.0
Step.1.16.Var.2.Char.14.Ref = acc_csc_016_CollisionFlag
Step.1.16.Var.2.Char.14.Value = 0.0
Step.1.16.Var.2.Char.15.Ref = acc_csc_016_ImpactSpeed
Step.1.16.Var.2.Char.15.Value = 0.0
Step.1.16.Var.2.Char.16.Ref = acc_csc_016_CollisionEver
Step.1.16.Var.2.Char.16.Value = 0.0
Step.1.16.Var.2.Crit.0.Ref = acc_csc_016 - Safe Distance Consistency
Step.1.16.Var.2.Crit.0.Result = bad
Step.1.16.Var.2.Crit.1.Ref = acc_csc_016 - Time To Collision
Step.1.16.Var.2.Crit.1.Result = good
Step.1.16.Var.2.Crit.2.Ref = acc_csc_016 - Comfort Deceleration Limit
Step.1.16.Var.2.Crit.2.Result = bad
Step.1.16.Var.2.Crit.3.Ref = acc_csc_016 - Emergency Deceleration Bound
Step.1.16.Var.2.Crit.3.Result = good
Step.1.16.Var.2.Crit.4.Ref = acc_csc_016 - Jerk Limit
Step.1.16.Var.2.Crit.4.Result = bad
Step.1.16.Var.2.Crit.5.Ref = acc_csc_016 - No Collision Distance
Step.1.16.Var.2.Crit.5.Result = good
Step.1.16.Var.2.Crit.6.Ref = acc_csc_016 - Collision Flag
Step.1.16.Var.2.Crit.6.Result = good
Step.1.16.Var.2.Crit.7.Ref = acc_csc_016 - Impact Speed
Step.1.16.Var.2.Crit.7.Result = good
Step.1.16.Var.3.Name = acc_csc_016_ds004
Step.1.16.Var.3.Param = 25 18 92
Step.1.16.Var.3.Result = bad
Step.1.16.Var.3.ResDate = 1782804086
Step.1.16.Var.3.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_016_142118.erg
Step.1.16.Var.3.ManLst = 0:lat0 1:long0
Step.1.16.Var.3.Char.0.Ref = acc_csc_016_ActualDist
Step.1.16.Var.3.Char.0.Value = 999.0
Step.1.16.Var.3.Char.1.Ref = acc_csc_016_SafeDist
Step.1.16.Var.3.Char.1.Value = 45.90206330814947
Step.1.16.Var.3.Char.2.Ref = acc_csc_016_SafeDistViolated
Step.1.16.Var.3.Char.2.Value = 1.0
Step.1.16.Var.3.Char.3.Ref = acc_csc_016_TTC
Step.1.16.Var.3.Char.3.Value = 0.0
Step.1.16.Var.3.Char.4.Ref = acc_csc_016_TTCWarnEver
Step.1.16.Var.3.Char.4.Value = 0.0
Step.1.16.Var.3.Char.5.Ref = acc_csc_016_TTCBadEver
Step.1.16.Var.3.Char.5.Value = 0.0
Step.1.16.Var.3.Char.6.Ref = acc_csc_016_ComfortAx
Step.1.16.Var.3.Char.6.Value = -0.004
Step.1.16.Var.3.Char.7.Ref = acc_csc_016_ComfortAxOutOfBoundEver
Step.1.16.Var.3.Char.7.Value = 1.0
Step.1.16.Var.3.Char.8.Ref = acc_csc_016_EmergencyAx
Step.1.16.Var.3.Char.8.Value = -0.004
Step.1.16.Var.3.Char.9.Ref = acc_csc_016_EmergencyAxOutOfBoundEver
Step.1.16.Var.3.Char.9.Value = 0.0
Step.1.16.Var.3.Char.10.Ref = acc_csc_016_Jerk
Step.1.16.Var.3.Char.10.Value = 0.0
Step.1.16.Var.3.Char.11.Ref = acc_csc_016_JerkOverLimitEver
Step.1.16.Var.3.Char.11.Value = 1.0
Step.1.16.Var.3.Char.12.Ref = acc_csc_016_NoCollDist
Step.1.16.Var.3.Char.12.Value = 999.0
Step.1.16.Var.3.Char.13.Ref = acc_csc_016_NoCollDistViolatedEver
Step.1.16.Var.3.Char.13.Value = 0.0
Step.1.16.Var.3.Char.14.Ref = acc_csc_016_CollisionFlag
Step.1.16.Var.3.Char.14.Value = 0.0
Step.1.16.Var.3.Char.15.Ref = acc_csc_016_ImpactSpeed
Step.1.16.Var.3.Char.15.Value = 0.0
Step.1.16.Var.3.Char.16.Ref = acc_csc_016_CollisionEver
Step.1.16.Var.3.Char.16.Value = 0.0
Step.1.16.Var.3.Crit.0.Ref = acc_csc_016 - Safe Distance Consistency
Step.1.16.Var.3.Crit.0.Result = bad
Step.1.16.Var.3.Crit.1.Ref = acc_csc_016 - Time To Collision
Step.1.16.Var.3.Crit.1.Result = good
Step.1.16.Var.3.Crit.2.Ref = acc_csc_016 - Comfort Deceleration Limit
Step.1.16.Var.3.Crit.2.Result = bad
Step.1.16.Var.3.Crit.3.Ref = acc_csc_016 - Emergency Deceleration Bound
Step.1.16.Var.3.Crit.3.Result = good
Step.1.16.Var.3.Crit.4.Ref = acc_csc_016 - Jerk Limit
Step.1.16.Var.3.Crit.4.Result = bad
Step.1.16.Var.3.Crit.5.Ref = acc_csc_016 - No Collision Distance
Step.1.16.Var.3.Crit.5.Result = good
Step.1.16.Var.3.Crit.6.Ref = acc_csc_016 - Collision Flag
Step.1.16.Var.3.Crit.6.Result = good
Step.1.16.Var.3.Crit.7.Ref = acc_csc_016 - Impact Speed
Step.1.16.Var.3.Crit.7.Result = good
Step.1.16.Var.4.Name = acc_csc_016_ds005
Step.1.16.Var.4.Param = 30 22 103
Step.1.16.Var.4.Result = err
Step.1.16.Var.4.ResDate = 1782804093
Step.1.16.Var.4.ManLst = 0:lat0 1:long0
Step.1.16.Var.4.Log.0.Time = 11.380
Step.1.16.Var.4.Log.0.Kind = err
Step.1.16.Var.4.Log.0.Text = Simulation ended with errors
Step.1.16.Var.4.Char.0.Ref = acc_csc_016_ActualDist
Step.1.16.Var.4.Char.0.Value = 999.0
Step.1.16.Var.4.Char.1.Ref = acc_csc_016_SafeDist
Step.1.16.Var.4.Char.1.Value = 25.0080423038042
Step.1.16.Var.4.Char.2.Ref = acc_csc_016_SafeDistViolated
Step.1.16.Var.4.Char.2.Value = 0.0
Step.1.16.Var.4.Char.3.Ref = acc_csc_016_TTC
Step.1.16.Var.4.Char.3.Value = 0.0
Step.1.16.Var.4.Char.4.Ref = acc_csc_016_TTCWarnEver
Step.1.16.Var.4.Char.4.Value = 0.0
Step.1.16.Var.4.Char.5.Ref = acc_csc_016_TTCBadEver
Step.1.16.Var.4.Char.5.Value = 0.0
Step.1.16.Var.4.Char.6.Ref = acc_csc_016_ComfortAx
Step.1.16.Var.4.Char.6.Value = 2.1022503772622416
Step.1.16.Var.4.Char.7.Ref = acc_csc_016_ComfortAxOutOfBoundEver
Step.1.16.Var.4.Char.7.Value = 0.0
Step.1.16.Var.4.Char.8.Ref = acc_csc_016_EmergencyAx
Step.1.16.Var.4.Char.8.Value = 2.1022503772622416
Step.1.16.Var.4.Char.9.Ref = acc_csc_016_EmergencyAxOutOfBoundEver
Step.1.16.Var.4.Char.9.Value = 0.0
Step.1.16.Var.4.Char.10.Ref = acc_csc_016_Jerk
Step.1.16.Var.4.Char.10.Value = 4.0000000000022204
Step.1.16.Var.4.Char.11.Ref = acc_csc_016_JerkOverLimitEver
Step.1.16.Var.4.Char.11.Value = 1.0
Step.1.16.Var.4.Char.12.Ref = acc_csc_016_NoCollDist
Step.1.16.Var.4.Char.12.Value = 999.0
Step.1.16.Var.4.Char.13.Ref = acc_csc_016_NoCollDistViolatedEver
Step.1.16.Var.4.Char.13.Value = 0.0
Step.1.16.Var.4.Char.14.Ref = acc_csc_016_CollisionFlag
Step.1.16.Var.4.Char.14.Value = 0.0
Step.1.16.Var.4.Char.15.Ref = acc_csc_016_ImpactSpeed
Step.1.16.Var.4.Char.15.Value = 0.0
Step.1.16.Var.4.Char.16.Ref = acc_csc_016_CollisionEver
Step.1.16.Var.4.Char.16.Value = 0.0
Step.1.16.Var.4.Crit.0.Ref = acc_csc_016 - Safe Distance Consistency
Step.1.16.Var.4.Crit.0.Result = good
Step.1.16.Var.4.Crit.1.Ref = acc_csc_016 - Time To Collision
Step.1.16.Var.4.Crit.1.Result = good
Step.1.16.Var.4.Crit.2.Ref = acc_csc_016 - Comfort Deceleration Limit
Step.1.16.Var.4.Crit.2.Result = good
Step.1.16.Var.4.Crit.3.Ref = acc_csc_016 - Emergency Deceleration Bound
Step.1.16.Var.4.Crit.3.Result = good
Step.1.16.Var.4.Crit.4.Ref = acc_csc_016 - Jerk Limit
Step.1.16.Var.4.Crit.4.Result = bad
Step.1.16.Var.4.Crit.5.Ref = acc_csc_016 - No Collision Distance
Step.1.16.Var.4.Crit.5.Result = good
Step.1.16.Var.4.Crit.6.Ref = acc_csc_016 - Collision Flag
Step.1.16.Var.4.Crit.6.Result = good
Step.1.16.Var.4.Crit.7.Ref = acc_csc_016 - Impact Speed
Step.1.16.Var.4.Crit.7.Result = good
Step.1.17 = TestRun
Step.1.17.Name = OSC_Imported/longitudinal_feature/ACC/acc_csc_017
Step.1.17.Param.0 = EgoSpeed NValue
Step.1.17.Param.1 = TVSpeed NValue
Step.1.17.Param.2 = TV_initPos NValue
Step.1.17.Char.0.Name = acc_csc_017_ActualDist
Step.1.17.Char.0.Description:
	Actual distance to lead (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.17.Char.0.Identifier = acc_csc_017_ActualDist
Step.1.17.Char.0.Unit =
Step.1.17.Char.0.Param.0 = RTexpr "Qu::acc_csc_017_ActualDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.17.Char.1.Name = acc_csc_017_SafeDist
Step.1.17.Char.1.Description:
	Reference safe distance (signal=FMU.CM_ACCController_V17.Out.Debug.SafeDistance)
Step.1.17.Char.1.Identifier = acc_csc_017_SafeDist
Step.1.17.Char.1.Unit =
Step.1.17.Char.1.Param.0 = RTexpr "Qu::acc_csc_017_SafeDist=FMU.CM_ACCController_V17.Out.Debug.SafeDistance"
Step.1.17.Char.2.Name = acc_csc_017_SafeDistViolated
Step.1.17.Char.2.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment ActualDist<SafeDist while actively following (gate==1); stays 1 for the rest of the run even if distance recovers.
Step.1.17.Char.2.Identifier = acc_csc_017_SafeDistViolated
Step.1.17.Char.2.Unit =
Step.1.17.Char.2.Param.0 = RTexpr {first()?Qu::acc_csc_017_SafeDistViolated=0:acc_csc_017_SafeDistViolated=max(acc_csc_017_SafeDistViolated,(FMU.CM_ACCController_V17.Out.Debug.Fusion.Active==1 && acc_csc_017_ActualDist<acc_csc_017_SafeDist))}
Step.1.17.Char.3.Name = acc_csc_017_TTC
Step.1.17.Char.3.Description:
	Time-to-collision (signal=AccelCtrl.ACC.Time2Collision)
Step.1.17.Char.3.Identifier = acc_csc_017_TTC
Step.1.17.Char.3.Unit =
Step.1.17.Char.3.Param.0 = RTexpr "Qu::acc_csc_017_TTC=AccelCtrl.ACC.Time2Collision"
Step.1.17.Char.4.Name = acc_csc_017_TTCWarnEver
Step.1.17.Char.4.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the warn zone [3.5,11)s.
Step.1.17.Char.4.Identifier = acc_csc_017_TTCWarnEver
Step.1.17.Char.4.Unit =
Step.1.17.Char.4.Param.0 = RTexpr {first()?Qu::acc_csc_017_TTCWarnEver=0:acc_csc_017_TTCWarnEver=max(acc_csc_017_TTCWarnEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_017_TTC>=3.5 && acc_csc_017_TTC<11))}
Step.1.17.Char.5.Name = acc_csc_017_TTCBadEver
Step.1.17.Char.5.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the bad zone (0,3.5)s.
Step.1.17.Char.5.Identifier = acc_csc_017_TTCBadEver
Step.1.17.Char.5.Unit =
Step.1.17.Char.5.Param.0 = RTexpr {first()?Qu::acc_csc_017_TTCBadEver=0:acc_csc_017_TTCBadEver=max(acc_csc_017_TTCBadEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_017_TTC>0 && acc_csc_017_TTC<3.5))}
Step.1.17.Char.6.Name = acc_csc_017_ComfortAx
Step.1.17.Char.6.Description:
	Comfort Deceleration Limit (signal=AccelCtrl.DesiredAx)
Step.1.17.Char.6.Identifier = acc_csc_017_ComfortAx
Step.1.17.Char.6.Unit =
Step.1.17.Char.6.Param.0 = RTexpr "Qu::acc_csc_017_ComfortAx=AccelCtrl.DesiredAx"
Step.1.17.Char.7.Name = acc_csc_017_ComfortAxOutOfBoundEver
Step.1.17.Char.7.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Comfort Deceleration Limit ever goes out of bound (min=-3, max=2.8).
Step.1.17.Char.7.Identifier = acc_csc_017_ComfortAxOutOfBoundEver
Step.1.17.Char.7.Unit =
Step.1.17.Char.7.Param.0 = RTexpr {first()?Qu::acc_csc_017_ComfortAxOutOfBoundEver=0:acc_csc_017_ComfortAxOutOfBoundEver=max(acc_csc_017_ComfortAxOutOfBoundEver,(acc_csc_017_ComfortAx<-3 || acc_csc_017_ComfortAx>2.8))}
Step.1.17.Char.8.Name = acc_csc_017_EmergencyAx
Step.1.17.Char.8.Description:
	Emergency Deceleration Bound (signal=AccelCtrl.DesiredAx)
Step.1.17.Char.8.Identifier = acc_csc_017_EmergencyAx
Step.1.17.Char.8.Unit =
Step.1.17.Char.8.Param.0 = RTexpr "Qu::acc_csc_017_EmergencyAx=AccelCtrl.DesiredAx"
Step.1.17.Char.9.Name = acc_csc_017_EmergencyAxOutOfBoundEver
Step.1.17.Char.9.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Emergency Deceleration Bound ever goes out of bound (min=-6).
Step.1.17.Char.9.Identifier = acc_csc_017_EmergencyAxOutOfBoundEver
Step.1.17.Char.9.Unit =
Step.1.17.Char.9.Param.0 = RTexpr {first()?Qu::acc_csc_017_EmergencyAxOutOfBoundEver=0:acc_csc_017_EmergencyAxOutOfBoundEver=max(acc_csc_017_EmergencyAxOutOfBoundEver,(acc_csc_017_EmergencyAx<-6))}
Step.1.17.Char.10.Name = acc_csc_017_Jerk
Step.1.17.Char.10.Description:
	Jerk = |d(DesiredAx)/dt|, base signal=AccelCtrl.DesiredAx
Step.1.17.Char.10.Identifier = acc_csc_017_Jerk
Step.1.17.Char.10.Unit =
Step.1.17.Char.10.Param.0 = RTexpr "Qu::acc_csc_017_Jerk=abs(diff(AccelCtrl.DesiredAx,Time))"
Step.1.17.Char.11.Name = acc_csc_017_JerkOverLimitEver
Step.1.17.Char.11.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment |jerk| ever exceeds 4 m/s3.
Step.1.17.Char.11.Identifier = acc_csc_017_JerkOverLimitEver
Step.1.17.Char.11.Unit =
Step.1.17.Char.11.Param.0 = RTexpr {first()?Qu::acc_csc_017_JerkOverLimitEver=0:acc_csc_017_JerkOverLimitEver=max(acc_csc_017_JerkOverLimitEver,(acc_csc_017_Jerk>4))}
Step.1.17.Char.12.Name = acc_csc_017_NoCollDist
Step.1.17.Char.12.Description:
	Distance to nearest lead object (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.17.Char.12.Identifier = acc_csc_017_NoCollDist
Step.1.17.Char.12.Unit =
Step.1.17.Char.12.Param.0 = RTexpr "Qu::acc_csc_017_NoCollDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.17.Char.13.Name = acc_csc_017_NoCollDistViolatedEver
Step.1.17.Char.13.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment distance ever drops below 0m.
Step.1.17.Char.13.Identifier = acc_csc_017_NoCollDistViolatedEver
Step.1.17.Char.13.Unit =
Step.1.17.Char.13.Param.0 = RTexpr {first()?Qu::acc_csc_017_NoCollDistViolatedEver=0:acc_csc_017_NoCollDistViolatedEver=max(acc_csc_017_NoCollDistViolatedEver,(acc_csc_017_NoCollDist<0))}
Step.1.17.Char.14.Name = acc_csc_017_CollisionFlag
Step.1.17.Char.14.Description:
	Collision flag derived from FMU.CM_ACCController_V17.Out.Debug.Target.DistX <= 0 (nearest lead object); instantaneous, used as the latch() trigger for ImpactSpeed below.
Step.1.17.Char.14.Identifier = acc_csc_017_CollisionFlag
Step.1.17.Char.14.Unit =
Step.1.17.Char.14.Param.0 = RTexpr "Qu::acc_csc_017_CollisionFlag=(FMU.CM_ACCController_V17.Out.Debug.Target.DistX<=0)"
Step.1.17.Char.15.Name = acc_csc_017_ImpactSpeed
Step.1.17.Char.15.Description:
	Ego speed latched at moment of first collision (nearest lead object)
Step.1.17.Char.15.Identifier = acc_csc_017_ImpactSpeed
Step.1.17.Char.15.Unit =
Step.1.17.Char.15.Param.0 = RTexpr {Qu::acc_csc_017_ImpactSpeed=latch(Speed("Ego"),Qu::acc_csc_017_CollisionFlag==1)}
Step.1.17.Char.16.Name = acc_csc_017_CollisionEver
Step.1.17.Char.16.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment a collision ever occurs (nearest lead object), even if the vehicles separate again before the run ends.
Step.1.17.Char.16.Identifier = acc_csc_017_CollisionEver
Step.1.17.Char.16.Unit =
Step.1.17.Char.16.Param.0 = RTexpr {first()?Qu::acc_csc_017_CollisionEver=0:acc_csc_017_CollisionEver=max(acc_csc_017_CollisionEver,(acc_csc_017_CollisionFlag==1))}
Step.1.17.Crit.0.Name = acc_csc_017 - Safe Distance Consistency
Step.1.17.Crit.0.Description:
	Good if SafeDist was never violated while actively following throughout the run. Bad if it was violated at any point.
Step.1.17.Crit.0.Good = [get acc_csc_017_SafeDistViolated] == 0
Step.1.17.Crit.0.Warn =
Step.1.17.Crit.0.Bad = [get acc_csc_017_SafeDistViolated] == 1
Step.1.17.Crit.1.Name = acc_csc_017 - Time To Collision
Step.1.17.Crit.1.Description:
	Good if TTC never entered the warn/bad zone while a valid target existed throughout the run. Warn if it ever entered [3.5,11)s. Bad if it ever entered (0,3.5)s.
Step.1.17.Crit.1.Good = [get acc_csc_017_TTCBadEver] == 0 && [get acc_csc_017_TTCWarnEver] == 0
Step.1.17.Crit.1.Warn = [get acc_csc_017_TTCBadEver] == 0 && [get acc_csc_017_TTCWarnEver] == 1
Step.1.17.Crit.1.Bad = [get acc_csc_017_TTCBadEver] == 1
Step.1.17.Crit.2.Name = acc_csc_017 - Comfort Deceleration Limit
Step.1.17.Crit.2.Description:
	Good if Comfort Deceleration Limit never went out of bound (min=-3, max=2.8) throughout the run.
Step.1.17.Crit.2.Good = [get acc_csc_017_ComfortAxOutOfBoundEver] == 0
Step.1.17.Crit.2.Warn =
Step.1.17.Crit.2.Bad = [get acc_csc_017_ComfortAxOutOfBoundEver] == 1
Step.1.17.Crit.3.Name = acc_csc_017 - Emergency Deceleration Bound
Step.1.17.Crit.3.Description:
	Good if Emergency Deceleration Bound never went out of bound (min=-6) throughout the run.
Step.1.17.Crit.3.Good = [get acc_csc_017_EmergencyAxOutOfBoundEver] == 0
Step.1.17.Crit.3.Warn =
Step.1.17.Crit.3.Bad = [get acc_csc_017_EmergencyAxOutOfBoundEver] == 1
Step.1.17.Crit.4.Name = acc_csc_017 - Jerk Limit
Step.1.17.Crit.4.Description:
	Good if |jerk| never exceeded 4 m/s3 throughout the run.
Step.1.17.Crit.4.Good = [get acc_csc_017_JerkOverLimitEver] == 0
Step.1.17.Crit.4.Warn =
Step.1.17.Crit.4.Bad = [get acc_csc_017_JerkOverLimitEver] == 1
Step.1.17.Crit.5.Name = acc_csc_017 - No Collision Distance
Step.1.17.Crit.5.Description:
	Good if distance never dropped below 0m throughout the run.
Step.1.17.Crit.5.Good = [get acc_csc_017_NoCollDistViolatedEver] == 0
Step.1.17.Crit.5.Warn =
Step.1.17.Crit.5.Bad = [get acc_csc_017_NoCollDistViolatedEver] == 1
Step.1.17.Crit.6.Name = acc_csc_017 - Collision Flag
Step.1.17.Crit.6.Description:
	Good if no collision ever occurred (nearest lead object) throughout the run.
Step.1.17.Crit.6.Good = [get acc_csc_017_CollisionEver] == 0
Step.1.17.Crit.6.Warn =
Step.1.17.Crit.6.Bad = [get acc_csc_017_CollisionEver] == 1
Step.1.17.Crit.7.Name = acc_csc_017 - Impact Speed
Step.1.17.Crit.7.Description:
	Good if no collision ever occurred, or impact speed = 0; Warn (0,5) m/s; Bad >= 5 m/s
Step.1.17.Crit.7.Good = [get acc_csc_017_CollisionEver] == 0 || [get acc_csc_017_ImpactSpeed] == 0
Step.1.17.Crit.7.Warn = [get acc_csc_017_CollisionEver] == 1 && [get acc_csc_017_ImpactSpeed] > 0 && [get acc_csc_017_ImpactSpeed] < 5
Step.1.17.Crit.7.Bad = [get acc_csc_017_CollisionEver] == 1 && [get acc_csc_017_ImpactSpeed] >= 5
Step.1.17.Var.0.Name = acc_csc_017_ds001
Step.1.17.Var.0.Param = 12 8 58
Step.1.17.Var.0.Result = bad
Step.1.17.Var.0.ResDate = 1782804106
Step.1.17.Var.0.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_017_142138.erg
Step.1.17.Var.0.ManLst = 0:lat0 1:long0
Step.1.17.Var.0.Char.0.Ref = acc_csc_017_ActualDist
Step.1.17.Var.0.Char.0.Value = 999.0
Step.1.17.Var.0.Char.1.Ref = acc_csc_017_SafeDist
Step.1.17.Var.0.Char.1.Value = 34.50201504472489
Step.1.17.Var.0.Char.2.Ref = acc_csc_017_SafeDistViolated
Step.1.17.Var.0.Char.2.Value = 0.0
Step.1.17.Var.0.Char.3.Ref = acc_csc_017_TTC
Step.1.17.Var.0.Char.3.Value = 0.0
Step.1.17.Var.0.Char.4.Ref = acc_csc_017_TTCWarnEver
Step.1.17.Var.0.Char.4.Value = 0.0
Step.1.17.Var.0.Char.5.Ref = acc_csc_017_TTCBadEver
Step.1.17.Var.0.Char.5.Value = 0.0
Step.1.17.Var.0.Char.6.Ref = acc_csc_017_ComfortAx
Step.1.17.Var.0.Char.6.Value = -0.0007008851217037205
Step.1.17.Var.0.Char.7.Ref = acc_csc_017_ComfortAxOutOfBoundEver
Step.1.17.Var.0.Char.7.Value = 0.0
Step.1.17.Var.0.Char.8.Ref = acc_csc_017_EmergencyAx
Step.1.17.Var.0.Char.8.Value = -0.0007008851217037205
Step.1.17.Var.0.Char.9.Ref = acc_csc_017_EmergencyAxOutOfBoundEver
Step.1.17.Var.0.Char.9.Value = 0.0
Step.1.17.Var.0.Char.10.Ref = acc_csc_017_Jerk
Step.1.17.Var.0.Char.10.Value = 9.408552158955766e-7
Step.1.17.Var.0.Char.11.Ref = acc_csc_017_JerkOverLimitEver
Step.1.17.Var.0.Char.11.Value = 1.0
Step.1.17.Var.0.Char.12.Ref = acc_csc_017_NoCollDist
Step.1.17.Var.0.Char.12.Value = 999.0
Step.1.17.Var.0.Char.13.Ref = acc_csc_017_NoCollDistViolatedEver
Step.1.17.Var.0.Char.13.Value = 0.0
Step.1.17.Var.0.Char.14.Ref = acc_csc_017_CollisionFlag
Step.1.17.Var.0.Char.14.Value = 0.0
Step.1.17.Var.0.Char.15.Ref = acc_csc_017_ImpactSpeed
Step.1.17.Var.0.Char.15.Value = 0.0
Step.1.17.Var.0.Char.16.Ref = acc_csc_017_CollisionEver
Step.1.17.Var.0.Char.16.Value = 0.0
Step.1.17.Var.0.Crit.0.Ref = acc_csc_017 - Safe Distance Consistency
Step.1.17.Var.0.Crit.0.Result = good
Step.1.17.Var.0.Crit.1.Ref = acc_csc_017 - Time To Collision
Step.1.17.Var.0.Crit.1.Result = good
Step.1.17.Var.0.Crit.2.Ref = acc_csc_017 - Comfort Deceleration Limit
Step.1.17.Var.0.Crit.2.Result = good
Step.1.17.Var.0.Crit.3.Ref = acc_csc_017 - Emergency Deceleration Bound
Step.1.17.Var.0.Crit.3.Result = good
Step.1.17.Var.0.Crit.4.Ref = acc_csc_017 - Jerk Limit
Step.1.17.Var.0.Crit.4.Result = bad
Step.1.17.Var.0.Crit.5.Ref = acc_csc_017 - No Collision Distance
Step.1.17.Var.0.Crit.5.Result = good
Step.1.17.Var.0.Crit.6.Ref = acc_csc_017 - Collision Flag
Step.1.17.Var.0.Crit.6.Result = good
Step.1.17.Var.0.Crit.7.Ref = acc_csc_017 - Impact Speed
Step.1.17.Var.0.Crit.7.Result = good
Step.1.17.Var.1.Name = acc_csc_017_ds002
Step.1.17.Var.1.Param = 15 10 65
Step.1.17.Var.1.Result = bad
Step.1.17.Var.1.ResDate = 1782804119
Step.1.17.Var.1.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_017_142150.erg
Step.1.17.Var.1.ManLst = 0:lat0 1:long0
Step.1.17.Var.1.Char.0.Ref = acc_csc_017_ActualDist
Step.1.17.Var.1.Char.0.Value = 999.0
Step.1.17.Var.1.Char.1.Ref = acc_csc_017_SafeDist
Step.1.17.Var.1.Char.1.Value = 34.50201547808488
Step.1.17.Var.1.Char.2.Ref = acc_csc_017_SafeDistViolated
Step.1.17.Var.1.Char.2.Value = 0.0
Step.1.17.Var.1.Char.3.Ref = acc_csc_017_TTC
Step.1.17.Var.1.Char.3.Value = 0.0
Step.1.17.Var.1.Char.4.Ref = acc_csc_017_TTCWarnEver
Step.1.17.Var.1.Char.4.Value = 0.0
Step.1.17.Var.1.Char.5.Ref = acc_csc_017_TTCBadEver
Step.1.17.Var.1.Char.5.Value = 0.0
Step.1.17.Var.1.Char.6.Ref = acc_csc_017_ComfortAx
Step.1.17.Var.1.Char.6.Value = -0.0007010358556101437
Step.1.17.Var.1.Char.7.Ref = acc_csc_017_ComfortAxOutOfBoundEver
Step.1.17.Var.1.Char.7.Value = 0.0
Step.1.17.Var.1.Char.8.Ref = acc_csc_017_EmergencyAx
Step.1.17.Var.1.Char.8.Value = -0.0007010358556101437
Step.1.17.Var.1.Char.9.Ref = acc_csc_017_EmergencyAxOutOfBoundEver
Step.1.17.Var.1.Char.9.Value = 0.0
Step.1.17.Var.1.Char.10.Ref = acc_csc_017_Jerk
Step.1.17.Var.1.Char.10.Value = 3.7974530182808794e-7
Step.1.17.Var.1.Char.11.Ref = acc_csc_017_JerkOverLimitEver
Step.1.17.Var.1.Char.11.Value = 1.0
Step.1.17.Var.1.Char.12.Ref = acc_csc_017_NoCollDist
Step.1.17.Var.1.Char.12.Value = 999.0
Step.1.17.Var.1.Char.13.Ref = acc_csc_017_NoCollDistViolatedEver
Step.1.17.Var.1.Char.13.Value = 0.0
Step.1.17.Var.1.Char.14.Ref = acc_csc_017_CollisionFlag
Step.1.17.Var.1.Char.14.Value = 0.0
Step.1.17.Var.1.Char.15.Ref = acc_csc_017_ImpactSpeed
Step.1.17.Var.1.Char.15.Value = 0.0
Step.1.17.Var.1.Char.16.Ref = acc_csc_017_CollisionEver
Step.1.17.Var.1.Char.16.Value = 0.0
Step.1.17.Var.1.Crit.0.Ref = acc_csc_017 - Safe Distance Consistency
Step.1.17.Var.1.Crit.0.Result = good
Step.1.17.Var.1.Crit.1.Ref = acc_csc_017 - Time To Collision
Step.1.17.Var.1.Crit.1.Result = good
Step.1.17.Var.1.Crit.2.Ref = acc_csc_017 - Comfort Deceleration Limit
Step.1.17.Var.1.Crit.2.Result = good
Step.1.17.Var.1.Crit.3.Ref = acc_csc_017 - Emergency Deceleration Bound
Step.1.17.Var.1.Crit.3.Result = good
Step.1.17.Var.1.Crit.4.Ref = acc_csc_017 - Jerk Limit
Step.1.17.Var.1.Crit.4.Result = bad
Step.1.17.Var.1.Crit.5.Ref = acc_csc_017 - No Collision Distance
Step.1.17.Var.1.Crit.5.Result = good
Step.1.17.Var.1.Crit.6.Ref = acc_csc_017 - Collision Flag
Step.1.17.Var.1.Crit.6.Result = good
Step.1.17.Var.1.Crit.7.Ref = acc_csc_017 - Impact Speed
Step.1.17.Var.1.Crit.7.Result = good
Step.1.17.Var.2.Name = acc_csc_017_ds003
Step.1.17.Var.2.Param = 20 14 80
Step.1.17.Var.2.Result = err
Step.1.17.Var.2.ResDate = 1782804135
Step.1.17.Var.2.ManLst = 0:lat0 1:long0
Step.1.17.Var.2.Log.0.Time = 10.680
Step.1.17.Var.2.Log.0.Kind = err
Step.1.17.Var.2.Log.0.Text = Simulation ended with errors
Step.1.17.Var.2.Char.0.Ref = acc_csc_017_ActualDist
Step.1.17.Var.2.Char.0.Value = 999.0
Step.1.17.Var.2.Char.1.Ref = acc_csc_017_SafeDist
Step.1.17.Var.2.Char.1.Value = 15.0
Step.1.17.Var.2.Char.2.Ref = acc_csc_017_SafeDistViolated
Step.1.17.Var.2.Char.2.Value = 0.0
Step.1.17.Var.2.Char.3.Ref = acc_csc_017_TTC
Step.1.17.Var.2.Char.3.Value = 0.0
Step.1.17.Var.2.Char.4.Ref = acc_csc_017_TTCWarnEver
Step.1.17.Var.2.Char.4.Value = 0.0
Step.1.17.Var.2.Char.5.Ref = acc_csc_017_TTCBadEver
Step.1.17.Var.2.Char.5.Value = 0.0
Step.1.17.Var.2.Char.6.Ref = acc_csc_017_ComfortAx
Step.1.17.Var.2.Char.6.Value = 2.8
Step.1.17.Var.2.Char.7.Ref = acc_csc_017_ComfortAxOutOfBoundEver
Step.1.17.Var.2.Char.7.Value = 0.0
Step.1.17.Var.2.Char.8.Ref = acc_csc_017_EmergencyAx
Step.1.17.Var.2.Char.8.Value = 2.8
Step.1.17.Var.2.Char.9.Ref = acc_csc_017_EmergencyAxOutOfBoundEver
Step.1.17.Var.2.Char.9.Value = 0.0
Step.1.17.Var.2.Char.10.Ref = acc_csc_017_Jerk
Step.1.17.Var.2.Char.10.Value = 0.0
Step.1.17.Var.2.Char.11.Ref = acc_csc_017_JerkOverLimitEver
Step.1.17.Var.2.Char.11.Value = 1.0
Step.1.17.Var.2.Char.12.Ref = acc_csc_017_NoCollDist
Step.1.17.Var.2.Char.12.Value = 999.0
Step.1.17.Var.2.Char.13.Ref = acc_csc_017_NoCollDistViolatedEver
Step.1.17.Var.2.Char.13.Value = 0.0
Step.1.17.Var.2.Char.14.Ref = acc_csc_017_CollisionFlag
Step.1.17.Var.2.Char.14.Value = 0.0
Step.1.17.Var.2.Char.15.Ref = acc_csc_017_ImpactSpeed
Step.1.17.Var.2.Char.15.Value = 0.0
Step.1.17.Var.2.Char.16.Ref = acc_csc_017_CollisionEver
Step.1.17.Var.2.Char.16.Value = 0.0
Step.1.17.Var.2.Crit.0.Ref = acc_csc_017 - Safe Distance Consistency
Step.1.17.Var.2.Crit.0.Result = good
Step.1.17.Var.2.Crit.1.Ref = acc_csc_017 - Time To Collision
Step.1.17.Var.2.Crit.1.Result = good
Step.1.17.Var.2.Crit.2.Ref = acc_csc_017 - Comfort Deceleration Limit
Step.1.17.Var.2.Crit.2.Result = good
Step.1.17.Var.2.Crit.3.Ref = acc_csc_017 - Emergency Deceleration Bound
Step.1.17.Var.2.Crit.3.Result = good
Step.1.17.Var.2.Crit.4.Ref = acc_csc_017 - Jerk Limit
Step.1.17.Var.2.Crit.4.Result = bad
Step.1.17.Var.2.Crit.5.Ref = acc_csc_017 - No Collision Distance
Step.1.17.Var.2.Crit.5.Result = good
Step.1.17.Var.2.Crit.6.Ref = acc_csc_017 - Collision Flag
Step.1.17.Var.2.Crit.6.Result = good
Step.1.17.Var.2.Crit.7.Ref = acc_csc_017 - Impact Speed
Step.1.17.Var.2.Crit.7.Result = good
Step.1.17.Var.3.Name = acc_csc_017_ds004
Step.1.17.Var.3.Param = 25 18 92
Step.1.17.Var.3.Result = bad
Step.1.17.Var.3.ResDate = 1782804192
Step.1.17.Var.3.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_017_142220.erg
Step.1.17.Var.3.ManLst = 0:lat0 1:long0
Step.1.17.Var.3.Char.0.Ref = acc_csc_017_ActualDist
Step.1.17.Var.3.Char.0.Value = 999.0
Step.1.17.Var.3.Char.1.Ref = acc_csc_017_SafeDist
Step.1.17.Var.3.Char.1.Value = 45.44415994026839
Step.1.17.Var.3.Char.2.Ref = acc_csc_017_SafeDistViolated
Step.1.17.Var.3.Char.2.Value = 1.0
Step.1.17.Var.3.Char.3.Ref = acc_csc_017_TTC
Step.1.17.Var.3.Char.3.Value = 0.0
Step.1.17.Var.3.Char.4.Ref = acc_csc_017_TTCWarnEver
Step.1.17.Var.3.Char.4.Value = 0.0
Step.1.17.Var.3.Char.5.Ref = acc_csc_017_TTCBadEver
Step.1.17.Var.3.Char.5.Value = 0.0
Step.1.17.Var.3.Char.6.Ref = acc_csc_017_ComfortAx
Step.1.17.Var.3.Char.6.Value = -0.004
Step.1.17.Var.3.Char.7.Ref = acc_csc_017_ComfortAxOutOfBoundEver
Step.1.17.Var.3.Char.7.Value = 1.0
Step.1.17.Var.3.Char.8.Ref = acc_csc_017_EmergencyAx
Step.1.17.Var.3.Char.8.Value = -0.004
Step.1.17.Var.3.Char.9.Ref = acc_csc_017_EmergencyAxOutOfBoundEver
Step.1.17.Var.3.Char.9.Value = 0.0
Step.1.17.Var.3.Char.10.Ref = acc_csc_017_Jerk
Step.1.17.Var.3.Char.10.Value = 0.0
Step.1.17.Var.3.Char.11.Ref = acc_csc_017_JerkOverLimitEver
Step.1.17.Var.3.Char.11.Value = 1.0
Step.1.17.Var.3.Char.12.Ref = acc_csc_017_NoCollDist
Step.1.17.Var.3.Char.12.Value = 999.0
Step.1.17.Var.3.Char.13.Ref = acc_csc_017_NoCollDistViolatedEver
Step.1.17.Var.3.Char.13.Value = 0.0
Step.1.17.Var.3.Char.14.Ref = acc_csc_017_CollisionFlag
Step.1.17.Var.3.Char.14.Value = 0.0
Step.1.17.Var.3.Char.15.Ref = acc_csc_017_ImpactSpeed
Step.1.17.Var.3.Char.15.Value = 0.0
Step.1.17.Var.3.Char.16.Ref = acc_csc_017_CollisionEver
Step.1.17.Var.3.Char.16.Value = 0.0
Step.1.17.Var.3.Crit.0.Ref = acc_csc_017 - Safe Distance Consistency
Step.1.17.Var.3.Crit.0.Result = bad
Step.1.17.Var.3.Crit.1.Ref = acc_csc_017 - Time To Collision
Step.1.17.Var.3.Crit.1.Result = good
Step.1.17.Var.3.Crit.2.Ref = acc_csc_017 - Comfort Deceleration Limit
Step.1.17.Var.3.Crit.2.Result = bad
Step.1.17.Var.3.Crit.3.Ref = acc_csc_017 - Emergency Deceleration Bound
Step.1.17.Var.3.Crit.3.Result = good
Step.1.17.Var.3.Crit.4.Ref = acc_csc_017 - Jerk Limit
Step.1.17.Var.3.Crit.4.Result = bad
Step.1.17.Var.3.Crit.5.Ref = acc_csc_017 - No Collision Distance
Step.1.17.Var.3.Crit.5.Result = good
Step.1.17.Var.3.Crit.6.Ref = acc_csc_017 - Collision Flag
Step.1.17.Var.3.Crit.6.Result = good
Step.1.17.Var.3.Crit.7.Ref = acc_csc_017 - Impact Speed
Step.1.17.Var.3.Crit.7.Result = good
Step.1.17.Var.4.Name = acc_csc_017_ds005
Step.1.17.Var.4.Param = 30 22 103
Step.1.17.Var.4.Result = bad
Step.1.17.Var.4.ResDate = 1782804248
Step.1.17.Var.4.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_017_142316.erg
Step.1.17.Var.4.ManLst = 0:lat0 1:long0
Step.1.17.Var.4.Char.0.Ref = acc_csc_017_ActualDist
Step.1.17.Var.4.Char.0.Value = 999.0
Step.1.17.Var.4.Char.1.Ref = acc_csc_017_SafeDist
Step.1.17.Var.4.Char.1.Value = 56.20934465053005
Step.1.17.Var.4.Char.2.Ref = acc_csc_017_SafeDistViolated
Step.1.17.Var.4.Char.2.Value = 1.0
Step.1.17.Var.4.Char.3.Ref = acc_csc_017_TTC
Step.1.17.Var.4.Char.3.Value = 0.0
Step.1.17.Var.4.Char.4.Ref = acc_csc_017_TTCWarnEver
Step.1.17.Var.4.Char.4.Value = 0.0
Step.1.17.Var.4.Char.5.Ref = acc_csc_017_TTCBadEver
Step.1.17.Var.4.Char.5.Value = 0.0
Step.1.17.Var.4.Char.6.Ref = acc_csc_017_ComfortAx
Step.1.17.Var.4.Char.6.Value = -0.004
Step.1.17.Var.4.Char.7.Ref = acc_csc_017_ComfortAxOutOfBoundEver
Step.1.17.Var.4.Char.7.Value = 1.0
Step.1.17.Var.4.Char.8.Ref = acc_csc_017_EmergencyAx
Step.1.17.Var.4.Char.8.Value = -0.004
Step.1.17.Var.4.Char.9.Ref = acc_csc_017_EmergencyAxOutOfBoundEver
Step.1.17.Var.4.Char.9.Value = 0.0
Step.1.17.Var.4.Char.10.Ref = acc_csc_017_Jerk
Step.1.17.Var.4.Char.10.Value = 0.0
Step.1.17.Var.4.Char.11.Ref = acc_csc_017_JerkOverLimitEver
Step.1.17.Var.4.Char.11.Value = 1.0
Step.1.17.Var.4.Char.12.Ref = acc_csc_017_NoCollDist
Step.1.17.Var.4.Char.12.Value = 999.0
Step.1.17.Var.4.Char.13.Ref = acc_csc_017_NoCollDistViolatedEver
Step.1.17.Var.4.Char.13.Value = 0.0
Step.1.17.Var.4.Char.14.Ref = acc_csc_017_CollisionFlag
Step.1.17.Var.4.Char.14.Value = 0.0
Step.1.17.Var.4.Char.15.Ref = acc_csc_017_ImpactSpeed
Step.1.17.Var.4.Char.15.Value = 0.0
Step.1.17.Var.4.Char.16.Ref = acc_csc_017_CollisionEver
Step.1.17.Var.4.Char.16.Value = 0.0
Step.1.17.Var.4.Crit.0.Ref = acc_csc_017 - Safe Distance Consistency
Step.1.17.Var.4.Crit.0.Result = bad
Step.1.17.Var.4.Crit.1.Ref = acc_csc_017 - Time To Collision
Step.1.17.Var.4.Crit.1.Result = good
Step.1.17.Var.4.Crit.2.Ref = acc_csc_017 - Comfort Deceleration Limit
Step.1.17.Var.4.Crit.2.Result = bad
Step.1.17.Var.4.Crit.3.Ref = acc_csc_017 - Emergency Deceleration Bound
Step.1.17.Var.4.Crit.3.Result = good
Step.1.17.Var.4.Crit.4.Ref = acc_csc_017 - Jerk Limit
Step.1.17.Var.4.Crit.4.Result = bad
Step.1.17.Var.4.Crit.5.Ref = acc_csc_017 - No Collision Distance
Step.1.17.Var.4.Crit.5.Result = good
Step.1.17.Var.4.Crit.6.Ref = acc_csc_017 - Collision Flag
Step.1.17.Var.4.Crit.6.Result = good
Step.1.17.Var.4.Crit.7.Ref = acc_csc_017 - Impact Speed
Step.1.17.Var.4.Crit.7.Result = good
Step.1.18 = TestRun
Step.1.18.Name = OSC_Imported/longitudinal_feature/ACC/acc_csc_018
Step.1.18.Param.0 = EgoSpeed NValue
Step.1.18.Param.1 = TVSpeed NValue
Step.1.18.Param.2 = TV_initPos NValue
Step.1.18.Char.0.Name = acc_csc_018_ActualDist
Step.1.18.Char.0.Description:
	Actual distance to lead (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.18.Char.0.Identifier = acc_csc_018_ActualDist
Step.1.18.Char.0.Unit =
Step.1.18.Char.0.Param.0 = RTexpr "Qu::acc_csc_018_ActualDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.18.Char.1.Name = acc_csc_018_SafeDist
Step.1.18.Char.1.Description:
	Reference safe distance (signal=FMU.CM_ACCController_V17.Out.Debug.SafeDistance)
Step.1.18.Char.1.Identifier = acc_csc_018_SafeDist
Step.1.18.Char.1.Unit =
Step.1.18.Char.1.Param.0 = RTexpr "Qu::acc_csc_018_SafeDist=FMU.CM_ACCController_V17.Out.Debug.SafeDistance"
Step.1.18.Char.2.Name = acc_csc_018_SafeDistViolated
Step.1.18.Char.2.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment ActualDist<SafeDist while actively following (gate==1); stays 1 for the rest of the run even if distance recovers.
Step.1.18.Char.2.Identifier = acc_csc_018_SafeDistViolated
Step.1.18.Char.2.Unit =
Step.1.18.Char.2.Param.0 = RTexpr {first()?Qu::acc_csc_018_SafeDistViolated=0:acc_csc_018_SafeDistViolated=max(acc_csc_018_SafeDistViolated,(FMU.CM_ACCController_V17.Out.Debug.Fusion.Active==1 && acc_csc_018_ActualDist<acc_csc_018_SafeDist))}
Step.1.18.Char.3.Name = acc_csc_018_TTC
Step.1.18.Char.3.Description:
	Time-to-collision (signal=AccelCtrl.ACC.Time2Collision)
Step.1.18.Char.3.Identifier = acc_csc_018_TTC
Step.1.18.Char.3.Unit =
Step.1.18.Char.3.Param.0 = RTexpr "Qu::acc_csc_018_TTC=AccelCtrl.ACC.Time2Collision"
Step.1.18.Char.4.Name = acc_csc_018_TTCWarnEver
Step.1.18.Char.4.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the warn zone [3.5,11)s.
Step.1.18.Char.4.Identifier = acc_csc_018_TTCWarnEver
Step.1.18.Char.4.Unit =
Step.1.18.Char.4.Param.0 = RTexpr {first()?Qu::acc_csc_018_TTCWarnEver=0:acc_csc_018_TTCWarnEver=max(acc_csc_018_TTCWarnEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_018_TTC>=3.5 && acc_csc_018_TTC<11))}
Step.1.18.Char.5.Name = acc_csc_018_TTCBadEver
Step.1.18.Char.5.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the bad zone (0,3.5)s.
Step.1.18.Char.5.Identifier = acc_csc_018_TTCBadEver
Step.1.18.Char.5.Unit =
Step.1.18.Char.5.Param.0 = RTexpr {first()?Qu::acc_csc_018_TTCBadEver=0:acc_csc_018_TTCBadEver=max(acc_csc_018_TTCBadEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_018_TTC>0 && acc_csc_018_TTC<3.5))}
Step.1.18.Char.6.Name = acc_csc_018_ComfortAx
Step.1.18.Char.6.Description:
	Comfort Deceleration Limit (signal=AccelCtrl.DesiredAx)
Step.1.18.Char.6.Identifier = acc_csc_018_ComfortAx
Step.1.18.Char.6.Unit =
Step.1.18.Char.6.Param.0 = RTexpr "Qu::acc_csc_018_ComfortAx=AccelCtrl.DesiredAx"
Step.1.18.Char.7.Name = acc_csc_018_ComfortAxOutOfBoundEver
Step.1.18.Char.7.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Comfort Deceleration Limit ever goes out of bound (min=-3, max=2.8).
Step.1.18.Char.7.Identifier = acc_csc_018_ComfortAxOutOfBoundEver
Step.1.18.Char.7.Unit =
Step.1.18.Char.7.Param.0 = RTexpr {first()?Qu::acc_csc_018_ComfortAxOutOfBoundEver=0:acc_csc_018_ComfortAxOutOfBoundEver=max(acc_csc_018_ComfortAxOutOfBoundEver,(acc_csc_018_ComfortAx<-3 || acc_csc_018_ComfortAx>2.8))}
Step.1.18.Char.8.Name = acc_csc_018_EmergencyAx
Step.1.18.Char.8.Description:
	Emergency Deceleration Bound (signal=AccelCtrl.DesiredAx)
Step.1.18.Char.8.Identifier = acc_csc_018_EmergencyAx
Step.1.18.Char.8.Unit =
Step.1.18.Char.8.Param.0 = RTexpr "Qu::acc_csc_018_EmergencyAx=AccelCtrl.DesiredAx"
Step.1.18.Char.9.Name = acc_csc_018_EmergencyAxOutOfBoundEver
Step.1.18.Char.9.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Emergency Deceleration Bound ever goes out of bound (min=-6).
Step.1.18.Char.9.Identifier = acc_csc_018_EmergencyAxOutOfBoundEver
Step.1.18.Char.9.Unit =
Step.1.18.Char.9.Param.0 = RTexpr {first()?Qu::acc_csc_018_EmergencyAxOutOfBoundEver=0:acc_csc_018_EmergencyAxOutOfBoundEver=max(acc_csc_018_EmergencyAxOutOfBoundEver,(acc_csc_018_EmergencyAx<-6))}
Step.1.18.Char.10.Name = acc_csc_018_Jerk
Step.1.18.Char.10.Description:
	Jerk = |d(DesiredAx)/dt|, base signal=AccelCtrl.DesiredAx
Step.1.18.Char.10.Identifier = acc_csc_018_Jerk
Step.1.18.Char.10.Unit =
Step.1.18.Char.10.Param.0 = RTexpr "Qu::acc_csc_018_Jerk=abs(diff(AccelCtrl.DesiredAx,Time))"
Step.1.18.Char.11.Name = acc_csc_018_JerkOverLimitEver
Step.1.18.Char.11.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment |jerk| ever exceeds 4 m/s3.
Step.1.18.Char.11.Identifier = acc_csc_018_JerkOverLimitEver
Step.1.18.Char.11.Unit =
Step.1.18.Char.11.Param.0 = RTexpr {first()?Qu::acc_csc_018_JerkOverLimitEver=0:acc_csc_018_JerkOverLimitEver=max(acc_csc_018_JerkOverLimitEver,(acc_csc_018_Jerk>4))}
Step.1.18.Char.12.Name = acc_csc_018_NoCollDist
Step.1.18.Char.12.Description:
	Distance to nearest lead object (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.18.Char.12.Identifier = acc_csc_018_NoCollDist
Step.1.18.Char.12.Unit =
Step.1.18.Char.12.Param.0 = RTexpr "Qu::acc_csc_018_NoCollDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.18.Char.13.Name = acc_csc_018_NoCollDistViolatedEver
Step.1.18.Char.13.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment distance ever drops below 0m.
Step.1.18.Char.13.Identifier = acc_csc_018_NoCollDistViolatedEver
Step.1.18.Char.13.Unit =
Step.1.18.Char.13.Param.0 = RTexpr {first()?Qu::acc_csc_018_NoCollDistViolatedEver=0:acc_csc_018_NoCollDistViolatedEver=max(acc_csc_018_NoCollDistViolatedEver,(acc_csc_018_NoCollDist<0))}
Step.1.18.Char.14.Name = acc_csc_018_CollisionFlag
Step.1.18.Char.14.Description:
	Collision flag derived from FMU.CM_ACCController_V17.Out.Debug.Target.DistX <= 0 (nearest lead object); instantaneous, used as the latch() trigger for ImpactSpeed below.
Step.1.18.Char.14.Identifier = acc_csc_018_CollisionFlag
Step.1.18.Char.14.Unit =
Step.1.18.Char.14.Param.0 = RTexpr "Qu::acc_csc_018_CollisionFlag=(FMU.CM_ACCController_V17.Out.Debug.Target.DistX<=0)"
Step.1.18.Char.15.Name = acc_csc_018_ImpactSpeed
Step.1.18.Char.15.Description:
	Ego speed latched at moment of first collision (nearest lead object)
Step.1.18.Char.15.Identifier = acc_csc_018_ImpactSpeed
Step.1.18.Char.15.Unit =
Step.1.18.Char.15.Param.0 = RTexpr {Qu::acc_csc_018_ImpactSpeed=latch(Speed("Ego"),Qu::acc_csc_018_CollisionFlag==1)}
Step.1.18.Char.16.Name = acc_csc_018_CollisionEver
Step.1.18.Char.16.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment a collision ever occurs (nearest lead object), even if the vehicles separate again before the run ends.
Step.1.18.Char.16.Identifier = acc_csc_018_CollisionEver
Step.1.18.Char.16.Unit =
Step.1.18.Char.16.Param.0 = RTexpr {first()?Qu::acc_csc_018_CollisionEver=0:acc_csc_018_CollisionEver=max(acc_csc_018_CollisionEver,(acc_csc_018_CollisionFlag==1))}
Step.1.18.Crit.0.Name = acc_csc_018 - Safe Distance Consistency
Step.1.18.Crit.0.Description:
	Good if SafeDist was never violated while actively following throughout the run. Bad if it was violated at any point.
Step.1.18.Crit.0.Good = [get acc_csc_018_SafeDistViolated] == 0
Step.1.18.Crit.0.Warn =
Step.1.18.Crit.0.Bad = [get acc_csc_018_SafeDistViolated] == 1
Step.1.18.Crit.1.Name = acc_csc_018 - Time To Collision
Step.1.18.Crit.1.Description:
	Good if TTC never entered the warn/bad zone while a valid target existed throughout the run. Warn if it ever entered [3.5,11)s. Bad if it ever entered (0,3.5)s.
Step.1.18.Crit.1.Good = [get acc_csc_018_TTCBadEver] == 0 && [get acc_csc_018_TTCWarnEver] == 0
Step.1.18.Crit.1.Warn = [get acc_csc_018_TTCBadEver] == 0 && [get acc_csc_018_TTCWarnEver] == 1
Step.1.18.Crit.1.Bad = [get acc_csc_018_TTCBadEver] == 1
Step.1.18.Crit.2.Name = acc_csc_018 - Comfort Deceleration Limit
Step.1.18.Crit.2.Description:
	Good if Comfort Deceleration Limit never went out of bound (min=-3, max=2.8) throughout the run.
Step.1.18.Crit.2.Good = [get acc_csc_018_ComfortAxOutOfBoundEver] == 0
Step.1.18.Crit.2.Warn =
Step.1.18.Crit.2.Bad = [get acc_csc_018_ComfortAxOutOfBoundEver] == 1
Step.1.18.Crit.3.Name = acc_csc_018 - Emergency Deceleration Bound
Step.1.18.Crit.3.Description:
	Good if Emergency Deceleration Bound never went out of bound (min=-6) throughout the run.
Step.1.18.Crit.3.Good = [get acc_csc_018_EmergencyAxOutOfBoundEver] == 0
Step.1.18.Crit.3.Warn =
Step.1.18.Crit.3.Bad = [get acc_csc_018_EmergencyAxOutOfBoundEver] == 1
Step.1.18.Crit.4.Name = acc_csc_018 - Jerk Limit
Step.1.18.Crit.4.Description:
	Good if |jerk| never exceeded 4 m/s3 throughout the run.
Step.1.18.Crit.4.Good = [get acc_csc_018_JerkOverLimitEver] == 0
Step.1.18.Crit.4.Warn =
Step.1.18.Crit.4.Bad = [get acc_csc_018_JerkOverLimitEver] == 1
Step.1.18.Crit.5.Name = acc_csc_018 - No Collision Distance
Step.1.18.Crit.5.Description:
	Good if distance never dropped below 0m throughout the run.
Step.1.18.Crit.5.Good = [get acc_csc_018_NoCollDistViolatedEver] == 0
Step.1.18.Crit.5.Warn =
Step.1.18.Crit.5.Bad = [get acc_csc_018_NoCollDistViolatedEver] == 1
Step.1.18.Crit.6.Name = acc_csc_018 - Collision Flag
Step.1.18.Crit.6.Description:
	Good if no collision ever occurred (nearest lead object) throughout the run.
Step.1.18.Crit.6.Good = [get acc_csc_018_CollisionEver] == 0
Step.1.18.Crit.6.Warn =
Step.1.18.Crit.6.Bad = [get acc_csc_018_CollisionEver] == 1
Step.1.18.Crit.7.Name = acc_csc_018 - Impact Speed
Step.1.18.Crit.7.Description:
	Good if no collision ever occurred, or impact speed = 0; Warn (0,5) m/s; Bad >= 5 m/s
Step.1.18.Crit.7.Good = [get acc_csc_018_CollisionEver] == 0 || [get acc_csc_018_ImpactSpeed] == 0
Step.1.18.Crit.7.Warn = [get acc_csc_018_CollisionEver] == 1 && [get acc_csc_018_ImpactSpeed] > 0 && [get acc_csc_018_ImpactSpeed] < 5
Step.1.18.Crit.7.Bad = [get acc_csc_018_CollisionEver] == 1 && [get acc_csc_018_ImpactSpeed] >= 5
Step.1.18.Var.0.Name = acc_csc_018_ds001
Step.1.18.Var.0.Param = 10 0 100
Step.1.18.Var.0.Result = bad
Step.1.18.Var.0.ResDate = 1782804268
Step.1.18.Var.0.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_018_142413.erg
Step.1.18.Var.0.ManLst = 0:lat0 1:long0
Step.1.18.Var.0.Char.0.Ref = acc_csc_018_ActualDist
Step.1.18.Var.0.Char.0.Value = 999.0
Step.1.18.Var.0.Char.1.Ref = acc_csc_018_SafeDist
Step.1.18.Var.0.Char.1.Value = 34.502139941538104
Step.1.18.Var.0.Char.2.Ref = acc_csc_018_SafeDistViolated
Step.1.18.Var.0.Char.2.Value = 0.0
Step.1.18.Var.0.Char.3.Ref = acc_csc_018_TTC
Step.1.18.Var.0.Char.3.Value = 0.0
Step.1.18.Var.0.Char.4.Ref = acc_csc_018_TTCWarnEver
Step.1.18.Var.0.Char.4.Value = 0.0
Step.1.18.Var.0.Char.5.Ref = acc_csc_018_TTCBadEver
Step.1.18.Var.0.Char.5.Value = 0.0
Step.1.18.Var.0.Char.6.Ref = acc_csc_018_ComfortAx
Step.1.18.Var.0.Char.6.Value = -0.0007443274915146958
Step.1.18.Var.0.Char.7.Ref = acc_csc_018_ComfortAxOutOfBoundEver
Step.1.18.Var.0.Char.7.Value = 0.0
Step.1.18.Var.0.Char.8.Ref = acc_csc_018_EmergencyAx
Step.1.18.Var.0.Char.8.Value = -0.0007443274915146958
Step.1.18.Var.0.Char.9.Ref = acc_csc_018_EmergencyAxOutOfBoundEver
Step.1.18.Var.0.Char.9.Value = 0.0
Step.1.18.Var.0.Char.10.Ref = acc_csc_018_Jerk
Step.1.18.Var.0.Char.10.Value = 4.477173831662759e-6
Step.1.18.Var.0.Char.11.Ref = acc_csc_018_JerkOverLimitEver
Step.1.18.Var.0.Char.11.Value = 1.0
Step.1.18.Var.0.Char.12.Ref = acc_csc_018_NoCollDist
Step.1.18.Var.0.Char.12.Value = 999.0
Step.1.18.Var.0.Char.13.Ref = acc_csc_018_NoCollDistViolatedEver
Step.1.18.Var.0.Char.13.Value = 0.0
Step.1.18.Var.0.Char.14.Ref = acc_csc_018_CollisionFlag
Step.1.18.Var.0.Char.14.Value = 0.0
Step.1.18.Var.0.Char.15.Ref = acc_csc_018_ImpactSpeed
Step.1.18.Var.0.Char.15.Value = 0.0
Step.1.18.Var.0.Char.16.Ref = acc_csc_018_CollisionEver
Step.1.18.Var.0.Char.16.Value = 0.0
Step.1.18.Var.0.Crit.0.Ref = acc_csc_018 - Safe Distance Consistency
Step.1.18.Var.0.Crit.0.Result = good
Step.1.18.Var.0.Crit.1.Ref = acc_csc_018 - Time To Collision
Step.1.18.Var.0.Crit.1.Result = good
Step.1.18.Var.0.Crit.2.Ref = acc_csc_018 - Comfort Deceleration Limit
Step.1.18.Var.0.Crit.2.Result = good
Step.1.18.Var.0.Crit.3.Ref = acc_csc_018 - Emergency Deceleration Bound
Step.1.18.Var.0.Crit.3.Result = good
Step.1.18.Var.0.Crit.4.Ref = acc_csc_018 - Jerk Limit
Step.1.18.Var.0.Crit.4.Result = bad
Step.1.18.Var.0.Crit.5.Ref = acc_csc_018 - No Collision Distance
Step.1.18.Var.0.Crit.5.Result = good
Step.1.18.Var.0.Crit.6.Ref = acc_csc_018 - Collision Flag
Step.1.18.Var.0.Crit.6.Result = good
Step.1.18.Var.0.Crit.7.Ref = acc_csc_018 - Impact Speed
Step.1.18.Var.0.Crit.7.Result = good
Step.1.18.Var.1.Name = acc_csc_018_ds002
Step.1.18.Var.1.Param = 15 0 135
Step.1.18.Var.1.Result = bad
Step.1.18.Var.1.ResDate = 1782804280
Step.1.18.Var.1.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_018_142432.erg
Step.1.18.Var.1.ManLst = 0:lat0 1:long0
Step.1.18.Var.1.Char.0.Ref = acc_csc_018_ActualDist
Step.1.18.Var.1.Char.0.Value = 999.0
Step.1.18.Var.1.Char.1.Ref = acc_csc_018_SafeDist
Step.1.18.Var.1.Char.1.Value = 34.50212543791379
Step.1.18.Var.1.Char.2.Ref = acc_csc_018_SafeDistViolated
Step.1.18.Var.1.Char.2.Value = 0.0
Step.1.18.Var.1.Char.3.Ref = acc_csc_018_TTC
Step.1.18.Var.1.Char.3.Value = 0.0
Step.1.18.Var.1.Char.4.Ref = acc_csc_018_TTCWarnEver
Step.1.18.Var.1.Char.4.Value = 0.0
Step.1.18.Var.1.Char.5.Ref = acc_csc_018_TTCBadEver
Step.1.18.Var.1.Char.5.Value = 0.0
Step.1.18.Var.1.Char.6.Ref = acc_csc_018_ComfortAx
Step.1.18.Var.1.Char.6.Value = -0.0007392827526246038
Step.1.18.Var.1.Char.7.Ref = acc_csc_018_ComfortAxOutOfBoundEver
Step.1.18.Var.1.Char.7.Value = 0.0
Step.1.18.Var.1.Char.8.Ref = acc_csc_018_EmergencyAx
Step.1.18.Var.1.Char.8.Value = -0.0007392827526246038
Step.1.18.Var.1.Char.9.Ref = acc_csc_018_EmergencyAxOutOfBoundEver
Step.1.18.Var.1.Char.9.Value = 0.0
Step.1.18.Var.1.Char.10.Ref = acc_csc_018_Jerk
Step.1.18.Var.1.Char.10.Value = 1.50978962665601e-6
Step.1.18.Var.1.Char.11.Ref = acc_csc_018_JerkOverLimitEver
Step.1.18.Var.1.Char.11.Value = 1.0
Step.1.18.Var.1.Char.12.Ref = acc_csc_018_NoCollDist
Step.1.18.Var.1.Char.12.Value = 999.0
Step.1.18.Var.1.Char.13.Ref = acc_csc_018_NoCollDistViolatedEver
Step.1.18.Var.1.Char.13.Value = 0.0
Step.1.18.Var.1.Char.14.Ref = acc_csc_018_CollisionFlag
Step.1.18.Var.1.Char.14.Value = 0.0
Step.1.18.Var.1.Char.15.Ref = acc_csc_018_ImpactSpeed
Step.1.18.Var.1.Char.15.Value = 0.0
Step.1.18.Var.1.Char.16.Ref = acc_csc_018_CollisionEver
Step.1.18.Var.1.Char.16.Value = 0.0
Step.1.18.Var.1.Crit.0.Ref = acc_csc_018 - Safe Distance Consistency
Step.1.18.Var.1.Crit.0.Result = good
Step.1.18.Var.1.Crit.1.Ref = acc_csc_018 - Time To Collision
Step.1.18.Var.1.Crit.1.Result = good
Step.1.18.Var.1.Crit.2.Ref = acc_csc_018 - Comfort Deceleration Limit
Step.1.18.Var.1.Crit.2.Result = good
Step.1.18.Var.1.Crit.3.Ref = acc_csc_018 - Emergency Deceleration Bound
Step.1.18.Var.1.Crit.3.Result = good
Step.1.18.Var.1.Crit.4.Ref = acc_csc_018 - Jerk Limit
Step.1.18.Var.1.Crit.4.Result = bad
Step.1.18.Var.1.Crit.5.Ref = acc_csc_018 - No Collision Distance
Step.1.18.Var.1.Crit.5.Result = good
Step.1.18.Var.1.Crit.6.Ref = acc_csc_018 - Collision Flag
Step.1.18.Var.1.Crit.6.Result = good
Step.1.18.Var.1.Crit.7.Ref = acc_csc_018 - Impact Speed
Step.1.18.Var.1.Crit.7.Result = good
Step.1.18.Var.2.Name = acc_csc_018_ds003
Step.1.18.Var.2.Param = 20 0 170
Step.1.18.Var.2.Result = bad
Step.1.18.Var.2.ResDate = 1782804292
Step.1.18.Var.2.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_018_142444.erg
Step.1.18.Var.2.ManLst = 0:lat0 1:long0
Step.1.18.Var.2.Char.0.Ref = acc_csc_018_ActualDist
Step.1.18.Var.2.Char.0.Value = 999.0
Step.1.18.Var.2.Char.1.Ref = acc_csc_018_SafeDist
Step.1.18.Var.2.Char.1.Value = 15.0
Step.1.18.Var.2.Char.2.Ref = acc_csc_018_SafeDistViolated
Step.1.18.Var.2.Char.2.Value = 0.0
Step.1.18.Var.2.Char.3.Ref = acc_csc_018_TTC
Step.1.18.Var.2.Char.3.Value = 0.0
Step.1.18.Var.2.Char.4.Ref = acc_csc_018_TTCWarnEver
Step.1.18.Var.2.Char.4.Value = 0.0
Step.1.18.Var.2.Char.5.Ref = acc_csc_018_TTCBadEver
Step.1.18.Var.2.Char.5.Value = 0.0
Step.1.18.Var.2.Char.6.Ref = acc_csc_018_ComfortAx
Step.1.18.Var.2.Char.6.Value = 2.8
Step.1.18.Var.2.Char.7.Ref = acc_csc_018_ComfortAxOutOfBoundEver
Step.1.18.Var.2.Char.7.Value = 0.0
Step.1.18.Var.2.Char.8.Ref = acc_csc_018_EmergencyAx
Step.1.18.Var.2.Char.8.Value = 2.8
Step.1.18.Var.2.Char.9.Ref = acc_csc_018_EmergencyAxOutOfBoundEver
Step.1.18.Var.2.Char.9.Value = 0.0
Step.1.18.Var.2.Char.10.Ref = acc_csc_018_Jerk
Step.1.18.Var.2.Char.10.Value = 0.0
Step.1.18.Var.2.Char.11.Ref = acc_csc_018_JerkOverLimitEver
Step.1.18.Var.2.Char.11.Value = 1.0
Step.1.18.Var.2.Char.12.Ref = acc_csc_018_NoCollDist
Step.1.18.Var.2.Char.12.Value = 999.0
Step.1.18.Var.2.Char.13.Ref = acc_csc_018_NoCollDistViolatedEver
Step.1.18.Var.2.Char.13.Value = 0.0
Step.1.18.Var.2.Char.14.Ref = acc_csc_018_CollisionFlag
Step.1.18.Var.2.Char.14.Value = 0.0
Step.1.18.Var.2.Char.15.Ref = acc_csc_018_ImpactSpeed
Step.1.18.Var.2.Char.15.Value = 0.0
Step.1.18.Var.2.Char.16.Ref = acc_csc_018_CollisionEver
Step.1.18.Var.2.Char.16.Value = 0.0
Step.1.18.Var.2.Crit.0.Ref = acc_csc_018 - Safe Distance Consistency
Step.1.18.Var.2.Crit.0.Result = good
Step.1.18.Var.2.Crit.1.Ref = acc_csc_018 - Time To Collision
Step.1.18.Var.2.Crit.1.Result = good
Step.1.18.Var.2.Crit.2.Ref = acc_csc_018 - Comfort Deceleration Limit
Step.1.18.Var.2.Crit.2.Result = good
Step.1.18.Var.2.Crit.3.Ref = acc_csc_018 - Emergency Deceleration Bound
Step.1.18.Var.2.Crit.3.Result = good
Step.1.18.Var.2.Crit.4.Ref = acc_csc_018 - Jerk Limit
Step.1.18.Var.2.Crit.4.Result = bad
Step.1.18.Var.2.Crit.5.Ref = acc_csc_018 - No Collision Distance
Step.1.18.Var.2.Crit.5.Result = good
Step.1.18.Var.2.Crit.6.Ref = acc_csc_018 - Collision Flag
Step.1.18.Var.2.Crit.6.Result = good
Step.1.18.Var.2.Crit.7.Ref = acc_csc_018 - Impact Speed
Step.1.18.Var.2.Crit.7.Result = good
Step.1.18.Var.3.Name = acc_csc_018_ds004
Step.1.18.Var.3.Param = 25 0 215
Step.1.18.Var.3.Result = bad
Step.1.18.Var.3.ResDate = 1782804304
Step.1.18.Var.3.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_018_142456.erg
Step.1.18.Var.3.ManLst = 0:lat0 1:long0
Step.1.18.Var.3.Char.0.Ref = acc_csc_018_ActualDist
Step.1.18.Var.3.Char.0.Value = 999.0
Step.1.18.Var.3.Char.1.Ref = acc_csc_018_SafeDist
Step.1.18.Var.3.Char.1.Value = 52.92131364833857
Step.1.18.Var.3.Char.2.Ref = acc_csc_018_SafeDistViolated
Step.1.18.Var.3.Char.2.Value = 0.0
Step.1.18.Var.3.Char.3.Ref = acc_csc_018_TTC
Step.1.18.Var.3.Char.3.Value = 0.0
Step.1.18.Var.3.Char.4.Ref = acc_csc_018_TTCWarnEver
Step.1.18.Var.3.Char.4.Value = 0.0
Step.1.18.Var.3.Char.5.Ref = acc_csc_018_TTCBadEver
Step.1.18.Var.3.Char.5.Value = 0.0
Step.1.18.Var.3.Char.6.Ref = acc_csc_018_ComfortAx
Step.1.18.Var.3.Char.6.Value = -0.004
Step.1.18.Var.3.Char.7.Ref = acc_csc_018_ComfortAxOutOfBoundEver
Step.1.18.Var.3.Char.7.Value = 0.0
Step.1.18.Var.3.Char.8.Ref = acc_csc_018_EmergencyAx
Step.1.18.Var.3.Char.8.Value = -0.004
Step.1.18.Var.3.Char.9.Ref = acc_csc_018_EmergencyAxOutOfBoundEver
Step.1.18.Var.3.Char.9.Value = 0.0
Step.1.18.Var.3.Char.10.Ref = acc_csc_018_Jerk
Step.1.18.Var.3.Char.10.Value = 0.0
Step.1.18.Var.3.Char.11.Ref = acc_csc_018_JerkOverLimitEver
Step.1.18.Var.3.Char.11.Value = 1.0
Step.1.18.Var.3.Char.12.Ref = acc_csc_018_NoCollDist
Step.1.18.Var.3.Char.12.Value = 999.0
Step.1.18.Var.3.Char.13.Ref = acc_csc_018_NoCollDistViolatedEver
Step.1.18.Var.3.Char.13.Value = 0.0
Step.1.18.Var.3.Char.14.Ref = acc_csc_018_CollisionFlag
Step.1.18.Var.3.Char.14.Value = 0.0
Step.1.18.Var.3.Char.15.Ref = acc_csc_018_ImpactSpeed
Step.1.18.Var.3.Char.15.Value = 0.0
Step.1.18.Var.3.Char.16.Ref = acc_csc_018_CollisionEver
Step.1.18.Var.3.Char.16.Value = 0.0
Step.1.18.Var.3.Crit.0.Ref = acc_csc_018 - Safe Distance Consistency
Step.1.18.Var.3.Crit.0.Result = good
Step.1.18.Var.3.Crit.1.Ref = acc_csc_018 - Time To Collision
Step.1.18.Var.3.Crit.1.Result = good
Step.1.18.Var.3.Crit.2.Ref = acc_csc_018 - Comfort Deceleration Limit
Step.1.18.Var.3.Crit.2.Result = good
Step.1.18.Var.3.Crit.3.Ref = acc_csc_018 - Emergency Deceleration Bound
Step.1.18.Var.3.Crit.3.Result = good
Step.1.18.Var.3.Crit.4.Ref = acc_csc_018 - Jerk Limit
Step.1.18.Var.3.Crit.4.Result = bad
Step.1.18.Var.3.Crit.5.Ref = acc_csc_018 - No Collision Distance
Step.1.18.Var.3.Crit.5.Result = good
Step.1.18.Var.3.Crit.6.Ref = acc_csc_018 - Collision Flag
Step.1.18.Var.3.Crit.6.Result = good
Step.1.18.Var.3.Crit.7.Ref = acc_csc_018 - Impact Speed
Step.1.18.Var.3.Crit.7.Result = good
Step.1.18.Var.4.Name = acc_csc_018_ds005
Step.1.18.Var.4.Param = 30 0 245
Step.1.18.Var.4.Result = err
Step.1.18.Var.4.ResDate = 1782804311
Step.1.18.Var.4.ManLst = 0:lat0 1:long0
Step.1.18.Var.4.Log.0.Time = 12.429
Step.1.18.Var.4.Log.0.Kind = err
Step.1.18.Var.4.Log.0.Text = Simulation ended with errors
Step.1.18.Var.4.Char.0.Ref = acc_csc_018_ActualDist
Step.1.18.Var.4.Char.0.Value = 999.0
Step.1.18.Var.4.Char.1.Ref = acc_csc_018_SafeDist
Step.1.18.Var.4.Char.1.Value = 26.4248469364883
Step.1.18.Var.4.Char.2.Ref = acc_csc_018_SafeDistViolated
Step.1.18.Var.4.Char.2.Value = 0.0
Step.1.18.Var.4.Char.3.Ref = acc_csc_018_TTC
Step.1.18.Var.4.Char.3.Value = 0.0
Step.1.18.Var.4.Char.4.Ref = acc_csc_018_TTCWarnEver
Step.1.18.Var.4.Char.4.Value = 0.0
Step.1.18.Var.4.Char.5.Ref = acc_csc_018_TTCBadEver
Step.1.18.Var.4.Char.5.Value = 0.0
Step.1.18.Var.4.Char.6.Ref = acc_csc_018_ComfortAx
Step.1.18.Var.4.Char.6.Value = 2.8
Step.1.18.Var.4.Char.7.Ref = acc_csc_018_ComfortAxOutOfBoundEver
Step.1.18.Var.4.Char.7.Value = 0.0
Step.1.18.Var.4.Char.8.Ref = acc_csc_018_EmergencyAx
Step.1.18.Var.4.Char.8.Value = 2.8
Step.1.18.Var.4.Char.9.Ref = acc_csc_018_EmergencyAxOutOfBoundEver
Step.1.18.Var.4.Char.9.Value = 0.0
Step.1.18.Var.4.Char.10.Ref = acc_csc_018_Jerk
Step.1.18.Var.4.Char.10.Value = 0.0
Step.1.18.Var.4.Char.11.Ref = acc_csc_018_JerkOverLimitEver
Step.1.18.Var.4.Char.11.Value = 1.0
Step.1.18.Var.4.Char.12.Ref = acc_csc_018_NoCollDist
Step.1.18.Var.4.Char.12.Value = 999.0
Step.1.18.Var.4.Char.13.Ref = acc_csc_018_NoCollDistViolatedEver
Step.1.18.Var.4.Char.13.Value = 0.0
Step.1.18.Var.4.Char.14.Ref = acc_csc_018_CollisionFlag
Step.1.18.Var.4.Char.14.Value = 0.0
Step.1.18.Var.4.Char.15.Ref = acc_csc_018_ImpactSpeed
Step.1.18.Var.4.Char.15.Value = 0.0
Step.1.18.Var.4.Char.16.Ref = acc_csc_018_CollisionEver
Step.1.18.Var.4.Char.16.Value = 0.0
Step.1.18.Var.4.Crit.0.Ref = acc_csc_018 - Safe Distance Consistency
Step.1.18.Var.4.Crit.0.Result = good
Step.1.18.Var.4.Crit.1.Ref = acc_csc_018 - Time To Collision
Step.1.18.Var.4.Crit.1.Result = good
Step.1.18.Var.4.Crit.2.Ref = acc_csc_018 - Comfort Deceleration Limit
Step.1.18.Var.4.Crit.2.Result = good
Step.1.18.Var.4.Crit.3.Ref = acc_csc_018 - Emergency Deceleration Bound
Step.1.18.Var.4.Crit.3.Result = good
Step.1.18.Var.4.Crit.4.Ref = acc_csc_018 - Jerk Limit
Step.1.18.Var.4.Crit.4.Result = bad
Step.1.18.Var.4.Crit.5.Ref = acc_csc_018 - No Collision Distance
Step.1.18.Var.4.Crit.5.Result = good
Step.1.18.Var.4.Crit.6.Ref = acc_csc_018 - Collision Flag
Step.1.18.Var.4.Crit.6.Result = good
Step.1.18.Var.4.Crit.7.Ref = acc_csc_018 - Impact Speed
Step.1.18.Var.4.Crit.7.Result = good
Step.1.19 = TestRun
Step.1.19.Name = OSC_Imported/longitudinal_feature/ACC/acc_csc_019
Step.1.19.Param.0 = EgoSpeed NValue
Step.1.19.Param.1 = TVSpeed NValue
Step.1.19.Param.2 = TV_initPos NValue
Step.1.19.Char.0.Name = acc_csc_019_ActualDist
Step.1.19.Char.0.Description:
	Actual distance to lead (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.19.Char.0.Identifier = acc_csc_019_ActualDist
Step.1.19.Char.0.Unit =
Step.1.19.Char.0.Param.0 = RTexpr "Qu::acc_csc_019_ActualDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.19.Char.1.Name = acc_csc_019_SafeDist
Step.1.19.Char.1.Description:
	Reference safe distance (signal=FMU.CM_ACCController_V17.Out.Debug.SafeDistance)
Step.1.19.Char.1.Identifier = acc_csc_019_SafeDist
Step.1.19.Char.1.Unit =
Step.1.19.Char.1.Param.0 = RTexpr "Qu::acc_csc_019_SafeDist=FMU.CM_ACCController_V17.Out.Debug.SafeDistance"
Step.1.19.Char.2.Name = acc_csc_019_SafeDistViolated
Step.1.19.Char.2.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment ActualDist<SafeDist while actively following (gate==1); stays 1 for the rest of the run even if distance recovers.
Step.1.19.Char.2.Identifier = acc_csc_019_SafeDistViolated
Step.1.19.Char.2.Unit =
Step.1.19.Char.2.Param.0 = RTexpr {first()?Qu::acc_csc_019_SafeDistViolated=0:acc_csc_019_SafeDistViolated=max(acc_csc_019_SafeDistViolated,(FMU.CM_ACCController_V17.Out.Debug.Fusion.Active==1 && acc_csc_019_ActualDist<acc_csc_019_SafeDist))}
Step.1.19.Char.3.Name = acc_csc_019_TTC
Step.1.19.Char.3.Description:
	Time-to-collision (signal=AccelCtrl.ACC.Time2Collision)
Step.1.19.Char.3.Identifier = acc_csc_019_TTC
Step.1.19.Char.3.Unit =
Step.1.19.Char.3.Param.0 = RTexpr "Qu::acc_csc_019_TTC=AccelCtrl.ACC.Time2Collision"
Step.1.19.Char.4.Name = acc_csc_019_TTCWarnEver
Step.1.19.Char.4.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the warn zone [3.5,11)s.
Step.1.19.Char.4.Identifier = acc_csc_019_TTCWarnEver
Step.1.19.Char.4.Unit =
Step.1.19.Char.4.Param.0 = RTexpr {first()?Qu::acc_csc_019_TTCWarnEver=0:acc_csc_019_TTCWarnEver=max(acc_csc_019_TTCWarnEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_019_TTC>=3.5 && acc_csc_019_TTC<11))}
Step.1.19.Char.5.Name = acc_csc_019_TTCBadEver
Step.1.19.Char.5.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment TTC ever enters the bad zone (0,3.5)s.
Step.1.19.Char.5.Identifier = acc_csc_019_TTCBadEver
Step.1.19.Char.5.Unit =
Step.1.19.Char.5.Param.0 = RTexpr {first()?Qu::acc_csc_019_TTCBadEver=0:acc_csc_019_TTCBadEver=max(acc_csc_019_TTCBadEver,(FMU.CM_ACCController_V17.Out.Debug.Target.Valid==1 && acc_csc_019_TTC>0 && acc_csc_019_TTC<3.5))}
Step.1.19.Char.6.Name = acc_csc_019_ComfortAx
Step.1.19.Char.6.Description:
	Comfort Deceleration Limit (signal=AccelCtrl.DesiredAx)
Step.1.19.Char.6.Identifier = acc_csc_019_ComfortAx
Step.1.19.Char.6.Unit =
Step.1.19.Char.6.Param.0 = RTexpr "Qu::acc_csc_019_ComfortAx=AccelCtrl.DesiredAx"
Step.1.19.Char.7.Name = acc_csc_019_ComfortAxOutOfBoundEver
Step.1.19.Char.7.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Comfort Deceleration Limit ever goes out of bound (min=-3, max=2.8).
Step.1.19.Char.7.Identifier = acc_csc_019_ComfortAxOutOfBoundEver
Step.1.19.Char.7.Unit =
Step.1.19.Char.7.Param.0 = RTexpr {first()?Qu::acc_csc_019_ComfortAxOutOfBoundEver=0:acc_csc_019_ComfortAxOutOfBoundEver=max(acc_csc_019_ComfortAxOutOfBoundEver,(acc_csc_019_ComfortAx<-3 || acc_csc_019_ComfortAx>2.8))}
Step.1.19.Char.8.Name = acc_csc_019_EmergencyAx
Step.1.19.Char.8.Description:
	Emergency Deceleration Bound (signal=AccelCtrl.DesiredAx)
Step.1.19.Char.8.Identifier = acc_csc_019_EmergencyAx
Step.1.19.Char.8.Unit =
Step.1.19.Char.8.Param.0 = RTexpr "Qu::acc_csc_019_EmergencyAx=AccelCtrl.DesiredAx"
Step.1.19.Char.9.Name = acc_csc_019_EmergencyAxOutOfBoundEver
Step.1.19.Char.9.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment Emergency Deceleration Bound ever goes out of bound (min=-6).
Step.1.19.Char.9.Identifier = acc_csc_019_EmergencyAxOutOfBoundEver
Step.1.19.Char.9.Unit =
Step.1.19.Char.9.Param.0 = RTexpr {first()?Qu::acc_csc_019_EmergencyAxOutOfBoundEver=0:acc_csc_019_EmergencyAxOutOfBoundEver=max(acc_csc_019_EmergencyAxOutOfBoundEver,(acc_csc_019_EmergencyAx<-6))}
Step.1.19.Char.10.Name = acc_csc_019_Jerk
Step.1.19.Char.10.Description:
	Jerk = |d(DesiredAx)/dt|, base signal=AccelCtrl.DesiredAx
Step.1.19.Char.10.Identifier = acc_csc_019_Jerk
Step.1.19.Char.10.Unit =
Step.1.19.Char.10.Param.0 = RTexpr "Qu::acc_csc_019_Jerk=abs(diff(AccelCtrl.DesiredAx,Time))"
Step.1.19.Char.11.Name = acc_csc_019_JerkOverLimitEver
Step.1.19.Char.11.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment |jerk| ever exceeds 4 m/s3.
Step.1.19.Char.11.Identifier = acc_csc_019_JerkOverLimitEver
Step.1.19.Char.11.Unit =
Step.1.19.Char.11.Param.0 = RTexpr {first()?Qu::acc_csc_019_JerkOverLimitEver=0:acc_csc_019_JerkOverLimitEver=max(acc_csc_019_JerkOverLimitEver,(acc_csc_019_Jerk>4))}
Step.1.19.Char.12.Name = acc_csc_019_NoCollDist
Step.1.19.Char.12.Description:
	Distance to nearest lead object (signal=FMU.CM_ACCController_V17.Out.Debug.Target.DistX)
Step.1.19.Char.12.Identifier = acc_csc_019_NoCollDist
Step.1.19.Char.12.Unit =
Step.1.19.Char.12.Param.0 = RTexpr "Qu::acc_csc_019_NoCollDist=FMU.CM_ACCController_V17.Out.Debug.Target.DistX"
Step.1.19.Char.13.Name = acc_csc_019_NoCollDistViolatedEver
Step.1.19.Char.13.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment distance ever drops below 0m.
Step.1.19.Char.13.Identifier = acc_csc_019_NoCollDistViolatedEver
Step.1.19.Char.13.Unit =
Step.1.19.Char.13.Param.0 = RTexpr {first()?Qu::acc_csc_019_NoCollDistViolatedEver=0:acc_csc_019_NoCollDistViolatedEver=max(acc_csc_019_NoCollDistViolatedEver,(acc_csc_019_NoCollDist<0))}
Step.1.19.Char.14.Name = acc_csc_019_CollisionFlag
Step.1.19.Char.14.Description:
	Collision flag derived from FMU.CM_ACCController_V17.Out.Debug.Target.DistX <= 0 (nearest lead object); instantaneous, used as the latch() trigger for ImpactSpeed below.
Step.1.19.Char.14.Identifier = acc_csc_019_CollisionFlag
Step.1.19.Char.14.Unit =
Step.1.19.Char.14.Param.0 = RTexpr "Qu::acc_csc_019_CollisionFlag=(FMU.CM_ACCController_V17.Out.Debug.Target.DistX<=0)"
Step.1.19.Char.15.Name = acc_csc_019_ImpactSpeed
Step.1.19.Char.15.Description:
	Ego speed latched at moment of first collision (nearest lead object)
Step.1.19.Char.15.Identifier = acc_csc_019_ImpactSpeed
Step.1.19.Char.15.Unit =
Step.1.19.Char.15.Param.0 = RTexpr {Qu::acc_csc_019_ImpactSpeed=latch(Speed("Ego"),Qu::acc_csc_019_CollisionFlag==1)}
Step.1.19.Char.16.Name = acc_csc_019_CollisionEver
Step.1.19.Char.16.Description:
	[EVALUATED OVER ENTIRE TEST RUN DURATION] Latches to 1 the moment a collision ever occurs (nearest lead object), even if the vehicles separate again before the run ends.
Step.1.19.Char.16.Identifier = acc_csc_019_CollisionEver
Step.1.19.Char.16.Unit =
Step.1.19.Char.16.Param.0 = RTexpr {first()?Qu::acc_csc_019_CollisionEver=0:acc_csc_019_CollisionEver=max(acc_csc_019_CollisionEver,(acc_csc_019_CollisionFlag==1))}
Step.1.19.Crit.0.Name = acc_csc_019 - Safe Distance Consistency
Step.1.19.Crit.0.Description:
	Good if SafeDist was never violated while actively following throughout the run. Bad if it was violated at any point.
Step.1.19.Crit.0.Good = [get acc_csc_019_SafeDistViolated] == 0
Step.1.19.Crit.0.Warn =
Step.1.19.Crit.0.Bad = [get acc_csc_019_SafeDistViolated] == 1
Step.1.19.Crit.1.Name = acc_csc_019 - Time To Collision
Step.1.19.Crit.1.Description:
	Good if TTC never entered the warn/bad zone while a valid target existed throughout the run. Warn if it ever entered [3.5,11)s. Bad if it ever entered (0,3.5)s.
Step.1.19.Crit.1.Good = [get acc_csc_019_TTCBadEver] == 0 && [get acc_csc_019_TTCWarnEver] == 0
Step.1.19.Crit.1.Warn = [get acc_csc_019_TTCBadEver] == 0 && [get acc_csc_019_TTCWarnEver] == 1
Step.1.19.Crit.1.Bad = [get acc_csc_019_TTCBadEver] == 1
Step.1.19.Crit.2.Name = acc_csc_019 - Comfort Deceleration Limit
Step.1.19.Crit.2.Description:
	Good if Comfort Deceleration Limit never went out of bound (min=-3, max=2.8) throughout the run.
Step.1.19.Crit.2.Good = [get acc_csc_019_ComfortAxOutOfBoundEver] == 0
Step.1.19.Crit.2.Warn =
Step.1.19.Crit.2.Bad = [get acc_csc_019_ComfortAxOutOfBoundEver] == 1
Step.1.19.Crit.3.Name = acc_csc_019 - Emergency Deceleration Bound
Step.1.19.Crit.3.Description:
	Good if Emergency Deceleration Bound never went out of bound (min=-6) throughout the run.
Step.1.19.Crit.3.Good = [get acc_csc_019_EmergencyAxOutOfBoundEver] == 0
Step.1.19.Crit.3.Warn =
Step.1.19.Crit.3.Bad = [get acc_csc_019_EmergencyAxOutOfBoundEver] == 1
Step.1.19.Crit.4.Name = acc_csc_019 - Jerk Limit
Step.1.19.Crit.4.Description:
	Good if |jerk| never exceeded 4 m/s3 throughout the run.
Step.1.19.Crit.4.Good = [get acc_csc_019_JerkOverLimitEver] == 0
Step.1.19.Crit.4.Warn =
Step.1.19.Crit.4.Bad = [get acc_csc_019_JerkOverLimitEver] == 1
Step.1.19.Crit.5.Name = acc_csc_019 - No Collision Distance
Step.1.19.Crit.5.Description:
	Good if distance never dropped below 0m throughout the run.
Step.1.19.Crit.5.Good = [get acc_csc_019_NoCollDistViolatedEver] == 0
Step.1.19.Crit.5.Warn =
Step.1.19.Crit.5.Bad = [get acc_csc_019_NoCollDistViolatedEver] == 1
Step.1.19.Crit.6.Name = acc_csc_019 - Collision Flag
Step.1.19.Crit.6.Description:
	Good if no collision ever occurred (nearest lead object) throughout the run.
Step.1.19.Crit.6.Good = [get acc_csc_019_CollisionEver] == 0
Step.1.19.Crit.6.Warn =
Step.1.19.Crit.6.Bad = [get acc_csc_019_CollisionEver] == 1
Step.1.19.Crit.7.Name = acc_csc_019 - Impact Speed
Step.1.19.Crit.7.Description:
	Good if no collision ever occurred, or impact speed = 0; Warn (0,5) m/s; Bad >= 5 m/s
Step.1.19.Crit.7.Good = [get acc_csc_019_CollisionEver] == 0 || [get acc_csc_019_ImpactSpeed] == 0
Step.1.19.Crit.7.Warn = [get acc_csc_019_CollisionEver] == 1 && [get acc_csc_019_ImpactSpeed] > 0 && [get acc_csc_019_ImpactSpeed] < 5
Step.1.19.Crit.7.Bad = [get acc_csc_019_CollisionEver] == 1 && [get acc_csc_019_ImpactSpeed] >= 5
Step.1.19.Var.0.Name = acc_csc_019_ds001
Step.1.19.Var.0.Param = 10 0 100
Step.1.19.Var.0.Result = bad
Step.1.19.Var.0.ResDate = 1782804324
Step.1.19.Var.0.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_019_142516.erg
Step.1.19.Var.0.ManLst = 0:lat0 1:long0
Step.1.19.Var.0.Char.0.Ref = acc_csc_019_ActualDist
Step.1.19.Var.0.Char.0.Value = 999.0
Step.1.19.Var.0.Char.1.Ref = acc_csc_019_SafeDist
Step.1.19.Var.0.Char.1.Value = 34.502022128686406
Step.1.19.Var.0.Char.2.Ref = acc_csc_019_SafeDistViolated
Step.1.19.Var.0.Char.2.Value = 0.0
Step.1.19.Var.0.Char.3.Ref = acc_csc_019_TTC
Step.1.19.Var.0.Char.3.Value = 0.0
Step.1.19.Var.0.Char.4.Ref = acc_csc_019_TTCWarnEver
Step.1.19.Var.0.Char.4.Value = 0.0
Step.1.19.Var.0.Char.5.Ref = acc_csc_019_TTCBadEver
Step.1.19.Var.0.Char.5.Value = 0.0
Step.1.19.Var.0.Char.6.Ref = acc_csc_019_ComfortAx
Step.1.19.Var.0.Char.6.Value = -0.0007033491083163313
Step.1.19.Var.0.Char.7.Ref = acc_csc_019_ComfortAxOutOfBoundEver
Step.1.19.Var.0.Char.7.Value = 0.0
Step.1.19.Var.0.Char.8.Ref = acc_csc_019_EmergencyAx
Step.1.19.Var.0.Char.8.Value = -0.0007033491083163313
Step.1.19.Var.0.Char.9.Ref = acc_csc_019_EmergencyAxOutOfBoundEver
Step.1.19.Var.0.Char.9.Value = 0.0
Step.1.19.Var.0.Char.10.Ref = acc_csc_019_Jerk
Step.1.19.Var.0.Char.10.Value = 2.6142132014961506e-6
Step.1.19.Var.0.Char.11.Ref = acc_csc_019_JerkOverLimitEver
Step.1.19.Var.0.Char.11.Value = 1.0
Step.1.19.Var.0.Char.12.Ref = acc_csc_019_NoCollDist
Step.1.19.Var.0.Char.12.Value = 999.0
Step.1.19.Var.0.Char.13.Ref = acc_csc_019_NoCollDistViolatedEver
Step.1.19.Var.0.Char.13.Value = 0.0
Step.1.19.Var.0.Char.14.Ref = acc_csc_019_CollisionFlag
Step.1.19.Var.0.Char.14.Value = 0.0
Step.1.19.Var.0.Char.15.Ref = acc_csc_019_ImpactSpeed
Step.1.19.Var.0.Char.15.Value = 0.0
Step.1.19.Var.0.Char.16.Ref = acc_csc_019_CollisionEver
Step.1.19.Var.0.Char.16.Value = 0.0
Step.1.19.Var.0.Crit.0.Ref = acc_csc_019 - Safe Distance Consistency
Step.1.19.Var.0.Crit.0.Result = good
Step.1.19.Var.0.Crit.1.Ref = acc_csc_019 - Time To Collision
Step.1.19.Var.0.Crit.1.Result = good
Step.1.19.Var.0.Crit.2.Ref = acc_csc_019 - Comfort Deceleration Limit
Step.1.19.Var.0.Crit.2.Result = good
Step.1.19.Var.0.Crit.3.Ref = acc_csc_019 - Emergency Deceleration Bound
Step.1.19.Var.0.Crit.3.Result = good
Step.1.19.Var.0.Crit.4.Ref = acc_csc_019 - Jerk Limit
Step.1.19.Var.0.Crit.4.Result = bad
Step.1.19.Var.0.Crit.5.Ref = acc_csc_019 - No Collision Distance
Step.1.19.Var.0.Crit.5.Result = good
Step.1.19.Var.0.Crit.6.Ref = acc_csc_019 - Collision Flag
Step.1.19.Var.0.Crit.6.Result = good
Step.1.19.Var.0.Crit.7.Ref = acc_csc_019 - Impact Speed
Step.1.19.Var.0.Crit.7.Result = good
Step.1.19.Var.1.Name = acc_csc_019_ds002
Step.1.19.Var.1.Param = 15 0 135
Step.1.19.Var.1.Result = bad
Step.1.19.Var.1.ResDate = 1782804336
Step.1.19.Var.1.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_019_142528.erg
Step.1.19.Var.1.ManLst = 0:lat0 1:long0
Step.1.19.Var.1.Char.0.Ref = acc_csc_019_ActualDist
Step.1.19.Var.1.Char.0.Value = 999.0
Step.1.19.Var.1.Char.1.Ref = acc_csc_019_SafeDist
Step.1.19.Var.1.Char.1.Value = 34.50201511191818
Step.1.19.Var.1.Char.2.Ref = acc_csc_019_SafeDistViolated
Step.1.19.Var.1.Char.2.Value = 0.0
Step.1.19.Var.1.Char.3.Ref = acc_csc_019_TTC
Step.1.19.Var.1.Char.3.Value = 0.0
Step.1.19.Var.1.Char.4.Ref = acc_csc_019_TTCWarnEver
Step.1.19.Var.1.Char.4.Value = 0.0
Step.1.19.Var.1.Char.5.Ref = acc_csc_019_TTCBadEver
Step.1.19.Var.1.Char.5.Value = 0.0
Step.1.19.Var.1.Char.6.Ref = acc_csc_019_ComfortAx
Step.1.19.Var.1.Char.6.Value = -0.0007009084932832366
Step.1.19.Var.1.Char.7.Ref = acc_csc_019_ComfortAxOutOfBoundEver
Step.1.19.Var.1.Char.7.Value = 0.0
Step.1.19.Var.1.Char.8.Ref = acc_csc_019_EmergencyAx
Step.1.19.Var.1.Char.8.Value = -0.0007009084932832366
Step.1.19.Var.1.Char.9.Ref = acc_csc_019_EmergencyAxOutOfBoundEver
Step.1.19.Var.1.Char.9.Value = 0.0
Step.1.19.Var.1.Char.10.Ref = acc_csc_019_Jerk
Step.1.19.Var.1.Char.10.Value = 5.43575140412676e-7
Step.1.19.Var.1.Char.11.Ref = acc_csc_019_JerkOverLimitEver
Step.1.19.Var.1.Char.11.Value = 1.0
Step.1.19.Var.1.Char.12.Ref = acc_csc_019_NoCollDist
Step.1.19.Var.1.Char.12.Value = 999.0
Step.1.19.Var.1.Char.13.Ref = acc_csc_019_NoCollDistViolatedEver
Step.1.19.Var.1.Char.13.Value = 0.0
Step.1.19.Var.1.Char.14.Ref = acc_csc_019_CollisionFlag
Step.1.19.Var.1.Char.14.Value = 0.0
Step.1.19.Var.1.Char.15.Ref = acc_csc_019_ImpactSpeed
Step.1.19.Var.1.Char.15.Value = 0.0
Step.1.19.Var.1.Char.16.Ref = acc_csc_019_CollisionEver
Step.1.19.Var.1.Char.16.Value = 0.0
Step.1.19.Var.1.Crit.0.Ref = acc_csc_019 - Safe Distance Consistency
Step.1.19.Var.1.Crit.0.Result = good
Step.1.19.Var.1.Crit.1.Ref = acc_csc_019 - Time To Collision
Step.1.19.Var.1.Crit.1.Result = good
Step.1.19.Var.1.Crit.2.Ref = acc_csc_019 - Comfort Deceleration Limit
Step.1.19.Var.1.Crit.2.Result = good
Step.1.19.Var.1.Crit.3.Ref = acc_csc_019 - Emergency Deceleration Bound
Step.1.19.Var.1.Crit.3.Result = good
Step.1.19.Var.1.Crit.4.Ref = acc_csc_019 - Jerk Limit
Step.1.19.Var.1.Crit.4.Result = bad
Step.1.19.Var.1.Crit.5.Ref = acc_csc_019 - No Collision Distance
Step.1.19.Var.1.Crit.5.Result = good
Step.1.19.Var.1.Crit.6.Ref = acc_csc_019 - Collision Flag
Step.1.19.Var.1.Crit.6.Result = good
Step.1.19.Var.1.Crit.7.Ref = acc_csc_019 - Impact Speed
Step.1.19.Var.1.Crit.7.Result = good
Step.1.19.Var.2.Name = acc_csc_019_ds003
Step.1.19.Var.2.Param = 20 0 170
Step.1.19.Var.2.Result = bad
Step.1.19.Var.2.ResDate = 1782804348
Step.1.19.Var.2.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_019_142540.erg
Step.1.19.Var.2.ManLst = 0:lat0 1:long0
Step.1.19.Var.2.Char.0.Ref = acc_csc_019_ActualDist
Step.1.19.Var.2.Char.0.Value = 999.0
Step.1.19.Var.2.Char.1.Ref = acc_csc_019_SafeDist
Step.1.19.Var.2.Char.1.Value = 15.0
Step.1.19.Var.2.Char.2.Ref = acc_csc_019_SafeDistViolated
Step.1.19.Var.2.Char.2.Value = 0.0
Step.1.19.Var.2.Char.3.Ref = acc_csc_019_TTC
Step.1.19.Var.2.Char.3.Value = 0.0
Step.1.19.Var.2.Char.4.Ref = acc_csc_019_TTCWarnEver
Step.1.19.Var.2.Char.4.Value = 0.0
Step.1.19.Var.2.Char.5.Ref = acc_csc_019_TTCBadEver
Step.1.19.Var.2.Char.5.Value = 0.0
Step.1.19.Var.2.Char.6.Ref = acc_csc_019_ComfortAx
Step.1.19.Var.2.Char.6.Value = 2.8
Step.1.19.Var.2.Char.7.Ref = acc_csc_019_ComfortAxOutOfBoundEver
Step.1.19.Var.2.Char.7.Value = 0.0
Step.1.19.Var.2.Char.8.Ref = acc_csc_019_EmergencyAx
Step.1.19.Var.2.Char.8.Value = 2.8
Step.1.19.Var.2.Char.9.Ref = acc_csc_019_EmergencyAxOutOfBoundEver
Step.1.19.Var.2.Char.9.Value = 0.0
Step.1.19.Var.2.Char.10.Ref = acc_csc_019_Jerk
Step.1.19.Var.2.Char.10.Value = 0.0
Step.1.19.Var.2.Char.11.Ref = acc_csc_019_JerkOverLimitEver
Step.1.19.Var.2.Char.11.Value = 1.0
Step.1.19.Var.2.Char.12.Ref = acc_csc_019_NoCollDist
Step.1.19.Var.2.Char.12.Value = 999.0
Step.1.19.Var.2.Char.13.Ref = acc_csc_019_NoCollDistViolatedEver
Step.1.19.Var.2.Char.13.Value = 0.0
Step.1.19.Var.2.Char.14.Ref = acc_csc_019_CollisionFlag
Step.1.19.Var.2.Char.14.Value = 0.0
Step.1.19.Var.2.Char.15.Ref = acc_csc_019_ImpactSpeed
Step.1.19.Var.2.Char.15.Value = 0.0
Step.1.19.Var.2.Char.16.Ref = acc_csc_019_CollisionEver
Step.1.19.Var.2.Char.16.Value = 0.0
Step.1.19.Var.2.Crit.0.Ref = acc_csc_019 - Safe Distance Consistency
Step.1.19.Var.2.Crit.0.Result = good
Step.1.19.Var.2.Crit.1.Ref = acc_csc_019 - Time To Collision
Step.1.19.Var.2.Crit.1.Result = good
Step.1.19.Var.2.Crit.2.Ref = acc_csc_019 - Comfort Deceleration Limit
Step.1.19.Var.2.Crit.2.Result = good
Step.1.19.Var.2.Crit.3.Ref = acc_csc_019 - Emergency Deceleration Bound
Step.1.19.Var.2.Crit.3.Result = good
Step.1.19.Var.2.Crit.4.Ref = acc_csc_019 - Jerk Limit
Step.1.19.Var.2.Crit.4.Result = bad
Step.1.19.Var.2.Crit.5.Ref = acc_csc_019 - No Collision Distance
Step.1.19.Var.2.Crit.5.Result = good
Step.1.19.Var.2.Crit.6.Ref = acc_csc_019 - Collision Flag
Step.1.19.Var.2.Crit.6.Result = good
Step.1.19.Var.2.Crit.7.Ref = acc_csc_019 - Impact Speed
Step.1.19.Var.2.Crit.7.Result = good
Step.1.19.Var.3.Name = acc_csc_019_ds004
Step.1.19.Var.3.Param = 25 0 215
Step.1.19.Var.3.Result = bad
Step.1.19.Var.3.ResDate = 1782804360
Step.1.19.Var.3.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_019_142552.erg
Step.1.19.Var.3.ManLst = 0:lat0 1:long0
Step.1.19.Var.3.Char.0.Ref = acc_csc_019_ActualDist
Step.1.19.Var.3.Char.0.Value = 999.0
Step.1.19.Var.3.Char.1.Ref = acc_csc_019_SafeDist
Step.1.19.Var.3.Char.1.Value = 52.2516709852869
Step.1.19.Var.3.Char.2.Ref = acc_csc_019_SafeDistViolated
Step.1.19.Var.3.Char.2.Value = 0.0
Step.1.19.Var.3.Char.3.Ref = acc_csc_019_TTC
Step.1.19.Var.3.Char.3.Value = 0.0
Step.1.19.Var.3.Char.4.Ref = acc_csc_019_TTCWarnEver
Step.1.19.Var.3.Char.4.Value = 0.0
Step.1.19.Var.3.Char.5.Ref = acc_csc_019_TTCBadEver
Step.1.19.Var.3.Char.5.Value = 0.0
Step.1.19.Var.3.Char.6.Ref = acc_csc_019_ComfortAx
Step.1.19.Var.3.Char.6.Value = -0.004
Step.1.19.Var.3.Char.7.Ref = acc_csc_019_ComfortAxOutOfBoundEver
Step.1.19.Var.3.Char.7.Value = 0.0
Step.1.19.Var.3.Char.8.Ref = acc_csc_019_EmergencyAx
Step.1.19.Var.3.Char.8.Value = -0.004
Step.1.19.Var.3.Char.9.Ref = acc_csc_019_EmergencyAxOutOfBoundEver
Step.1.19.Var.3.Char.9.Value = 0.0
Step.1.19.Var.3.Char.10.Ref = acc_csc_019_Jerk
Step.1.19.Var.3.Char.10.Value = 0.0
Step.1.19.Var.3.Char.11.Ref = acc_csc_019_JerkOverLimitEver
Step.1.19.Var.3.Char.11.Value = 1.0
Step.1.19.Var.3.Char.12.Ref = acc_csc_019_NoCollDist
Step.1.19.Var.3.Char.12.Value = 999.0
Step.1.19.Var.3.Char.13.Ref = acc_csc_019_NoCollDistViolatedEver
Step.1.19.Var.3.Char.13.Value = 0.0
Step.1.19.Var.3.Char.14.Ref = acc_csc_019_CollisionFlag
Step.1.19.Var.3.Char.14.Value = 0.0
Step.1.19.Var.3.Char.15.Ref = acc_csc_019_ImpactSpeed
Step.1.19.Var.3.Char.15.Value = 0.0
Step.1.19.Var.3.Char.16.Ref = acc_csc_019_CollisionEver
Step.1.19.Var.3.Char.16.Value = 0.0
Step.1.19.Var.3.Crit.0.Ref = acc_csc_019 - Safe Distance Consistency
Step.1.19.Var.3.Crit.0.Result = good
Step.1.19.Var.3.Crit.1.Ref = acc_csc_019 - Time To Collision
Step.1.19.Var.3.Crit.1.Result = good
Step.1.19.Var.3.Crit.2.Ref = acc_csc_019 - Comfort Deceleration Limit
Step.1.19.Var.3.Crit.2.Result = good
Step.1.19.Var.3.Crit.3.Ref = acc_csc_019 - Emergency Deceleration Bound
Step.1.19.Var.3.Crit.3.Result = good
Step.1.19.Var.3.Crit.4.Ref = acc_csc_019 - Jerk Limit
Step.1.19.Var.3.Crit.4.Result = bad
Step.1.19.Var.3.Crit.5.Ref = acc_csc_019 - No Collision Distance
Step.1.19.Var.3.Crit.5.Result = good
Step.1.19.Var.3.Crit.6.Ref = acc_csc_019 - Collision Flag
Step.1.19.Var.3.Crit.6.Result = good
Step.1.19.Var.3.Crit.7.Ref = acc_csc_019 - Impact Speed
Step.1.19.Var.3.Crit.7.Result = good
Step.1.19.Var.4.Name = acc_csc_019_ds005
Step.1.19.Var.4.Param = 30 0 245
Step.1.19.Var.4.Result = bad
Step.1.19.Var.4.ResDate = 1782804372
Step.1.19.Var.4.ResFiles = SimOutput/CPP00372923B/20260630/OSC_Imported_longitudinal_feature_ACC_acc_csc_019_142604.erg
Step.1.19.Var.4.ManLst = 0:lat0 1:long0
Step.1.19.Var.4.Char.0.Ref = acc_csc_019_ActualDist
Step.1.19.Var.4.Char.0.Value = 999.0
Step.1.19.Var.4.Char.1.Ref = acc_csc_019_SafeDist
Step.1.19.Var.4.Char.1.Value = 63.52111544759034
Step.1.19.Var.4.Char.2.Ref = acc_csc_019_SafeDistViolated
Step.1.19.Var.4.Char.2.Value = 0.0
Step.1.19.Var.4.Char.3.Ref = acc_csc_019_TTC
Step.1.19.Var.4.Char.3.Value = 0.0
Step.1.19.Var.4.Char.4.Ref = acc_csc_019_TTCWarnEver
Step.1.19.Var.4.Char.4.Value = 0.0
Step.1.19.Var.4.Char.5.Ref = acc_csc_019_TTCBadEver
Step.1.19.Var.4.Char.5.Value = 0.0
Step.1.19.Var.4.Char.6.Ref = acc_csc_019_ComfortAx
Step.1.19.Var.4.Char.6.Value = -0.004
Step.1.19.Var.4.Char.7.Ref = acc_csc_019_ComfortAxOutOfBoundEver
Step.1.19.Var.4.Char.7.Value = 0.0
Step.1.19.Var.4.Char.8.Ref = acc_csc_019_EmergencyAx
Step.1.19.Var.4.Char.8.Value = -0.004
Step.1.19.Var.4.Char.9.Ref = acc_csc_019_EmergencyAxOutOfBoundEver
Step.1.19.Var.4.Char.9.Value = 0.0
Step.1.19.Var.4.Char.10.Ref = acc_csc_019_Jerk
Step.1.19.Var.4.Char.10.Value = 0.0
Step.1.19.Var.4.Char.11.Ref = acc_csc_019_JerkOverLimitEver
Step.1.19.Var.4.Char.11.Value = 1.0
Step.1.19.Var.4.Char.12.Ref = acc_csc_019_NoCollDist
Step.1.19.Var.4.Char.12.Value = 999.0
Step.1.19.Var.4.Char.13.Ref = acc_csc_019_NoCollDistViolatedEver
Step.1.19.Var.4.Char.13.Value = 0.0
Step.1.19.Var.4.Char.14.Ref = acc_csc_019_CollisionFlag
Step.1.19.Var.4.Char.14.Value = 0.0
Step.1.19.Var.4.Char.15.Ref = acc_csc_019_ImpactSpeed
Step.1.19.Var.4.Char.15.Value = 0.0
Step.1.19.Var.4.Char.16.Ref = acc_csc_019_CollisionEver
Step.1.19.Var.4.Char.16.Value = 0.0
Step.1.19.Var.4.Crit.0.Ref = acc_csc_019 - Safe Distance Consistency
Step.1.19.Var.4.Crit.0.Result = good
Step.1.19.Var.4.Crit.1.Ref = acc_csc_019 - Time To Collision
Step.1.19.Var.4.Crit.1.Result = good
Step.1.19.Var.4.Crit.2.Ref = acc_csc_019 - Comfort Deceleration Limit
Step.1.19.Var.4.Crit.2.Result = good
Step.1.19.Var.4.Crit.3.Ref = acc_csc_019 - Emergency Deceleration Bound
Step.1.19.Var.4.Crit.3.Result = good
Step.1.19.Var.4.Crit.4.Ref = acc_csc_019 - Jerk Limit
Step.1.19.Var.4.Crit.4.Result = bad
Step.1.19.Var.4.Crit.5.Ref = acc_csc_019 - No Collision Distance
Step.1.19.Var.4.Crit.5.Result = good
Step.1.19.Var.4.Crit.6.Ref = acc_csc_019 - Collision Flag
Step.1.19.Var.4.Crit.6.Result = good
Step.1.19.Var.4.Crit.7.Ref = acc_csc_019 - Impact Speed
Step.1.19.Var.4.Crit.7.Result = good
