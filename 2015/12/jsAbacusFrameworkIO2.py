import re
import json

filename = "input.txt"

with open(filename, "r") as inputData:
    content: str = inputData.readline()

print([x for x in json.loads(content)[0]])