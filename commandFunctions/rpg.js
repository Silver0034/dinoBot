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
	'forbidden love',
	'romantic susceptibility',
	'decadence',
	'arrogance',
	'envy of another person\'s possessions',
	'envy of another person\'s station',
	'overpowering greed',
	'rage',
	'a powerful enemy',
	'a specific phobia',
	'a shameful history',
	'a scandalous history',
	'a secret crime',
	'a secret misdeed',
	'a possession of forbidden lore',
	'foolhearted bravery'
];
exports.flaws = function() {
  //decide which answer to give
  var flawsReturn = Math.floor((Math.random() * rpgFlaws.length));   
  return rpgFlaws[flawsReturn];    
}
var rpgFlavor = [
	'a shady-looking character',
	'a goofy fellow',
	'an oddball',
	'a clumsy fellow',
	'a strong fellow',
	'a mysterious stranger',
	'a bored-looking affiliate',
	'a rather tough looking character',
	'an unmet friend',
	'a sad-looking peer',
	'a seemingly oblivious crony',
	'an old folk',
	'an elderly stranger',
	'a young character',
	'a chummy fellow',
	'a half-pint',
	'a squirt of a character',
	'a runt',
	'a child',
	'a small fry',
	'a big fellow',
	'a tall fellow',
	'a slender fellow',
	'a wide fellow',
	'a big-boned character',
	'a plus-sized model',
	'a heavyset fellow',
	'a hearty fellow',
	'a thin character',
	'an odd character',
	'a rather dark figure'
];
exports.flavor = function() {
  //decide which answer to give
  var flavorReturn = Math.floor((Math.random() * rpgFlavor.length));   
  return rpgFlavor[flavorReturn];    
}