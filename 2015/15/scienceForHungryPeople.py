from functools import reduce

filename = "/c/dev/AdventOfCode/2015/15/input.txt"

with open(filename, "r") as inputData:
    content: str = [x.split(" ") for x in inputData.readlines()]

combinations = [(int(x[2][:-1]), int(x[4][:-1]), int(x[6][:-1]), int(x[8][:-1])) for x in content]

maxScore = 0
for i in range(1, 101):
    for j in range(1, 101 - i):
        for k in range(1, 101 - i - j):
            l = 100 - i - j - k

            a = i * combinations[0][0] + j * combinations[1][0] + k * combinations[2][0] + l * combinations[3][0]
            b = i * combinations[0][1] + j * combinations[1][1] + k * combinations[2][1] + l * combinations[3][1]
            c = i * combinations[0][2] + j * combinations[1][2] + k * combinations[2][2] + l * combinations[3][2]
            d = i * combinations[0][3] + j * combinations[1][3] + k * combinations[2][3] + l * combinations[3][3]
            #print(i, j, k, l)
            # print(a, b, c, d)
            # print(combinations)

            if a < 0:
                a = 0
            if b < 0:
                b = 0
            if c < 0:
                c = 0
            if d < 0:
                d = 0
            if a * b * c * d > maxScore:
                maxScore = a * b * c * d

print(maxScore)