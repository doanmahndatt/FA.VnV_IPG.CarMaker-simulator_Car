/*
*****************************************************************************
*  CarMaker - Version 15.1
*  Virtual Test Driving Tool
*
*  Copyright 1998-2026 IPG Automotive GmbH. All rights reserved.
*  www.ipg-automotive.com
*****************************************************************************
*
*  ADAS_AEB Brake Model — corrected for AEB/Park brake use
*
*  Signal chain (FMU -> CarMaker -> this model):
*    VehicleControl.Brake     → Brake.IF.Pedal → IF->Pedal  (service brake)
*    VehicleControl.BrakePark → Brake.IF.Park  → IF->Park   (parking brake)
*    IF->Trq_WB[i]  → wheel brake torque output [Nm]  (service brake)
*    IF->Trq_PB[i]  → parking brake torque output [Nm] (park/handbrake)
*
*  Configuration (Vehicle infofile):
*    Brake.Kind            = ADAS_AEB
*
*    # Service brake: torque [Nm] per wheel at Pedal = 1.0
*    # Formula: TrqDistrib[i] = M * a_target * r_wheel * weight_factor[i]
*    # Example: M=1800kg, a=9m/s², r=0.315m, 65F/35R distribution:
*    #   FL=FR=1658 Nm,  RL=RR=893 Nm
*    # --> REPLACE with your actual vehicle mass and wheel radius <--
*    Brake.Pedal2Trq       = 1658  1658  893  893
*
*    # Parking brake: torque [Nm] per wheel at BrakePark = 1.0
*    # Typically rear-axle only (mechanical) or all wheels (EPB).
*    # For AEB hold-after-stop, rear-only is sufficient.
*    # Example: ~30% of service brake on rear wheels only:
*    Brake.ParkTrq         = 0  0  268  268
*
*  Verification:
*    After config, run a CCRs test (50 km/h vs stationary).
*    Check MyModel.Trq_FL/FR in DVA — at AEB trigger they must reach
*    Pedal2Trq values. Check Car.ax — must approach -9 m/s².
*
*****************************************************************************
*/

#include <stdlib.h>
#include <string.h>
#include <math.h>

#include "CarMaker.h"
#include "Car/Vehicle_Car.h"
#include "ADAS_AEB.h"

#define NWHEEL 4

static char const ThisModelClass[] = "Brake";
static char const ThisModelKind[]  = "ADAS_AEB";
static int const  ThisVersionId    = 1;

struct tMyModel {
    double TrqDistrib[NWHEEL]; /* Service brake: max torque per wheel [Nm] at Pedal=1 */
    double TrqPark[NWHEEL];    /* Park brake:    max torque per wheel [Nm] at Park=1  */
    double Trq_WB[NWHEEL];     /* Output: service brake torque [Nm] — for monitoring  */
    double Trq_PB[NWHEEL];     /* Output: parking brake torque [Nm] — for monitoring  */
};

/*
* MyModel_New ()
*
* Initialising the model.
* Called once at the beginning of every Test Run.
*/
static void *
MyModel_New(tInfos *Inf, void *pCfgIF, char const *KindKey, char const *IdKey)
{
    tBrakeCfgIF     *CfgIF = (tBrakeCfgIF *) pCfgIF;
    struct tMyModel *mp    = NULL;
    char const      *ModelKind, *key;
    char             MsgPre[64];
    double           dvec[NWHEEL];
    int              i, VersionId = 0;

    sprintf(MsgPre, "%s %s", ThisModelClass, ThisModelKind);

    if (CfgIF->nWheels != NWHEEL) {
        LogErrF(EC_Init, "%s: wheel number mismatch (brake %d, vehicle %d)",
                MsgPre, NWHEEL, CfgIF->nWheels);
        return NULL;
    }

    if ((ModelKind = SimCore_GetKindInfo(Inf, ModelClass_Brake, KindKey,
                                         0, ThisVersionId, &VersionId)) == NULL) {
        return NULL;
    }

    mp = (struct tMyModel *) calloc(1, sizeof(struct tMyModel));

    /* --- Service brake torque distribution [Nm/wheel at Pedal=1.0] --- */
    key = "Brake.Pedal2Trq";
    iGetTable(Inf, key, dvec, NWHEEL, 1, &i);
    if (i != NWHEEL) {
        LogErrF(EC_Init, "%s: Unsupported argument for '%s' (need 4 values: FL FR RL RR)",
                MsgPre, key);
        goto ErrorReturn;
    }
    for (i = 0; i < NWHEEL; i++) {
        mp->TrqDistrib[i] = dvec[i];
    }

    /* --- Parking brake torque distribution [Nm/wheel at Park=1.0] ---
     * BUG FIX: was missing entirely in original template.
     * Default: 0 on all wheels (safe fallback) if key is not in infofile.
     * Set "Brake.ParkTrq = 0 0 268 268" in vehicle infofile for rear EPB. */
    key = "Brake.ParkTrq";
    iGetTable(Inf, key, dvec, NWHEEL, 1, &i);
    if (i != NWHEEL) {
        /* Not a fatal error — warn and use zero (service brake still holds via Pedal) */
        LogWarnF(EC_Init,
                 "%s: '%s' not found or wrong count — parking brake torque set to zero. "
                 "AEB hold-after-stop relies on service brake only.",
                 MsgPre, key);
        for (i = 0; i < NWHEEL; i++) mp->TrqPark[i] = 0.0;
    } else {
        for (i = 0; i < NWHEEL; i++) mp->TrqPark[i] = dvec[i];
    }

    return mp;

ErrorReturn:
    free(mp);
    return NULL;
}

