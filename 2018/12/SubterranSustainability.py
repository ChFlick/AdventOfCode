START = 10

input = open('input.txt')

def nextGeneration(potState, rules):
  nextGen = potState.copy()
  for i in range(len(potState) - 4):
    for rule in rules:
      if(rule[0] == ''.join(potState[i:i+5])):
        #print(rule[0], 'matches', ''.join(potState[i:i+5]), 'produces', rule[1])
        nextGen[i+2] = rule[1]
        break
  return nextGen

lines = input.readlines()

potState = '.' * START + lines[0].replace('initial state: ', '').replace('\n', '') + '.' * 40
potState = list(potState)

rules = [line.split(' => ') for line in lines[2:]]
for rule in rules:
  rule[1] = rule[1].replace('\n', '')

for i in range(20):
  potState = nextGeneration(potState, rules)
  print(i, ''.join(potState))

val = 0
for i in range(len(potState)):
  if potState[i] == '#':
    val += i - START
print(val)
