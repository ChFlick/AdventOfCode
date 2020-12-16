package `15`

import java.io.File

fun main(args: Array<String>) {
    val input = File("${System.getProperty("user.dir")}/2020/15/input.txt")
        .readLines()[0]
        .split(",")
        .map { it.toInt() }

    val spokenNumbers = input
        .mapIndexed { index, value -> value to (index to -1) }
        .toMap().toMutableMap()

    var numberToSay = 0
    var previousNumber = spokenNumbers[input.last()]!!
    for (i in spokenNumbers.size until 30000000) {
        numberToSay = if (previousNumber.second == -1)
            0
        else
            i - previousNumber.second - 1

        if (spokenNumbers.containsKey(numberToSay)) {
            spokenNumbers[numberToSay] = i to spokenNumbers[numberToSay]!!.first
        } else {
            spokenNumbers[numberToSay] = i to -1
        }

//        println(numberToSay)

        previousNumber = spokenNumbers[numberToSay]!!
    }

    println(numberToSay)
}
