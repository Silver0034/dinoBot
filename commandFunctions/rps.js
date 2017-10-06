//rps
const rpsArray = ['rock', 'paper', 'scissors'];

exports.generate = function() {
  var rpsChoice = Math.floor((Math.random() * rpsArray.length));
  return rpsArray[rpsChoice];    
}                  