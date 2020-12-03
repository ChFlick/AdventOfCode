package `02`

import java.io.File

fun main(args: Array<String>) {
    val input = File("""${System.getProperty("user.dir")}/2020/02/input.txt""")
            .readLines()

    val correctCount = input.filter { policy ->
        val min = policy.substringBefore('-').toInt()
        val max = "-(\\d+) ".toRegex().find(policy)?.groupValues?.get(1)?.toInt() ?: 0
        val char = " (\\w):".toRegex().find(policy)?.groupValues?.get(1) ?: ""
        val password = policy.substringAfter(": ")

        password.count { it == char[0] } in min..max
    }.count()

    println(correctCount)
}

