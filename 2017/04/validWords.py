def hasDoubleWord(row):
    for word in row:
        if word in row[row.index(word) + 1:]:
            return False
    return True

def hasAnagramWord(row):
    for word in row:
        for secondword in row[row.index(word) + 1:]:
            if sorted(list(word)) == sorted(list(secondword)):
                return False
    return True

result = 0
rows = []
while True:
    inp = input()
    if len(inp) == 0:
        break
    else:
        rows.append([s for s in inp.split()])

for row in rows:
    if hasDoubleWord(row):
        result += 1

print(result)

result = 0
for row in rows:
    if hasAnagramWord(row):
        result += 1

print(result)