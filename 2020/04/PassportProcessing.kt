package `04`

import java.io.File


fun main(args: Array<String>) {
    val REQUIRED_FIELDS = listOf("byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid")
    val OPTIONAL_FIELDS = listOf("cid")

    val input = File("""${System.getProperty("user.dir")}/2020/04/input.txt""").readText().split("\n\n")

    val validPassports = input.fold(0) { validPassports, passport ->
        val documentFields = passport.split(" ", "\n")
                .filter { it.isNotBlank() }
                .map { it.split(":")[0] }
                .toList()

        if (documentFields.containsAll(REQUIRED_FIELDS))
            validPassports + 1
        else
            validPassports
    }

    println(validPassports)
}

