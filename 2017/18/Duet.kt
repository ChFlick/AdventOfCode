import java.util.*

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
    val vm1 = InstructionExecutor(0)
    val vm2 = InstructionExecutor(1)

    while (!vm1.locked || !vm2.locked){
        vm1.execute(instructions[vm1.instructionPointer])
        vm2.execute(instructions[vm2.instructionPointer])

        if(vm1.outputVal != 0L) {
            vm2.inputQueue.add(vm1.outputVal)
            vm1.outputVal = 0L
        }
        if(vm2.outputVal != 0L){
            vm1.inputQueue.add(vm2.outputVal)
            vm2.outputVal = 0L
        }

    }

    print(vm2.timesSend)
}

class InstructionExecutor(registerNumber: Int) {
    private val registers = mutableMapOf<String, Long>()
    var instructionPointer = 0
    val inputQueue = ArrayDeque<Long>()
    var outputVal = 0L
    var timesSend = 0
    var locked: Boolean = false

    init {
        registers["p"] = registerNumber.toLong()
    }

    fun execute(operation: String) {
        val firstVal = operation.substring(4,5)
        val secondVal =  if(operation.length > 5) operation.substring(6)
        else ""
        when(operation.substring(0, 3)){
            "add" -> add(firstVal, secondVal)
            "mul" -> mul(firstVal, secondVal)
            "mod" -> mod(firstVal, secondVal)
            "set" -> set(firstVal, secondVal)
            "snd" -> snd(firstVal)
            "rcv" -> {
                if(!rcv(firstVal)) {
                    return
                }
            }
            "jgz" -> {
                val jmp = jgz(firstVal, secondVal)
                if(jmp != 0L){
                    instructionPointer += jmp.toInt()
                    return
                }
            }
        }

        instructionPointer++
    }

    private fun add(firstVal: String, secondVal: String){
        registers[firstVal] = getValue(firstVal) + getValue(secondVal)
    }

    private fun mul(firstVal: String, secondVal: String){
        registers[firstVal] = getValue(firstVal) * getValue(secondVal)
    }

    private fun set(firstVal: String, secondVal: String){
        registers[firstVal] = getValue(secondVal)
    }

    private fun mod(firstVal: String, secondVal: String){
        registers[firstVal] = getValue(firstVal) % getValue(secondVal)
    }

    private fun snd(firstVal: String){
        if(getValue(firstVal) != 0L){
            outputVal = getValue(firstVal)
            timesSend++
        }
    }

    private fun rcv(firstVal: String) : Boolean = when(inputQueue.isEmpty()){
        true ->  {
            locked = true
            false
        }
        false -> {
            locked = false
            registers[firstVal] = inputQueue.pop()
            true
        }
    }

    private fun jgz(firstVal: String, secondVal: String): Long{
        if(getValue(firstVal) > 0L){
            return getValue(secondVal)
        }

        return 0L
    }


    private fun getValue(value: String): Long =
        if(value.toLongOrNull() != null) value.toLong()
                                   else registers.getOrDefault(value, 0L)

}

