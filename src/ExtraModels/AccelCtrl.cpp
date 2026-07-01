/*
 *****************************************************************************
 *  CarMaker - Version 15.1
 *  Virtual Test Driving Tool
 *
 *  Copyright ©1998-2026 IPG Automotive GmbH. All rights reserved.
 *  www.ipg-automotive.com
 *****************************************************************************
 */
#include <Global.h>

#if defined(WIN32)
# include <windows.h>
#endif
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <stdbool.h>
#include <math.h>

#include "Log.h"
#include "DrivMan.h"
#include "DataDict.h"
#include "InfoUtils.h"
#include "SimCore.h"
#include "ModelManager.h"
#include "MathUtils.h"

#include "Vehicle/Sensor_Object.h"
#include "Vehicle/Sensor_GroundTruth.h"
#include "Vehicle.h"
#include "VehicleControl.h"
#include "Vehicle/VehicleControlApps.h"

#define NOTSET -99999

#define MDL_PRE "AccelCtrl"

tAccelCtrl AccelCtrl;

static double         c_i;
static tDesrAccelFunc User_DesrAccelFunc = NULL;

static void
AccelCtrl_DeclQuants(void *MP, char const *Ident)
{
    tACC_ECU    *ACC_ECU = &AccelCtrl.ACC_ECU;
    tDDictEntry *e;
    tDDefault   *df;

    if (MP == NULL) {
        return;
    }

    df = DDefaultCreate("AccelCtrl.");

    DDefDouble4(df, "DesiredAx", "m/s^2", &AccelCtrl.DesrAx, DVA_DM);

    e = DDefChar(df, "ACC.IsActive", "", &ACC_ECU->IsActive, DVA_DM);
    DDefStates(e, 2, 0);

    DDefDouble4(df, "ACC.DesiredSpd", "m/s", &ACC_ECU->DesrSpd, DVA_DM);
    DDefDouble4(df, "ACC.DesiredDist", "m", &ACC_ECU->DesrDist, DVA_None);
    DDefDouble4(df, "ACC.DesiredTGap", "s", &ACC_ECU->DesrTGap, DVA_DM);
    DDefDouble4(df, "ACC.DesiredAx", "m/s^2", &ACC_ECU->DesrAx, DVA_DM);
    DDefDouble4(df, "ACC.Time2Collision", "s", &ACC_ECU->Time2Collision, DVA_None);

    DDefaultDelete(df);
}

static void
DesrAccelFunc_ACC(double dt, bool targetDetected, double targetDistance, double targetRelVelocity)
{
    double    ax, ax_sc, delta_ds;
    tACC_ECU *ACC_ECU = &AccelCtrl.ACC_ECU;

    /* Driver Brake Limit */
    if (DrivMan.Brake > ACC_ECU->BrakeThreshold) {
        ACC_ECU->IsActive = 0;
    }

    /* Time until collision */
    if (targetRelVelocity < 0) {
        ACC_ECU->Time2Collision = targetDistance / -targetRelVelocity;
    } else {
        ACC_ECU->Time2Collision = 0;
    }

    if (!ACC_ECU->IsActive) {
        /* ACC off -> set desired speed to current car speed */
        ACC_ECU->DesrSpd = Vehicle.v;
        ACC_ECU->DesrAx  = NOTSET;
        goto SetAccelCtrl;
    }

    /* ACC active */
    if (targetDetected) {
        /* if target detected set desired distance,
       DesrDistance[m] = Target.v[m/s] * 3.6 / Desired Time Gap(Init= 1.8[s])
       or if target stand still DSMIN: 20[m] distance */
        ACC_ECU->DesrDist = M_MAX(((Vehicle.v + targetRelVelocity) * ACC_ECU->DesrTGap), ACC_ECU->dsmin);

        /* Distance Control Algorithm: result = desired ax */
        delta_ds = targetDistance - ACC_ECU->DesrDist; /* d_current - d_desired */
        ax       = (delta_ds) / (ACC_ECU->dc_kd) + targetRelVelocity / ACC_ECU->dc_kv;
        /* ax_sc = desired ax from Speed Control */
        ax_sc = (ACC_ECU->DesrSpd - Vehicle.v) / ACC_ECU->sc_kv;

        /* Limitation */
        if (ax > ax_sc) {
            ax = ax_sc;
        }
        if (ax > ACC_ECU->axmax) {
            ax = ACC_ECU->axmax;
        }
        if (ax < ACC_ECU->axmin) {
            ax = ACC_ECU->axmin;
        }
    } else {
        /* Speed Control Algorithm: result = desired ax */
        ax = (ACC_ECU->DesrSpd - Vehicle.v) / ACC_ECU->sc_kv;
        /* Limitation */
        if (ax > ACC_ECU->axmax) {
            ax = ACC_ECU->axmax;
        }
        if (ax < -0.35) {
            ax = -0.35;
        }
    }

    ACC_ECU->DesrAx = ax;

SetAccelCtrl:
    AccelCtrl.DesrAx = ACC_ECU->DesrAx;
}

