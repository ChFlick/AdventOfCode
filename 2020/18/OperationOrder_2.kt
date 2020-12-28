package `18`

import java.io.File
import java.util.Stack

fun main(args: Array<String>) {
    fun calculate(parts: List<String>): Long {
        var innerParts = parts
        while (innerParts.indexOf("(") > -1) {
            val startBracketIndex = innerParts.indexOf("(")
            var endBracketIndex = 0
            val stack = Stack<String>()
            for (index in innerParts.indexOf("(")..innerParts.lastIndexOf(")")) {
                if (innerParts[index] == "(") {
                    stack.push("(")
                } else if (innerParts[index] == ")") {
                    stack.pop()
                    if (stack.empty()) {
                        endBracketIndex = index + 1
                        break
                    }
                }
            }
            innerParts = innerParts.subList(0, startBracketIndex) +
                    calculate(innerParts.subList(startBracketIndex + 1, endBracketIndex - 1)).toString() +
                    innerParts.subList(endBracketIndex, innerParts.size)
        }

        while (innerParts.indexOf("+") > 0) {
            val plusIndex = innerParts.indexOf("+")
            innerParts = innerParts.subList(0, plusIndex - 1) +
                    (innerParts[plusIndex - 1].toLong() + innerParts[plusIndex + 1].toLong()).toString() +
                    innerParts.subList(plusIndex + 2, innerParts.size)
        }

        while (innerParts.indexOf("*") > 0) {
            val plusIndex = innerParts.indexOf("*")
            innerParts = innerParts.subList(0, plusIndex - 1) +
                    (innerParts[plusIndex - 1].toLong() * innerParts[plusIndex + 1].toLong()).toString() +
                    innerParts.subList(plusIndex + 2, innerParts.size)
        }

        return innerParts.joinToString("").toLong()
    }


    val result = File("${System.getProperty("user.dir")}/2020/18/input.txt")
        .readLines()
        .map { expression ->
            calculate(expression.split(" ", "").filterNot { it.isEmpty() })
        }.sum()

    println(result)

}