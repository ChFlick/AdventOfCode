filename = "input.txt"

rules = []
start = ""
with open(filename, "r") as inputData:
    for line in inputData:
        if line.count("=>") > 0:
            rules.append((line.split(" ")[0], line.split(" ")[2].replace("\n","")))
        elif len(line) > 0:
            start = line

print(rules, start)

results = set()
for rule in rules:
    indices = []
    replaceLen = len(rule[0])
    for i in range(len(start) - (replaceLen - 1)):
        if start[i:i + replaceLen] == rule[0]:
            indices.append(i)
    
    for i in indices:
        results.add(start[:i] + rule[1] + start[i + replaceLen:])

print(results)
print(len(results))