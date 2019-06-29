filename = "input.txt"

with open(filename, "r") as inFile:
    movements = inFile.readline().split(", ")

visited = set()
pos = [0, 0]
dir = 0

def addAndCheckVisit(pos):
    if pos in visited:
        print(abs(pos[0]) + abs(pos[1]))
        exit(0)
    else:
        visited.add(pos)

for x in movements:
    dir += 1 if x[0] == "R" else -1
    dir %= 4

    oldPos = pos.copy()

    if dir == 0:
        for i in range(int(x[1:])):
            addAndCheckVisit((pos[0], pos[1] + i))
        pos[1] += int(x[1:])
    elif dir == 1:
        for i in range(int(x[1:])):
            addAndCheckVisit((pos[0] + i, pos[1]))
        pos[0] += int(x[1:])
    elif dir == 2:
        for i in range(int(x[1:])):
            addAndCheckVisit((pos[0], pos[1] - i))
        pos[1] -= int(x[1:])
    elif dir == 3:
        for i in range(int(x[1:])):
            addAndCheckVisit((pos[0] - i, pos[1]))
        pos[0] -= int(x[1:])
