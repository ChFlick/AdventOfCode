import re
import json
from functools import reduce

filename = "input.txt"

def addNumberNotRed(node):
    if type(node) is dict:
        return 0 if reduce(lambda x,y: x or y, [node.get(x) == "red" for x in node]) else reduce(lambda x,y: x + y, [addNumberNotRed(node.get(x)) for x in node])
    if type(node) is list:
        return reduce(lambda x,y: x + y, [addNumberNotRed(x) for x in node])
    if type(node) is str:
        return 0
    if type(node) is int:
        return node


with open(filename, "r") as inputData:
    content: str = inputData.readline()

print(addNumberNotRed(json.loads(content)))
# print(addNumberNotRed([1, 2, [3, "red", 4]]))
# print(addNumberNotRed([1,{"c":"red","b":2},3]))