y = 29000000

for i in range(600000, 10000000):
    v = 0
    for j in range(1,i + 1):
        if i % j == 0:
            v = v + 10 * j
    if v > y - 1:
        print(i, v)
        break
    if i % 1000 == 0:
        print(i, v)