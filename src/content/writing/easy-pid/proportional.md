---
title: "比例控制（P）"
description: "从洗澡调水温讲起：知道什么是闭环控制之后，让推力和误差成正比，就得到了 P 控制。"
date: 2026-10-14
draft: false
---

首先，在理解 PID 控制之前，我们需要知道什么是闭环控制。

生活中我们其实会非常自然地使用闭环控制，就像洗澡时调整水温一样：水温热了你会往右边调，冷了就往左边调，直到水温合适。所以对于一个闭环控制，我们是需要看到输出结果，并且与预期目标做对比的，然后再修正自己的输出。这是十分符合逻辑的——如果要达到预期的成果，你就需要实时比对结果与目标，然后再做出改变。

![闭环控制与受力示意图](/writing/easy-pid/figure1.jpg)

这是一个简单的闭环控制，通过直接控制给物块的力来让物块到达目标位置。那么我们现在思考一下：如果我要控制物块到目标位置，是不是就需要让物块在靠近目标位置的时候减小推力？等到了目标点的时候就变成不推物块？所以我们就需要关注当前位置与目标位置的误差。记

$$
e(t) = x_{ref} - x(t)
$$

那么误差很小的时候 $e(t)$ 就很小，同时我们也希望推力相应变小，所以如果我们让

$$
F = K_p\, e(t) \qquad (K_p > 0,\ \text{定义 } F \text{ 向右为正})
$$

这样就得到一个线性相关的推力函数：误差大推力大，误差小推力小。这就是 proportional control（P control / 比例控制），是不是让你回忆起了弹簧的胡克定律 $F = -Kx$？

你可以复制一下下面的 python 仿真代码，自己手动调整控制参数 $K_p$ 和目标 $x_{ref}$，来看一下 P 控制的效果。

```python
import matplotlib.pyplot as plt

# Initialization
m = 1

# Coulomb friction
friction = 5

x_t = 0       # current position
v_t = 0       # current velocity

# P control parameters
x_ref = 20      # try 10: the block almost does not move; try 40: large overshoot
Kp = 0.5

# Simulation parameters
time = 50
step = 1 / 1000

# Save data
x_history = []
t_history = []

t = 0

while t < time:

    # Position error
    error = x_ref - x_t

    # -------- P controller -------- #

    F = Kp * error

    # -------- Physical system -------- #

    # Coulomb friction
    if abs(v_t) > 1e-5:
        F_f = friction if v_t > 0 else -friction
    else:
        F_f = 0

    # Newton's second law
    a = (F - F_f) / m

    # Update velocity and position
    v_t += a * step
    x_t += v_t * step

    # Save data
    x_history.append(x_t)
    t_history.append(t)

    t += step

# Plot
plt.figure(figsize=(8,4))
plt.plot(t_history, x_history, label="Position x(t)")
plt.axhline(x_ref, linestyle="--", label="Target position")
plt.xlabel("Time (s)")
plt.ylabel("Position")
plt.title("P Position Control with Coulomb Friction")
plt.legend()
plt.grid()
plt.show()
```

我们不需要关注 physical simulation 部分的代码，那一部分只是用于去模拟系统。重要的是，你只需要知道我们的 `F = Kp * error`，然后看曲线就知道物块随时间的变化了。

如果直接运行 P 控制的代码，那么你得到的结果如下：

![P 控制：x_ref = 20](/writing/easy-pid/result1.png)

我们可以看到，即使有摩擦，系统依然能到达目标，说明 P 控制还是能实现到达目标的。但是如果你保持现在的 $K_p$，然后修改 $x_{ref} = 10$ 或 40，你会发现，在 $x_{ref} = 10$ 的时候物块几乎不前进，而在 $x_{ref} = 40$ 的时候物块却远远超过了目标位置后才回来（这种现象叫超调）。你可以在不同的目标下用不同的参数，这的确能使得物块到达目标位置，但是在程序跑的时候，我们是不能直接改参数的。而 PID 的 I 控制和 D 控制就是用来解决这两种情况的。
