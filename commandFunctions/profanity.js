//profanity       
exports.trigger = function() {
  const profanityArray = [
    "anal",
    "anus",
    "arse",
    "ass",
    "ballsack",
    "bastard",
    "bitch",
    "biatch",
    "bloody",
    "blowjob",
    "bollock",
    "bollok",
    "boner",
    "boob",
    "bugger",
    "buttplug",
    "clitoris",
    "cock",
    "coon",
    "cuck",
    "cunt",  
    "damn",
    "dick",
    "dildo",
    "dyke",
    "fag",
    "feck",
    "fellate",
    "fellatio",
    "felching",
    "fuck",
    "fudgepacker",
    "flange",
    "goddamn",
    "homo",
    "jerk",
    "jizz",
    "knobend",
    "labia",
    "lmao",
    "lmfao",
    "muff",
    "maymay",  
    "nigger",
    "nigga",
    "omg",
    "penis",
    "piss",
    "pube",
    "pussy",
    "queer",
    "scrotum",
    "shit",
    "sh1t",
    "slut",
    "smegma",
    "spunk",
    "tosser",
    "twat",
    "vagina",
    "wank",
    "whore"
  ]
  return profanityArray;
}
exports.exceptions = function() {
  const cleanWordDictionary = [ 
    "analy",
    "anali",
    "assh",  
    "bass",  
    "cass",
    "dass",
    "fass",
    "gass",
    "hass",
    "jass",
    "kass",
    "lass",
    "mass",
    "nass",
    "pass",
    "rass",
    "sass",
    "tass",
    "vass",
    "wass",
    "xass",
    "yass",
    "zass",
    "assa",
    "asse",
    "assi",
    "asso",
    "assu",
    "assi",
    "asst",
    "chell",
    "anall",
    "itcha",
    "canuse",
  ]
  return cleanWordDictionary;
}
exports.filter = function(message) {
	//check if theres spaces in the middle of curse words
	var messageCheck = message.content.split(' ');
	var messageSpaceCheck = spaceCheck(messageCheck);
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
				if (message.guild) {
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
}