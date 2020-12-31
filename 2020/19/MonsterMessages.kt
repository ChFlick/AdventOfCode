package `19`

import java.io.File
import kotlin.math.absoluteValue
import kotlin.math.exp
import kotlin.math.pow

fun main(args: Array<String>) {
    val (rulesInput, messagesInput) = File("${System.getProperty("user.dir")}/2020/19/input.txt")
        .readText()
        .split("\n\n")
        .map { it.split("\n") }

    val rules = rulesInput
        .map { rule ->
            val number = rule.substringBefore(":").toInt()
            when {
                rule.contains("\"") -> {
                    number to rule.substringAfter("\"").substringBefore("\"")
                }
                rule.contains("|") -> {
                    val left = rule.substringAfter(": ")
                        .substringBefore(" |")
                        .split(" ")
                        .map { it.toInt() }
                    val right = rule.substringAfter("| ")
                        .split(" ")
                        .map { it.toInt() }
                    number to (left to right)
                }
                else -> {
                    val left = rule.substringAfter(": ")
                        .split(" ")
                        .map { it.toInt() }
                    number to left
                }
            }
        }
        .toMap()

    fun ruleToString(rule: Any): List<String> {
        return when (rule) {
            is String -> listOf(rule)
            is List<*> -> {
                rule.map { ruleToString(rules[it as Int]!!) }
                    .fold(emptyList()) { list, ele ->
                        if (list.isEmpty())
                            ele
                        else
                            ele.flatMap { e -> list.map { it + e } }
                    }
            }
            is Pair<*, *> -> {
                val pair = rule as Pair<List<Int>, List<Int>>
                listOf(
                    pair.first.map { ruleToString(pair.first[it as Int]!!) }.flatten(),
                    pair.second.map { ruleToString(pair.second[it as Int]!!) }.flatten()
                )
                emptyList()
            }
            else -> throw Error()
        }
    }

    println(rules[0]?.let { ruleToString(it) })
}
