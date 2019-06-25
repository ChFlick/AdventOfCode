filename = "input.txt"

with open(filename, "r") as infile:
    instructions = [x.replace("\n", "") for x in infile]

print(instructions)

# registers = {}
registers = {"a": 1} #V2
pointer = 0

def jio(register, n):
    global pointer
    if registers.get(register, 0) == 1:
        pointer += n - 1

def jie(register, n):
    global pointer
    if registers.get(register, 0) % 2 == 0:
        pointer += n - 1

def inc(register, _):
    global pointer
    registers[register] = registers.get(register, 0) + 1

def jmp(offset, _):
    global pointer
    pointer += int(offset) - 1

def hlf(register, _):
    registers[register] = registers.get(register, 0) / 2

def tpl(register, _):
    registers[register] = registers.get(register, 0) * 3

while -1 < pointer < len(instructions):
    instruction = instructions[pointer]
    command = instruction.split()[0]
    first = instruction.split()[1].replace(",", "")
    second = 0 if len(instruction.split()) < 3 else instruction.split()[2]

    globals()[command](first, int(second))
    pointer += 1

print(registers)