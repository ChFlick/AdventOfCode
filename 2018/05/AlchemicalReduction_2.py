import re
import string

regexString = ""
for i in range(26):
    regexString += string.ascii_lowercase[i] + string.ascii_uppercase[i] + "|" + string.ascii_uppercase[i] + string.ascii_lowercase[i] + "|"

regexString = regexString[:-1]
regex = re.compile(regexString)

startPolymer = open("input.txt", "r").readline()

minimum = 99999
for i in range(26):
    polymer = startPolymer.replace(string.ascii_lowercase[i], "")
    polymer = polymer.replace(string.ascii_uppercase[i], "")

    while regex.search(polymer):
        polymer = re.sub(regex, "", polymer)

    minimum = min(minimum, len(polymer))

print(minimum)
