---
title: FRC Programming Basics (WPILib)
description: Getting started with programming your FRC robot — WPILib with TimedRobot and Command-based frameworks, Shuffleboard telemetry, and a drive-forward Autonomous example for rookie teams.
tags: [frc, programming, java, wpilib, autonomous, teleop, beginners]
audience: [coaches, teens]
level: beginner
season: evergreen
---

:::note[Program scope]
This guide is for **FIRST Robotics Competition** teams using the **WPILib** library. FTC teams on REV hardware should see [FTC Programming Basics](/guides/ftc-programming-basics/) instead. For FLL and SPIKE Prime, see [FLL Robot Programming Basics](/guides/robot-programming-basics/).
:::

FRC robots are programmed with **WPILib** — an open-source library maintained by FIRST and the WPILib team, supporting Java, C++, and Python. Unlike FTC's browser-based OnBot environment, FRC development happens in **VS Code** (with the WPILib extension) on your laptop. This guide focuses on Java (the most common choice for rookie teams) and walks through the two main frameworks, key concepts, and practical examples.

## Choosing a language

| Language | Notes | Best for |
|---|---|---|
| **Java** | Most documentation, largest community, strongly typed | First choice for most rookie teams |
| **C++** | Maximum performance; steeper learning curve | Teams with C++ experience |
| **Python** (RobotPy) | Beginner-friendly syntax; slightly smaller community for FRC | Teams comfortable with Python from FLL/VEX |

This guide uses **Java**. The concepts translate directly to C++ and Python — WPILib exposes the same API in all three languages.

## Setting up the development environment

