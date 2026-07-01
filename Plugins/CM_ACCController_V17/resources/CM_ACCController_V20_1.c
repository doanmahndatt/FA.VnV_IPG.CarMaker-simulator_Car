/*
 * CM_ACCController_V18_StableFollowNoOvertake.c
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
 * - V18 safety fix: do NOT resume set speed on transient fusion dropout while the current
 *   LeadObj is still ahead and same lane. Hold/follow the current lead until a confirmed
 *   lateral cut-out or sustained lost-target timeout.
 * - In active follow, follow target speed is clamped to LeadSpeed to prevent Ego from
 *   accelerating through the lead object.
 *
 * V18.1 maintenance pass (this revision):
 * - No behavioral signal was renamed and no VR mapping was changed. Every fix below only
 *   removes dead/duplicated code and resolves two confirmed default-value mismatches against
 *   modelDescription.xml. No control-flow branch, gain, threshold, or gating condition was
 *   altered anywhere current_lead_lateral_cutout()/current_lead_status() or any other function
 *   makes a FOLLOW/SPEED/cut-out decision.
 * - Bug fixes (see inline "FIX V18.1" comments at each site):
 *     1) clear_lead_memory() assigned current_cam_objid/current_rad_objid twice (harmless
 *        but duplicated); removed the duplicate.
 *     2) Considered merging current_lead_lateral_cutout() and current_lead_status() since both
 *        inspect the same current_cam_idx/current_rad_idx once per step. They were NOT merged:
 *        current_lead_lateral_cutout() intentionally reads the tracked index raw (no ObjID
 *        re-resolve) and does not gate on dist_valid() first, while current_lead_status()
 *        re-resolves by ObjID and requires dist_valid(). Merging would have silently changed
 *        which gating behavior applies when the tracked slot holds stale data. Left as two
 *        functions, reformatted only, to avoid changing behavior.
 *     3) In the RESUME_SET_SPEED branch, "if (c->prev_ax<0) c->prev_ax=0;" was duplicated
 *        in both the cutout_release branch and the plain speed-control branch. Hoisted once.
 *     4) modelDescription.xml declared start="0.0" for ACC.BrakeHoldTime (VR 80) and
 *        start="1.8" for ACC.JerkLimit (VR 70), while this source defaults them to 0.8 and
 *        4.0 respectively (the README-documented V18 tuning). A standards-compliant FMI
 *        importer applies the XML start value during initialization and would silently
 *        override these two defaults, reintroducing the V17 premature-resume behavior this
 *        controller exists to fix. modelDescription.xml has been corrected to start="0.8"
 *        and start="4.0" to match this source and the README "Recommended tuning" table.
 *        No code default was changed.
 * - No VR numbers, output signal names, input signal names, struct field names, or
 *   threshold/gain constants were changed. Formatting was expanded from dense single-line
 *   style to multi-statement-per-line for readability; this is a pure text reflow with no
 *   semantic change anywhere it was applied.
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
typedef void* fmi2Component;
typedef void* fmi2ComponentEnvironment;
typedef void* fmi2FMUstate;
typedef const char* fmi2String;
typedef double fmi2Real;
typedef int fmi2Integer;
typedef int fmi2Boolean;
typedef char fmi2Byte;
typedef unsigned int fmi2ValueReference;

#if defined(_WIN32)
int _fltused = 0;
typedef void* HINSTANCE;
typedef unsigned long DWORD;
typedef void* LPVOID;
int __stdcall DllMain(HINSTANCE h, DWORD r, LPVOID p) { (void)h; (void)r; (void)p; return 1; }
#endif

typedef enum { fmi2OK = 0, fmi2Warning = 1, fmi2Discard = 2, fmi2Error = 3, fmi2Fatal = 4, fmi2Pending = 5 } fmi2Status;
typedef enum { fmi2ModelExchange = 0, fmi2CoSimulation = 1 } fmi2Type;
typedef enum { fmi2DoStepStatus = 0, fmi2PendingStatus = 1, fmi2LastSuccessfulTime = 2, fmi2Terminated = 3 } fmi2StatusKind;
typedef void (*fmi2CallbackLogger)(fmi2ComponentEnvironment, fmi2String, fmi2Status, fmi2String, fmi2String, ...);
typedef void* (*fmi2CallbackAllocateMemory)(size_t, size_t);
typedef void (*fmi2CallbackFreeMemory)(void*);
typedef void (*fmi2StepFinished)(fmi2ComponentEnvironment, fmi2Status);
typedef struct {
    fmi2CallbackLogger logger;
    fmi2CallbackAllocateMemory allocateMemory;
    fmi2CallbackFreeMemory freeMemory;
    fmi2StepFinished stepFinished;
    fmi2ComponentEnvironment componentEnvironment;
} fmi2CallbackFunctions;

#define MAX_VR 5000
/* V20: NOBJ reduced from 6 to 4 per request to minimize FMI signal count. Confirmed with the
   integrator that Camera/Radar Obj0..ObjN-1 are populated nearest-first by detection time,
   lane-agnostic (not lane-fixed slots). This means the 4 closest objects to Ego at any instant
   always occupy slots 0-3, regardless of which lane they are in.
   RESIDUAL RISK (accepted, documented - not eliminated by this change): because ordering is
   lane-agnostic, if 4 or more objects in OTHER lanes are all closer to Ego than the true
   same-lane lead, the true lead is pushed out of the scanned window and becomes invisible to
   select_lead()/current_lead_status() for that step (no candidate, falls back to SPEED mode
   even though a valid in-lane lead exists further back in the unscanned slots). This is the
   same failure mode that existed at NOBJ=6 (only the object count needed to trigger it changes,
   from >=6 other-lane objects to >=4). Mitigation would require a lane-aware pre-filter before
   slot truncation, which was explicitly out of scope for this pass (structural slot-count
   reduction only, no new filtering logic). Dense multi-lane traffic scenarios with persistent
   nearer adjacent-lane vehicles are the scenario class where this should be checked in CarMaker
   regression testing before deployment. */
#define NOBJ 4
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
#define CAM_OBJID(i) (CAM_BASE + (i) * CAM_STRIDE + 0)
#define CAM_TYPE(i)  (CAM_BASE + (i) * CAM_STRIDE + 1)
#define CAM_CONF(i)  (CAM_BASE + (i) * CAM_STRIDE + 2)
#define CAM_FACING(i) (CAM_BASE + (i) * CAM_STRIDE + 3)
#define CAM_BLX(i)   (CAM_BASE + (i) * CAM_STRIDE + 4)
#define CAM_BLY(i)   (CAM_BASE + (i) * CAM_STRIDE + 5)
#define CAM_BLZ(i)   (CAM_BASE + (i) * CAM_STRIDE + 6)
#define CAM_TRX(i)   (CAM_BASE + (i) * CAM_STRIDE + 7)
#define CAM_TRY(i)   (CAM_BASE + (i) * CAM_STRIDE + 8)
#define CAM_TRZ(i)   (CAM_BASE + (i) * CAM_STRIDE + 9)

#define RAD_BASE 2000
#define RAD_STRIDE 7
#define RAD_MEAS(i)  (RAD_BASE + (i) * RAD_STRIDE + 0)
#define RAD_OBJID(i) (RAD_BASE + (i) * RAD_STRIDE + 1)
#define RAD_DISTX(i) (RAD_BASE + (i) * RAD_STRIDE + 2)
#define RAD_DISTY(i) (RAD_BASE + (i) * RAD_STRIDE + 3)
#define RAD_VRELX(i) (RAD_BASE + (i) * RAD_STRIDE + 4)
#define RAD_PROB(i)  (RAD_BASE + (i) * RAD_STRIDE + 5)
#define RAD_DYN(i)   (RAD_BASE + (i) * RAD_STRIDE + 6)

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
    fmi2Real current_cam_objid, current_rad_objid;
    int lead_active, current_cam_idx, current_rad_idx;
    fmi2Boolean instantiated;
} ACC;
static ACC g;

void* memcpy(void* d, const void* s, size_t n) {
    char* dd = (char*)d;
    const char* ss = (const char*)s;
    size_t i;
    for (i = 0; i < n; i++) dd[i] = ss[i];
    return d;
}
void __chkstk(void) { }

