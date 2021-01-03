package `20`

import java.io.File
import kotlin.math.sqrt

fun main(args: Array<String>) {
    val BLOCK_SIZE = 10

    val Direction = mapOf(
        "TOP" to (0 to 1),
        "RIGHT" to (1 to 0),
        "BOTTOM" to (0 to -1),
        "LEFT" to (-1 to 0)
    )


    data class Tile(val number: Int, val content: List<String>) {
        val topBorder = content.first()
        val rightBorder = content.map { it.last() }.joinToString("")
        val leftBorder = content.map { it.first() }.joinToString("")
        val bottomBorder = content.last()

        fun flip(): Tile {
            val newContent = (BLOCK_SIZE - 1 downTo 0).map { content[it] }
            return copy(content = newContent)
        }

        fun rotate(): Tile {
            val newContent = (BLOCK_SIZE - 1 downTo 0).map { n -> content.map { it[n] }.joinToString("") }
            return copy(content = newContent)
        }

        fun permutations(): List<Tile> = (0..2).fold(listOf(this.flip(), this.rotate())) { list, _ ->
            list + list.last().flip() + list.last().rotate()
        }

        fun add(p1: Pair<Int, Int>, p2: Pair<Int, Int>) = (p1.first + p2.first) to (p1.second + p2.second)

        fun fitsOnAt(map: Map<Pair<Int, Int>, Tile>, pos: Pair<Int, Int>, dimension: Int): Boolean {
            val left: (other: Tile?) -> Boolean = if (pos.first == 0)
                { _ -> true }
            else
                { other -> other?.let { it.rightBorder == leftBorder } ?: true }

            val right: (other: Tile?) -> Boolean = if (pos.first == dimension)
                { _ -> true }
            else
                { other -> other?.let { it.leftBorder == rightBorder } ?: true }

            val bottom: (other: Tile?) -> Boolean = if (pos.second == 0)
                { _ -> true }
            else
                { other -> other?.let { it.topBorder == bottomBorder } ?: true }

            val top: (other: Tile?) -> Boolean = if (pos.second == dimension)
                { _ -> true }
            else
                { other -> other?.let { it.bottomBorder == topBorder } ?: true }

            return left(map[add(pos, Direction["LEFT"]!!)]) &&
                    top(map[add(pos, Direction["TOP"]!!)]) &&
                    right(map[add(pos, Direction["RIGHT"]!!)]) &&
                    bottom(map[add(pos, Direction["BOTTOM"]!!)])
        }

        override fun toString(): String = """
Tile(number=$number
content=[
${content.map { it + "\n" }.joinToString("")}]
        """.trimIndent()
    }

    val tiles = File("${System.getProperty("user.dir")}/2020/20/input.txt")
        .readText()
        .split("\n\n")
        .map {
            val number = it.substringAfter("Tile ").substringBefore(":").toInt()
            val content = it.split("\n").run { subList(1, size) }
            Tile(number, content)
        }

    val SIZE = sqrt(tiles.size.toDouble()).toInt()

    val tilesWithPermutatios = tiles.flatMap { it.permutations() }

    val tileGrids = tilesWithPermutatios.mapNotNull { startingTile ->
        val tileMap = mutableMapOf((0 to 0) to startingTile)

        for (y in 0 until SIZE) {
            for (x in 0 until SIZE) {
                if (y == 0 && x == 0) continue
                tilesWithPermutatios
                    .filterNot { tile -> tile.number in tileMap.values.map { it.number } }
                    .find { it.fitsOnAt(tileMap, x to y, SIZE) }
                    ?.let { tileMap[x to y] = it }
                    ?: return@mapNotNull null
            }
        }
        tileMap
    }.distinct()
    val tileGrid = tileGrids.firstOrNull() ?: throw Error("No grid found")

    val wholeGrid = mutableListOf<String>()
    for (y in SIZE - 1 downTo 0) {
        sy@ for (subY in 0 until BLOCK_SIZE - 1) {
            var line = ""
            for (x in 0 until SIZE) {
                if (subY == 0 || subY == BLOCK_SIZE - 1) continue@sy
                 line += tileGrid[x to y]!!.content[subY].substring(1, BLOCK_SIZE - 1)
            }
            wholeGrid += line
        }
    }

    val waterTiles = wholeGrid.sumBy { line -> line.count { it == '#' } }

    fun List<String>.isMonsterAt(x: Int, y: Int): Boolean
        = this[y + 1][x] == '#' &&
            this[y + 1][x + 5]== '#' &&
            this[y + 1][x + 6]== '#' &&
            this[y + 1][x + 11] == '#' &&
            this[y + 1][x + 12] == '#' &&
            this[y + 1][x + 17] == '#' &&
            this[y + 1][x + 18] == '#' &&
            this[y + 1][x + 19] == '#' &&
            this[y][x + 18] == '#' &&
            this[y + 2][x + 1] == '#' &&
            this[y + 2][x + 4] == '#' &&
            this[y + 2][x + 7] == '#' &&
            this[y + 2][x + 10] == '#' &&
            this[y + 2][x + 13] == '#' &&
            this[y + 2][x + 16] == '#'

    fun List<String>.flip(): List<String> = (this.size - 1 downTo 0).map { this[it] }

    fun List<String>.rotate(): List<String> = (this[0].length - 1 downTo 0).map { n -> this.map { it[n] }.joinToString("") }

    fun List<String>.permutations() = (0..2).fold(listOf(this.flip(), this.rotate())) { list, _ ->
        list + listOf(list.last().flip(), list.last().rotate())
    }

    val gridPermutations = wholeGrid.permutations()
    val monsters = gridPermutations
        .asSequence()
        .map { grid ->
        (0 until grid.size - 2).sumBy { y ->
            (0 until grid[0].length - 19).count { x ->
                grid.isMonsterAt(x, y)
            }
        }
    }
        .filter { it > 0 }
        .firstOrNull() ?: throw Error("No Monsters")

    println("Monsters: $monsters")
    println("Roughness: ${waterTiles - monsters * 15}")
}
