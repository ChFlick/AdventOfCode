import std/streams
import std/strutils
import std/heapqueue
import std/sequtils

var inputStream = newFileStream("./input.txt", FileMode.fmRead)
var input: seq[string] = @[]

if not isNil(inputStream):
    var line: string
    while inputStream.readLine(line):
        input.add(line)
    inputStream.close()

var calorieSums: seq[int] = @[]

var currentSum: int = 0
for calories in input:
    if(isEmptyOrWhitespace(calories)):
        calorieSums.add(currentSum)
        currentSum = 0
    else:
        currentSum += parseInt(calories)
calorieSums.add(currentSum)

echo max(calorieSums) # 1

var heap: HeapQueue[int] = toHeapQueue(calorieSums.mapIt(-it))

echo(-heap.pop() + -heap.pop() + -heap.pop())
