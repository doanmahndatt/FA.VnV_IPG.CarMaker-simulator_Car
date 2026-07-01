/*
 * CM_ACCController_V17_CutOutEdgeResume.c
 * FMI 2.0 Co-Simulation ACC controller for IPG CarMaker 15.1 / Windows x64.
 *
 * Purpose:
 * - Fix the root cause that CarMaker Camera/Radar object indices are generic detection-list indices,
 *   not lead-lane indices. Obj0 is NOT necessarily the lead object.
 * - Build a deterministic LeadObjTracker inside the ACC FMU:
 *     scan Camera.Obj0..Obj5 and Radar.Obj0..Obj5
 *     apply front + lateral lane gate + type/confidence/probability validity
 *     match camera/radar candidates by geometry
 *     select nearest same-lane fused object as LeadObj
 * - ACC follows ONLY selected LeadObj. If no same-lane LeadObj exists, ACC is SPEED_CONTROL.
 * - Cut-in: speed control until a same-lane LeadObj is confirmed.
 * - Cut-out: detected by Fusion.Active falling edge 1->0. CutOutRelease is latched
 *   until Ego reaches the latched scenario set speed, not just a one-shot event.
 */
#if defined(_WIN32)
#define FMI_EXPORT __declspec(dllexport)
#else
#define FMI_EXPORT __attribute__((visibility("default")))
#endif
#ifndef NULL
#define NULL ((void*)0)
#endif
typedef unsigned long long size_t;
typedef void* fmi2Component; typedef void* fmi2ComponentEnvironment; typedef void* fmi2FMUstate;
typedef const char* fmi2String; typedef double fmi2Real; typedef int fmi2Integer; typedef int fmi2Boolean; typedef char fmi2Byte; typedef unsigned int fmi2ValueReference;
#if defined(_WIN32)
int _fltused = 0; typedef void* HINSTANCE; typedef unsigned long DWORD; typedef void* LPVOID; int __stdcall DllMain(HINSTANCE h,DWORD r,LPVOID p){(void)h;(void)r;(void)p;return 1;}
#endif
typedef enum { fmi2OK=0, fmi2Warning=1, fmi2Discard=2, fmi2Error=3, fmi2Fatal=4, fmi2Pending=5 } fmi2Status;
typedef enum { fmi2ModelExchange=0, fmi2CoSimulation=1 } fmi2Type;
typedef enum { fmi2DoStepStatus=0, fmi2PendingStatus=1, fmi2LastSuccessfulTime=2, fmi2Terminated=3 } fmi2StatusKind;
typedef void (*fmi2CallbackLogger)(fmi2ComponentEnvironment, fmi2String, fmi2Status, fmi2String, fmi2String, ...);
typedef void* (*fmi2CallbackAllocateMemory)(size_t, size_t); typedef void (*fmi2CallbackFreeMemory)(void*); typedef void (*fmi2StepFinished)(fmi2ComponentEnvironment, fmi2Status);
typedef struct { fmi2CallbackLogger logger; fmi2CallbackAllocateMemory allocateMemory; fmi2CallbackFreeMemory freeMemory; fmi2StepFinished stepFinished; fmi2ComponentEnvironment componentEnvironment; } fmi2CallbackFunctions;

#define MAX_VR 5000
#define NOBJ 6
#define NOTSET_AX (-99999.0)

#define VR_EGO_V 0
#define VR_SET_SPEED_KPH 1
#define VR_ACC_ENABLE 2
#define VR_CAM_NOBJ 10

#define VR_TIME_GAP 60
#define VR_MIN_DIST 61
#define VR_LANE_GATE_Y 62
#define VR_MAX_RANGE 63
#define VR_MAX_AX 64
#define VR_MIN_AX 65
#define VR_EMERGENCY_AX 66
#define VR_KP_SPEED 67
#define VR_KP_GAP 68
#define VR_KD_REL_SPEED 69
#define VR_JERK_LIMIT 70
#define VR_TTC_WARNING 71
#define VR_TTC_EMERGENCY 72
#define VR_KGAP_SPEED 73
#define VR_KP_FOLLOW_SPEED 74
#define VR_FOLLOW_RELEASE_GAP 75
#define VR_STOP_GUARD_DIST 76
#define VR_BRAKE_HOLD_AX 77
#define VR_WARNING_AX 78
#define VR_ALLOW_ACCEL_FOLLOW 79
#define VR_BRAKE_HOLD_TIME 80
#define VR_DIST_JUMP_THRESHOLD 81
#define VR_VREL_EST_ENABLE 82
#define VR_RADAR_ONLY_ENABLE 83
#define VR_TIMEGAP_LEVEL 84
#define VR_FOLLOW_MAX_DIST 85
#define VR_IGNORE_STAT_ABOVE_KPH 86
#define VR_DYNAMIC_STOP_TIME 87
#define VR_LOW_SPEED_HOLD_AX 88
#define VR_CAM_FORWARD_AXIS 89
#define VR_CAM_LATERAL_AXIS 90
#define VR_CAM_MIN_CONF 91
#define VR_CAM_REQUIRE_FACING 92
#define VR_CAM_ALLOW_UNKNOWN 93
#define VR_FUSION_DIST_TOL 94
#define VR_FUSION_LAT_TOL 95
#define VR_CAMERA_ONLY_ENABLE 96
#define VR_PROBEXIST_MIN 97
#define VR_FUSION_REQUIRE_BOTH 98
#define VR_MEASSTAT_VALID_VALUE 99
#define VR_BRAKE_ONLY_ENABLE 107
#define VR_SPEED_TOL_KPH_STRAIGHT 108
#define VR_REQUIRE_CAMERA_LANE 109
#define VR_EGO_LANE_VALUE 110
#define VR_CAMERA_LANE_TOL 111
#define VR_LEAD_CONFIRM_TIME 112
#define VR_CUTOUT_RELEASE_DELAY 113
#define VR_LEAD_SWITCH_TIME 114
#define VR_LEAD_SCORE_LAT_W 115
#define VR_LEAD_SCORE_DX_W 116
#define VR_LEAD_SCORE_MATCH_W 117

