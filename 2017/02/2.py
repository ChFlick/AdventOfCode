result = 0
rows = []
while True:
    inp = input()
    if len(inp) == 0:
        break
    else:
        rows.append([int(s) for s in inp.split()])

for row in rows:
    for a in row:
        for b in row[row.index(a) + 1:]:
            if a % b == 0:
                result += a / b
            elif b % a == 0:
                result += b / a

print(result)