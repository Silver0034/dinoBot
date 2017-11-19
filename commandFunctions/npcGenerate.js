//NameGen.j
//possible npc races
var npcDictionary = new Object();
npcDictionary['human'] = {
  maleOne: [
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
  ],
  maleTwo: [
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
  ],
  maleThree: [
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
  ],
  femaleOne: [
    "",
    "",
    "",
    "",
    "a",
    "bi",
    "di",
    "el",
    "fi",
    "jo",
    "ki",
    "la",
    "mo",
    "no",
    "o",
    "po",
    "ro",
    "si",
    "ti",
    "vi"
  ],
  femaleTwo: [
    "or",
    "ph",
    "fr",
    "lv",
    "m",
    "rl",
    "sh",
    "se",
    "in",
    "et",
    "te",
    "n",
    "ll",
    "li",
    "ri",
    "ss",
    "ea",
    "el",
    "or",
    "ic"
  ],
  femaleThree: [
    "a",
    "ia",
    "thia",
    "ego",
    "da",
    "ene",
    "ih",
    "ith",
    "hi",
    "ni",
    "mi",
    "en",
    "thi",
    "th",
    "il",
    "la",
    "ra",
    "ett",
    "ss",
    "y"
  ],
  bonds: [
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
    'revenge'
  ],
}
npcDictionary['elf'] = {
  maleOne: [
    "",
    "",
    "",
    "Om",
    "Oli",
    "Elu",
    "Eu",
    "Ge",
    "Vi",
    "The",
    "Qu",
    "Er",
    "Ad",
    "Pa",
    "Ke",
    "Il",
    "Ye",
    "Fa",
    "Be",
    "Al"
  ],
  maleTwo: [
    "rk",
    "rh",
    "um",
    "yn",
    "in",
    "iun",
    "epe",
    "rhi",
    "aya",
    "nie",
    "rp",
    "rf",
    "rn",
    "ge",
    "lv",
    "nei",
    "rr",
    "zei",
    "ll",
    "np"
  ],
  maleThree: [
    "en",
    "ed",
    "idor",
    "olen",
    "amin",
    "inal",
    "etor",
    "ein",
    "iros",
    "eran",
    "aer",
    "eros",
    "ice",
    "alur",
    "aek",
    "is",
    "ic",
    "lor",
    "an",
    "umal"
  ],
  femaleOne: [
    "ra",
    "yll",
    "or",
    "zi",
    "ph",
    "sh",
    "fa",
    "cai",
    "ara",
    "air",
    "ell",
    "yin",
    "lu",
    "gly",
    "lu",
    "fe",
    "val",
    "adq",
    "",
    ""
  ],
  femaleTwo: [
    "el",
    "ro",
    "ire",
    "iro",
    "al",
    "var",
    "aly",
    "va",
    "gwyn",
    "ill",
    "lyn",
    "afi",
    "ewen",
    "oi",
    "sal",
    "yre",
    "ynor",
    "mias",
    "ra",
    "itha"
  ],
  femaleThree: [
    "yre",
    "satr",
    "ana",
    "na",
    "ra",
    "nys",
    "ra",
    "sys",
    "oara",
    "yien",
    "atra",
    "ice",
    "ala",
    "ndi",
    "yre",
    "oris",
    "lra",
    "edi",
    "di",
    "ina"
  ],
  bonds: [
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
    'revenge'
  ],
}
npcDictionary['arakocra'] = {
  maleOne: [
    "",
    "",
    "",
    "ce",
    "ge",
    "qi",
    "khu",
    "ar",
    "ir",
    "se",
    "cru",
    "kl",
    "rou",
    "el",
    "cu",
    "al",
    "ud",
    "qu",
    "uc",
    "gr"
  ],
  maleTwo: [
    "l",
    "d",
    "us",
    "ig",
    "ier",
    "qa",
    "lil",
    "rri",
    "eh",
    "hed",
    "kka",
    "ere",
    "eec",
    "rer",
    "r",
    "g",
    "ick",
    "qrk",
    "kch",
    "raeq"
  ],
  maleThree: [
    "ic",
    "it",
    "irk",
    "ik",
    "ed",
    "hk",
    "hck",
    "ich",
    "ilk",
    "aark",
    "aerch",
    "et",
    "aeg",
    "cirk",
    "rrk",
    "er",
    "ack",
    "eec",
    "uli",
    "ike"
  ],
  femaleOne: [
    "",
    "",
    "",
    "cei",
    "gei",
    "qi",
    "khu",
    "ari",
    "irai",
    "se",
    "cru",
    "klai",
    "rou",
    "elie",
    "cu",
    "alei",
    "udy",
    "qui",
    "uc",
    "gri"
  ],
  femaleTwo: [
    "l",
    "d",
    "us",
    "ig",
    "ier",
    "qa",
    "lil",
    "rri",
    "eh",
    "hed",
    "kka",
    "ere",
    "eec",
    "rer",
    "r",
    "g",
    "ick",
    "qrk",
    "kch",
    "raeq"
  ],
  femaleThree: [
    "ica",
    "ita",
    "irki",
    "ike",
    "ed",
    "hk",
    "hck",
    "ich",
    "ilks",
    "airk",
    "aerci",
    "etchi",
    "aeg",
    "cirk",
    "rrk",
    "er",
    "ack",
    "eeci",
    "uli",
    "ike"
  ],
  bonds: [
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
    'revenge'
  ],
}
npcDictionary['dwarf'] = {
  maleOne: [
    "",
    "",
    "",
    "dae",
    "bae",
    "gra",
    "ad",
    "dul",
    "bar",
    "bra",
    "tha",
    "hja",
    "rag",
    "ad",
    "bro",
    "ger",
    "mel",
    "kro",
    "bru",
    "tho"
  ],
  maleTwo: [
    "nik",
    "do",
    "ral",
    "rm",
    "mk",
    "nm",
    "lr",
    "mm",
    "ln",
    "dn",
    "mkah",
    "orm",
    "ggr",
    "lr",
    "md",
    "rk",
    "oru",
    "yd",
    "gn",
    "ru"
  ],
  maleThree: [
    "an",
    "or",
    "uhr",
    "ron",
    "im",
    "om",
    "on",
    "am",
    "um",
    "us",
    "urch",
    "rim",
    "dus",
    "yl",
    "mmor",
    "adin",
    "myr",
    "myl",
    "rom",
    "rig"
  ],
  femaleOne: [
    "bry",
    "ru",
    "bri",
    "bro",
    "ls",
    "taz",
    "na",
    "be",
    "gra",
    "ger",
    "lys",
    "lyr",
    "rae",
    "fe",
    "fa",
    "phe",
    "",
    "",
    "",
    ""
  ],
  femaleTwo: [
    "nm",
    "ss",
    "nn",
    "zd",
    "ryn",
    "rly",
    "zber",
    "ald",
    "rn",
    "ln",
    "ry",
    "sr",
    "ea",
    "aer",
    "nd",
    "ll",
    "nl",
    "sryl",
    "ll",
    "en"
  ],
  femaleThree: [
    "va",
    "in",
    "ma",
    "yl",
    "ille",
    "el",
    "il",
    "yl",
    "yla",
    "nas",
    "eil",
    "iayn",
    "as",
    "ar",
    "ris",
    "aen",
    "ian",
    "nora",
    "van",
    "tva"
  ],
  bonds: [
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
    'revenge'
  ],
}


