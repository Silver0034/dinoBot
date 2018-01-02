// DinoBot™ | Discord.js Bot by Lodes Deisgn
// Version: 2.0beta

//debugg mode
var debug = true;

//establish constants
//discord.js dependencies
const DISCORD = require('discord.js');
const BOT = new DISCORD.Client();
//npm dependencies
const CHEERIO = require('cheerio');
const FS = require('fs');
const HTTP = require('http');
var jimp = require('jimp');
const MYSQL = require('mysql');
const REQUEST = require('request');
const SCRAPEIT = require("scrape-it");
// commandFunctions dependencies
const ATTACK = require('./commandFunctions/attack.js');
const BALL = require('./commandFunctions/ball.js');
const JIMPFUNCTIONS =  require('./commandFunctions/jimp.js');
const MONSTER = require('./commandFunctions/monster.js');
const NPC = require('./commandFunctions/npcGenerate.js');
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
var timedOutUsers = new Array();
var sqldb = MYSQL.createConnection(MYSQLCRED);
var download = function(uri, filename, callback){
  REQUEST.head(uri, function(err, res, body){
    REQUEST(uri).pipe(FS.createWriteStream(filename)).on('close', callback);
  });
};

//global functions
//debug console log
function debugLog(logMessage) {
  if (debug == true) {
    console.log(logMessage);
  } else {
    return;
  }
}
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
  return emoji.dino + ' ' + ROAR.generate() + ' *(Slow down, you\'re scaring me!)*  :no_entry_sign:';
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
//Old error message (not completelty fazed out)
function error(key) {
  var errorMessage = emoji.dino + ' ' + ROAR.generate() + ' ' + ROAR.generate() + ' *(There was an error)*  :no_entry_sign:' + '\n' + commandDictionary[key].error;
  console.log('[FAILED]');
  return errorMessage;
}
function responseHead(message, key, extraContent) { //extraContent is optional
    return emoji.dino + commandDictionary[key].emoji + (extraContent || '') + '| **' + message.author.username + '** | ';
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
//new error message
function errorUsage(message, key, embedFooter, extra) {
  message.channel.startTyping();
  var usageTip = '';
  if (extra == undefined || extra == null || extra == '') {
    usageTip = commandDictionary[key].usage;
  } else {
    usageTip = extra;
  }
    const embed = new DISCORD.RichEmbed()
      .setTitle(key.charAt(0).toUpperCase() + key.slice(1))
      .setAuthor(BOT.user.username, BOT.user.avatarURL)
      .setColor(0x64FFDA)
      .setDescription('Commands are formatted as ``[command]`\nBoth grave accent (`) *and* single quote (\') may be used to trigger commands')
      .addField('Command Info', '```' + usageTip + '````*Do not include brackets [] while using commands*`\nUse ``help [command]` to learn more')
      .setFooter(embedFooter)
      .addBlankField(false)
      .setThumbnail(commandDictionary[key].icon);
    message.channel.stopTyping();
    message.channel.send({embed});
}

var emoji = new Object();
emoji = {
  dino: '<:sauropod:355738679211327488> ',
  str: '<:strength:377677018491387904>',
  dex: '<:dexterity:377677018206175232>',
  con: '<:constitution:377677014561325056>',
  int: '<:intelligence:377677018285998080>',
  wis: '<:wisdom:377677018382204931>',
  cha: '<:charisma:377677013428862978>',
  monster: '<:beholder:386676248434180106>'
}

//dictionary for all commands and information
var commandDictionary = new Object();
commandDictionary['help'] = {
  type: 'info',
  icon: 'https://github.com/Silver0034/dinoBot/blob/master/assets/icons/HelpIcon.png?raw=true',
  emoji: ':grey_question: ',  //put space after emoji 
  error: 'Use the command like this: `help',
  usage: '**Usage:** `help OR `help [command]', 
  doCommand: function(message, key, args, embedFooter) {
    var helpMessageBody;
    //if command specified
    if(args[0] in commandDictionary) {
      helpMessageBody =  ' ```' + commandDictionary[args[0]].usage + '```';
    } else {
      //if no command specified
      var helpInfo = new Array();
      var helpFun = new Array();
      var helpUser = new Array();
      var helpDnd = new Array();
    	for (var keyIter in commandDictionary) {
        if (commandDictionary[keyIter].type == 'info') {
          helpInfo.push(keyIter);
        }
        if (commandDictionary[keyIter].type == 'fun') {
          helpFun.push(keyIter);
        }
        if (commandDictionary[keyIter].type == 'user') {
          helpUser.push(keyIter);
        }
        if (commandDictionary[keyIter].type == 'dnd') {
          helpDnd.push(keyIter);
        }
      }
      helpMessageBody = '**Info**' + '```' + helpInfo.sort().toString().replace(/,/g, ", ") + '```' + '**Fun**' + '```' + helpFun.sort().toString().replace(/,/g, ", ") + '```' + '**User**' + '```' + helpUser.sort().toString().replace(/,/g, ", ") + '```' + '**D&D**' + '```' + helpDnd.sort().toString().replace(/,/g, ", ") + '```';
    }
    message.channel.startTyping();
    const embed = new DISCORD.RichEmbed()
      .setTitle('Help')
      .setAuthor(BOT.user.username, BOT.user.avatarURL)
      .setColor(0x64FFDA)
      .setDescription('Commands are formatted as ``[command]`\nBoth grave accent (`) *and* single quote (\') may be used to trigger commands')
      .addField('Command Info', helpMessageBody + '`*Do not include brackets [] while using commands*`\nUse ``help [command]` to learn more')
      .setFooter(embedFooter)
      .addBlankField(false)
      .setThumbnail(commandDictionary[key].icon);
    message.channel.stopTyping();
    message.channel.send({embed});
    return;
  } 
};
commandDictionary['about'] = {
  type: 'info',
  icon: 'https://github.com/Silver0034/dinoBot/blob/master/assets/icons/HelpIcon.png?raw=true',
  emoji: ':a: ',  //put space after emoji 
  error: 'Use the command like this: `about',
  usage: '**Usage:** `about', 
  doCommand: function(message, key, args, embedFooter) {
    message.channel.startTyping();
    const embed = new DISCORD.RichEmbed()
      .setTitle('About')
      .setAuthor(BOT.user.username, BOT.user.avatarURL)
      .setColor(0x64FFDA)
      .setDescription('About ' + BOT.user.username + '™ and its creators:')
      .addField('Creators', 'This bot was created by Jacob Lodes (Silver0034#4220). \nThis could not have been done without the knowledge and help of SMarioMan.')
      .addField('Information Sources', 'Much of the information this bot posts is original, but many commands (relating to to the game *Dungeons & Dragons*) reference or directly pull information from sources owned by *Wizards of the Coast*.\nLinks are provided to the original information if it comes from a web-based source.')
      .addField('NPMs', 'Much of the code used to power ' + BOT.user.username + '™ is authored by the creators above. This bot runs Discord.js via Node.js and *does* utilize open-sourced NPMs below.' + '```Cheerio, Jimp, Mysql, Scrape-It ```')
      .addField('Artwork', 'All artwork specific to ' + BOT.user.username + '™ including but not limited to its logos and icons are original pieces. Artworks pertaining to information owned by *Wizards of the Coast* are often pulled from the same sources as the information they accompany.')
      .addField('Legal', BOT.user.username + '™ is a chat bot owned and operated by Jacob Lodes under the name *Lodes Design*. The name ' + BOT.user.username + '™ is protected by Florida Trademark law.')
      .setFooter(embedFooter)
      .addBlankField(false)
      .setThumbnail(commandDictionary[key].icon);
    message.channel.stopTyping();
    message.channel.send({embed});
    return;
  } 
};
commandDictionary['taste'] = {
  type: 'fun',
  emoji: ':fork_and_knife: ',  //put space after emoji 
  error: 'Use the command like this: `taste [@user OR name]',
  usage: '**Usage:** `taste [@user OR name]',
  doCommand: function(message, key, args, embedFooter) {
    if (!args[0]) {
      errorUsage(message, key, embedFooter);
      return;
    } else {
      message.channel.send(responseHead(message, key) + 'I think ' + args[0] + ' tastes ' + TASTE.generate());
      return;
    }
  }
};
commandDictionary['attack'] = {
  type: 'fun',
  emoji: ':dagger: ',  //put space after emoji   
  error: 'Use the command like this: `attack [@user OR name]',
  usage: '**Usage:** `attack [@user OR name]',
  doCommand: function(message, key, args, embedFooter) {
    if (args[0] === undefined || args[0] === '' || args[0] == BOT.user) {
    	errorUsage(message, key, embedFooter);
      return;
    } else {
      message.channel.send(responseHead(message, key) + args[0] + ATTACK.generate());
      return;
    }
  }
};
commandDictionary['choose'] = {
  type: 'fun',
  emoji: ':point_up: ',  //put space after emoji   
  error: 'Use the command like this: `choose [choice1|choice2|etc]',
  usage: '**Usage:** `choose [choice1|choice2|etc]',
  doCommand: function(message, key, args, embedFooter) {
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
      errorUsage(message, key, embedFooter);
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
commandDictionary['avatar'] = {
  type: 'user',
  timeout: 12000,
  emoji: ':busts_in_silhouette: ',    
  error: 'Use the command like this: `avatar [target]',
  usage: '**Usage:** `avatar [target]',
  doCommand: function(message, key, args) {
    var avatarMention = message.mentions.users.array();
		debugLog(avatarMention);
    var avatarReturn = responseHead(message, key) + '\n'; 
    //if no mentions return sender's avatar  
    if (avatarMention.length < 1) {
			if (message.author.avatarURL == null) {
				message.channel.startTyping();
				const embed = new DISCORD.RichEmbed()
					.setTitle('Nickname')
					.setAuthor(BOT.user.username, BOT.user.avatarURL)
					.setColor(0x64FFDA)
					.setDescription('The User Specified has not set an Avatar')
					.setFooter(embedFooter)
					.addBlankField(false)
					.setThumbnail(commandDictionary[key].icon);
				message.channel.stopTyping();
				message.channel.send({embed});
				return;
			}
			
      message.channel.send(message.author.username + '\'s Avatar: ' + message.author.avatarURL);
      return;
    } else if (avatarMention.length >= 1 && avatarMention.length <= 5) {
        //if mention range between 1-6 return all avatars
        for (var i = 0; i < avatarMention.length; i++) {
				//Set default avatar if null
				var avatarPath = avatarMention[i].avatarURL;
				if (avatarMention[i].avatarURL == null) {
					avatarPath = 'https://github.com/Silver0034/dinoBot/blob/master/assets/avatarDefault.png?raw=true';
				}
        avatarReturn += avatarMention[i].username + '\'s Avatar: ' + avatarPath + "\n";   
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
commandDictionary['name'] = {
  type: 'dnd',
  timeout: 0,
  icon: 'https://github.com/Silver0034/dinoBot/blob/master/assets/icons/NameIcon.png?raw=true',
	emoji: ':thinking: ',
  error: 'Use the command like this: `name [race] [male OR female]',
  usage: '**Usage:** `name [race] [male OR female] [list]',
  doCommand: function(message, key, args, embedFooter) { 
    message.channel.startTyping();
    const embed = new DISCORD.RichEmbed()
                             .setTitle('Name Generator')
                             .setAuthor(BOT.user.username, BOT.user.avatarURL)
                             .setColor(0x64FFDA)
                             .setFooter(embedFooter)
                             .setThumbnail(commandDictionary[key].icon);
    //if race is specified
    if (args[0]) {
      var raceArray = NPC.array();
      var returnGender = ' ';
      var returnDescription = args[0] + '';
      //set male or female for returnGender
      if (args[1] == 'male' || args[1] == 'female') {
        returnGender = returnGender + args[1];
      }
      //make return description a or an
      if (returnDescription.substring(0, 1) == 'a') {
        returnDescription = 'an';
      } else {
        returnDescription = 'a';
      }
      //For each item in the race array
      for (i = 0; i < raceArray.length; i++) {
        //if input is a valid race
        if (raceArray[i] == args[0].toLowerCase()) {
          //if a list is requested
          if (args[2] == 'list' || args[1] == 'list') {
            embed.addField('Names:', '```' +
                           NPC.nameFemale(args[0]) + '\n' +
                           NPC.nameFemale(args[0]) + '\n' +
                           NPC.nameFemale(args[0]) + '\n' +
                           NPC.nameFemale(args[0]) + '\n' +
                           NPC.nameFemale(args[0]) + '\n' +
                           NPC.nameFemale(args[0]) + '\n' +
                           NPC.nameFemale(args[0]) + '\n' +
                           NPC.nameFemale(args[0]) + '\n' +
                           NPC.nameFemale(args[0]) + '\n' +
                           NPC.nameFemale(args[0]) + '\n' +
                           NPC.nameFemale(args[0]) + '\n' +
                           NPC.nameFemale(args[0]) + '\n' +
                           NPC.nameFemale(args[0]) + '\n' +
                           NPC.nameFemale(args[0]) + '\n' +
                           NPC.nameFemale(args[0]) + '\n' +
                           NPC.nameFemale(args[0]) + '\n' +
                           NPC.nameFemale(args[0]) + '\n' +
                           NPC.nameFemale(args[0]) + '\n' +
                           NPC.nameFemale(args[0]) + '\n' +
                           NPC.nameFemale(args[0]) + '\n' + '```'
                          );
            embed.setDescription('A list of names for ' + returnDescription + '*** ' + args[0] + returnGender + '***\n*Use the command again for a new name*');
          } else {
            //if a single name is requested
            embed.setDescription('A random name for ' + returnDescription + '*** ' + args[0] + returnGender + '***\n*Use the command again for a new name*');
            //if gender is specified 'female'
            if (args[1] == 'female') {
              embed.addField('Names:', '```' + NPC.nameFemale(args[0]) + '```\n*Add "list" to the end of the command to return a list of names*');
            } else {
              //return male otherwise
              embed.addField('Names:', '```' + NPC.nameMale(args[0]) + '```\n*Add "list" to the end of the command to return a list of names*');
            } 
          }
          embed.addBlankField(false);
          message.channel.stopTyping();
          message.channel.send({embed});
          return;
        }
      }
      //if the specified race is unavailable
      embed
           .setDescription('*The specified race is unavailable*')
           .addField('Possible Races:', NPC.raceList())
           .addBlankField(false);
      message.channel.stopTyping();
      message.channel.send({embed});
      return;
    }
    //if the race is unspecified
    embed
         .setDescription('*Please specify race*```' + commandDictionary[key].usage + '```')
         .addField('Possible Races:', NPC.raceList())
         .addBlankField(false);
    message.channel.stopTyping();
    message.channel.send({embed});
    return;
  }
};
commandDictionary['8ball'] = {
  type: 'fun',
  emoji: ':8ball: ', //put space after emoji 
  error: 'Use the command like this: `8ball [question]',
  usage: '**Usage:** `8ball [question]',
  doCommand: function(message, key, args, embedFooter) {
    if (args[0]) {
      message.channel.send(responseHead(message, key) + BALL.generate());
      return;
    } else {
      errorUsage(message, key, embedFooter);
      return;
    }
  }
};
commandDictionary['coin'] = {
  type: 'fun',
  emoji: ':moneybag: ',  //put space after emoji  
  error: 'Use the command like this: `coin',
  usage: '**Usage:** `coin',
  doCommand: function(message, key, args, embedFooter) {
    const coinAnswers = [
      'Heads',
      'Tails'
    ];
    function coinGenerator() {
      var coinNum = Math.floor((Math.random() * coinAnswers.length));
      return coinAnswers[coinNum];
    }
    if (args[0]) {
      errorUsage(message, key, embedFooter);
      return;     
    }    
    message.channel.send(responseHead(message, key) + 'You flipped *' + coinGenerator() + '*');
    return;
  }
};
commandDictionary['cookie'] = {
  type: 'fun',
  emoji: ':gift: ',  //put space after emoji  
  error: 'Use the command like this: `cookie [@user OR name]',
  usage: '**Usage:** `cookie [@user OR name]',
  doCommand: function(message, key, args, embedFooter) {
    if (!args[0]) {
  		errorUsage(message, key, embedFooter);
      return;
    } else {
      message.channel.send(responseHead(message, key) + 'You gave ' + args[0] + ' a dino-cookie! :cookie:');
      return;
    }
  }  
};
commandDictionary['quote'] = {
  type: 'fun',
  emoji: ':speech_balloon: ',  //put space after emoji 
  error: 'Use the command like this: `quote',
  usage: '**Usage:** `quote',
  doCommand: function(message, key, args, embedFooter) {
    if (args[0]) {
      errorUsage(message, key, embedFooter);
      return;
    } else {
      message.channel.send(responseHead(message, key) + QUOTE.generate());
      return;
    }
  }
};
commandDictionary['rps'] = {
  type: 'fun',
  emoji: ':cop: ',
  error: 'Use the command like this: `rps [rock OR paper OR scissors]',
  usage: '**Usage** `rps [rock OR paper OR scissors]',
  doCommand: function(message, key, args, embedFooter) {               
		var rpsMessage = emoji.dino + 'I choose **';
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
        errorUsage(message, key, embedFooter);
		}
    return;
	}
};
commandDictionary['say'] = {
  type: 'fun',
  timeout: 0,
  error: 'Use the command like this: `say [message]',
  usage: '**Usage:** `say [message]',
  doCommand: function(message, key, args, embedFooter) {
    var sayMessage = emoji.dino + message.content.substring(5);     
    message.delete(0); //deletes message  
    if (!args[0]) {
      errorUsage(message, key, embedFooter);
      return;
    } else {    
      message.channel.send(sayMessage);
      return;
    }
  }
};
commandDictionary['nick'] = {
  type: 'user',
  timeout: 0,
	emoji: ':name_badge: ',
  error: 'Use the command like this: `nick [set OR toggle]',
  usage: '**Usage:** `nick OR `nick toggle``` ```\'nick [1 OR 2]``` ```\'nick set [1 OR 2]',
  doCommand: function(message, key, args, embedFooter) {
    
		var nickname = '';
		
		//Pull toggle number from database
    sqldb.query("SELECT * FROM user WHERE userID = " + message.author.id, function (err, results, fields) {
			var nicknameToggleState = results[0].nicknameToggle;
			debugLog('nicknameToggleState = ' + nicknameToggleState);
			
			if (message.guild == null) {
				message.channel.startTyping();
				const embed = new DISCORD.RichEmbed()
					.setTitle('Nickname')
					.setAuthor(BOT.user.username, BOT.user.avatarURL)
					.setColor(0x64FFDA)
					.setDescription('The command ``nick` is only available in guilds (servers)')
					.setFooter(embedFooter)
					.addBlankField(false)
					.setThumbnail(commandDictionary[key].icon);
				message.channel.stopTyping();
				message.channel.send({embed});  
				return;
			} else {
				if (args[0] == undefined) {
					nickToggle(message, results, nicknameToggleState, nickname);
					return;
				} else {
					switch(args[0]) {
						case 'toggle':
							nickToggle(message, results, nicknameToggleState, nickname);
							return;
						case '1':
							nickOne(message, results, nicknameToggleState, nickname);
							return;	
						case '2':
							nickTwo(message, results, nicknameToggleState, nickname);
							return;		
						case 'set':
							if (args[1] != 1 && args[1] != 2) {
								message.channel.startTyping();
								const embed = new DISCORD.RichEmbed()
									.setTitle('Nickname')
									.setAuthor(BOT.user.username, BOT.user.avatarURL)
									.setColor(0x64FFDA)
									.setDescription('Please specify a slot to save in.```**Usage:** `nick set [1 OR 2] [name]```')
									.setFooter(embedFooter)
									.addBlankField(false)
									.setThumbnail(commandDictionary[key].icon);
								message.channel.stopTyping();
								message.channel.send({embed});
								return;

							}
							if (args[2] == '' || args[2] == undefined || args[2] == null) {
								//return embed
								message.channel.startTyping();
								const embed = new DISCORD.RichEmbed()
									.setTitle('Nickname')
									.setAuthor(BOT.user.username, BOT.user.avatarURL)
									.setColor(0x64FFDA)
									.setDescription('Please specify a nickname to save.```**Usage:** `nick set [1 OR 2] [name]```')
									.setFooter(embedFooter)
									.addBlankField(false)
									.setThumbnail(commandDictionary[key].icon);
								message.channel.stopTyping();
								message.channel.send({embed});
								return;
							}
							switch(args[1]) {
								case '1':
									//run function to set name 1
									//`nick_set_1_
									sqldb.query("UPDATE user SET nicknameOne = " + MYSQL.escape(message.content.substr(12)) + " WHERE userID = " + message.author.id, function (err, results, fields) {
                  if (err) throw err;
									//return embed
									message.channel.startTyping();
									const embed = new DISCORD.RichEmbed()
										.setTitle('Nickname')
										.setAuthor(BOT.user.username, BOT.user.avatarURL)
										.setColor(0x64FFDA)
										.setDescription('The nickname *' + message.content.substr(12) + '* has been saved in nickname slot 1.')
										.setFooter(embedFooter)
										.addBlankField(false)
										.setThumbnail(commandDictionary[key].icon);
									message.channel.stopTyping();
									message.channel.send({embed}); 
									return;
                });
									return;
								case '2':
									//run function to set name 2
									//`nick_set_2_
									sqldb.query("UPDATE user SET nicknameTwo = " + MYSQL.escape(message.content.substr(12)) + " WHERE userID = " + message.author.id, function (err, results, fields) {
                  if (err) throw err;
									//return embed
									message.channel.startTyping();
									const embed = new DISCORD.RichEmbed()
										.setTitle('Nickname')
										.setAuthor(BOT.user.username, BOT.user.avatarURL)
										.setColor(0x64FFDA)
										.setDescription('The nickname *' + message.content.substr(12) + '* has been saved in nickname slot 2.')
										.setFooter(embedFooter)
										.addBlankField(false)
										.setThumbnail(commandDictionary[key].icon);
									message.channel.stopTyping();
									message.channel.send({embed}); 
									return;
                });
									return;
								//error due to not specifying number
									message.channel.startTyping();
									const embed = new DISCORD.RichEmbed()
										.setTitle('Nickname')
										.setAuthor(BOT.user.username, BOT.user.avatarURL)
										.setColor(0x64FFDA)
										.setDescription('Please be sure to specify which slot to save to.````nick set [1 OR 2]```')
										.setFooter(embedFooter)
										.addBlankField(false)
										.setThumbnail(commandDictionary[key].icon);
									message.channel.stopTyping();
									message.channel.send({embed}); 
									return;
							}
      		}
    		}				
			}
		});
				
		function nickOne(message, results, nicknameToggleState, nickname) {
			debugLog('Runs fn nickOne');
			debugLog('recognizes toggle state as ' + nicknameToggleState);
			nickname = results[0].nicknameOne;
			debugLog('nickname1 is ' + results[0].nicknameOne);
			message.member.setNickname(nickname).then(function(value) {
				debugLog('setting nickname');
        //succsess
				message.channel.startTyping();
				const embed = new DISCORD.RichEmbed()
					.setTitle('Nickname')
					.setAuthor(BOT.user.username, BOT.user.avatarURL)
					.setColor(0x64FFDA)
					.setDescription('Your nickname has been updated to ***' + nickname + '***')
					.setFooter(embedFooter)
					.addBlankField(false)
					.setThumbnail(commandDictionary[key].icon);
				message.channel.stopTyping();
				message.channel.send({embed});
				return;
      }, function(reason) {
       	//error because didn't have permission
				message.channel.startTyping();
				const embed = new DISCORD.RichEmbed()
					.setTitle('Nickname')
					.setAuthor(BOT.user.username, BOT.user.avatarURL)
					.setColor(0x64FFDA)
					.setDescription('The command ``nick` is unavailable for users with permissions/roles higher than ' + BOT.user.username)
					.setFooter(embedFooter)
					.addBlankField(false)
					.setThumbnail(commandDictionary[key].icon);
				message.channel.stopTyping();
				message.channel.send({embed});        
			});
				//change the toggle number
				sqldb.query("UPDATE user SET nicknameToggle = 1 WHERE userID = " + message.author.id, function (err, results, fields) {
					debugLog('nickname toggled');
				});
		}
		
		function nickTwo(message, results, nicknameToggleState, nickname) {
			debugLog('Runs fn nickTwo');
			debugLog('recognizes toggle state as ' + nicknameToggleState);
			nickname = results[0].nicknameTwo;
			debugLog('nickname1 is ' + results[0].nicknameTwo);
			message.member.setNickname(nickname).then(function(value) {
				debugLog('setting nickname');
        //succsess
				message.channel.startTyping();
				const embed = new DISCORD.RichEmbed()
					.setTitle('Nickname')
					.setAuthor(BOT.user.username, BOT.user.avatarURL)
					.setColor(0x64FFDA)
					.setDescription('Your nickname has been updated to ***' + nickname + '***')
					.setFooter(embedFooter)
					.addBlankField(false)
					.setThumbnail(commandDictionary[key].icon);
				message.channel.stopTyping();
				message.channel.send({embed});
				return;
      }, function(reason) {
       	//error because didn't have permission
				message.channel.startTyping();
				const embed = new DISCORD.RichEmbed()
					.setTitle('Nickname')
					.setAuthor(BOT.user.username, BOT.user.avatarURL)
					.setColor(0x64FFDA)
					.setDescription('The command ``nick` is unavailable for users with permissions/roles higher than ' + BOT.user.username)
					.setFooter(embedFooter)
					.addBlankField(false)
					.setThumbnail(commandDictionary[key].icon);
				message.channel.stopTyping();
				message.channel.send({embed});        
			});
				//change the toggle number
				sqldb.query("UPDATE user SET nicknameToggle = 0 WHERE userID = " + message.author.id, function (err, results, fields) {
					debugLog('nickname toggled');
				});
		}
		
    function nickToggle(message, results, nicknameToggleState, nickname) {
			//Switch between two usernames
			try {
				debugLog('try to toggle');
				if (nicknameToggleState == 0) {
					debugLog('try to run fn nickOne()');
					nickOne(message, results, nicknameToggleState, nickname);
				} else if (nicknameToggleState == 1) {
					debugLog('try to run fn nickTwo()');
					nickTwo(message, results, nicknameToggleState, nickname);
				}          
			}        
			catch(err) {
				message.channel.startTyping();
				const embed = new DISCORD.RichEmbed()
					.setTitle('Nickname')
					.setAuthor(BOT.user.username, BOT.user.avatarURL)
					.setColor(0x64FFDA)
					.setDescription('The command ``nick` is unavailable for users with permissions/roles higher than ' + BOT.user.username)
					.setFooter(embedFooter)
					.addBlankField(false)
					.setThumbnail(commandDictionary[key].icon);
				message.channel.stopTyping();
				message.channel.send({embed});   
				return;
			}
		}
    

  }
};
commandDictionary['image'] = {
  type: 'user',
  emoji: ':busts_in_silhouette: ',  //put space after emoji 
  error: 'Use the command like this: `image [link to PNG or JPG image]',
  usage: '**Usage:** `image [link to PNG or JPG image]',
  doCommand: function(message, key, args, embedFooter) {
		
		if (args[0] == undefined || args[0] == null || args[0] == '') {
			errorUsage(message, key, embedFooter);
			return;
		}
		//`image_
		var imagePath = message.content.substr(7);
		
		jimp.read(imagePath, function (err, profileBackground) {
			try {
				profileBackground.cover(200, 50)
				.write('./userContent/userBackground/profile-image-' + message.author.id + '.jpg');
				message.channel.startTyping();
				
				sqldb.query("UPDATE user SET userBackground = " + MYSQL.escape('./userContent/userBackground/profile-image-' + message.author.id + '.jpg') + " WHERE userID = " + message.author.id, function (err, results, fields) {
					if (err) throw err;
					const embed = new DISCORD.RichEmbed()
						.setTitle('Profile Image')
						.setAuthor(BOT.user.username, BOT.user.avatarURL)
						.setColor(0x64FFDA)
						.setDescription('Your profile background image has been sucsessfully updated.')
						.setFooter(embedFooter)
						.addBlankField(false)
						.setThumbnail(commandDictionary[key].icon)
						.setImage(imagePath);
					message.channel.stopTyping();
					message.channel.send({embed});
					return;
				}); 
			} catch(err) {
				message.channel.startTyping();
				const embed = new DISCORD.RichEmbed()
					.setTitle('Profile Image')
					.setAuthor(BOT.user.username, BOT.user.avatarURL)
					.setColor(0x64FFDA)
					.setDescription('The image linked to was either not found or in an incorrect format.\nBe sure to use an image hosted on the internet, not a local image.\nTry using the link found by right-clicking the image and selecting \'copy image address\' from the drop-down menu in your web browser.')
					.setFooter(embedFooter)
					.addBlankField(false)
					.setThumbnail(commandDictionary[key].icon);
				message.channel.stopTyping();
				message.channel.send({embed});
				return;
			}	
		});
		//check if link is a png (maybe run it through jimp?)
		//if error say the image is not the correct format
		//no error save image to database
		//database slot is userBackground
		
	}	
};
commandDictionary['rep'] = {
	type: 'user',
	emoji: ':thumbsup: ',
	error: 'Use the command like this: `rep [@user]',
	usage: '**Usage** `rep [@user]',
	doCommand: function(message, key, args, embedFooter) {
		var findDate = Date(parseInt(message.createdTimestamp)).toLocaleString();
		debugLog(findDate); 
				
		sqldb.query("SELECT * FROM user WHERE userID = " + message.author.id, function (err, results, fields) {
			var repLastDate = results[0].repLastDate;
			var mention = message.mentions.users.array();
			//Wed Dec 27 2017 16:01:11 GMT-0500 (EST)	
			//check if args[0] is a valid user
			if (mention.length == 1) {
				if (mention[0].id != message.author.id) {
				
					//check if author gave rep same day as current day
					if (repLastDate.substr(0, 15) != findDate.substr(0, 15)) {
						debugLog('|'+repLastDate.substr(0, 15) + '|    VS    |' + findDate.substr(0, 15) + '|');
						//give rep to mentioned user
						sqldb.query("UPDATE user SET reputation = reputation + 1 WHERE userID = " + mention[0].id, function (err, results, fields) {
							//update repLastDate
							sqldb.query("UPDATE user SET repLastDate = " + MYSQL.escape(findDate) + " WHERE userID = " + message.author.id, function (err, results, fields) { 
								//Give sucsess message
								message.channel.startTyping();
								const embed = new DISCORD.RichEmbed()
									.setTitle('Reputation')
									.setAuthor(BOT.user.username, BOT.user.avatarURL)
									.setColor(0x64FFDA)
									.setDescription('You awarded 1 reputation point to ' + mention[0].username)
									.setFooter(embedFooter)
									.addBlankField(false)
									.setThumbnail(commandDictionary[key].icon);
								message.channel.stopTyping();
								message.channel.send({embed});
							});
						});
						
					} else {
						//error (only use once a day)
						message.channel.startTyping();
						const embed = new DISCORD.RichEmbed()
							.setTitle('Reputation')
							.setAuthor(BOT.user.username, BOT.user.avatarURL)
							.setColor(0x64FFDA)
							.setDescription('You may only award reputation once a day')
							.setFooter(embedFooter)
							.addBlankField(false)
							.setThumbnail(commandDictionary[key].icon);
						message.channel.stopTyping();
						message.channel.send({embed});							
					}

				} else {
					//error  (can't give self rep)
					message.channel.startTyping();
					const embed = new DISCORD.RichEmbed()
						.setTitle('Reputation')
						.setAuthor(BOT.user.username, BOT.user.avatarURL)
						.setColor(0x64FFDA)
						.setDescription('You are unable to award yourself reputation points')
						.setFooter(embedFooter)
						.addBlankField(false)
						.setThumbnail(commandDictionary[key].icon);
					message.channel.stopTyping();
					message.channel.send({embed});
					return;
				}

			} else {
				errorUsage(message, key, embedFooter);
			}
		});
	}
};
commandDictionary['profile'] = {
	type: 'user',
  timeout: 0,
	emoji: ':robot: ',
  error: 'Use the command like this: `profile',
  usage: '**Usage:** `profile',
	doCommand: function(message, key, args, embedFooter) {
		//if there is no first argument
		message.channel.startTyping();
		debugLog('Starting command');
		var attachment = '';
		var mention = message.mentions.users.array();
		var target = message.author;
		debugLog('Metions: ' + mention);
		debugLog('Target: ' + target);
		debugLog('args[0]: ' + args[0]);
		//check if args[0] is a valid user
		if (args[1] != undefined) {
			errorUsage(message, key, embedFooter)
			message.channel.stopTyping();
			return;
		} else if (mention.length == 1 && args[0].replace('!', '') == mention[0]) {
			debugLog('args[0] (after edit): ' + args[0].replace('!', ''));
			debugLog('args[0] is equal to a valid user');
			target = mention[0];
		} else if (args[0] != undefined) {
			debugLog('args[0] is NOT equal to a valid user');
			errorUsage(message, key, embedFooter);
			message.channel.stopTyping();
			return;	
		}
		debugLog('attempt to generate profile card');
			JIMPFUNCTIONS.profile(jimp, 
														message, 
														key, 
														args,
														emoji.dino,
														attachment,
														sqldb,
														target);	
	}
};
commandDictionary['tag'] = {
	type: 'user',
	timeout: 0,
	emoji: ':robot: ',
	error: 'Use the command like this: `tag [your tagline here]',
	usage: '**Usage** `tag [your tagline here]',
	doCommand: function(message, key, args, embedFooter) {
		var taglineInput = message.content.substr(5);
		if (taglineInput != '' && taglineInput != ' ') {
			//mysql will save up to 42 characters
			if (taglineInput.length > 40) {
				//error; message too long
				message.channel.startTyping();
				const embed = new DISCORD.RichEmbed()
					.setTitle('Tagline')
					.setAuthor(BOT.user.username, BOT.user.avatarURL)
					.setColor(0x64FFDA)
					.setDescription('The tagline must be shorter than 40 characters.')
					.setFooter(embedFooter)
					.addBlankField(false)
					.setThumbnail(commandDictionary[key].icon);
				message.channel.stopTyping();
				message.channel.send({embed});
				return;
			} else {
				//save message
				sqldb.query("UPDATE user SET tagline = " + MYSQL.escape(taglineInput) + " WHERE userID = " + message.author.id, function (err, results, fields) {
					//sucsess message
					message.channel.startTyping();
					const embed = new DISCORD.RichEmbed()
						.setTitle('Tagline')
						.setAuthor(BOT.user.username, BOT.user.avatarURL)
						.setColor(0x64FFDA)
						.setDescription('Your tagline has been saved.\n\n*"' + taglineInput + '"*')
						.setFooter(embedFooter)
						.addBlankField(false)
						.setThumbnail(commandDictionary[key].icon);
					message.channel.stopTyping();
					message.channel.send({embed});
					return;
				});
			}
		} else {
			errorUsage(message, key, embedFooter);
		}
	}
}
commandDictionary['desc'] = {
	type: 'user',
	timeout: 0,
	emoji: ':robot: ',
	error: 'Use the command like this: `desc [your mini-bio here]',
	usage: '**Usage** `desc [your mini-bio here]',
	doCommand: function(message, key, args, embedFooter) {
		var descriptionInput = message.content.substr(6);
		if (descriptionInput != '' && descriptionInput != ' ') {
			//mysql will save up to 126 characters
			if (descriptionInput.length > 125) {
				//error; message too long
				message.channel.startTyping();
				const embed = new DISCORD.RichEmbed()
					.setTitle('Personal Description')
					.setAuthor(BOT.user.username, BOT.user.avatarURL)
					.setColor(0x64FFDA)
					.setDescription('Your personal description must be shorter than 125 characters.')
					.setFooter(embedFooter)
					.addBlankField(false)
					.setThumbnail(commandDictionary[key].icon);
				message.channel.stopTyping();
				message.channel.send({embed});
				return;
			} else {
				//save message
				sqldb.query("UPDATE user SET description = " + MYSQL.escape(descriptionInput) + " WHERE userID = " + message.author.id, function (err, results, fields) {
					//sucsess message
					message.channel.startTyping();
					const embed = new DISCORD.RichEmbed()
						.setTitle('Personal Description')
						.setAuthor(BOT.user.username, BOT.user.avatarURL)
						.setColor(0x64FFDA)
						.setDescription('Your personal description has been saved.\n\n*"' + descriptionInput + '"*')
						.setFooter(embedFooter)
						.addBlankField(false)
						.setThumbnail(commandDictionary[key].icon);
					message.channel.stopTyping();
					message.channel.send({embed});
					return;
				});
			}
		} else {
			errorUsage(message, key, embedFooter);
		}
	}
}
commandDictionary['monster'] = {
	type: 'dnd',
	timeout: 0,
	emoji: emoji.monster,
	error: 'Use the command like this: `monster',
	usage: '**Usage** `monster',
	doCommand: function(message, key, args, embedFooter) {
		//`monster [search || s]
		//return list of possible monsters
		
		//`monster [search || s] [tag tag tag]
		//return list of possible monsters with tags
		
		//`monster [monster name]
		//return specific monster information
		
		//monster [random || r]
		//return information for random monster
		
		//check for arg
		if (args[0] == undefined) {
			//if no args[0] return usageError
			errorUsage(message, key, embedFooter);
			return;
		} else {
			//start command
			message.channel.startTyping();
			//check what args[0] is
			switch(args[0]) {
				case 'search':
				case 's':
					//`monster [search || s]
					//`monster [search || s] [tag tag tag]
					debugLog('`monster [search || s] detected');
					message.channel.stopTyping();
					return;
				case 'random':
				case 'r':
					//monster [random || r]
					debugLog('`monster [random || r] detected');
					message.channel.stopTyping();
					return;	
			}
						
			//if args[0] is not caught by the switch, run it as a monster name
			//`monster [monster name]
			var monsterName = args.join('-');
			debugLog('MONSTER NAME IS: ' + monsterName);
			MONSTER.specific(message, key, SCRAPEIT, monsterName);
				
				
		}
		
	}
}
commandDictionary['mon2'] = {
  timeout: 0,
  icon: 'https://github.com/Silver0034/dinoBot/blob/master/assets/icons/MonsterIcon.png?raw=true',
	emoji: ':man_dancing: ',
  error: 'Use the command like this: `monster [monster name]',
  usage: '**Usage:** `monster [monster name]',
  doCommand: function(message, key, args, embedFooter) {
    message.channel.startTyping();
    const embed = new DISCORD.RichEmbed()
          .setAuthor(BOT.user.username, BOT.user.avatarURL)
          .setColor(0x64FFDA)
          .setThumbnail(commandDictionary[key].icon)
          .setFooter("© 2017 D&D Beyond | Scraped by " + BOT.user.username + '™', commandDictionary[key].icon);
    //if args not defined
    if (args == '' || args == undefined || args == null) {
    //return error message
      embed
      .setTitle('Incorrect Format')
      .setDescription('There was no monster specified')
      .addField('*Please Specify a Monster*', '```'+ commandDictionary[key].usage + '```')
      .addField('*Please Note:*', 'This command only works with monsters found in the "basic rules" posted on D&D Beyond');
      message.channel.stopTyping();
      message.channel.send({embed});
    } else {      
      var scrapeInput = args.join('-');
      console.log(scrapeInput);

      message.channel.startTyping();          

      var scrapeURL = "https://www.dndbeyond.com/monsters/";
      scrapeURL = scrapeURL + scrapeInput;        

			try {
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
        statsTitle: {
          listItem: ".title",
        },
        statsDescription: {
          listItem: ".description",
        },
        strong: {
          listItem: "strong",
        },
        strong: {
          listItem: "strong",
        },
        moreInfoContent: {
          selector: ".more-info-content",
          how: "html"
        },
        moreInfoPlain: {
          selector: ".more-info-content"
        },
        monsterImage: {
          selector: ".monster-image",
          attr: "src"
        },
        errorPageTitle: {
          selector: ".error-page-title",
          how: "text"
        },
    },
      (err, page) => {
      //console.log(err);

      if (page.errorPageTitle == 'Page Not Found') {
        const embed = new DISCORD.RichEmbed()
          .setTitle('Monster Not Found')
          .setAuthor(BOT.user.username, BOT.user.avatarURL)
          .setColor(0x64FFDA)
          .setDescription('The Monster you searched for is not on D&D Beyond.')
          .setFooter("© 2017 D&D Beyond | Scraped by " + BOT.user.username + '™', "commandDictionary[key].icon")
          .setImage('https://static-waterdeep.cursecdn.com/1-0-6519-15606/Skins/Waterdeep/images/errors/404.png')
          .setThumbnail(commandDictionary[key].icon);
        message.channel.stopTyping();
        message.channel.send({embed});
        return;
      }

      var abilityScoreArray = page["abilityScore"];
      var abilityModifierArray = page["abilityModifier"];
      var quickPrimaryArray = page["quickPrimary"];
      var quickSecondaryArray = page["quickSecondary"];
      var statsTitle = page["statsTitle"];
      var statsDescription = page["statsDescription"];
      var strongArray = page["strong"];
      var moreInfoContent = page["moreInfoContent"] + "";

      var proficiencyValue = '';
      var featsLoopArray = moreInfoContent.split('Actions\r\n');
      var featsLoopPlaceholder = featsLoopArray[0];
      var featsValueArray = [];
      var featsValueString = '';
      var actionsValueArray = [];
      var actionsValueString = '';
      var monsterImageURL = page.monsterImage;


      if (page.monsterImage == undefined) {
        const embed = new DISCORD.RichEmbed()
          .setTitle('Monster Not Available')
          .setAuthor(BOT.user.username, BOT.user.avatarURL)
          .setColor(0x64FFDA)
          .setDescription('I only have acsess to monsters defined by the "basic rules"')
          .setFooter("© 2017 D&D Beyond | Scraped by " + BOT.user.username + '™', "commandDictionary[key].icon")
          .setThumbnail(commandDictionary[key].icon);
        message.channel.stopTyping();
        message.channel.send({embed});
        return;
      }

      if (page.monsterImage.includes('https:') == false) {
        monsterImageURL = 'https:' + page.monsterImage;
      }

      var quickContent = [];

      for (q = 0; q < page.quickPrimary.length; q++) {
        if (page.quickSecondary[q]) {
          quickContent[q] = page.quickPrimary[q] + ' ' + page.quickSecondary[q];
        } else {
          quickContent[q] = page.quickPrimary[q];
        }

      }

      //This is how many fields are defined in the const
      var fieldCount = 2;
      const embed = new DISCORD.RichEmbed()
        .setTitle(page["title"])
        .setAuthor(BOT.user.username, BOT.user.avatarURL)
        .setColor(0x64FFDA)
        .setDescription(page["descShort"])
        .setFooter("© 2017 D&D Beyond | Scraped by " + BOT.user.username, "commandDictionary[key].icon")
        .setImage(monsterImageURL)
        .setThumbnail(commandDictionary[key].icon)
        .setURL(scrapeURL)
        //Abilities Section          
        .addField("__**Abilities**__",
                  emoji.str + " **" + page.statsTitle[0] + "**: " + page.abilityScore[0] + page.abilityModifier[0] +
                  "  " + emoij.dex + " **" + page.statsTitle[1] + "**: " + page.abilityScore[1] + page.abilityModifier[1] +
                  "  " + emoij.con + " **" + page.statsTitle[2] + "**: " + page.abilityScore[2] + page.abilityModifier[2] + '\n' +
                  emoij.int + " **" + page.statsTitle[3] + "**: " + page.abilityScore[3] + page.abilityModifier[3] +
                  "  " + emoij.wis + " **" + page.statsTitle[4] + "**: " + page.abilityScore[4] + page.abilityModifier[4] +
                  "  " + emoij.cha + " **" + page.statsTitle[5] + "**: " + page.abilityScore[5] + page.abilityModifier[5]
                  , false)
        //Secondary Information
        .addField("__**Secondary Stats**__",
                 "**" + page.statsTitle[6] + "**: " + quickContent[0] + "\n" +
                 "**" + page.statsTitle[7] + "**: " + quickContent[1] + "\n" +
                 "**" + page.statsTitle[8] + "**: " + quickContent[2] + "\n" +
                 "**" + page.statsTitle[9] + "**: " + quickContent[3]
                 , false);

      //Proficiency Fields
      for (i = 0; i < page.statsDescription.length; i++) { 
        z = i + 10;
        proficiencyValue += '**' + page.statsTitle[z] + '**: ' + page.statsDescription[i] + "\n"
      }
      embed.addField("__**Proficiencies**__", proficiencyValue, false);
      fieldCount++;


      //Handles page.moreInfoContent
      var $ = CHEERIO.load(page.moreInfoContent);
      var paragraph = '';
      var lineArray = [];
      var lineSections = [];
      loopParagraph:
        for (i = 0; i < $('p').length; i++) {

          paragraph = $('p').eq(i).html();

          //split each paragraph by line breaks
          lineArray = paragraph.split('<br>');
          //for each line in the paragraph
          loopLine:
            for (j = 0; j < lineArray.length; j++) {
              //check field number
              if (fieldCount > 24) { 
              embed.addField('More at D&D Beyond', 'There is more to this monster. Go to the link above for all of its information.', false);
              fieldCount++;
              break loopParagraph;
              }
              if (lineArray[j].includes('</strong>')) {
                lineSections = lineArray[j].split('</strong>');
                lineSections[0] = lineSections[0].replace('<strong>', '**').replace('.', ':**');
                lineSections[1] = '<div class=cheerioLoad>' + lineSections[1] + '</div>';
                var lineSectionsCheerio = CHEERIO.load(lineSections[1]);
                lineSections[1] = lineSectionsCheerio('.cheerioLoad').text();
                lineSections[0] = '<div class=cheerioLoad>' + lineSections[0] + '</div>';
                lineSectionsCheerio = CHEERIO.load(lineSections[0]);
                lineSections[0] = lineSectionsCheerio('.cheerioLoad').text();
                //check to make sure it isn't too long
                if (lineSections[0].length > 1024) {
                  lineSections[1] = lineSections[1].substring(1023) + '…';
                }
                //make sure nothing went wrong
                if (lineSections.length == 2) {
                  //Create Field
                  embed.addField(lineSections[0], lineSections[1], false);
                  fieldCount++; 
                } 
              }             
            }
      }
      message.channel.stopTyping();
      message.channel.send({embed});
      return;
    });
			}
			catch(err) {
				  const embed = new DISCORD.RichEmbed()
          .setTitle('Monster Not Found')
          .setAuthor(BOT.user.username, BOT.user.avatarURL)
          .setColor(0x64FFDA)
          .setDescription('The Monster you searched for is not on D&D Beyond.')
          .setFooter("© 2017 D&D Beyond | Scraped by " + BOT.user.username + '™', "commandDictionary[key].icon")
          .setThumbnail(commandDictionary[key].icon);
        message.channel.stopTyping();
        message.channel.send({embed});
        return;
			}
    }
  }
};


//Connect to Database
sqldb.connect(function(err) {
    if (err) throw err;
    console.log('Connected to the MYSQL Database');
});

//Connect to Discord
// only reacts to Discord _after_ ready is emitted
BOT.on('ready', () => {
  console.log('Connected to Discord Severs');
});
//try to handle rejections
process.on('unhandledRejection', console.error);

// Create an event listener for messages
BOT.on('message', message => {  
  var messageContent = message.content;
  var messageArguments = message.content.substring(1).split(' ');
  var key = messageArguments[0].toLowerCase();
  var args = messageArguments.slice(1);
  var userID = message.author.id;
  
  //Constants that have dependencies
  const embedFooter = BOT.user.username + '™ | Discord.js Bot by Lodes Deisgn';
  
   //delete BOT messages that say to slow down   
  if (message.author.bot && messageContent.includes('Slow down, you\'re scaring me!')) {
    message.delete(6000); //deletes message
    return;
  }
  //stop message from being processed
  //if from a BOT
  if (message.author.bot) { return; }
  
  //if user sends a message
  sqldb.query("INSERT INTO user (userID, username, lastSeen, messagesSent) VALUES (" + userID + ", " + MYSQL.escape(message.author.username) + ", '" + new Date(parseInt(message.createdTimestamp)).toLocaleString() + "', " + "1" + ")" + 
              "ON DUPLICATE KEY UPDATE messagesSent = messagesSent + 1, lastSeen = '" + new Date(parseInt(message.createdTimestamp)).toLocaleString() + "'", function (err, results, fields) {
    if (err) throw err;
    //console.log(results);
  });
	
  //console.log(message.author.username + ' updated in database');
  //message processing
	if (message.guild) { //checks if in guild or a DM
		//record message content
  	//note: does not account for daylight savings time
		sqldb.query("INSERT INTO messages (messageID, userID, guildID, channelID, date, content) VALUES (" +
		  message.id  + ", " + message.author.id + ", " + message.guild.id + ", " + message.channel.id + "," +
			"'" + new Date(parseInt(message.createdTimestamp)).toLocaleString() + "', " + MYSQL.escape(message.content) + ")", function (err, results, fields) {
			if (err) throw err;
			//console.log(results);
			//console.log('Logged message by ' + message.author.username);
		});
  //add new channels to channel database
		sqldb.query("INSERT INTO channel (channelID, channelName, serverID) VALUES (" +
			message.channel.id  + ", " + MYSQL.escape(message.channel.name) + ", " + message.guild.id + ")" +
			"ON DUPLICATE KEY UPDATE channelName = " + MYSQL.escape(message.channel.name), function (err, results, fields) {
			if (err) throw err;
			//console.log(results);
			//console.log('Edited channel table: ' + message.channel.name);
		});
		//if message is in PROFANITY enabled channel
		sqldb.query("SELECT * FROM channel WHERE channelID = " + message.channel.id + " AND profanityMonitor = 1", function (err, results, fields) {
			if (err) throw err;
			if (results.length == 1) {PROFANITY.filter(message, emoji.dino, getTime, getDate, userID);}
		}); 
	} else {
		PROFANITY.filter(message, emoji.dino, getTime, getDate, userID);
	}
  //listen for the ` to start a command
  //the BOT only responds with things inside this if
  //if I want the BOT to display something write it in here
  if (messageContent.substring(0, 1) === '`' || messageContent.substring(0, 1) === '\'') {
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
      commandDictionary[key].doCommand(message, key, args, embedFooter);
      timeout(key, userID);
      return;      
    }
    else {
      //TODO: Consider sending the help message
      //console.log(getTime(), message.author.username + " used an unrecognized command input");
      return;    
    }
  }
  if (message.isMentioned(BOT.user)) {
    message.channel.send(emoji.dino + ROAR.generate());     
  }    
  //stop message from being processed
  //if from a BOT
  if (message.author.BOT) { return; }  

});

//define token in the login function
BOT.login(TOKEN);
