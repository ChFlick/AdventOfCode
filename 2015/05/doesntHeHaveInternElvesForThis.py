def isNice(string: str):
    if string.count("ab") > 0 or string.count("cd") > 0 or string.count("pq") > 0 or string.count("xy") > 0:
        return False

    vowelCount = 0
    for s in string:
        if "aeiou".count(s) > 0:
            vowelCount = vowelCount + 1
            if vowelCount > 2:
                for i in range(len(string) - 2):
                    if string[i] == string[i + 1]:
                        return True
                break

    return False

filename = "input.txt"

content: list

with open(filename, "r") as inputData:
    content = inputData.readlines()

num = 0
for string in content:
    if isNice(string):
        num = num + 1

print(num)