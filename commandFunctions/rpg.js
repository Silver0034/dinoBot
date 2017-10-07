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
];
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
];
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
];
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
var rpgCharacteristics = [
	'is absentminded',
	'is arrogant',
	'is boorish',
	'chews something',
	'is clumsy',
	'is curious',
	'is dim-witted',
	'fiddles and fidgets nervously',
	'frequently uses the wrong word',
	'is friendly',
	'is irritable',
	'is prone to predictions of certain doom',
	'has a pronounced-scar',
	'slurs words, lisps, or stutters',
	'speaks loudly or whispers',
	'squints',
	'stares into distance',
	'is suspicious',
	'uses colorful oaths and exclamations',
	'uses flowery speech or long words'
];
exports.characteristics = function() {
  //decide which answer to give
  var characteristicReturn = Math.floor((Math.random() * rpgCharacteristics.length));   
  return rpgCharacteristics[characteristicReturn];    
}
var rpgBonds = [
	'personal goals or achievements',
	'family members',
	'colleagues or compatriots',
	'a benefactor, patron, or employer',
	'a romantic interest',
	'a special place',
	'a keepsake',
	'a valuable posession',
	'revenge',
];
exports.bonds = function() {
  //decide which answer to give
  var bondsReturn = Math.floor((Math.random() * rpgBonds.length));   
  return rpgBonds[bondsReturn];    
}
var rpgFlaws = [
	'forbidden love or romantic susceptibility',
	'decadence',
	'arrogance',
	'envy of another person\'s possessions or station',
	'overpowering greed',
	'being prone to rage',
	'a powerful enemy',
	'a specific phobia',
	'a shameful or scandalous history',
	'a secret crime or misdeed',
	'a possession of forbidden lore',
	'foolhearted bravery'
];
exports.flaws = function() {
  //decide which answer to give
  var flawsReturn = Math.floor((Math.random() * rpgFlaws.length));   
  return rpgFlaws[flawsReturn];    
}