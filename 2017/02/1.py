result = 0
rows = []
while True:
    inp = input()
    if len(inp) == 0:
        break
    else:
        rows.append(inp)

for row in rows:
    nums = [int(s) for s in row.split()]
    result += max(nums) - min(nums)

print(result)
