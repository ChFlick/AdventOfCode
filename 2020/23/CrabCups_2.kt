package `23`

import java.io.File

fun main(args: Array<String>) {
    val SIZE        = 1000000
    val TEN_MILLION = 10000000

    fun IntArray.printStartingAt(x: Int, times: Int) {
        val inOrder = IntArray(times)
        var current = x
        repeat(times) {
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
    deck[input.last() - 1] = 10
    (10..SIZE).zipWithNext { a, b -> deck[a - 1] = b  }
    deck[SIZE - 1] = input.first()

    var currentCup = input.last()
    repeat(TEN_MILLION) {
        currentCup = deck[currentCup - 1]

        val nextCups = listOf(
            deck[currentCup - 1],
            deck[deck[currentCup - 1] - 1],
            deck[deck[deck[currentCup - 1] -1] - 1]
        )

        val offset = (1..4).find {
            Math.floorMod(currentCup - it - 1, SIZE) + 1 !in nextCups
        } ?: throw Error("doesnt work")
        val destination = Math.floorMod(currentCup - offset - 1, SIZE) + 1

        deck[currentCup - 1] = deck[nextCups.last() - 1]
        deck[nextCups.last() - 1] = deck[destination - 1]
        deck[destination - 1] = nextCups.first()
    }
    deck.printStartingAt(934001, 5)

    println(deck[934001])

    println(deck[0])
    println(deck[deck[0]])

    println(deck[0].toLong() * deck[deck[0]].toLong())

}
