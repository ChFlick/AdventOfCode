from PIL import Image
import numpy as np

def iteration(arr):
    for i in range(len(arr)):
        for j in range(len(arr)):
            

filename = "input.txt"

with open(filename, "r") as inputData:
    content: str = [x.replace("\n", "") for x in inputData.readlines()]

print(content[50][50])

bol = []
for x in content:
    bol.append([y == "#" for y in x])

Image.fromarray(np.array(bol)).save("result.jpg")