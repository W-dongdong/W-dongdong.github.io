---
title: "积分控制（I）"
description: "把误差随时间累加起来，解决 P 控制过不去的静态误差。"
date: 2026-10-14
draft: false
---

接下来我们先看 $x_{ref} = 10$ 的时候为什么会这样。当 $x_{ref} = 10$ 的时候，物块不动是因为输出 $F$ 的力小于摩擦力——因为误差很小，所以 $K_p e(t)$ 才会输出很小，而当输出小于摩擦力的时候，物块就无法启动了。那么，如果我们把误差随时间进行累加，然后作为输出呢？

举个例子：当 $x_{ref} = 10$ 的时候，第一个控制循环中误差是 10，那么积分控制器的输出就是 $I_{term} = K_i \cdot 10 \cdot \Delta t_1$；假设物块还是不动，那么在下一次循环中积分器的输出就变成了 $I_{term} = K_i (10 \cdot \Delta t_2 + 10 \cdot \Delta t_1)$。于是误差不断累加，直到输出的力 $F$ 能够使得物块移动。这样物块终于不会卡在原地了，总算是解决了静态误差。比例控制和积分控制一起叫做 PI 控制，它的输出就是 P 控制输出 + I 控制输出。

![PI 控制的结构](/writing/easy-pid/figure2.jpg)

由于 PI 控制器是被周期性调用的，所以 $\Delta t$ 变成一个常数，合并到了 $K_i$ 里面。

但是值得注意的是，积分控制器具有滞后性，也可以说是有一种惯性。如何理解呢？假设现在物块从原点开始向目标前进，在 PI 控制下已经到了目标点了，此时 $P(t) = 0$，但是 $I(t)$ 不是 0，因为之前累加的误差依然存在，所以依然会推着物块往前走。然后等超过目标点之后，积分器里面累加的正的误差现在要累加负的误差，于是积分器又会推着物块往回走。这就是系统振荡的来源。所以 PI 控制器依然会导致系统严重超调，不过好消息是解决了静态误差。

另外重要的一点是：积分控制器一定需要设置输出范围。假设物块现在在原点被石头卡住了，无法前进，那么积分器会疯狂地积累输出，直到能推动物块；但如果此时物块没有了阻碍，积分器就会输出一个非常大的推力，以至于物块直接飞过目标点。而在现实工程中，这种情况一般会导致物体本身机械结构的损害——当物体卡在墙角，如果不限幅，就会使得输出一直增大，直至烧毁控制器，或者机器人变成碎片。

接下来是 PI 控制的 python 代码：

```python
import matplotlib.pyplot as plt

# Initialization
m = 1

# Coulomb friction
friction = 5

x_t = 0       # current position
v_t = 0       # current velocity

# PI control parameters
x_ref = 10
Kp = 0.5
Ki = 0.00008
max_integral_output = 5

# Simulation parameters
time = 200
step = 1 / 1000

# Save data
x_history = []
t_history = []

# Integral state
error_integral = 0

t = 0
while t < time:

    # Position error
    error = x_ref - x_t

    # -------- PI controller -------- #

    # Integral accumulation
    error_integral += error

    # Proportional term
    P_term = Kp * error

    # Integral term
    I_term = Ki * error_integral

    # Integral output limit (anti-windup)
    if I_term > max_integral_output:
        I_term = max_integral_output

    elif I_term < -max_integral_output:
        I_term = -max_integral_output

    # Controller output force
    F = P_term + I_term

    # -------- Output limitation -------- #

    max_force = 1000

    if F > max_force:
        F = max_force

    elif F < -max_force:
        F = -max_force

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
plt.title("PI Position Control with Coulomb Friction")
plt.legend()
plt.grid()
plt.show()
```

![PI 控制：Kp 不变，x_ref = 10](/writing/easy-pid/result2.png)

我们发现在相同参数下，$x_{ref} = 10$ 的静态误差几乎被消除了，但是却引入了系统的振荡（在 t = 2000 的时候你会非常明显地看到振荡）。你可以调大 time 或者调大 Ki，来更加明显地看到系统的振荡。
