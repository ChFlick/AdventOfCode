package `11`

import java.io.File

fun main(args: Array<String>) {
    var grid = File("${System.getProperty("user.dir")}/2020/11/input.txt")
    	.readLines()
        .map { row ->
            row.split("")
                .filter { it.isNotBlank() }
                .map { Cell.fromRepresentation(it) }
        }
        .let { Grid(it) }

    var numSeated: Int

    do {
        numSeated = grid.numSeated
        println()
        println(grid)
        grid = grid.nextIteration()
    } while (numSeated != grid.numSeated)

    println()
    println(grid)
    println(numSeated)
}

data class Grid(val grid: List<List<Cell>>) {
    private fun getCell(x: X, y: Y): Cell = grid.getOrNull(y)?.getOrNull(x) ?: Cell.NONE

    val numSeated = grid.fold(0) { sum, row ->
        sum + row.count { it == Cell.OCCUPIED }
    }

    fun nextIteration() =
        Grid(grid.mapIndexed { y, row ->
            row.mapIndexed { x, cell ->
                when (cell) {
                    Cell.EMPTY -> if (numNeighbors(x, y) == 0) Cell.OCCUPIED else Cell.EMPTY
                    Cell.OCCUPIED -> if (numNeighbors(x, y) > 4) Cell.EMPTY else Cell.OCCUPIED
                    Cell.FLOOR -> Cell.FLOOR
                    Cell.NONE -> Cell.NONE
                }
            }
        })

    private fun numNeighbors(x: X, y: Y): Int =
        DIRECTIONS.count { neighborAtDirection(x, y, it) == Cell.OCCUPIED }

    private fun neighborAtDirection(targetX: X, targetY: Y, direction: Pair<X, Y>): Cell {
        var currentX = targetX
        var currentY = targetY
        do {
            currentX += direction.first
            currentY += direction.second
            val potentialNeighbor = getCell(currentX, currentY)
        } while (potentialNeighbor == Cell.FLOOR)

        return getCell(currentX, currentY)
    }

    override fun toString(): String = grid.joinToString("\n") { row ->
        row.joinToString("") { it.representation }
    }
}

typealias X = Int
typealias Y = Int

enum class Cell(val representation: String) {
    OCCUPIED("#"),
    EMPTY("L"),
    FLOOR("."),
    NONE("");

    companion object {
        fun fromRepresentation(representation: String) =
            values().find { it.representation == representation } ?: FLOOR
    }
}

val DIRECTIONS = (-1..1).flatMap { y ->
    (-1..1)
        .filterNot { x -> y == 0 && x == 0 }
        .map { x -> x to y }
}
