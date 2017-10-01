//establish constants and dependencies
const Discord = require('discord.js');
const bot = new Discord.Client();
const mysql = require('mysql');
var tokenReturn = require('./token.js');
var roar = require('./commandFunctions/roar.js');
var ball = require('./commandFunctions/ball.js');
var attack = require('./commandFunctions/attack.js');
var quote = require('./commandFunctions/quote.js');
var taste = require('./commandFunctions/taste.js');
var profanity = require('./commandFunctions/profanity.js');
var cleanDictionary = require('./commandFunctions/cleanDictionary.js');
var languageResponse = require('./commandFunctions/languageResponse.js');

//establish global variables and constants
const TOKEN = tokenReturn.return();
const MYSQLCRED = tokenReturn.sqlCredentials;
var profanity = profanity.filter();
var profanityExceptions = cleanDictionary.filter();
//make sure to put a space after. Ex:':smile: '
const emojiDino = '<:sauropod:355738679211327488> ';
var timedOutUsers = new Array();
var con = mysql.createConnection(MYSQLCRED);

//global functions
function setUserTimeout(userID) {
  //put users userID in a timeout array
  timedOutUsers.push(userID);
  //automatically remove the user from timeout after a set delay
  setTimeout(function() {
    timedOutUsers.splice(timedOutUsers.indexOf(userID), 1);
  }, 4000);
}
function timeoutAlert(timeoutAlert) {
    //alert users to stop using commands
    //if they are in the timeout array
  return emojiDino + ' ' + roar.generate() + ' *(Slow down, you\'re scaring me!)*  :no_entry_sign:';
}
function timeout(key, userID) {
  if (commandDictionary[key].timeout === '1') {
    setUserTimeout(userID);    
  }
}
function error(key) {
  var errorMessage = emojiDino + ' ' + roar.generate() + ' ' + roar.generate() + ' *(There was an error)*  :no_entry_sign:' + '\n' + commandDictionary[key].error;
  console.log('[FAILED]');
  return errorMessage;
}
function responseHead(message, key, extraContent) { //extraContent is optional
    return emojiDino + commandDictionary[key].emoji + (extraContent || '') + '| **' + message.author.username + '** | ';
}
function getTime(date) {
  var time;
  
  if (date) time = date;
  else time = new Date();
  
  var hours   = time.getHours();
  var minutes = time.getMinutes();
  var seconds = time.getSeconds();
  
  return '[' + hours + ':' + minutes + ':' + seconds + ']';
}
function getDate(date) {
    var time;
    
    if (date) time = date;
    else time = new Date();
    
    var months = time.getMonth() + 1;
    var days = time.getDate();
    var years = time.getFullYear();
    
    return months + '/' + days + '/' + years;
}
var combineFirstLetters = function (letter, message) {
  var firstLetters = '';    
  for (var i = 0; i < letter.length; i += 1) {
    firstLetters += letter[i].charAt(0);
  }
  return firstLetters;    
}
var spaceCheck = function (messageCheck) {
  var combineSpaces = new Array;
  for (var i = 0; i < messageCheck.length - 1; i += 1) {
    combineSpaces[i] = '';
    combineSpaces[i] += messageCheck[i] + messageCheck[i+1];
  }
  return combineSpaces;    
}

