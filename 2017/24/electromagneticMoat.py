from functools import reduce

filename = "input.txt"

with open(filename, "r") as inFile:
    bridges = [x.replace("\n", "").split("/") for x in inFile.readlines()]

bridges = [(int(x[0]), int(x[1])) for x in bridges]

def maxBridgeConnections(currentComponents, freeElement, bridges):
    fittingBridges = [x for x in bridges if x.count(freeElement) > 0]
    if len(fittingBridges) == 0:
        return calcVal(currentComponents)
    
    maxVal = 0
    for bridge in fittingBridges:
        index = bridges.index(bridge)
        bridgesWithoutCurrent = bridges[:index] + bridges[index + 1:]
        nextVal = maxBridgeConnections(currentComponents + [bridge], bridge[1] if bridge[0] == freeElement else bridge[0], bridgesWithoutCurrent)
        maxVal = max(maxVal, nextVal)

    return maxVal

def calcVal(bridges):
    return reduce(lambda x,y: x + sum(y), bridges, 0)

starters = [x for x in bridges if x[0] == 0 or x[1] == 0]
rest = [x for x in bridges if x[0] != 0 and x[1] != 0]

print(max([maxBridgeConnections([x], x[1] if x[0] == 0 else x[0], rest) for x in starters]))