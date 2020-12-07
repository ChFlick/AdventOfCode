package `05`

import java.io.File


fun main(args: Array<String>) {
    val input = File("""${System.getProperty("user.dir")}/2020/05/input.txt""").readText().split("\n")

    val seatIds = input.map {
        val row = it.substring(0, 7)
                .replace("F", "0")
                .replace("B", "1")
                .toInt(2)
        val col = it.substring(7)
                .replace("L", "0")
                .replace("R", "1")
                .toInt(2)

        row * 8 + col
    }

    val minId = seatIds.minOrNull() ?: 0
    val maxId = seatIds.maxOrNull() ?: 0

    for (i in (minId + 1) until maxId) {
        if (i !in seatIds && (i - 1) in seatIds && (i + 1) in seatIds) {
            println(i)
        }
    }
}

