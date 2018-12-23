import regex

REGEX = r"<(.*?,.*?)>"

class Point:
  def __init__(self, pos, vel):
    self.pos = pos
    self.vel = vel

  def __str__ (self):
    return 'pos:' + str(self.pos) + ', vel:' + str(self.vel)

  def move(self):
    self.pos[0] += self.vel[0]
    self.pos[1] += self.vel[1]


def hasPoint(points, coord):
  for p in points:
    if p.pos[0] == coord[0] and p.pos[1] == coord[1]:
      return True
  return False

def printMap(points):
  minX = min([point.pos[0] for point in points]);
  maxX = max([point.pos[0] for point in points]);
  minY = min([point.pos[1] for point in points]);
  maxY = max([point.pos[1] for point in points]);

  map = ''
  print(minY, maxY, minX, maxX)
  for y in range(minY, maxY + 1):
    for x in range(minX, maxX + 1):
      map += '#' if hasPoint(points, [x,y]) else '.'
    map += '\n'
  print(map)


def parseLine(line):
  results = regex.findall(REGEX, line)
  pos = [int(x) for x in results[0].split(', ')]
  vel = [int(x) for x in results[1].split(', ')]
  return Point(pos, vel)

lines = open('input.txt').readlines()

points = [parseLine(line) for line in lines]

size = 99999999999
#10117 is key
for i in range(0, 999999):
  minX = min([point.pos[0] for point in points]);
  maxX = max([point.pos[0] for point in points]);
  minY = min([point.pos[1] for point in points]);
  maxY = max([point.pos[1] for point in points]);

  currSize = maxX - minX + maxY - minY

  if(currSize < 150):
    print(i)
    printMap(points)

  if(currSize < size):
    size = currSize
    [point.move() for point in points]
  else:
    break
