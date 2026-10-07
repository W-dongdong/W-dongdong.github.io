---
title: "SO(3) Quadrotor Control · PX4 / ROS 2 / Gazebo"
summary: "A quadrotor controller written from scratch as a ROS 2 offboard node — cascaded PID velocity loops plus an SO(3) geometric attitude loop, with PX4 left doing nothing but mixing."
date: 2026-10-04
tags: ["ROS2", "PX4", "Gazebo", "Python", "Control", "SO(3)"]
repo: "https://github.com/W-dongdong/SO3-control-for-quadrotor-in-gazebo"
featured: true
status: "In Progress"
---

## Background

PX4 gets you a lot of control for free. In offboard mode you usually hand it a position or attitude setpoint and let its own cascaded controller do the rest. For this project I wanted the opposite: to own the loops myself and leave PX4 with only the job it cannot avoid — turning a thrust and a torque into four motor speeds.

So the node I wrote computes the desired acceleration, inverts it into a desired attitude and thrust, runs a geometric attitude law, and publishes only `thrust_and_torque`. The stack is PX4-Autopilot v1.17.0 in SITL with Gazebo, driven over ROS 2 Humble and uXRCE-DDS.

## Control Structure

Everything runs in one ROS 2 node at 100 Hz.

**Outer loop — four PID channels.** Desired velocity comes from a gamepad on `/joy`. Three PID channels regulate $v_x$, $v_y$ and the descent rate, producing a desired acceleration

$$
a_{\text{des}} = \begin{bmatrix} a_x & a_y & -a_{\text{up}} \end{bmatrix}^{\top}, \qquad
u_a = -(a_{\text{des}} + g), \quad g = \begin{bmatrix} 0 & 0 & -9.80665 \end{bmatrix}^{\top}
$$

with the $z$ axis flipped because PX4's body frame is FRD. The fourth channel is a yaw *rate* PID that only takes over when the sticks ask for yaw.

**Attitude inversion.** The thrust direction is the direction of $u_a$; the heading sets the rest of the frame:

$$
z_b^{d} = \frac{u_a}{\lVert u_a \rVert}, \qquad
x_c^{d} = \begin{bmatrix} \cos\psi_d & \sin\psi_d & 0 \end{bmatrix}^{\top}, \qquad
y_b^{d} = z_b^{d} \times x_c^{d}, \qquad
x_b^{d} = y_b^{d} \times z_b^{d}
$$

Those three columns build $R_d$ — the same attitude inversion Mellinger & Kumar use in their geometric control paper.

**Inner loop — SO(3).** The attitude error is read straight off the matrix product and mapped back to a vector with the vee operator:

$$
e = \tfrac{1}{2}\left(R^{\top} R_d - R_d^{\top} R\right)^{\vee}, \qquad
\tau = K_p\, e - K_d\, \Omega
$$

One thing worth flagging: this file uses the convention $R_d - R$ ("where should I push") rather than the paper's $R - R_d$ ("where am I off"), so the $K_p$ term carries the opposite sign to the paper. The $K_d$ term never changes sign — damping always has to oppose the body rate.

**Yaw channel switching.** With a yaw command on the sticks, $R_d$'s heading tracks the current heading and $\tau_z$ is overwritten by the yaw PID. Release the stick and the heading latches at its last value, letting the SO(3) law's own yaw component hold it there.

## The Thrust-to-Motor Mapping

This was the part that took the most digging. PX4's `vehicle_thrust_setpoint` is **not** a force in newtons — it is a normalised motor control signal. The physical chain is linear in the control signal and *quadratic* in thrust:

$$
c \longmapsto \omega \longmapsto \text{thrust}, \qquad \omega = \omega_{\min} + (\omega_{\max} - \omega_{\min})\,c
$$

so going from a desired thrust ratio to a control signal means taking a square root:

$$
c = (\text{HOVER\_C} + A)\sqrt{\text{ratio}} - A, \qquad A = \frac{\omega_{\min}}{\omega_{\max} - \omega_{\min}} = 0.17647
$$

`HOVER_C` is measured, not derived — 0.7288 in this airframe, against a theoretical 0.769. Skipping this step is not a small error: at half hover thrust the linear approximation is off by −29%, and at 1.5× it is off by +31%. The two constants come from the SITL airframe parameters `SIM_GZ_EC_MIN1` / `SIM_GZ_EC_MAX1` and are airframe properties, so they have to be recalibrated for any other model or for real hardware.

## Results

The controller flies in SITL (`make px4_sitl gz_x500`): it holds a hover and follows translational velocity and yaw commands from the gamepad, with PX4 contributing only the mixer.

It is a first version, and the comments in the source say so. The gyroscopic term $\Omega \times J\Omega$ is omitted, $K_p$ and $K_d$ were tuned by hand in the airframe rather than derived from a model, and the outer loop commands velocity directly — there is no trajectory optimisation stage feeding it. Those are the obvious next steps.

## What I Learned

- How the cascade actually splits: velocity → desired acceleration → thrust direction and attitude → torque, and which parts PX4 is willing to give up
- Geometric attitude control on SO(3) — building the error matrix, the vee map, and why this avoids the singularities that Euler angles run into at ±90° pitch
- Reading PX4's offboard interfaces at the thrust/torque level, including the fact that the thrust setpoint is a normalised motor command rather than a force
- The QoS and timestamp conventions for the `/fmu/in/*` and `/fmu/out/*` topics, and how PX4's offboard heartbeat timeout is tied to them

## Key Technologies

- ROS 2 Humble, `rclpy`, uXRCE-DDS agent
- PX4-Autopilot v1.17.0 SITL with Gazebo (`gz_x500`) and `px4_msgs` v1.17.0
- SO(3) geometric attitude control (Mellinger & Kumar)
- Cascaded PID velocity and yaw control
- Thrust curve linearisation for the ESC/motor model
- NumPy, `sensor_msgs/Joy` gamepad input
