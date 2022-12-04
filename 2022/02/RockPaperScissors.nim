import std/streams
import std/tables

var inputStream = newFileStream("./input.txt", FileMode.fmRead)
var input: seq[string] = @[]

if not isNil(inputStream):
    var line: string
    while inputStream.readLine(line):
        input.add(line)
    inputStream.close()

type Choice = enum
    rock, paper, scissors

const CHOOSING_POINTS = {
    rock: 1,
    paper: 2,
    scissors: 3
}.toTable

const CHAR_TO_CHOICE = {
    'A': rock,
    'X': rock,
    'B': paper,
    'Y': paper,
    'C': scissors,
    'Z': scissors,
}.toTable

const ROCK_PAPER_SCISSORS = {
    rock: {
        rock: 3,
        paper: 0,
        scissors: 6
    }.toTable,
    paper: {
        rock: 6,
        paper: 3,
        scissors: 0
    }.toTable,
    scissors: {
        rock: 0,
        paper: 6,
        scissors: 3
    }.toTable
}.toTable

var myPoints = 0

for match in input:
    var me = CHAR_TO_CHOICE[match[^1]]
    var opponent = CHAR_TO_CHOICE[match[0]]

    myPoints += CHOOSING_POINTS[me] + ROCK_PAPER_SCISSORS[me][opponent]

echo("I achieved ", myPoints, " points") # 1

const POINTS_BY_RESULT = {
    'X': 0,
    'Y': 3,
    'Z': 6
}.toTable

myPoints = 0
for match in input:
    var result = match[^1]
    var opponent = CHAR_TO_CHOICE[match[0]]

    var me: Choice
    for choice, values in ROCK_PAPER_SCISSORS.pairs:
        if values[opponent] == POINTS_BY_RESULT[result]:
            me = choice
            break

    myPoints += CHOOSING_POINTS[me] + POINTS_BY_RESULT[result]

echo("I achieved ", myPoints, " points") # 1
