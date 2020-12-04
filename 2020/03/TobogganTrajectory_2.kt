package `03`

import java.io.File

fun main(args: Array<String>) {
    val slopes = listOf(Pair(1, 1), Pair(3, 1), Pair(5, 1), Pair(7, 1), Pair(1, 2))

    val result = slopes.map {
        var noTrees = 0
        val input = File("""${System.getProperty("user.dir")}/2020/03/input.txt""").readLines()

        var pos = Pair(0, 0)

        while (pos.second < input.size) {
            if (input[pos.second][pos.first] == '#') {
                noTrees++
            }

            pos = Pair((pos.first + it.first) % input[0].length, pos.second + it.second)
        }

        noTrees
    }.reduce { result, slopeTrees -> result * slopeTrees }

    println(result)
}

