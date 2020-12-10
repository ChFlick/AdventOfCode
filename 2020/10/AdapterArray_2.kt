package `10`

import java.io.File
import kotlin.math.pow


fun main(args: Array<String>) {
    val possibilities = File("""${System.getProperty("user.dir")}/2020/10/input.txt""")
            .readText()
            .split("\n")
            .map { it.toInt() }
            .let { it + (it.maxOrNull()?.plus(3) ?: 0) }
            .let { it + 0 }
            .sorted()
            .zipWithNext { a, b -> b - a }
            .joinToString("")
            .split("3")
            .asSequence()
            .filter { it.isNotBlank() }
            .map {
                // may be the lazy caterers sequence? idk
                when (it.length) {
                    1 -> 1
                    2 -> 2
                    3 -> 4
                    4 -> 7
                    else -> 0
                }
            }
            .fold(1.0) { acc, i -> acc * i }

    println(possibilities)
}
