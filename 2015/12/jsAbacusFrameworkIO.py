import re
from functools import reduce

filename = "input.txt"

with open(filename, "r") as inputData:
    content: str = inputData.readline()

print(reduce(lambda x,y: x + y,[int(x) for x in re.findall(r"-?\d+", content)]))