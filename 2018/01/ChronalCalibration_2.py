result = 0
resultSet = {0}
lines = open("input.txt", "r").readlines()

while 1:
    for line in lines:
        multiplier = -1 if line[0] == "-" else 1
        result += multiplier * int(line[1:])
        if result in resultSet:
            print(result)
            exit(0)
        else:
            resultSet.add(result)
