private int processInput(String inp){
    int score = 0;
    int garbageChars = 0;
    Stack<Character> stack = new Stack<Character>();
    boolean isGarbage = false;
    
    for(int i = 0; i < inp.length(); i++){
        char currentChar = inp.charAt(i);
        
        if(currentChar == '!'){
            i++;
            continue;
        } else if(currentChar == '>'){
            isGarbage = false;
        }
        
        if(!isGarbage){
            if(currentChar == '<'){
                isGarbage = true;
            } else if(currentChar == '{'){
                stack.push(currentChar);
            } else if(currentChar == '}'){
                score += stack.size();
                stack.pop();
            } 
        } else {
            garbageChars++;
        }
    }
    
    System.out.println(garbageChars);
    
    return score;
}
