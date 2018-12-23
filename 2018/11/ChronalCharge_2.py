INPUT = 1955

def getCellValue(x, y):
  rackId = x + 10
  powerValue = (rackId * y + INPUT) * rackId
  powerValue = (0 if powerValue < 99 else int(str(powerValue)[-3])) - 5
  return powerValue

def getThreeGrid(x, y, energyGrid, i):
  sum = 0
  for yy in range(i):
    for xx in range(i):
      sum += energyGrid[x + xx][y +yy]
  return sum


gridSize = 300

energyGrid = [[0 for x in range(gridSize)] for y in range(gridSize)] 
for y in range(gridSize):
  for x in range(gridSize):
    energyGrid[x][y] = getCellValue(x, y)

maxVal = 0
maxPos = []
for y in range(gridSize - 17):
  for x in range(gridSize - 17):
    for i in range(7,17):
      currVal = getThreeGrid(x, y, energyGrid,i)
      if(currVal > maxVal):
        maxVal = currVal
        maxPos = [x, y, i]

print(maxVal, maxPos)