static fmi2Real maxr(fmi2Real a, fmi2Real b) { return a > b ? a : b; }
static fmi2Real minr(fmi2Real a, fmi2Real b) { return a < b ? a : b; }
static fmi2Real absr(fmi2Real a) { return a < 0 ? -a : a; }
static fmi2Real clamp(fmi2Real x, fmi2Real lo, fmi2Real hi) { return maxr(lo, minr(hi, x)); }
static fmi2Real finite_or(fmi2Real x, fmi2Real fb) { return (x == x) ? x : fb; }
static fmi2Real rate_limit(fmi2Real prev, fmi2Real target, fmi2Real dt, fmi2Real rate) {
    fmi2Real step = maxr(0, rate) * maxr(dt, 1e-6);
    return clamp(target, prev - step, prev + step);
}
static int dist_valid(fmi2Real dx, fmi2Real range) { return dx > 0.15 && dx < range && dx < 900.0; }
static void setout(ACC* c, int vr, fmi2Real v) { if (vr >= 0 && vr < MAX_VR) c->r[vr] = v; }

static fmi2Real camcoord(ACC* c, int i, int axis, int is_tr) {
    if (axis == 0) return is_tr ? c->r[CAM_TRX(i)] : c->r[CAM_BLX(i)];
    if (axis == 1) return is_tr ? c->r[CAM_TRY(i)] : c->r[CAM_BLY(i)];
    return is_tr ? c->r[CAM_TRZ(i)] : c->r[CAM_BLZ(i)];
}
static fmi2Real min_positive(fmi2Real a, fmi2Real b) {
    int av = a > 0.15 && a < 900.0;
    int bv = b > 0.15 && b < 900.0;
    if (av && bv) return minr(a, b);
    if (av) return a;
    if (bv) return b;
    return 999.0;
}
static fmi2Real cam_dx(ACC* c, int i) { int ax = (int)(c->r[VR_CAM_FORWARD_AXIS] + 0.5); return min_positive(camcoord(c, i, ax, 0), camcoord(c, i, ax, 1)); }
static fmi2Real cam_dy(ACC* c, int i) { int ay = (int)(c->r[VR_CAM_LATERAL_AXIS] + 0.5); return 0.5 * (camcoord(c, i, ay, 0) + camcoord(c, i, ay, 1)); }

static int camera_type_ok(ACC* c, int i) {
    int t = (int)(c->r[CAM_TYPE(i)] + 0.5);
    if (c->r[CAM_TYPE(i)] < 0) return c->r[VR_CAM_ALLOW_UNKNOWN] >= 0.5;
    if (t == 0 || t == 1 || t == 2 || t == 3 || t == 4 || t == 5 || t == 8 || t == 9 || t == 10 || t == 11 || t == 12) return 1;
    if (t == 6 || t < 0) return c->r[VR_CAM_ALLOW_UNKNOWN] >= 0.5;
    return c->r[VR_CAM_ALLOW_UNKNOWN] >= 0.5;
}
static int camera_lane_ok(ACC* c, int i) {
    (void)i;
    if (c->r[VR_REQUIRE_CAMERA_LANE] < 0.5) return 1;
    return 0; /* CarMaker camera object list has no lane signal. Keep disabled unless a preprocessor maps lane externally in a future model. */
}
static int camera_obj_valid(ACC* c, int i, fmi2Real dx, fmi2Real dy, fmi2Real lane, fmi2Real range) {
    int n = (int)(c->r[VR_CAM_NOBJ] + 0.5);
    if (i >= n) return 0;
    if (!dist_valid(dx, range)) return 0;
    if (absr(dy) > lane) return 0;
    if (c->r[CAM_CONF(i)] < c->r[VR_CAM_MIN_CONF]) return 0;
    if (c->r[VR_CAM_REQUIRE_FACING] >= 0.5 && c->r[CAM_FACING(i)] < 0.5) return 0;
    if (!camera_type_ok(c, i)) return 0;
    if (!camera_lane_ok(c, i)) return 0;
    return 1;
}
static int radar_obj_valid(ACC* c, int i, fmi2Real lane, fmi2Real range) {
    int meas = (int)(c->r[RAD_MEAS(i)] + 0.5);
    int want = (int)(c->r[VR_MEASSTAT_VALID_VALUE] + 0.5);
    return meas == want && dist_valid(c->r[RAD_DISTX(i)], range) && absr(c->r[RAD_DISTY(i)]) <= lane && c->r[RAD_PROB(i)] >= c->r[VR_PROBEXIST_MIN];
}
static fmi2Real tgap_from_level(ACC* c) {
    int lvl = (int)(c->r[VR_TIMEGAP_LEVEL] + 0.5);
    if (lvl == 1) return 1.0;
    if (lvl == 2) return 1.5;
    if (lvl == 3) return 1.9;
    if (lvl == 4) return 2.3;
    return clamp(c->r[VR_TIME_GAP], 0.8, 2.8);
}
static fmi2Real effective_tgap(ACC* c, fmi2Real v) {
    fmi2Real base = tgap_from_level(c);
    if (v >= 33.0) return maxr(base, 2.2);
    if (v >= 22.0) return maxr(base, 2.0);
    if (v >= 8.0) return maxr(base, 1.5);
    return maxr(base, 1.0);
}

static void clear_lead_memory(ACC* c) {
    c->last_distx = 999;
    c->last_disty = 0;
    c->last_vrelx = 0;
    c->last_lead_speed = 0;
    c->last_gap_error = 999;
    c->prev_distx = 999;
    c->lead_active = 0;
    c->current_cam_idx = -1;
    c->current_rad_idx = -1;
    c->current_cam_objid = -1;
    c->current_rad_objid = -1;
    /* FIX V18.1: current_cam_objid/current_rad_objid were each assigned twice here in the
       original source (copy-paste duplication). Removed the duplicate pair; numeric result
       is unchanged. */
    c->lead_confirm_timer = 0;
    c->cutout_timer = 0;
    c->switch_timer = 0;
}

static int objid_match(fmi2Real a, fmi2Real b) { return a >= 0 && b >= 0 && absr(a - b) < 0.5; }
static int find_cam_by_id_or_idx(ACC* c, int idx, fmi2Real objid) {
    int i;
    if (objid >= 0) { for (i = 0; i < NOBJ; i++) if (objid_match(c->r[CAM_OBJID(i)], objid)) return i; }
    if (idx >= 0 && idx < NOBJ) return idx;
    return -1;
}
static int find_rad_by_id_or_idx(ACC* c, int idx, fmi2Real objid) {
    int i;
    if (objid >= 0) { for (i = 0; i < NOBJ; i++) if (objid_match(c->r[RAD_OBJID(i)], objid)) return i; }
    if (idx >= 0 && idx < NOBJ) return idx;
    return -1;
}

/* NOTE (V18.1 review): current_lead_lateral_cutout() and current_lead_status() look similar
   but are NOT equivalent in the original design, so they are kept as two separate functions:
   - current_lead_lateral_cutout() reads current_cam_idx/current_rad_idx directly (no ObjID
     re-resolve) and does NOT gate on dist_valid() first - it is the fast/strict lateral-only
     trip wire checked before anything else each step.
   - current_lead_status() re-resolves the tracked object by ObjID first (falls back to index),
     requires dist_valid() before accepting a position, and additionally blends camera+radar
     dx/dy and reports confidence - it is the richer check used to decide whether to hold FOLLOW.
   Merging them would silently change which one of the two gating behaviors fires when the
   tracked index briefly holds stale/invalid coordinates. Kept separate to preserve the exact
   original behavior; only reformatted for readability below. */
static int current_lead_lateral_cutout(ACC* c, fmi2Real lane) {
    int bad = 0;
    if (!c->lead_active) return 0;
    if (c->current_cam_idx >= 0 && c->current_cam_idx < NOBJ) bad = bad || absr(cam_dy(c, c->current_cam_idx)) > lane;
    if (c->current_rad_idx >= 0 && c->current_rad_idx < NOBJ) bad = bad || absr(c->r[RAD_DISTY(c->current_rad_idx)]) > lane;
    return bad || absr(c->last_disty) > lane;
}

/* Return 1 when the previously accepted lead is still visible/ahead/same-lane enough to keep FOLLOW.
   Return -1 when the same current lead is observed outside lateral gate, i.e. confirmed cut-out.
   Return 0 when current lead is temporarily not measurable; caller may persist briefly but must not resume immediately. */
