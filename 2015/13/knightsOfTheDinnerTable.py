from itertools import permutations

filename = "input.txt"

with open(filename, "r") as inputData:
    content: str = inputData.readlines()

class Relation():
    def __init__(self, p1, p2, gain):
        self.p1 = p1
        self.p2 = p2
        self.gain = gain

content = [x.split(" ") for x in content]

people = set([x[0] for x in content])
relations = [Relation(x[0], x[10][:-2], int(x[3]) if x[2] == "gain" else -1 * int(x[3])) for x in content]

gains = []
for seating in permutations(people):
    gain = 0
    for i in range(len(seating)):
        p1 = seating[i]
        p2 = seating[(i + 1) % len(people)]
        r1 = next(x for x in relations if x.p1 == p1 and x.p2 == p2)
        r2 = next(x for x in relations if x.p1 == p2 and x.p2 == p1)
        gain = gain + r1.gain + r2.gain
    gains.append(gain)

print(max(gains))

relations = relations + [Relation("me", x, 0) for x in people]
relations = relations + [Relation(x, "me", 0) for x in people]
people.add("me")

gains = []
for seating in permutations(people):
    gain = 0
    for i in range(len(seating)):
        p1 = seating[i]
        p2 = seating[(i + 1) % len(people)]
        r1 = next(x for x in relations if x.p1 == p1 and x.p2 == p2)
        r2 = next(x for x in relations if x.p1 == p2 and x.p2 == p1)
        gain = gain + r1.gain + r2.gain
    gains.append(gain)

print(max(gains))