//character latinization for for user input.
var Latinise={};Latinise.latin_map={"Á":"A","Ă":"A","Ắ":"A","Ặ":"A","Ằ":"A","Ẳ":"A","Ẵ":"A","Ǎ":"A","Â":"A","Ấ":"A","Ậ":"A","Ầ":"A","Ẩ":"A","Ẫ":"A","Ä":"A","Ǟ":"A","Ȧ":"A","Ǡ":"A","Ạ":"A","Ȁ":"A","À":"A","Ả":"A","Ȃ":"A","Ā":"A","Ą":"A","Å":"A","Ǻ":"A","Ḁ":"A","Ⱥ":"A","Ã":"A","Ꜳ":"AA","Æ":"AE","Ǽ":"AE","Ǣ":"AE","Ꜵ":"AO","Ꜷ":"AU","Ꜹ":"AV","Ꜻ":"AV","Ꜽ":"AY","Ḃ":"B","Ḅ":"B","Ɓ":"B","Ḇ":"B","Ƀ":"B","Ƃ":"B","Ć":"C","Č":"C","Ç":"C","Ḉ":"C","Ĉ":"C","Ċ":"C","Ƈ":"C","Ȼ":"C","Ď":"D","Ḑ":"D","Ḓ":"D","Ḋ":"D","Ḍ":"D","Ɗ":"D","Ḏ":"D","ǲ":"D","ǅ":"D","Đ":"D","Ƌ":"D","Ǳ":"DZ","Ǆ":"DZ","É":"E","Ĕ":"E","Ě":"E","Ȩ":"E","Ḝ":"E","Ê":"E","Ế":"E","Ệ":"E","Ề":"E","Ể":"E","Ễ":"E","Ḙ":"E","Ë":"E","Ė":"E","Ẹ":"E","Ȅ":"E","È":"E","Ẻ":"E","Ȇ":"E","Ē":"E","Ḗ":"E","Ḕ":"E","Ę":"E","Ɇ":"E","Ẽ":"E","Ḛ":"E","Ꝫ":"ET","Ḟ":"F","Ƒ":"F","Ǵ":"G","Ğ":"G","Ǧ":"G","Ģ":"G","Ĝ":"G","Ġ":"G","Ɠ":"G","Ḡ":"G","Ǥ":"G","Ḫ":"H","Ȟ":"H","Ḩ":"H","Ĥ":"H","Ⱨ":"H","Ḧ":"H","Ḣ":"H","Ḥ":"H","Ħ":"H","Í":"I","Ĭ":"I","Ǐ":"I","Î":"I","Ï":"I","Ḯ":"I","İ":"I","Ị":"I","Ȉ":"I","Ì":"I","Ỉ":"I","Ȋ":"I","Ī":"I","Į":"I","Ɨ":"I","Ĩ":"I","Ḭ":"I","Ꝺ":"D","Ꝼ":"F","Ᵹ":"G","Ꞃ":"R","Ꞅ":"S","Ꞇ":"T","Ꝭ":"IS","Ĵ":"J","Ɉ":"J","Ḱ":"K","Ǩ":"K","Ķ":"K","Ⱪ":"K","Ꝃ":"K","Ḳ":"K","Ƙ":"K","Ḵ":"K","Ꝁ":"K","Ꝅ":"K","Ĺ":"L","Ƚ":"L","Ľ":"L","Ļ":"L","Ḽ":"L","Ḷ":"L","Ḹ":"L","Ⱡ":"L","Ꝉ":"L","Ḻ":"L","Ŀ":"L","Ɫ":"L","ǈ":"L","Ł":"L","Ǉ":"LJ","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ɱ":"M","Ń":"N","Ň":"N","Ņ":"N","Ṋ":"N","Ṅ":"N","Ṇ":"N","Ǹ":"N","Ɲ":"N","Ṉ":"N","Ƞ":"N","ǋ":"N","Ñ":"N","Ǌ":"NJ","Ó":"O","Ŏ":"O","Ǒ":"O","Ô":"O","Ố":"O","Ộ":"O","Ồ":"O","Ổ":"O","Ỗ":"O","Ö":"O","Ȫ":"O","Ȯ":"O","Ȱ":"O","Ọ":"O","Ő":"O","Ȍ":"O","Ò":"O","Ỏ":"O","Ơ":"O","Ớ":"O","Ợ":"O","Ờ":"O","Ở":"O","Ỡ":"O","Ȏ":"O","Ꝋ":"O","Ꝍ":"O","Ō":"O","Ṓ":"O","Ṑ":"O","Ɵ":"O","Ǫ":"O","Ǭ":"O","Ø":"O","Ǿ":"O","Õ":"O","Ṍ":"O","Ṏ":"O","Ȭ":"O","Ƣ":"OI","Ꝏ":"OO","Ɛ":"E","Ɔ":"O","Ȣ":"OU","Ṕ":"P","Ṗ":"P","Ꝓ":"P","Ƥ":"P","Ꝕ":"P","Ᵽ":"P","Ꝑ":"P","Ꝙ":"Q","Ꝗ":"Q","Ŕ":"R","Ř":"R","Ŗ":"R","Ṙ":"R","Ṛ":"R","Ṝ":"R","Ȑ":"R","Ȓ":"R","Ṟ":"R","Ɍ":"R","Ɽ":"R","Ꜿ":"C","Ǝ":"E","Ś":"S","Ṥ":"S","Š":"S","Ṧ":"S","Ş":"S","Ŝ":"S","Ș":"S","Ṡ":"S","Ṣ":"S","Ṩ":"S","Ť":"T","Ţ":"T","Ṱ":"T","Ț":"T","Ⱦ":"T","Ṫ":"T","Ṭ":"T","Ƭ":"T","Ṯ":"T","Ʈ":"T","Ŧ":"T","Ɐ":"A","Ꞁ":"L","Ɯ":"M","Ʌ":"V","Ꜩ":"TZ","Ú":"U","Ŭ":"U","Ǔ":"U","Û":"U","Ṷ":"U","Ü":"U","Ǘ":"U","Ǚ":"U","Ǜ":"U","Ǖ":"U","Ṳ":"U","Ụ":"U","Ű":"U","Ȕ":"U","Ù":"U","Ủ":"U","Ư":"U","Ứ":"U","Ự":"U","Ừ":"U","Ử":"U","Ữ":"U","Ȗ":"U","Ū":"U","Ṻ":"U","Ų":"U","Ů":"U","Ũ":"U","Ṹ":"U","Ṵ":"U","Ꝟ":"V","Ṿ":"V","Ʋ":"V","Ṽ":"V","Ꝡ":"VY","Ẃ":"W","Ŵ":"W","Ẅ":"W","Ẇ":"W","Ẉ":"W","Ẁ":"W","Ⱳ":"W","Ẍ":"X","Ẋ":"X","Ý":"Y","Ŷ":"Y","Ÿ":"Y","Ẏ":"Y","Ỵ":"Y","Ỳ":"Y","Ƴ":"Y","Ỷ":"Y","Ỿ":"Y","Ȳ":"Y","Ɏ":"Y","Ỹ":"Y","Ź":"Z","Ž":"Z","Ẑ":"Z","Ⱬ":"Z","Ż":"Z","Ẓ":"Z","Ȥ":"Z","Ẕ":"Z","Ƶ":"Z","Ĳ":"IJ","Œ":"OE","ᴀ":"A","ᴁ":"AE","ʙ":"B","ᴃ":"B","ᴄ":"C","ᴅ":"D","ᴇ":"E","ꜰ":"F","ɢ":"G","ʛ":"G","ʜ":"H","ɪ":"I","ʁ":"R","ᴊ":"J","ᴋ":"K","ʟ":"L","ᴌ":"L","ᴍ":"M","ɴ":"N","ᴏ":"O","ɶ":"OE","ᴐ":"O","ᴕ":"OU","ᴘ":"P","ʀ":"R","ᴎ":"N","ᴙ":"R","ꜱ":"S","ᴛ":"T","ⱻ":"E","ᴚ":"R","ᴜ":"U","ᴠ":"V","ᴡ":"W","ʏ":"Y","ᴢ":"Z","á":"a","ă":"a","ắ":"a","ặ":"a","ằ":"a","ẳ":"a","ẵ":"a","ǎ":"a","â":"a","ấ":"a","ậ":"a","ầ":"a","ẩ":"a","ẫ":"a","ä":"a","ǟ":"a","ȧ":"a","ǡ":"a","ạ":"a","ȁ":"a","à":"a","ả":"a","ȃ":"a","ā":"a","ą":"a","ᶏ":"a","ẚ":"a","å":"a","ǻ":"a","ḁ":"a","ⱥ":"a","ã":"a","ꜳ":"aa","æ":"ae","ǽ":"ae","ǣ":"ae","ꜵ":"ao","ꜷ":"au","ꜹ":"av","ꜻ":"av","ꜽ":"ay","ḃ":"b","ḅ":"b","ɓ":"b","ḇ":"b","ᵬ":"b","ᶀ":"b","ƀ":"b","ƃ":"b","ɵ":"o","ć":"c","č":"c","ç":"c","ḉ":"c","ĉ":"c","ɕ":"c","ċ":"c","ƈ":"c","ȼ":"c","ď":"d","ḑ":"d","ḓ":"d","ȡ":"d","ḋ":"d","ḍ":"d","ɗ":"d","ᶑ":"d","ḏ":"d","ᵭ":"d","ᶁ":"d","đ":"d","ɖ":"d","ƌ":"d","ı":"i","ȷ":"j","ɟ":"j","ʄ":"j","ǳ":"dz","ǆ":"dz","é":"e","ĕ":"e","ě":"e","ȩ":"e","ḝ":"e","ê":"e","ế":"e","ệ":"e","ề":"e","ể":"e","ễ":"e","ḙ":"e","ë":"e","ė":"e","ẹ":"e","ȅ":"e","è":"e","ẻ":"e","ȇ":"e","ē":"e","ḗ":"e","ḕ":"e","ⱸ":"e","ę":"e","ᶒ":"e","ɇ":"e","ẽ":"e","ḛ":"e","ꝫ":"et","ḟ":"f","ƒ":"f","ᵮ":"f","ᶂ":"f","ǵ":"g","ğ":"g","ǧ":"g","ģ":"g","ĝ":"g","ġ":"g","ɠ":"g","ḡ":"g","ᶃ":"g","ǥ":"g","ḫ":"h","ȟ":"h","ḩ":"h","ĥ":"h","ⱨ":"h","ḧ":"h","ḣ":"h","ḥ":"h","ɦ":"h","ẖ":"h","ħ":"h","ƕ":"hv","í":"i","ĭ":"i","ǐ":"i","î":"i","ï":"i","ḯ":"i","ị":"i","ȉ":"i","ì":"i","ỉ":"i","ȋ":"i","ī":"i","į":"i","ᶖ":"i","ɨ":"i","ĩ":"i","ḭ":"i","ꝺ":"d","ꝼ":"f","ᵹ":"g","ꞃ":"r","ꞅ":"s","ꞇ":"t","ꝭ":"is","ǰ":"j","ĵ":"j","ʝ":"j","ɉ":"j","ḱ":"k","ǩ":"k","ķ":"k","ⱪ":"k","ꝃ":"k","ḳ":"k","ƙ":"k","ḵ":"k","ᶄ":"k","ꝁ":"k","ꝅ":"k","ĺ":"l","ƚ":"l","ɬ":"l","ľ":"l","ļ":"l","ḽ":"l","ȴ":"l","ḷ":"l","ḹ":"l","ⱡ":"l","ꝉ":"l","ḻ":"l","ŀ":"l","ɫ":"l","ᶅ":"l","ɭ":"l","ł":"l","ǉ":"lj","ſ":"s","ẜ":"s","ẛ":"s","ẝ":"s","ḿ":"m","ṁ":"m","ṃ":"m","ɱ":"m","ᵯ":"m","ᶆ":"m","ń":"n","ň":"n","ņ":"n","ṋ":"n","ȵ":"n","ṅ":"n","ṇ":"n","ǹ":"n","ɲ":"n","ṉ":"n","ƞ":"n","ᵰ":"n","ᶇ":"n","ɳ":"n","ñ":"n","ǌ":"nj","ó":"o","ŏ":"o","ǒ":"o","ô":"o","ố":"o","ộ":"o","ồ":"o","ổ":"o","ỗ":"o","ö":"o","ȫ":"o","ȯ":"o","ȱ":"o","ọ":"o","ő":"o","ȍ":"o","ò":"o","ỏ":"o","ơ":"o","ớ":"o","ợ":"o","ờ":"o","ở":"o","ỡ":"o","ȏ":"o","ꝋ":"o","ꝍ":"o","ⱺ":"o","ō":"o","ṓ":"o","ṑ":"o","ǫ":"o","ǭ":"o","ø":"o","ǿ":"o","õ":"o","ṍ":"o","ṏ":"o","ȭ":"o","ƣ":"oi","ꝏ":"oo","ɛ":"e","ᶓ":"e","ɔ":"o","ᶗ":"o","ȣ":"ou","ṕ":"p","ṗ":"p","ꝓ":"p","ƥ":"p","ᵱ":"p","ᶈ":"p","ꝕ":"p","ᵽ":"p","ꝑ":"p","ꝙ":"q","ʠ":"q","ɋ":"q","ꝗ":"q","ŕ":"r","ř":"r","ŗ":"r","ṙ":"r","ṛ":"r","ṝ":"r","ȑ":"r","ɾ":"r","ᵳ":"r","ȓ":"r","ṟ":"r","ɼ":"r","ᵲ":"r","ᶉ":"r","ɍ":"r","ɽ":"r","ↄ":"c","ꜿ":"c","ɘ":"e","ɿ":"r","ś":"s","ṥ":"s","š":"s","ṧ":"s","ş":"s","ŝ":"s","ș":"s","ṡ":"s","ṣ":"s","ṩ":"s","ʂ":"s","ᵴ":"s","ᶊ":"s","ȿ":"s","ɡ":"g","ᴑ":"o","ᴓ":"o","ᴝ":"u","ť":"t","ţ":"t","ṱ":"t","ț":"t","ȶ":"t","ẗ":"t","ⱦ":"t","ṫ":"t","ṭ":"t","ƭ":"t","ṯ":"t","ᵵ":"t","ƫ":"t","ʈ":"t","ŧ":"t","ᵺ":"th","ɐ":"a","ᴂ":"ae","ǝ":"e","ᵷ":"g","ɥ":"h","ʮ":"h","ʯ":"h","ᴉ":"i","ʞ":"k","ꞁ":"l","ɯ":"m","ɰ":"m","ᴔ":"oe","ɹ":"r","ɻ":"r","ɺ":"r","ⱹ":"r","ʇ":"t","ʌ":"v","ʍ":"w","ʎ":"y","ꜩ":"tz","ú":"u","ŭ":"u","ǔ":"u","û":"u","ṷ":"u","ü":"u","ǘ":"u","ǚ":"u","ǜ":"u","ǖ":"u","ṳ":"u","ụ":"u","ű":"u","ȕ":"u","ù":"u","ủ":"u","ư":"u","ứ":"u","ự":"u","ừ":"u","ử":"u","ữ":"u","ȗ":"u","ū":"u","ṻ":"u","ų":"u","ᶙ":"u","ů":"u","ũ":"u","ṹ":"u","ṵ":"u","ᵫ":"ue","ꝸ":"um","ⱴ":"v","ꝟ":"v","ṿ":"v","ʋ":"v","ᶌ":"v","ⱱ":"v","ṽ":"v","ꝡ":"vy","ẃ":"w","ŵ":"w","ẅ":"w","ẇ":"w","ẉ":"w","ẁ":"w","ⱳ":"w","ẘ":"w","ẍ":"x","ẋ":"x","ᶍ":"x","ý":"y","ŷ":"y","ÿ":"y","ẏ":"y","ỵ":"y","ỳ":"y","ƴ":"y","ỷ":"y","ỿ":"y","ȳ":"y","ẙ":"y","ɏ":"y","ỹ":"y","ź":"z","ž":"z","ẑ":"z","ʑ":"z","ⱬ":"z","ż":"z","ẓ":"z","ȥ":"z","ẕ":"z","ᵶ":"z","ᶎ":"z","ʐ":"z","ƶ":"z","ɀ":"z","ﬀ":"ff","ﬃ":"ffi","ﬄ":"ffl","ﬁ":"fi","ﬂ":"fl","ĳ":"ij","œ":"oe","ﬆ":"st","ₐ":"a","ₑ":"e","ᵢ":"i","ⱼ":"j","ₒ":"o","ᵣ":"r","ᵤ":"u","ᵥ":"v","ₓ":"x"};
String.prototype.latinise=function(){return this.replace(/[^A-Za-z0-9\[\] ]/g,function(a){return Latinise.latin_map[a]||a})};
String.prototype.latinize=String.prototype.latinise;
String.prototype.isLatin=function(){return this==this.latinise()}
//the latinise functions are from http://semplicewebsites.com/removing-accents-javascript

