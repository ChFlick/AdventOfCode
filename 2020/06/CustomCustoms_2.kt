package `06`

import java.io.File


fun main(args: Array<String>) {
    val groups = File("""${System.getProperty("user.dir")}/2020/06/input.txt""").readText().split("\n\n")

    val result = groups.map {
        it.split("\n")
                .reduce { sameAnswers, currentAnswer ->
                    println("""reduceing $sameAnswers and $currentAnswer""")
                    sameAnswers.toCharArray().toList()
                            .intersect(currentAnswer.toCharArray().toList())
                            .joinToString("")
                }.length
    }.sum()

    println(result)
}

