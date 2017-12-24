import kotlin.system.measureNanoTime

// V1
//fun main(args: Array<String>) {
//    val numberOfSteps = 386
//    var position = 0
//    var values = ArrayList<Int>(2018)
//    values.add(0)
//
//    for (i in 1..2017){
//        position = (position + numberOfSteps) % values.size
//        values.add(position + 1, i)
//        position++
//    }
//
//    println(values)
//    println(values[position + 1])
//}

fun main(args: Array<String>) {
    val numberOfSteps = 386
    var position = 0
    var listsize = 1
    var secondValue = 0

    for (i in 1..50000001){
        position = (position + numberOfSteps) % listsize
        if(position == 0){
            secondValue = i
        }
        position++
        listsize++
    }

    println(secondValue)
}