from functools import reduce

alphabet = [x for x in "abcdefghijklmnopqrstuvwxyz"]
nums = [x for x in range(26)]
alphaNum = dict(zip(alphabet, nums))
numAlpha = dict(zip(nums, alphabet))

def containsThreeStraightLetters(password: str):
    for i in range(6):
        charNum = alphaNum[password[i]]
        if charNum + 1 is alphaNum[password[i + 1]] and charNum + 2 is alphaNum[password[i + 2]]:
            return True
    return False

def containIOL(password: str):
    return password.count("i") > 0 or password.count("o") > 0 or password.count("l") > 0

def containsTwoDoublettes(password: str):
    return reduce(lambda x,y: x + y, [password.count(x * 2) for x in alphabet]) > 1

def isValid(password: str):
    return not containIOL(password) and containsThreeStraightLetters(password) and containsTwoDoublettes(password)

def increment(password: str):
    intPw = [alphaNum[x] for x in password]
    if intPw[-1] is 25:
        return increment(password[:-1]) + "a"
    else:
        intPw[-1] = intPw[-1] + 1
        return "".join([numAlpha[x] for x in intPw])

password = increment("cqjxjnds")
while not isValid(password):
    password = increment(password)

print(password)