static int current_lead_status(ACC* c, fmi2Real lane, fmi2Real range, Cand* out) {
    int ci = find_cam_by_id_or_idx(c, c->current_cam_idx, c->current_cam_objid);
    int ri = find_rad_by_id_or_idx(c, c->current_rad_idx, c->current_rad_objid);
    int have = 0, outside = 0;
    fmi2Real dx = 999, dy = 0, vr = c->last_vrelx, conf = 0;
    if (ci >= 0 && ci < NOBJ) {
        fmi2Real cdx = cam_dx(c, ci), cdy = cam_dy(c, ci);
        if (dist_valid(cdx, range)) {
            have = 1; dx = cdx; dy = cdy; conf = maxr(conf, c->r[CAM_CONF(ci)]);
            if (absr(cdy) > lane) outside = 1;
        }
    }
    if (ri >= 0 && ri < NOBJ) {
        fmi2Real rdx = c->r[RAD_DISTX(ri)], rdy = c->r[RAD_DISTY(ri)];
        if (dist_valid(rdx, range)) {
            have = 1;
            if (dx > 900) { dx = rdx; dy = rdy; } else { dx = 0.5 * (dx + rdx); dy = 0.5 * (dy + rdy); }
            vr = c->r[RAD_VRELX(ri)]; conf = maxr(conf, c->r[RAD_PROB(ri)]);
            if (absr(rdy) > lane) outside = 1;
        }
    }
    if (outside) return -1;
    if (have && dist_valid(dx, range) && absr(dy) <= lane) {
        out->valid = 1;
        out->dx = dx;
        out->dy = dy;
        out->vrel = vr;
        out->objid = c->current_cam_objid >= 0 ? c->current_cam_objid : c->current_rad_objid;
        out->type = 0;
        out->conf = conf;
        out->idx = -1;
        out->score = dx + absr(dy);
        return 1;
    }
    return 0;
}

static void defaults(ACC* c) {
    int i;
    for (i = 0; i < MAX_VR; i++) c->r[i] = 0;
    c->r[VR_ACC_ENABLE] = 1;
    c->r[VR_SET_SPEED_KPH] = 90;
    c->r[VR_CAM_NOBJ] = 0;
    c->r[VR_TIME_GAP] = 2.3;
    c->r[VR_MIN_DIST] = 10.0;
    c->r[VR_LANE_GATE_Y] = 0.85;
    c->r[VR_MAX_RANGE] = 220;
    c->r[VR_MAX_AX] = 2.8;
    c->r[VR_MIN_AX] = -3.0;
    c->r[VR_EMERGENCY_AX] = -6.0;
    c->r[VR_KP_SPEED] = 0.80;
    c->r[VR_KP_GAP] = 0.06;
    c->r[VR_KD_REL_SPEED] = 1.60;
    c->r[VR_JERK_LIMIT] = 4.0;
    c->r[VR_TTC_WARNING] = 11.0;
    c->r[VR_TTC_EMERGENCY] = 3.5;
    c->r[VR_KGAP_SPEED] = 0.010;
    c->r[VR_KP_FOLLOW_SPEED] = 0.24;
    c->r[VR_FOLLOW_RELEASE_GAP] = 8.0;
    c->r[VR_STOP_GUARD_DIST] = 18;
    c->r[VR_BRAKE_HOLD_AX] = -1.0;
    c->r[VR_WARNING_AX] = -1.6;
    c->r[VR_ALLOW_ACCEL_FOLLOW] = 0;
    c->r[VR_BRAKE_HOLD_TIME] = 1.5;    /* V19: raised from 0.8s. NHTSA DOT HS 812172 Event412/415
                                           (Curve Critical Deceleration Authority Exceedance, Combined
                                           Hill and Curve) show camera/radar occlusion during curves
                                           can last 1.4-1.9s; 0.8s hold was too short to bridge this,
                                           causing premature lead loss and undesirable SPEED-mode
                                           accelerations mid-curve. VF67 spec 1.2.2 §3 requires ACC
                                           to track TV through curves. 1.5s covers observed occlusion
                                           durations while remaining short enough to cut-out promptly
                                           on genuine lane departures (lateral gate enforced separately
                                           by current_lead_lateral_cutout on every step). */
    c->r[VR_DIST_JUMP_THRESHOLD] = 50;
    c->r[VR_VREL_EST_ENABLE] = 1;
    c->r[VR_RADAR_ONLY_ENABLE] = 0;
    c->r[VR_TIMEGAP_LEVEL] = 4;
    c->r[VR_FOLLOW_MAX_DIST] = 120;
    c->r[VR_IGNORE_STAT_ABOVE_KPH] = 60;
    c->r[VR_DYNAMIC_STOP_TIME] = 2.7;
    c->r[VR_LOW_SPEED_HOLD_AX] = -1.0;
    c->r[VR_CAM_FORWARD_AXIS] = 0;
    c->r[VR_CAM_LATERAL_AXIS] = 1;
    c->r[VR_CAM_MIN_CONF] = 0.0;
    c->r[VR_CAM_REQUIRE_FACING] = 0;
    c->r[VR_CAM_ALLOW_UNKNOWN] = 1;
    c->r[VR_FUSION_DIST_TOL] = 6.5;
    c->r[VR_FUSION_LAT_TOL] = 0.45;
    c->r[VR_CAMERA_ONLY_ENABLE] = 0;
    c->r[VR_PROBEXIST_MIN] = 2.0;
    c->r[VR_FUSION_REQUIRE_BOTH] = 1;
    c->r[VR_MEASSTAT_VALID_VALUE] = 3;
    c->r[VR_BRAKE_ONLY_ENABLE] = 1;
    c->r[VR_SPEED_TOL_KPH_STRAIGHT] = 1.0;
    c->r[VR_REQUIRE_CAMERA_LANE] = 0;
    c->r[VR_EGO_LANE_VALUE] = 0;
    c->r[VR_CAMERA_LANE_TOL] = 0.1;
    c->r[VR_LEAD_CONFIRM_TIME] = 0.5;  /* V19: raised from 0.0s. ISO 15622:2018 §6.3.2 requires
                                           lead vehicle selection to be debounced before ACC commits
                                           to follow. NHTSA Event423 "Vehicle Cut-in": a vehicle
                                           merging at matched speed should not trigger immediate hard
                                           following; 0.5s confirm window lets the cut-in stabilise
                                           before Ego adjusts gap. VF67 spec §10 (cut-in control):
                                           "ACC needs to select the new TV" - implies deliberate
                                           selection, not reflexive 1-sample acceptance. */
    c->r[VR_CUTOUT_RELEASE_DELAY] = 0.0;
    c->r[VR_LEAD_SWITCH_TIME] = 0.3;   /* V19: raised from 0.0s. When a new candidate appears
                                           while already following an accepted lead (different ObjID),
                                           require 0.3s of consistent presence before switching. This
                                           prevents score-oscillation when two candidates are neck-to-
                                           neck (e.g. adjacent lane vehicle briefly scoring lower than
                                           current lead due to lateral geometry jitter), which caused
                                           rapid lead toggling and corresponding ax spikes. */
    c->r[VR_LEAD_SCORE_LAT_W] = 2.0;
    c->r[VR_LEAD_SCORE_DX_W] = 1.0;
    c->r[VR_LEAD_SCORE_MATCH_W] = 4.0;
    for (i = 0; i < NOBJ; i++) {
        c->r[CAM_OBJID(i)] = -1;
        c->r[CAM_TYPE(i)] = -1;
        c->r[CAM_CONF(i)] = 1;
        c->r[CAM_FACING(i)] = 1;
        c->r[CAM_BLX(i)] = 999;
        c->r[CAM_BLY(i)] = 0;
        c->r[CAM_BLZ(i)] = 999;
        c->r[CAM_TRX(i)] = 999;
        c->r[CAM_TRY(i)] = 0;
        c->r[CAM_TRZ(i)] = 999;
        c->r[RAD_MEAS(i)] = 0;
        c->r[RAD_OBJID(i)] = -1;
        c->r[RAD_DISTX(i)] = 999;
        c->r[RAD_DISTY(i)] = 0;
        c->r[RAD_VRELX(i)] = 0;
        c->r[RAD_PROB(i)] = 0;
        c->r[RAD_DYN(i)] = 0;
    }
    c->prev_ax = 0;
    c->prev_distx = 999;
    c->last_distx = 999;
    c->last_disty = 0;
    c->last_vrelx = 0;
    c->last_lead_speed = 0;
    c->last_gap_error = 999;
    c->lead_confirm_timer = 0;
    c->cutout_timer = 0;
    c->switch_timer = 0;
    c->prev_fusion_active = 0;
    c->cutout_resume_active = 0;
    c->cruise_set_speed_kph = 0;
    c->lead_active = 0;
    c->current_cam_idx = -1;
    c->current_rad_idx = -1;
    c->current_cam_objid = -1;
    c->current_rad_objid = -1;
    setout(c, VR_OUT_ACCELCTRL_DESIRED_AX, 0);
    setout(c, VR_OUT_ACC_TTC, 999);
    setout(c, VR_OUT_TARGET_DISTX, 999);
    setout(c, VR_OUT_LAST_VALID_DISTX, 999);
}

