lines = open("input.txt", "r").readlines()

numberStrs = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

sum1 = 0
for line in lines:
    nums = []
    for i in range(0, len(line)):
        character = line[i]
        if character.isdecimal():
            nums.append(character)
        
    sum1 = sum1 + int(nums[0] + nums[-1])

print(sum1)


sum2 = 0
for line in lines:
    nums = []
    for i in range(0, len(line)):
        character = line[i]
        if character.isdecimal():
            nums.append(character)
        else:
            for numberStr in numberStrs:
                if line[i:].startswith(numberStr):
                    nums.append(str(numberStrs.index(numberStr) + 1))
        
    sum2 = sum2 + int(nums[0] + nums[-1])

print(sum2)