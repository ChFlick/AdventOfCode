from itertools import permutations

weights = [1, 2, 3, 7, 11, 13, 17, 19, 23, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113]
# weights = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11]

groupWeight = sum(weights) / 3

possibilities = set()

def findGroup(currentTree, rest, maxSum):
    if len(rest) == 0:
        return
    if sum(currentTree) > maxSum:
        return
    if sum(currentTree) == maxSum:
        currentTree.sort()
        possibilities.add(tuple(currentTree))
        #  skip if already added
        findGroup([], rest, maxSum)
    
    for i in range(len(rest)):
        findGroup(currentTree + [rest[i]], rest[:i] + rest[i + 1:], maxSum)

findGroup([], weights, groupWeight)
# print(len(possibilities))
# print(possibilities)

minSize = len(min(possibilities, key=len))
minPossibilities = [x for x in possibilities if len(x) == minSize]
print(minPossibilities)