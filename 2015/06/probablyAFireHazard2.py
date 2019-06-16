from PIL import Image
import numpy as np

filename = "input.txt"

content: list

with open(filename, "r") as inputData:
    content = inputData.readlines()

lamps = [[0 for j in range(1000) ] for i in range(1000)]

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
                lamps[x][y] = lamps[x][y] + 1 
    if values[0] == "turnoff":
        for x in range(startPosX, endPosX + 1):
            for y in range(startPosY, endPosY + 1):
                lamps[x][y] = lamps[x][y] - 1
                if(lamps[x][y] < 0):
                    lamps[x][y] = 0
    if values[0] == "toggle":
        for x in range(startPosX, endPosX + 1):
            for y in range(startPosY, endPosY + 1):
                lamps[x][y] = lamps[x][y] + 2

count = 0
for x in range(0, 1000):
    for y in range(0, 1000):
        count = count + lamps[x][y]
print(count)

Image.fromarray(np.array(lamps), "1").save("resultTwo.jpg")
