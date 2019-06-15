filename = "./01/input.txt"

with open(filename, "r") as inputFile:
    data = inputFile.readline()

result = 0

for v in data:
    result = result + 1 if v is "(" else result - 1

print(result)