static void
DesrAccelFunc_ObjectSensor(double dt)
{
    struct tObjectSensor const *sensor = &ObjectSensor[AccelCtrl.ACC_ECU.RefObjectSensorId];
    DesrAccelFunc_ACC(dt, sensor->Targ_Dtct, sensor->relvTarget.NearPnt.ds_p, sensor->relvTarget.NearPnt.dv_p);
}

static void
DesrAccelFunc_GTSensor(double dt)
{
    tGroundTruthSensor const *sensor         = &GroundTruthSensor[AccelCtrl.ACC_ECU.RefSensorId];
    bool                      targetDetected = sensor->relevantTarget != NULL && sensor->relevantTarget->hasData;
    double                    targetDistance =
        targetDetected ? sensor->relevantTarget->data.trafficObject->nearestPoint.pos_spherical_FrS[0] : 0.0;
    double targetRelVelocity = targetDetected ? sensor->relevantTarget->data.trafficObject->nearestPoint.vel_radial_FrS
                                              : 0.0;
    DesrAccelFunc_ACC(dt, targetDetected, targetDistance, targetRelVelocity);
}

static void
AccelCtrl_Delete(void *MP, char const *Ident)
{
    tAccelCtrl *mp = (tAccelCtrl *) MP;
    memset(mp, 0, sizeof(*mp));
    mp->DesrAx = NOTSET;
}

/**
 * Check that the Ground Truth Sensor is properly configured for ACC use and issue warnings if not.
 * @param gtSensor sensor to check for configuration
 * @param sensorName name of sensor for display in warning messages
 */
static bool
CheckGTSensorConfig(tGroundTruthSensor const *gtSensor, char const *sensorName)
{
    // Check if the GT sensor has Traffic Objects enabled
    if (gtSensor->cfg.trafficSelection == ObjectClassSelect_None) {
        LogWarnF(EC_Init, "%s: Ground Truth Sensor '%s' must have traffic object detection enabled", MDL_PRE,
            sensorName);
        return false;
    }
    // Check that a valid relevant target mode is selected
    if (gtSensor->cfg.relevantTargetMode == GTRlvtTarget_None) {
        LogWarnF(EC_Init, "%s: Ground Truth Sensor '%s' must have target mode set to 'Nearest' or 'Nearest in path'",
            MDL_PRE, sensorName);
        return false;
    }
    return true;
}

