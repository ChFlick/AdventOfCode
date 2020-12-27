package `24`

import java.io.File

fun main(args: Array<String>) {
    val DIRECTIONS = mapOf(
        "e" to (1 to 1),
        "w" to (-1 to -1),
        "se" to (1 to 0),
        "nw" to (-1 to 0),
        "sw" to (0 to -1),
        "ne" to (0 to 1)
    )

    var flippedTiles = File("${System.getProperty("user.dir")}/2020/24/input.txt")
        .readLines()
        .map { line ->
            var pos = Pair(0, 0)
            var index = 0
            while (index < line.length) {
                if (DIRECTIONS.containsKey(line.substring(index, index + 1))) {
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
        .map { it.key }
        .toHashSet()

    fun neighboursOf(tile: Pair<Int, Int>): List<Pair<Int, Int>> =
        DIRECTIONS.values.map { (it.first + tile.first) to (it.second + tile.second) }

    repeat(100) {
        flippedTiles = flippedTiles
            .flatMap { neighboursOf(it) }
            .mapNotNull { tile ->
                val numNeighbors = neighboursOf(tile).count { it in flippedTiles }
                if (tile in flippedTiles) {
                    if (numNeighbors < 1 || numNeighbors > 2) null else tile
                } else {
                    if (numNeighbors == 2) tile else null
                }
            }.toHashSet()
    }

    println("${flippedTiles.size} tiles are flipped")
}