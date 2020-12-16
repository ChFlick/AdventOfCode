package `13`

import java.io.File
import java.util.concurrent.TimeUnit
import kotlin.math.absoluteValue
import kotlin.system.measureTimeMillis
import kotlin.time.Duration
import kotlin.time.measureTimedValue

// BRUTE FORCE °,..,°
@kotlin.time.ExperimentalTime
fun main(args: Array<String>) {
    val executionTime = measureTimeMillis {
        val input = File("${System.getProperty("user.dir")}/2020/13/input.txt")
                .readLines()

        val busses = input[1].split(",")
                .mapIndexed { index, value -> value to index }
                .filterNot { it.first == "x" }
                .map { it.first.toLong() to it.second }
                .toMap()

        val maxBus = busses.keys.maxOrNull() ?: 0
        val firstPotentialNumberForMax = (100000000000000L..Long.MAX_VALUE).find {
            (((it % maxBus) + busses[maxBus]!!) % maxBus) == 0L
        }!!

        println((firstPotentialNumberForMax..Long.MAX_VALUE step maxBus).find { t ->
            busses.all { (((t % it.key) + it.value) % it.key) == 0L}
        })
    }
    println(Duration.convert(executionTime.toDouble(), TimeUnit.MILLISECONDS, TimeUnit.SECONDS))
}