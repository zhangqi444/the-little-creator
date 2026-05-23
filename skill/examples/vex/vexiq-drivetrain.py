"""VEX IQ Python drivetrain basics — VEXcode IQ Python API.

Common autonomous movement patterns for VEX IQ robots using the
official VEXcode IQ Python API. Works in VEXcode IQ (web or desktop).

Hardware assumed:
  - Left drive motor on port 1 (reversed)
  - Right drive motor on port 6
  - Inertial sensor on port 4 (for gyro-corrected driving)
  - Drivetrain gear ratio: 1:1, wheel diameter: 200mm (adjust to yours)

Notes:
  - All distance units in mm unless noted
  - Speeds in percent (0–100)
  - For VEX IQ Gen 2 brain; Gen 1 uses identical API
"""

from vex import *

# ── Hardware setup ────────────────────────────────────────────────────────────
brain    = Brain()
left_motor   = Motor(Ports.PORT1, True)   # True = reversed
right_motor  = Motor(Ports.PORT6, False)
inertial     = Inertial(Ports.PORT4)

drivetrain = SmartDrive(left_motor, right_motor, inertial,
                        200,   # wheel travel in mm (wheel circumference)
                        230,   # track width in mm (center to center)
                        165,   # wheelbase in mm (front to back)
                        MM)

# Calibrate inertial sensor at startup — takes ~2 seconds
inertial.calibrate()
while inertial.is_calibrating():
    wait(50, MSEC)

brain.screen.print("Ready")


# ── Basic movements ───────────────────────────────────────────────────────────

def drive_forward(distance_mm: float, speed_pct: int = 60) -> None:
    """Drive straight forward a given distance."""
    drivetrain.drive_for(FORWARD, distance_mm, MM,
                         speed_pct, PERCENT, True)


def drive_backward(distance_mm: float, speed_pct: int = 60) -> None:
    """Drive straight backward a given distance."""
    drivetrain.drive_for(REVERSE, distance_mm, MM,
                         speed_pct, PERCENT, True)


def turn_right(degrees: float, speed_pct: int = 40) -> None:
    """Point turn clockwise."""
    drivetrain.turn_for(RIGHT, degrees, DEGREES,
                        speed_pct, PERCENT, True)


def turn_left(degrees: float, speed_pct: int = 40) -> None:
    """Point turn counter-clockwise."""
    drivetrain.turn_for(LEFT, degrees, DEGREES,
                        speed_pct, PERCENT, True)


def turn_to_heading(heading: float, speed_pct: int = 40) -> None:
    """Turn to an absolute compass heading (0 = starting direction)."""
    drivetrain.turn_to_heading(heading, DEGREES,
                               speed_pct, PERCENT, True)


# ── Example autonomous routine ────────────────────────────────────────────────

def autonomous() -> None:
    """Example: square path — drive forward, turn right x4."""
    for _ in range(4):
        drive_forward(400)        # 400 mm forward
        wait(200, MSEC)
        turn_right(90)            # 90° clockwise
        wait(200, MSEC)

    brain.screen.clear_screen()
    brain.screen.print("Done!")


# ── Competition template ──────────────────────────────────────────────────────
# Uncomment the block below when using VEXcode competition mode.
# The Competition object calls autonomous() and driver_control() at the
# right times based on the field controller signal.

# def driver_control() -> None:
#     left_motor.spin(FORWARD)
#     right_motor.spin(FORWARD)
#     while True:
#         left_motor.set_velocity(controller.axis3.value(), PERCENT)
#         right_motor.set_velocity(controller.axis2.value(), PERCENT)
#         wait(20, MSEC)

# comp = Competition(driver_control, autonomous)

# ── Standalone run ────────────────────────────────────────────────────────────
autonomous()
