package `19`

import java.io.File

fun main(args: Array<String>) {
    val (rulesInput, messagesInput) = File("${System.getProperty("user.dir")}/2020/19/input.txt")
        .readText()
        .split("\n\n")
        .map { it.split("\n") }

    val rules = rulesInput
        .map { rule ->
            val number = rule.substringBefore(":").toInt()
            when {
                rule.startsWith("8:") -> 8 to (listOf(42) to listOf(42, 8))
                rule.startsWith("11:") -> 11 to (listOf(42, 31) to listOf(42, 11, 31))
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

    fun ruleToString(
        ruleNumber: Int,
        rule: Any,
        depth: Int
    ): List<String> {
        return when (rule) {
            is String -> listOf(rule)
            is List<*> -> {
                rule.map { ruleToString(it as Int, rules[it]!!, depth) }
                    .fold(emptyList()) { list, ele ->
                        if (list.isEmpty())
                            ele
                        else
                            ele.flatMap { e -> list.map { it + e } }
                    }
            }
            is Pair<*, *> -> {
                val nextDepth = if (ruleNumber == 8 || ruleNumber == 11) depth + 1 else depth
                val pair = rule as Pair<List<Int>, List<Int>>

                val firstPair = pair.first
                    .map {
                        if (it == 8)
                            listOf("X")
                        else if (it == 11)
                            listOf("Y")
                        else ruleToString(it, rules[it]!!, nextDepth)
                    }
                    .fold(emptyList<String>()) { list, ele ->
                        if (list.isEmpty())
                            ele
                        else
                            ele.flatMap { e -> list.map { it + e } }
                    }

                if (nextDepth < 2)
                    firstPair +
                            pair.second
                                .map {
                                    if (it == 8)
                                        listOf("X")
                                    else if (it == 11)
                                        listOf("Y")
                                    else ruleToString(it, rules[it]!!, nextDepth)
                                }
                                .fold(emptyList<String>()) { list, ele ->
                                    if (list.isEmpty())
                                        ele
                                    else
                                        ele.flatMap { e -> list.map { it + e } }
                                }
                else
                    firstPair
            }
            else -> throw Error()
        }
    }

    fun ruleToString2(ruleNumber: Int, rule: Any, eightVals: List<String>, elevenVals: List<String>): List<String> {
        return when (rule) {
            is String -> listOf(rule)
            is List<*> -> {
                rule.map { ruleToString2(it as Int, rules[it]!!, eightVals, elevenVals) }
                    .fold(emptyList()) { list, ele ->
                        if (list.isEmpty())
                            ele
                        else
                            ele.flatMap { e -> list.map { it + e } }
                    }
            }
            is Pair<*, *> -> {
                if (ruleNumber == 8) {
                    return listOf("X")
                } else if (ruleNumber == 11) {
                    return listOf("Y")
                }

                val pair = rule as Pair<List<Int>, List<Int>>

                pair.first
                    .map { ruleToString2(it, rules[it]!!, eightVals, elevenVals) }
                    .fold(emptyList<String>()) { list, ele ->
                        if (list.isEmpty())
                            ele
                        else
                            ele.flatMap { e -> list.map { it + e } }
                    } +
                        pair.second
                            .map { ruleToString2(it, rules[it]!!, eightVals, elevenVals) }
                            .fold(emptyList<String>()) { list, ele ->
                                if (list.isEmpty())
                                    ele
                                else
                                    ele.flatMap { e -> list.map { it + e } }
                            }
            }
            else -> throw Error()
        }
    }

    val possibleEightValues = ruleToString(8, rules[8]!!, 0).filter { it.contains("X") }
    println(possibleEightValues)
    val possibleElevenValues = ruleToString(11, rules[11]!!, 0).filter { it.contains("Y") }
    println(possibleElevenValues)

    fun mayBeValid(message: String, product: String): Boolean {
        return if (product.length > message.length + 2) {
            false
        } else if (product.length == message.length && !product.contains("X|Y".toRegex())) {
            message == product
        } else {
            val min = kotlin.math.min(product.indexOf("X"), product.indexOf("Y"))
            val max = kotlin.math.max(product.indexOf("X"), product.indexOf("Y"))
            message.startsWith(product.substring(0, min)) &&
                    message.endsWith(product.substring(max + 1, product.length)) &&
                    message.contains(product.substring(min + 1, max))
        }
    }

    fun isValid(message: String, product: String): Boolean =
        message == product.replace("X", "").replace("Y", "")

    rules[0]?.let {
        val possibleMessages = ruleToString2(0, it, possibleEightValues, possibleElevenValues)
        val validMessages = messagesInput.filter { message ->
            possibleMessages.any { possibleMessage ->
                if (!mayBeValid(message, possibleMessage)) {
                    return@any false
                } else {
                    var possibleAlternatives =
                        possibleEightValues.flatMap { eightValue ->
                            possibleElevenValues
                                .map { possibleMessage.replace("Y", it) }
                                .map { it.replace("X", eightValue)}
                             }
                            .filter { mayBeValid(message, it) }

                    while (possibleAlternatives.isNotEmpty()) {
                        println(possibleAlternatives.size)
                        if (possibleAlternatives.any { isValid(message, it) }) {
                            return@any true
                        }

                        possibleAlternatives = possibleAlternatives
                            .filter { alt -> alt.contains("X") || alt.contains("Y") }
                            .flatMap { alt ->
                                possibleEightValues.map { alt.replace("X", it) }  +
                                possibleElevenValues.map { alt.replace("Y", it) }
                            }
                            .filterNot { it in possibleAlternatives }
                            .filter { mayBeValid(message, it) }
                            .distinct()
                    }
                    return@any false
                }
            }
        }

        validMessages.forEach { println(it) }
        println(validMessages.size)
    }
}
