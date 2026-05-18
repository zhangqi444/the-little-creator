"""SPIKE Prime mission runner — button-activated run selector.

Common FLL competition pattern: team presses a button to select a mission
(displayed on hub light matrix), then presses another button to run it.
Allows switching missions at the table without reconnecting a laptop.

Hardware assumed:
  - Motor pair: left on port A, right on port B
  - Left button: hub's left button (built-in)
  - Right button: hub's right button (built-in, triggers the run)
  - Attachment motors: port C, port D (add/remove as needed)

Usage at competition:
  1. Run this program on the hub before matches
  2. Press LEFT to cycle through missions (number shown on matrix)
  3. Press RIGHT to run the selected mission
  4. Robot returns home after each mission (or stop manually)
"""

from hub import port, button, light_matrix, sound
import motor_pair
import motor
import runloop

LEFT_MOTOR  = port.A
RIGHT_MOTOR = port.B
ARM_MOTOR   = port.C   # example attachment motor

DRIVE_SPEED = 600      # deg/sec for straight driving
TURN_SPEED  = 400      # deg/sec for turns

motor_pair.pair(motor_pair.PAIR_1, LEFT_MOTOR, RIGHT_MOTOR)


# ── Individual mission functions ──────────────────────────────────────────────
# Each function should complete its run and leave the robot ready
# for the driver to reset to home position.

async def mission_1() -> None:
    """Example: drive forward 50 cm, activate arm, return."""
    # Drive forward ~50 cm (tune degrees per cm for your wheel size)
    motor_pair.move_for_degrees(motor_pair.PAIR_1, 1800, 0, velocity=DRIVE_SPEED)
    await runloop.sleep_ms(200)
    # Lower arm
    motor.run_for_degrees(ARM_MOTOR, 270, 800)
    await runloop.sleep_ms(500)
    # Raise arm
    motor.run_for_degrees(ARM_MOTOR, -270, 800)
    await runloop.sleep_ms(200)
    # Drive back
    motor_pair.move_for_degrees(motor_pair.PAIR_1, -1800, 0, velocity=DRIVE_SPEED)


async def mission_2() -> None:
    """Example: arc turn to reach a mission model, push, return."""
    # Gentle left arc
    motor_pair.move_for_degrees(motor_pair.PAIR_1, 1200, -30, velocity=DRIVE_SPEED)
    await runloop.sleep_ms(200)
    # Push
    motor_pair.move_for_degrees(motor_pair.PAIR_1, 400, 0, velocity=DRIVE_SPEED)
    await runloop.sleep_ms(200)
    # Reverse
    motor_pair.move_for_degrees(motor_pair.PAIR_1, -1600, 30, velocity=DRIVE_SPEED)


async def mission_3() -> None:
    """Add your mission 3 here."""
    pass


# ── Mission registry ──────────────────────────────────────────────────────────
# Add missions to this list. Index 0 = mission displayed as "1".
MISSIONS = [
    mission_1,
    mission_2,
    mission_3,
]


# ── Selector loop ─────────────────────────────────────────────────────────────

async def main() -> None:
    selected = 0
    total = len(MISSIONS)

    # Show first mission number
    light_matrix.write(str(selected + 1))

    while True:
        # Left button: cycle to next mission
        if button.pressed(button.LEFT):
            selected = (selected + 1) % total
            light_matrix.write(str(selected + 1))
            sound.beep(440, 100)
            # Debounce
            while button.pressed(button.LEFT):
                await runloop.sleep_ms(20)
            await runloop.sleep_ms(100)

        # Right button: run selected mission
        if button.pressed(button.RIGHT):
            light_matrix.write("GO")
            sound.beep(880, 200)
            # Debounce before run
            while button.pressed(button.RIGHT):
                await runloop.sleep_ms(20)
            await runloop.sleep_ms(100)

            # Execute mission
            await MISSIONS[selected]()

            # Return to ready state
            light_matrix.write(str(selected + 1))
            sound.beep(440, 100)

        await runloop.sleep_ms(20)


runloop.run(main())
