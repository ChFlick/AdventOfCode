package `23`

import java.io.File

fun main(args: Array<String>) {
    class CircularList<T>(val list: MutableList<T>) : MutableList<T> by list {
        override fun get(index: Int): T = list[index.safeIndex()]

        override fun removeAt(index: Int): T = list.removeAt(index.safeIndex())

        override fun subList(fromIndex: Int, toIndex: Int): MutableList<T> {
            return when {
                fromIndex < toIndex -> list.subList(fromIndex.subListSafeIndex(), toIndex.subListSafeIndex())
                fromIndex == toIndex -> mutableListOf()
                else -> (list.subList(fromIndex.subListSafeIndex(), list.size) +
                        list.subList(0, toIndex.subListSafeIndex())).toMutableList()
            }
        }

        override fun toString(): String = list.toString()

        private fun Int.safeIndex(): Int = this % size
        private fun Int.subListSafeIndex(): Int = this % (size + 1)
    }

    fun <T> List<T>.toCircular(): MutableList<T> = CircularList(this.toMutableList())

    var deck = File("${System.getProperty("user.dir")}/2020/23/input.txt")
        .readText()
        .split("")
        .filter { it.isNotBlank() }
        .map { it.toInt() }
        .toCircular()

    val cupsInOrder = deck.sortedDescending()

    var previousCup = -1
    var currentCup = -1
    repeat(100) {
        fun currentIndex(x: Int? = null) = if (deck.indexOf(x ?: currentCup) == -1) 0 else deck.indexOf(x?: currentCup) + 1
        fun nextIndex(x: Int? = null) = ((currentIndex(x) % deck.size) + 1) % deck.size

        previousCup = currentCup
        currentCup = deck[currentIndex()]
        val nextCups = listOf(
            deck.removeAt(nextIndex(previousCup)),
            deck.removeAt(nextIndex(previousCup)),
            deck.removeAt(nextIndex(previousCup))
        )

        val potentialDestinations = cupsInOrder.filterNot { it in nextCups }
        val destination =
            potentialDestinations[(potentialDestinations.indexOf(currentCup) + 1) % potentialDestinations.size]

        deck = (deck.subList(0, deck.indexOf(destination) + 1) +
                nextCups +
                deck.subList(deck.indexOf(destination) + 1, deck.size)).toCircular()

//        println("$destination, $nextCups")
//        println(deck)
    }
    println((deck.subList(deck.indexOf(1), deck.size) + deck.subList(0, deck.indexOf(1))).joinToString(""))
}
