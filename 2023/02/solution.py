import re

lines = open("input.txt", "r").readlines()

possible = { "red": 12, "green": 13, "blue": 14 }

possibleGameIds = []
for i in range(0, len(lines)):
    line = lines[i]
    sets = [s.replace(",", "").strip() for s in re.sub(r'Game \d+: ', "", line).split(";")]
    isGameOk = True
    for play in sets:
        playValues = play.split(" ")
        for j in range(0, len(playValues)):
            if not playValues[j].isdigit():
                continue
            color = playValues[j + 1]
            if int(playValues[j]) > possible[color]:
                isGameOk = False
                break
    if isGameOk:
        possibleGameIds.append(i + 1)
        
sum1 = 0
for game in possibleGameIds:
    sum1 = sum1 + game
        
print(sum1)

# 2
powerSum = 0
for line in lines:
    sets = [s.replace(",", "").strip() for s in re.sub(r'Game \d+: ', "", line).split(";")]
    minSet = { "red": 1, "green": 1, "blue": 1 }
    for play in sets:
        playValues = play.split(" ")
        for j in range(0, len(playValues)):
            if not playValues[j].isdigit():
                continue
            color = playValues[j + 1]
            minSet[color] = max(minSet[color], int(playValues[j]))
    
    powerValue = 1
    for color in minSet.keys():
        powerValue = powerValue * minSet[color]
    powerSum = powerSum + powerValue

print(powerSum)