import re, string

regexString = ""
for i in range(0, 26):
    regexString += string.ascii_lowercase[i] + string.ascii_uppercase[i] + "|" + string.ascii_uppercase[i] + string.ascii_lowercase[i] + "|"

regexString = regexString[:-1]

regex = re.compile(regexString)
polymer = open("input.txt", "r").readline()

while regex.search(polymer):
    polymer = re.sub(regex, "", polymer)

print(polymer)
print(len(polymer))
