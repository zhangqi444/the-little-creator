// FRC TeleOp — Tank Drive (TimedRobot)
// ============================================================
// Targets: WPILib (Java), TimedRobot framework, roboRIO.
// Controls a standard tank-drive chassis with one joystick per
// side (Xbox controller left stick = left wheels, right stick =
// right wheels).  Includes Shuffleboard telemetry.
//
// Hardware:
//   Left motors:  "leftLeader" (DifferentialDrive leader) +
//                 "leftFollower" (follows leftLeader)
//   Right motors: "rightLeader" (DifferentialDrive leader) +
//                 "rightFollower" (follows rightLeader)
//
// Tune SPEED_LIMIT and DEADBAND for your robot and driver.
// ============================================================

package frc.robot;

import edu.wpi.first.wpilibj.TimedRobot;
import edu.wpi.first.wpilibj.XboxController;
import edu.wpi.first.wpilibj.drive.DifferentialDrive;
import edu.wpi.first.wpilibj.motorcontrol.MotorControllerGroup;
import edu.wpi.first.wpilibj.shuffleboard.Shuffleboard;
import edu.wpi.first.wpilibj.shuffleboard.ShuffleboardTab;
import edu.wpi.first.wpilibj.smartdashboard.SmartDashboard;

import com.revrobotics.CANSparkMax;
import com.revrobotics.CANSparkMaxLowLevel.MotorType;

public class Robot extends TimedRobot {

    // ── Tune these constants ──────────────────────────────────
    /** CAN IDs — match your robot's wiring diagram */
    private static final int LEFT_LEADER_ID    = 1;
    private static final int LEFT_FOLLOWER_ID  = 2;
    private static final int RIGHT_LEADER_ID   = 3;
    private static final int RIGHT_FOLLOWER_ID = 4;

    /** Maximum output (0–1.0).  Reduce for new drivers. */
    private static final double SPEED_LIMIT = 0.75;

    /** Joystick deadband — ignore inputs below this magnitude. */
    private static final double DEADBAND = 0.08;
    // ─────────────────────────────────────────────────────────

    // Hardware objects (initialised in robotInit)
    private CANSparkMax leftLeader;
    private CANSparkMax leftFollower;
    private CANSparkMax rightLeader;
    private CANSparkMax rightFollower;
    private DifferentialDrive drive;
    private XboxController controller;

    // Shuffleboard tab for this subsystem
    private ShuffleboardTab driveTab;

    // ── robotInit — runs once on power-on ────────────────────
    @Override
    public void robotInit() {
        leftLeader    = new CANSparkMax(LEFT_LEADER_ID,    MotorType.kBrushless);
        leftFollower  = new CANSparkMax(LEFT_FOLLOWER_ID,  MotorType.kBrushless);
        rightLeader   = new CANSparkMax(RIGHT_LEADER_ID,   MotorType.kBrushless);
        rightFollower = new CANSparkMax(RIGHT_FOLLOWER_ID, MotorType.kBrushless);

        // Followers mirror their leaders.  Invert one side so that positive
        // power drives the robot forward uniformly.  Flip rightLeader's
        // inversion if the robot spins in place instead of driving straight.
        leftLeader.setInverted(false);
        leftFollower.follow(leftLeader);

        rightLeader.setInverted(true);
        rightFollower.follow(rightLeader);

        // DifferentialDrive expects separate MotorControllerGroups per side.
        // Only the leaders need to be passed — followers mirror them.
        MotorControllerGroup leftGroup  = new MotorControllerGroup(leftLeader,  leftFollower);
        MotorControllerGroup rightGroup = new MotorControllerGroup(rightLeader, rightFollower);
        drive = new DifferentialDrive(leftGroup, rightGroup);
        drive.setDeadband(DEADBAND);
        drive.setMaxOutput(SPEED_LIMIT);

        controller = new XboxController(0);  // port 0 on Driver Station

        driveTab = Shuffleboard.getTab("Drivetrain");
        driveTab.addDouble("Left speed",  () -> leftLeader.get());
        driveTab.addDouble("Right speed", () -> rightLeader.get());
        driveTab.addDouble("Left temp C",  () -> leftLeader.getMotorTemperature());
        driveTab.addDouble("Right temp C", () -> rightLeader.getMotorTemperature());
    }

    // ── teleopPeriodic — runs every 20 ms during TeleOp ──────
    @Override
    public void teleopPeriodic() {
        // Tank drive: left stick Y -> left wheels, right stick Y -> right wheels.
        // Negate: WPILib convention is positive = forward but Xbox Y is
        // negative when pushed up.
        double leftSpeed  = -controller.getLeftY();
        double rightSpeed = -controller.getRightY();

        drive.tankDrive(leftSpeed, rightSpeed);

        // Telemetry visible on any connected Shuffleboard / SmartDashboard.
        SmartDashboard.putNumber("Left speed",  leftSpeed);
        SmartDashboard.putNumber("Right speed", rightSpeed);
        SmartDashboard.putBoolean("A button",   controller.getAButton());
    }

    // ── disabledInit — safety: stop motors when disabled ─────
    @Override
    public void disabledInit() {
        drive.stopMotor();
    }
}
