package `25`

import java.io.File

fun main(args: Array<String>) {
    var cardPubKey = 18356117
    var doorPubKey = 5909654

    fun findLoopSizeFor(publicKey: Int): Int  {
        var cardLoopSize = 0
        var value = 1
        while(value != publicKey) {
            value *= 7
            value %= 20201227

            cardLoopSize++
        }

        return cardLoopSize
    }

    val cardLoopSize = findLoopSizeFor(cardPubKey)

    var value = 1L
    repeat(cardLoopSize) {
        value *= doorPubKey
        value %= 20201227
    }

    println(value)
}