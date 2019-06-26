from itertools import permutations
from functools import reduce
import time

weights = [1, 2, 3, 7, 11, 13, 17, 19, 23, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113]
# weights = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13 ,14]

weights.reverse()

groupWeight = sum(weights) / 3

possibilities = set()
seenRest = set()
minLen = 999

def quantumEntanglement(tup):
    return reduce(lambda x,y: x*y, tup)

def findGroup(currentTree, rest, maxSum):
    global minLen

    if len(currentTree) > minLen:
        return
    if len(rest) == 0:
        return
    if sum(currentTree) > maxSum:
        return
    if sum(currentTree) == maxSum:
        currentTree.sort()
        if tuple(currentTree) not in possibilities:
            possibilities.add(tuple(currentTree))
            minLen = min([minLen, len(currentTree)])
            if tuple(rest) not in seenRest:
                seenRest.add(tuple(rest))
                findGroup([], rest, maxSum)
    
    for i in range(len(rest)):
        findGroup(currentTree + [rest[i]], rest[i + 1:], maxSum)

findGroup([], weights, groupWeight)

print(possibilities)

minSize = len(min(possibilities, key=len))
minPossibilities = [x for x in possibilities if len(x) == minSize]
# print(minPossibilities)
print(len(minPossibilities))
# print([quantumEntanglement(x) for x in minPossibilities])
print(min([quantumEntanglement(x) for x in minPossibilities]))