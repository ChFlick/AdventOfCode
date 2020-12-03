import java.io.File
import kotlin.system.exitProcess

fun main(args: Array<String>) {
    val input = File("""${System.getProperty("user.dir")}/2020/01/input.txt""")
            .readLines()
            .map { it.toInt() }

    input.forEach { first ->
        input.forEach { second ->
            input.forEach { thrid ->
                if (first != second && second != thrid && first != thrid && first + second + thrid == 2020) {
                    println("""$first, $second, $thrid, ${first * second * thrid}""")
                    exitProcess(0)
                }
            }
        }
    }
}

