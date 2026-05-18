"""SPIKE Prime gyro-corrected straight driving.

Drives in a straight line using the hub's built-in gyro sensor to
correct drift. Much more reliable than open-loop driving for FLL missions.

Hardware assumed:
  - Motor pair: left on port A, right on port B
  - Hub mounted flat on robot (gyro reads yaw by default)

Notes:
  - Call reset_yaw() before each mission run for consistent heading reference
  - KP tuning: start at 1.5, increase if robot weaves, decrease if it oscillates
  - Higher speeds need higher KP or the robot can't correct fast enough
"""

from hub import port, motion_sensor
import motor_pair
import runloop

LEFT_MOTOR  = port.A
RIGHT_MOTOR = port.B

motor_pair.pair(motor_pair.PAIR_1, LEFT_MOTOR, RIGHT_MOTOR)

BASE_SPEED = 500   # deg/sec — tune per robot and mission
KP         = 1.8   # proportional gain for heading correction


async def drive_straight(degrees: int, speed: int = BASE_SPEED) -> None:
    """Drive straight for a given number of wheel-rotation degrees.

    Args:
        degrees: positive = forward, negative = backward
        speed:   motor speed in deg/sec (always positive; direction set by degrees sign)
    """
    motion_sensor.reset_yaw(0)
    target_degrees = abs(degrees)
    direction = 1 if degrees > 0 else -1

    # Track distance via one motor's position
    motor_pair.move(motor_pair.PAIR_1, 0, velocity=direction * speed)
    traveled = 0

    import motor as _motor
    start_pos = _motor.relative_position(LEFT_MOTOR)

    while traveled < target_degrees:
        # Heading error: positive = drifted right, negative = drifted left
        yaw = motion_sensor.tilt_angles()[0]   # yaw in tenths of a degree
        correction = int(KP * (yaw / 10))      # scale to steering units
        motor_pair.move(motor_pair.PAIR_1, correction, velocity=direction * speed)

        current_pos = _motor.relative_position(LEFT_MOTOR)
        traveled = abs(current_pos - start_pos)
        await runloop.sleep_ms(10)

    motor_pair.stop(motor_pair.PAIR_1)


async def turn_degrees(degrees: int, speed: int = 300) -> None:
    """Point turn in place.

    Args:
        degrees: positive = clockwise, negative = counter-clockwise
        speed:   motor speed in deg/sec (always positive)
    """
    motion_sensor.reset_yaw(0)
    target_yaw = degrees * 10  # gyro reports in tenths of degrees

    if degrees > 0:
        motor_pair.move(motor_pair.PAIR_1, 100, velocity=speed)  # full right steering
    else:
        motor_pair.move(motor_pair.PAIR_1, -100, velocity=speed)  # full left steering

    while True:
        yaw = motion_sensor.tilt_angles()[0]
        if degrees > 0 and yaw >= target_yaw:
            break
        if degrees < 0 and yaw <= target_yaw:
            break
        await runloop.sleep_ms(10)

    motor_pair.stop(motor_pair.PAIR_1)


# ── Example run ───────────────────────────────────────────────────────────────

async def main() -> None:
    # Drive forward 30 cm (tune degrees for your wheel circumference)
    await drive_straight(1100)     # ~30 cm with 56 mm wheels
    await runloop.sleep_ms(300)

    # Turn 90 degrees clockwise
    await turn_degrees(90)
    await runloop.sleep_ms(300)

    # Drive forward another 20 cm
    await drive_straight(730)


runloop.run(main())
