INPUT = 1955

def getCellValue(x, y):
  rackId = x + 10
  powerValue = (rackId * y + INPUT) * rackId
  powerValue = (0 if powerValue < 99 else int(str(powerValue)[-3])) - 5
  return powerValue

def getThreeGrid(x, y, energyGrid):
  sum = 0
  for yy in range(3):
    for xx in range(3):
      sum += energyGrid[x + xx][y +yy]
  return sum


gridSize = 300

energyGrid = [[0 for x in range(gridSize)] for y in range(gridSize)] 
for y in range(gridSize):
  for x in range(gridSize):
    energyGrid[x][y] = getCellValue(x, y)

maxVal = 0
maxPos = []
for y in range(gridSize - 3):
  for x in range(gridSize - 3):
    currVal = getThreeGrid(x, y, energyGrid)
    if(currVal > maxVal):
      maxVal = currVal
      maxPos = [x, y]

print(maxVal, maxPos)
