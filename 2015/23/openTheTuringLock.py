filename = "input.txt"

with open(filename, "r") as infile:
    instructions = [x.replace("\n", "") for x in infile]

print(instructions)

registers = {}
pointer: int = 0

def jio(register, n):
    if registers.get(register, 0) % 2 == 1:
        pointer += n

def jie(register, n):
    if registers.get(register, 0) % 2 == 0:
        pointer += n

def inc(register):
    registers[register] = registers.get(register, 1)

def jmp(offset):
    pointer += offset

def hlf(register):
    registers[register] = registers.get(register, 0) / 2

def tpl(register):
    registers[register] = registers.get(register, 0) * 3