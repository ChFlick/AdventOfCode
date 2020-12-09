package `09`

import java.io.File
import kotlin.math.min
import kotlin.system.exitProcess

const val STEP_LENGTH = 25

fun main(args: Array<String>) {
    val TARGET_NUMBER = 1038347917
    val input = File("""${System.getProperty("user.dir")}/2020/09/input.txt""")
            .readText()
            .split("\n")
            .filter { it.toLong() < TARGET_NUMBER }
            .map { it.toInt() }

    outer@ for (i in input.size downTo 0) {
        for (j in i - 1 downTo 0) {
            val sum = input.subList(j, i).sum()
            if (sum == TARGET_NUMBER) {
                println("Sum: $sum")
                println("Values: ${input.subList(j, i)}")
                println("Solution: ${input.subList(j, i).minOrNull()!!.plus(input.subList(j, i).maxOrNull()!!)}")
            } else if (sum > TARGET_NUMBER) {
                continue@outer
            }
        }
    }


}

//fun <T> combinations(list: List<T>): List<Pair<T, T>> {
//    val combinationsList
//}

