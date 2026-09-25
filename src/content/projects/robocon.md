---
title: "Robocon Robotics Competition · Core Member"
summary: "Developed an STM32-based low-level controller for a fully autonomous robot, featuring PID motor group control, Mecanum-wheel kinematics, and UART communication."
date: 2026-06-30
tags: ["STM32", "PID", "Robotics", "Embedded"]
featured: true
status: "Completed"
---

## Background

I competed in the Robocon robotics competition as a core member of The Hong Kong Polytechnic University's robotics EE team, where I was responsible for developing the robot's low-level controller so the fully autonomous robot could complete its tasks reliably and quickly on the field.

## My Approach

I did bare-metal development on an STM32, writing directly to registers to guarantee real-time performance. I implemented PID motor group control and inverse kinematics for the Mecanum-wheel chassis, mapping velocity commands sent by the companion computer to the speeds of the four wheels, and communicating with the companion computer in real time over UART.

## Results

The low-level controller ran reliably across many rounds of tuning. The chassis responded quickly and localized accurately, providing a dependable actuation layer that helped the team reach its season goals.

## What I Learned

- Timing constraints and interrupt priority management in real-time systems
- Deriving and engineering Mecanum-wheel inverse kinematics
- Designing a reliable communication protocol with the companion computer

## Key Technologies

- Bare-metal STM32 development
- PID motor group control
- Mecanum-wheel chassis inverse kinematics
- UART communication