//possible npc classes
var npcClass = new Object();
npcClass['swashbuckler'] = {
  armorClass: '17 (leather armor)',
  hitPoints: '66 (12d8 + 12)',
  speed: '30 ft.',
  str: '12 (+1)',
  dex: '18 (+4)',
  con: '12 (+1)',
  int: '14 (+2)',
  wis: '11 (+0)',
  cha: '15 (+2)',
  quickInfo: '*Skills* Acrobatics +8, Athletics +5, Persuasion +6\n*Senses* Passive Perception 10\n*Languages* Any one language (usually Common)\n*Challenge* 3 (700 XP)',
  prof: '*Lightfooted.* The swashbuckler can take the Dash or Disengage action as a bonus action on each of its turns.\n*Suave Defense.* While the swashbuckler is wearing light or no armor and wielding no shield, its AC includes its Charisma modifier.',
  actions: '*Multiattack.* The swashbuckler makes three attacks: one with a dagger and two with its rapier.\n*Dagger.* *Melee* or *Ranged Weapon Attack:* +6 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 6 (1d4 + 4) piercing damage.\n*Rapier.* *Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 8 (1d8 + 4) piercing damage.'
};

//create a list of all supported races
function raceList() {
  var raceList = new Array();
  for (var keyIter in npcDictionary) {
    raceList.push(keyIter);
  }
  return raceList;
}

