from PIL import Image
import numpy as np
from functools import reduce

def isMarked(i, j, arr):
    return i < 100 and j < 100 and i > -1 and j > -1 and arr[i][j] == "."

def iteration(arr):
    next = []
    for i in range(len(arr)):
        nextl = ""
        for j in range(len(arr)):
            count = 0
            for x in range(-1, 2):
                for y in range(-1, 2):
                    if x == 0 and y == 0:
                        continue
                    count = count + isMarked(i - x, j - y, arr)
            current = isMarked(i, j, arr)
            if (current and (count == 2 or count == 3)) or (not current and count == 3):
                nextl = nextl + "."
            else:
                nextl = nextl + "#"
        next.append(nextl)
    return next

filename = "/home/chris/dev/adventOfCode/2015/18/input.txt"

with open(filename, "r") as inputData:
    content: str = [x.replace("\n", "") for x in inputData.readlines()]

for i in range(100):
    content = iteration(content)
    print(content)

result = sum([reduce(lambda x,y: x + (1 if y == "#" else 0), line, 0) for line in content])
print(result)

bol = []
for x in content:
    bol.append([y == "#" for y in x])

Image.fromarray(np.array(bol)).save("result.jpg")