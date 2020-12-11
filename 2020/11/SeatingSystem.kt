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
        grid = grid.nextIteration
    } while (numSeated != grid.numSeated)

    println()
    println(grid)
    println(numSeated)
}

data class Grid(val grid: List<List<Cell>>) {
    private fun getCell(x: X, y: Y): Cell = grid.getOrNull(y)?.getOrNull(x) ?: Cell.FLOOR

    val numSeated = grid.fold(0) { sum, row ->
        sum + row.count { it == Cell.OCCUPIED }
    }

    val nextIteration =
        Grid(grid.mapIndexed { y, row ->
            row.mapIndexed { x, cell ->
                when (cell) {
                    Cell.EMPTY -> if (numNeighbors(x, y) == 0) Cell.OCCUPIED else Cell.EMPTY
                    Cell.OCCUPIED -> if (numNeighbors(x, y) > 3) Cell.EMPTY else Cell.OCCUPIED
                    Cell.FLOOR -> Cell.FLOOR
                }
            }
        })

    private fun numNeighbors(targetX: X, targetY: Y): Int =
        ((targetY - 1)..(targetY + 1)).fold(0) { sum, y ->
            sum + ((targetX - 1)..(targetX + 1))
                .filterNot { x -> x == targetX && y == targetY }
                .count { x -> this.getCell(x, y) == Cell.OCCUPIED }
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
    FLOOR(".");

    companion object {
        fun fromRepresentation(representation: String) =
            values().find { it.representation == representation } ?: FLOOR
    }
}
