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

    val errorRate = nearbyTickets.map { ticket ->
        ticket.filter { field ->
            rules.none { rule ->
                rule.ranges.any { range ->
                    field in range
                }
            }
        }.sum()
    }.sum()

    println(errorRate)

}
