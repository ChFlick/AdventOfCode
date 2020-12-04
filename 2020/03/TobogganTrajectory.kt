package `03`

import java.io.File

fun main(args: Array<String>) {
    var noTrees = 0
    val input = File("""${System.getProperty("user.dir")}/2020/03/input.txt""").readLines()

    var pos = Pair(0, 0)

    while (pos.second < input.size) {
        if (input[pos.second][pos.first] == '#') {
            noTrees++
        }

        pos = Pair((pos.first + 3) % input[0].length, pos.second + 1)
    }

    println(noTrees)
}

