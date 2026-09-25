---
title: "STM32 BSP Library"
summary: "Developed a lightweight Board Support Package in C/C++ for STM32, covering CAN, I2C, and the Mahony algorithm for IMU attitude estimation."
date: 2026-06-30
tags: ["STM32", "C++", "Embedded"]
repo: "https://github.com/W-dongdong/stm32_bsp_lib"
featured: true
status: "Maintained"
---

## Background

After repeatedly writing low-level peripheral code across several robotics projects, I realized I needed a reusable Board Support Package (BSP) to reduce duplication and keep a consistent code style.

## My Approach

I developed a lightweight BSP library in C/C++ with a layered, portable design. I wrapped register operations in clean peripheral interfaces covering common peripherals such as CAN and I2C, and implemented an IMU attitude-estimation module based on the Mahony algorithm.

## Results

The library has been reused across several of my projects, significantly shortening low-level development time, and it remains under active maintenance and iteration.

## What I Learned

- Layered architecture and interface abstraction design
- CAN / I2C peripheral details and common pitfalls
- The theory and parameter tuning of Mahony attitude estimation

## Key Technologies

- Lightweight C/C++ BSP
- CAN and I2C peripherals
- Mahony attitude estimation
- Layered and portable design
