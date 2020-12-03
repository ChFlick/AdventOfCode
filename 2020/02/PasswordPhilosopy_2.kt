package `02`

import java.io.File

fun main(args: Array<String>) {
    val input = File("""${System.getProperty("user.dir")}/2020/02/input.txt""")
            .readLines()

    val correctCount = input.filter { policy ->
        val first = policy.substringBefore('-').toInt()
        val second = "-(\\d+) ".toRegex().find(policy)?.groupValues?.get(1)?.toInt() ?: 0
        val char = " (\\w):".toRegex().find(policy)?.groupValues?.get(1) ?: ""
        val password = policy.substringAfter(": ")

        (password[first - 1] == char[0]).xor(password[second - 1] == char[0])
    }.count()

    println(correctCount)
}

