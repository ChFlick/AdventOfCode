package `10`

import java.io.File
import kotlin.system.exitProcess


fun main(args: Array<String>) {
    val input = File("""${System.getProperty("user.dir")}/2020/10/input.txt""")
            .readText()
            .split("\n")
            .map { it.toInt() }
            .let { it + (it.maxOrNull()?.plus(3) ?: 0) }
            .let { it + 0 }
            .sorted()

    val differences = mutableMapOf(1 to 0, 2 to 0, 3 to 0)
    input.zipWithNext { a, b -> differences[b - a] = differences[b - a]!! + 1 }

    println(differences)
    print(differences[1]!! * differences[3]!!)
}
