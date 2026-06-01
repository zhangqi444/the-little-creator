// FTC TeleOp — Mecanum Drive
// ============================================================
// Targets: FTC SDK (REV Control Hub + REV Driver Hub / phone)
// Works with any standard four-wheel mecanum chassis.
//
// Hardware map names (set on Driver Station ➜ Configure Robot):
//   "frontLeft"  / "frontRight"  / "backLeft"  / "backRight"
//   "arm"                         (optional — remove if unused)
//   "claw"                        (optional — remove if unused)
//
// Tune SLOW_MULTIPLIER and ARM_POWER for your robot.
// ============================================================

package org.firstinspires.ftc.teamcode;

import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
import com.qualcomm.robotcore.eventloop.opmode.TeleOp;
import com.qualcomm.robotcore.hardware.DcMotor;
import com.qualcomm.robotcore.hardware.DcMotorSimple;
import com.qualcomm.robotcore.hardware.Servo;

@TeleOp(name = "MecanumDrive", group = "TeleOp")
public class MecanumTeleOp extends LinearOpMode {

    // ── Tune these constants ──────────────────────────────────
    private static final double SLOW_MULTIPLIER = 0.4;  // speed when holding left bumper
    private static final double ARM_POWER        = 0.5;  // arm motor power
    private static final double CLAW_OPEN        = 0.7;  // servo position — open
    private static final double CLAW_CLOSED      = 0.2;  // servo position — closed
    // ─────────────────────────────────────────────────────────

    @Override
    public void runOpMode() {

        // ── Hardware init ─────────────────────────────────────
        DcMotor frontLeft  = hardwareMap.get(DcMotor.class, "frontLeft");
        DcMotor frontRight = hardwareMap.get(DcMotor.class, "frontRight");
        DcMotor backLeft   = hardwareMap.get(DcMotor.class, "backLeft");
        DcMotor backRight  = hardwareMap.get(DcMotor.class, "backRight");

        // Reverse left-side motors so positive power drives forward uniformly.
        // Flip these if your robot drives backwards or spins unexpectedly.
        frontLeft.setDirection(DcMotorSimple.Direction.REVERSE);
        backLeft.setDirection(DcMotorSimple.Direction.REVERSE);

        // Zero-power behaviour: BRAKE holds position; FLOAT coasts.
        frontLeft.setZeroPowerBehavior(DcMotor.ZeroPowerBehavior.BRAKE);
        frontRight.setZeroPowerBehavior(DcMotor.ZeroPowerBehavior.BRAKE);
        backLeft.setZeroPowerBehavior(DcMotor.ZeroPowerBehavior.BRAKE);
        backRight.setZeroPowerBehavior(DcMotor.ZeroPowerBehavior.BRAKE);

        // Optional attachments — comment out if not present
        DcMotor arm  = hardwareMap.get(DcMotor.class, "arm");
        Servo   claw = hardwareMap.get(Servo.class,   "claw");

        arm.setZeroPowerBehavior(DcMotor.ZeroPowerBehavior.BRAKE);
        claw.setPosition(CLAW_OPEN);

        telemetry.addData("Status", "Initialised — waiting for start");
        telemetry.update();

        waitForStart();

        // ── Main loop ─────────────────────────────────────────
        while (opModeIsActive()) {

            // Gamepad 1 — drivetrain
            // left stick Y  → forward / back
            // left stick X  → strafe left / right
            // right stick X → rotate (turn in place)
            // left bumper   → slow mode
            double speed = gamepad1.left_bumper ? SLOW_MULTIPLIER : 1.0;

            double y  = -gamepad1.left_stick_y * speed;   // negate: up is -1 on stick
            double x  =  gamepad1.left_stick_x * speed * 1.1; // 1.1 compensates mecanum slip
            double rx =  gamepad1.right_stick_x * speed;

            // Mecanum mixing formula:
            //   each wheel combines forward, strafe, and rotation components.
            double fl = y + x + rx;
            double fr = y - x - rx;
            double bl = y - x + rx;
            double br = y + x - rx;

            // Normalise: if any wheel exceeds 1.0, scale all down proportionally.
            double max = Math.max(
                    Math.max(Math.abs(fl), Math.abs(fr)),
                    Math.max(Math.abs(bl), Math.abs(br))
            );
            if (max > 1.0) {
                fl /= max;
                fr /= max;
                bl /= max;
                br /= max;
            }

            frontLeft.setPower(fl);
            frontRight.setPower(fr);
            backLeft.setPower(bl);
            backRight.setPower(br);

            // Gamepad 2 — arm and claw
            // right stick Y → arm up/down
            // A button      → open claw
            // B button      → close claw
            double armPower = -gamepad2.right_stick_y * ARM_POWER;
            arm.setPower(armPower);

            if (gamepad2.a) {
                claw.setPosition(CLAW_OPEN);
            } else if (gamepad2.b) {
                claw.setPosition(CLAW_CLOSED);
            }

            // ── Telemetry (visible on Driver Station) ─────────
            telemetry.addData("Drive FL/FR", "%.2f / %.2f", fl, fr);
            telemetry.addData("Drive BL/BR", "%.2f / %.2f", bl, br);
            telemetry.addData("Arm power",   "%.2f", armPower);
            telemetry.addData("Claw",        "%.2f", claw.getPosition());
            telemetry.addData("Slow mode",   gamepad1.left_bumper ? "ON" : "off");
            telemetry.update();
        }
    }
}
