// FRC Autonomous — Command-based drive-forward example
// ============================================================
// Targets: WPILib (Java), Command-based framework, roboRIO.
// Demonstrates a SequentialCommandGroup that drives forward a
// set distance using encoder feedback, then stops.
// Intended as a starting point for a rookie team's first
// working Autonomous routine.
//
// File layout in a Command-based project:
//   src/main/java/frc/robot/
//     Robot.java                   (TimedRobot entry point — use RobotContainer)
//     RobotContainer.java          (wires subsystems + commands)
//     subsystems/DriveSubsystem.java
//     commands/DriveDistance.java
//     commands/AutonomousRoutine.java   ← this file
//
// This single file shows all three classes; split them in your
// actual project for readability.
// ============================================================

package frc.robot.commands;

import edu.wpi.first.wpilibj2.command.SequentialCommandGroup;
import edu.wpi.first.wpilibj2.command.InstantCommand;
import edu.wpi.first.wpilibj2.command.RunCommand;
import edu.wpi.first.wpilibj2.command.WaitCommand;
import edu.wpi.first.wpilibj2.command.Subsystem;
import edu.wpi.first.wpilibj2.command.SubsystemBase;
import edu.wpi.first.wpilibj2.command.CommandBase;

import edu.wpi.first.wpilibj.drive.DifferentialDrive;
import edu.wpi.first.wpilibj.motorcontrol.MotorControllerGroup;
import edu.wpi.first.wpilibj.smartdashboard.SmartDashboard;

import com.revrobotics.CANSparkMax;
import com.revrobotics.CANSparkMaxLowLevel.MotorType;
import com.revrobotics.RelativeEncoder;

// ===========================================================
// DriveSubsystem — owns the drivetrain hardware
// ===========================================================
class DriveSubsystem extends SubsystemBase {

    // ── Tune these constants ──────────────────────────────────
    private static final int LEFT_LEADER_ID    = 1;
    private static final int LEFT_FOLLOWER_ID  = 2;
    private static final int RIGHT_LEADER_ID   = 3;
    private static final int RIGHT_FOLLOWER_ID = 4;

    /** Wheel circumference in metres (0.1524 m = 6-inch wheel) */
    private static final double WHEEL_CIRCUMFERENCE_M = Math.PI * 0.1524;

    /** Gear ratio from motor shaft to wheel (e.g., 10.71:1 for KOP chassis) */
    private static final double GEAR_RATIO = 10.71;

    /** Metres per motor revolution at the wheel */
    private static final double METRES_PER_REV = WHEEL_CIRCUMFERENCE_M / GEAR_RATIO;
    // ─────────────────────────────────────────────────────────

    private final CANSparkMax leftLeader;
    private final CANSparkMax leftFollower;
    private final CANSparkMax rightLeader;
    private final CANSparkMax rightFollower;
    private final DifferentialDrive drive;
    private final RelativeEncoder leftEncoder;
    private final RelativeEncoder rightEncoder;

    public DriveSubsystem() {
        leftLeader    = new CANSparkMax(LEFT_LEADER_ID,    MotorType.kBrushless);
        leftFollower  = new CANSparkMax(LEFT_FOLLOWER_ID,  MotorType.kBrushless);
        rightLeader   = new CANSparkMax(RIGHT_LEADER_ID,   MotorType.kBrushless);
        rightFollower = new CANSparkMax(RIGHT_FOLLOWER_ID, MotorType.kBrushless);

        leftLeader.setInverted(false);
        leftFollower.follow(leftLeader);
        rightLeader.setInverted(true);
        rightFollower.follow(rightLeader);

        MotorControllerGroup leftGroup  = new MotorControllerGroup(leftLeader,  leftFollower);
        MotorControllerGroup rightGroup = new MotorControllerGroup(rightLeader, rightFollower);
        drive = new DifferentialDrive(leftGroup, rightGroup);

        // NEO built-in encoders via SparkMax
        leftEncoder  = leftLeader.getEncoder();
        rightEncoder = rightLeader.getEncoder();

        // Convert raw rotations to metres
        leftEncoder.setPositionConversionFactor(METRES_PER_REV);
        rightEncoder.setPositionConversionFactor(METRES_PER_REV);

        resetEncoders();
    }

    /** Average of left and right encoder positions in metres */
    public double getAverageDistanceMetres() {
        return (leftEncoder.getPosition() + rightEncoder.getPosition()) / 2.0;
    }

    /** Zero both encoders */
    public void resetEncoders() {
        leftEncoder.setPosition(0);
        rightEncoder.setPosition(0);
    }

    /** Drive at fixed power (arcade style: speed forward, 0 rotation) */
    public void driveArcade(double speed, double rotation) {
        drive.arcadeDrive(speed, rotation);
    }

    /** Stop all motors */
    public void stop() {
        drive.stopMotor();
    }

    @Override
    public void periodic() {
        // Publish live position to Shuffleboard every loop
        SmartDashboard.putNumber("Distance (m)", getAverageDistanceMetres());
        SmartDashboard.putNumber("Left enc (m)", leftEncoder.getPosition());
        SmartDashboard.putNumber("Right enc (m)", rightEncoder.getPosition());
    }
}

// ===========================================================
// DriveDistance — drive forward targetMetres then finish
// ===========================================================
class DriveDistance extends CommandBase {

    private final DriveSubsystem driveSubsystem;
    private final double targetMetres;
    private final double speed;

    /**
     * @param metres  Distance to drive (positive = forward, negative = reverse)
     * @param speed   Motor output 0–1.0 (use 0.4–0.6 for Autonomous)
     * @param drive   The DriveSubsystem instance
     */
    public DriveDistance(double metres, double speed, DriveSubsystem drive) {
        this.driveSubsystem = drive;
        this.targetMetres   = metres;
        this.speed          = speed;
        addRequirements(drive);   // prevents other commands from using the drive simultaneously
    }

    @Override
    public void initialize() {
        driveSubsystem.resetEncoders();
    }

    @Override
    public void execute() {
        // Drive at constant speed; WPILib will call isFinished() each loop.
        driveSubsystem.driveArcade(speed * Math.signum(targetMetres), 0);
    }

    @Override
    public boolean isFinished() {
        // Stop when the robot has travelled at least |targetMetres|.
        return Math.abs(driveSubsystem.getAverageDistanceMetres()) >= Math.abs(targetMetres);
    }

    @Override
    public void end(boolean interrupted) {
        driveSubsystem.stop();
    }
}

// ===========================================================
// AutonomousRoutine — top-level SequentialCommandGroup
// Wire this into RobotContainer.getAutonomousCommand()
// ===========================================================
public class AutonomousRoutine extends SequentialCommandGroup {

    /**
     * Sample routine: drive forward 2 m, pause 0.5 s, drive forward 1 m more.
     * Edit the DriveDistance calls to match your field strategy.
     */
    public AutonomousRoutine(DriveSubsystem drive) {
        addCommands(
            new InstantCommand(drive::resetEncoders, drive),
            new DriveDistance(2.0, 0.5, drive),   // drive 2 metres forward at 50% power
            new WaitCommand(0.5),                  // pause 0.5 seconds
            new DriveDistance(1.0, 0.4, drive)    // drive 1 more metre at 40% power
        );
    }
}
