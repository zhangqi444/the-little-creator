"""VEX IQ sensor patterns — VEXcode IQ Python API.

Common sensor use cases in VEX IQ / VIQRC: stopping at a precise distance
from a game object, detecting colours for field alignment, reacting to bumper
presses, and reading the optical sensor's proximity output.

Hardware assumed:
  - Distance sensor:  port 2  (facing forward)
  - Optical sensor:   port 3  (facing down at field tiles)
  - Bumper switch:    port 5
  - Left drive motor: port 1  (reversed)
  - Right drive motor:port 6
  - Inertial sensor:  port 4  (for heading reference)

All distances in mm, speeds in percent (0-100) unless noted.
Works in VEXcode IQ web/desktop; no external libraries required.
"""

from vex import *

# -- Hardware setup -----------------------------------------------------------
brain         = Brain()
left_motor    = Motor(Ports.PORT1, True)
right_motor   = Motor(Ports.PORT6, False)
inertial      = Inertial(Ports.PORT4)
distance_snsr = Distance(Ports.PORT2)
optical_snsr  = Optical(Ports.PORT3)
bumper        = Bumper(Ports.PORT5)

drivetrain = SmartDrive(left_motor, right_motor, inertial,
                        200,   # wheel travel mm
                        230,   # track width mm
                        165,   # wheelbase mm
                        MM)

inertial.calibrate()
while inertial.is_calibrating():
    wait(50, MSEC)

# Turn on the optical sensor's built-in LED so it can read hue reliably
optical_snsr.set_light(LedStateType.ON)

brain.screen.print("Sensors ready")


# -- Distance sensor patterns -------------------------------------------------

def object_detected(threshold_mm=200):
    """Return True when an object is closer than threshold_mm.

    Typical use: safety stop or proximity trigger during autonomous.
    """
    return distance_snsr.object_distance(MM) < threshold_mm


def drive_until_close(stop_mm, speed_pct=40):
    """Drive forward and stop when the front distance sensor reads <= stop_mm.

    Args:
        stop_mm:   halt when the nearest object is this close (mm)
        speed_pct: drive speed (0-100 %)

    Use case: approach a scoring object or field wall and stop at a
    repeatable distance so an intake or scorer can engage reliably.
    """
    left_motor.spin(FORWARD, speed_pct, PERCENT)
    right_motor.spin(FORWARD, speed_pct, PERCENT)
    while distance_snsr.object_distance(MM) > stop_mm:
        wait(10, MSEC)
    left_motor.stop()
    right_motor.stop()


def back_away_until_clear(clear_mm=300, speed_pct=30):
    """Reverse until the distance sensor reads >= clear_mm.

    Use case: back off from a scored object before turning to home.
    """
    left_motor.spin(REVERSE, speed_pct, PERCENT)
    right_motor.spin(REVERSE, speed_pct, PERCENT)
    while distance_snsr.object_distance(MM) < clear_mm:
        wait(10, MSEC)
    left_motor.stop()
    right_motor.stop()


# -- Optical sensor patterns --------------------------------------------------

def current_hue():
    """Return the optical sensor's hue (0-359 degrees on the colour wheel).

    Hue reference (approximate):
      Red    ~   0 / 360
      Yellow ~  60
      Green  ~ 120
      Cyan   ~ 180
      Blue   ~ 240
      Purple ~ 300
    """
    return optical_snsr.hue()


def detect_color_range(target_hue, tolerance=20):
    """Return True when the optical sensor sees a hue within +/-tolerance of target_hue.

    Args:
        target_hue: centre of the target hue range (0-359)
        tolerance:  accepted deviation in hue degrees (default 20)

    Use case: detect a red, blue, or green field tile to align the robot
    at a scoring zone before activating a mechanism.
    """
    diff = abs(optical_snsr.hue() - target_hue)
    # Handle wrap-around at 360 degrees
    diff = min(diff, 360 - diff)
    return diff <= tolerance


def drive_until_color(target_hue, tolerance=20, speed_pct=30):
    """Drive forward until the optical sensor detects a target hue.

    Args:
        target_hue: hue to look for (0-359)
        tolerance:  accepted hue deviation (default +/-20)
        speed_pct:  approach speed (default 30 %)

    Common use: creep toward a coloured scoring tile and stop exactly on it.
    """
    left_motor.spin(FORWARD, speed_pct, PERCENT)
    right_motor.spin(FORWARD, speed_pct, PERCENT)
    while not detect_color_range(target_hue, tolerance):
        wait(10, MSEC)
    left_motor.stop()
    right_motor.stop()