//return string of supported races
exports.raceList = function() {
  return '```' + raceList().sort().toString().replace(/,/g, ", ") + '```';
}

//returns array of supported races
exports.array = function() {
  return raceList();
}

//return name for male
exports.nameMale = function(race) {
  var nameReturn = '';
  //pick name part 1
  var nameFirst = Math.floor((Math.random() * npcDictionary[race].maleOne.length));
  //add name part one to return
  nameReturn += npcDictionary[race].maleOne[nameFirst];
  //pick name part 2
  var nameSecond = Math.floor((Math.random() * npcDictionary[race].maleTwo.length)); 
  //add name part 2 to return
  nameReturn += npcDictionary[race].maleTwo[nameSecond]; 
  //pick name part 3
  var nameThird = Math.floor((Math.random() * npcDictionary[race].maleThree.length));
  //add name part 3 to return
  nameReturn += npcDictionary[race].maleThree[nameThird]; 
  //return name
  return nameReturn.charAt(0).toUpperCase() + nameReturn.slice(1);
}

//return name for female
exports.nameFemale = function(race) {
  var nameReturn = '';
  //pick name part 1
  var nameFirst = Math.floor((Math.random() * npcDictionary[race].femaleOne.length));
  //add name part one to return
  nameReturn += npcDictionary[race].femaleOne[nameFirst];
  //pick name part 2
  var nameSecond = Math.floor((Math.random() * npcDictionary[race].femaleTwo.length)); 
  //add name part 2 to return
  nameReturn += npcDictionary[race].femaleTwo[nameSecond]; 
  //pick name part 3
  var nameThird = Math.floor((Math.random() * npcDictionary[race].femaleThree.length));
  //add name part 3 to return
  nameReturn += npcDictionary[race].femaleThree[nameThird]; 
  //return name
  return nameReturn.charAt(0).toUpperCase() + nameReturn.slice(1); 
}

//create a list of all supported classes
function classList() {
  var classList = new Array();
  for (var keyIter in npcClass) {
    classList.push(keyIter);
  }
  return classList;
}

//return string of supported classes
exports.classList = function() {
  return '```' + classList().sort().toString().replace(/,/g, ", ") + '```';
}

//returns array of supported classes
exports.classArray = function() {
  return classList();
}

exports.classInfo = function(classArgument) {
  var classInfo = [];
  console.log('---////   ' + classArgument);
  classInfo[0] = npcClass[classArgument].armorClass;
  classInfo[1] = npcClass[classArgument].hitPoints;
  classInfo[2] = npcClass[classArgument].speed;
  classInfo[3] = npcClass[classArgument].str;
  classInfo[4] = npcClass[classArgument].dex;
  classInfo[5] = npcClass[classArgument].con;
  classInfo[6] = npcClass[classArgument].int;
  classInfo[7] = npcClass[classArgument].wis;
  classInfo[8] = npcClass[classArgument].cha;
  classInfo[9] = npcClass[classArgument].quickInfo;
  classInfo[10] = npcClass[classArgument].prof;
  classInfo[11] = npcClass[classArgument].actions;
  return classInfo;
}