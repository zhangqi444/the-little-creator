// VEX U TeleOp driver-control skeleton (PROS framework, VEX V5 hardware).
//
// Drop into src/opcontrol.cpp. Tune motor ports, DEADBAND, and gearset
// constants for your robot. Pairs with autonomous-base.cpp.
//
// VEX U context:
//   - Drivetrain: 6-motor tank (3L + 3R) with arcade control option.
//   - No pneumatics limit / robot size limit -> add subsystems as needed.
//   - Each robot on the alliance uses a separate controller (master + partner).
//   - Driver control: 105 seconds after the Autonomous Period.
//   - Partner controller can drive a subsystem (e.g., lift) independently.

#include "main.h"
#include <cmath>
#include <algorithm>

namespace {

// ── Hardware ──────────────────────────────────────────────────────────────────

pros::Motor left_front (1, pros::E_MOTOR_GEARSET_18, false);
pros::Motor left_mid   (2, pros::E_MOTOR_GEARSET_18, false);
pros::Motor left_back  (3, pros::E_MOTOR_GEARSET_18, false);
pros::Motor right_front(4, pros::E_MOTOR_GEARSET_18, true);  // reversed
pros::Motor right_mid  (5, pros::E_MOTOR_GEARSET_18, true);  // reversed
pros::Motor right_back (6, pros::E_MOTOR_GEARSET_18, true);  // reversed

// Subsystem motors (examples - replace with your actual hardware)
pros::Motor lift       (7,  pros::E_MOTOR_GEARSET_36, false); // 100 RPM red cartridge
pros::Motor intake     (8,  pros::E_MOTOR_GEARSET_18, false);

// Master controller drives the robot; partner controller operates the lift.
pros::Controller master (pros::E_CONTROLLER_MASTER);
pros::Controller partner(pros::E_CONTROLLER_PARTNER);

// ── Constants ─────────────────────────────────────────────────────────────────

constexpr int DEADBAND   = 10;   // ignore joystick values below this
constexpr int LIFT_SPEED = 100;  // -127..127
constexpr int INTAKE_SPD = 127;

// ── Helpers ───────────────────────────────────────────────────────────────────

inline int deadband(int v, int t = DEADBAND) {
    return (std::abs(v) < t) ? 0 : v;
}

void set_left(int p) {
    left_front.move(p);
    left_mid.move(p);
    left_back.move(p);
}

void set_right(int p) {
    right_front.move(p);
    right_mid.move(p);
    right_back.move(p);
}

} // namespace

// Called by PROS once driver-control starts
void opcontrol() {
    while (true) {
        // ── Drivetrain: tank control (master left/right sticks) ──────────
        int left_pwr  = deadband(master.get_analog(pros::E_CONTROLLER_ANALOG_LEFT_Y));
        int right_pwr = deadband(master.get_analog(pros::E_CONTROLLER_ANALOG_RIGHT_Y));

        // Slow-mode: hold master X button for 40% power (precision tasks)
        if (master.get_digital(pros::E_CONTROLLER_DIGITAL_X)) {
            left_pwr  = left_pwr  * 2 / 5;
            right_pwr = right_pwr * 2 / 5;
        }

        set_left (left_pwr);
        set_right(right_pwr);

        // ── Intake: master R1/R2 ─────────────────────────────────────────
        if (master.get_digital(pros::E_CONTROLLER_DIGITAL_R1)) {
            intake.move( INTAKE_SPD);  // in
        } else if (master.get_digital(pros::E_CONTROLLER_DIGITAL_R2)) {
            intake.move(-INTAKE_SPD);  // out
        } else {
            intake.move(0);
        }

        // ── Lift: partner L1/L2 (independent operator) ───────────────────
        // In VEX U it is common to have a dedicated subsystem operator.
        if (partner.get_digital(pros::E_CONTROLLER_DIGITAL_L1)) {
            lift.move( LIFT_SPEED);   // up
        } else if (partner.get_digital(pros::E_CONTROLLER_DIGITAL_L2)) {
            lift.move(-LIFT_SPEED);   // down
        } else {
            lift.move(0);             // hold (motor brake mode)
        }

        // ── Rumble feedback: master B confirms autonomous route set ───────
        static bool b_prev = false;
        bool b_now = master.get_digital(pros::E_CONTROLLER_DIGITAL_B);
        if (b_now && !b_prev) {
            master.rumble(".");    // single short rumble
        }
        b_prev = b_now;

        pros::delay(20);
    }
}
