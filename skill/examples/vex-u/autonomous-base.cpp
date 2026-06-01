// VEX U autonomous skeleton — 6-motor drivetrain with IMU heading correction
// (PROS framework, VEX V5 hardware).
//
// Drop into src/autonomous.cpp. Tune WHEEL_DIAMETER_IN, GEAR_RATIO, and
// TRACK_WIDTH_IN for your specific robot before relying on distance/turn helpers.
//
// VEX U context:
//   - Two robots per alliance. Each robot runs its own PROS project.
//   - No size/weight limits -> larger drivetrains are common; tune accordingly.
//   - Engineering notebook documents design decisions, code, and testing data.
//   - VURC Autonomous Period: 15 seconds; coordinate your two robots via
//     pre-agreed routine sequencing (real-time V5 Radio comms is advanced use).

#include "main.h"
#include <cmath>
#include <algorithm>

namespace {

// Tune per robot
constexpr double WHEEL_DIAMETER_IN = 3.25;  // 3.25" omni-wheel
constexpr double GEAR_RATIO        = 0.6;   // motor revs per wheel rev (36:60)
constexpr double TICKS_PER_REV     = 360.0; // V5 green cartridge (200 RPM)

// 6-motor west-coast / tank drivetrain (3L + 3R)
pros::Motor left_front (1, pros::E_MOTOR_GEARSET_18, false);
pros::Motor left_mid   (2, pros::E_MOTOR_GEARSET_18, false);
pros::Motor left_back  (3, pros::E_MOTOR_GEARSET_18, false);
pros::Motor right_front(4, pros::E_MOTOR_GEARSET_18, true);  // reversed
pros::Motor right_mid  (5, pros::E_MOTOR_GEARSET_18, true);  // reversed
pros::Motor right_back (6, pros::E_MOTOR_GEARSET_18, true);  // reversed

// V5 IMU - mount centrally, aligned with drive direction
pros::Imu imu(20);

double inches_to_ticks(double inches) {
    const double revs = inches / (WHEEL_DIAMETER_IN * M_PI);
    return revs * GEAR_RATIO * TICKS_PER_REV;
}

double normalize_angle(double angle) {
    while (angle >  180.0) angle -= 360.0;
    while (angle < -180.0) angle += 360.0;
    return angle;
}

void set_left(int power) {
    left_front.move(power);
    left_mid.move(power);
    left_back.move(power);
}

void set_right(int power) {
    right_front.move(power);
    right_mid.move(power);
    right_back.move(power);
}

void stop_drive() { set_left(0); set_right(0); }

// Straight drive with IMU heading correction (P-control)
void drive_inches(double inches, int32_t base_speed = 80) {
    const double target  = inches_to_ticks(std::abs(inches));
    const int    sign    = (inches >= 0) ? 1 : -1;
    const double heading = imu.get_rotation();
    constexpr double KP  = 0.6;

    left_front.tare_position();

    while (std::abs(left_front.get_position()) < target) {
        double error     = normalize_angle(heading - imu.get_rotation());
        int    corr      = static_cast<int>(KP * error);
        set_left (sign * base_speed + corr);
        set_right(sign * base_speed - corr);
        pros::delay(10);
    }
    stop_drive();
}

// Point-turn to absolute heading (degrees, CCW positive)
void turn_to_heading(double target_deg, int32_t speed = 60) {
    constexpr double TOL = 2.0;
    constexpr double KP  = 1.5;
    double error = normalize_angle(target_deg - imu.get_rotation());

    while (std::abs(error) > TOL) {
        double raw  = KP * error;
        int    pwr  = static_cast<int>(std::clamp(raw, -(double)speed, (double)speed));
        set_left( pwr);
        set_right(-pwr);
        pros::delay(10);
        error = normalize_angle(target_deg - imu.get_rotation());
    }
    stop_drive();
}

} // namespace

// Called by PROS during Autonomous Period (15 s for VURC)
void autonomous() {
    while (imu.is_calibrating()) { pros::delay(20); }

    // Replace with your actual scoring routine:
    drive_inches(24.0);     // forward 24"
    pros::delay(200);
    turn_to_heading(90.0);  // turn 90 right
    pros::delay(200);
    drive_inches(18.0);
    pros::delay(200);
    turn_to_heading(0.0);   // re-align to start heading
}

// Called once on power-on
void initialize() {
    imu.reset();       // calibration ~2 s; completes before autonomous() runs
    pros::delay(2200);
}
