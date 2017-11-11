//NameGen.j

var name = new Object();
name['human'] = {
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
    "nn",
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
}

exports.generate = function(message, key, args) {
  var nameReturn = '';
  
  if (name[args[0]].maleOne == null || name[args[0]].maleOne == undefined) {
    return 'Please specify a valid race';
  }
  
  if (args[1] == 'female') {
    //if female
    //pick name part 1
    var nameFirst = Math.floor((Math.random() * name[args[0]].maleOne.length));
    //add name part one to return
    nameReturn += nameFirst;    
    //pick name part 2
	  var nameSecond = Math.floor((Math.random() * name[args[0]].maleTwo.length)); 
    //add name part 2 to return
    nameReturn += nameSecond; 
    //pick name part 3
    var nameThird = Math.floor((Math.random() * name[args[0]].maleThree.length));
    //add name part 3 to return
    nameReturn += nameThird; 
    //return name
	  return nameReturn.charAt(0).toUpperCase() + nameReturn.slice(1);
    
  } else if(args[1] == 'male' || args == undefined || args == null) {
    //if male or not specified
    //pick name part 1
    var nameFirst = Math.floor((Math.random() * name[args[0]].maleOne.length));
    //add name part one to return
    nameReturn += nameFirst;    
    //pick name part 2
	  var nameSecond = Math.floor((Math.random() * name[args[0]].maleTwo.length)); 
    //add name part 2 to return
    nameReturn += nameSecond; 
    //pick name part 3
    var nameThird = Math.floor((Math.random() * name[args[0]].maleThree.length));
    //add name part 3 to return
    nameReturn += nameThird; 
    //return name
	  return nameReturn.charAt(0).toUpperCase() + nameReturn.slice(1);
  } else {
    //return error if not male, female, or empty
    console.log(args);
    return 'Please specify either male, female, or leave blank';
  }
  
}