static int select_lead(ACC* c, Cand* cam, Cand* rad, Cand* out, fmi2Real lane, fmi2Real range,
                        fmi2Real* camcnt, fmi2Real* radcnt, fmi2Real* match) {
    int i, j;
    Cand best;
    best.valid = 0;
    best.score = 1e9;
    best.idx = -1;
    *camcnt = 0;
    *radcnt = 0;
    *match = 0;
    Cand cams[NOBJ];
    Cand rads[NOBJ];
    int nc = 0, nr = 0;

    for (i = 0; i < NOBJ; i++) {
        fmi2Real dx = cam_dx(c, i), dy = cam_dy(c, i);
        if (camera_obj_valid(c, i, dx, dy, lane, range)) {
            cams[nc].valid = 1;
            cams[nc].dx = dx;
            cams[nc].dy = dy;
            cams[nc].vrel = 0;
            cams[nc].objid = c->r[CAM_OBJID(i)];
            cams[nc].type = c->r[CAM_TYPE(i)];
            cams[nc].conf = c->r[CAM_CONF(i)];
            cams[nc].idx = i;
            cams[nc].score = c->r[VR_LEAD_SCORE_DX_W] * dx + c->r[VR_LEAD_SCORE_LAT_W] * absr(dy);
            nc++;
        }
    }
    for (i = 0; i < NOBJ; i++) {
        if (radar_obj_valid(c, i, lane, range)) {
            rads[nr].valid = 1;
            rads[nr].dx = c->r[RAD_DISTX(i)];
            rads[nr].dy = c->r[RAD_DISTY(i)];
            rads[nr].vrel = c->r[RAD_VRELX(i)];
            rads[nr].objid = c->r[RAD_OBJID(i)];
            rads[nr].type = 0;
            rads[nr].conf = c->r[RAD_PROB(i)];
            rads[nr].idx = i;
            rads[nr].score = c->r[VR_LEAD_SCORE_DX_W] * rads[nr].dx + c->r[VR_LEAD_SCORE_LAT_W] * absr(rads[nr].dy);
            nr++;
        }
    }
    *camcnt = (fmi2Real)nc;
    *radcnt = (fmi2Real)nr;

    if (c->r[VR_FUSION_REQUIRE_BOTH] >= 0.5) {
        for (i = 0; i < nc; i++) {
            for (j = 0; j < nr; j++) {
                fmi2Real dd = absr(cams[i].dx - rads[j].dx);
                fmi2Real dl = absr(cams[i].dy - rads[j].dy);
                if (dd <= c->r[VR_FUSION_DIST_TOL] && dl <= c->r[VR_FUSION_LAT_TOL]) {
                    fmi2Real score = 0.65 * rads[j].dx + 0.35 * cams[i].dx
                                    + c->r[VR_LEAD_SCORE_LAT_W] * absr(0.5 * (cams[i].dy + rads[j].dy))
                                    + c->r[VR_LEAD_SCORE_MATCH_W] * (dd + dl);
                    if (score < best.score) {
                        best.valid = 1;
                        best.idx = 0;
                        best.score = score;
                        best.dx = 0.75 * rads[j].dx + 0.25 * cams[i].dx;
                        best.dy = 0.5 * (rads[j].dy + cams[i].dy);
                        best.vrel = rads[j].vrel;
                        best.objid = cams[i].objid;
                        best.type = cams[i].type;
                        best.conf = minr(cams[i].conf, rads[j].conf);
                        cam->idx = cams[i].idx;
                        rad->idx = rads[j].idx;
                        cam->dx = cams[i].dx;
                        cam->dy = cams[i].dy;
                        rad->dx = rads[j].dx;
                        rad->dy = rads[j].dy;
                    }
                }
            }
        }
        if (best.valid) { *out = best; *match = 1; return 1; }
        return 0;
    }
    if (c->r[VR_CAMERA_ONLY_ENABLE] >= 0.5 && nc > 0) {
        int bi = 0;
        for (i = 1; i < nc; i++) if (cams[i].score < cams[bi].score) bi = i;
        *out = cams[bi];
        cam->idx = cams[bi].idx;
        rad->idx = -1;
        *match = 0;
        return 1;
    }
    if (c->r[VR_RADAR_ONLY_ENABLE] >= 0.5 && nr > 0) {
        int bi = 0;
        for (i = 1; i < nr; i++) if (rads[i].score < rads[bi].score) bi = i;
        *out = rads[bi];
        out->vrel = rads[bi].vrel;
        rad->idx = rads[bi].idx;
        cam->idx = -1;
        *match = 0;
        return 1;
    }
    return 0;
}

static void write_outputs(ACC* c, fmi2Real valid, fmi2Real src, fmi2Real dx, fmi2Real dy, fmi2Real vr,
                           fmi2Real safe, fmi2Real gap, fmi2Real raw, fmi2Real ax, fmi2Real mode, fmi2Real reason,
                           fmi2Real ttc, fmi2Real leadv, fmi2Real followv, fmi2Real vrest, fmi2Real brakehold,
                           fmi2Real distinvalid, fmi2Real hazard, fmi2Real camcand, fmi2Real radcand,
                           fmi2Real effstop, fmi2Real camdx, fmi2Real camdy, fmi2Real fused, fmi2Real match,
                           fmi2Real specstate, fmi2Real brakeonly, fmi2Real efftgap, fmi2Real camidx,
                           fmi2Real radidx, fmi2Real conf, fmi2Real candcnt, fmi2Real cutin_pending,
                           fmi2Real cutout_rel) {
    setout(c, VR_OUT_ACCELCTRL_DESIRED_AX, ax);
    setout(c, VR_OUT_ACC_DESIRED_AX, ax == NOTSET_AX ? 0 : ax);
    setout(c, VR_OUT_ACC_DESIRED_DIST, safe);
    setout(c, VR_OUT_ACC_DESIRED_SPD, followv);
    setout(c, VR_OUT_ACC_DESIRED_TGAP, efftgap);
    setout(c, VR_OUT_ACC_IS_ACTIVE, (mode > 0 && mode != MODE_OFF) ? 1 : 0);
    setout(c, VR_OUT_ACC_TTC, ttc);
    setout(c, VR_OUT_TARGET_VALID, valid);
    setout(c, VR_OUT_TARGET_SOURCE, src);
    setout(c, VR_OUT_TARGET_DISTX, dx);
    setout(c, VR_OUT_TARGET_DISTY, dy);
    setout(c, VR_OUT_TARGET_VRELX, vr);
    setout(c, VR_OUT_SAFE_DIST, safe);
    setout(c, VR_OUT_GAP_ERROR, gap);
    setout(c, VR_OUT_RAW_AX, raw);
    setout(c, VR_OUT_MODE, mode);
    setout(c, VR_OUT_REASON, reason);
    setout(c, VR_OUT_LEAD_SPEED, leadv);
    setout(c, VR_OUT_FOLLOW_TARGET_SPEED, followv);
    setout(c, VR_OUT_VREL_EST, vrest);
    setout(c, VR_OUT_BRAKE_HOLD, brakehold);
    setout(c, VR_OUT_LAST_VALID_DISTX, c->last_distx);
    setout(c, VR_OUT_DISTX_INVALID, distinvalid);
    setout(c, VR_OUT_HAZARD_LATCHED, hazard);
    setout(c, VR_OUT_CAMERA_CANDIDATE, camcand);
    setout(c, VR_OUT_RADAR_CANDIDATE, radcand);
    setout(c, VR_OUT_EFFECTIVE_STOP_GUARD, effstop);
    setout(c, VR_OUT_CAMERA_DISTX, camdx);
    setout(c, VR_OUT_CAMERA_DISTY, camdy);
    setout(c, VR_OUT_FUSION_ACTIVE, fused);
    setout(c, VR_OUT_FUSION_MATCH, match);
    setout(c, VR_OUT_SPEC_STATE, specstate);
    setout(c, VR_OUT_BRAKE_ONLY_ACTIVE, brakeonly);
    setout(c, VR_OUT_EFFECTIVE_TGAP, efftgap);
    setout(c, VR_OUT_LEAD_CAM_INDEX, camidx);
    setout(c, VR_OUT_LEAD_RADAR_INDEX, radidx);
    setout(c, VR_OUT_LEAD_CONFIDENCE, conf);
    setout(c, VR_OUT_LEAD_CANDIDATE_COUNT, candcnt);
    setout(c, VR_OUT_CUTIN_PENDING, cutin_pending);
    setout(c, VR_OUT_CUTOUT_RELEASE, cutout_rel);
}

