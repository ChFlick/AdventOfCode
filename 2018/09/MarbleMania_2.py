from collections import deque

numPlayers = 447
maxMarble = 7151000

game = deque([0])
scores = dict.fromkeys(range(numPlayers), 0)

nextMarble = 1

while nextMarble < maxMarble:
  if nextMarble % 23 != 0:
    game.rotate(-1)
    game.append(nextMarble)
  else:
    player = nextMarble % numPlayers
    scores[player] += nextMarble
    game.rotate(7)
    scores[player] += game.pop()
    game.rotate(-1)

  nextMarble += 1
  if nextMarble % 100000 == 0:
    print(nextMarble)
  #print(nextMarble, ':', ' '.join([str(x) for x in game]))
#print(scores)
print(max(scores.values()))
