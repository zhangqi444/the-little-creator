// VEX V5 TeleOp driver-control skeleton (PROS framework).
//
// Drop into src/opcontrol.cpp. Tune motor ports and DEADBAND for your robot.
// Pairs with autonomous-base.cpp which covers the autonomous() half.
//
// Drivetrain layout: 4-motor tank (left front/back + right front/back).
// Optional: arm motor on port 5, claw motor on port 6.
//
// Controller axes (Logitech-style layout on V5 Controller):
//   Axis3 = left stick Y  (forward/back for left side)
//   Axis2 = right stick Y (forward/back for right side)
//
// Competition template: PROS calls opcontrol() when the field controller
// signals driver-control mode. autonomous() is in autonomous-base.cpp.

#include "main.h"

namespace {

// ── Hardware configuration ────────────────────────────────────────────────────

pros::Motor left_front (1, pros::E_MOTOR_GEARSET_18, false);
pros::Motor left_back  (2, pros::E_MOTOR_GEARSET_18, false);
pros::Motor right_front(3, pros::E_MOTOR_GEARSET_18, true);   // reversed
pros::Motor right_back (4, pros::E_MOTOR_GEARSET_18, true);   // reversed
pros::Motor arm        (5, pros::E_MOTOR_GEARSET_36, false);  // 100 RPM cartridge
pros::Motor claw       (6, pros::E_MOTOR_GEARSET_36, false);

pros::Controller controller(pros::E_CONTROLLER_MASTER);

// ── Constants ─────────────────────────────────────────────────────────────────

// Joystick values below this are treated as zero (avoids drift at rest).
constexpr int DEADBAND = 10;

// Arm / claw speeds as a percentage of max motor voltage (0-127).
constexpr int ARM_SPEED  = 80;
constexpr int CLAW_SPEED = 60;

// ── Helpers ───────────────────────────────────────────────────────────────────

// Apply deadband: return 0 if |value| < threshold, else return value.
inline int deadband(int value, int threshold = DEADBAND) {
    return (std::abs(value) < threshold) ? 0 : value;
}

// Set left-side drive motors to a voltage (-127 to 127).
void set_left(int power) {
    left_front.move(power);
    left_back.move(power);
}

// Set right-side drive motors to a voltage (-127 to 127).
void set_right(int power) {
    right_front.move(power);
    right_back.move(power);
}

}  // namespace


// ── opcontrol — called by PROS once driver-control starts ─────────────────────

void opcontrol() {
    while (true) {
        // ── Drivetrain: tank drive ─────────────────────────────────────────
        // Each joystick axis controls one side independently.
        // Scale from controller range (-127..127) directly to motor move().
        int left_power  = deadband(controller.get_analog(pros::E_CONTROLLER_ANALOG_LEFT_Y));
        int right_power = deadband(controller.get_analog(pros::E_CONTROLLER_ANALOG_RIGHT_Y));

        set_left(left_power);
        set_right(right_power);

        // ── Arm: L1/L2 buttons ────────────────────────────────────────────
        if (controller.get_digital(pros::E_CONTROLLER_DIGITAL_L1)) {
            arm.move(ARM_SPEED);       // raise
        } else if (controller.get_digital(pros::E_CONTROLLER_DIGITAL_L2)) {
            arm.move(-ARM_SPEED);      // lower
        } else {
            arm.move(0);               // hold in place (motor brake mode)
        }

        // ── Claw: R1/R2 buttons ───────────────────────────────────────────
        if (controller.get_digital(pros::E_CONTROLLER_DIGITAL_R1)) {
            claw.move(CLAW_SPEED);     // open
        } else if (controller.get_digital(pros::E_CONTROLLER_DIGITAL_R2)) {
            claw.move(-CLAW_SPEED);    // close
        } else {
            claw.move(0);
        }

        // ── Slow-mode: hold A for 50% speed ──────────────────────────────
        // Useful when lining up precisely during endgame or near goals.
        if (controller.get_digital(pros::E_CONTROLLER_DIGITAL_A)) {
            set_left(left_power / 2);
            set_right(right_power / 2);
        }

        // ── Rumble feedback: B to confirm action ──────────────────────────
        // Example: press B to confirm a button-activated sub-routine is ready.
        // Replace with your own trigger logic.
        static bool b_prev = false;
        bool b_now = controller.get_digital(pros::E_CONTROLLER_DIGITAL_B);
        if (b_now && !b_prev) {
            controller.rumble(".");    // single short rumble
        }
        b_prev = b_now;

        // ── Loop delay (required by PROS scheduler) ───────────────────────
        pros::delay(20);
    }
}
