def parse_to_int(a):
    return [int(x) for x in a]


lines = open("input.txt", "r").readlines()
areas = {}

for line in lines:
    # id = line[1:line.find("@")].strip()
    startCoordinates = parse_to_int(line[line.find("@") + 1:line.find(":")].strip().split(","))
    size = parse_to_int(line[line.find(":") + 1:].strip().split("x"))

    for x in range(startCoordinates[0], startCoordinates[0] + size[0]):
        for y in range(startCoordinates[1], startCoordinates[1] + size[1]):
            areas[(x, y)] = areas.get((x, y), 0) + 1

print(len([v for k, v in areas.items() if v > 1]))
