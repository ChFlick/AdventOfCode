package `14`

import java.io.File
import kotlin.math.absoluteValue
import kotlin.math.pow

fun main(args: Array<String>) {
    val input = File("${System.getProperty("user.dir")}/2020/14/input.txt")
        .readLines()

    val mem = mutableMapOf<Long, Long>()
    var mask = ""
    input.forEach {
        if (it.contains("mask")) {
            mask = it.replace("mask = ", "")
            return@forEach
        }

        val position = it.substringAfter("[").substringBefore("]").toLong()
        val value = it.substringAfter("= ").toLong().toString(2).padStart(36, '0')
        mem[position] = mask.zip(value).map { (maskbit, valuebit) ->
            when (maskbit) {
                '0' -> '0'
                '1' -> '1'
                'X' -> valuebit
                else -> throw Error("Could not parse mask value $maskbit")
            }
        }.joinToString("").toLong(2)
    }

    println(mem)
    println(mem.values.sum())
}
