//establish constants
//discord.js dependencies
const DISCORD = require('discord.js');
const BOT = new DISCORD.Client();
//npm dependencies
const FS = require('fs');
const HTTP = require('http');
var jimp = require('jimp');
const MYSQL = require('mysql');
const REQUEST = require('request');
const SCRAPEIT = require("scrape-it");
const VALIDURL = require('valid-url');
// commandFunctions dependencies
const ATTACK = require('./commandFunctions/attack.js');
const BALL = require('./commandFunctions/ball.js');
const JIMPFUNCTIONS =  require('./commandFunctions/jimp.js');
const PROFANITY = require('./commandFunctions/profanity.js');
const QUOTE = require('./commandFunctions/quote.js');
const ROAR = require('./commandFunctions/roar.js');
const RPG = require('./commandFunctions/rpg.js');
const RPS = require('./commandFunctions/rps.js');
const TASTE = require('./commandFunctions/taste.js');
const TOKENRETURN = require('./token.js');

//establish global variables and constants
const TOKEN = TOKENRETURN.return();
const MYSQLCRED = TOKENRETURN.sqlCredentials;
//make sure to put a space after. Ex:':smile: '
const EMOJIDINO = '<:sauropod:355738679211327488> ';
var timedOutUsers = new Array();
var sqldb = MYSQL.createConnection(MYSQLCRED);
var download = function(uri, filename, callback){
  REQUEST.head(uri, function(err, res, body){
    REQUEST(uri).pipe(FS.createWriteStream(filename)).on('close', callback);
  });
};

