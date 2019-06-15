filename = "input.txt"

with open(filename, "r") as inputFile:
    data = inputFile.readlines()

sizes = [v.replace("\n", "") for v in data]

summedSize = 0

for size in sizes:
    l, w, h = size.split("x")
    l = int(l)
    w = int(w)
    h = int(h)
    summedSize += 2 * l * w
    summedSize += 2 * w * h
    summedSize += 2 * h * l
    summedSize += min([l * w, w * h, h * l])

print(summedSize)