/*
* MyModel_DeclQuants_dyn ()
*
* Register dynamically-allocated model variables in the CarMaker Data
* Dictionary so they appear in DVA, Instruments, and KPI scripts.
*/
static void
MyModel_DeclQuants_dyn(struct tMyModel *mp, int park)
{
    int                    i;
    char                   buf[64];
    static struct tMyModel MyModel_Dummy = {{0}};
    if (park) {
        mp = &MyModel_Dummy;
    }

    for (i = 0; i < NWHEEL; i++) {
        /* Service brake torque per wheel */
        sprintf(buf, "MyModel.Trq_%s", Vehicle_TireNo_Str(i));
        DDefDouble4(NULL, buf, "Nm", &mp->Trq_WB[i], DVA_None);

        /* Parking brake torque per wheel — BUG FIX: was not declared */
        sprintf(buf, "MyModel.TrqPB_%s", Vehicle_TireNo_Str(i));
        DDefDouble4(NULL, buf, "Nm", &mp->Trq_PB[i], DVA_None);
    }
}

static void
MyModel_DeclQuants(void *MP, char const *Ident)
{
    struct tMyModel *mp = (struct tMyModel *) MP;
    if (mp == NULL) {
        /* Static (non-dynamically-allocated) dict entries go here */
    } else {
        MyModel_DeclQuants_dyn(mp, 0);
    }
}

/*
* MyModel_Calc ()
*
* Called every simulation cycle.
*
* Inputs  (from CarMaker / FMU via VehicleControl.*):
*   IF->Pedal   0..1  from VehicleControl.Brake     (FMU State 0-2: 0 or 1)
*   IF->Park    0..1  from VehicleControl.BrakePark  (FMU State 3: 1)
*
* Outputs (to CarMaker wheel/tire models):
*   IF->Trq_WB[i]   wheel brake torque  [Nm]  — service brake
*   IF->Trq_PB[i]   parking brake torque[Nm]  — handbrake / EPB
*
* NOTE on pIF2: CarMaker 15.1 passes a secondary interface pointer here.
* It is not used in this simple linear model (no hydraulics, no ESC).
*/
static int
MyModel_Calc(void *MP, void *pIF, void *pIF2, double dt)
{
    tBrakeIF        *IF = (tBrakeIF *) pIF;
    struct tMyModel *mp = (struct tMyModel *) MP;
    int              i;

    for (i = 0; i < NWHEEL; i++) {
        /* Service brake: linear Pedal [0..1] → torque [Nm]
         * Pedal = 1.0 when FMU is in AEB BRAKE or PARKED state. */
        mp->Trq_WB[i] = mp->TrqDistrib[i] * IF->Pedal;
        IF->Trq_WB[i] = mp->Trq_WB[i];

        /* Parking brake: linear Park [0..1] → torque [Nm]
         * BUG FIX: was not implemented in original template.
         * Park = 1.0 when FMU is in PARKED state (VehicleControl.BrakePark=1).
         * IF->Trq_PB is a separate actuator channel from IF->Trq_WB. */
        mp->Trq_PB[i] = mp->TrqPark[i] * IF->Park;
        IF->Trq_PB[i] = mp->Trq_PB[i];
    }

    return 0;
}

/*
* MyModel_Delete ()
*
* Called at the end of every Test Run.
*/
static void
MyModel_Delete(void *MP, char const *Ident)
{
    struct tMyModel *mp = (struct tMyModel *) MP;
    MyModel_DeclQuants_dyn(mp, 1); /* park dict entries before free */
    free(mp);
}

/*
* Brake_Register_ADAS_AEB ()
*
* Call this from User_Register() in User.c.
* Add declaration to User.h:
*   int Brake_Register_ADAS_AEB (void);
*/
int
Brake_Register_ADAS_AEB(void)
{
    tModelClassDescr mp;

    memset(&mp, 0, sizeof(mp));
    mp.New           = MyModel_New;
    mp.Calc          = MyModel_Calc;
    mp.Delete        = MyModel_Delete;
    mp.DeclQuants    = MyModel_DeclQuants;
    mp.VersionId     = ThisVersionId;
    mp.ParamsChanged = ParamsChanged_IgnoreCheck;

    return Model_Register(ModelClass_Brake, ThisModelKind, &mp);
}
