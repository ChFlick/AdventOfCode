from itertools import groupby

result = 0
lines = open("input.txt", "r").readlines()
twos = 0
threes = 0
for line in lines:
    # sort the array 1, 1, 1, 2, 2, 3, 3
    # group it 1 = [1, 1, 1], 2 = [2, 2]...
    # count the group lengths [3, 2, 2]
    charOccursionsCount = [len(list(group)) for key, group in groupby(sorted(line))]
    if 2 in charOccursionsCount:
        twos += 1
    if 3 in charOccursionsCount:
        threes += 1
print(twos * threes)
