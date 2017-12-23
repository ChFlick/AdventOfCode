fun main(args: Array<String>) {
    val times = 1000000000
    var programs = "abcdefghijklmnop"
    val actions = readLine()?.split(",")
    var occ1 = 0
    var occ2 = 0

    var i = 1
    while (occ1 == 0 || occ2 == 0){
        programs = dance(actions, programs)
        // find repetitions
        if(programs == "abcdefghijklmnop"){
            if(occ1 == 0){
                occ1 = i
            } else {
                occ2 = i
            }
        }
        i++
    }

    val remainingTimes = ((times - occ1) % (occ2 - occ1))
    for(i in 0 until remainingTimes){
        programs = dance(actions, programs)
    }

    println(programs)
}

private fun dance(actions: List<String>?, programs: String): String {
    var programs1 = programs
    actions?.forEach {
        programs1 = when {
            it.startsWith("s") ->
                spin(programs1, Integer.valueOf(it.substring(1)))
            it.startsWith("x") -> {
                val positions = it.substring(1).split("/")
                exchange(programs1, Integer.valueOf(positions[0]), Integer.valueOf(positions[1]))
            }
            it.startsWith("p") -> {
                val partners = it.substring(1).split("/")
                partner(programs1, partners[0], partners[1])
            }
            else -> "ERROR"
        }
    }
    return programs1
}

fun spin(string: String, times: Int): String {
    var result: String = string
    for(i in 0 until times){
        result = result.takeLast(1) + result.substring(0, result.length - 1)
    }

    return result
}

fun exchange(string: String, posA: Int, posB: Int): String {
    if(posA == posB) return string

    val lowerPos = minOf(posA, posB)
    val higherPos = maxOf(posA, posB)

    return string.substring(0, lowerPos) +
            string[higherPos] +
            string.substring(lowerPos + 1, higherPos) +
            string[lowerPos] +
            string.substring(higherPos + 1, string.length)
}

fun partner(string: String, partnerA: String, partnerB: String): String =
     exchange(string, string.indexOf(partnerA), string.indexOf(partnerB))
