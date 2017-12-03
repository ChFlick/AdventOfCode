import re

# VERSION 1
# result = 0
# inputString = input()
# numbers = [int(s) for s in list(inputString)]
# for i in range(len(numbers) - 1):
#     if numbers[i] == numbers[i + 1]:
#         result += numbers[i]
#
# if numbers[len(numbers) - 1] == numbers[0]:
#     result += numbers[0]
#
# print(result)

result = 0
inputString = input()
numbers = [int(s) for s in list(inputString)]
gap = int(len(numbers) / 2)
for i in range(len(numbers)):
    currentNumber = numbers[i]

    nextIndex = i + gap
    if nextIndex >= len(numbers):
        nextIndex -= len(numbers)
    nextNumber = numbers[nextIndex]

    if currentNumber == nextNumber:
        result += currentNumber

print(result)