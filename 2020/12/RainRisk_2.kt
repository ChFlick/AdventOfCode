package `12`

import java.io.File
import kotlin.math.absoluteValue

fun main(args: Array<String>) {
    fun rotate(point: Pair<Int, Int>, degrees: Int): Pair<Int, Int> = when (degrees) {
        0 -> point
        90 -> point.second to -1 * point.first
        180 -> -1 * point.first to -1 * point.second
        270 -> -1 * point.second to point.first
        360 -> point
        else -> throw Error("Not able to rotate $degrees°")
    }

    val instructions = File("${System.getProperty("user.dir")}/2020/12/input.txt")
            .readLines()
            .map { it.substring(0, 1) to it.substring(1).toInt() }

    var waipoint = 10 to 1
    var pos = 0 to 0

    instructions.forEach { (command, value) ->
        when (command) {
            "N" -> waipoint = Pair(waipoint.first, waipoint.second + value)
            "S" -> waipoint = Pair(waipoint.first, waipoint.second - value)
            "E" -> waipoint = Pair(waipoint.first + value, waipoint.second)
            "W" -> waipoint = Pair(waipoint.first - value, waipoint.second)
            "R" -> waipoint = rotate(waipoint, value)
            "L" -> waipoint = rotate(waipoint, 360 - value)
            "F" -> pos = pos.first + waipoint.first * value to pos.second + waipoint.second * value
        }
    }

    println(pos.first.absoluteValue + pos.second.absoluteValue)
}
