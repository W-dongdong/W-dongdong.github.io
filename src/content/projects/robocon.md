---
title: "Robocon 2026 — EE Team Firmware"
summary: "Embedded firmware for PolyU's EE team at Robocon 2026 — an STM32 (HAL / C) program that drives a fully autonomous competition robot."
date: 2026-06-30
tags: ["STM32", "C", "CAN", "PID", "Robotics", "Embedded"]
repo: "https://github.com/W-dongdong/2026RoboconEEProgram"
featured: true
status: "Completed"
---

## Background

Robocon is an international robotics competition in which each team builds a robot to complete a task autonomously. As a core member of The Hong Kong Polytechnic University's EE team, I worked on the embedded program that drives the robot — the firmware layer that turns high-level strategy into real motor motion on the field.

This project is the EE team's program for Robocon 2026, published on GitHub as [`2026RoboconEEProgram`](https://github.com/W-dongdong/2026RoboconEEProgram).

## My Approach

The firmware is an STM32 project generated with STM32CubeMX and built in Keil MDK, organised into layers so that board support, peripheral drivers and application logic stay separate:

- `Core` / `Drivers` — CubeMX-generated startup code and STM32 HAL peripheral drivers
- `User` — our own application logic: motor control and communication
- `MDK-ARM` — the Keil MDK project used to build and flash the board

On top of the HAL I implemented PID motor group control, inverse kinematics for the Mecanum-wheel chassis, and board-to-board communication (CAN / UART) inside the robot.

## Results

The program ran reliably across many rounds of tuning, giving the team a dependable actuation layer for the robot's autonomous runs.

## What I Learned

- Structuring STM32 firmware into a clean BSP / driver / application stack
- Real-time motor control: PID tuning, interrupt priorities and timing
- Deriving and implementing Mecanum-wheel inverse kinematics
- Using CAN and UART for inter-board communication

## Key Technologies

- STM32 + HAL, written in C
- STM32CubeMX / Keil MDK toolchain
- CAN bus and UART communication
- PID motor group control
- Mecanum-wheel chassis kinematics
