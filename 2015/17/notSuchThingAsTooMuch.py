from itertools import groupby

TARGET = 150
# TARGET = 25
possibilities = []

def sumsUp(numbers, partial):
    val = sum(partial)
    if val == TARGET:
        possibilities.append(partial)
        return
    elif val > TARGET:
        return

    for i in range(len(numbers)):
        n = numbers[i]
        rest = numbers[i+1:]
        sumsUp(rest, partial + [n])

containers = [33, 14, 18, 20, 45, 35, 16, 35, 1, 13, 18, 13, 50, 44, 48, 6, 24, 41, 30, 42]
# containers = [20, 15, 10, 5, 5]

sumsUp(containers, [])

print(possibilities)
print(len(possibilities))


