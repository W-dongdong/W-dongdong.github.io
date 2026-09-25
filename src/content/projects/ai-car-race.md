---
title: "AI Car Racing · Champion"
summary: "A YOLO-based, vision-guided maze-solving robot car on the Jetson Nano — TensorRT inference with encoder fusion, finishing the race in 18.88 seconds."
date: 2026-08-31
tags: ["YOLO", "Jetson", "TensorRT", "Vision", "Robotics"]
repo: "https://github.com/W-dongdong/2026PolyU-AI-Robot-Car-Race/tree/master"
featured: false
status: "Completed"
---

## Background

This was a school-wide AI car racing competition in which each car had to navigate a maze autonomously and finish in the shortest time. The real-time performance of vision detection and edge inference was decisive.

## My Approach

I trained a YOLO detector and deployed it on the Jetson Nano, exporting the model to ONNX and then to a TensorRT engine (`best.engine`) so inference could run in real time on the edge. On top of detection I built the driving logic in Python, iterating through several versions (`game.py` → `game(v1.5)`) to add wheel-encoder fusion and track optimisation, with INA219 current sensing for power monitoring and a `track.yaml` describing the course.

## Results

The car finished the race in 18.88 seconds and won the championship.

## What I Learned

- Training YOLO models and accelerating them with TensorRT on embedded hardware
- Latency control and robustness in vision-based line following
- Fusing vision with wheel encoders for more stable, repeatable control

## Key Technologies

- YOLO training + ONNX / TensorRT deployment on Jetson Nano
- Python control program with wheel-encoder fusion
- INA219 current sensing
- Real-time maze navigation
