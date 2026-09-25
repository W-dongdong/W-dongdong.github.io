---
title: "An Intuitive Understanding of LQR"
description: "A gentle introduction to the linear-quadratic regulator: cost functions, state feedback, and how it compares to PID."
pubDate: 2026-02-05
tags: ["Control"]
lang: "en"
featured: true
---

## Introduction

PID is intuitive but inherently single-input. When your system has many states, you want a controller that considers all of them at once. The Linear-Quadratic Regulator (LQR) does exactly that — and it does so optimally.

## The State-Space Model

We describe a linear system with

$$
\dot{x} = Ax + Bu
$$

where $x$ is the state vector and $u$ the control input. Unlike PID, which only sees one error signal, LQR sees the entire state.

## The Cost Function

LQR minimizes a quadratic cost:

$$
J = \int_0^\infty \left( x^T Q x + u^T R u \right) dt
$$

The two terms encode a trade-off: $x^T Q x$ penalizes deviations from the desired state, while $u^T R u$ penalizes control effort (energy). Choosing $Q$ and $R$ is choosing what you care about more — staying accurate or staying efficient.

## State Feedback

The solution is remarkably clean: a constant state-feedback gain matrix $K$ such that

$$
u = -Kx
$$

$K$ is computed once (for example by solving the algebraic Riccati equation) and then reused. At runtime, the controller is just a matrix-vector multiply.

## Q and R Intuition

- Large $Q$ (relative to $R$): "get there fast and stay there" — aggressive but energy-hungry.
- Large $R$ (relative to $Q$): "be gentle" — smoother but slower to correct.
- Only ratios matter — scaling both $Q$ and $R$ together does not change $K$.

## LQR vs PID

PID shines for simple single-input loops and is easy to explain and tune. LQR shines for multi-state systems — a balancing robot, a drone — where you want principled, all-states feedback. LQR also provides stability guarantees and optimality, at the cost of needing an accurate model.

## Summary

- LQR works on the full state, not a single error signal.
- The cost function balances accuracy ($Q$) against effort ($R$).
- The result is a constant gain $u = -Kx$, making runtime evaluation trivial.
