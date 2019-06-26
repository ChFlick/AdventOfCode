from itertools import combinations
from functools import reduce
import time

def quantumEntanglement(iterable):
    return reduce(lambda x,y: x*y, iterable)

weights = [1, 2, 3, 7, 11, 13, 17, 19, 23, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113]
# weights = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13 ,14]

weights.reverse()

groupWeight = sum(weights) / 4 # 3 for V1
combies = []

for i in range(1, 8):
    if len(combies) > 0:
        break
    for comb in combinations(weights, i):
        if sum(comb) == groupWeight:
            combies.append(comb)

print(min([quantumEntanglement(x) for x in combies]))