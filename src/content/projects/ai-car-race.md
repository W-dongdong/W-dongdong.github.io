---
title: "AI Car Racing · Champion"
summary: "Built a YOLO-based, vision-guided maze-solving robot car on the Jetson Nano, finishing the race in 18.88 seconds."
date: 2026-08-31
tags: ["YOLO", "Jetson", "Vision", "Robotics"]
repo: "https://github.com/W-dongdong/2026PolyU-AI-Robot-Car-Race"
featured: false
status: "Completed"
---

## Background

This was a school-wide AI car racing competition in which each car had to navigate a maze autonomously and finish in the shortest time. The real-time performance of vision detection and edge inference was decisive.

## My Approach

I used a Jetson Nano for edge inference and YOLO object detection for vision-based line following, recognizing track markers and planning a path through the maze so the car could complete the full course without human intervention.

## Results

The car finished the race in 18.88 seconds and won the championship.

## What I Learned

- Deploying and accelerating YOLO models on embedded platforms
- Latency control and robustness in vision-based line following
- Maze path planning and real-time decision making

## Key Technologies

- YOLO object detection
- Jetson Nano edge inference
- Maze navigation
- 18.88-second finish
