import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

import org.apache.commons.collections.MapUtils;

public class RegisterJumper {

    public static void main(String[] args) {
        final List<String> input = getInput();
        
        List<Instruction> instructions = new LinkedList<Instruction>();
        Map<String, Integer> registers = new HashMap<String, Integer>();
        
        for (String instruction : input) {
            String[] vals = instruction.split(" ");
            Operation op = new Operation(vals[0], Action.fromString(vals[1]), Integer.parseInt(vals[2]));
            Condition cond = new Condition(vals[4], Check.fromString(vals[5]), Integer.parseInt(vals[6]));
            
            instructions.add(new Instruction(op, cond));
        }
        
//        V1
//        for(Instruction instruction : instructions){
//            instruction.execute(registers);
//        }
//        
//        System.out.println(Collections.max(registers.values()));    
        
        int max = 0;
        
        for(Instruction instruction : instructions){
            instruction.execute(registers);
            max = Math.max(max, Collections.max(registers.values()));
        }
        
        System.out.println(max);
    }

    private static List<String> getInput() {
        final List<String> input = new ArrayList<String>();
        final Scanner sc = new Scanner(System.in);

        while (true) {
            final String nextLine = sc.nextLine();
            if (nextLine.equals("")) {
                break;
            }
            input.add(nextLine);
        }
        return input;
    }
    
    public static class Instruction{
        private Operation    operation;
        private Condition    condition;

        public Instruction(Operation operation, Condition condition){
            this.operation = operation;
            this.condition = condition;
        }
        
        public void execute(Map<String, Integer> registers){
            if(condition.check(registers)){
                operation.execute(registers);
            }
        }
    }
    
    public enum Action{
        INC,
        DEC;
        
        public static Action fromString(String s){
            if(s.equals("inc")){
                return INC;
            } else if(s.equals("dec")){
                return DEC;
            }
            
            return null;
        }
    }
    
    public static class Operation{
        private String    register;
        private Action    action;
        private int    val;

        public Operation(String register, Action action, int val){
            this.register = register;
            this.action = action;
            this.val = val;
        }
        
        public void execute(Map<String, Integer> registers){
            Integer newValue = MapUtils.getInteger(registers, register, 0);
            if(action == Action.INC){
                newValue += val;
            } else {
                newValue -= val;
            }
            registers.put(register, newValue);
        }
    }
    
    public enum Check{
        GT,
        LT,
        GTEQ,
        LTEQ,
        EQ,
        NEQ;
        
        public static Check fromString(String s){
            if(s.equals(">")){
                return GT;
            } else if(s.equals("<")){
                return LT;
            } else if(s.equals(">=")){
                return GTEQ;
            } else if(s.equals("<=")){
                return LTEQ;
            } else if(s.equals("==")){
                return EQ;
            } else if(s.equals("!=")){
                return NEQ;
            }
            
            return null;
        }
    }
    
    public static class Condition{
        private String    register;
        private Check    check;
        private int    val;

        public Condition(String register, Check check, int val){
            this.register = register;
            this.check = check;
            this.val = val;
        }
        
        public boolean check(Map<String, Integer> registers){
            Integer value = MapUtils.getInteger(registers, register, 0);
            switch(check){
                case GT:
                    return value > val;
                case LT:
                    return value < val;
                case GTEQ:
                    return value >= val;
                case LTEQ:
                    return value <= val;
                case EQ:
                    return value == val;
                case NEQ:
                    return value != val;
                default:
                    return false;
            }
        }
    }

}
