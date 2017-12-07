function calcJumps(input){
  var inputs = input.split(" ").map(function(val){return parseInt(val)});
  var index = 0;
  var steps = 0;
  var increment = 0;
  
  while(index > -1 && index < inputs.length){
    increment = inputs[index];
    inputs[index]++;
    
    index += increment;
    
    steps++;
  }
  return steps;
}
