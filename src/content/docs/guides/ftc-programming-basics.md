---
title: FTC Programming Basics (FTC SDK)
description: Getting started with programming your FTC robot — OnBot Java, Android Studio, and the FTC Blocks environment, with practical tips for rookie teams.
tags: [ftc, programming, java, ftc-sdk, onbot-java, android-studio, beginners, autonomous, teleop]
audience: [coaches, teens]
level: beginner
season: evergreen
---

:::note[Program scope]
This guide is for **FIRST Tech Challenge** teams using the **FTC SDK** with the REV Control Hub. FLL teams on SPIKE Prime should see [FLL Robot Programming Basics](/guides/robot-programming-basics/) instead. For VEX IQ, see the [VEX IQ Programming Guide](/guides/vex-iq-programming/). For FRC, see the [FRC Resource Map](/resources/frc-resource-map/) for WPILib documentation links.
:::

FTC robots are programmed with the **FTC SDK** (Software Development Kit) — a Java library maintained by FIRST and hosted on GitHub. Unlike LEGO's drag-and-drop environment, FTC programming is primarily text-based Java (or Kotlin), though a Blocks interface is also available for newer programmers. This guide covers all three entry points and the core concepts every FTC team needs to understand.

## The three ways to program FTC robots

| Environment | Language | Setup needed | Best for |
|---|---|---|---|
| **FTC Blocks (OnBot)** | Drag-and-drop blocks | Just a browser on the Driver Station phone/tablet | Brand-new programmers, first season, fast iteration |
| **OnBot Java** | Java (text) in browser | Just a browser — no Android Studio install | Teams stepping up from Blocks; simpler setup than Android Studio |
| **Android Studio** | Java or Kotlin | Full Android IDE install on a PC/Mac | Serious teams; version control, full debugging, custom libraries |

Most rookie teams start with **FTC Blocks** or **OnBot Java** and graduate to Android Studio in their second season. All three produce equivalent robot performance — the difference is tooling, not capability.

## What runs on the robot

An FTC robot has two computing devices talking to each other:

- **REV Control Hub** — runs the Robot Controller app; connects directly to motors, servos, and sensors; runs your OpModes
- **Driver Station** (phone or tablet with Driver Station app) — run by the drivers; sends gamepad input to the Control Hub over Wi-Fi Direct

Your code lives on the Control Hub as one or more **OpModes** — self-contained programs that run when a match starts. Every FTC program is an OpMode.

## Two types of OpMode

Every FTC match has two periods, and you will write separate OpModes for each:

### Autonomous (30 seconds)
Runs at the start of the match with **no driver input**. The robot must act entirely on its own — using sensors, encoders, and timed actions. Autonomous is worth more points than TeleOp on a per-action basis and is where consistent sensor-based coding pays off.

### TeleOp (2 minutes 30 seconds)
Drivers control the robot through gamepads. Your TeleOp code maps gamepad buttons to robot actions — drivetrain, arm, claw, etc.

Most teams build TeleOp first (it is easier to debug when you can drive the robot around) and then tackle Autonomous once the hardware is stable.

## Getting started — FTC Blocks

FTC Blocks is the fastest way to write your first OpMode without installing anything.

1. Power on the Control Hub and connect your laptop to the Control Hub's Wi-Fi network (the SSID is printed on the Hub or set during configuration)
2. Open a browser and go to `http://192.168.43.1:8080` (the Robot Controller console)
3. Select **OnBot Java**, then the **Blocks** tab
4. Create a new OpMode, choose TeleOp, and give it a name

You will see a block workspace similar to Scratch or SPIKE App. Drag blocks from the left sidebar. Save your file and the Hub compiles and deploys automatically — no USB cable needed.

Most FTC drivetrains use **mecanum wheels** (which allow sideways strafing) or tank drive. The FTC Blocks library includes a pre-built `MecanumDrive` block for four-wheel drive that handles the math for you.

:::tip
Use the **TeleOp linear** template for your first program — it is simpler to reason about than the iterative template with a separate `loop()` method. Switch to iterative or command-based patterns once you understand the SDK flow.
:::

## Getting started — OnBot Java

OnBot Java is the same browser-based editor but lets you type Java directly. No install beyond a browser.

A minimal TeleOp that drives a mecanum chassis using the left and right sticks:

```java
package org.firstinspires.ftc.teamcode;

import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
import com.qualcomm.robotcore.eventloop.opmode.TeleOp;
import com.qualcomm.robotcore.hardware.DcMotor;

@TeleOp(name = "MyFirstTeleOp")
public class MyFirstTeleOp extends LinearOpMode {

    DcMotor frontLeft, frontRight, backLeft, backRight;

    @Override
    public void runOpMode() {
        // Names must match the configuration set on the Driver Station
        frontLeft  = hardwareMap.get(DcMotor.class, "frontLeft");
        frontRight = hardwareMap.get(DcMotor.class, "frontRight");
        backLeft   = hardwareMap.get(DcMotor.class, "backLeft");
        backRight  = hardwareMap.get(DcMotor.class, "backRight");

        // Reverse motors on one side (depends on mounting orientation)
        frontLeft.setDirection(DcMotor.Direction.REVERSE);
        backLeft.setDirection(DcMotor.Direction.REVERSE);

        waitForStart();

        while (opModeIsActive()) {
            double y  = -gamepad1.left_stick_y;   // Forward/back (negate: up is positive)
            double x  =  gamepad1.left_stick_x;   // Strafe
            double rx =  gamepad1.right_stick_x;  // Rotate

            // Mecanum mixing formula
            double fl = y + x + rx;
            double fr = y - x - rx;
            double bl = y - x + rx;
            double br = y + x - rx;

            // Normalise so no value exceeds 1.0
            double max = Math.max(Math.abs(fl), Math.max(Math.abs(fr),
                         Math.max(Math.abs(bl), Math.abs(br))));
            if (max > 1.0) { fl /= max; fr /= max; bl /= max; br /= max; }

            frontLeft.setPower(fl);
            frontRight.setPower(fr);
            backLeft.setPower(bl);
            backRight.setPower(br);

            telemetry.addData("FL / FR / BL / BR", "%.2f / %.2f / %.2f / %.2f", fl, fr, bl, br);
            telemetry.update();
        }
    }
}
```

Save, then click **Build Everything** in the OnBot Java toolbar. The Hub compiles and deploys automatically. Errors appear in the build log at the bottom of the page.

## Hardware map — the most important concept

Every motor, servo, and sensor on your robot must be registered before your code can use it:

1. **Wire it** to the Control Hub (or Expansion Hub if you have one)
2. **Configure it** on the Driver Station app: Menu → Configure Robot → give it a name
3. **Reference that exact name** in `hardwareMap.get(...)` in your OpMode

If the name in code does not match the name in configuration, the program crashes at init with a `NullPointerException`. This is the most common rookie mistake — and the easiest one to prevent by keeping a physical label on each port.

## Telemetry — your debugging window

`telemetry.addData()` sends text from the robot to the Driver Station screen in real time. Use it constantly during development:

```java
telemetry.addData("Motor power", frontLeft.getPower());
telemetry.addData("Encoder ticks", frontLeft.getCurrentPosition());
telemetry.addData("Status", "waiting for start");
telemetry.update(); // Must call this or nothing appears on the Driver Station
```

Telemetry replaces `System.out.println()` in FTC. If the robot is doing something unexpected, add telemetry before guessing.

## Writing a simple Autonomous

An Autonomous OpMode drives the robot without gamepad input. You control movement using **encoder ticks** (counts how far motors have turned) or **timed movement** (run motor for X milliseconds). Encoder-based movement is far more repeatable at a competition.

A minimal encoder-based Autonomous driving forward 600 mm:

```java
package org.firstinspires.ftc.teamcode;

import com.qualcomm.robotcore.eventloop.opmode.Autonomous;
import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
import com.qualcomm.robotcore.hardware.DcMotor;

@Autonomous(name = "DriveForward")
public class DriveForwardAuto extends LinearOpMode {

    // REV HD Hex Motor at 20:1 gearbox = 537.7 ticks/revolution
    // Wheel circumference depends on wheel diameter — adjust for your robot
    static final double TICKS_PER_REV     = 537.7;
    static final double WHEEL_DIAMETER_MM = 96.0;
    static final double TICKS_PER_MM      = TICKS_PER_REV / (Math.PI * WHEEL_DIAMETER_MM);

    DcMotor frontLeft, frontRight, backLeft, backRight;

    @Override
    public void runOpMode() {
        frontLeft  = hardwareMap.get(DcMotor.class, "frontLeft");
        frontRight = hardwareMap.get(DcMotor.class, "frontRight");
        backLeft   = hardwareMap.get(DcMotor.class, "backLeft");
        backRight  = hardwareMap.get(DcMotor.class, "backRight");

        frontLeft.setDirection(DcMotor.Direction.REVERSE);
        backLeft.setDirection(DcMotor.Direction.REVERSE);

        // Reset encoders to zero before the match starts
        frontLeft.setMode(DcMotor.RunMode.STOP_AND_RESET_ENCODER);
        frontRight.setMode(DcMotor.RunMode.STOP_AND_RESET_ENCODER);
        backLeft.setMode(DcMotor.RunMode.STOP_AND_RESET_ENCODER);
        backRight.setMode(DcMotor.RunMode.STOP_AND_RESET_ENCODER);

        telemetry.addData("Status", "ready");
        telemetry.update();
        waitForStart();

        driveForward(600, 0.5); // 600 mm forward at 50% power
        sleep(500);
    }

    void driveForward(double distanceMm, double power) {
        int target = (int)(distanceMm * TICKS_PER_MM);

        frontLeft.setTargetPosition(target);
        frontRight.setTargetPosition(target);
        backLeft.setTargetPosition(target);
        backRight.setTargetPosition(target);

        frontLeft.setMode(DcMotor.RunMode.RUN_TO_POSITION);
        frontRight.setMode(DcMotor.RunMode.RUN_TO_POSITION);
        backLeft.setMode(DcMotor.RunMode.RUN_TO_POSITION);
        backRight.setMode(DcMotor.RunMode.RUN_TO_POSITION);

        frontLeft.setPower(power);  frontRight.setPower(power);
        backLeft.setPower(power);   backRight.setPower(power);

        while (opModeIsActive() && frontLeft.isBusy()) {
            telemetry.addData("Target / Current", "%d / %d", target, frontLeft.getCurrentPosition());
            telemetry.update();
        }

        frontLeft.setPower(0);  frontRight.setPower(0);
        backLeft.setPower(0);   backRight.setPower(0);

        frontLeft.setMode(DcMotor.RunMode.RUN_USING_ENCODER);
        frontRight.setMode(DcMotor.RunMode.RUN_USING_ENCODER);
        backLeft.setMode(DcMotor.RunMode.RUN_USING_ENCODER);
        backRight.setMode(DcMotor.RunMode.RUN_USING_ENCODER);
    }
}
```

:::note[Ticks per rev vary by motor and gearbox]
The `537.7` figure is for the **REV HD Hex Motor with a 20:1 gearbox** driving the wheel shaft directly. Check the [REV documentation](https://docs.revrobotics.com/docs/duo) or the motor product page for your exact gearbox. Using the wrong value causes consistent over- or under-shooting.
:::

## Where to go next

Once you can drive forward, turn, and operate an attachment, explore these community libraries used by most competitive FTC teams:

- **Road Runner** ([rr.brott.dev](https://rr.brott.dev)) — trajectory-based autonomous planning; handles curves, odometry, and high-speed consistency; the community standard for serious autonomous routines
- **FTCLib** ([docs.ftclib.org/ftclib](https://docs.ftclib.org/ftclib)) — command-based programming framework that makes large TeleOp and Autonomous codebases more maintainable
- **EasyOpenCV** ([github.com/OpenFTC/EasyOpenCV](https://github.com/OpenFTC/EasyOpenCV)) — computer vision for detecting game pieces; wraps OpenCV for the FTC SDK
- **FTC Dashboard** ([acmerobotics.github.io/ftc-dashboard](https://acmerobotics.github.io/ftc-dashboard)) — live telemetry graphing and PID tuning from a browser during practice sessions

These are community projects, not official FIRST tools. The [FTC Resource Map](/resources/ftc-resource-map/) has annotated links with usage notes.

## Common rookie mistakes

| Mistake | What goes wrong | Fix |
|---|---|---|
| Hardware map name mismatch | `NullPointerException` at init | Verify the name in Driver Station config matches `hardwareMap.get(...)` exactly — it is case-sensitive |
| Forgetting `waitForStart()` | Robot moves before the referee says go | `waitForStart()` must be called before any movement in a LinearOpMode |
| Not resetting encoders | Position starts from wherever the last run ended | Call `STOP_AND_RESET_ENCODER` at the start of every Autonomous |
| Full power immediately | Wheels spin, robot jerks, mechanisms can snap | Start testing at 0.3–0.5 max power and work up gradually |
| Forgetting `telemetry.update()` | Nothing appears on the Driver Station screen | Every `addData()` call needs a matching `update()` to flush to the screen |
| `Thread.sleep()` in TeleOp | Robot stops responding to gamepad input during the delay | Use state machines or `ElapsedTime` timers instead of blocking sleeps in TeleOp |

## Official documentation

The canonical reference for the FTC SDK is **[ftc-docs.firstinspires.org](https://ftc-docs.firstinspires.org/)**. It covers the full SDK API, hardware configuration, OnBot Java setup, and Android Studio installation. When in doubt, it is the authoritative source. The [FTC Resource Map](/resources/ftc-resource-map/) lists this and other community resources with usage notes.