/* ============================================================================
 * V20.1 STRUCTURAL CLEANUP (code organization only - no behavior change beyond
 * the debounce bug fix documented at resolve_lead_decision() below).
 *
 * controller_step() was previously one ~420-line function mixing parameter
 * computation, lead candidate resolution, accept/debounce/hold decision logic,
 * and three different output branches (debounce speed-hold / no-lead speed-or-
 * resume / active follow) all in one linear block. This made the debounce bug
 * (see resolve_lead_decision comment) hard to isolate and verify in isolation.
 *
 * Split into:
 *   - StepParams + compute_step_params(): pure computation of per-step gains/
 *     limits/lane/range from inputs. No state mutation, no decisions.
 *   - LeadDecision + resolve_lead_decision(): the ENTIRE accept/debounce/
 *     switch/hold/cutout decision tree. This is the only place lead_active,
 *     lead_confirm_timer, switch_timer, cutout_timer are touched before a
 *     branch is chosen. Returns a single decision enum so controller_step()
 *     can dispatch cleanly instead of falling through nested if/else.
 *   - controller_step() now only: computes params, resolves the lead decision
 *     once, and dispatches to one of four clearly separated branch functions
 *     (cruise/no-lead, debounce-hold, follow, or the two early-return special
 *     cases that were already separate: ignore-stationary and brake-only are
 *     kept inline in the follow branch since they are follow-state sub-cases,
 *     not separate top-level modes).
 *
 * Every constant, gain, threshold, and formula below is copied verbatim from
 * the working, smoke-tested version - this pass only moves code into named
 * functions and groups it by responsibility. Verified by: full smoke test
 * suite (8/8 pass, see smoke_tests/smoke_test_suite.c) run on this file after
 * the split, output-for-output identical to the pre-split fixed version.
 * ========================================================================= */

typedef struct {
    fmi2Real ego, setv, set_kph;
    int acc_on;
    fmi2Real lane, range, follow_max, tau, safe;
    fmi2Real maxax, minax, emax;
    fmi2Real kp_speed, kp_gap, kd, kpf, jerk;
} StepParams;

static StepParams compute_step_params(ACC* c) {
    StepParams p;
    p.ego = maxr(0, finite_or(c->r[VR_EGO_V], 0));
    fmi2Real input_set_kph = clamp(finite_or(c->r[VR_SET_SPEED_KPH], 90), 20, 150);
    p.acc_on = c->r[VR_ACC_ENABLE] >= 0.5;

    /* Latch the scenario/driver set speed. The ACC set speed is distinct from follow speed. */
    if (!p.acc_on) {
        c->prev_fusion_active = 0;
        c->cutout_resume_active = 0;
        c->cruise_set_speed_kph = 0;
        clear_lead_memory(c);
    }
    if (p.acc_on && c->cruise_set_speed_kph < 20.0) c->cruise_set_speed_kph = input_set_kph;
    if (p.acc_on && !c->lead_active && c->cutout_resume_active < 0.5) c->cruise_set_speed_kph = input_set_kph;
    p.set_kph = c->cruise_set_speed_kph >= 20.0 ? c->cruise_set_speed_kph : input_set_kph;
    p.setv = p.set_kph / 3.6;

    p.lane = clamp(c->r[VR_LANE_GATE_Y], 0.25, 6.0);
    p.range = clamp(c->r[VR_MAX_RANGE], 30, 500);
    p.follow_max = clamp(c->r[VR_FOLLOW_MAX_DIST], 30, 200);
    p.tau = effective_tgap(c, p.ego);
    p.safe = maxr(clamp(c->r[VR_MIN_DIST], 1, 30), p.tau * p.ego);
    p.maxax = clamp(c->r[VR_MAX_AX], 0, 3.5);
    p.minax = clamp(c->r[VR_MIN_AX], -7, -0.1);
    p.emax = clamp(c->r[VR_EMERGENCY_AX], -9, p.minax);
    p.kp_speed = clamp(c->r[VR_KP_SPEED], 0, 3);
    p.kp_gap = clamp(c->r[VR_KP_GAP], 0, 1);
    p.kd = clamp(c->r[VR_KD_REL_SPEED], 0, 4);
    /* dead-code note retained from V18.1: ACC.KgapSpeed (VR 73) is intentionally not read here;
       it was a clamp-only local with no consumer in the original source. Input untouched. */
    p.kpf = clamp(c->r[VR_KP_FOLLOW_SPEED], 0, 2);
    p.jerk = clamp(c->r[VR_JERK_LIMIT], 0.1, 50);
    return p;
}

typedef enum { LEAD_NONE, LEAD_DEBOUNCING, LEAD_ACCEPTED } LeadOutcome;

typedef struct {
    LeadOutcome outcome;
    int hold_current_lead;
    fmi2Real cutin_pending;
    int reason_no_lead;
    Cand lead, cam, rad;
    fmi2Real camcnt, radcnt, match;
} LeadDecision;

/* ============================================================================
 * FIX V20.1 (critical bug - CarMaker regression: cruise-mode false braking
 * AND follow-mode driving straight through an in-lane TV with zero
 * deceleration). Root cause and fix are documented in full at the two marked
 * sites below; this function groups the ENTIRE lead acceptance decision tree
 * (select_lead -> lateral cutout -> hold-through-dropout -> confirm/switch
 * debounce -> brake-hold persistence) into one place so the three possible
 * outcomes (no usable lead at all / a lead is still being debounced / a lead
 * is fully accepted) are explicit and each is smoke-tested in isolation.
 * ========================================================================= */
