filename: str = "input.txt"
content: str

directions = {
    '<': lambda pos: (pos[0] - 1, pos[1]),
    '>': lambda pos: (pos[0] + 1, pos[1]),
    'v': lambda pos: (pos[0], pos[1] - 1),
    '^': lambda pos: (pos[0], pos[1] + 1)
}

with open(filename, "r") as inputData:
    content = inputData.readline()

visited: set = set()
position = (0, 0)

visited.add(position)
for direction in content:
    position = directions[direction](position)
    visited.add(position)

print(len(visited))

#Part 2
visited: set = set()
secVisited: set = set()

position = (0, 0)
secPosition = (0, 0)

visited.add(position)

i = 0
for direction in content:
    if i % 2 == 0:
        position = directions[direction](position)
        visited.add(position)
    else:
        secPosition = directions[direction](secPosition)
        visited.add(secPosition)
    i = i + 1

print(len(visited))