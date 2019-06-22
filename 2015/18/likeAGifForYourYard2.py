from PIL import Image
import numpy as np
from functools import reduce
import imageio
import os
import matplotlib.pyplot as plt
import matplotlib.cm as cm

def isMarked(i, j, arr):
    return i < 100 and j < 100 and i > -1 and j > -1 and arr[i][j] == "#"

def iteration(arr):
    next = []
    for i in range(len(arr)):
        nextl = ""
        for j in range(len(arr)):
            if (i == 0 and j == 0) or (i == 0 and j == 99) or (i == 99 and j == 0) or (i == 99 and j == 99):
                nextl = nextl + "#"
                continue

            count = 0
            for x in range(-1, 2):
                for y in range(-1, 2):
                    if x == 0 and y == 0:
                        continue
                    count = count + isMarked(i - x, j - y, arr)
            current = isMarked(i, j, arr)
            if (current and (count == 2 or count == 3)) or (not current and count == 3):
                nextl = nextl + "#"
            else:
                nextl = nextl + "."
        next.append(nextl)
    return next

filename = "input2.txt"

with open(filename, "r") as inputData:
    content: str = [x.replace("\n", "") for x in inputData.readlines()]


gifnames = []
for i in range(100):
    content = iteration(content)

    bol = []
    for x in content:
        bol.append([y == "#" for y in x])

    gifnames.append("result" + str(i) + ".jpg")
    plt.imsave("result" + str(i) + ".jpg", np.array(bol), cmap=cm.gray)
    
result = sum([reduce(lambda x,y: x + (1 if y == "#" else 0), line, 0) for line in content])
print(result)

images = []
for filename in gifnames:
    images.append(imageio.imread(filename))
    os.remove(filename)
imageio.mimsave('render2.gif', images)
