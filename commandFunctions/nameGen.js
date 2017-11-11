//NameGen.j

var nameDictionary = new Object();
nameDictionary['human'] = {
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
  ]
};
nameDictionary['elf'] = {
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
  ]
};

exports.list = function() {
  var raceList = new Array();
    	for (var keyIter in nameDictionary) {
      	raceList.push(keyIter);
      }
      return '```' + raceList.sort().toString().replace(/,/g, ", ") + '```';
}

exports.generate = function(message, key, args) {
  var nameReturn = '';
  
  if (nameDictionary[args[0]].maleOne == null || nameDictionary[args[0]].maleOne == undefined) {
    return 'Please specify a valid race';
  }
  
  if (args[1] == 'female') {
    //if female
    //pick name part 1
    var nameFirst = Math.floor((Math.random() * nameDictionary[args[0]].femaleOne.length));
    //add name part one to return
    nameReturn += nameDictionary[args[0]].femaleOne[nameFirst];
    
    //pick name part 2
	  var nameSecond = Math.floor((Math.random() * nameDictionary[args[0]].femaleTwo.length)); 
    //add name part 2 to return
    nameReturn += nameDictionary[args[0]].femaleTwo[nameSecond]; 
    //pick name part 3
    var nameThird = Math.floor((Math.random() * nameDictionary[args[0]].femaleThree.length));
    //add name part 3 to return
    nameReturn += nameDictionary[args[0]].femaleThree[nameThird]; 
    //return name
	  return nameReturn.charAt(0).toUpperCase() + nameReturn.slice(1);
    
  } else {
    //if male or not specified
   //pick name part 1
    var nameFirst = Math.floor((Math.random() * nameDictionary[args[0]].maleOne.length));
    //add name part one to return
    nameReturn += nameDictionary[args[0]].maleOne[nameFirst];
    
    //pick name part 2
	  var nameSecond = Math.floor((Math.random() * nameDictionary[args[0]].maleTwo.length)); 
    //add name part 2 to return
    nameReturn += nameDictionary[args[0]].maleTwo[nameSecond]; 
    //pick name part 3
    var nameThird = Math.floor((Math.random() * nameDictionary[args[0]].maleThree.length));
    //add name part 3 to return
    nameReturn += nameDictionary[args[0]].maleThree[nameThird]; 
    //return name
	  return nameReturn.charAt(0).toUpperCase() + nameReturn.slice(1);
  }
  
}