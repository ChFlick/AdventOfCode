from PIL import Image
import numpy as np

filename = "/home/chris/adventOfCode/2015/06/input.txt"

content: list

with open(filename, "r") as inputData:
    content = inputData.readlines()

lamps = [[False for j in range(1000) ] for i in range(1000)]

for line in content:
    if line.count("turn on") > 0:
        line = line.replace("turn on", "turnon")
    if line.count("turn off") > 0:
        line = line.replace("turn off", "turnoff")

    values = line.split()
    startPosX, startPosY = list(map(int, values[1].split(",")))
    endPosX, endPosY = list(map(int, values[3].split(",")))

    if values[0] == "turnon":
        for x in range(startPosX, endPosX + 1):
            for y in range(startPosY, endPosY + 1):
                lamps[x][y] = True 
    if values[0] == "turnoff":
        for x in range(startPosX, endPosX + 1):
            for y in range(startPosY, endPosY + 1):
                lamps[x][y] = False
    if values[0] == "toggle":
        for x in range(startPosX, endPosX + 1):
            for y in range(startPosY, endPosY + 1):
                lamps[x][y] = not lamps[x][y]

count = 0
for x in range(0, 1000):
    for y in range(0, 1000):
        if lamps[x][y]:
            count = count + 1
print(count)

Image.fromarray(np.array(lamps)).save("result.jpg")