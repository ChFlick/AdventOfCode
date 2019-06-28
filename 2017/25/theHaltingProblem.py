filename = "input.txt"

currentState = ""
stepCount = 0

states = {}

with open(filename, "r") as inFile:
    currentChar = ""
    currentBlock = []
    for line in inFile.readlines():
        if line.startswith("Begin"):
            currentState = line.split()[-1].rstrip(".")
        elif line.startswith("Perform"):
            stepCount = int(line.split()[-2])

        elif line.startswith("In state"):
            currentChar = line.split()[-1].rstrip(":")
        elif line.count("current value") > 0:
            currentBlock.append(int(line.split()[-1].rstrip(":")))
        elif line.count("Write") > 0:
            currentBlock.append(int(line.split()[-1].rstrip(".")))
        elif line.count("Move one") > 0:
            currentBlock.append(line.split()[-1].rstrip("."))
        elif line.count("Continue") > 0:
            currentBlock.append(line.split()[-1].rstrip("."))
        
        if line.isspace() and len(currentBlock) > 0:
            states[currentChar] = {
                currentBlock[0]: currentBlock[1:4],
                currentBlock[4]: currentBlock[5:]
            }
            currentChar = ""
            currentBlock = []
    states[currentChar] = {
        currentBlock[0]: currentBlock[1:4],
        currentBlock[4]: currentBlock[5:]
    }

tape = {}
tapePos = 0

for i in range(stepCount):
    tapeVal = tape.get(tapePos, 0)
    currentActions = states[currentState][tapeVal]
    tape[tapePos] = currentActions[0]
    tapePos += 1 if currentActions[1] == "right" else -1
    currentState = currentActions[2]

print(tape)
val = 0
for x in tape:
    val += tape[x]
print(val)