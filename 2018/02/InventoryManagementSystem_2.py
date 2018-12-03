from itertools import groupby, combinations


def chardiff (id1: str, id2: str):
    mistakes = 0
    new_word = ""
    for char_a, char_b in zip(id1, id2):
        if char_a == char_b:
            new_word += char_a
        else:
            mistakes += 1
            if mistakes > 1:
                return
    print(new_word)


lines = open("input.txt", "r").readlines()
pairs = combinations(lines, 2)
for a, b in pairs:
    chardiff(a.strip(), b.strip())
