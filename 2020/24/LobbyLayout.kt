package `24`

import java.io.File

fun main(args: Array<String>) {
    val DIRECTIONS = mapOf(
        "e" to (1 to 1),
        "w" to (-1 to -1),
        "se" to (1 to 0),
        "nw" to (-1 to 0),
        "sw" to (0 to -1),
        "ne" to (0 to 1))

    val tilesToFlip = File("${System.getProperty("user.dir")}/2020/24/input.txt")
        .readLines()
        .map { line ->
            var pos = Pair(0, 0)
            var index = 0
            while(index < line.length) {
                if(DIRECTIONS.containsKey(line.substring(index, index + 1))) {
                    val offset = DIRECTIONS[line.substring(index, index + 1)]!!
                    pos = (pos.first + offset.first) to (pos.second + offset.second)
                    index += 1
                } else {
                    val offset = DIRECTIONS[line.substring(index, index + 2)]!!
                    pos = (pos.first + offset.first) to (pos.second + offset.second)
                    index += 2
                }
            }
            pos
        }
        .groupingBy { it }
        .eachCount()
        .filterNot { it.value % 2 == 0 }

    println("${tilesToFlip.size} tiles flipped to back")
    println(tilesToFlip)

}