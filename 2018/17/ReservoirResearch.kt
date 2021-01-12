package `2018`.`17`

import java.io.File
import kotlin.math.max
import kotlin.math.min

fun main(args: Array<String>) {
    val clay = File("${System.getProperty("user.dir")}/src/main/kotlin/2018/17/input.txt")
        .readLines()
        .flatMap { line ->
            if(line.startsWith("x")) {
                val x = line.substringAfter("=").substringBefore(",").toInt()
                val yStart = line.substringAfterLast("=").substringBefore("..").toInt()
                val yEnd = line.substringAfter("..").toInt()
                (yStart..yEnd).map { x to it }
            } else {
                val y = line.substringAfter("=").substringBefore(",").toInt()
                val xStart = line.substringAfterLast("=").substringBefore("..").toInt()
                val xEnd = line.substringAfter("..").toInt()
                (xStart..xEnd).map { it to y }
            }
        }
        .toSet()
    val stillWater = mutableSetOf<Pair<Int, Int>>()


    var water = setOf(500 to 0)
    val yMinClay = clay.map { it.second }.minOrNull() ?: 0
    val yMaxClay = clay.map { it.second }.maxOrNull() ?: 0

    fun print(){
        val xMin = min(clay.map { it.first }.minOrNull() ?: 0, water.map { it.first }.minOrNull() ?: 0)
        val xMax = max(clay.map { it.first }.maxOrNull() ?: 0, water.map { it.first }.maxOrNull() ?: 0)
        val yMin = min(clay.map { it.second }.minOrNull() ?: 0, water.map { it.second }.minOrNull() ?: 0)
        val yMax = max(clay.map { it.second }.maxOrNull() ?: 0, water.map { it.second }.maxOrNull() ?: 0)

        (yMin..yMax).forEach { y ->
            (xMin..xMax).forEach { x ->
                print(if(stillWater.contains(x to y)) '~' else if(water.contains(x to y)) '|' else if(clay.contains(x to y)) '#' else '.')
            }
            println()
        }
    }

    var oldSize = 0
    var rounds = 0
    while (water.size != oldSize || rounds < 2) {
        if (water.size == oldSize) {
            rounds++
        } else {
            rounds = 0
        }
        oldSize = water.size
        val newWater = water.toMutableSet()
        water.forEach {
            val below = it.first to it.second + 1
            val left = it.first - 1 to it.second
            val right = it.first + 1 to it.second

            if(!clay.contains(below) && !stillWater.contains(below) ) {
                newWater.add(below)
            } else {
                if(!clay.contains(right)) {
                    newWater.add(right)
                } else {
                    val rightClay = right
                    val potentialTiles = (1..150).map { rightClay.first - it to rightClay.second }
                    if(potentialTiles.find { it in clay || it !in water } in clay) {
                        val clayTile = potentialTiles.find { it in clay } ?: throw Error("shouldnt occur")
                        (clayTile.first + 1 until rightClay.first).forEach { x ->
                            stillWater.add(x to it.second)
                        }
                    }
                }
                if(!clay.contains(left)) {
                    newWater.add(left)
                } else {
                    val leftClay = left
                    val potentialTiles = (1..100).map { leftClay.first + it to leftClay.second }
                    if(potentialTiles.find { it in clay || it !in water } in clay) {
                        val clayTile = potentialTiles.find { it in clay } ?: throw Error("shouldnt occur")
                        (leftClay.first + 1 until clayTile.first).forEach { x ->
                            stillWater.add(x to it.second)
                        }
                    }
                }
            }

            if(stillWater.contains(below)) {
                if(!clay.contains(right)) {
                    newWater.add(right)
                }
                if(!clay.contains(left)) {
                    newWater.add(left)
                }
            }

        }

        water = newWater
            .filter { it.second <= yMaxClay}
            .filter { it !in stillWater }
            .toSet()
    }
    print()

    println("P1")
    println((water + stillWater).filter { it.second >= yMinClay }.size)

    println("P2")
    println(stillWater.filter { it.second >= yMinClay }.size)
}
