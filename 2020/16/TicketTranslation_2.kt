package `16`

import java.io.File
import kotlin.math.absoluteValue
import kotlin.math.pow

fun main(args: Array<String>) {
    data class Rule(val name: String, val ranges: List<IntRange>)

    val input = File("${System.getProperty("user.dir")}/2020/16/input.txt")
        .readText()
        .split("\n\n");

    val rules = input[0].split("\n")
        .map { ruleText ->
            val rule = ruleText.substringAfter(": ")
            Rule(ruleText.substringBefore(":"),
                rule.split(" or ").map { range ->
                    range.split("-")[0].toInt()..range.split("-")[1].toInt()
                })
        }

    val yourTicket = input[1]
        .split("\n")[1]
        .split(",")
        .map { it.toInt() }

    val nearbyTickets = input[2]
        .split("\n")
        .filterIndexed { index, _ -> index > 0 }
        .map { it.split(",").map { field -> field.toInt() } }

    val validTickets = nearbyTickets.filterNot { ticket ->
        ticket.any { field ->
            rules.none { rule ->
                rule.ranges.any { range ->
                    field in range
                }
            }
        }
    } + listOf(yourTicket)

    fun <T> permutationsOf(list: List<T>): List<List<T>> =
        if (list.size == 1)
            listOf(list)
        else
            list.flatMapIndexed { index, value ->
                permutationsOf(list.filterIndexed { subIndex, _ -> subIndex != index })
                    .map {
                        it.plus(value)
                    }
            }

    val validRuleOrder = permutationsOf(rules)
        .find { rulePermutation ->
            validTickets.all { ticket ->
                ticket.mapIndexed { index, field ->
                    rulePermutation[index].ranges.any { range ->
                        field in range
                    }
                }.all { it }
            }
        }!!

    val departureValues = validRuleOrder
        .filter { it.name.contains("departure") }
        .mapIndexed { index, _ -> yourTicket[index] }

    println(departureValues.sum())
}
