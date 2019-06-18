from itertools import permutations

filename = "input.txt"

with open(filename, "r") as inputData:
    content: str = inputData.readlines()

content = [x.split(" ") for x in content]
duration = 2503

results = []
for line in content:
    speed = int(line[3])
    time = int(line[6])
    wait = int(line[13])

    base = int(duration / (time + wait)) * speed * time
    
    rest = duration % (time + wait)
    if rest > time:
        result = base + speed * time
    else:
        result = base + speed * rest

    results.append(result)

print(max(results))

