package `13`

import java.io.File
import kotlin.math.absoluteValue

fun main(args: Array<String>) {
    val input = File("${System.getProperty("user.dir")}/2020/13/input.txt")
            .readLines()

    val earliesDeparture = input[0].toLong()
    val busses = input[1].split(",")
            .filterNot { it == "x" }
            .map { it.toLong() }

    (earliesDeparture..Int.MAX_VALUE).find { departure ->
        busses.find { (departure % it) == 0L }?.also {
            println("Earliest bus is number $it, arriving ${departure - earliesDeparture} minutes after your arrival, at $departure.")
            println("Result: ${it * (departure - earliesDeparture)}")
        } != null
    }
}