//dictionary for all commands and information
var commandDictionary = new Object();
commandDictionary['8ball'] = {
  timeout: '1',    
  emoji: ':8ball: ', //put space after emoji 
  error: 'Use the command like this: `8ball [question]',
  usage: '**Usage:** `8ball [question]',
  doCommand: function(message, key, args) {
    if (args[0]) {
      return responseHead(message, key) + ball.generate();
    } else {
      return error(key);
    }
  }
};
commandDictionary['roll'] = {
  timeout: '1',    
  emoji: ':game_die: ',  //put space after emoji 
  error: 'Use the command like this: `roll [count]d[sides]+/-[modifier]',
  usage: '**Usage:** `roll [count]d[sides]+/-[modifier]',
  doCommand: function (message, key, args) {
    var rollSign = "";
    var rollCount;
    var rollSides;
    var rollOperator;
    var rollList = new Array(); // An array of dice roll values.
    var rollSum = 0; // The sum of all rolls.
    var rollMessageOutput = ""; // The final message to be printed.        
    if (args[0]) {
      if (args[0].includes("+")) {
        rollSign = "+";
      }
      if (args[0].includes("-")) {
        rollSign = "-";
      }     
    }              
    if (args[0]) {
      var rollStat = args[0].replace("+","d").replace("-","d").split("d");
      rollCount = rollStat[0];
      rollSides = rollStat[1];
      rollOperator = rollStat[2];
    } else {
        return error(key);
    }
    // If our inputs are invalid, return an error.
    if (isNaN(rollCount) || isNaN(rollSides) || rollCount <= 0 || rollCount >= 120  || rollSides <= 0 || rollSides >= 120 || rollOperator <= 0 || rollOperator >= 120) {
      return error(key);
    } else {
      if (isNaN(rollOperator)) {
        rollOperator = ""; 
      }
      // Base message.
      var extraContent = '**' + rollCount + 'd' + rollSides + rollSign + rollOperator + '** '; 
      rollMessageOutput += responseHead(message, key, extraContent);
      // Roll each die.
      for (var i = 0; i < rollCount; i++) {
        var numGen = Math.floor((Math.random() * rollSides) + 1);
        rollSum += numGen;
        rollList.push(numGen);
      }
      rollOperator = Number(rollOperator);
      if (args[0].includes("+")) {
        rollSum = rollSum + rollOperator;
      }
      if (args[0].includes("-")) {
        rollSum = rollSum - rollOperator;
        }
      if (rollCount > 1) {
        // Print all of our rolls
        rollMessageOutput += "```" + rollList.toString() + "```";
      }                            
      rollMessageOutput += " You rolled a total of **" + rollSum + "**";    
      return rollMessageOutput;
    }
  }
};
commandDictionary['help'] = {
  timeout: '1',    
  emoji: ':grey_question: ',  //put space after emoji 
  error: 'Use the command like this: `help',
  usage: '**Usage:** `help OR `help [command]',    
  doCommand: function(message, key, args) {
    var helpMessageBody;
    if(args[0] in commandDictionary) {
      helpMessageBody =  ' ```' + commandDictionary[args[0]].usage + '```';
    } else {
      var helpList = new Array();
    	for (var keyIter in commandDictionary) {
      	helpList.push(keyIter);
      }
      helpMessageBody = '```**Available Commands:** ' + helpList.sort().toString().replace(/,/g, ", ") + '```';
    }
    return responseHead(message, key) + roar.generate() + ' ' + roar.generate() + helpMessageBody + '*Do not include brackets' + ' [] ' + 'while using commands*';
  }
}; 
commandDictionary['coin'] = {
  timeout: '1',
  emoji: ':moneybag: ',  //put space after emoji  
  error: 'Use the command like this: `coin',
  usage: '**Usage:** `coin',
  doCommand: function(message, key, args) {
    const coinAnswers = [
      'Heads',
      'Tails'
    ];
    function coinGenerator() {
      var coinNum = Math.floor((Math.random() * coinAnswers.length));
      return coinAnswers[coinNum];
    }
    if (args[0]) {
      return error(key);     
    }    
    return responseHead(message, key) + 'You flipped *' + coinGenerator() + '*';
  }
};
commandDictionary['attack'] = {
  timeout: '1',    
  emoji: ':dagger: ',  //put space after emoji   
  error: 'Use the command like this: `attack [@user OR name]',
  usage: '**Usage:** `attack [@user OR name]',
  doCommand: function(message, key, args) {
    if (args[0] === undefined || args[0] === '' || args[0] == bot.user) {
      return error(key);
    } else {
      return responseHead(message, key) + args[0] + attack.generate();
    }
  }
};
commandDictionary['choose'] = {
  timeout: '1',
  emoji: ':point_up: ',  //put space after emoji   
  error: 'Use the command like this: `choose [choice1|choice2|etc]',
  usage: '**Usage:** `choose [choice1|choice2|etc]',
  doCommand: function(message, key, args) {
    function chooseGenerator() {
      var chooseNum = Math.floor((Math.random() * chooseArray.length));
      return chooseArray[chooseNum];
    } 
    //looks to see if the user input includes string|string
    //if it does not; stops the command and returns error
    //if valid, split the strings into an array    
    if (args[0] && args[0].substring(1, args[0].length - 1).includes('|')) {
      var chooseArray = args[0].split('|');            
    } else {
      return error(key);    
    }
    //if the string|string is valid return output
    //else return error    
    if (chooseArray[0] === '' || chooseArray[1] === '' || chooseArray === null || chooseArray.length <= 1) {
      return error(key);
    } else {
      return responseHead(message, key) + ' *(I choose ' + chooseGenerator() + '*)';
    }            
  }
};
commandDictionary['cookie'] = {
  timeout: '1',
  emoji: ':gift: ',  //put space after emoji  
  error: 'Use the command like this: `cookie [@user OR name]',
  usage: '**Usage:** `cookie [@user OR name]',
  doCommand: function(message, key, args) {
    if (!args[0]) {
      return error(key);
    } else {
      return responseHead(message, key) + 'You gave ' + args[0] + ' a dino-cookie! :cookie:';
    }
  }  
};
commandDictionary['error'] = {
  timeout: '1',
  emoji: ':no_entry_sign: ',  //put space after emoji 
  error: 'Use the command like this: `error',
  usage: '`error',
  doCommand: function(message, key, args) {
    return error(key);
  }  
};
commandDictionary['hello'] = {
  timeout: '1',
  emoji: '',  //put space after emoji
  error: 'Use the command like this: `hello',
  usage: '`hello',
  doCommand: function(message, key, args) {
    if (args[0]) {
      return error(key);
    } else {
      return emojiDino + roar.generate() + ' ' + roar.generate() + ' *(Hi ' + message.author.username + ')*';
    }
  }
};
commandDictionary['ping'] = {
  timeout: '1',
  emoji: ':grey_exclamation: ',  //put space after emoji 
  error: 'Use the command like this: `ping',
  usage: '**Usage:** `ping',
  doCommand: function(message, key, args) {
    if (args[0]) {
      return error(key);
    } else {
      return emojiDino + roar.generate() + ' ' + roar.generate() + ' *(Pong!)*';
    }
  }      
};
commandDictionary['quote'] = {
  timeout: '1',
  emoji: ':speech_balloon: ',  //put space after emoji 
  error: 'Use the command like this: `quote',
  usage: '**Usage:** `quote',
  doCommand: function(message, key, args) {
    if (args[0]) {
      return error(key);
    } else {
      return responseHead(message, key) + quote.generate();
    }
  }
};
commandDictionary['taste'] = {
  timeout: '1',
  emoji: ':fork_and_knife: ',  //put space after emoji 
  error: 'Use the command like this: `taste [@user OR name]',
  usage: '**Usage:** `taste [@user OR name]',
  doCommand: function(message, key, args) {
    if (!args[0]) {
      return error(key);
    } else {
      return responseHead(message, key) + 'I think ' + args[0] + ' tastes ' + taste.generate();
    }
  }
};
commandDictionary['say'] = {
  timeout: '0',
  error: 'Use the command like this: `say [message]',
  usage: '**Usage:** `say [message]',
  doCommand: function(message, key, args) {
    var sayMessage = emojiDino + message.content.substring(5);     
    message.delete(0); //deletes message  
    if (!args[0]) {
      return error(key);
    } else {    
      return sayMessage;    
    }
  }
};

