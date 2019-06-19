from functools import reduce

filename = "input.txt"

with open(filename, "r") as inputData:
    content: str = [x.split(" ") for x in inputData.readlines()]

combinations = [(int(x[2][:-1]), int(x[4][:-1]), int(x[6][:-1]), int(x[8][:-1])) for x in content]

maxScore = 0
for i in range(1, 101):
    for j in range(1, 101):
        if i+j > 100:
            continue
        for k in range(1, 101):
            if i+j+k > 100:
                continue
            for l in range(1, 101):
                if i+j+k+l > 100:
                    continue

                a = i * combinations[0][0] + i * combinations[1][0] + i * combinations[2][0] + i * combinations[3][0]
                b = j * combinations[0][1] + j * combinations[1][1] + j * combinations[2][1] + j * combinations[3][1]
                c = k * combinations[0][2] + k * combinations[1][2] + k * combinations[2][2] + k * combinations[3][2]
                d = l * combinations[0][3] + l * combinations[1][3] + l * combinations[2][3] + l * combinations[3][3]

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