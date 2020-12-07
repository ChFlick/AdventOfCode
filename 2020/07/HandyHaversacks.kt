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

    fun findParents(searchBag: String): Set<String> {
        val rulesContainingBag = rules.entries.filter { rule ->
            rule.value.any { it?.second == searchBag }
        }

        return rulesContainingBag.map { it.key }
                .union(rulesContainingBag.fold(emptySet()) { acc, entry -> acc.union(findParents(entry.key)) })
    }

    println(findParents(start).size)
}