#define CAM_BASE 1000
#define CAM_STRIDE 10
#define CAM_OBJID(i) (CAM_BASE+(i)*CAM_STRIDE+0)
#define CAM_TYPE(i)  (CAM_BASE+(i)*CAM_STRIDE+1)
#define CAM_CONF(i)  (CAM_BASE+(i)*CAM_STRIDE+2)
#define CAM_FACING(i)(CAM_BASE+(i)*CAM_STRIDE+3)
#define CAM_BLX(i)   (CAM_BASE+(i)*CAM_STRIDE+4)
#define CAM_BLY(i)   (CAM_BASE+(i)*CAM_STRIDE+5)
#define CAM_BLZ(i)   (CAM_BASE+(i)*CAM_STRIDE+6)
#define CAM_TRX(i)   (CAM_BASE+(i)*CAM_STRIDE+7)
#define CAM_TRY(i)   (CAM_BASE+(i)*CAM_STRIDE+8)
#define CAM_TRZ(i)   (CAM_BASE+(i)*CAM_STRIDE+9)

#define RAD_BASE 2000
#define RAD_STRIDE 7
#define RAD_MEAS(i)  (RAD_BASE+(i)*RAD_STRIDE+0)
#define RAD_OBJID(i) (RAD_BASE+(i)*RAD_STRIDE+1)
#define RAD_DISTX(i) (RAD_BASE+(i)*RAD_STRIDE+2)
#define RAD_DISTY(i) (RAD_BASE+(i)*RAD_STRIDE+3)
#define RAD_VRELX(i) (RAD_BASE+(i)*RAD_STRIDE+4)
#define RAD_PROB(i)  (RAD_BASE+(i)*RAD_STRIDE+5)
#define RAD_DYN(i)   (RAD_BASE+(i)*RAD_STRIDE+6)

#define VR_OUT_ACCELCTRL_DESIRED_AX 3000
#define VR_OUT_ACC_DESIRED_AX 3001
#define VR_OUT_ACC_DESIRED_DIST 3002
#define VR_OUT_ACC_DESIRED_SPD 3003
#define VR_OUT_ACC_DESIRED_TGAP 3004
#define VR_OUT_ACC_IS_ACTIVE 3005
#define VR_OUT_ACC_TTC 3006
#define VR_OUT_TARGET_VALID 3020
#define VR_OUT_TARGET_SOURCE 3021
#define VR_OUT_TARGET_DISTX 3022
#define VR_OUT_TARGET_DISTY 3023
#define VR_OUT_TARGET_VRELX 3024
#define VR_OUT_SAFE_DIST 3025
#define VR_OUT_GAP_ERROR 3026
#define VR_OUT_RAW_AX 3027
#define VR_OUT_MODE 3028
#define VR_OUT_REASON 3029
#define VR_OUT_LEAD_SPEED 3030
#define VR_OUT_FOLLOW_TARGET_SPEED 3031
#define VR_OUT_VREL_EST 3032
#define VR_OUT_BRAKE_HOLD 3033
#define VR_OUT_LAST_VALID_DISTX 3034
#define VR_OUT_DISTX_INVALID 3035
#define VR_OUT_HAZARD_LATCHED 3036
#define VR_OUT_CAMERA_CANDIDATE 3038
#define VR_OUT_RADAR_CANDIDATE 3039
#define VR_OUT_EFFECTIVE_STOP_GUARD 3040
#define VR_OUT_CAMERA_DISTX 3041
#define VR_OUT_CAMERA_DISTY 3042
#define VR_OUT_FUSION_ACTIVE 3043
#define VR_OUT_FUSION_MATCH 3044
#define VR_OUT_SPEC_STATE 3045
#define VR_OUT_BRAKE_ONLY_ACTIVE 3046
#define VR_OUT_EFFECTIVE_TGAP 3047
#define VR_OUT_LEAD_CAM_INDEX 3050
#define VR_OUT_LEAD_RADAR_INDEX 3051
#define VR_OUT_LEAD_CONFIDENCE 3052
#define VR_OUT_LEAD_CANDIDATE_COUNT 3053
#define VR_OUT_CUTIN_PENDING 3054
#define VR_OUT_CUTOUT_RELEASE 3055

#define SRC_NONE 0.0
#define SRC_CAMERA 1.0
#define SRC_RADAR 2.0
#define SRC_FUSED 3.0
#define SRC_HOLD 5.0
#define MODE_OFF 0.0
#define MODE_SPEED 1.0
#define MODE_FOLLOW 2.0
#define MODE_WARNING 3.0
#define MODE_EMERGENCY 4.0
#define MODE_BRAKE_HOLD 5.0
#define SPEC_OFF 0.0
#define SPEC_ACTIVE 4.0
#define SPEC_STANDACTIVE 5.0
#define SPEC_BRAKE_ONLY 8.0

typedef struct {
    double valid, dx, dy, vrel, objid, type, conf, score;
    int idx;
} Cand;

typedef struct {
    fmi2Real r[MAX_VR];
    fmi2Real prev_ax, prev_distx, last_distx, last_disty, last_vrelx, last_lead_speed, last_gap_error;
    fmi2Real lead_confirm_timer, cutout_timer, switch_timer;
    /* V17 state fixes: CutOutRelease is based on Fusion.Active falling edge and is latched
       through the RESUME_SET_SPEED phase. cruise_set_speed_kph is the original scenario/ACC
       set speed; it is never overwritten by LeadSpeed/FollowTargetSpeed. */
    fmi2Real prev_fusion_active, cutout_resume_active, cruise_set_speed_kph;
    int lead_active, current_cam_idx, current_rad_idx;
    fmi2Boolean instantiated;
} ACC;
static ACC g;
void* memcpy(void* d,const void* s,size_t n){char*dd=(char*)d;const char*ss=(const char*)s;size_t i;for(i=0;i<n;i++)dd[i]=ss[i];return d;}
void __chkstk(void){}