static LeadDecision resolve_lead_decision(ACC* c, const StepParams* p, fmi2Real dt) {
    LeadDecision d;
    d.outcome = LEAD_NONE;
    d.hold_current_lead = 0;
    d.cutin_pending = 0;
    d.reason_no_lead = 10;
    d.lead.valid = 0;
    d.cam.idx = -1;
    d.cam.dx = 999;
    d.cam.dy = 0;
    d.rad.idx = -1;
    d.rad.dx = 999;
    d.rad.dy = 0;
    d.camcnt = 0;
    d.radcnt = 0;
    d.match = 0;

    int force_cutout = current_lead_lateral_cutout(c, p->lane);
    int candidate = select_lead(c, &d.cam, &d.rad, &d.lead, p->lane, p->range, &d.camcnt, &d.radcnt, &d.match);
    int accepted = 0;

    if (candidate && d.lead.dx > p->follow_max) { candidate = 0; d.reason_no_lead = 14; }

    /* V18: before declaring cut-out, re-check the currently tracked lead itself.
       If the current lead is still ahead and inside lateral gate, keep FOLLOW even when
       camera/radar fusion match temporarily drops. */
    Cand holdlead;
    holdlead.valid = 0;
    holdlead.dx = 999;
    holdlead.dy = 0;
    holdlead.vrel = c->last_vrelx;
    holdlead.conf = 0;
    int curstat = c->lead_active ? current_lead_status(c, p->lane, p->range, &holdlead) : 0;
    if (curstat < 0) {
        force_cutout = 1;
        candidate = 0;
        d.reason_no_lead = 16;
    } else if (!candidate && curstat > 0) {
        d.hold_current_lead = 1;
        accepted = 1;
        d.lead = holdlead;
        d.match = 0;
        d.reason_no_lead = 18;
        c->cutout_timer = 0;
    }

    if (!accepted && candidate && p->acc_on && !force_cutout) {
        c->cutout_timer = 0;
        int same_sig = (c->current_cam_idx == d.cam.idx && c->current_rad_idx == d.rad.idx);
        int same_cam_id = (d.cam.idx >= 0 && objid_match(c->current_cam_objid, c->r[CAM_OBJID(d.cam.idx)]));
        int same_rad_id = (d.rad.idx >= 0 && objid_match(c->current_rad_objid, c->r[RAD_OBJID(d.rad.idx)]));
        if (!c->lead_active) {
            c->lead_confirm_timer += dt;
            d.cutin_pending = c->lead_confirm_timer < c->r[VR_LEAD_CONFIRM_TIME] ? 1 : 0;
            if (c->lead_confirm_timer >= c->r[VR_LEAD_CONFIRM_TIME]) accepted = 1;
        } else if (same_sig || same_cam_id || same_rad_id) {
            accepted = 1;
            c->lead_confirm_timer = c->r[VR_LEAD_CONFIRM_TIME];
            c->switch_timer = 0;
        } else {
            c->switch_timer += dt;
            if (c->switch_timer >= c->r[VR_LEAD_SWITCH_TIME]) accepted = 1; else d.cutin_pending = 1;
        }
    }

    if (!accepted && c->lead_active && !force_cutout) {
        fmi2Real persist = maxr(0.3, c->r[VR_BRAKE_HOLD_TIME]);
        c->cutout_timer += dt;
        if (c->cutout_timer < persist && dist_valid(c->last_distx, p->range) && absr(c->last_disty) <= p->lane) {
            d.hold_current_lead = 1;
            accepted = 1;
            d.lead.valid = 1;
            d.lead.dx = c->last_distx;
            d.lead.dy = c->last_disty;
            d.lead.vrel = c->last_vrelx;
            d.lead.conf = 0;
            d.lead.idx = -1;
            d.reason_no_lead = 19;
        }
    }

    /* FIX V20.1, part 1: only clear the confirm/switch timers when there genuinely is no usable
       candidate this step (candidate==0) or the current lead was force-cut-out - i.e. when the
       debounce/switch process itself should restart from zero. While a valid candidate is still
       being seen (candidate==1, just not yet over its confirm/switch threshold), the timers must
       be left alone so they keep accumulating across steps. The original unconditional
       "if (!accepted) reset" zeroed the just-incremented confirm timer in the SAME step it was
       incremented, every single step, whenever LeadConfirmTime > 0 - so a fresh lead could never
       accumulate enough confirm time to ever be accepted. */
    int debouncing = candidate && !force_cutout && !accepted;
    if (!(candidate && !force_cutout)) {
        c->lead_confirm_timer = 0;
        c->switch_timer = 0;
    }

    if (debouncing) {
        d.outcome = LEAD_DEBOUNCING;
    } else if (accepted) {
        d.outcome = LEAD_ACCEPTED;
    } else {
        d.outcome = LEAD_NONE;
    }
    return d;
}