def field_brightness():
    """Return the optical sensor brightness reading (0-100).

    Bright (>70): white/light tile.  Dark (<30): dark tile / field edge.
    Use case: find the edge of a scoring zone or the boundary of a field element.
    """
    return optical_snsr.brightness()


def drive_until_bright(threshold=70, speed_pct=30):
    """Drive forward until the optical sensor detects a bright surface.

    Use case: home the robot to the light-coloured starting tile between runs.
    """
    left_motor.spin(FORWARD, speed_pct, PERCENT)
    right_motor.spin(FORWARD, speed_pct, PERCENT)
    while optical_snsr.brightness() < threshold:
        wait(10, MSEC)
    left_motor.stop()
    right_motor.stop()


# -- Bumper switch patterns ---------------------------------------------------

def wait_for_bumper_press():
    """Block until the bumper switch is pressed (then released).

    Use case: start an autonomous run via a physical button press --
    keeps fingers off the brain screen during competition hand-off.
    """
    while not bumper.pressing():
        wait(20, MSEC)
    # Wait for release to avoid double-trigger
    while bumper.pressing():
        wait(20, MSEC)


def drive_until_bumped(speed_pct=20):
    """Drive forward slowly until the bumper switch is pressed.

    Use case: self-align the robot against a wall or field boundary;
    the contact registers as a physical stop signal.
    """
    left_motor.spin(FORWARD, speed_pct, PERCENT)
    right_motor.spin(FORWARD, speed_pct, PERCENT)
    while not bumper.pressing():
        wait(10, MSEC)
    left_motor.stop()
    right_motor.stop()


# -- Inertial / heading helpers -----------------------------------------------

def heading():
    """Return current heading in degrees (0 = starting direction, increases clockwise)."""
    return inertial.heading(DEGREES)


def drive_gyro_straight(distance_mm, speed_pct=50):
    """Drive forward a set distance using the inertial sensor for heading correction.

    Keeps the robot on a straight heading by trimming left/right motor speed.
    For longer runs, prefer SmartDrive.drive_for(); this helper is provided
    for cases where SmartDrive is bypassed or unavailable.

    Args:
        distance_mm: distance to travel (mm); uses time-based estimate --
                     tune SPEED_TO_MMPS for your actual robot.
        speed_pct:   base speed percent (0-100)
    """
    SPEED_TO_MMPS = 3.0   # rough mm/s per % speed -- calibrate for your robot
    target_ms = int(distance_mm / (speed_pct * SPEED_TO_MMPS) * 1000)
    target_heading = inertial.heading(DEGREES)
    start_ms = brain.timer.time(MSEC)

    while brain.timer.time(MSEC) - start_ms < target_ms:
        error = target_heading - inertial.heading(DEGREES)
        # Handle 360 degree wrap
        if error > 180:
            error -= 360
        elif error < -180:
            error += 360
        correction = error * 0.8   # proportional gain
        left_motor.set_velocity(speed_pct + correction, PERCENT)
        right_motor.set_velocity(speed_pct - correction, PERCENT)
        left_motor.spin(FORWARD)
        right_motor.spin(FORWARD)
        wait(10, MSEC)

    left_motor.stop()
    right_motor.stop()


# -- Example: combined sensor autonomous --------------------------------------

def example_autonomous():
    """Drive to a red scoring zone, score, then return using bumper wall-align.

    Demonstrates chaining distance, colour, and bumper sensor primitives.
    """
    brain.screen.clear_screen()
    brain.screen.print("Waiting for start...")

    # Step 1: wait for driver to press the bumper (hand-off from driver control)
    wait_for_bumper_press()
    brain.screen.clear_screen()
    brain.screen.print("Running auto")

    # Step 2: drive toward the scoring zone, stop 100 mm away
    drive_until_close(stop_mm=100, speed_pct=50)
    wait(200, MSEC)

    # Step 3: creep onto the red tile (hue ~0)
    drive_until_color(target_hue=0, tolerance=25, speed_pct=20)
    wait(300, MSEC)

    # Step 4: back up to home tile (bright white starting zone)
    back_away_until_clear(clear_mm=400, speed_pct=30)
    drive_until_bright(threshold=75, speed_pct=25)

    brain.screen.clear_screen()
    brain.screen.print("Done!")


# Run standalone (remove when using Competition template)
example_autonomous()