static fmi2Real maxr(fmi2Real a,fmi2Real b){return a>b?a:b;} static fmi2Real minr(fmi2Real a,fmi2Real b){return a<b?a:b;} static fmi2Real absr(fmi2Real a){return a<0?-a:a;} static fmi2Real clamp(fmi2Real x,fmi2Real lo,fmi2Real hi){return maxr(lo,minr(hi,x));}
static fmi2Real finite_or(fmi2Real x,fmi2Real fb){return (x==x)?x:fb;} static fmi2Real rate_limit(fmi2Real prev,fmi2Real target,fmi2Real dt,fmi2Real rate){fmi2Real step=maxr(0,rate)*maxr(dt,1e-6); return clamp(target,prev-step,prev+step);} 
static int dist_valid(fmi2Real dx,fmi2Real range){ return dx>0.15 && dx<range && dx<900.0; }
static void setout(ACC* c,int vr,fmi2Real v){ if(vr>=0 && vr<MAX_VR)c->r[vr]=v; }
static fmi2Real camcoord(ACC*c,int i,int axis,int is_tr){ if(axis==0)return is_tr?c->r[CAM_TRX(i)]:c->r[CAM_BLX(i)]; if(axis==1)return is_tr?c->r[CAM_TRY(i)]:c->r[CAM_BLY(i)]; return is_tr?c->r[CAM_TRZ(i)]:c->r[CAM_BLZ(i)]; }
static fmi2Real min_positive(fmi2Real a,fmi2Real b){ int av=a>0.15&&a<900.0; int bv=b>0.15&&b<900.0; if(av&&bv)return minr(a,b); if(av)return a; if(bv)return b; return 999.0; }
static fmi2Real cam_dx(ACC*c,int i){ int ax=(int)(c->r[VR_CAM_FORWARD_AXIS]+0.5); return min_positive(camcoord(c,i,ax,0),camcoord(c,i,ax,1)); }
static fmi2Real cam_dy(ACC*c,int i){ int ay=(int)(c->r[VR_CAM_LATERAL_AXIS]+0.5); return 0.5*(camcoord(c,i,ay,0)+camcoord(c,i,ay,1)); }
static int camera_type_ok(ACC*c,int i){ int t=(int)(c->r[CAM_TYPE(i)]+0.5); if(c->r[CAM_TYPE(i)]<0) return c->r[VR_CAM_ALLOW_UNKNOWN]>=0.5; if(t==0||t==1||t==2||t==3||t==4||t==5||t==8||t==9||t==10||t==11||t==12) return 1; if(t==6||t<0) return c->r[VR_CAM_ALLOW_UNKNOWN]>=0.5; return c->r[VR_CAM_ALLOW_UNKNOWN]>=0.5; }
static int camera_lane_ok(ACC*c,int i){ (void)i; if(c->r[VR_REQUIRE_CAMERA_LANE]<0.5) return 1; return 0; /* CarMaker camera object list has no lane signal. Keep disabled unless a preprocessor maps lane externally in a future model. */ }
static int camera_obj_valid(ACC*c,int i,fmi2Real dx,fmi2Real dy,fmi2Real lane,fmi2Real range){ int n=(int)(c->r[VR_CAM_NOBJ]+0.5); if(i>=n) return 0; if(!dist_valid(dx,range)) return 0; if(absr(dy)>lane) return 0; if(c->r[CAM_CONF(i)]<c->r[VR_CAM_MIN_CONF]) return 0; if(c->r[VR_CAM_REQUIRE_FACING]>=0.5 && c->r[CAM_FACING(i)]<0.5) return 0; if(!camera_type_ok(c,i)) return 0; if(!camera_lane_ok(c,i)) return 0; return 1; }
static int radar_obj_valid(ACC*c,int i,fmi2Real lane,fmi2Real range){ int meas=(int)(c->r[RAD_MEAS(i)]+0.5); int want=(int)(c->r[VR_MEASSTAT_VALID_VALUE]+0.5); return meas==want && dist_valid(c->r[RAD_DISTX(i)],range) && absr(c->r[RAD_DISTY(i)])<=lane && c->r[RAD_PROB(i)]>=c->r[VR_PROBEXIST_MIN]; }
static fmi2Real tgap_from_level(ACC*c){ int lvl=(int)(c->r[VR_TIMEGAP_LEVEL]+0.5); if(lvl==1)return 1.0; if(lvl==2)return 1.5; if(lvl==3)return 1.9; if(lvl==4)return 2.3; return clamp(c->r[VR_TIME_GAP],0.8,2.8); }
static fmi2Real effective_tgap(ACC*c,fmi2Real v){ fmi2Real base=tgap_from_level(c); if(v>=33.0)return maxr(base,2.2); if(v>=22.0)return maxr(base,2.0); if(v>=8.0)return maxr(base,1.5); return maxr(base,1.0); }
static void clear_lead_memory(ACC*c){ c->last_distx=999; c->last_disty=0; c->last_vrelx=0; c->last_lead_speed=0; c->last_gap_error=999; c->prev_distx=999; c->lead_active=0; c->current_cam_idx=-1; c->current_rad_idx=-1; c->lead_confirm_timer=0; c->cutout_timer=0; c->switch_timer=0; }
static int current_lead_lateral_cutout(ACC*c,fmi2Real lane){ int bad=0; if(!c->lead_active)return 0; if(c->current_cam_idx>=0&&c->current_cam_idx<NOBJ) bad = bad || absr(cam_dy(c,c->current_cam_idx))>lane; if(c->current_rad_idx>=0&&c->current_rad_idx<NOBJ) bad = bad || absr(c->r[RAD_DISTY(c->current_rad_idx)])>lane; return bad || absr(c->last_disty)>lane; }
static void defaults(ACC*c){ int i; for(i=0;i<MAX_VR;i++)c->r[i]=0; c->r[VR_ACC_ENABLE]=1; c->r[VR_SET_SPEED_KPH]=90; c->r[VR_CAM_NOBJ]=0; c->r[VR_TIME_GAP]=2.3; c->r[VR_MIN_DIST]=10.0; c->r[VR_LANE_GATE_Y]=0.85; c->r[VR_MAX_RANGE]=220; c->r[VR_MAX_AX]=2.8; c->r[VR_MIN_AX]=-3.0; c->r[VR_EMERGENCY_AX]=-6.0; c->r[VR_KP_SPEED]=0.80; c->r[VR_KP_GAP]=0.06; c->r[VR_KD_REL_SPEED]=1.60; c->r[VR_JERK_LIMIT]=4.0; c->r[VR_TTC_WARNING]=11.0; c->r[VR_TTC_EMERGENCY]=3.5; c->r[VR_KGAP_SPEED]=0.010; c->r[VR_KP_FOLLOW_SPEED]=0.24; c->r[VR_FOLLOW_RELEASE_GAP]=8.0; c->r[VR_STOP_GUARD_DIST]=18; c->r[VR_BRAKE_HOLD_AX]=-1.0; c->r[VR_WARNING_AX]=-1.6; c->r[VR_ALLOW_ACCEL_FOLLOW]=0; c->r[VR_BRAKE_HOLD_TIME]=0.0; c->r[VR_DIST_JUMP_THRESHOLD]=50; c->r[VR_VREL_EST_ENABLE]=1; c->r[VR_RADAR_ONLY_ENABLE]=0; c->r[VR_TIMEGAP_LEVEL]=4; c->r[VR_FOLLOW_MAX_DIST]=120; c->r[VR_IGNORE_STAT_ABOVE_KPH]=60; c->r[VR_DYNAMIC_STOP_TIME]=2.7; c->r[VR_LOW_SPEED_HOLD_AX]=-1.0; c->r[VR_CAM_FORWARD_AXIS]=0; c->r[VR_CAM_LATERAL_AXIS]=1; c->r[VR_CAM_MIN_CONF]=0.0; c->r[VR_CAM_REQUIRE_FACING]=0; c->r[VR_CAM_ALLOW_UNKNOWN]=1; c->r[VR_FUSION_DIST_TOL]=6.5; c->r[VR_FUSION_LAT_TOL]=0.45; c->r[VR_CAMERA_ONLY_ENABLE]=0; c->r[VR_PROBEXIST_MIN]=2.0; c->r[VR_FUSION_REQUIRE_BOTH]=1; c->r[VR_MEASSTAT_VALID_VALUE]=3; c->r[VR_BRAKE_ONLY_ENABLE]=1; c->r[VR_SPEED_TOL_KPH_STRAIGHT]=1.0; c->r[VR_REQUIRE_CAMERA_LANE]=0; c->r[VR_EGO_LANE_VALUE]=0; c->r[VR_CAMERA_LANE_TOL]=0.1; c->r[VR_LEAD_CONFIRM_TIME]=0.0; c->r[VR_CUTOUT_RELEASE_DELAY]=0.0; c->r[VR_LEAD_SWITCH_TIME]=0.0; c->r[VR_LEAD_SCORE_LAT_W]=2.0; c->r[VR_LEAD_SCORE_DX_W]=1.0; c->r[VR_LEAD_SCORE_MATCH_W]=4.0; for(i=0;i<NOBJ;i++){ c->r[CAM_OBJID(i)]=-1; c->r[CAM_TYPE(i)]=-1; c->r[CAM_CONF(i)]=1; c->r[CAM_FACING(i)]=1; c->r[CAM_BLX(i)]=999; c->r[CAM_BLY(i)]=0; c->r[CAM_BLZ(i)]=999; c->r[CAM_TRX(i)]=999; c->r[CAM_TRY(i)]=0; c->r[CAM_TRZ(i)]=999; c->r[RAD_MEAS(i)]=0; c->r[RAD_OBJID(i)]=-1; c->r[RAD_DISTX(i)]=999; c->r[RAD_DISTY(i)]=0; c->r[RAD_VRELX(i)]=0; c->r[RAD_PROB(i)]=0; c->r[RAD_DYN(i)]=0; } c->prev_ax=0; c->prev_distx=999; c->last_distx=999; c->last_disty=0; c->last_vrelx=0; c->last_lead_speed=0; c->last_gap_error=999; c->lead_confirm_timer=0; c->cutout_timer=0; c->switch_timer=0; c->prev_fusion_active=0; c->cutout_resume_active=0; c->cruise_set_speed_kph=0; c->lead_active=0; c->current_cam_idx=-1; c->current_rad_idx=-1; setout(c,VR_OUT_ACCELCTRL_DESIRED_AX,0); setout(c,VR_OUT_ACC_TTC,999); setout(c,VR_OUT_TARGET_DISTX,999); setout(c,VR_OUT_LAST_VALID_DISTX,999); }
static void write_outputs(ACC*c,fmi2Real valid,fmi2Real src,fmi2Real dx,fmi2Real dy,fmi2Real vr,fmi2Real safe,fmi2Real gap,fmi2Real raw,fmi2Real ax,fmi2Real mode,fmi2Real reason,fmi2Real ttc,fmi2Real leadv,fmi2Real followv,fmi2Real vrest,fmi2Real brakehold,fmi2Real distinvalid,fmi2Real hazard,fmi2Real camcand,fmi2Real radcand,fmi2Real effstop,fmi2Real camdx,fmi2Real camdy,fmi2Real fused,fmi2Real match,fmi2Real specstate,fmi2Real brakeonly,fmi2Real efftgap,fmi2Real camidx,fmi2Real radidx,fmi2Real conf,fmi2Real candcnt,fmi2Real cutin_pending,fmi2Real cutout_rel){ setout(c,VR_OUT_ACCELCTRL_DESIRED_AX,ax); setout(c,VR_OUT_ACC_DESIRED_AX,ax==NOTSET_AX?0:ax); setout(c,VR_OUT_ACC_DESIRED_DIST,safe); setout(c,VR_OUT_ACC_DESIRED_SPD,followv); setout(c,VR_OUT_ACC_DESIRED_TGAP,efftgap); setout(c,VR_OUT_ACC_IS_ACTIVE,(mode>0&&mode!=MODE_OFF)?1:0); setout(c,VR_OUT_ACC_TTC,ttc); setout(c,VR_OUT_TARGET_VALID,valid); setout(c,VR_OUT_TARGET_SOURCE,src); setout(c,VR_OUT_TARGET_DISTX,dx); setout(c,VR_OUT_TARGET_DISTY,dy); setout(c,VR_OUT_TARGET_VRELX,vr); setout(c,VR_OUT_SAFE_DIST,safe); setout(c,VR_OUT_GAP_ERROR,gap); setout(c,VR_OUT_RAW_AX,raw); setout(c,VR_OUT_MODE,mode); setout(c,VR_OUT_REASON,reason); setout(c,VR_OUT_LEAD_SPEED,leadv); setout(c,VR_OUT_FOLLOW_TARGET_SPEED,followv); setout(c,VR_OUT_VREL_EST,vrest); setout(c,VR_OUT_BRAKE_HOLD,brakehold); setout(c,VR_OUT_LAST_VALID_DISTX,c->last_distx); setout(c,VR_OUT_DISTX_INVALID,distinvalid); setout(c,VR_OUT_HAZARD_LATCHED,hazard); setout(c,VR_OUT_CAMERA_CANDIDATE,camcand); setout(c,VR_OUT_RADAR_CANDIDATE,radcand); setout(c,VR_OUT_EFFECTIVE_STOP_GUARD,effstop); setout(c,VR_OUT_CAMERA_DISTX,camdx); setout(c,VR_OUT_CAMERA_DISTY,camdy); setout(c,VR_OUT_FUSION_ACTIVE,fused); setout(c,VR_OUT_FUSION_MATCH,match); setout(c,VR_OUT_SPEC_STATE,specstate); setout(c,VR_OUT_BRAKE_ONLY_ACTIVE,brakeonly); setout(c,VR_OUT_EFFECTIVE_TGAP,efftgap); setout(c,VR_OUT_LEAD_CAM_INDEX,camidx); setout(c,VR_OUT_LEAD_RADAR_INDEX,radidx); setout(c,VR_OUT_LEAD_CONFIDENCE,conf); setout(c,VR_OUT_LEAD_CANDIDATE_COUNT,candcnt); setout(c,VR_OUT_CUTIN_PENDING,cutin_pending); setout(c,VR_OUT_CUTOUT_RELEASE,cutout_rel); }
static int select_lead(ACC*c,Cand* cam,Cand* rad,Cand* out,fmi2Real lane,fmi2Real range,fmi2Real* camcnt,fmi2Real* radcnt,fmi2Real* match){ int i,j; Cand best; best.valid=0; best.score=1e9; best.idx=-1; *camcnt=0; *radcnt=0; *match=0; Cand cams[NOBJ]; Cand rads[NOBJ]; int nc=0,nr=0; for(i=0;i<NOBJ;i++){ fmi2Real dx=cam_dx(c,i), dy=cam_dy(c,i); if(camera_obj_valid(c,i,dx,dy,lane,range)){ cams[nc].valid=1; cams[nc].dx=dx; cams[nc].dy=dy; cams[nc].vrel=0; cams[nc].objid=c->r[CAM_OBJID(i)]; cams[nc].type=c->r[CAM_TYPE(i)]; cams[nc].conf=c->r[CAM_CONF(i)]; cams[nc].idx=i; cams[nc].score=c->r[VR_LEAD_SCORE_DX_W]*dx + c->r[VR_LEAD_SCORE_LAT_W]*absr(dy); nc++; } }
    for(i=0;i<NOBJ;i++){ if(radar_obj_valid(c,i,lane,range)){ rads[nr].valid=1; rads[nr].dx=c->r[RAD_DISTX(i)]; rads[nr].dy=c->r[RAD_DISTY(i)]; rads[nr].vrel=c->r[RAD_VRELX(i)]; rads[nr].objid=c->r[RAD_OBJID(i)]; rads[nr].type=0; rads[nr].conf=c->r[RAD_PROB(i)]; rads[nr].idx=i; rads[nr].score=c->r[VR_LEAD_SCORE_DX_W]*rads[nr].dx + c->r[VR_LEAD_SCORE_LAT_W]*absr(rads[nr].dy); nr++; } }
    *camcnt=(fmi2Real)nc; *radcnt=(fmi2Real)nr;
    if(c->r[VR_FUSION_REQUIRE_BOTH]>=0.5){ for(i=0;i<nc;i++){ for(j=0;j<nr;j++){ fmi2Real dd=absr(cams[i].dx-rads[j].dx); fmi2Real dl=absr(cams[i].dy-rads[j].dy); if(dd<=c->r[VR_FUSION_DIST_TOL] && dl<=c->r[VR_FUSION_LAT_TOL]){ fmi2Real score=0.65*rads[j].dx + 0.35*cams[i].dx + c->r[VR_LEAD_SCORE_LAT_W]*absr(0.5*(cams[i].dy+rads[j].dy)) + c->r[VR_LEAD_SCORE_MATCH_W]*(dd+dl); if(score<best.score){ best.valid=1; best.idx=0; best.score=score; best.dx=0.75*rads[j].dx+0.25*cams[i].dx; best.dy=0.5*(rads[j].dy+cams[i].dy); best.vrel=rads[j].vrel; best.objid=cams[i].objid; best.type=cams[i].type; best.conf=minr(cams[i].conf,rads[j].conf); cam->idx=cams[i].idx; rad->idx=rads[j].idx; cam->dx=cams[i].dx; cam->dy=cams[i].dy; rad->dx=rads[j].dx; rad->dy=rads[j].dy; } } } } if(best.valid){ *out=best; *match=1; return 1; } return 0; }
    if(c->r[VR_CAMERA_ONLY_ENABLE]>=0.5 && nc>0){ int bi=0; for(i=1;i<nc;i++) if(cams[i].score<cams[bi].score) bi=i; *out=cams[bi]; cam->idx=cams[bi].idx; rad->idx=-1; *match=0; return 1; }
    if(c->r[VR_RADAR_ONLY_ENABLE]>=0.5 && nr>0){ int bi=0; for(i=1;i<nr;i++) if(rads[i].score<rads[bi].score) bi=i; *out=rads[bi]; out->vrel=rads[bi].vrel; rad->idx=rads[bi].idx; cam->idx=-1; *match=0; return 1; }
    return 0; }
