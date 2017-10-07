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
	'slurs words',
	'lisps', 
	'stutters',
	'speaks loudly',
	'whispers',
	'squints',
	'stares into distance',
	'is suspicious',
	'uses colorful oaths and exclamations',
	'uses flowery speech',
	'uses long words',
];
exports.characteristics = function() {
  //decide which answer to give
  var characteristicReturn = Math.floor((Math.random() * rpgCharacteristics.length));   
  return rpgCharacteristics[characteristicReturn];    
}
var rpgBonds = [
	'personal goals',
	'achievements',
	'family members',
	'colleagues',
	'compatriots',
	'a benefactor',
	'a patron',
	'an employer',
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

var rpgConditions = new Object();
rpgConditions['blinded'] = {
  desc: 'A blinded creature can\'t see and automatically fails any ability check that requires sight\nAttack rolls against the creature have advantage, and the creature\'s attack rolls have disadvantage.'
};
rpgConditions['charmed'] = {
  desc: 'A charmed creature can\'t attack the charmer or target the charmer with harmful abilities or magical effects.\n The charmer has advantage on any ability check to interact socially with the creature.'
};
rpgConditions['deafened'] = {
  desc: 'A deafened creature can\'t hear and automatically fails any check that requires hearing.'
};
rpgConditions['exhaustion'] = {
   desc: 'Some abilities and enviromental hazards, such as starvation and the effects of freezing or scorching temperatures, can lead to a special condition called exhaustion. An effect can give a creature one or more levels of exhaustion.\n\nLevel 1: Disadvantage on ability checks\nLevel 2: Speed halved\nLevel 3: Disadvantage on attack rolls and saving throws\nLevel 4: Hit point maximum halved\nLevel 5: Speed reduced to 0\nLevel 6: Death\n\nIf an already exhausted creature suffers another effect that causes exhaustion, its current level of exhaustion increases by the amount specified in the effect\'s descripition.\nA creature suffers the effect of its current level of exhaustion as well as all lower levels.\nAn effect that removes exhaustion reduces its level as specified in the effect\'s description, while effects end if a creature\'s exhaustion level is reduced below 1.\nFinishing a long rest reduces a creature\'s exhaustion level by 1, provided that the creature has also eaten and had drink.'
};
rpgConditions['frightened'] = {
  desc: 'A frightened creature has disadvantage on ability checks and attack rolls whil the source of its fear is within line of sight.\nThe creature can\'t willingly move closer to the source of its fear.'
};
rpgConditions['grappled'] = {
  desc: 'A grappled creature\'s speed becomes 0, and it can\'t benefit from any bonus to its speed.\nThe condition ends if hte grappler is incapacitated (see the condition).\nThe condition also ends if an efefct removes the grappled creature from the reach of the grappler or grappling effect, such as when a creature is hurled away by the *thunderwave* spell.'
};
rpgConditions['incapacitated'] = {
	desc: 'An incapacitated creature can\'t take actions or reactions.'
};
rpgConditions['invisible'] = {
  desc: 'An invisible creature is impossible to see without the aid of magic or a special sense. For the purpose of hiding, the creature is heavily obscured. The creature\'s location can be detected by any noise it makes or any tracks it leaves.\nAttack rolls against the creature have disadvantage, and the creature\'s attack rolls have advantage.'
};
rpgConditions['paralyzed'] = {
  desc: 'A paralyzed creature is incapacitated (see the condition) and can\'t move or speak.\nThe creature automatically fails Strength and Dexterity saving thros.\nAttack rolls against the creature have advantage.\nAny attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature.'
};
rpgConditions['petrified'] = {
  desc: 'A petrified creature is transformed, along with any nonmagical object it is wearing or carrying, into a solid inanimate substance (usually stone). Its weight increases by a factor of ten, and it ceases agin.\nThe creature is incapacitated (see the condition), can\'t move or speak, and it unaware of its surroundings.\nAttack rolls against the creature have advantage.\nThe creature automatically fails Strength and Dexterity saving throws.\nThe creature has resitance to all damage.\nThe creature is immune to poison and disease although a poison or disease already in its system is suspended, not neutralized.'
};
rpgConditions['poisoned'] = {
  desc: 'A poisoned creature has disadvantage on attack rolls and ability checks.'
};
rpgConditions['prone'] = {
  desc: 'A restrained creature\'s speed becomes 0, and it can\'t benefit from any bonus to its speed.\nAttack rolls against the creature have advantage, and the creature\'s attack rolls have disadvantage.\nThe creature has disadvantage on Dexterity saving throws.'
};
rpgConditions['stunned'] = {
  desc: 'A stunned creature is incapacitated (see the condition), can\'t move, and can speak only falteringly.\nThe creature automatically fails Strength and Dexterity saving throws.\nAttack rolls against the creature have advantage.'
};
rpgConditions['unconscious'] = {
  desc: 'An unconscious creature is **incapacitated**, can\'t move or speak, and is unaware of its surroundings.\nThe creature drops whatever it\'s holding and falls prone.\nThe creature automatically fails Strength and Dexterity saving throws.\nAttack rolls against the creature have advantage.\nAny attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature.'
};
exports.conditionList = function() {
	var rpgConditionsList = new Array();
	for (var keyIter in rpgConditions) {
		rpgConditionsList.push(keyIter);
  }
	var rpgConditionsReturn = rpgConditionsList.sort().toString().replace(/,/g, ", ");
	return rpgConditionsReturn;
}
exports.rpgConditions= rpgConditions;