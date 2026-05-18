"""SPIKE Prime sensor patterns for FLL missions.

Common sensor use cases in FLL Challenge: detecting mat colors to align
at a target, stopping before an obstacle, and reacting to a force/button press.

Hardware assumed:
  - Color sensor: port E (facing down at mat)
  - Distance sensor: port F (facing forward)
  - Force sensor: port D
  - Motor pair: left port A, right port B

All examples use async patterns compatible with the mission-runner.py selector.
"""

from hub import port
import color_sensor
import distance_sensor
import force_sensor
import motor_pair
import color
import runloop

LEFT_MOTOR  = port.A
RIGHT_MOTOR = port.B
COLOR_PORT  = port.E
DIST_PORT   = port.F
FORCE_PORT  = port.D

motor_pair.pair(motor_pair.PAIR_1, LEFT_MOTOR, RIGHT_MOTOR)

DRIVE_SPEED = 400   # deg/sec


# ── Color sensor patterns ─────────────────────────────────────────────────────

async def drive_until_color(target_color: int, speed: int = 300) -> None:
    """Drive forward until the color sensor detects a specific color.

    Args:
        target_color: use color.BLACK, color.WHITE, color.RED, color.BLUE, etc.
        speed: motor speed in deg/sec

    Common use: drive forward until reaching a colored mat area, then stop
    precisely at that line before completing a mission.
    """
    motor_pair.move(motor_pair.PAIR_1, 0, velocity=speed)
    while color_sensor.color(COLOR_PORT) != target_color:
        await runloop.sleep_ms(10)
    motor_pair.stop(motor_pair.PAIR_1)


async def align_to_white_line(speed: int = 200) -> None:
    """Creep forward slowly until color sensor sees white (mat border / launch area).

    Useful for homing the robot back to a known position between runs.
    """
    motor_pair.move(motor_pair.PAIR_1, 0, velocity=speed)
    while color_sensor.reflection(COLOR_PORT) < 70:   # 70% reflection = white
        await runloop.sleep_ms(10)
    motor_pair.stop(motor_pair.PAIR_1)


def current_color() -> str:
    """Return the current color sensor reading as a readable string."""
    colors = {
        color.BLACK: "black",
        color.WHITE: "white",
        color.RED:   "red",
        color.BLUE:  "blue",
        color.GREEN: "green",
        color.YELLOW:"yellow",
    }
    detected = color_sensor.color(COLOR_PORT)
    return colors.get(detected, f"unknown({detected})")


# ── Distance sensor patterns ──────────────────────────────────────────────────

async def drive_until_distance(stop_mm: int, speed: int = 300) -> None:
    """Drive forward until the distance sensor reads below stop_mm.

    Args:
        stop_mm: stop when obstacle is closer than this many millimetres
        speed: motor speed in deg/sec

    Common use: drive toward a mission model and stop at a precise distance
    so an attachment can engage reliably.
    """
    motor_pair.move(motor_pair.PAIR_1, 0, velocity=speed)
    while True:
        dist = distance_sensor.distance(DIST_PORT)
        if dist is not None and dist < stop_mm:
            break
        await runloop.sleep_ms(10)
    motor_pair.stop(motor_pair.PAIR_1)


def obstacle_present(threshold_mm: int = 150) -> bool:
    """Return True if something is closer than threshold_mm."""
    dist = distance_sensor.distance(DIST_PORT)
    return dist is not None and dist < threshold_mm


# ── Force sensor patterns ─────────────────────────────────────────────────────

async def wait_for_press() -> None:
    """Block until the force sensor is pressed.

    Common use: wait for a team member to press a button (built from SPIKE Force
    Sensor) to start a mission run — avoids using hub buttons and allows a
    dedicated start trigger.
    """
    while not force_sensor.pressed(FORCE_PORT):
        await runloop.sleep_ms(20)
    # Debounce
    while force_sensor.pressed(FORCE_PORT):
        await runloop.sleep_ms(20)


async def drive_until_push(speed: int = 200) -> None:
    """Drive forward slowly until the robot pushes against something hard enough
    to trigger the force sensor.

    Useful for self-aligning against a wall or mission model bumper.
    """
    motor_pair.move(motor_pair.PAIR_1, 0, velocity=speed)
    while not force_sensor.pressed(FORCE_PORT):
        await runloop.sleep_ms(10)
    motor_pair.stop(motor_pair.PAIR_1)


# ── Example: combined sensor mission ─────────────────────────────────────────

async def example_sensor_mission() -> None:
    """Drive to a colored target, then stop before a mission model.

    Shows how to combine sensor primitives in a real mission context.
    """
    # Phase 1: drive until black line marking the target zone
    await drive_until_color(color.BLACK)
    await runloop.sleep_ms(300)

    # Phase 2: approach mission model, stop 80 mm away
    await drive_until_distance(80)
    await runloop.sleep_ms(200)

    # Phase 3: back up slowly to home
    motor_pair.move_for_degrees(motor_pair.PAIR_1, -1500, 0, velocity=300)


runloop.run(example_sensor_mission())