//global functions
//puts user in timeout
function setUserTimeout(userID, timeoutDuration) {
  //put users userID in a timeout array
  timedOutUsers.push(userID);
  //automatically remove the user from timeout after a set delay
  setTimeout(function() {
    timedOutUsers.splice(timedOutUsers.indexOf(userID), 1);
  }, timeoutDuration);
}
function timeoutAlert(timeoutAlert) {
    //alert users to stop using commands
    //if they are in the timeout array
  return EMOJIDINO + ' ' + ROAR.generate() + ' *(Slow down, you\'re scaring me!)*  :no_entry_sign:';
}
// timoutDuration is optional. Allows manually passing in a length to time out
function timeout(key, userID, timeoutDuration) {
  //if we have not explicitly set a timeout length in our dictionary, assume we should time out for 6 seconds
  if(timeoutDuration != undefined) {
    setUserTimeout(userID, timeoutDuration);
  } else if(commandDictionary[key].timeout != undefined) {
    setUserTimeout(userID, commandDictionary[key].timeout);
  } else {
    setUserTimeout(userID, 6000);
  }
}
function error(key) {
  var errorMessage = EMOJIDINO + ' ' + ROAR.generate() + ' ' + ROAR.generate() + ' *(There was an error)*  :no_entry_sign:' + '\n' + commandDictionary[key].error;
  console.log('[FAILED]');
  return errorMessage;
}
function responseHead(message, key, extraContent) { //extraContent is optional
    return EMOJIDINO + commandDictionary[key].emoji + (extraContent || '') + '| **' + message.author.username + '** | ';
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

//dictionary for all commands and information
var commandDictionary = new Object();
commandDictionary['8ball'] = {
  emoji: ':8ball: ', //put space after emoji 
  error: 'Use the command like this: `8ball [question]',
  usage: '**Usage:** `8ball [question]',
  doCommand: function(message, key, args) {
    if (args[0]) {
      message.channel.send(responseHead(message, key) + BALL.generate());
      return;
    } else {
      message.channel.send(error(key));
      return;
    }
  }
};
commandDictionary['roll'] = {
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
      message.channel.send(error(key));
    }
    // If our inputs are invalid, return an error.
    if (isNaN(rollCount) || isNaN(rollSides) || rollCount <= 0 || rollCount >= 120  || rollSides <= 0 || rollSides >= 120 || rollOperator <= 0 || rollOperator >= 120) {
      message.channel.send(error(key));
      return;
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
      message.channel.send(rollMessageOutput);
      return;
    }
  }
};
commandDictionary['help'] = {
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
    message.channel.send(responseHead(message, key) + ROAR.generate() + ' ' + ROAR.generate() + helpMessageBody + '*Do not include brackets' + ' [] ' + 'while using commands*');
    return;
  }
}; 
commandDictionary['coin'] = {
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
      message.channel.send(error(key));
      return;     
    }    
    message.channel.send(responseHead(message, key) + 'You flipped *' + coinGenerator() + '*');
    return;
  }
};
commandDictionary['attack'] = {
  emoji: ':dagger: ',  //put space after emoji   
  error: 'Use the command like this: `attack [@user OR name]',
  usage: '**Usage:** `attack [@user OR name]',
  doCommand: function(message, key, args) {
    if (args[0] === undefined || args[0] === '' || args[0] == BOT.user) {
    	message.channel.send(error(key));
      return;
    } else {
      message.channel.send(responseHead(message, key) + args[0] + ATTACK.generate());
      return;
    }
  }
};
commandDictionary['choose'] = {
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
      message.channel.send(error(key));
      return;
    }
    //if the string|string is valid return output
    //else return error    
    if (chooseArray[0] === '' || chooseArray[1] === '' || chooseArray === null || chooseArray.length <= 1) {
      message.channel.send(error(key));
      return;
    } else {
      message.channel.send(responseHead(message, key) + ' *(I choose ' + chooseGenerator() + '*)');
      return;
    }         
  }
};
commandDictionary['cookie'] = {
  emoji: ':gift: ',  //put space after emoji  
  error: 'Use the command like this: `cookie [@user OR name]',
  usage: '**Usage:** `cookie [@user OR name]',
  doCommand: function(message, key, args) {
    if (!args[0]) {
  		message.channel.send(error(key));
      return;
    } else {
      message.channel.send(responseHead(message, key) + 'You gave ' + args[0] + ' a dino-cookie! :cookie:');
      return;
    }
  }  
};
commandDictionary['error'] = {
  emoji: ':no_entry_sign: ',  //put space after emoji 
  error: 'Use the command like this: `error',
  usage: '**Usage:** `error',
  doCommand: function(message, key, args) {
    message.channel.send(error(key));
  }  
};
commandDictionary['hello'] = {
  emoji: '',  //put space after emoji
  error: 'Use the command like this: `hello',
  usage: '**Usage:** `hello',
  doCommand: function(message, key, args) {
    if (args[0]) {
      message.channel.send(error(key));
      return;
    } else {
      message.channel.send(EMOJIDINO + ROAR.generate() + ' ' + ROAR.generate() + ' *(Hi ' + message.author.username + ')*');
      return;
    }
  }
};
commandDictionary['ping'] = {
  emoji: ':grey_exclamation: ',  //put space after emoji 
  error: 'Use the command like this: `ping',
  usage: '**Usage:** `ping',
  doCommand: function(message, key, args) {
    if (args[0]) {
      message.channel.send(error(key));
      return;
    } else {
      message.channel.send(EMOJIDINO + ROAR.generate() + ' ' + ROAR.generate() + ' *(Pong!)*');
      return;
    }
  }      
};
commandDictionary['quote'] = {
  emoji: ':speech_balloon: ',  //put space after emoji 
  error: 'Use the command like this: `quote',
  usage: '**Usage:** `quote',
  doCommand: function(message, key, args) {
    if (args[0]) {
      message.channel.send(error(key));
      return;
    } else {
      message.channel.send(responseHead(message, key) + QUOTE.generate());
      return;
    }
  }
};
commandDictionary['taste'] = {
  emoji: ':fork_and_knife: ',  //put space after emoji 
  error: 'Use the command like this: `taste [@user OR name]',
  usage: '**Usage:** `taste [@user OR name]',
  doCommand: function(message, key, args) {
    if (!args[0]) {
      message.channel.send(error(key));
      return;
    } else {
      message.channel.send(responseHead(message, key) + 'I think ' + args[0] + ' TASTEs ' + TASTE.generate());
      return;
    }
  }
};
commandDictionary['say'] = {
  timeout: 0,
  error: 'Use the command like this: `say [message]',
  usage: '**Usage:** `say [message]',
  doCommand: function(message, key, args) {
    var sayMessage = EMOJIDINO + message.content.substring(5);     
    message.delete(0); //deletes message  
    if (!args[0]) {
      message.channel.send(error(key));
      return;
    } else {    
      message.channel.send(sayMessage);
      return;
    }
  }
};
commandDictionary['avatar'] = {
  timeout: 12000,
  emoji: ':busts_in_silhouette: ',    
  error: 'Use the command like this: `avatar [target]',
  usage: '**Usage:** `avatar [target]',
  doCommand: function(message, key, args) {
    var avatarMention = message.mentions.users.array();
    var avatarReturn = responseHead(message, key) + '\n'; 
    //if no mentions return sender's avatar  
    if (avatarMention.length < 1) {
      message.channel.send(message.author.username + '\'s Avatar: ' + message.author.avatarURL);
      return;
    } else if (avatarMention.length >= 1 && avatarMention.length <= 5) {
        //if mention range between 1-6 return all avatars
        for (var i = 0; i < avatarMention.length; i++) {
        avatarReturn += avatarMention[i].username + '\'s Avatar: ' + avatarMention[i].avatarURL + "\n";   
      }
      message.channel.send(avatarReturn);
      return;     
    } else {
      //if message range longer than 6 return error
      message.channel.send(error(key) + '\nPlease mention 5 or fewer users.');
      return;
    }
    //if message formatted incorectly  
    message.channel.send(error(key));
    return;      
  }
};
commandDictionary['admin'] = {
  emoji: ':cop: ',
  timeout: 0,
  error: 'Use the command like this: `admin profanity [filter OR nofilter]',
  usage: '**Usage** `admin profanity [filter OR nofilter]',
  doCommand: function(message, key, args) {
    //input: PROFANITY nofilter
    //input: PROFANITY filter
    if(message.author.id == message.guild.owner.id) {
      switch(args[0]) {
        case 'profanity':
          if (args[1] == 'nofilter') {
          	//remove PROFANITY filter from channel
          	sqldb.query("UPDATE channel SET profanityMonitor = 0 WHERE channelID = " + message.channel.id, function (err, results, fields) {
  						if (err) throw err;
              console.log(results);
      			});
            console.log('Removed profanity filter from channel ' + message.channel.name);
            message.channel.send(responseHead(message, key) + 'The profanity filter has been removed from this channel.');
      		} else if (args[1] == 'filter') {
          	//add PROFANITY filter from channel
          	sqldb.query("UPDATE channel SET profanityMonitor = 1 WHERE channelID = " + message.channel.id, function (err, results, fields) {
  						if (err) throw err;
              console.log(results);
      			});
            console.log('Added profanity filter to channel ' + message.channel.name);
            message.channel.send(responseHead(message, key) + 'The profanity filter has been added to this channel.');
      		} else {
            message.channel.send(error(key)); // TODO: append more description later
      		}
          return;
        default:
          message.channel.send(error(key));
          return; // TODO: Consider listing all valid commands
      }
    } else {
      timeout(key, message.author.id, 6000);
      message.channel.send(EMOJIDINO + 'You do not have access to this command.');
      return;
    }
  }
};
commandDictionary['rps'] = {
  emoji: ':cop: ',
  error: 'Use the command like this: `rps [rock OR paper OR scissors]',
  usage: '**Usage** `rps [rock OR paper OR scissors]',
  doCommand: function(message, key, args) {               
		var rpsMessage = EMOJIDINO + 'I choose **';
		var rpsWin = '*You win.*';
		var rpsLoose = '*You loose!*';
		var rpsTie = '*We tie.*'
		//check for correct input
		switch(args[0]) {
			case 'rock':
				rpsResult = RPS.generate();
				rpsMessage += rpsResult.toUpperCase() + '** '
				if (rpsResult == 'rock') {
					message.channel.send(rpsMessage + ':right_facing_fist:\n' + rpsTie);
				} else if (rpsResult == 'paper') {
					message.channel.send(rpsMessage + ':raised_back_of_hand:\n' + rpsLoose);
				} else if (rpsResult == 'scissors') {
					message.channel.send(rpsMessage + ':v:\n' + rpsWin);
				}
        break;
			case 'paper':
				rpsResult = RPS.generate();
				rpsMessage += rpsResult.toUpperCase() + '** '
				if (rpsResult == 'rock') {
					message.channel.send(rpsMessage + ':right_facing_fist:\n' + rpsWin);
				} else if (rpsResult == 'paper') {
					message.channel.send(rpsMessage + ':raised_back_of_hand:\n' + rpsTie);
				} else if (rpsResult == 'scissors') {
					message.channel.send(rpsMessage + ':v:\n' + rpsLoose);
				}
        break;
			case 'scissors':
				rpsResult = RPS.generate();
				rpsMessage += rpsResult.toUpperCase() + '** '
				if (rpsResult == 'rock') {
          message.channel.send(rpsMessage + ':right_facing_fist:\n' + rpsLoose);
				} else if (rpsResult == 'paper') {
					message.channel.send(rpsMessage + ':raised_back_of_hand:\n' + rpsWin);
				} else if (rpsResult == 'scissors') {
					message.channel.send(rpsMessage + ':v:\n' + rpsTie);
				}
        break;
      default:
        message.channel.send(error(key));
		}
    return;
	}
};
commandDictionary['rpg'] = {
  emoji: ':map: ',
  error: 'Use the command like this: `rpg name character',
  usage: '**Usage:** `rpg [name | characteristic OR char | bond | flaw | npc | conditions OR con OR c]',
  doCommand: function(message, key, args) {
  	switch(args[0]) { 
      case 'scrape':
        var scrapeURL = "https://www.dndbeyond.com/monsters/aboleth";        
        SCRAPEIT(scrapeURL, {
          
          title: ".monster-name",
          descShort: ".details-item",
          // Nested list
          abilityScore: {
            listItem: ".score"
          },
          abilityModifier: {
            listItem: ".modifier"
          },
          quickPrimary: {
            listItem: ".primary"
          },
          quickSecondary: {
            listItem: ".secondary"
          },
          proficienciesTitle: {
            listItem: ".title",
          },
          proficienciesDescription: {
            listItem: ".description",
          },
          monsterImage: {
            selector: ".monster-image",
            attr: "src"
          }
        },
          (err, page) => {
          console.log(err || page);
          var abilityScoreArray = page["abilityScore"];
          var abilityModifierArray = page["abilityModifier"];
          var quickPrimaryArray = page["quickPrimary"];
          var quickSecondaryArray = page["quickSecondary"];
          var proficienciesTitle = page["proficienciesTitle"];
          var proficienciesDescription = page["proficienciesDescription"];
          
          /*
          message.channel.send({
            "embed": {
            "title": page["title"],
            "description": "*" + page["descShort"] + "*",
            "url": "https://www.dndbeyond.com/monsters/adult-blue-dragon",
            "color": 0x64FFDA,
            "footer": {
              "icon_url": "https://cdn.discordapp.com/attachments/358264614200279050/376058047614943232/dnd-beyond-logo.png",
              "text": "© 2017 D&D Beyond | Scraped by DinoBot"
            },
            "thumbnail": {
              "url": "https://cdn.discordapp.com/attachments/358264614200279050/376058047614943232/dnd-beyond-logo.png"
            },
            "image": {
              "url": "https://media-waterdeep.cursecdn.com/avatars/thumbnails/0/16/315/315/636238882493439723.jpeg"
            },
            "author": {
              "name": "DinoBot",
              "url": "https://discordapp.com",
              "icon_url": "https://cdn.discordapp.com/avatars/366052866424569860/0076d17a6955d26d541b4941f055ad6e.png?size=2048"
            },
            "fields": [
              {
                "name": "<:blank:376016058248724480>",
                "value": "__**Abilities**__"
              },
              {
                "name": "<:strength:376009689864994820> **STR**",
                "value": abilityScoreArray[0] + " " + abilityModifierArray[0],
                "inline": true
              },
              {
                "name": "<:dexterity:376009689348964352> **DEX**",
                "value": abilityScoreArray[1] + " " + abilityModifierArray[1],
                "inline": true
              },
              {
                "name": "<:constitution:376009689214877707> **CON**",
                "value": abilityScoreArray[2] + " " + abilityModifierArray[2],
                "inline": true
              },
              {
                "name": "<:intelligence:376009689445564426> **INT**",
                "value": abilityScoreArray[3] + " " + abilityModifierArray[3],
                "inline": true
              },
              {
                "name": "<:wisdom:376009690796261377> **WIS**",
                "value": abilityScoreArray[4] + " " + abilityModifierArray[4],
                "inline": true
              },
              {
                "name": "<:charisma:376009688988516353> **CHA**",
                "value": abilityScoreArray[5] + " " + abilityModifierArray[5],
                "inline": true
              },
              {
                "name": "<:blank:376016058248724480>",
                "value": "__**Quick Information**__"
              },
              {
                "name": "**Challenge**",
                "value": quickPrimaryArray[0] + " " + quickSecondaryArray[0],
                "inline": true
              },
              {
                "name": "**Armor Class**",
                "value": quickPrimaryArray[1] + " " + quickSecondaryArray[1],
                "inline": true
              },
              {
                "name": "**Hit Points**",
                "value": quickPrimaryArray[2] + " " + quickSecondaryArray[2],
                "inline": true
              },
              {
                "name": "**Speed**",
                "value": quickPrimaryArray[3] + " " + quickSecondaryArray[3],
                "inline": true
              },
              {
                "name": "<:blank:376016058248724480>",
                "value": "__**Proficiencies**__"
              },
              {
                "name": "**Saving Throws**",
                "value": "DEX +5, CON +11, WIS +7, CHA +9",
                "inline": true
              },
              {
                "name": "**Skills**",
                "value": "Perception +12, Stealth +5",
                "inline": true
              },
              {
                "name": "**Damage Immunities**",
                "value": "Lightning",
                "inline": true
              },
              {
                "name": "**Senses**",
                "value": "Blindsight 60ft., Darkvision 120 ft., Passive Perception 22",
                "inline": true
              },
              {
                "name": "**Languages**",
                "value": "Common, Draconic",
                "inline": true
              },
              {
                "name": "<:blank:376016058248724480>",
                "value": "__**Special Abilities**__",
              },
              {
                "name": "__Legendary Resistance (3/Day).__",
                "value": "If the dragon fails a saving throw, it can choose to succeed instead.",
                "inline": true
              },
              {
                "name": "<:blank:376016058248724480>",
                "value": "__**Actions**__"
              },
              {
                "name": "**Multiattack.**",
                "value": "Actions of the Adult Blue Dragon:",
                "inline": true
              }
            ]}
          });
          */
          
          const embed = new DISCORD.RichEmbed()
            .setTitle(page["title"])
            .setAuthor(BOT.user.username, BOT.user.avatarURL)
            .setColor(0x64FFDA)
            .setDescription(page["descShort"])
            .setFooter("© 2017 D&D Beyond | Scraped by DinoBot", "https://cdn.discordapp.com/attachments/358264614200279050/376058047614943232/dnd-beyond-logo.png")
            .setImage(page["monsterImage"])
            .setThumbnail("https://cdn.discordapp.com/attachments/358264614200279050/376058047614943232/dnd-beyond-logo.png")
            .setURL(scrapeURL)
            //Abilities Section
            .addField("__**Abilities**__",
                      "<:strength:376009689864994820> **STR**: " + abilityScoreArray[0] + " " + abilityModifierArray[0] + 
                      "<:dexterity:376009689348964352> **DEX**: " + abilityScoreArray[1] + " " + abilityModifierArray[1] +
                      "<:constitution:376009689214877707> **CON**: " + abilityScoreArray[2] + " " + abilityModifierArray[2] +
                      "<:intelligence:376009689445564426> **INT**: " + abilityScoreArray[3] + " " + abilityModifierArray[3] +
                      "<:wisdom:376009690796261377> **WIS**: " + abilityScoreArray[4] + " " + abilityModifierArray[4] +
                      "<:charisma:376009688988516353> **CHA**", abilityScoreArray[5] + " " + abilityModifierArray[5])
            //----------
            //Secondary Information
            .addField("__**Secondary Information**__", "Miscellaneous stats for the " + page["title"])
            .addField("**Challenge**", quickPrimaryArray[0] + " " + quickSecondaryArray[0], true)
            .addField("**Armor Class**", quickPrimaryArray[1] + " " + quickSecondaryArray[1], true)
            .addField("**Hit Points**", quickPrimaryArray[2] + " " + quickSecondaryArray[2], true)
            .addField("**Speed**", quickPrimaryArray[3] + " " + quickSecondaryArray[3], true)
            //Proficiency Title
            .addField("__**Proficiencies**__", "Proficiencies of the " + page["title"]);
            
            //Proficiency Fields
            for (i = 0; i < proficienciesTitle.length; i++) { 
              embed.addField('**' + proficienciesTitle[i] + '**', proficienciesDescription[i]);
            }
          
            //----------
            /* Don't forget i can make blank fields
            .addBlankField(true)
            .addField("Inline Field 3", "You can have a maximum of 25 fields.", true);
            */
          
          message.channel.send({embed});
          
        });   
        
				return;  
			case 'name':
        message.channel.send(responseHead(message, key) + RPG.name());
				return;
			case 'characteristic':
        message.channel.send(responseHead(message, key) + 'The character ' + RPG.characteristics() + '.');
				return;
			c
        message.channel.send(responseHead(message, key) + 'The character is driven by ' + RPG.bonds() + '.');
				return;
			case 'flaw':
        message.channel.send(responseHead(message, key) + 'The character\'s flaw is ' + RPG.flaws() + '.');
				return;
			case 'npc':
        message.channel.send(responseHead(message, key) + RPG.name() + ' is ' + RPG.flavor() + ' that ' + RPG.characteristics() + ', is plagued by ' + RPG.flaws() + ', and is driven by ' + RPG.bonds() + '.');
				return;
      case 'conditions':
			case 'con':
			case 'c':
				if (RPG.rpgConditions[args[1]]) {
					var rpgConditionTitle = args[1].charAt(0).toUpperCase() + args[1].slice(1);
          message.channel.send({embed: {
						color: 0x64FFDA,
						author: {
							name: BOT.user.username,
							icon_url: BOT.user.avatarURL
						},
						title: rpgConditionTitle,
						description: "Note: this condition is for Dungeons and Dragons 5e.\n",
						fields: [
							{
								name: 'Description',
								value: RPG.rpgConditions[args[1]].desc,
							}
						],
						footer: {
								text: BOT.user.username + ' | rpg Assistant'
						}
					}});
					return;
				} else {
          			message.channel.send({embed: {
						color: 0x64FFDA,
						author: {
							name: BOT.user.username,
							icon_url: BOT.user.avatarURL
						},
						title: 'Conditions',
						description: "Note: these conditions are for Dungeons and Dragons 5e.\n",
						fields: [
							{
								name: 'Options',
								value:  RPG.conditionList(),
							},
							{
								name: 'Usage:',
								value: 'Type "`rpg condition" and then the condition you wish to learn more about.'
							}
						],
						footer: {
								text: BOT.user.username + ' | rpg Assistant'
						}
					}});
				return;
				}			
		}
		if (args[0] == null || args[0] == undefined) {
      message.channel.send(error(key) + '\n Options: name, character');
			return;
		} else {
      message.channel.send(responseHead(message, key) + 'Possible rpg commands are name, characteristic, bond, flaw, npc');
			return; 
		}
  }
};
commandDictionary['profile'] = {
  timeout: 0,
	emoji: ':robot: ',
  error: 'Use the command like this: `profile',
  usage: '**Usage:** `profile',
  doCommand: function(message, key, args) {
		if (args[0]) {
			//if there is a first argument
			switch(args[0]) {
				case 'background':
				case 'b':
					if (args[1] != undefined) {
						//if there is a second argument
						//turn https into http
            var imageInputURL = '';
            var imageUrlSplit = args[1].split(':');
            if (imageUrlSplit[0] == 'https') {
							imageUrlSplit[0] = 'http';
						}
						imageInputURL = imageUrlSplit.join(':');
						//check if the argument is a url
						if (VALIDURL.isUri(imageInputURL)) {
							download(imageInputURL, './userContent/userBackground/temp.png');
							//put stuff here
						} else {
							//if the argument is not a url
							message.channel.send(responseHead(message, key) + 'Please use a valid link to an image.');
						}
						break;
					} else {
						//if there is no argument
						message.channel.send(responseHead(message, key) + 'Please use the command as follows:````profile [background OR b] [url-for-the-picture]```Please note that images will be sized to fit over a 800px200px'); 
						break;
					}
			}						
						/*
						//turn https into http
            var imageInputURL = '';
            var imageUrlSplit = args[1].split(':');
            if (imageUrlSplit[0] == 'https') {
							imageUrlSplit[0] = 'http';
						}
						imageInputURL = imageUrlSplit.join(':');
						//what to do if link is added
						if (VALIDURL.isUri(imageInputURL)) {
							//check if image is a png
							HTTP.get(imageInputURL, function(res) {
								var imgCheckBuffer = [];
								var imgCheckLength = 0;
								res.on('data', function(chunk) {
									//store each block of data in imgCheckbuffer
									imgCheckLength += chunk.length;
									imgCheckBuffer.push(chunk);
								})
								res.on('end', function () {
									//puts image from array into single buffer
									console.log(imgCheckBuffer);
									console.log('LOOOOOOK HEEEERRE -----------------------------------------------------------');
									var image = Buffer.concat(imgCheckBuffer);
									//determine if the image is png
									var type = 'image/png';
									if (res.headers['content-type'] !== undefined)
										type = res.headers['content-type'];
									//download the image
									fs.writeFile('./userContent/userBackground/' + message.author.id + '.png', image, function (err) {
										if (err) throw err;
									});
									//Generate path and save path to users
									sqldb.query("UPDATE user SET userBackground = " + MYSQL.escape("./userContent/userBackground/" + message.author.id + ".png") + " WHERE userID = " + message.author.id, function (err, results, fields) {
								if (err) throw err;
    						message.channel.send(responseHead(message, key) + 'Your user background has been updated.');
  						});
								});
							});
						} else {
							message.channel.send(responseHead(message, key) + 'Please use a valid link to an image.');
						}
					} else {
						message.channel.send(responseHead(message, key) + 'Please use the command as follows:````profile [background OR b] [url-for-the-picture]```Please note that images will be sized to fit over a 800px200px window.');	
					}
				return;
			}	*/
		} else {
			//if there is no first argument
			message.channel.startTyping();
					var attachment = '';
					JIMPFUNCTIONS.profile(jimp, 
																message, 
																key, 
																args,
																EMOJIDINO,
																attachment,
																sqldb);
		}		
	}
};
commandDictionary['name'] = {
  timeout: 0,
	emoji: ':name_badge: ',
  error: 'Use the command like this: `name [set OR toggle]',
  usage: '**Usage:** `name',
  doCommand: function(message, key, args) {
    switch(args[0]) { 
      case 'set':
        if (args[2]) {
          switch(args[1]) {
            case '1':
            case 'one':
              //save args[2] in nickname slot 1
              sqldb.query("UPDATE user SET nicknameOne = " + MYSQL.escape(message.content.substr(12)) + " WHERE userID = " + message.author.id, function (err, results, fields) {
                  if (err) throw err;
                  message.channel.send(responseHead(message, key) + '"' + args[2] + '" has been recorded in name slot 1.\nTo toggle between your two saved nicknames use "`name toggle"');
                });
              return;
            case '2':
            case 'two':
              //save args[2] in nickname slot 2
              sqldb.query("UPDATE user SET nicknameTwo = " + MYSQL.escape(message.content.substr(12)) + " WHERE userID = " + message.author.id, function (err, results, fields) {
                  if (err) throw err;
                  message.channel.send(responseHead(message, key) + '"' + message.content.substr(12) + '" has been recorded in name slot 2.\nTo toggle between your two saved nicknames use "`name toggle"');
                });
              return;
          }
          //if there is no nickname given
          message.channel.send(responseHead(message, key) + 'Please use the command as follows: `name set [1 OR 2] [nickname]');
          return;
        } else {
          //if there is no number selected
          message.channel.send(responseHead(message, key) + 'Please use the command as follows: `name set [1 OR 2] [nickname]');
        }
        return;
      case 'toggle':
        //Switch between two usernames
        //Pull toggle number from database
        sqldb.query("SELECT * FROM user WHERE userID = " + message.author.id, function (err, results, fields) {
		      var nicknameToggleState = results[0].nicknameToggle;
          var nickname = ''; 
          
          if (nicknameToggleState == 0) {
            nickname = results[0].nicknameOne;
            //change the toggle number
            sqldb.query("UPDATE user SET toggle = 1 WHERE userID = " + message.author.id, function (err, results, fields) {
              console.log('nickname toggled');
              });
          } else if (nicknameToggleState == 1) {
            nickname = results[0].nicknameTwo;
              //change the toggle number
            sqldb.query("UPDATE user SET toggle = 0 WHERE userID = " + message.author.id, function (err, results, fields) {
              console.log('nickname toggled');
            });
          }
  
          try {
            if (message.guild) {
              //check BOT has permissions to change nicknames
              if (message.guild.members.get(BOT.user.id).hasPermission("MANAGE_NICKNAMES") && message.guild.members.get(BOT.user.id).hasPermission("CHANGE_NICKNAME")) {
                //change nickname
                //if error make log
                message.member.setNickname(nickname);
                message.channel.send(responseHead(message, key) + 'Your nickname has been changed to ' + nickname);
              } else {
                //If does not have permission
                message.channel.send(responseHead(message, key) + 'I\'m sorry, I do not have permissions to manage nicknames on this server.');
              }
            } else {
              //not in a server (in a DM)
              message.channel.send(responseHead(message, key) + 'I\'m sorry, I can only change your nickname in a server.');
            }
          } catch(err) {
            console.log(error);
            message.channel.send(responseHead(message, key) + 'I\'m sorry, I can only change the nickname of users with a lower rank than me');
          }
          return;
        });
        
    }
    message.channel.send(responseHead(message, key) + 'Please use the command as follows:\nname toggle\nname set [1 OR 2] [nickname]');
    return;
  }
}
/*
commandDictionary['dex'] = {
  timeout: '1',
  error: 'Use the command like this: `dex [thing]',
  usage: '**Usage:** `dex [thing]',
  doCommand: function(message, key, args) {
    var sayMessage = EMOJIDINO + message.content.substring(5);     
    message.delete(0); //deletes message  
    if (!args[0]) {
    	message.channel.send(error(key));
      return;
    } else {    
      
      JQUERY.get('HTTPs://www.pokemon.com/us/pokedex/bulbasaur', null, function(text){
        alert(JQUERY(text).find('.pokemon-number'));
      });  
        
    }
  }
};
*/

