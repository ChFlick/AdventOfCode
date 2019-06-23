filename = "/home/chris/dev/adventOfCode/2015/19/input.txt"

def step(start, rules):
    results = []
    for rule in rules:
        indices = []
        replaceLen = len(rule[0])
        for i in range(len(start) - (replaceLen - 1)):
            if start[i:i + replaceLen] == rule[0]:
                indices.append(i)
        
        for i in indices:
            results.append(start[:i] + rule[1] + start[i + replaceLen:])
    return results

rules = []
goal = ""
current = set(["e"])
with open(filename, "r") as inputData:
    for line in inputData:
        if line.count("=>") > 0:
            rules.append((line.split(" ")[0], line.split(" ")[2].replace("\n","")))
        elif len(line) > 0:
            goal = line

iterations = 0
while goal not in current:
    nextCurrent = []
    for val in current:
        nextCurrent = nextCurrent + step(val, rules)
    current = set(nextCurrent)
    iterations = iterations + 1
    print(iterations)

print(current)
print(iterations)