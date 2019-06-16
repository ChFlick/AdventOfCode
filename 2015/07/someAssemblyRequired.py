from PIL import Image
import numpy as np

actions = {
    "ALLOCATION": lambda x1, x2: x1,
    "AND": lambda x1, x2: x1 & x2,
    "OR": lambda x1, x2: x1 | x2,
    "LSHIFT": lambda x1, x2: x1 << x2,
    "RSHIFT": lambda x1, x2: x1 >> x2,
    "NOT": lambda x1, x2: 65536 - (x1 + 1)
}

class Operation(object):
    x2 = None
    def __init__(self, line: str):
        lineData = line.split()
        if line.count("NOT") > 0:
            self.action = "NOT"
            self.x1 = lineData[1]
            self.y = lineData[3]
        elif len(lineData) == 3:
            self.action = "ALLOCATION"
            self.x1 = lineData[0]
            self.y = lineData[2]
        else:
            self.action = lineData[1]
            self.x1 = lineData[0]
            self.x2 = lineData[2]
            self.y = lineData[4]

    def canStart(self, values):
        return (self.x1.isdigit() or values.get(self.x1) is not None) and (self.x2 is None or self.x2.isdigit() or values.get(self.x2) is not None)

    def execute(self, values):
        x1val = int(self.x1) if self.x1.isdigit() else values.get(self.x1)
        x2val = None if self.x2 is None else int(self.x2) if self.x2.isdigit() else values.get(self.x2)
        values[self.y] = actions[self.action](x1val, x2val)
        return values

filename = "input_2.txt"

content: list

with open(filename, "r") as inputData:
    content = inputData.readlines()

values = {}
operations = [Operation(l) for l in content]

while len(operations) > 0:
    for op in operations:
        if op.canStart(values):
            values = op.execute(values)
            operations.remove(op)
            
print(values)
print(values["a"])