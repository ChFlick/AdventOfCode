package `06`

import java.io.File


fun main(args: Array<String>) {
    val groups = File("""${System.getProperty("user.dir")}/2020/06/input.txt""").readText().split("\n\n")

    val result = groups.map {
        it.replace(" ", "").replace("\n", "")
                .toCharArray()
                .toSet()
                .size
    }.sum()

    println(result)
}

