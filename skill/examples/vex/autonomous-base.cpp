// VEX V5 autonomous skeleton for a 4-motor tank drive (PROS framework).
//
// Drop into src/autonomous.cpp. Tune WHEEL_DIAMETER and GEAR_RATIO for your
// drivetrain before relying on the distance helpers.

#include "main.h"
#include <cmath>

namespace {

constexpr double WHEEL_DIAMETER_IN = 4.0;
constexpr double GEAR_RATIO        = 1.0;    // motor revs per wheel rev
constexpr double TICKS_PER_REV     = 360.0;  // V5 green cartridge

pros::Motor left_front (1, pros::E_MOTOR_GEARSET_18, false);
pros::Motor left_back  (2, pros::E_MOTOR_GEARSET_18, false);
pros::Motor right_front(3, pros::E_MOTOR_GEARSET_18, true);
pros::Motor right_back (4, pros::E_MOTOR_GEARSET_18, true);

double inches_to_ticks(double inches) {
    const double revs = inches / (WHEEL_DIAMETER_IN * M_PI);
    return revs * GEAR_RATIO * TICKS_PER_REV;
}

void drive(int32_t velocity_pct) {
    left_front.move(velocity_pct);
    left_back.move(velocity_pct);
    right_front.move(velocity_pct);
    right_back.move(velocity_pct);
}

void drive_inches(double inches, int32_t velocity_pct = 60) {
    const double target = inches_to_ticks(std::abs(inches));
    const int32_t signed_pct = inches >= 0 ? velocity_pct : -velocity_pct;
    left_front.tare_position();
    drive(signed_pct);
    while (std::abs(left_front.get_position()) < target) {
        pros::delay(10);
    }
    drive(0);
}

}  // namespace

void autonomous() {
    drive_inches(24.0);    // forward 24"
    pros::delay(250);
    drive_inches(-12.0);   // back 12"
}
