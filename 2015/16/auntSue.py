giftAunt = {
    "children": 3,
    "cats": 7,
    "samoyeds": 2,
    "pomeranians": 3,
    "akitas": 0,
    "vizslas": 0,
    "goldfish": 5,
    "trees": 3,
    "cars": 2,
    "perfumes": 1
}

filename = "/home/chris/dev/adventOfCode/2015/16/input.txt"

with open(filename, "r") as inputData:
    content: str = [x.split(" ") for x in inputData.readlines()]

aunts = []
for line in content:
    aunt = {"n": int(line[1][:-1])}
    for i in range(2, len(line), 2):
        aunt[line[i].replace(":", "")] = int(line[i+1].replace(",", ""))
    aunts.append(aunt)

for prop in giftAunt:
    aunts = [x for x in aunts if prop not in x or x[prop] == giftAunt[prop]]

print(aunts, len(aunts))