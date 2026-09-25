---
title: "AI 小车竞速 · 冠军"
summary: "基于 YOLO 视觉循迹与 Jetson Nano 的迷宫小车，18.88 秒完赛"
date: 2026-08-31
tags: ["YOLO", "Jetson", "视觉", "机器人"]
repo: "https://github.com/W-dongdong/2026PolyU-AI-Robot-Car-Race"
featured: false
status: "已完成"
---

## 项目背景

这是一场校级 AI 小车竞速赛，要求小车在迷宫中自主寻迹并以最短时间完赛。视觉检测与边缘推理的实时性是决定胜负的关键。

## 我的做法

基于 Jetson Nano 做边缘推理，使用 YOLO 目标检测实现视觉循迹，识别赛道标志并规划迷宫寻迹路径，让小车在无人干预下自主完成全程。

## 成果

小车以 18.88 秒的成绩完赛，获得比赛冠军。

## 学到的

- YOLO 模型在嵌入式平台的部署与加速
- 视觉循迹中的延迟控制与鲁棒性
- 迷宫路径规划与实时决策

## 技术要点

- YOLO 目标检测
- Jetson Nano 边缘推理
- 迷宫寻迹
- 18.88 秒完赛
