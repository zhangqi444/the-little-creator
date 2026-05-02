"""SPIKE Prime line follower — single-sensor proportional control.

Beginner-friendly version. Drives along a black line on a white surface using
one color sensor. Tune BASE_SPEED and KP for your robot and the mat.

Hardware assumed:
  - Color sensor on port E, mounted facing down at the mat
  - Motor pair: left on port A, right on port B
"""

from hub import port
import motor_pair
import color_sensor
import runloop

LEFT_MOTOR = port.A
RIGHT_MOTOR = port.B
SENSOR = port.E

BASE_SPEED = 300   # base motor velocity (deg/sec)
KP = 1.5           # proportional gain — tune this first
TARGET = 50        # reflected light at the line edge (50% = edge of black/white)


async def follow_line(duration_ms: int = 10_000) -> None:
    motor_pair.pair(motor_pair.PAIR_1, LEFT_MOTOR, RIGHT_MOTOR)
    elapsed = 0
    step_ms = 20
    while elapsed < duration_ms:
        reflection = color_sensor.reflection(SENSOR)
        error = reflection - TARGET
        steering = int(KP * error)
        motor_pair.move(motor_pair.PAIR_1, steering, velocity=BASE_SPEED)
        await runloop.sleep_ms(step_ms)
        elapsed += step_ms
    motor_pair.stop(motor_pair.PAIR_1)


runloop.run(follow_line())
