numPlayers = 447
maxMarble = 71510

game = [0]
scores = dict.fromkeys(range(numPlayers), 0)

nextMarble = 1
currentPos = 0

while nextMarble < maxMarble:
  if nextMarble % 23 != 0:
    currentPos = ((currentPos + 1) % len(game)) + 1
    game.insert(currentPos, nextMarble)
  else:
    player = nextMarble % numPlayers
    scores[player] += nextMarble
    currentPos = (currentPos - 7) % len(game)
    scores[player] += game.pop(currentPos)

  nextMarble += 1
  #print(nextMarble, ' '.join([str(x) for x in game]))
#print(scores)
print(max(scores.values()))
