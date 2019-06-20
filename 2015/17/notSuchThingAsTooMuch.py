from itertools import permutations

containers = [33, 14, 18, 20, 45, 35, 16, 35, 1, 13, 18, 13, 50, 44, 48, 6, 24, 41, 30, 42]

TARGET = 150
possibilities = []

for perm in permutations(containers):
    sum = 0
    for i in range(len(perm)):
        sum = sum + perm[i]
        if sum == TARGET:
            possibilities.append(perm[0:i])
        elif sum > TARGET:
            break

print(possibilities)
print(len(possibilities))