function reallocate(input){
  var currentValue = input.split(" ").map(function(val){return parseInt(val)});
  var history = [];
  var firstOccurence = 0;
  var secondOccurence = 0;
  
  function findPointOfDoubleOccurence(){
    while(history.indexOf(currentValue.join()) === -1){
      history.push(currentValue.join());
      var maxValue = currentValue.reduce(function(max, current){return max > current ? max : current;}, 0);
      var maxIndex = currentValue.indexOf(maxValue);
      currentValue[maxIndex] = 0;
      
      for(var i = 1; i < maxValue + 1; i++){
        var index = (maxIndex + i) % currentValue.length;
        currentValue[index]++;
      }
    } 
    
    return history.length;
  }
  
  
  firstOccurence = findPointOfDoubleOccurence();  
  history = history.slice(-1);
  secondOccurence = findPointOfDoubleOccurence();  
  
  return firstOccurence + ' ' + secondOccurence;
}
