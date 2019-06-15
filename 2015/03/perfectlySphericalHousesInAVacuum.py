filename: str = "input.txt"
content: str

with open(filename, "r") as inputData:
    content = inputData.readline()

visited: set = set()
position = (0, 0)

visited.add(position)
for direction in content:
    position = {
        '<': lambda pos: (pos[0] - 1, pos[1]),
        '>': lambda pos: (pos[0] + 1, pos[1]),
        'v': lambda pos: (pos[0], pos[1] - 1),
        '^': lambda pos: (pos[0], pos[1] + 1)
    }[direction](position)
    visited.add(position)

print(len(visited))