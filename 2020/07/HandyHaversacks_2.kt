package `07`

import java.io.File


fun main(args: Array<String>) {
    val input = File("""${System.getProperty("user.dir")}/2020/07/input.txt""").readText().split("\n")

    val rules = input.map {
        val left = it.split("contain")[0].trim()
        val right = it.split("contain")[1]
                .split(",")
                .map {
                    it.replace(".", "")
                            .replace("bag$".toRegex(), "bags")
                            .trim()
                }
                .map {
                    if (it == "no other bags") {
                        return@map null
                    }

                    it.substringBefore(" ").toInt() to it.substringAfter(" ")
                }
        left to right
    }.toMap()

    val start = "shiny gold bags"

    fun childSum(searchBag: String): Int {
        val bagRule = rules.entries.find { it.key == searchBag }!!

        return bagRule.value.map {
            it?.first?.times(childSum(it.second).plus(1)) ?: 0
        }.sum()
    }

    println(childSum(start))
}

