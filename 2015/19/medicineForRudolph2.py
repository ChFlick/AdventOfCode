import time

filename = "input.txt"

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
results.sort(key=len)
results.reverse()
while not current == goal:
    index = -1
    indexRule = ""
    for r in results:
        index = current.rfind(r)
        if index > -1:
            indexRule = r
            break

    indexReplacement = [x for x in rules if x[1] == indexRule][0][0]
    # print(index, indexRule, indexReplacement)

    current = current[:index] + indexReplacement + current[index + len(indexRule):]
    # print(current)

    # time.sleep(.100)
    iterations = iterations + 1

print(iterations)