static void *
AccelCtrl_New(struct tInfos *Inf, void *pCfg, char const *kindkey, char const *IdKey)
{
    char const *key;
    char        buf[64];
    tACC_ECU   *ACC_ECU = &AccelCtrl.ACC_ECU;
    double      vInit;

    c_i = 0.0;
    AccelCtrl_Delete(&AccelCtrl, NULL);

    /** AccelCtrl */
    key = "AccelCtrl";

    AccelCtrl.p_gain = iGetDblOpt(Inf, strcat(strcpy(buf, key), ".p"), 0.001);
    AccelCtrl.i_gain = iGetDblOpt(Inf, strcat(strcpy(buf, key), ".i"), 1.0);

    /* function pointer for ax-Calculation */
    char const *accelFuncMode = iGetStrOpt(Inf, strcat(strcpy(buf, key), ".DesrAccelFunc"), "ACC");

    bool isSensorRequired = false;
    if (strcmp(accelFuncMode, "ACC") == 0) {
        AccelCtrl.DesrAccelFunc = NULL;   // set later after registering sensor
        isSensorRequired        = true;
    } else if (strcmp(accelFuncMode, "DVA") == 0) {
        AccelCtrl.DesrAccelFunc = NULL;
    } else if (strcmp(accelFuncMode, "User") == 0) {
        if (User_DesrAccelFunc != NULL) {
            AccelCtrl.DesrAccelFunc = User_DesrAccelFunc;
        } else {
            AccelCtrl.DesrAccelFunc = NULL;
        }
    } else {
        LogErrF(EC_Init, "%s: no supported function '%s' for ax calculation", MDL_PRE, accelFuncMode);
        return NULL;
    }

    /** ACC */
    key = "AccelCtrl.ACC";

    /* Active / switched on ? */
    ACC_ECU->IsActive = (char) iGetLongOpt(Inf, strcat(strcpy(buf, key), ".IsActive"), 1);

    /* Limit of driver brake to deactivate ACC */
    ACC_ECU->BrakeThreshold = iGetDblOpt(Inf, strcat(strcpy(buf, key), ".BrakeThreshold"), 0.2);

    /* initial time gap / speed */
    ACC_ECU->DesrTGap = iGetDblOpt(Inf, strcat(strcpy(buf, key), ".DesrTGap"), 1.8);
    vInit             = DrivMan.Cfg.Velocity > 10.0 * kmh2ms ? DrivMan.Cfg.Velocity : 100 * kmh2ms;
    ACC_ECU->DesrSpd  = iGetDblOpt(Inf, strcat(strcpy(buf, key), ".DesrSpd"), vInit);

    /* controller parameters */
    ACC_ECU->dc_kd = iGetDblOpt(Inf, strcat(strcpy(buf, key), ".DistCtrl.kd"), 36.0);
    ACC_ECU->dc_kv = iGetDblOpt(Inf, strcat(strcpy(buf, key), ".DistCtrl.kv"), 2.0);
    ACC_ECU->sc_kv = iGetDblOpt(Inf, strcat(strcpy(buf, key), ".SpdCtrl.kv"), 13.0);

    /* min/max values */
    ACC_ECU->axmin = iGetDblOpt(Inf, strcat(strcpy(buf, key), ".AxMin"), -2.5);
    ACC_ECU->axmax = iGetDblOpt(Inf, strcat(strcpy(buf, key), ".AxMax"), 1.0);
    ACC_ECU->dsmin = iGetDblOpt(Inf, strcat(strcpy(buf, key), ".DistMin"), 20.0);
    /* Name of the reference ObjectSensor */

    if (isSensorRequired) {
        char const *refSensorName       = iGetStrOpt(Inf, strcat(strcpy(buf, key), ".RefSensorName"), "");
        char const *refObjectSensorName = iGetStrOpt(Inf, strcat(strcpy(buf, key), ".RefObjectSensorName"), "");

        if (strlen(refSensorName) > 0) {
            if ((ACC_ECU->RefSensorId = GroundTruthSensor_FindIndexForName(refSensorName)) < 0) {
                LogErrF(EC_Init, "%s: no Ground Truth Sensor found with the name '%s'", MDL_PRE, refSensorName);
                return NULL;
            }
            // Validate the Ground Truth Sensor configuration for ACC use and print warnings for wrong configurations
            if (!CheckGTSensorConfig(&GroundTruthSensor[ACC_ECU->RefSensorId], refSensorName)) {
                LogWarnF(EC_Init, "%s: Invalid sensor configuration, control model functions may not work.", MDL_PRE);
            }
            AccelCtrl.DesrAccelFunc = DesrAccelFunc_GTSensor;
        } else if (strlen(refObjectSensorName) > 0) {
            // No Ground Truth Sensor found, try legacy object sensor
            if ((ACC_ECU->RefObjectSensorId = ObjectSensor_FindIndexForName(refObjectSensorName)) < 0) {
                LogErrF(EC_Init, "%s: no Object Sensor found with the name '%s'", MDL_PRE, refObjectSensorName);
                return NULL;
            }
            AccelCtrl.DesrAccelFunc = DesrAccelFunc_ObjectSensor;
        } else {
            // Throw error for missing reference sensor
            LogErrF(EC_Init,
                "%s: no reference sensor configured; Either a Ground Truth Sensor (RefSensorName) or an Object Sensor (RefObjectSensorName) must be set. ",
                MDL_PRE);
            return NULL;
        }
    }

    else {
        ACC_ECU->RefSensorId       = -1;
        ACC_ECU->RefObjectSensorId = -1;
    }

    return &AccelCtrl;
}

static int
AccelCtrl_Calc(void *MP, void *pIF, void *pIF2, double dt)
{
    double c, delta_ax, c_p;

    if (SimCore.State != SCState_Simulate || AppStartInfo.ModelCheck || AppStartInfo.DriverAdaption) {
        return 0;
    }

    /* Calculate target longitudinal acceleration ax */
    if (AccelCtrl.DesrAccelFunc != NULL) {
        AccelCtrl.DesrAccelFunc(dt);
    }

    /* Controller for converting desired ax to gas or brake */
    if (AccelCtrl.DesrAx == NOTSET) {
        /* no control required */
        c_i = VehicleControl.Gas;
        return 0;
    }

    delta_ax  = AccelCtrl.DesrAx - Vehicle.PoI_Acc_1[0];
    c_p       = AccelCtrl.p_gain * delta_ax;
    c_i      += AccelCtrl.i_gain * delta_ax * dt;
    c         = c_p + c_i; /* PI-Controller */

    /* Limitation */
    if (c > 1) {
        c = 1;
    }
    if (c < -1) {
        c = -1;
    }
    c_i = c - c_p;

    /* Gas or Brake */
    if (c >= 0) {
        VehicleControl.Gas   = c;
        VehicleControl.Brake = 0;
    } else {
        VehicleControl.Gas   = 0;
        VehicleControl.Brake = -c;
    }

    return 0;
}

void
Set_UserDesrAccelFunc(tDesrAccelFunc DesrAccelFunc)
{
    User_DesrAccelFunc = DesrAccelFunc;
}

int
VC_Register_AccelCtrl(void)
{
    tModelClassDescr m;

    memset(&m, 0, sizeof(m));
    m.New        = AccelCtrl_New;
    m.Calc       = AccelCtrl_Calc;
    m.DeclQuants = AccelCtrl_DeclQuants;
    m.Delete     = AccelCtrl_Delete;
    /* Should only be used if the model doesn't read params from extra files */
    m.ParamsChanged = ParamsChanged_IgnoreCheck;

    return Model_RegisterIPG(ModelClass_VehicleControl, "AccelCtrl", &m);
}
