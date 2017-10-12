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
var rps = require('./commandFunctions/rps.js');
var rpg = require('./commandFunctions/rpg.js');
var jQuery = require('./jquery-3.2.1.min.js');
var Jimp = require('jimp');
var jimpFunctions =  require('./commandFunctions/jimp.js');

//establish global variables and constants
const TOKEN = tokenReturn.return();
const MYSQLCRED = tokenReturn.sqlCredentials;
//make sure to put a space after. Ex:':smile: '
const emojiDino = '<:sauropod:355738679211327488> ';
var timedOutUsers = new Array();
var sqldb = mysql.createConnection(MYSQLCRED);
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
  return emojiDino + ' ' + roar.generate() + ' *(Slow down, you\'re scaring me!)*  :no_entry_sign:';
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

//dictionary for all commands and information
var commandDictionary = new Object();
commandDictionary['8ball'] = {
  emoji: ':8ball: ', //put space after emoji 
  error: 'Use the command like this: `8ball [question]',
  usage: '**Usage:** `8ball [question]',
  doCommand: function(message, key, args) {
    if (args[0]) {
      message.channel.send(responseHead(message, key) + ball.generate());
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
    message.channel.send(responseHead(message, key) + roar.generate() + ' ' + roar.generate() + helpMessageBody + '*Do not include brackets' + ' [] ' + 'while using commands*');
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
    if (args[0] === undefined || args[0] === '' || args[0] == bot.user) {
    	message.channel.send(error(key));
      return;
    } else {
      message.channel.send(responseHead(message, key) + args[0] + attack.generate());
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
      message.channel.send(emojiDino + roar.generate() + ' ' + roar.generate() + ' *(Hi ' + message.author.username + ')*');
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
      message.channel.send(emojiDino + roar.generate() + ' ' + roar.generate() + ' *(Pong!)*');
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
      message.channel.send(responseHead(message, key) + quote.generate());
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
      message.channel.send(responseHead(message, key) + 'I think ' + args[0] + ' tastes ' + taste.generate());
      return;
    }
  }
};
commandDictionary['say'] = {
  timeout: 0,
  error: 'Use the command like this: `say [message]',
  usage: '**Usage:** `say [message]',
  doCommand: function(message, key, args) {
    var sayMessage = emojiDino + message.content.substring(5);     
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
    //input: profanity nofilter
    //input: profanity filter
    if(message.author.id == message.guild.owner.id) {
      switch(args[0]) {
        case 'profanity':
          if (args[1] == 'nofilter') {
          	//remove profanity filter from channel
          	sqldb.query("UPDATE channel SET profanityMonitor = 0 WHERE channelID = " + message.channel.id, function (err, results, fields) {
  						if (err) throw err;
              console.log(results);
      			});
            console.log('Removed profanity filter from channel ' + message.channel.name);
            message.channel.send(responseHead(message, key) + 'The profanity filter has been removed from this channel.');
      		} else if (args[1] == 'filter') {
          	//add profanity filter from channel
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
      message.channel.send(emojiDino + 'You do not have access to this command.');
      return;
    }
  }
};
commandDictionary['rps'] = {
  emoji: ':cop: ',
  error: 'Use the command like this: `rps',
  usage: '**Usage** `rps [rock OR paper OR scissors]',
  doCommand: function(message, key, args) {               
		var rpsMessage = emojiDino + 'I choose **';
		var rpsWin = '*You win.*';
		var rpsLoose = '*You loose!*';
		var rpsTie = '*We tie.*'
		//check for correct input
		switch(args[0]) {
			case 'rock':
				rpsResult = rps.generate();
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
				rpsResult = rps.generate();
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
				rpsResult = rps.generate();
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
			case 'name':
        message.channel.send(responseHead(message, key) + rpg.name());
				return;
			case 'characteristic':
        message.channel.send(responseHead(message, key) + 'The character ' + rpg.characteristics() + '.');
				return;
			case 'bond':
        message.channel.send(responseHead(message, key) + 'The character is driven by ' + rpg.bonds() + '.');
				return;
			case 'flaw':
        message.channel.send(responseHead(message, key) + 'The character\'s flaw is ' + rpg.flaws() + '.');
				return;
			case 'npc':
        message.channel.send(responseHead(message, key) + rpg.name() + ' is ' + rpg.flavor() + ' that ' + rpg.characteristics() + ', is plagued by ' + rpg.flaws() + ', and is driven by ' + rpg.bonds() + '.');
				return;
      case 'conditions':
			case 'con':
			case 'c':
				if (rpg.rpgConditions[args[1]]) {
					var rpgConditionTitle = args[1].charAt(0).toUpperCase() + args[1].slice(1);
          message.channel.send({embed: {
						color: 0x64FFDA,
						author: {
							name: bot.user.username,
							icon_url: bot.user.avatarURL
						},
						title: rpgConditionTitle,
						description: "Note: this condition is for Dungeons and Dragons 5e.\n",
						fields: [
							{
								name: 'Description',
								value: rpg.rpgConditions[args[1]].desc,
							}
						],
						footer: {
								text: bot.user.username + ' | RPG Assistant'
						}
					}});
					return;
				} else {
          message.channel.send({embed: {
						color: 0x64FFDA,
						author: {
							name: bot.user.username,
							icon_url: bot.user.avatarURL
						},
						title: 'Conditions',
						description: "Note: these conditions are for Dungeons and Dragons 5e.\n",
						fields: [
							{
								name: 'Options',
								value:  rpg.conditionList(),
							},
							{
								name: 'Usage:',
								value: 'Type "`rpg condition" and then the condition you wish to learn more about.'
							}
						],
						footer: {
								text: bot.user.username + ' | RPG Assistant'
						}
					}});
					return;
				}
				break;
		}
		if (args[0] == null || args[0] == undefined) {
      message.channel.send(error(key) + '\n Options: name, character');
			return;
		} else {
      message.channel.send(responseHead(message, key) + 'Possible RPG commands are name, characteristic, bond, flaw, npc');
			return; 
		}
  }
};
commandDictionary['profile'] = {
  timeout: 0,
  error: 'Use the command like this: `profile',
  usage: '**Usage:** `profile',
  doCommand: function(message, key, args) {
		var userBackground = Jimp.read('./assets/userBackground/default.png');
		message.channel.startTyping();
    var attachment = '';
		jimpFunctions.profile(Jimp, 
													message, 
													key, 
													args,
												 	emojiDino,
												 	attachment);				
    return;
	}
};
/*
commandDictionary['dex'] = {
  timeout: '1',
  error: 'Use the command like this: `dex [thing]',
  usage: '**Usage:** `dex [thing]',
  doCommand: function(message, key, args) {
    var sayMessage = emojiDino + message.content.substring(5);     
    message.delete(0); //deletes message  
    if (!args[0]) {
    	message.channel.send(error(key));
      return;
    } else {    
      
      jQuery.get('https://www.pokemon.com/us/pokedex/bulbasaur', null, function(text){
        alert(jQuery(text).find('.pokemon-number'));
      });  
        
    }
  }
};
*/

//SQL Database stuffs
sqldb.connect(function(err) {
    if (err) throw err;
    console.log('Connected to the Database');
});


// only reacts to Discord _after_ ready is emitted
bot.on('ready', () => {
  console.log('Online and connected');
});
//try to handle rejections
process.on('unhandledRejection', console.error);

// Create an event listener for messages
bot.on('message', message => {  
  var messageContent = message.content;
  var messageArguments = message.content.substring(1).split(' ');
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
  
  //if user sends a message
  sqldb.query("INSERT INTO user (userID, username, lastSeen, messagesSent) VALUES (" + userID + ", " + mysql.escape(message.author.username) + ", '" + new Date(parseInt(message.createdTimestamp)).toLocaleString() + "', " + "1" + ")" + 
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
								"'" + new Date(parseInt(message.createdTimestamp)).toLocaleString() + "', " + mysql.escape(message.content) + ")", function (err, results, fields) {
			if (err) throw err;
			console.log(results);
			console.log('Logged message by ' + message.author.username);
		});
  //add new channels to channel database
		sqldb.query("INSERT INTO channel (channelID, channelName, serverID) VALUES (" +
								message.channel.id  + ", " + mysql.escape(message.channel.name) + ", " + message.guild.id + ")" +
								"ON DUPLICATE KEY UPDATE channelName = " + mysql.escape(message.channel.name), function (err, results, fields) {
			if (err) throw err;
			console.log(results);
			console.log('Edited channel table: ' + message.channel.name);
		});
		//if message is in profanity enabled channel
		sqldb.query("SELECT * FROM channel WHERE channelID = " + message.channel.id + " AND profanityMonitor = 1", function (err, results, fields) {
			if (err) throw err;
			if (results.length == 1) {profanity.filter(message, emojiDino, getTime, getDate, userID);}
		}); 
	} else {
		profanity.filter(message, emojiDino, getTime, getDate, userID);
	}
  //listen for the ` to start a command
  //the bot only responds with things inside this if
  //if I want the bot to display something write it in here
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
  if (message.isMentioned(bot.user)) {
    message.channel.send(emojiDino + roar.generate());     
  }    
  //stop message from being processed
  //if from a bot
  if (message.author.bot) { return; }  

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