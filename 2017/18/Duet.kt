fun main(args: Array<String>) {
    val input = """set i 31
set a 1
mul p 17
jgz p p
mul a 2
add i -1
jgz i -2
add a -1
set i 127
set p 826
mul p 8505
mod p a
mul p 129749
add p 12345
mod p a
set b p
mod b 10000
snd b
add i -1
jgz i -9
jgz a 3
rcv b
jgz b -1
set f 0
set i 126
rcv a
rcv b
set p a
mul p -1
add p b
jgz p 4
snd a
set a b
jgz 1 3
snd b
set f 1
add i -1
jgz i -11
snd a
jgz f -16
jgz a -19
"""

    val instructions = input.split('\n')
    val executor = InstructionExecutor()
    var i = 0

    loop@ while (true){
        val current = instructions[i]
        val firstVal = current.substring(4,5)
        val secondVal =  if(current.length > 5) current.substring(6)
                                                else ""
        when(current.substring(0, 3)){
            "add" -> executor.add(firstVal, secondVal)
            "mul" -> executor.mul(firstVal, secondVal)
            "mod" -> executor.mod(firstVal, secondVal)
            "set" -> executor.set(firstVal, secondVal)
            "snd" -> executor.snd(firstVal)
            "rcv" -> {
              if(executor.rcv(firstVal)) {
                  println(executor.lastSound)
                  break@loop
              }
            }
            "jgz" -> {
                val jmp = executor.jgz(firstVal, secondVal)
                if(jmp != 0L){
                    i += jmp.toInt()
                    continue@loop
                }
            }
        }

        i++
    }
}

class InstructionExecutor {
    val registers = mutableMapOf<String, Long>()
    var lastSound = 0L

    fun add(firstVal: String, secondVal: String){
        registers[firstVal] = getValue(firstVal) + getValue(secondVal)
    }

    fun mul(firstVal: String, secondVal: String){
        registers[firstVal] = getValue(firstVal) * getValue(secondVal)
    }

    fun set(firstVal: String, secondVal: String){
        registers[firstVal] = getValue(secondVal)
    }

    fun mod(firstVal: String, secondVal: String){
        registers[firstVal] = getValue(firstVal) % getValue(secondVal)
    }

    fun snd(firstVal: String){
        if(getValue(firstVal) != 0L){
            lastSound = getValue(firstVal)
        }
    }

    fun rcv(firstVal: String): Boolean = getValue(firstVal) != 0L

    fun jgz(firstVal: String, secondVal: String): Long{
        if(getValue(firstVal) > 0){
            return getValue(secondVal)
        }

        return 0
    }


    private fun getValue(value: String): Long =
        if(value.toIntOrNull() != null) value.toLong()
                                   else registers.getOrDefault(value, 0)

}

