package `14`

import java.io.File
import kotlin.math.absoluteValue
import kotlin.math.pow

fun main(args: Array<String>) {
    fun getCombinations(value: String): List<String> {
        if (!value.contains("X")) {
            return listOf(value)
        }

        val start = value.substringBefore("X")
        val tail = value.substringAfter("X")

        return getCombinations(tail).flatMap { listOf(start + "0" + it, start + "1" + it) }
    }

    val input = File("${System.getProperty("user.dir")}/2020/14/input.txt")
        .readLines()

    val mem = mutableMapOf<Long, Long>()
    var mask = ""
    input.forEach {
        if (it.contains("mask")) {
            mask = it.replace("mask = ", "")
            return@forEach
        }

        val position = it
            .substringAfter("[")
            .substringBefore("]")
            .toLong()
            .toString(2)
            .padStart(36, '0')
        val value = it.substringAfter("= ").toLong()
        val maskedPosition = mask.zip(position).map { (maskbit, valuebit) ->
            when (maskbit) {
                '0' -> valuebit
                '1' -> '1'
                'X' -> 'X'
                else -> throw Error("Could not parse mask value $maskbit")
            }
        }.joinToString("")
        getCombinations(maskedPosition)
            .map { it.toLong(2) }
            .forEach {
                mem[it] = value
            }

    }

    println(mem)
    println(mem.values.sum())
}