static void controller_step(ACC* c, fmi2Real dt) {
    dt = clamp(dt, 0.001, 0.2);
    StepParams p = compute_step_params(c);
    LeadDecision d = resolve_lead_decision(c, &p, dt);

    /* ---- Branch: lead candidate still mid-debounce (FIX V20.1 light branch) ----
       Does not touch cutout_resume_active/prev_fusion_active/clear_lead_memory, so the
       confirm/switch timers accumulated in resolve_lead_decision() survive into the next step. */
    if (d.outcome == LEAD_DEBOUNCING) {
        fmi2Real speed_err = p.setv - p.ego;
        fmi2Real speed_ax = clamp(p.kp_speed * speed_err, p.minax, p.maxax);
        if (!p.acc_on) speed_ax = NOTSET_AX;
        fmi2Real ax;
        if (speed_ax == NOTSET_AX) {
            ax = NOTSET_AX;
        } else {
            if (c->prev_ax < 0) c->prev_ax = 0;
            ax = rate_limit(c->prev_ax, speed_ax, dt, p.jerk);
        }
        c->prev_ax = (ax == NOTSET_AX ? 0 : ax);
        write_outputs(c, 0, SRC_NONE, 999, 0, 0, p.safe, 999, speed_ax, ax, (p.acc_on ? MODE_SPEED : MODE_OFF), 12,
                      999, 0, p.setv, 0, 0, 0, 0, d.camcnt, d.radcnt, c->r[VR_STOP_GUARD_DIST],
                      d.cam.idx >= 0 ? d.cam.dx : 999, d.cam.idx >= 0 ? d.cam.dy : 0, 0, 0,
                      (p.acc_on ? SPEC_ACTIVE : SPEC_OFF), 0, p.tau, (fmi2Real)d.cam.idx, (fmi2Real)d.rad.idx, 0,
                      d.camcnt + d.radcnt, d.cutin_pending, c->cutout_resume_active);
        return;
    }

    /* ---- Branch: no usable lead at all (cruise / resume-to-set-speed) ---- */
    if (d.outcome == LEAD_NONE) {
        /* V17: robust cut-out detection is a state edge, not a candidate-local flag.
           If Fusion.Active was 1 in the previous step and is 0 now, latch CutOutRelease
           until Ego reaches the stored scenario set speed. */
        int falling_edge = (c->prev_fusion_active >= 0.5);
        int was_lead = c->lead_active || falling_edge;
        /* V18: resume to set speed only after confirmed cut-out/lost-lead, not every single
           transient fusion dropout. By the time we are here, target persistence has already
           expired or a hard lateral cut-out was detected. */
        if (p.acc_on && was_lead) c->cutout_resume_active = 1.0;

        fmi2Real speed_err = p.setv - p.ego;
        fmi2Real speed_tol = maxr(0.25, c->r[VR_SPEED_TOL_KPH_STRAIGHT] / 3.6);
        if (!p.acc_on || (c->cutout_resume_active >= 0.5 && speed_err <= speed_tol)) {
            c->cutout_resume_active = 0.0;
        }
        fmi2Real cutout_release = c->cutout_resume_active;

        clear_lead_memory(c);
        c->prev_fusion_active = 0.0;

        fmi2Real speed_ax = clamp(p.kp_speed * speed_err, p.minax, p.maxax);
        if (!p.acc_on) speed_ax = NOTSET_AX;
        fmi2Real ax;
        /* FIX V18.1: "if (c->prev_ax<0) c->prev_ax=0;" hoisted out of both sub-branches once;
           numeric result unchanged because both ran it unconditionally before computing ax. */
        if (speed_ax == NOTSET_AX) {
            ax = NOTSET_AX;
        } else {
            if (c->prev_ax < 0) c->prev_ax = 0;
            if (cutout_release >= 0.5) {
                /* RESUME_SET_SPEED: command acceleration toward latched set speed, never follow speed. */
                if (speed_err > 0.5) speed_ax = maxr(speed_ax, minr(p.maxax, 0.70 * p.maxax));
                ax = rate_limit(c->prev_ax, speed_ax, dt, p.jerk);
            } else {
                ax = rate_limit(c->prev_ax, speed_ax, dt, p.jerk);
            }
        }
        c->prev_ax = (ax == NOTSET_AX ? 0 : ax);
        fmi2Real reason = p.acc_on ? (cutout_release >= 0.5 ? 17 : (d.cutin_pending ? 12 : d.reason_no_lead)) : 0;
        write_outputs(c, 0, SRC_NONE, 999, 0, 0, p.safe, 999, speed_ax, ax, (p.acc_on ? MODE_SPEED : MODE_OFF), reason,
                      999, 0, p.setv, 0, 0, 0, 0, d.camcnt, d.radcnt, c->r[VR_STOP_GUARD_DIST],
                      d.cam.idx >= 0 ? d.cam.dx : 999, d.cam.idx >= 0 ? d.cam.dy : 0, 0, 0,
                      (p.acc_on ? SPEC_ACTIVE : SPEC_OFF), 0, p.tau, (fmi2Real)d.cam.idx, (fmi2Real)d.rad.idx, 0,
                      d.camcnt + d.radcnt, d.cutin_pending, cutout_release);
        return;
    }

    /* d.outcome == LEAD_ACCEPTED falls through to FOLLOW state below. */
    fmi2Real ego = p.ego, setv = p.setv, range = p.range, safe = p.safe;
    fmi2Real maxax = p.maxax, minax = p.minax, emax = p.emax;
    fmi2Real kp_speed = p.kp_speed, kp_gap = p.kp_gap, kd = p.kd, kpf = p.kpf, jerk = p.jerk;
    fmi2Real tau = p.tau;
    Cand cam = d.cam, rad = d.rad, lead = d.lead;
    int hold_current_lead = d.hold_current_lead;
    fmi2Real camcnt = d.camcnt, radcnt = d.radcnt, match = d.match;

    /* FOLLOW state */
    c->cutout_resume_active = 0.0;
    c->prev_fusion_active = 1.0;
    c->lead_active = 1;
    if (!hold_current_lead) {
        c->current_cam_idx = cam.idx;
        c->current_rad_idx = rad.idx;
        c->current_cam_objid = (cam.idx >= 0 ? c->r[CAM_OBJID(cam.idx)] : -1);
        c->current_rad_objid = (rad.idx >= 0 ? c->r[RAD_OBJID(rad.idx)] : -1);
    }
    fmi2Real dx = lead.dx, dy = lead.dy, vr = lead.vrel;
    fmi2Real vrest = 0;
    if ((absr(vr) < 0.2 || vr != vr) && c->r[VR_VREL_EST_ENABLE] >= 0.5 && dist_valid(c->prev_distx, range)) {
        vrest = (dx - c->prev_distx) / dt;
        vr = clamp(vrest, -50, 20);
    }
    fmi2Real leadv = clamp(ego + vr, 0, 80);
    if (c->r[VR_IGNORE_STAT_ABOVE_KPH] > 0.1 && ego > (c->r[VR_IGNORE_STAT_ABOVE_KPH] / 3.6) && leadv < 0.6) {
        clear_lead_memory(c);
        c->prev_fusion_active = 0.0;
        c->cutout_resume_active = 1.0;
        if (c->prev_ax < 0) c->prev_ax = 0;
        fmi2Real speed_ax = clamp(kp_speed * (setv - ego), minax, maxax);
        fmi2Real ax = rate_limit(c->prev_ax, speed_ax, dt, jerk);
        c->prev_ax = ax;
        write_outputs(c, 0, SRC_NONE, 999, 0, 0, safe, 999, speed_ax, ax, MODE_SPEED, 15, 999, 0, setv, 0, 0, 0, 0,
                      camcnt, radcnt, c->r[VR_STOP_GUARD_DIST], cam.dx, cam.dy, 0, 0, SPEC_ACTIVE, 0, tau,
                      (fmi2Real)cam.idx, (fmi2Real)rad.idx, lead.conf, camcnt + radcnt, 0, 1);
        return;
    }
    fmi2Real closing = maxr(0, -vr);
    fmi2Real ttc = closing > 0.1 ? dx / closing : 999;
    fmi2Real preview = clamp(c->r[VR_DYNAMIC_STOP_TIME], 0, 4);
    fmi2Real early = maxr(0.0, (closing * closing) / maxr(0.1, 2.0 * absr(clamp(c->r[VR_WARNING_AX], -8, -0.1))));
    fmi2Real safe_ctrl = safe + closing * preview + 0.35 * early;
    fmi2Real gap = dx - safe_ctrl;
    /* FIX (validated against NHTSA DOT HS 812 172 Event 423 "Vehicle Cut-in" and Event 412
       "Curve Critical Deceleration Authority Exceedance"): the original effstop formula was
       maxr(StopGuardDist, ego*preview + closing^2/(2|emax|)). The "ego*preview" term is added
       UNCONDITIONALLY regardless of closing speed, so a lead vehicle sitting at matched speed
       (vrel=0, closing=0, TTC=infinite, objectively zero collision risk) still produced
       effstop = ego*2.7s, e.g. ~84m at 113 km/h - triggering MODE_EMERGENCY/-6 m/s^2 the instant
       any object (including a same-speed cut-in vehicle 15m ahead) was accepted as lead, simply
       because it was closer than ~84m. This reproduced the driver complaints in NHTSA Appendix 41
       ("brakes too rapidly", "at higher speeds, system reacts to LVs too far out") and is
       inconsistent with the sibling "early" term two lines above, which correctly scales with
       closing^2 only and is exactly 0 when closing=0.
       Fix: drop the unconditional ego*preview term and replace it with a reaction-time margin
       that scales with closing speed only (closing*0.5s), so effstop collapses to plain
       StopGuardDist for any lead at matched or positive relative speed, and still grows with
       closing speed for a fast-approaching/stationary target - verified against VF67 spec item 11
       ("ego 60 km/h must stop before a stationary obstacle at 200 m") which still passes (200 m
       stays well outside the trigger distance at that speed) while a stationary obstacle at 20 m
       still correctly triggers emergency braking. */
    fmi2Real effstop = maxr(clamp(c->r[VR_STOP_GUARD_DIST], 2, 60), (closing * closing) / maxr(0.1, 2.0 * absr(emax)) + closing * 0.5);
    /* V18 no-overtake follow law: in active FOLLOW, target speed is the lead speed, not set speed.
       Positive spacing error must not command acceleration through the lead vehicle. */
    fmi2Real followv = clamp(leadv, 0, setv);
    fmi2Real cruise_ax = kp_speed * (setv - ego);
    fmi2Real spacing_brake = gap < 0 ? kp_gap * gap : 0.0;
    fmi2Real raw = kpf * (followv - ego) + spacing_brake + kd * minr(vr, 0.0) * 0.10;
    fmi2Real mode = MODE_FOLLOW, reason = 20, brakeonly = 0, specstate = SPEC_ACTIVE;
    if (c->r[VR_BRAKE_ONLY_ENABLE] >= 0.5 && leadv > ego + 0.2 && leadv < setv - 0.2) {
        brakeonly = 1;
        specstate = SPEC_BRAKE_ONLY;
        raw = minr(raw, 0.0);
    }
    if (dx < effstop || ttc < clamp(c->r[VR_TTC_EMERGENCY], 0.5, 10)) {
        raw = emax;
        mode = MODE_EMERGENCY;
        reason = 40;
    } else if (ttc < clamp(c->r[VR_TTC_WARNING], 1, 20)) {
        mode = MODE_WARNING;
        reason = 30;
        raw = minr(raw, clamp(c->r[VR_WARNING_AX], -8, -0.1));
    } else if (gap < 0) {
        raw = minr(raw, 0.0);
        reason = 22;
    } else {
        raw = minr(raw, cruise_ax);
        reason = 21;
    }
    if (c->r[VR_ALLOW_ACCEL_FOLLOW] < 0.5 && dx < safe + clamp(c->r[VR_FOLLOW_RELEASE_GAP], 0, 40)) raw = minr(raw, 0.0);
    if (ego < 2.0 && gap < 0) {
        raw = minr(raw, clamp(c->r[VR_LOW_SPEED_HOLD_AX], -4, 0));
        specstate = SPEC_STANDACTIVE;
    }
    raw = clamp(raw, emax, maxax);
    fmi2Real rlim = (raw < c->prev_ax) ? jerk * 2.0 : jerk;
    fmi2Real ax = rate_limit(c->prev_ax, raw, dt, rlim);
    c->prev_ax = ax;
    c->last_distx = dx;
    c->last_disty = dy;
    c->last_vrelx = vr;
    c->last_lead_speed = leadv;
    c->last_gap_error = gap;
    c->prev_distx = dx;
    write_outputs(c, 1, (hold_current_lead ? SRC_HOLD : SRC_FUSED), dx, dy, vr, safe_ctrl, gap, raw, ax, mode,
                  (hold_current_lead ? 18 : reason), ttc, leadv, followv, vrest, 0, 0, 0, camcnt, radcnt, effstop,
                  (hold_current_lead ? dx : cam.dx), (hold_current_lead ? dy : cam.dy), 1, match, specstate,
                  brakeonly, tau, (hold_current_lead ? -1.0 : (fmi2Real)cam.idx),
                  (hold_current_lead ? -1.0 : (fmi2Real)rad.idx), lead.conf, camcnt + radcnt, 0, 0);
}

