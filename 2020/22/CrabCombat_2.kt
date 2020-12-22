package `22`

import java.io.File
import kotlin.math.max

enum class Winner { ONE, TWO }
data class Player(val winner: Winner, val deck: ArrayDeque<Int>)

fun main(args: Array<String>) {
    val (input1, input2) = File("${System.getProperty("user.dir")}/2020/21/input.txt")
        .readText()
        .split("\n\n")
        .map {
            it.split("\n")
                .filterIndexed { index, _ -> index > 0 }
                .map { it.toInt() }
        }
        .map { ArrayDeque(it) }

    fun recursiveCrabCombat(first: ArrayDeque<Int>, second: ArrayDeque<Int>): Player {
        val previousRounds = mutableSetOf<Pair<ArrayDeque<Int>, ArrayDeque<Int>>>()

        while (!(first.isEmpty() || second.isEmpty())) {
            if (previousRounds.contains(first to second)) {
                return Player(Winner.ONE, first)
            }
            previousRounds.add(first to second)

            if (first.size > first.first() && second.size > second.first()) {
                val firstCard = first.removeFirst()
                val secondCard = second.removeFirst()
                val firstSubdeck = first.subList(0, firstCard)
                val secondSubdeck = second.subList(0, secondCard)
                if (recursiveCrabCombat(ArrayDeque(firstSubdeck), ArrayDeque(secondSubdeck)).winner == Winner.ONE) {
                    first.add(firstCard)
                    first.add(secondCard)
                } else {
                    second.add(secondCard)
                    second.add(firstCard)
                }
            } else {
                if (first.first() > second.first()) {
                    first.add(first.removeFirst())
                    first.add(second.removeFirst())
                } else {
                    second.add(second.removeFirst())
                    second.add(first.removeFirst())
                }
            }
        }

        return if(first.isEmpty()) Player(Winner.TWO, second) else Player(Winner.ONE, first)
    }

    val winner = recursiveCrabCombat(input1, input2)
    println(winner.deck.reversed().reduceIndexed { index, acc, i -> acc + (index + 1) * i })
}