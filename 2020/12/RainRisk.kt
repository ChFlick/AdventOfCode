package `12`

import java.io.File
import kotlin.math.absoluteValue

fun main(args: Array<String>) {
    val DIRECTION_BY_DEGREE = mapOf(
        0 to "N",
        90 to "E",
        180 to "S",
        270 to "W"
    )

    val instructions = File("${System.getProperty("user.dir")}/2020/12/input.txt")
        .readLines()
        .map { it.substring(0, 1) to it.substring(1).toInt() }

    var pos = 0 to 0
    var degrees = 90

    instructions.forEach { (command, value) ->
        val actualCommand = if (command == "F") DIRECTION_BY_DEGREE[degrees] else command
        when (actualCommand) {
            "N" -> pos = Pair(pos.first, pos.second + value)
            "S" -> pos = Pair(pos.first, pos.second - value)
            "E" -> pos = Pair(pos.first + value, pos.second)
            "W" -> pos = Pair(pos.first - value, pos.second)
            "R" -> degrees = (degrees + value).absoluteValue % 360
            "L" -> degrees = (degrees - value).absoluteValue % 360
        }

        println("$command$value moves $value units $actualCommand to $pos - Facing ${DIRECTION_BY_DEGREE[degrees]}")
    }

    println(pos.first.absoluteValue + pos.second.absoluteValue)
}
