// roar
//var exports = module.exports = {};
var roarArray = [
    "err",
    "err?",
    "errr",
    "errr?",
    "gaar",
    "gaaar",
    "gaarr",
    "gar.",
    "¿gar?",
    "gerr",
    "Graawr",
    "grawr",
    "groooawr", 
    "grr", 
    "grr?", 
    "grreer", 
    "raa.", 
    "raaawr", 
    "raaAWWWR", 
    "rar", 
    "rawr", 
    "Rawr", 
    "ROAR!!!", 
    "roar!", 
    "ROAR", 
    "Roar", 
    "roar", 
    "roar.", 
    "roawoor", 
    "rooar", 
    "rrr", 
    "rwaaor", 
    "Rwoar", 
    "¿Rawr?",
];
var rareRoarArray = [
    "¡ɹɐoɹ",
    ":sleeping: roooowaar",
    "raa :innocent:",
    "oowr :flushed:",
    "Aaaaahrr! :scream:",
    "rar :selfie:",
    "roooooooaaar :heart_eyes:",
    ":rar:",
    ":thinking: rawr roar raaawr :joy:",
    "groaw? :stuck_out_tongue_winking_eye:",
    "ehh, roar...",
    "... roar"
];
exports.generate = function() {
  //decide if it gives a standard roar or rare roar
  var roarRarity = Math.random();
  if (roarRarity < 0.03) {
    var rareRoarNum = Math.floor((Math.random () * rareRoarArray.length));
    return rareRoarArray[rareRoarNum];    
  } else {
    var roarNum = Math.floor((Math.random() * roarArray.length));
    return roarArray[roarNum];
  }
}