//SQL Database stuffs
//This is commented out because
//it will time out every 4 hours
//needs to be changed before I start
//to acsess the databases
/*
con.connect(function(err) {
    if (err) throw err;
    console.log('Connected to the Database');
});
*/

// only reacts to Discord _after_ ready is emitted
bot.on('ready', () => {
  console.log('Online and connected');
});
// Create an event listener for messages
bot.on('message', message => {
  var messageContent = message.content;
  var messageArguments = message.content.substring(1).split(' ');
  var messageCheck = message.content.split(' ');
  var key = messageArguments[0];
  var args = messageArguments.slice(1);
  var userID = message.author.id;
  
  //delete bot messages that say to slow down   
  if (message.author.bot && messageContent.includes('Slow down, you\'re scaring me!')) {
    message.delete(6000); //deletes message      
    return;
   }  
  //stop message from being processed
  //if from a bot
  if (message.author.bot) { return; }    
  //listen for the ` to start a command
  //the bot only responds with things inside this if
  //if i want the bot to display something write it in here
  if (messageContent.substring(0, 1) === '`') {
  //stop message from being processed
  //if from a user in timeout
    if(commandDictionary[key]) {
      if (timedOutUsers.indexOf(userID) > -1) {
        message.channel.send(timeoutAlert());
        console.log(getTime(), message.author.username + ' was warned about spamming commands');
        return;
      }
      console.log(getTime(), message.author.username + ' used: ' + key);
      message.channel.send(commandDictionary[key].doCommand(message, key, args));
      timeout(key, userID);
    }
    else {
      //TODO: Consider sending the help message
      console.log(getTime(), message.author.username + "used an unrecognized command input");
    }
  }
  if (message.isMentioned(bot.user)) {
    message.channel.send(emojiDino + roar.generate());
    console.log(getTime(), message.author.username + ' mentioned DinoBot');     
  }    
    //stop message from being processed
    //if from a bot
    if (message.author.bot) { return; }
    //check if theres spaces in the middle of curse words
    var messageSpaceCheck = spaceCheck(messageCheck);
    
    //arrange first letter of each word and put it as one
    //arg for the array 'messageCheck'
    var messageFirstLetters = combineFirstLetters(messageCheck);
    messageCheck.unshift(messageFirstLetters);
    messageCheck = messageCheck.concat(messageSpaceCheck);
    //check individual words for cursing
  for (var i = 0; i < messageCheck.length; i++) { 
    messageCheck[i] = messageCheck[i].toLowerCase();
    messageCheck[i] = messageCheck[i].replace(/"/g, '');
    messageCheck[i] = messageCheck[i].replace(/'/g, '');
    messageCheck[i] = messageCheck[i].replace(/@/g, 'a');
    messageCheck[i] = messageCheck[i].replace(/\$/g, 's');
    messageCheck[i] = messageCheck[i].replace(/[\u200B-\u200D\uFEFF]/g, '');
    messageCheck[i] = messageCheck[i].latinize();
    for(var j = 0; j < profanity.length; j++) {
        if (messageCheck[i].indexOf(profanity[j]) != -1) {
          for(var k = 0; k < profanityExceptions.length; k++) {
              if(messageCheck[i].indexOf(profanityExceptions[k]) != -1) {return;} 
          }   
          if (message.guild != null) {
            message.channel.send(emojiDino + languageResponse.generate());      
            console.log(getTime(), message.author.username + ' was warned about cursing.');    
            //message.author.send(emojiDino + '<@' + userID + '>, please keep the ' + message.guild.name + ' profanity free. Do not curse.');     
            message.guild.owner.send(emojiDino + ' ' + message.author.username + ' cursed in your server, ' + message.guild.name + ', in the channel ' + message.channel.name +':```' + '\n' + message.author.username + ': \"' + message + '\"```' + 'The trigger was ' + profanity[j] + '\non ' + getDate());  
            return;
          } else {
            console.log(getTime(), message.author.username + ' cursed at me in direct message');    
            message.author.send(emojiDino + '<@' + userID + '>, please don\'t curse in front of me. :confounded: ');     
            return;
          }         
        }    
      }
  }
  
});
// Create an event listener for new guild members
bot.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find('name', 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(emojiDino + roar.generate() + roar.generate() + roar.generate() + ` (Welcome to the server, ${member})`);
});
bot.login(TOKEN);