result = 0
inputFile = open("input.txt", "r")
for line in inputFile:
    multiplier = -1 if line[0] == "-" else 1
    result += multiplier * int(line[1:])
print(result)
