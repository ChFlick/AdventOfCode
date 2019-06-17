from itertools import permutations

filename = "/home/chris/dev/adventOfCode/2015/09/input.txt"

with open(filename, "r") as inputData:
    content = inputData.readlines()

class Route(object):
    def __init__(self, start, stop, costs):
        self.start = start
        self.stop = stop
        self.costs = costs

def calulateCosts(path, routes):
    costs = 0
    for i in range(len(path) - 1):
        start = path[i]
        stop = path[i + 1]
        for route in routes:
            if (route.start == start or route.start == stop) and (route.stop == stop or route.stop == start):
                costs = costs + route.costs
    return costs


routes = []
cities = set()
for line in content:
    vals = line.split()
    cities.add(vals[0])
    cities.add(vals[2])
    routes.append(Route(vals[0], vals[2], int(vals[4])))

costs = [calulateCosts(x, routes) for x in permutations(cities)]
print(min(costs))
print(max(costs))