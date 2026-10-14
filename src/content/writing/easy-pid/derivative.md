---
title: "微分控制（D）"
description: "给系统加上阻尼，压掉 PI 留下的超调，最后说怎么调这三个参数。"
date: 2026-10-14
draft: false
---

现在我们解决了稳态误差，还剩下超调没有解决，而微分控制就是用来解决它的。虽然 PID 的 D 应该是叫做 differential controller，但是也有些人会叫做 damper（阻尼器），这是因为微分项实际上就是干这个事情的。那么阻尼是什么呢？想象一下你在泳池里面行走，你发现你走得越快，你的阻力就越大；而慢慢走反而还轻松一些。所以实际上微分控制器也和误差变化速度有关——现在只要 PI 控制器让误差减小得太快，D 控制器就会踩住刹车，阻止物块前进得太快。

$$
D_{term} = K_d \frac{de(t)}{dt}
$$

在实际工程中，由于计算机处理的是离散数据，所以我们通常会写成 $D_{term} = K_d (error - last\_error)$，做一个差分，其中 $\Delta t$ 被合并到 $K_d$ 中了。

![PID 控制的结构](/writing/easy-pid/figure3.jpg)

如图所示，现在 PID 控制器就是把所有控制器的输出加起来，然后得到 PID 控制器的输出。我们依然需要对 PID 控制器做输出限幅，这是因为假设 $x = 0$、$x_{ref} = 100000$，那么由于误差会非常大，P 项会输出非常大的值；在速度涨上来之后，D 项也会输出非常大的阻力。这会导致 PID 控制器有可能会输出很大的一个数，所以为了避免烧坏执行器，我们需要对输出进行限幅。完整的 PID 控制器的 python 代码如下：

```python
import matplotlib.pyplot as plt

# Initialization
m = 1

# Coulomb friction
friction = 5
x_t = 0       # current position
v_t = 0       # current velocity

# PID control parameters
x_ref = 10
Kp = 100
Ki = 0.00008
Kd = 500000
max_integral_output = 5

# Simulation parameters
time = 200
step = 1 / 1000

# Save data
x_history = []
t_history = []

# Integral state
error_integral = 0

# Previous error for derivative term
last_error = 0

t = 0

while t < time:
    # Position error
    error = x_ref - x_t

    # -------- PID controller -------- #

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

    # Derivative term
    D_term = Kd * (error - last_error)

    # Update previous error
    last_error = error

    # Controller output force
    F = P_term + I_term + D_term

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
plt.title("PID Position Control with Coulomb Friction")
plt.legend()
plt.grid()
plt.show()
```

![PID 控制：Kp 从 0.5 调到 100](/writing/easy-pid/result3.png)

你可以发现，一旦加入了微分项，我们可以调非常大的 $K_p$ 来让系统快速反应，同时大 $K_p$ 也让小误差时产生较大的输出。

好了，最后再简要讲一下如何去调 PID 的参数：PID 调参通常先调 $K_p$，增加直到系统接近振荡边界，再降低以获得较快的响应；之后加入 $K_i$ 消除稳态误差，但避免过大的积分导致积分饱和与振荡；最后加入 $K_d$ 增加阻尼，减少超调和振荡。若增加 $K_d$ 后系统变差，需要检查积分累积、噪声放大以及参数匹配问题。对于大多数机械位置控制，PD 控制已经足够，PI/PID 主要用于存在持续扰动，或者摩擦会产生明显误差的情况。
