import java.io.File
import kotlin.system.exitProcess

fun main(args: Array<String>) {
    val input = File("""${System.getProperty("user.dir")}/2020/01/input.txt""")
            .readLines()
            .map { it.toInt() }

    input.forEach { first ->
        input.forEach { second ->
            input.forEach { third ->
                if (first != second && second != third && first != third && first + second + third == 2020) {
                    println("""$first, $second, $third, ${first * second * third}""")
                    exitProcess(0)
                }
            }
        }
    }
}

