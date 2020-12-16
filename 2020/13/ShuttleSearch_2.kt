package `13`

import java.io.File
import java.util.concurrent.TimeUnit
import kotlin.system.measureTimeMillis
import kotlin.time.Duration

@kotlin.time.ExperimentalTime
fun main(args: Array<String>) {
    infix fun Map.Entry<Long, Int>.isAlignedAt(t: Long): Boolean {
        return (((t % this.key) + this.value) % this.key) == 0L
    }

    val executionTime = measureTimeMillis {
        val input = File("${System.getProperty("user.dir")}/2020/13/input.txt")
            .readLines()

        val busses = input[1].split(",")
            .mapIndexed { index, value -> value to index }
            .filterNot { it.first == "x" }
            .map { it.first.toLong() to it.second }
            .toMap()

        var t = 1L

        while (!busses.all { it isAlignedAt t }) {
            val alignedBusses = busses.filter { it isAlignedAt t }
            val numberBussesAligned = alignedBusses.count()
            val steplength = alignedBusses.keys.reduceOrNull { acc, i -> acc * i } ?: 1L

            val x = (t..Long.MAX_VALUE step steplength)
                .asSequence()
                .onEach { t = it }
                .map { currentTime -> busses.entries.filter { it isAlignedAt currentTime }.count() }
                .find { it > numberBussesAligned }
            println(x)
        }
        println("The result is $t")
    }
    println(executionTime)

}