fun main(args: Array<String>) {
    val times = 1000000000
    var programs = "abcdefghijklmnop"
    val actions = readLine()?.split(",") ?: ArrayList()
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

private fun dance(actions: List<String>, programs: String): String =
        actions.fold(programs) { programs, it ->
            when {
                it.startsWith("s") ->
                    spin(programs, Integer.valueOf(it.substring(1)))
                it.startsWith("x") -> {
                    val positions = it.substring(1).split("/")
                    exchange(programs, Integer.valueOf(positions[0]), Integer.valueOf(positions[1]))
                }
                it.startsWith("p") -> {
                    val partners = it.substring(1).split("/")
                    partner(programs, partners[0], partners[1])
                }
                else -> "ERROR"
            }
        }

fun spin(string: String, times: Int): String =
    (0 until times).fold(string) { acc, _ -> acc.takeLast(1) + acc.substring(0, acc.length - 1) }

fun exchange(string: String, posA: Int, posB: Int): String =
    string.substring(0, minOf(posA, posB)) +
            string[maxOf(posA, posB)] +
            string.substring(minOf(posA, posB) + 1, maxOf(posA, posB)) +
            string[minOf(posA, posB)] +
            string.substring(maxOf(posA, posB) + 1, string.length)

fun partner(string: String, partnerA: String, partnerB: String): String =
     exchange(string, string.indexOf(partnerA), string.indexOf(partnerB))