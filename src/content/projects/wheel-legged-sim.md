---
title: "Wheel-Legged Robot Simulation"
summary: "Simulated a wheel-legged robot in Webots, implementing LQR and VMC algorithms for self-balancing control."
date: 2026-07-03
tags: ["Simulation", "LQR", "Control", "Webots"]
repo: "https://github.com/W-dongdong/Wheel_Leg_simulation-Webots"
featured: true
status: "Completed"
---

## Background

Wheel-legged robots combine the efficiency of wheels with the obstacle-climbing ability of legs, but balance control is a major challenge. This is a personal project: I wanted to validate control algorithms in simulation first before considering hardware deployment.

## My Approach

I built a wheel-legged robot simulation environment in Webots, developed a simplified dynamics model, and implemented two control strategies — LQR (Linear Quadratic Regulator) and VMC (Virtual Model Control) — to let the robot self-balance and move in simulation.

## Results

Both algorithms successfully kept the robot balanced and moving steadily in simulation. LQR performed better at disturbance rejection, while VMC was more intuitive and easier to tune.

## What I Learned

- Building and parameterizing simplified dynamics models
- The different use cases of LQR versus VMC
- How to transfer control algorithms from simulation to hardware

## Key Technologies

- Webots simulation environment
- LQR self-balancing control
- VMC (Virtual Model Control)
- Dynamics modeling
