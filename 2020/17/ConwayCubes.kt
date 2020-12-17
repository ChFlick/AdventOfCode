package `17`

import java.io.File
import kotlin.math.absoluteValue
import kotlin.math.pow

fun main(args: Array<String>) {
    var cubes = File("${System.getProperty("user.dir")}/2020/17/input.txt")
        .readLines()
        .flatMapIndexed { y, row ->
            row.mapIndexedNotNull { x, cell ->
                if (cell == '#') Triple(x, y, 0) to true else null
            }
        }
        .toMap()

    repeat(6) {
        val cubesInRange =
            (cubes.keys.minOf { it.third } - 1).rangeTo(cubes.keys.maxOf { it.third } + 1).flatMap { z ->
                (cubes.keys.minOf { it.second } - 1).rangeTo(cubes.keys.maxOf { it.second } + 1).flatMap { y ->
                    (cubes.keys.minOf { it.first } - 1).rangeTo(cubes.keys.maxOf { it.first } + 1).map { x ->
                        Triple(x, y, z)
                    }
                }
            }

        cubes = cubesInRange.mapNotNull {
            val numberOfNeighbors =
                ((it.third - 1)..(it.third + 1)).sumBy { z ->
                    ((it.second - 1)..(it.second + 1)).sumBy { y ->
                        ((it.first - 1)..(it.first + 1))
                            .filterNot { x -> x == it.first && y == it.second && z == it.third }
                            .count { x ->
                                cubes.containsKey(Triple(x, y, z))
                            }
                    }
                }

            if (cubes.containsKey(it)) {
                return@mapNotNull if (numberOfNeighbors in 2..3) (it to true) else null
            } else {
                return@mapNotNull if (numberOfNeighbors == 3) (it to true) else null
            }

        }.toMap()

        println(cubes.size)
    }

}