1. Download and install the **WPILib installer** from [docs.wpilib.org](https://docs.wpilib.org) — it bundles VS Code, the WPILib extension, the Java JDK, and all required tools into a single package.
2. Open VS Code and use **WPILib: Create a new project** from the command palette (Ctrl+Shift+P) to scaffold your robot project.
3. Choose your template (TimedRobot or Command-based — see below), language (Java), and team number.

The installer also includes **Shuffleboard** (the dashboard app you use at competition) and **Glass** (a lightweight telemetry tool for practice). Both run on your driver station laptop.

## How the robot runs your code

FRC robots have one computing device running your code:

- **roboRIO** — the NI embedded controller mounted on the robot; runs the Robot program (your code) and communicates with the Driver Station over a radio link

Your driver station laptop runs the **FRC Driver Station** application, which sends enable/disable signals and joystick input to the roboRIO over Wi-Fi (or a tethered Ethernet cable for practice).

Your code is deployed to the roboRIO over USB or Wi-Fi using the **WPILib: Deploy Robot Code** command in VS Code.

## Two programming frameworks

### TimedRobot — simpler, good for rookies

`TimedRobot` calls your methods on a fixed 20 ms loop. You override the methods for each match period:

| Method | When it runs |
|---|---|
| `robotInit()` | Once, when the robot program starts |
| `autonomousInit()` | Once, at the start of Autonomous |
| `autonomousPeriodic()` | Every 20 ms during Autonomous |
| `teleopInit()` | Once, at the start of TeleOp |
| `teleopPeriodic()` | Every 20 ms during TeleOp |
| `disabledPeriodic()` | Every 20 ms while disabled |

TimedRobot is the easiest mental model for a first robot — your code runs on a timer, and you react to the current state every 20 ms.

### Command-based — scales with complexity

The **Command-based framework** splits robot code into **Subsystems** (hardware groups: drivetrain, arm, intake) and **Commands** (actions that use subsystems: drive forward 1 m, extend arm, run intake). A **scheduler** manages which commands run, handles conflicts, and composes sequences.

Command-based pays off as your robot grows. Most competitive FRC teams use it from their second season onwards. Rookies often start with TimedRobot and refactor to command-based once they understand the hardware.

:::tip
Start with TimedRobot for your first season. When your `teleopPeriodic()` method grows past ~60 lines, it is time to read the [Command-based introduction in WPILib docs](https://docs.wpilib.org/en/stable/docs/software/commandbased/index.html).
:::

## A minimal TeleOp (TimedRobot, arcade drive)

The FRC kit of parts includes a **West Coast Drive** (WCD) or a **mecanum drive** depending on your build. This example uses a simple arcade-drive style with REV Spark MAX motor controllers driving NEO brushless motors:

```java
package frc.robot;

import edu.wpi.first.wpilibj.TimedRobot;
import edu.wpi.first.wpilibj.XboxController;
import edu.wpi.first.wpilibj.drive.DifferentialDrive;
import com.revrobotics.CANSparkMax;
import com.revrobotics.CANSparkLowLevel.MotorType;

public class Robot extends TimedRobot {

    // CAN IDs must match IDs set in REV Hardware Client / RoboRIO Web Dashboard
    private final CANSparkMax leftMotor  = new CANSparkMax(1, MotorType.kBrushless);
    private final CANSparkMax rightMotor = new CANSparkMax(2, MotorType.kBrushless);
    private final DifferentialDrive drive = new DifferentialDrive(leftMotor, rightMotor);

    private final XboxController controller = new XboxController(0); // port 0 on Driver Station

    @Override
    public void robotInit() {
        // Invert one side so both motors push the robot forward
        rightMotor.setInverted(true);
    }

    @Override
    public void teleopPeriodic() {
        // Arcade drive: left stick Y = speed, right stick X = rotation
        double speed    = -controller.getLeftY();   // negate: up is positive
        double rotation =  controller.getRightX();
        drive.arcadeDrive(speed, rotation);
    }
}
```

`DifferentialDrive` handles the mixing math for you and also applies a **deadband** (ignores small joystick noise around zero). You do not need to implement the math manually unless you have a mecanum or swerve drivetrain.

:::note[Motor controller library]
The `CANSparkMax` class comes from the **REV Robotics vendor library**, which you add to your project with **WPILib: Manage Vendor Libraries → Install new library (online)**. Different motor controllers (CTRE Talon SRX, Talon FX/Kraken) use different libraries but the same WPILib `DifferentialDrive` wrapper. Check the [FRC Resource Map](/resources/frc-resource-map/) for vendor library links.
:::

## A drive-forward Autonomous

Autonomous in FRC runs for the first 15 seconds of each match with no driver input. The most common rookie approach is **encoder-based distance control**:

```java
package frc.robot;

import edu.wpi.first.wpilibj.TimedRobot;
import edu.wpi.first.wpilibj.drive.DifferentialDrive;
import com.revrobotics.CANSparkMax;
import com.revrobotics.CANSparkLowLevel.MotorType;
import com.revrobotics.RelativeEncoder;

public class Robot extends TimedRobot {

    private final CANSparkMax leftMotor  = new CANSparkMax(1, MotorType.kBrushless);
    private final CANSparkMax rightMotor = new CANSparkMax(2, MotorType.kBrushless);
    private final DifferentialDrive drive = new DifferentialDrive(leftMotor, rightMotor);

    private final RelativeEncoder leftEncoder  = leftMotor.getEncoder();
    private final RelativeEncoder rightEncoder = rightMotor.getEncoder();

    // NEO motor: SparkMax getEncoder() returns rotations by default.
    // Adjust this factor for your wheel diameter and gearbox ratio.
    // Example: 6 in (0.1524 m) wheel, 10.71:1 gearbox
    //   metres per motor rotation = pi x 0.1524 / 10.71 = ~0.04471 m/rot
    private static final double METRES_PER_ROTATION = 0.04471;
    private static final double TARGET_METRES = 1.5; // drive 1.5 m forward

    private boolean autoDone = false;

    @Override
    public void robotInit() {
        rightMotor.setInverted(true);
    }

    @Override
    public void autonomousInit() {
        // Reset encoder positions to zero at the start of each match
        leftEncoder.setPosition(0);
        rightEncoder.setPosition(0);
        autoDone = false;
    }

    @Override
    public void autonomousPeriodic() {
        if (autoDone) {
            drive.arcadeDrive(0, 0);
            return;
        }

        double distanceTravelled =
            (leftEncoder.getPosition() + rightEncoder.getPosition()) / 2.0
            * METRES_PER_ROTATION;

        if (distanceTravelled < TARGET_METRES) {
            drive.arcadeDrive(0.4, 0); // 40% power forward
        } else {
            drive.arcadeDrive(0, 0);
            autoDone = true;
        }
    }
}
```

Once your robot drives straight reliably, the next step is trajectory-based autonomous — see [PathPlanner](#where-to-go-next) below.

## Shuffleboard — your telemetry dashboard

Shuffleboard is WPILib's built-in dashboard. It receives values published from the robot and displays them in configurable tiles on your laptop. Use it for tuning, debugging, and match-day monitoring.

Publishing values is one line:

```java
import edu.wpi.first.wpilibj.smartdashboard.SmartDashboard;

// In any periodic method:
SmartDashboard.putNumber("Left encoder (m)",
    leftEncoder.getPosition() * METRES_PER_ROTATION);
SmartDashboard.putNumber("Right encoder (m)",
    rightEncoder.getPosition() * METRES_PER_ROTATION);
SmartDashboard.putBoolean("Auto done", autoDone);
```

`SmartDashboard` sends to whichever dashboard is open — Shuffleboard or Glass. Open Shuffleboard on your driver station laptop before deploying; it auto-discovers the robot's published keys.

:::tip[Tuning constants]
Put your tuning constants (like `TARGET_METRES` or a drive speed) on SmartDashboard with `SmartDashboard.putNumber(...)` and read them back with `SmartDashboard.getNumber(...)`. This lets you change a value from the dashboard without redeploying code — a huge time saver at competition.
:::

## CAN bus — connecting motor controllers

Most FRC motor controllers communicate over the **CAN bus** (a two-wire loop connecting all devices to the roboRIO). Each device has a **CAN ID** that you set using the vendor's configuration tool (REV Hardware Client for Spark MAX, CTRE Phoenix Tuner for Talons). CAN IDs must be unique — duplicate IDs cause random, hard-to-diagnose failures.

Best practice: label each physical controller with its CAN ID and maintain a spreadsheet of your wiring map. Checking IDs is the first thing to do when a motor mysteriously stops working.

## Common rookie mistakes

| Mistake | What goes wrong | Fix |
|---|---|---|
| Duplicate CAN IDs | One or more motors randomly stop or behave erratically | Use Phoenix Tuner / REV Hardware Client to audit all IDs; each device needs a unique number |
| Wrong `METRES_PER_ROTATION` constant | Autonomous consistently over- or under-shoots | Measure the actual travel per motor rotation with a tape measure and recalculate |
| Not inverting one drive side | Robot spins in circles | One side's motors are mounted "flipped" — invert it in `robotInit()` or in the hardware client |
| No stop after autonomous target reached | Robot keeps driving after the condition is met | Always call `arcadeDrive(0, 0)` and set `autoDone = true` once target is reached |
| Deploying over Wi-Fi with low battery | Deployment fails mid-transfer | Deploy over USB tether when battery is below 11 V |
| `Thread.sleep()` in a periodic method | Robot freezes and misses loop cycles | Never block in a periodic method; use a state machine or `Timer` instead |

## Where to go next

After basic driving and simple encoder autonomous, most competitive FRC teams adopt these tools:

- **PathPlanner** ([pathplanner.dev](https://pathplanner.dev)) — graphical path editor that generates smooth trajectories for autonomous; integrates directly with WPILib command-based and TimedRobot; the community standard for serious autonomous routines
- **Limelight** ([docs.limelightvision.io](https://docs.limelightvision.io)) — plug-and-play vision camera that publishes AprilTag and game-piece data to NetworkTables; minimal code required to wire up
- **CTRE Phoenix 6** ([v6.docs.ctr-electronics.com](https://v6.docs.ctr-electronics.com)) — library for Kraken X60 / Falcon 500 motors and Pigeon 2.0 IMU; very common on competitive robots
- **AdvantageKit / AdvantageScope** ([github.com/Mechanical-Advantage/AdvantageKit](https://github.com/Mechanical-Advantage/AdvantageKit)) — structured logging framework and log visualiser used by many top teams for post-match debugging

The authoritative reference for all things WPILib is **[docs.wpilib.org](https://docs.wpilib.org)** — it covers installation, framework guides, hardware support, simulation, and the full Java API. The [FRC Resource Map](/resources/frc-resource-map/) lists this and other community resources with usage notes.
