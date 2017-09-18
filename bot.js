//establish constants and dependencies
const Discord = require('discord.js');
const bot = new Discord.Client();
var tokenReturn = require('./token.js');
var roar = require('./commandFunctions/roar.js');
var ball = require('./commandFunctions/ball.js');
var attack = require('./commandFunctions/attack.js');
var quote = require('./commandFunctions/quote.js');
var taste = require('./commandFunctions/taste.js');
var profanity = require('./commandFunctions/profanity.js');

//establish global variables and constants
const TOKEN = tokenReturn.return();
var profanity = profanity.filter();
//make sure to put a space after. Ex:':smile: '
const emojiDino = '<:sauropod:355738679211327488> ';
var timedOutUsers = new Array();

//global functions
function setUserTimeout(userID) {
  //put users userID in a timeout array
  timedOutUsers.push(userID);
  //automatically remove the user from timeout after a set delay
  setTimeout(function() {
    timedOutUsers.splice(timedOutUsers.indexOf(userID), 1);
  }, 8000);
}
function timeoutAlert(timeoutAlert) {
    //alert users to stop using commands
    //if they are in the timeout array
  return emojiDino + ' ' + roar.generate() + ' *(Slow down, you\'re scaring me!)*  :no_entry_sign:';
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

//dictionary for all commands and information
var commandDictionary = new Object();
commandDictionary['8ball'] = {
  emoji: ':8ball: ', //put space after emoji 
  error: 'Use the command like this: `8ball [question]',
  usage: '**Usage:** `8ball [question]',
  doCommand: function(message, key, args) {
    if (args[0]) {
      console.log(' used ' + key);
      return responseHead(message, key) + ball.generate();
    } else {
      console.log(message.author.username + ' used ' + key);
      return error(key);
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
  emoji: ':dagger: ',  //put space after emoji   
  error: 'Use the command like this: `attack [@user OR name]',
  usage: '**Usage:** `attack [@user OR name]',
  doCommand: function(message, key, args) {
    if (args[0] === undefined || args[0] === '' ) {
      return error(key);
    } else {
      return responseHead(message, key) + args[0] + attack.generate();
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
  emoji: ':no_entry_sign: ',  //put space after emoji 
  error: 'Use the command like this: `error',
  usage: '`error',
  doCommand: function(message, key, args) {
    return error(key);
  }  
};
commandDictionary['hello'] = {
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
  emoji: ':speech_balloon: ',  //put space after emoji 
  error: 'Use the command like this: `quote',
  usage: '**Usage:** `quote',
  doCommand: function(message, key, args) {
    if (args[0]) {
      return error(key);
    } else {
      return responseHead(message, key) + quote.generate();
    }
    setUserTimeout(userID);
  }
};
commandDictionary['taste'] = {
  emoji: ':fork_and_knife: ',  //put space after emoji 
  error: 'Use the command like this: `taste [@user OR name]',
  usage: '**Usage:** `taste [@user OR name]',
  doCommand: function(message, key, args) {
    if (!args[0]) {
      return error(key);
    } else {
      return responseHead(message, key) + 'I think ' + args[0] + ' tastes ' + taste.generate();
    }
    setUserTimeout(userID);
  }
};
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
  //listen for the ` to start a command
  //the bot only responds with things inside this if
  //if i want the bot to display something write it in here
  if (messageContent.substring(0, 1) === '`') {
  //stop message from being processed
  //if from a user in timeout
    //stop message from being processed
    //if from a bot
    if (message.author.bot) { return; }
    if(commandDictionary[key]) {
      if (timedOutUsers.indexOf(userID) > -1) {
        message.channel.send(timeoutAlert());
        console.log(message.author.username + ' was warned about spamming commands');
        return;
      }
      console.log(getTime(), message.author.username + ' used: ' + key);
      message.channel.send(commandDictionary[key].doCommand(message, key, args));
      setUserTimeout(userID);
    }
    else {
      //TODO: Consider sending the help message
      console.log(getTime(), message.author.username + "used an unrecognized command input");
    }
  }
  if (message.isMentioned(bot.user)) {
    message.channel.send(emojiDino + roar.generate());
    console.log(message.author.username + ' mentioned DinoBot');
    setUserTimeout(userID);
  } else {
    for (var i = 0; i < messageCheck.length; i++) {
      messageCheck[i] = messageCheck[i].toLowerCase();
      messageCheck[i] = messageCheck[i].replace(/"/g, '');
      messageCheck[i] = messageCheck[i].replace(/'/g, '');
      if (profanity.includes(messageCheck[i])) {
        message.channel.send(emojiDino + 'Language!');  
        console.log(message.author.username + ' was warned about cursing.');
        message.author.send(emojiDino + '<@' + userID + '>, please keep the server profanity free--do not curse.'); 
        if (message.guild != null) {
          message.guild.owner.send(emojiDino + ' ' + message.author.username + ' cursed. ' + getTime() + '```' + '\n' + message.author.username + ': \"' + message + '\"```');    
        }   
        return;          
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