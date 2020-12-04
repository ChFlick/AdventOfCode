package `04`

import java.io.File


fun main(args: Array<String>) {
    val EYE_COLORS = listOf("amb", "blu", "brn", "gry", "grn", "hzl", "oth")
    val REQUIRED_FIELDS = mapOf<String, (String) -> Boolean>(
            "byr" to { it.toInt() in 1920..2002 },
            "iyr" to { it.toInt() in 2010..2020 },
            "eyr" to { it.toInt() in 2020..2030 },
            "hgt" to {
                when {
                    it.endsWith("cm") -> it.replace("cm", "").toInt() in 150..193
                    it.endsWith("in") -> it.replace("in", "").toInt() in 59..76
                    else -> false
                }
            },
            "hcl" to { it.matches("#[0-9a-f]{6}".toRegex()) },
            "ecl" to { it in EYE_COLORS },
            "pid" to { it.matches("\\d{9}".toRegex()) }
    )

    fun isValid(document: Map<String, String>): Boolean =
            document.entries.fold(true) { allEntriesValid, entry ->
                allEntriesValid && REQUIRED_FIELDS[entry.key]!!(entry.value)
            }

    val input = File("""${System.getProperty("user.dir")}/2020/04/input.txt""").readText().split("\n\n")

    val validPassports = input.fold(0) { validPassports, passport ->
        val document = passport.split(" ", "\n")
                .filter { it.isNotBlank() }
                .map { Pair(it.split(":")[0], it.split(":")[1]) }
                .filter { it.first in REQUIRED_FIELDS.keys }
                .toMap()

        if (document.keys.containsAll(REQUIRED_FIELDS.keys) && isValid(document))
            validPassports + 1
        else
            validPassports
    }

    println(validPassports)
}