//Connect to Database
sqldb.connect(function(err) {
    if (err) throw err;
    console.log('Connected to the Database');
});

//Connect to Discord
// only reacts to Discord _after_ ready is emitted
BOT.on('ready', () => {
  console.log('Online and connected');
});
//try to handle rejections
process.on('unhandledRejection', console.error);

// Create an event listener for messages
BOT.on('message', message => {  
  var messageContent = message.content;
  var messageArguments = message.content.substring(1).split(' ');
  var key = messageArguments[0];
  var args = messageArguments.slice(1);
  var userID = message.author.id;
  
   //delete BOT messages that say to slow down   
  if (message.author.BOT && messageContent.includes('Slow down, you\'re scaring me!')) {
    message.delete(6000); //deletes message
    return;
  }
  //stop message from being processed
  //if from a BOT
  if (message.author.BOT) { return; }
  
  //if user sends a message
  sqldb.query("INSERT INTO user (userID, username, lastSeen, messagesSent) VALUES (" + userID + ", " + MYSQL.escape(message.author.username) + ", '" + new Date(parseInt(message.createdTimestamp)).toLocaleString() + "', " + "1" + ")" + 
              "ON DUPLICATE KEY UPDATE messagesSent = messagesSent + 1, lastSeen = '" + new Date(parseInt(message.createdTimestamp)).toLocaleString() + "'", function (err, results, fields) {
    if (err) throw err;
    console.log(results);
  });
  console.log(message.author.username + ' updated in database');
  //message processing
	if (message.guild) { //checks if in guild or a DM
		//record message content
  	//note: does not account for daylight savings time
		sqldb.query("INSERT INTO messages (messageID, userID, guildID, channelID, date, content) VALUES (" +
								message.id  + ", " + message.author.id + ", " + message.guild.id + ", " + message.channel.id + "," +
								"'" + new Date(parseInt(message.createdTimestamp)).toLocaleString() + "', " + MYSQL.escape(message.content) + ")", function (err, results, fields) {
			if (err) throw err;
			console.log(results);
			console.log('Logged message by ' + message.author.username);
		});
  //add new channels to channel database
		sqldb.query("INSERT INTO channel (channelID, channelName, serverID) VALUES (" +
								message.channel.id  + ", " + MYSQL.escape(message.channel.name) + ", " + message.guild.id + ")" +
								"ON DUPLICATE KEY UPDATE channelName = " + MYSQL.escape(message.channel.name), function (err, results, fields) {
			if (err) throw err;
			console.log(results);
			console.log('Edited channel table: ' + message.channel.name);
		});
		//if message is in PROFANITY enabled channel
		sqldb.query("SELECT * FROM channel WHERE channelID = " + message.channel.id + " AND profanityMonitor = 1", function (err, results, fields) {
			if (err) throw err;
			if (results.length == 1) {PROFANITY.filter(message, EMOJIDINO, getTime, getDate, userID);}
		}); 
	} else {
		PROFANITY.filter(message, EMOJIDINO, getTime, getDate, userID);
	}
  //listen for the ` to start a command
  //the BOT only responds with things inside this if
  //if I want the BOT to display something write it in here
  if (messageContent.substring(0, 1) === '`') {
  //stop message from being processed  
  //if from a user in timeout
    if(commandDictionary[key]) {
      if (timedOutUsers.indexOf(userID) > -1) {
        message.channel.send(timeoutAlert());
        console.log(getTime(), message.author.username + ' was warned about spamming commands');
        return;
      }
      //calls for the command function   
      console.log(getTime(), message.author.username + ' used: ' + key);
      //runs function: be sure to message.channel.send in functions that need it
      commandDictionary[key].doCommand(message, key, args);
      timeout(key, userID);
      return;      
    }
    else {
      //TODO: Consider sending the help message
      console.log(getTime(), message.author.username + " used an unrecognized command input");
      return;    
    }
  }
  if (message.isMentioned(BOT.user)) {
    message.channel.send(EMOJIDINO + ROAR.generate());     
  }    
  //stop message from being processed
  //if from a BOT
  if (message.author.BOT) { return; }  

});

//define token in the login function
BOT.login(TOKEN);