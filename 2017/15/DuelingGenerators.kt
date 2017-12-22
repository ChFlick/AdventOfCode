import java.math.BigInteger

class Generator(
        private var lastVal: BigInteger,
        private val factor: BigInteger,
        private val multipleOf: BigInteger) {

    private val divisor = BigInteger("2147483647")
    
    fun getNextVal(): BigInteger{
        do {
            lastVal = (lastVal * factor) % divisor
        } while (lastVal % multipleOf != BigInteger.ZERO)
        return lastVal
    }
}

fun main(args: Array<String>) {
    val twoHighSixteen = BigInteger("65536")

    val generator1 = Generator(lastVal = BigInteger("618"),
                                factor = BigInteger("16807"),
                                multipleOf = BigInteger("4"))
    val generator2 = Generator(lastVal = BigInteger("814"),
                                factor = BigInteger("48271"),
                                multipleOf = BigInteger("8"))

    var sameLowestSixteenBits = 0
    for (i in 0..5000000) {
        if(generator1.getNextVal() % twoHighSixteen == generator2.getNextVal() % twoHighSixteen) {
            sameLowestSixteenBits++
        }
    }

    println(sameLowestSixteenBits)
}