static void controller_step(ACC*c,fmi2Real dt){
    dt=clamp(dt,0.001,0.2);
    fmi2Real ego=maxr(0,finite_or(c->r[VR_EGO_V],0));
    fmi2Real input_set_kph=clamp(finite_or(c->r[VR_SET_SPEED_KPH],90),20,150);
    int acc_on = c->r[VR_ACC_ENABLE]>=0.5;

    /* Latch the scenario/driver set speed. The ACC set speed is distinct from follow speed. */
    if(!acc_on){
        c->prev_fusion_active=0; c->cutout_resume_active=0; c->cruise_set_speed_kph=0; clear_lead_memory(c);
    }
    if(acc_on && c->cruise_set_speed_kph < 20.0) c->cruise_set_speed_kph=input_set_kph;
    if(acc_on && !c->lead_active && c->cutout_resume_active<0.5) c->cruise_set_speed_kph=input_set_kph;
    fmi2Real set_kph = c->cruise_set_speed_kph>=20.0 ? c->cruise_set_speed_kph : input_set_kph;
    fmi2Real setv=set_kph/3.6;

    fmi2Real lane=clamp(c->r[VR_LANE_GATE_Y],0.25,6.0);
    fmi2Real range=clamp(c->r[VR_MAX_RANGE],30,500);
    fmi2Real follow_max=clamp(c->r[VR_FOLLOW_MAX_DIST],30,200);
    fmi2Real tau=effective_tgap(c,ego);
    fmi2Real safe=maxr(clamp(c->r[VR_MIN_DIST],1,30),tau*ego);
    fmi2Real maxax=clamp(c->r[VR_MAX_AX],0,3.5), minax=clamp(c->r[VR_MIN_AX],-7,-0.1), emax=clamp(c->r[VR_EMERGENCY_AX],-9,minax);
    fmi2Real kp_speed=clamp(c->r[VR_KP_SPEED],0,3), kp_gap=clamp(c->r[VR_KP_GAP],0,1), kd=clamp(c->r[VR_KD_REL_SPEED],0,4), kgap=clamp(c->r[VR_KGAP_SPEED],0,0.3), kpf=clamp(c->r[VR_KP_FOLLOW_SPEED],0,2), jerk=clamp(c->r[VR_JERK_LIMIT],0.1,50);

    Cand cam,rad,lead; cam.idx=-1; rad.idx=-1; lead.valid=0; cam.dx=999; cam.dy=0; rad.dx=999; rad.dy=0;
    fmi2Real camcnt=0,radcnt=0,match=0;
    int force_cutout=current_lead_lateral_cutout(c,lane);
    int candidate=select_lead(c,&cam,&rad,&lead,lane,range,&camcnt,&radcnt,&match);
    int accepted=0; int reason_no_lead=10; fmi2Real cutin_pending=0;

    if(force_cutout){ candidate=0; reason_no_lead=16; }
    if(candidate && lead.dx>follow_max){ candidate=0; reason_no_lead=14; }
    if(candidate && acc_on){
        c->cutout_timer=0;
        int same_sig=(c->current_cam_idx==cam.idx && c->current_rad_idx==rad.idx);
        if(!c->lead_active){
            c->lead_confirm_timer += dt;
            cutin_pending = c->lead_confirm_timer < c->r[VR_LEAD_CONFIRM_TIME] ? 1 : 0;
            if(c->lead_confirm_timer >= c->r[VR_LEAD_CONFIRM_TIME]) accepted=1;
        } else if(same_sig){
            accepted=1; c->lead_confirm_timer=c->r[VR_LEAD_CONFIRM_TIME]; c->switch_timer=0;
        } else {
            c->switch_timer += dt;
            if(c->switch_timer>=c->r[VR_LEAD_SWITCH_TIME]) accepted=1; else cutin_pending=1;
        }
    } else {
        c->lead_confirm_timer=0; c->switch_timer=0;
    }

    if(!accepted){
        /* V17: robust cut-out detection is a state edge, not a candidate-local flag.
           If Fusion.Active was 1 in the previous step and is 0 now, latch CutOutRelease
           until Ego reaches the stored scenario set speed. */
        int falling_edge = (c->prev_fusion_active >= 0.5);
        int was_lead = c->lead_active || falling_edge;
        if(acc_on && was_lead) c->cutout_resume_active = 1.0;

        fmi2Real speed_err=setv-ego;
        fmi2Real speed_tol=maxr(0.25, c->r[VR_SPEED_TOL_KPH_STRAIGHT]/3.6);
        if(!acc_on || (c->cutout_resume_active>=0.5 && speed_err <= speed_tol)){
            c->cutout_resume_active=0.0;
        }
        fmi2Real cutout_release = c->cutout_resume_active;

        clear_lead_memory(c);
        c->prev_fusion_active=0.0;

        fmi2Real speed_ax=clamp(kp_speed*speed_err,minax,maxax);
        if(!acc_on) speed_ax=NOTSET_AX;
        fmi2Real ax;
        if(speed_ax==NOTSET_AX){ ax=NOTSET_AX; }
        else if(cutout_release>=0.5){
            /* RESUME_SET_SPEED: command acceleration toward latched set speed, never follow speed. */
            if(c->prev_ax<0) c->prev_ax=0;
            if(speed_err>0.5) speed_ax=maxr(speed_ax, minr(maxax, 0.70*maxax));
            ax=rate_limit(c->prev_ax, speed_ax, dt, jerk);
        } else {
            if(c->prev_ax<0)c->prev_ax=0;
            ax=rate_limit(c->prev_ax,speed_ax,dt,jerk);
        }
        c->prev_ax=(ax==NOTSET_AX?0:ax);
        fmi2Real reason = acc_on ? (cutout_release>=0.5 ? 17 : (cutin_pending?12:reason_no_lead)) : 0;
        write_outputs(c,0,SRC_NONE,999,0,0,safe,999,speed_ax,ax,(acc_on?MODE_SPEED:MODE_OFF),reason,999,0,setv,0,0,0,0,camcnt,radcnt,c->r[VR_STOP_GUARD_DIST],cam.idx>=0?cam.dx:999,cam.idx>=0?cam.dy:0,0,0,(acc_on?SPEC_ACTIVE:SPEC_OFF),0,tau,(fmi2Real)cam.idx,(fmi2Real)rad.idx,0,camcnt+radcnt,cutin_pending,cutout_release);
        return;
    }

    /* FOLLOW state */
    c->cutout_resume_active=0.0;
    c->prev_fusion_active=1.0;
    c->lead_active=1; c->current_cam_idx=cam.idx; c->current_rad_idx=rad.idx;
    fmi2Real dx=lead.dx, dy=lead.dy, vr=lead.vrel; fmi2Real vrest=0;
    if((absr(vr)<0.2||vr!=vr) && c->r[VR_VREL_EST_ENABLE]>=0.5 && dist_valid(c->prev_distx,range)){
        vrest=(dx-c->prev_distx)/dt; vr=clamp(vrest,-50,20);
    }
    fmi2Real leadv=clamp(ego+vr,0,80);
    if(c->r[VR_IGNORE_STAT_ABOVE_KPH]>0.1 && ego>(c->r[VR_IGNORE_STAT_ABOVE_KPH]/3.6) && leadv<0.6){
        clear_lead_memory(c); c->prev_fusion_active=0.0; c->cutout_resume_active=1.0;
        if(c->prev_ax<0)c->prev_ax=0;
        fmi2Real speed_ax=clamp(kp_speed*(setv-ego),minax,maxax);
        fmi2Real ax=rate_limit(c->prev_ax,speed_ax,dt,jerk); c->prev_ax=ax;
        write_outputs(c,0,SRC_NONE,999,0,0,safe,999,speed_ax,ax,MODE_SPEED,15,999,0,setv,0,0,0,0,camcnt,radcnt,c->r[VR_STOP_GUARD_DIST],cam.dx,cam.dy,0,0,SPEC_ACTIVE,0,tau,(fmi2Real)cam.idx,(fmi2Real)rad.idx,lead.conf,camcnt+radcnt,0,1);
        return;
    }
    fmi2Real closing=maxr(0,-vr);
    fmi2Real ttc=closing>0.1?dx/closing:999;
    fmi2Real preview=clamp(c->r[VR_DYNAMIC_STOP_TIME],0,4);
    fmi2Real early=maxr(0.0,(closing*closing)/maxr(0.1,2.0*absr(clamp(c->r[VR_WARNING_AX],-8,-0.1))));
    fmi2Real safe_ctrl=safe + closing*preview + 0.35*early;
    fmi2Real gap=dx-safe_ctrl;
    fmi2Real effstop=maxr(clamp(c->r[VR_STOP_GUARD_DIST],2,60), ego*preview + (closing*closing)/maxr(0.1,2.0*absr(emax)));
    fmi2Real followv=clamp(leadv + kgap*gap,0,setv);
    fmi2Real cruise_ax=kp_speed*(setv-ego);
    fmi2Real raw=kpf*(followv-ego)+kp_gap*gap+kd*minr(vr,0.0)*0.10;
    fmi2Real mode=MODE_FOLLOW, reason=20, brakeonly=0, specstate=SPEC_ACTIVE;
    if(c->r[VR_BRAKE_ONLY_ENABLE]>=0.5 && leadv>ego+0.2 && leadv<setv-0.2){ brakeonly=1; specstate=SPEC_BRAKE_ONLY; raw=minr(raw,0.0); }
    if(dx<effstop || ttc<clamp(c->r[VR_TTC_EMERGENCY],0.5,10)){ raw=emax; mode=MODE_EMERGENCY; reason=40; }
    else if(ttc<clamp(c->r[VR_TTC_WARNING],1,20)){ mode=MODE_WARNING; reason=30; raw=minr(raw,clamp(c->r[VR_WARNING_AX],-8,-0.1)); }
    else if(gap<0){ raw=minr(raw,0.0); reason=22; }
    else { raw=minr(raw,cruise_ax); reason=21; }
    if(c->r[VR_ALLOW_ACCEL_FOLLOW]<0.5 && dx<safe+clamp(c->r[VR_FOLLOW_RELEASE_GAP],0,40)) raw=minr(raw,0.0);
    if(ego<2.0 && gap<0){ raw=minr(raw,clamp(c->r[VR_LOW_SPEED_HOLD_AX],-4,0)); specstate=SPEC_STANDACTIVE; }
    raw=clamp(raw,emax,maxax);
    fmi2Real rlim=(raw<c->prev_ax)?jerk*2.0:jerk;
    fmi2Real ax=rate_limit(c->prev_ax,raw,dt,rlim);
    c->prev_ax=ax; c->last_distx=dx; c->last_disty=dy; c->last_vrelx=vr; c->last_lead_speed=leadv; c->last_gap_error=gap; c->prev_distx=dx;
    write_outputs(c,1,SRC_FUSED,dx,dy,vr,safe_ctrl,gap,raw,ax,mode,reason,ttc,leadv,followv,vrest,0,0,0,camcnt,radcnt,effstop,cam.dx,cam.dy,1,match,specstate,brakeonly,tau,(fmi2Real)cam.idx,(fmi2Real)rad.idx,lead.conf,camcnt+radcnt,0,0);
}
FMI_EXPORT const char* fmi2GetTypesPlatform(void){return "default";} FMI_EXPORT const char* fmi2GetVersion(void){return "2.0";}
FMI_EXPORT fmi2Component fmi2Instantiate(fmi2String instanceName,fmi2Type fmuType,fmi2String fmuGUID,fmi2String fmuResourceLocation,const fmi2CallbackFunctions* functions,fmi2Boolean visible,fmi2Boolean loggingOn){(void)instanceName;(void)fmuGUID;(void)fmuResourceLocation;(void)functions;(void)visible;(void)loggingOn; if(fmuType!=fmi2CoSimulation)return NULL; defaults(&g); g.instantiated=1; return (fmi2Component)&g;}
FMI_EXPORT void fmi2FreeInstance(fmi2Component c){(void)c;g.instantiated=0;} FMI_EXPORT fmi2Status fmi2SetupExperiment(fmi2Component c,fmi2Boolean td,fmi2Real tol,fmi2Real st,fmi2Boolean sd,fmi2Real stop){(void)td;(void)tol;(void)st;(void)sd;(void)stop;return c?fmi2OK:fmi2Error;} FMI_EXPORT fmi2Status fmi2EnterInitializationMode(fmi2Component c){return c?fmi2OK:fmi2Error;} FMI_EXPORT fmi2Status fmi2ExitInitializationMode(fmi2Component c){return c?fmi2OK:fmi2Error;} FMI_EXPORT fmi2Status fmi2Terminate(fmi2Component c){return c?fmi2OK:fmi2Error;} FMI_EXPORT fmi2Status fmi2Reset(fmi2Component c){if(!c)return fmi2Error;defaults((ACC*)c);return fmi2OK;} FMI_EXPORT fmi2Status fmi2SetDebugLogging(fmi2Component c,fmi2Boolean l,size_t n,const fmi2String cats[]){(void)l;(void)n;(void)cats;return c?fmi2OK:fmi2Error;}
FMI_EXPORT fmi2Status fmi2DoStep(fmi2Component c,fmi2Real t,fmi2Real h,fmi2Boolean noSet){(void)t;(void)noSet; if(!c)return fmi2Error; controller_step((ACC*)c,h); return fmi2OK;} FMI_EXPORT fmi2Status fmi2CancelStep(fmi2Component c){return c?fmi2OK:fmi2Error;}
FMI_EXPORT fmi2Status fmi2SetReal(fmi2Component c,const fmi2ValueReference vr[],size_t nvr,const fmi2Real value[]){size_t i;if(!c||!vr||!value)return fmi2Error;for(i=0;i<nvr;i++){ if(vr[i]>=MAX_VR)return fmi2Error; ((ACC*)c)->r[vr[i]]=value[i]; } return fmi2OK;} FMI_EXPORT fmi2Status fmi2GetReal(fmi2Component c,const fmi2ValueReference vr[],size_t nvr,fmi2Real value[]){size_t i;if(!c||!vr||!value)return fmi2Error;for(i=0;i<nvr;i++){ if(vr[i]>=MAX_VR)return fmi2Error; value[i]=((ACC*)c)->r[vr[i]]; } return fmi2OK;}
FMI_EXPORT fmi2Status fmi2SetInteger(fmi2Component c,const fmi2ValueReference vr[],size_t nvr,const fmi2Integer value[]){(void)c;(void)vr;(void)nvr;(void)value;return fmi2Error;} FMI_EXPORT fmi2Status fmi2GetInteger(fmi2Component c,const fmi2ValueReference vr[],size_t nvr,fmi2Integer value[]){(void)c;(void)vr;(void)nvr;(void)value;return fmi2Error;} FMI_EXPORT fmi2Status fmi2SetBoolean(fmi2Component c,const fmi2ValueReference vr[],size_t nvr,const fmi2Boolean value[]){(void)c;(void)vr;(void)nvr;(void)value;return fmi2Error;} FMI_EXPORT fmi2Status fmi2GetBoolean(fmi2Component c,const fmi2ValueReference vr[],size_t nvr,fmi2Boolean value[]){(void)c;(void)vr;(void)nvr;(void)value;return fmi2Error;} FMI_EXPORT fmi2Status fmi2SetString(fmi2Component c,const fmi2ValueReference vr[],size_t nvr,const fmi2String value[]){(void)c;(void)vr;(void)nvr;(void)value;return fmi2Error;} FMI_EXPORT fmi2Status fmi2GetString(fmi2Component c,const fmi2ValueReference vr[],size_t nvr,fmi2String value[]){(void)c;(void)vr;(void)nvr;(void)value;return fmi2Error;}
FMI_EXPORT fmi2Status fmi2GetFMUstate(fmi2Component c,fmi2FMUstate* s){(void)c;(void)s;return fmi2Error;} FMI_EXPORT fmi2Status fmi2SetFMUstate(fmi2Component c,fmi2FMUstate s){(void)c;(void)s;return fmi2Error;} FMI_EXPORT fmi2Status fmi2FreeFMUstate(fmi2Component c,fmi2FMUstate* s){(void)c;(void)s;return fmi2Error;} FMI_EXPORT fmi2Status fmi2SerializedFMUstateSize(fmi2Component c,fmi2FMUstate s,size_t* size){(void)c;(void)s;(void)size;return fmi2Error;} FMI_EXPORT fmi2Status fmi2SerializeFMUstate(fmi2Component c,fmi2FMUstate s,fmi2Byte serializedState[],size_t size){(void)c;(void)s;(void)serializedState;(void)size;return fmi2Error;} FMI_EXPORT fmi2Status fmi2DeSerializeFMUstate(fmi2Component c,const fmi2Byte serializedState[],size_t size,fmi2FMUstate* s){(void)c;(void)serializedState;(void)size;(void)s;return fmi2Error;} FMI_EXPORT fmi2Status fmi2GetDirectionalDerivative(fmi2Component c,const fmi2ValueReference u[],size_t nu,const fmi2ValueReference k[],size_t nk,const fmi2Real dk[],fmi2Real du[]){(void)c;(void)u;(void)nu;(void)k;(void)nk;(void)dk;(void)du;return fmi2Error;}
FMI_EXPORT fmi2Status fmi2GetStatus(fmi2Component c,const fmi2StatusKind s,fmi2Status* value){(void)c;(void)s;if(!value)return fmi2Error;*value=fmi2OK;return fmi2OK;} FMI_EXPORT fmi2Status fmi2GetRealStatus(fmi2Component c,const fmi2StatusKind s,fmi2Real* value){(void)c;(void)s;if(!value)return fmi2Error;*value=0;return fmi2OK;} FMI_EXPORT fmi2Status fmi2GetIntegerStatus(fmi2Component c,const fmi2StatusKind s,fmi2Integer* value){(void)c;(void)s;if(!value)return fmi2Error;*value=0;return fmi2OK;} FMI_EXPORT fmi2Status fmi2GetBooleanStatus(fmi2Component c,const fmi2StatusKind s,fmi2Boolean* value){(void)c;(void)s;if(!value)return fmi2Error;*value=0;return fmi2OK;} FMI_EXPORT fmi2Status fmi2GetStringStatus(fmi2Component c,const fmi2StatusKind s,fmi2String* value){(void)c;(void)s;if(!value)return fmi2Error;*value="";return fmi2OK;}
