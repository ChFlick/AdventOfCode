y = 29000000

houses = [0] * 2900000
for i in range(1, 2900000):
    for j in range(i, 2900000, i):
        houses[j] += i * 10

for i in range(len(houses)):
    if houses[i] > y - 1:
        print(houses[i], i)
        break
