package `23`

import java.io.File

fun main(args: Array<String>) {
    val SIZE = 9

    fun IntArray.printStartingAt(x: Int) {
        val inOrder = IntArray(this.size)
        var current = x
        repeat(this.size) {
            inOrder[it] = current
            current = this[current - 1]
        }
        println(inOrder.asList())
    }

    val deck = IntArray(SIZE)
    val input = File("${System.getProperty("user.dir")}/2020/23/input.txt") 
        .readText()
        .split("")
        .filter { it.isNotBlank() }
        .map { it.toInt() }

    input.zipWithNext { a, b -> deck[a - 1] = b }
    deck[input.last() - 1] = input.first()

    var currentCup = input.last()
    repeat(100) {
        currentCup = deck[currentCup - 1]

        val nextCups = listOf(
            deck[currentCup - 1],
            deck[deck[currentCup - 1] - 1],
            deck[deck[deck[currentCup - 1] - 1] - 1]
        )

        val offset = (1..4).find {
            Math.floorMod(currentCup - it - 1, SIZE) + 1 !in nextCups
        } ?: throw Error("doesnt work")
        val destination = Math.floorMod(currentCup - offset - 1, SIZE) + 1

        deck[currentCup - 1] = deck[nextCups.last() - 1]
        deck[nextCups.last() - 1] = deck[destination - 1]
        deck[destination - 1] = nextCups.first()

        deck.printStartingAt(3)
        println(nextCups)
        println(destination)
    }

    deck.printStartingAt(1)

}
