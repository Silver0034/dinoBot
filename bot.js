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
const VALIDURL = require('valid-url');
// commandFunctions dependencies
const ATTACK = require('./commandFunctions/attack.js');
const BALL = require('./commandFunctions/ball.js');
const JIMPFUNCTIONS =  require('./commandFunctions/jimp.js');
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
//Standard Embed
function embed(title, author, avatar, color, footer, thumbnail, message, key) {
  message.channel.startTyping();
  const embed = new DISCORD.RichEmbed()
  //set title of embed
  if (title != '') {
    embed.setTitle(title)
  } else {
    if (key != undefined || key != null) {
      embed.setTitle(key) 
    } else {
      embed.setTitle('Title Not Found')
    }
  }
  //set author name
  if (author != '') {
    var embedAuthor = author;
  } else {
    var embedAuthor = BOT.user.username;
  }
  //set avatar name
  if (avatar != '') {
    var embedAvatar = avatar;
  } else {
    var embedAvatar = BOT.user.avatarURL;
  }
  //embed author and avatar
  embed.setAuthor(embedAuthor, embedAvatar);
  //set color
  if (color != '') {
    embed.setColor(color);
  } else {
    embed.setColor(0x64FFDA);
  }
  //set footer
  if (footer != '') {
    embed.setFooter(footer);
  } else {
    embed.setFooter('DinoBot™ | Discord.js Bot by Lodes Deisgn');
  }
  //set thumbnail
  if (thumbnail != '') {
    embed.setThumbnail(thumbnail);
  } else if (commandDictionary[key].icon != undefined || commandDictionary[key].icon != null) {
    embed.setThumbnail(commandDictionary[key].icon);
  }
  message.channel.stopTyping();
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
        if (commandDictionary[keyIter].type.toLowerCase() == 'info') {
          helpInfo.push(keyIter);
        }
        if (commandDictionary[keyIter].type.toLowerCase() == 'fun') {
          helpFun.push(keyIter);
        }
        if (commandDictionary[keyIter].type.toLowerCase() == 'user') {
          helpUser.push(keyIter);
        }
        if (commandDictionary[keyIter].type.toLowerCase() == 'dnd') {
          helpDnd.push(keyIter);
        }
      }
      helpMessageBody = '**Info**' + '```' + helpInfo.sort().toString().replace(/,/g, ", ") + '```\n' + '**Fun**' + '```' + helpFun.sort().toString().replace(/,/g, ", ") + '```\n' + '**User**' + '```' + helpUser.sort().toString().replace(/,/g, ", ") + '```\n' + '**D&D**' + '```' + helpDnd.sort().toString().replace(/,/g, ", ") + '```';
    }
    message.channel.startTyping();
    const embed = new DISCORD.RichEmbed()
      .setTitle('Help')
      .setAuthor(BOT.user.username, BOT.user.avatarURL)
      .setColor(0x64FFDA)
      .setDescription('Commands are formatted as ``[command]`')
      .addField('Command Info', helpMessageBody + '*Do not include brackets' + ' [] ' + 'while using commands*\nUse ``help [command]` to learn more')
      .setFooter(embedFooter)
      .addBlankField(false)
      .setThumbnail(commandDictionary[key].icon);
    message.channel.stopTyping();
    message.channel.send({embed});
    return;
  } 
};


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
  //Set Nicknames
  sqldb.query("SELECT * FROM user WHERE userID = " + message.author.id, function (err, results, fields) {
    if (results[0].nicknameOne == null) {
      sqldb.query("UPDATE user SET nicknameOne = " + MYSQL.escape(message.author.username) + " WHERE userID = " + message.author.id, function (err, results, fields) {
        if (err) throw err;
      });
    }
    if (results[0].nicknameTwo == null) {
      sqldb.query("UPDATE user SET nicknameTwo = " + MYSQL.escape(message.author.username) + " WHERE userID = " + message.author.id, function (err, results, fields) {
        if (err) throw err;
      });
    }
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
