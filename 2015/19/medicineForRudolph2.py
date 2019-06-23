import time

filename = "/home/chris/dev/adventOfCode/2015/19/input.txt"

rules = []
current = ""
goal = "e"
with open(filename, "r") as inputData:
    for line in inputData:
        if line.count("=>") > 0:
            rules.append((line.split(" ")[0], line.split(" ")[2].replace("\n","")))
        elif len(line) > 0:
            current = line

iterations = 0
results = [x[1] for x in rules]
while not current == goal:
    indices = [current.rfind(x) for x in results]
    maxIndex = max(indices)
    maxIndexResult = rules[indices.index(max(indices))][0]
    print(indices, maxIndex, maxIndexResult)

    current = current[:maxIndex] + maxIndexResult
    print(current)

    # time.sleep(.100)
    iterations = iterations + 1

print(current)
print(iterations)