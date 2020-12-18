package `18`

import java.io.File
import kotlin.math.absoluteValue
import kotlin.math.exp
import kotlin.math.pow

fun main(args: Array<String>) {
    fun getValueFor(expression: List<String>): Pair<Long, Int> {
        var currentValue = 0L
        var operator = ""
        var index = 0

        while (index < expression.size) {
            val current = expression[index.toInt()]
            index++
            when (current) {
                in listOf("+", "*") -> {
                    operator = current
                }
                "(" -> {
                    val subexpressionResult = getValueFor(
                        expression.subList(index, expression.lastIndex)
                    )
                    index += subexpressionResult.second
                    currentValue = when (operator) {
                        "+" -> currentValue + subexpressionResult.first
                        "*" -> currentValue * subexpressionResult.first
                        "" -> subexpressionResult.first
                        else -> throw Error("Invalid operation")
                    }
                }
                ")" -> {
                    return currentValue to index
                }
                else -> {
                    currentValue = when (operator) {
                        "+" -> currentValue + current.toLong()
                        "*" -> currentValue * current.toLong()
                        "" -> current.toLong()
                        else -> throw Error("Invalid operation")
                    }
                }
            }
        }

        return currentValue to index
    }

    val result = File("${System.getProperty("user.dir")}/2020/18/input.txt")
        .readLines()
        .map { line ->
            line.split("").filter { it.isNotBlank() }
        }
        .map { getValueFor(it).first }
        .onEach { println(it) }
        .sum()

    println(result)
}
