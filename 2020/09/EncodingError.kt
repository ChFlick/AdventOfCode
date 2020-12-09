package `09`

import java.io.File
import kotlin.system.exitProcess


fun main(args: Array<String>) {
    val STEP_LENGTH = 25
    val input = File("""${System.getProperty("user.dir")}/2020/09/input.txt""")
            .readText()
            .split("\n")
            .map { it.toLong() }

    for (i in STEP_LENGTH until input.size) {
        val currentValue = input[i]
        val matches = input.subList(i - STEP_LENGTH, i).flatMapIndexed { outerIndex, x ->
            input.subList(i - STEP_LENGTH, i)
                    .filterIndexed { innerIndex, _ -> outerIndex != innerIndex }
                    .map { y ->
                        currentValue == x + y
                    }
        }
        if (!matches.contains(true)) {
            println(currentValue)
            exitProcess(0)
        }
    }

}

//fun <T> combinations(list: List<T>): List<Pair<T, T>> {
//    val combinationsList
//}

