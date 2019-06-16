from functools import reduce
import re

filename = "input.txt"

content: list

with open(filename, "r") as inputData:
    content = [line.replace("\n", "") for line in inputData.readlines()]

codesizes = [len(line) for line in content]
textsizes = []
for line in content:
    newline = line[1:][:-1]
    newline = re.sub(r"\\x[a-f0-9]{2}", "a", newline)
    newline = newline.replace("\\\\", "a")
    newline = newline.replace("\\\"", "a")
    print(newline)
    textsizes.append(len(newline))

codesize = reduce((lambda x,y: x + y), codesizes)
textsize = reduce((lambda x,y: x + y), textsizes)
print(codesize - textsize)