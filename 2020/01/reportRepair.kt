import java.io.File
import kotlin.system.exitProcess

fun main(args: Array<String>) {
    val input = File("""${System.getProperty("user.dir")}/2020/01/input.txt""")
            .readLines()
            .map { it.toInt() }

    input.forEach { first ->
        input.forEach { second ->
            if (first != second && first + second == 2020) {
                println("""$first, $second, ${first * second}""")
                exitProcess(0)
            }
        }
    }
}

