// rpg
//var exports = module.exports = {};
 var nameBeginning = [
  "",
	"",
	"",
	"",
	"a",
	"be",
	"de",
	"el",
	"fa",
	"jo",
	"ki",
	"la",
	"ma",
	"na",
	"o",
	"pa",
	"re",
	"si",
	"ta",
	"va"
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
exports.name = function() {
	var nameReturn = '';
  //decide which answer to give
  var nameFirst = Math.floor((Math.random() * nameBeginning.length));   
  nameReturn += nameBeginning[nameFirst];    
	var nameSecond = Math.floor((Math.random() * nameMiddle.length));   
  nameReturn += nameMiddle[nameSecond]; 
	var nameThird = Math.floor((Math.random() * nameEnd.length));   
  nameReturn += nameEnd[nameThird]; 
	return nameReturn.charAt(0).toUpperCase() + nameReturn.slice(1);
}