import re
from dataclasses import dataclass
from typing import Type, Tuple

map = {}
max_y = 0


@dataclass
class Water:
    parent: Type["Water"]
    active: bool
    pos: Tuple[int, int]


def main():
    global max_y
    map[(500, 0)] = Water(None, True, (500, 0))
    for line in open("input.txt", "r"):
        start_x = line.startswith("x")
        positions = [int(x) for x in re.findall("[0-9]+", line)]

        for i in range(positions[1], positions[2] + 1):
            nextpos = (positions[0], i) if start_x else (i, positions[0])
            map[nextpos] = "clay"
            max_y = max(max_y, nextpos[1])

    while len([x for x in map if isinstance(map[x], Water) and map[x].active]) > 0:
        active_water_poss = [x for x in map if isinstance(map[x], Water) and map[x].active]
        for pos in active_water_poss:
            flow(pos)

    print_map(map)
    print("Water tiles: " + str(len([x for x in map if map[x] == "water"]) - 1))


def flow(pos):
    # print_map(map)

    current_water = map[pos]
    if pos[1] > max_y:
        current_water.active = False
        return True

    below = (pos[0], pos[1] + 1)
    if below not in map:
        map[below] = Water(current_water, True, below)
        current_water.active = False
        return True
    else:
        has_flown = False
        left = (pos[0] - 1, pos[1])
        right = (pos[0] + 1, pos[1])
        if left not in map:
            map[left] = Water(current_water, True, left)
            current_water.active = False
            has_flown = True
        elif right not in map:
            map[right] = Water(current_water, True, right)
            current_water.active = False
            has_flown = True

        else:
            current_water.parent.active = True
            current_water.active = False

        return has_flown


def flow_sideways(water, left=True):
    current_water = map[water]
    below = (water[0], water[1] + 1)
    side_tile = (water[0] - 1, water[1]) if left else (water[0] + 1, water[1])
    if side_tile not in map and below in map:
        map[side_tile] = Water(current_water, True, side_tile)
        current_water.active = False
        flow_sideways(side_tile, left)


def print_map(map):
    min_x = 9999999
    min_y = 9999999
    max_x = -999
    max_y = -999

    for tile in map:
        min_x = min(min_x, tile[0])
        max_x = max(max_x, tile[0])

        min_y = min(min_y, tile[1])
        max_y = max(max_y, tile[1])
    min_x -= 1
    min_y -= 1
    max_x += 1
    max_y += 2

    for y in range(min_y, max_y):
        line = ""
        for x in range(min_x, max_x):
            if (x, y) not in map:
                line += "."
            else:
                line += "#" if map[(x, y)] == "clay" else "~"
        print(line)


if __name__ == '__main__':
    main()
