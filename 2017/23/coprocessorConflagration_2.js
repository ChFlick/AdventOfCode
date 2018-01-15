function g(){
    var b = 67;
    var c = 67;
    var d = 0;
    var e = 0;
    var f = false;
    var h = 0;
    
    b = b * 100 + 100000;
    c = b + 17000;
    
    outer:
    for(var counter = b; counter <= c; counter += 17){
        f = false;

        for (var d = 2; d <= counter; d++){ 
            for(var e = 2; d * e <= counter; e++){
                if(d * e == counter){
                    h++;
                    continue outer;
                }
            }
        }
    }
    
    return h;
}
