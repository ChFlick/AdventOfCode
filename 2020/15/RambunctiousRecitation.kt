package `15`

import java.io.File
import kotlin.math.absoluteValue
import kotlin.math.pow

fun main(args: Array<String>) {
    val spokenNumbers = File("${System.getProperty("user.dir")}/2020/15/input.txt")
        .readLines()[0]
        .split(",")
        .mapIndexed { index, value -> (value.toInt() to listOf(index)) }
        .toMap().toMutableMap()

    for (i in spokenNumbers.size until 2020) {
        val lastSpoken = spokenNumbers.maxByOrNull { it.value.maxOrNull() ?: 0 }!!

        if (lastSpoken.value.size == 1) {
            spokenNumbers[0] = spokenNumbers.getOrDefault(0, listOf()).plus(i)
            println(0)
        } else {
            val spokenAt = lastSpoken.value[lastSpoken.value.lastIndex - 1]
            val difference = i - spokenAt - 1
            spokenNumbers[difference] = spokenNumbers.getOrDefault(difference, listOf()).plus(i)
            println(difference)
        }
    }
}
