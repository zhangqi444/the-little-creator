"""VEX IQ Autonomous Coding Skills mission runner — button-activated run selector.

Common VIQRC competition pattern for Autonomous Coding Skills: driver
presses a button on the VEX IQ Brain to select a pre-programmed run
(number shown on the Brain screen), then presses again to execute it.
Allows switching between different ACS routes at the field without
reconnecting a laptop.

Hardware assumed:
  - Drivetrain: SmartDrive with left motor on port 1 (reversed),
    right motor on port 6, inertial sensor on port 4
  - Attachment motor: port 7 (claw / roller — add/remove as needed)
  - VEX IQ Brain built-in buttons (CHECK and CANCEL)

Autonomous Coding Skills context:
  - 1-minute autonomous run, no driver input allowed once started
  - Robot starts from a designated starting position each run
  - Score counts objects/tasks completed before the timer expires
  - Teams typically prepare 2-3 different routes for different field states

Usage at competition:
  1. Download and run this program on the VEX IQ Brain before your ACS attempt
  2. Press CANCEL to cycle through available routes (number on screen)
  3. Press CHECK to arm the selected route (screen shows "READY")
  4. Press CHECK again to start the run
  5. Robot executes the route; screen shows "DONE" when finished
"""

from vex import *

# -- Hardware setup -----------------------------------------------------------
brain       = Brain()
left_motor  = Motor(Ports.PORT1, True)    # True = reversed
right_motor = Motor(Ports.PORT6, False)
inertial    = Inertial(Ports.PORT4)
claw_motor  = Motor(Ports.PORT7, False)   # example attachment motor

drivetrain = SmartDrive(left_motor, right_motor, inertial,
                        200,   # wheel travel mm (wheel circumference -- tune to yours)
                        230,   # track width mm (centre to centre)
                        165,   # wheelbase mm (front to back)
                        MM)

# Calibrate inertial at startup -- takes ~2 seconds
inertial.calibrate()
while inertial.is_calibrating():
    wait(50, MSEC)


# -- Movement helpers ---------------------------------------------------------

def fwd(dist_mm, speed=60):
    """Drive forward dist_mm millimetres."""
    drivetrain.drive_for(FORWARD, dist_mm, MM, speed, PERCENT, True)


def rev(dist_mm, speed=60):
    """Drive backward dist_mm millimetres."""
    drivetrain.drive_for(REVERSE, dist_mm, MM, speed, PERCENT, True)


def turn(heading, speed=40):
    """Turn to an absolute compass heading (positive = clockwise)."""
    drivetrain.turn_to_heading(heading, DEGREES, speed, PERCENT, True)


def claw_open():
    """Open claw / roller -- tune degrees to your mechanism."""
    claw_motor.spin_for(FORWARD, 270, DEGREES, 50, PERCENT, True)


def claw_close():
    """Close claw / roller."""
    claw_motor.spin_for(REVERSE, 270, DEGREES, 50, PERCENT, True)


# -- Individual run functions -------------------------------------------------
# Each function runs one complete Autonomous Coding Skills attempt.
# Write each run to score from a specific starting position or field state.
# Add as many runs as you need; register them in RUNS below.

def run_1():
    """Run 1 -- starting zone A: drive to object cluster, collect, push to goal."""
    fwd(600)               # drive to first group of objects
    wait(200, MSEC)
    claw_close()           # collect
    wait(300, MSEC)
    fwd(300)               # push to scoring zone
    claw_open()
    wait(200, MSEC)
    rev(400)               # retreat


def run_2():
    """Run 2 -- starting zone B: arc approach to side goal."""
    fwd(400)
    wait(150, MSEC)
    turn(45)               # turn toward side goal
    wait(150, MSEC)
    fwd(500)
    claw_close()
    wait(300, MSEC)
    fwd(200)               # push into goal
    claw_open()
    wait(200, MSEC)
    rev(300)
    turn(0)                # return to starting heading
    rev(400)


def run_3():
    """Run 3 -- placeholder. Add your route here."""
    pass


# -- Run registry -------------------------------------------------------------
# Register run functions here. Index 0 is shown as "1" on screen.
# Keep the list short -- 2-3 well-rehearsed routes beat many half-finished ones.
RUNS = [
    run_1,
    run_2,
    run_3,
]


# -- Selector loop ------------------------------------------------------------
# CANCEL button: cycle through runs (only when not armed)
# CHECK  button: arm the selected run; second press starts it

def show_run(index):
    brain.screen.clear_screen()
    brain.screen.set_cursor(1, 1)
    brain.screen.print("Run: " + str(index + 1) + " / " + str(len(RUNS)))


def wait_buttons_released():
    while brain.buttonCheck.pressing() or brain.buttonCancel.pressing():
        wait(20, MSEC)


# Show initial state
show_run(0)
selected = 0
armed    = False

while True:
    # CANCEL pressed: cycle to next run
    if brain.buttonCancel.pressing() and not armed:
        selected = (selected + 1) % len(RUNS)
        show_run(selected)
        brain.sound.play(SoundType.SIREN1)
        wait_buttons_released()
        wait(100, MSEC)

    # CHECK pressed: arm or start
    elif brain.buttonCheck.pressing():
        if not armed:
            # First press -- arm the run
            armed = True
            brain.screen.clear_screen()
            brain.screen.set_cursor(1, 1)
            brain.screen.print("READY - Run " + str(selected + 1))
            brain.screen.set_cursor(2, 1)
            brain.screen.print("CHECK to start")
            brain.sound.play(SoundType.FILLUP)
            wait_buttons_released()
            wait(150, MSEC)
        else:
            # Second press -- execute the run
            brain.screen.clear_screen()
            brain.screen.set_cursor(1, 1)
            brain.screen.print("GO! Run " + str(selected + 1))
            brain.sound.play(SoundType.HORN1)
            wait_buttons_released()
            wait(100, MSEC)

            RUNS[selected]()

            brain.screen.clear_screen()
            brain.screen.set_cursor(1, 1)
            brain.screen.print("DONE - Run " + str(selected + 1))
            brain.sound.play(SoundType.FILLUP)
            armed = False
            wait(1000, MSEC)
            show_run(selected)

    wait(20, MSEC)
