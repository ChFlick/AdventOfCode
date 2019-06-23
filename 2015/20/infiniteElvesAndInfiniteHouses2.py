y = 29000000

houses = [0] * 2900000
for i in range(1, 2900000):
    for j in range(i, i + 50 * i, i):
        if j > 2900000 - 1:
            break
        houses[j] += i * 11


for i in range(len(houses)):
    if houses[i] > y - 1:
        print(houses[i], i)
        break
