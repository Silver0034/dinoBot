// rpg
//var exports = module.exports = {};
 var nameBeginning = [
  "",
	"",
	"",
	"",
	"A",
	"Be",
	"De",
	"El",
	"Fa",
	"Jo",
	"Ki",
	"La",
	"Ma",
	"Na",
	"O",
	"Pa",
	"Re",
	"Si",
	"Ta",
	"Va"
]
var nameMiddle = [
	"bar",
	"ched",
	"dell",
	"far",
	"gran",
	"hal",
	"jen",
	"kel",
	"lim",
	"mor",
	"net",
	"penn",
	"quil",
	"rond",
	"sark",
	"shen",
	"tur",
	"vash",
	"yor",
	"zen"
]
var nameEnd = [
	"",
	"a",
	"ac",
	"ai",
	"al",
	"am",
	"an",
	"ar",
	"ea",
	"el",
	"er",
	"ess",
	"ett",
	"ic",
	"id",
	"il",
	"in",
	"is",
	"or",
	"us"
]
var nameReturn = '';
exports.name = function() {
  //decide which answer to give
  var nameFirst = Math.floor((Math.random() * nameBeginning.length));   
  nameReturn += nameBeginning[nameFirst];    
	var nameSecond = Math.floor((Math.random() * nameMiddle.length));   
  nameReturn += nameMiddle[nameSecond]; 
	var nameThird = Math.floor((Math.random() * nameEnd.length));   
  nameReturn += nameEnd[nameThird]; 
	return nameReturn;
}