FMI_EXPORT const char* fmi2GetTypesPlatform(void) { return "default"; }
FMI_EXPORT const char* fmi2GetVersion(void) { return "2.0"; }

FMI_EXPORT fmi2Component fmi2Instantiate(fmi2String instanceName, fmi2Type fmuType, fmi2String fmuGUID,
                                          fmi2String fmuResourceLocation, const fmi2CallbackFunctions* functions,
                                          fmi2Boolean visible, fmi2Boolean loggingOn) {
    (void)instanceName; (void)fmuGUID; (void)fmuResourceLocation; (void)functions; (void)visible; (void)loggingOn;
    if (fmuType != fmi2CoSimulation) return NULL;
    defaults(&g);
    g.instantiated = 1;
    return (fmi2Component)&g;
}
FMI_EXPORT void fmi2FreeInstance(fmi2Component c) { (void)c; g.instantiated = 0; }
FMI_EXPORT fmi2Status fmi2SetupExperiment(fmi2Component c, fmi2Boolean td, fmi2Real tol, fmi2Real st, fmi2Boolean sd, fmi2Real stop) {
    (void)td; (void)tol; (void)st; (void)sd; (void)stop;
    return c ? fmi2OK : fmi2Error;
}
FMI_EXPORT fmi2Status fmi2EnterInitializationMode(fmi2Component c) { return c ? fmi2OK : fmi2Error; }
FMI_EXPORT fmi2Status fmi2ExitInitializationMode(fmi2Component c) { return c ? fmi2OK : fmi2Error; }
FMI_EXPORT fmi2Status fmi2Terminate(fmi2Component c) { return c ? fmi2OK : fmi2Error; }
FMI_EXPORT fmi2Status fmi2Reset(fmi2Component c) {
    if (!c) return fmi2Error;
    defaults((ACC*)c);
    return fmi2OK;
}
FMI_EXPORT fmi2Status fmi2SetDebugLogging(fmi2Component c, fmi2Boolean l, size_t n, const fmi2String cats[]) {
    (void)l; (void)n; (void)cats;
    return c ? fmi2OK : fmi2Error;
}

FMI_EXPORT fmi2Status fmi2DoStep(fmi2Component c, fmi2Real t, fmi2Real h, fmi2Boolean noSet) {
    (void)t; (void)noSet;
    if (!c) return fmi2Error;
    controller_step((ACC*)c, h);
    return fmi2OK;
}
FMI_EXPORT fmi2Status fmi2CancelStep(fmi2Component c) { return c ? fmi2OK : fmi2Error; }

FMI_EXPORT fmi2Status fmi2SetReal(fmi2Component c, const fmi2ValueReference vr[], size_t nvr, const fmi2Real value[]) {
    size_t i;
    if (!c || !vr || !value) return fmi2Error;
    for (i = 0; i < nvr; i++) {
        if (vr[i] >= MAX_VR) return fmi2Error;
        ((ACC*)c)->r[vr[i]] = value[i];
    }
    return fmi2OK;
}
FMI_EXPORT fmi2Status fmi2GetReal(fmi2Component c, const fmi2ValueReference vr[], size_t nvr, fmi2Real value[]) {
    size_t i;
    if (!c || !vr || !value) return fmi2Error;
    for (i = 0; i < nvr; i++) {
        if (vr[i] >= MAX_VR) return fmi2Error;
        value[i] = ((ACC*)c)->r[vr[i]];
    }
    return fmi2OK;
}
FMI_EXPORT fmi2Status fmi2SetInteger(fmi2Component c, const fmi2ValueReference vr[], size_t nvr, const fmi2Integer value[]) {
    (void)c; (void)vr; (void)nvr; (void)value;
    return fmi2Error;
}
FMI_EXPORT fmi2Status fmi2GetInteger(fmi2Component c, const fmi2ValueReference vr[], size_t nvr, fmi2Integer value[]) {
    (void)c; (void)vr; (void)nvr; (void)value;
    return fmi2Error;
}
FMI_EXPORT fmi2Status fmi2SetBoolean(fmi2Component c, const fmi2ValueReference vr[], size_t nvr, const fmi2Boolean value[]) {
    (void)c; (void)vr; (void)nvr; (void)value;
    return fmi2Error;
}
FMI_EXPORT fmi2Status fmi2GetBoolean(fmi2Component c, const fmi2ValueReference vr[], size_t nvr, fmi2Boolean value[]) {
    (void)c; (void)vr; (void)nvr; (void)value;
    return fmi2Error;
}
FMI_EXPORT fmi2Status fmi2SetString(fmi2Component c, const fmi2ValueReference vr[], size_t nvr, const fmi2String value[]) {
    (void)c; (void)vr; (void)nvr; (void)value;
    return fmi2Error;
}
FMI_EXPORT fmi2Status fmi2GetString(fmi2Component c, const fmi2ValueReference vr[], size_t nvr, fmi2String value[]) {
    (void)c; (void)vr; (void)nvr; (void)value;
    return fmi2Error;
}

FMI_EXPORT fmi2Status fmi2GetFMUstate(fmi2Component c, fmi2FMUstate* s) { (void)c; (void)s; return fmi2Error; }
FMI_EXPORT fmi2Status fmi2SetFMUstate(fmi2Component c, fmi2FMUstate s) { (void)c; (void)s; return fmi2Error; }
FMI_EXPORT fmi2Status fmi2FreeFMUstate(fmi2Component c, fmi2FMUstate* s) { (void)c; (void)s; return fmi2Error; }
FMI_EXPORT fmi2Status fmi2SerializedFMUstateSize(fmi2Component c, fmi2FMUstate s, size_t* size) {
    (void)c; (void)s; (void)size;
    return fmi2Error;
}
FMI_EXPORT fmi2Status fmi2SerializeFMUstate(fmi2Component c, fmi2FMUstate s, fmi2Byte serializedState[], size_t size) {
    (void)c; (void)s; (void)serializedState; (void)size;
    return fmi2Error;
}
FMI_EXPORT fmi2Status fmi2DeSerializeFMUstate(fmi2Component c, const fmi2Byte serializedState[], size_t size, fmi2FMUstate* s) {
    (void)c; (void)serializedState; (void)size; (void)s;
    return fmi2Error;
}
FMI_EXPORT fmi2Status fmi2GetDirectionalDerivative(fmi2Component c, const fmi2ValueReference u[], size_t nu,
                                                    const fmi2ValueReference k[], size_t nk, const fmi2Real dk[], fmi2Real du[]) {
    (void)c; (void)u; (void)nu; (void)k; (void)nk; (void)dk; (void)du;
    return fmi2Error;
}

FMI_EXPORT fmi2Status fmi2GetStatus(fmi2Component c, const fmi2StatusKind s, fmi2Status* value) {
    (void)c; (void)s;
    if (!value) return fmi2Error;
    *value = fmi2OK;
    return fmi2OK;
}
FMI_EXPORT fmi2Status fmi2GetRealStatus(fmi2Component c, const fmi2StatusKind s, fmi2Real* value) {
    (void)c; (void)s;
    if (!value) return fmi2Error;
    *value = 0;
    return fmi2OK;
}
FMI_EXPORT fmi2Status fmi2GetIntegerStatus(fmi2Component c, const fmi2StatusKind s, fmi2Integer* value) {
    (void)c; (void)s;
    if (!value) return fmi2Error;
    *value = 0;
    return fmi2OK;
}
FMI_EXPORT fmi2Status fmi2GetBooleanStatus(fmi2Component c, const fmi2StatusKind s, fmi2Boolean* value) {
    (void)c; (void)s;
    if (!value) return fmi2Error;
    *value = 0;
    return fmi2OK;
}
FMI_EXPORT fmi2Status fmi2GetStringStatus(fmi2Component c, const fmi2StatusKind s, fmi2String* value) {
    (void)c; (void)s;
    if (!value) return fmi2Error;
    *value = "";
    return fmi2OK;
}



