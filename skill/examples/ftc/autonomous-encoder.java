// FTC Autonomous — Encoder-based Drive
// ============================================================
// Targets: FTC SDK (REV Control Hub)
// Uses built-in motor encoders to drive straight distances and
// turn fixed angles without a gyro.  Accurate enough for most
// rookie Autonomous routines.
//
// Hardware map names (match your Driver Station config):
//   "frontLeft" / "frontRight" / "backLeft" / "backRight"
//
// Steps to calibrate:
//   1. Run the robot on a flat floor.
//   2. Call driveInches(24) — measure actual distance.
//   3. Adjust COUNTS_PER_INCH until the measured distance matches.
//   4. Repeat for turnDegrees(90) — adjust COUNTS_PER_DEGREE.
// ============================================================

package org.firstinspires.ftc.teamcode;

import com.qualcomm.robotcore.eventloop.opmode.Autonomous;
import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
import com.qualcomm.robotcore.hardware.DcMotor;
import com.qualcomm.robotcore.hardware.DcMotorSimple;

@Autonomous(name = "EncoderAuto", group = "Autonomous")
public class AutonomousEncoder extends LinearOpMode {

    // ── Calibration constants ─────────────────────────────────
    // REV HD Hex motor: 28 PPR × 20:1 gearbox = 560 CPR at the output shaft.
    // Adjust for your actual gearbox ratio and wheel circumference.
    private static final double COUNTS_PER_MOTOR_REV = 560.0;   // 28 × 20:1
    private static final double WHEEL_DIAMETER_INCHES = 3.75;   // measure your wheel
    private static final double COUNTS_PER_INCH =
            COUNTS_PER_MOTOR_REV / (WHEEL_DIAMETER_INCHES * Math.PI);

    // For tank-style turns: robot width centre-to-centre (inches).
    private static final double TRACK_WIDTH_INCHES = 14.0;
    private static final double COUNTS_PER_DEGREE  =
            (TRACK_WIDTH_INCHES * Math.PI / 360.0) * COUNTS_PER_INCH;

    private static final double DRIVE_SPEED = 0.5;   // 0–1.0
    private static final double TURN_SPEED  = 0.35;
    // ─────────────────────────────────────────────────────────

    private DcMotor frontLeft, frontRight, backLeft, backRight;

    @Override
    public void runOpMode() {

        // ── Init ──────────────────────────────────────────────
        frontLeft  = hardwareMap.get(DcMotor.class, "frontLeft");
        frontRight = hardwareMap.get(DcMotor.class, "frontRight");
        backLeft   = hardwareMap.get(DcMotor.class, "backLeft");
        backRight  = hardwareMap.get(DcMotor.class, "backRight");

        frontLeft.setDirection(DcMotorSimple.Direction.REVERSE);
        backLeft.setDirection(DcMotorSimple.Direction.REVERSE);

        setMode(DcMotor.RunMode.STOP_AND_RESET_ENCODER);
        setMode(DcMotor.RunMode.RUN_USING_ENCODER);

        for (DcMotor m : new DcMotor[]{frontLeft, frontRight, backLeft, backRight}) {
            m.setZeroPowerBehavior(DcMotor.ZeroPowerBehavior.BRAKE);
        }

        telemetry.addData("Status", "Ready");
        telemetry.update();

        waitForStart();

        if (!opModeIsActive()) return;

        // ── Autonomous routine — edit this section ────────────
        // Example: drive forward 24 inches, turn right 90°, drive 12 inches
        driveInches(24, DRIVE_SPEED);
        turnDegrees(90, TURN_SPEED);   // positive = turn right
        driveInches(12, DRIVE_SPEED);
        // ─────────────────────────────────────────────────────

        stopMotors();
        telemetry.addData("Status", "Done");
        telemetry.update();
    }

    // ── Helper: drive straight (inches) ──────────────────────
    // Positive inches = forward.  Negative = reverse.
    private void driveInches(double inches, double speed) {
        int target = (int)(inches * COUNTS_PER_INCH);

        int flTarget = frontLeft.getCurrentPosition()  + target;
        int frTarget = frontRight.getCurrentPosition() + target;
        int blTarget = backLeft.getCurrentPosition()   + target;
        int brTarget = backRight.getCurrentPosition()  + target;

        frontLeft.setTargetPosition(flTarget);
        frontRight.setTargetPosition(frTarget);
        backLeft.setTargetPosition(blTarget);
        backRight.setTargetPosition(brTarget);

        setMode(DcMotor.RunMode.RUN_TO_POSITION);
        setAllPower(Math.abs(speed));

        while (opModeIsActive() && isBusy()) {
            telemetry.addData("Target / Actual",
                    "%d / %d", flTarget, frontLeft.getCurrentPosition());
            telemetry.update();
        }

        stopMotors();
        setMode(DcMotor.RunMode.RUN_USING_ENCODER);
    }

    // ── Helper: point turn (degrees) ─────────────────────────
    // Positive degrees = clockwise (right).  Negative = counter-clockwise.
    private void turnDegrees(double degrees, double speed) {
        int target = (int)(degrees * COUNTS_PER_DEGREE);

        // Left wheels drive forward; right wheels drive backward (turns robot right).
        frontLeft.setTargetPosition(frontLeft.getCurrentPosition()   + target);
        backLeft.setTargetPosition(backLeft.getCurrentPosition()     + target);
        frontRight.setTargetPosition(frontRight.getCurrentPosition() - target);
        backRight.setTargetPosition(backRight.getCurrentPosition()   - target);

        setMode(DcMotor.RunMode.RUN_TO_POSITION);
        setAllPower(Math.abs(speed));

        while (opModeIsActive() && isBusy()) {
            telemetry.addData("Turning", "%.1f°", degrees);
            telemetry.update();
        }

        stopMotors();
        setMode(DcMotor.RunMode.RUN_USING_ENCODER);
    }

    // ── Convenience helpers ───────────────────────────────────
    private void setMode(DcMotor.RunMode mode) {
        for (DcMotor m : new DcMotor[]{frontLeft, frontRight, backLeft, backRight})
            m.setMode(mode);
    }

    private void setAllPower(double power) {
        for (DcMotor m : new DcMotor[]{frontLeft, frontRight, backLeft, backRight})
            m.setPower(power);
    }

    private void stopMotors() {
        setAllPower(0);
    }

    private boolean isBusy() {
        return frontLeft.isBusy() || frontRight.isBusy()
            || backLeft.isBusy()  || backRight.isBusy();
    }
}
