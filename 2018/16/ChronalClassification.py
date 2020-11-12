from dataclasses import dataclass, field

from typing import List


@dataclass
class Sample:
    before: List[int] = field(default_factory=list)
    instruction: List[int] = field(default_factory=list)
    after: List[int] = field(default_factory=list)
    possible_opcodes: List[str] = field(default_factory=list)

    def __repr__(self) -> str:
        return "before: " + str(self.before) + "\n" + "instruction: " + str(self.instruction) + "\n" + "after: " + str(
            self.after) + "\n" + "possible_opcodes: " + str(self.possible_opcodes) + "\n"


def main():
    opcodes = [addr, addi, mulr, muli, banr, bani, borr, bori, setr, seti, gtir, gtri, gtrr, eqir, eqri, eqrr]

    current_sample = Sample()
    samples = []
    empty_lines = 0
    for line in open("input.txt", "r"):
        if line.strip() == "":
            empty_lines = empty_lines + 1
            continue
        else:
            empty_lines = 0

        if empty_lines > 1:
            exit()

        if line.startswith("Before:"):
            current_sample = Sample()
            samples.append(current_sample)
            current_sample.before = [int(x) for x in line.replace("Before: [", "").replace("]", "").split(", ")]
        elif line.startswith("After:"):
            current_sample.after = [int(x) for x in line.replace("After:  [", "").replace("]", "").split(", ")]

            for opcode in opcodes:
                result = opcode(current_sample.before.copy(),
                                current_sample.instruction[1],
                                current_sample.instruction[2],
                                current_sample.instruction[3])
                if result == current_sample.after:
                    current_sample.possible_opcodes.append(opcode.__name__)
        else:
            current_sample.instruction = [int(x) for x in line.split(" ")]
    print(samples)
    print(len(samples))
    print("With more than 3 possible opcodes: " + str(len([x for x in samples if len(x.possible_opcodes) > 2])))


def addr(register, in_a, in_b, out):
    register[out] = register[in_a] + register[in_b]
    return register


def addi(register, in_a, in_b, out):
    register[out] = register[in_a] + in_b
    return register


def mulr(register, in_a, in_b, out):
    register[out] = register[in_a] * register[in_b]
    return register


def muli(register, in_a, in_b, out):
    register[out] = register[in_a] * in_b
    return register


def banr(register, in_a, in_b, out):
    register[out] = register[in_a] & register[in_b]
    return register


def bani(register, in_a, in_b, out):
    register[out] = register[in_a] & in_b
    return register


def borr(register, in_a, in_b, out):
    register[out] = register[in_a] | register[in_b]
    return register


def bori(register, in_a, in_b, out):
    register[out] = register[in_a] | in_b
    return register


def setr(register, in_a, in_b, out):
    register[out] = register[in_a]
    return register


def seti(register, in_a, in_b, out):
    register[out] = in_a
    return register


def gtir(register, in_a, in_b, out):
    register[out] = 1 if in_a > register[in_b] else 0
    return register


def gtri(register, in_a, in_b, out):
    register[out] = 1 if register[in_a] > in_b else 0
    return register


def gtrr(register, in_a, in_b, out):
    register[out] = 1 if register[in_a] > register[in_b] else 0
    return register


def eqir(register, in_a, in_b, out):
    register[out] = 1 if in_a == register[in_b] else 0
    return register


def eqri(register, in_a, in_b, out):
    register[out] = 1 if register[in_a] == in_b else 0
    return register


def eqrr(register, in_a, in_b, out):
    register[out] = 1 if register[in_a] == register[in_b] else 0
    return register


if __name__ == '__main__':
    main()
