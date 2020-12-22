package `22`

import java.io.File

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

    while (!(input1.isEmpty() || input2.isEmpty())) {
        if(input1.first() > input2.first()) {
            input1.add(input1.removeFirst())
            input1.add(input2.removeFirst())
        } else {
            input2.add(input2.removeFirst())
            input2.add(input1.removeFirst())
        }
    }

    println(input1.union(input2).reversed().reduceIndexed { index, acc, i -> acc + (index + 1) * i })
}
