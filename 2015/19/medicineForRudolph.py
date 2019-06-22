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