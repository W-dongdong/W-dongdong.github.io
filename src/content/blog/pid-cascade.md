---
title: "Introduction to PID and Cascade PID Control"
description: "Understand the three terms of PID, how to tune them intuitively, and why cascade control helps in motor control systems."
pubDate: 2026-01-10
tags: ["Control", "Embedded"]
lang: "en"
featured: true
---

## Introduction

The PID controller is the workhorse of control engineering. Whether you are spinning a motor or holding a drone steady, the idea is the same: measure the error $e(t)$ between your setpoint and the actual value, then push back against it.

## The Three Terms

The control law is

$$
u(t) = K_p e(t) + K_i \int e(t)\,dt + K_d \frac{de}{dt}
$$

Each term plays a distinct role:

- **P (proportional):** reacts to the present error. More gain means faster response, but too much gain causes oscillation.
- **I (integral):** accumulates past error to eliminate steady-state offset. It fixes the "never quite reaches the target" problem, at the risk of windup and sluggishness.
- **D (derivative):** predicts the future by reacting to the error's slope. It damps overshoot but amplifies noise.

## Tuning Intuition

Start with only P and raise $K_p$ until the system responds crisply. Add a small $K_d$ to soften overshoot. Finally bring in $K_i$ to remove residual offset. Always clamp the integral term to avoid windup.

## Cascade PID

A single PID struggles when a slow outer loop (position) drives a fast inner loop (velocity) directly. Cascade control splits the job into two nested loops: an outer position controller outputs a velocity setpoint, and an inner velocity controller commands the motor.

```c
float pos_setpoint = 100.0f;   // target position
float vel_setpoint = pos_pid_update(pos_setpoint, pos_feedback);
float duty          = vel_pid_update(vel_setpoint, vel_feedback);
pwm_set(duty);
```

Because the inner loop runs much faster, disturbances to velocity are rejected before they ever reach the position loop — the system feels tighter and more robust.

## Summary

- $P$ fights the present, $I$ the past, $D$ the future.
- Tune P → D → I, and clamp the integral term.
- Cascade PID separates position and velocity, improving disturbance rejection in motor systems.
