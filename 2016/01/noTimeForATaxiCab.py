filename = "input.txt"

with open(filename, "r") as inFile:
    movements = inFile.readline().split(", ")

pos = [0, 0]
dir = 0

for x in movements:
    dir += 1 if x[0] == "R" else -1
    dir %= 4

    if dir == 0:
        pos[1] += int(x[1:])
    elif dir == 1:
        pos[0] += int(x[1:])
    elif dir == 2:
        pos[1] -= int(x[1:])
    elif dir == 3:
        pos[0] -= int(x[1:])
    
print(abs(pos[0]) + abs(pos[1]))