import re

map = {}


def main():
    map[(500, 0)] = "water"
    max_y = 0
    for line in open("input.txt", "r"):
        start_x = line.startswith("x")
        positions = [int(x) for x in re.findall("[0-9]+", line)]

        for i in range(positions[1], positions[2] + 1):
            nextpos = (positions[0], i) if start_x else (i, positions[0])
            map[nextpos] = "clay"
            max_y = max(max_y, nextpos[1])

    while len([y for y in map if y[1] == max_y and map[y] == "water"]) == 0:
        for y in reversed(range(max_y)):
            if flow_level(y):
                break

    print_map(map)
    print("Water tiles: " + str(len([x for x in map if map[x] == "water"]) - 1))


def flow_level(y):
    if y == 999:
        print_map(map)
    water_at_y = [tile for tile in map if tile[1] == y and map[tile] == "water"]
    if len(water_at_y) == 0:
        return False

    water_flown = len([flown for flown in [flow(water) for water in water_at_y] if flown]) > 0
    return water_flown


def flow(water):
    below = (water[0], water[1] + 1)
    if below not in map:
        map[below] = "water"
        return True
    else:
        has_flown = False
        left = (water[0] - 1, water[1])
        right = (water[0] + 1, water[1])
        if left not in map:
            map[left] = "water"
            has_flown = True
            flow_sideways(left)
        if right not in map:
            map[right] = "water"
            has_flown = True
            flow_sideways(right, False)
        return has_flown


def flow_sideways(water, left=True):
    below = (water[0], water[1] + 1)
    side_tile = (water[0] - 1, water[1]) if left else (water[0] + 1, water[1])
    if side_tile not in map and below in map:
        map[side_tile] = "water"
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
                line += "~" if map[(x, y)] == "water" else "#"
        print(line)


if __name__ == '__main__':
    main()
