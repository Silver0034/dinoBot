// roarGenerator
//var exports = module.exports = {};
 var ballAnswers = [
  ":large_blue_circle: It is certain",
  ":large_blue_circle: It is decidedly so",
  ":large_blue_circle: Without a doubt",
  ":large_blue_circle: Yes definitely",
  ":large_blue_circle: You may rely on it",
  ":large_blue_circle: As I see it, Yes",
  ":large_blue_circle: Most likely",
  ":large_blue_circle: Outlook good",
  ":large_blue_circle: Yes",
  ":large_blue_circle: Signs point to yes",
  ":large_orange_diamond: Reply hazy try again",
  ":large_orange_diamond: Ask again later",
  ":large_orange_diamond: Better not tell you now",
  ":large_orange_diamond: Cannot predict now",
  ":large_orange_diamond: Concentrate and ask again",
  ":red_circle: Don't count on it",
  ":red_circle: My reply is no",
  ":red_circle: My sources say no",
  ":red_circle: Outlook not so good",
  ":red_circle: Very doubtful"
]

exports.generate = function() {
  //decide which answer to give
  var ballNum = Math.floor((Math.random() * ballAnswers.length));   
  return ballAnswers[ballNum];    
}