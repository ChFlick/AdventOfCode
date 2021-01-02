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

        fun permutations(): List<Tile> = (0..2).fold(listOf(this.flip(), this)) { list, _ ->
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

    val grid = tilesWithPermutatios.mapNotNull { startingTile ->
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
    }.firstOrNull() ?: throw Error("No grid found")

    val corners = listOf((0 to 0), (0 to SIZE - 1), (SIZE - 1 to 0), (SIZE - 1 to SIZE - 1))
        .map { grid[it]!!.number }

    println(corners)
    println(corners.fold(1L) { acc, i -> acc * i })

}
