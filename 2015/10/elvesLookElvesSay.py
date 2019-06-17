def lookAndSay(input):
    result = ""

    i = 0
    while i < len(input):
        currCount = 0
        curr = input[i]
        for j in range(i, len(input)):
            if input[j] == curr:
                currCount = currCount + 1
                if j == len(input) - 1:
                    i = j
            else:
                i = j - 1
                break
        
        result = result + str(currCount) + str(curr)
        i = i + 1

    return result

currentValue = "1321131112"
for _ in range(50):
    currentValue = lookAndSay(currentValue)
    #print(currentValue)
#print(currentValue)
print(len(currentValue))