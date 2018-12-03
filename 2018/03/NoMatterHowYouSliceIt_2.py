def parse_to_int(a):
    return [int(x) for x in a]


lines = open("input.txt", "r").readlines()
areas = {}

#calc positions as in #1
for line in lines:
    startCoordinates = parse_to_int(line[line.find("@") + 1:line.find(":")].strip().split(","))
    size = parse_to_int(line[line.find(":") + 1:].strip().split("x"))

    for x in range(startCoordinates[0], startCoordinates[0] + size[0]):
        for y in range(startCoordinates[1], startCoordinates[1] + size[1]):
            areas[(x, y)] = areas.get((x, y), 0) + 1

#check the stuff
for line in lines:
    overlaps = False
    id = line[1:line.find("@")].strip()
    startCoordinates = parse_to_int(line[line.find("@") + 1:line.find(":")].strip().split(","))
    size = parse_to_int(line[line.find(":") + 1:].strip().split("x"))

    for x in range(startCoordinates[0], startCoordinates[0] + size[0]):
        for y in range(startCoordinates[1], startCoordinates[1] + size[1]):
            if not overlaps and areas.get((x, y), 0) > 1:
                overlaps = True

    if not overlaps:
        print(id)

