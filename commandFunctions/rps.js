//rps
const RPSARRAY = ['rock', 'paper', 'scissors'];

exports.generate = function() {
	var rpsChoise =  Number;
  rpsChoice = Math.floor((Math.random() * RPSARRAY.length));
  return RPSARRAY[rpsChoice];    
}                  