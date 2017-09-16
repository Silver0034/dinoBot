//establish constants and dependencies
const Discord = require('discord.js');
const client = new Discord.Client();
var tokenReturn = require('./token.js');
var roar = require('./commandFunctions/roar.js');
var ball = require('./commandFunctions/ball.js');
var attack = require('./commandFunctions/attack.js');
var quote = require('./commandFunctions/quote.js');
var taste = require('./commandFunctions/taste.js');

//establish global variables and constants
var TOKEN = tokenReturn.return();
const BOTID = '229715466199891968';
//make sure to put a space after. Ex:':smile: '
var emojiDino = '<:sauropod:355738679211327488> ';
var timedOutUsers = new Array();

//dictionary for all commands and information
var commandDictionary = new Object();
commandDictionary['8ball'] = {
    name: '8ball',
    emoji: ':8ball: ', //put space after emoji 
    error: 'Use the command like this: `8ball [question]',
    usage: '**Usage:** `8ball [question]'
  };
commandDictionary['attack'] = {
    name: 'attack',
    emoji: ':dagger: ',  //put space after emoji   
    error: 'Use the command like this: `attack [@user OR name]',
    usage: '**Usage:** `attack [@user OR name]'     
  }
commandDictionary['choose'] = {
    name: 'choose',
    emoji: ':point_up: ',  //put space after emoji   
    error: 'Use the command like this: `choose [choice1|choice2|etc]',
    usage: '**Usage:** `choose [choice1|choice2|etc]'     
  };
commandDictionary['coin'] = {
    name: 'coin',  
    emoji: ':moneybag: ',  //put space after emoji  
    error: 'Use the command like this: `coin',
    usage: '**Usage:** `coin'   
  };
commandDictionary['cookie'] = {
    name: 'cookie',
    emoji: ':gift: ',  //put space after emoji  
    error: 'Use the command like this: `cookie [@user OR name]',
    usage: '**Usage:** `cookie [@user OR name]'      
  };
commandDictionary['error'] = {
    name: 'error',
    emoji: ':no_entry_sign: ',  //put space after emoji 
    error: 'Use the command like this: `error',
    usage: '`error'      
  };
commandDictionary['hello'] = {
    name: 'hello',
    emoji: '',  //put space after emoji 
    error: 'Use the command like this: `hello',
    usage: '`hello'      
  };   
commandDictionary['help'] = {
    name: 'help',
    emoji: ':grey_question: ',  //put space after emoji 
    error: 'Use the command like this: `help',
    usage: '**Usage:** `help OR `help [command]'      
  }; 
commandDictionary['ping'] = {
    name: 'ping',
    emoji: ':grey_exclamation: ',  //put space after emoji 
    error: 'Use the command like this: `ping',
    usage: '**Usage:** `ping'      
  };   
commandDictionary['quote'] = {
    name: 'quote',
    emoji: ':speech_balloon: ',  //put space after emoji 
    error: 'Use the command like this: `quote',
    usage: '**Usage:** `quote'      
  };
commandDictionary['roll'] = {
    name: 'roll',
    emoji: ':game_die: ',  //put space after emoji 
    error: 'Use the command like this: `roll [count]d[sides]+/-[modifier]',
    usage: '**Usage:** `roll [count]d[sides]+/-[modifier]'
  };
commandDictionary['taste'] = {
    name: 'taste',
    emoji: ':fork_and_knife: ',  //put space after emoji 
    error: 'Use the command like this: `taste [@user OR name]',
    usage: '**Usage:** `taste [@user OR name]'
  };

//global functions
function setUserTimeout(userID) {
  //put users userID in a timeout array
  timedOutUsers.push(userID);
  setTimeout(function() {
    timedOutUsers.splice(timedOutUsers.indexOf(userID), 1);
  }, 000);
}
function timeoutAlert(timeoutAlert) {
    //alert users to stop using commands
    //if they are in the timeout array
    return emojiDino + ' ' + roar.generate() + ' *(Slow down, you' + "'" + 're scaring me!)*  :no_entry_sign:';
}


// only reacts to Discord _after_ ready is emitted
client.on('ready', () => {
  console.log('Online and connected');
});
// Create an event listener for messages
client.on('message', message => {   
  var messageContent = message.content;    
  var messageArguments = message.content.substring(1).split(' ');
  var commandPrompt = messageArguments[0];    
  var userID = message.author.id;
  var extraContent = '';    
  function responseHead() {
    var responseHead = emojiDino + commandDictionary[messageArguments[0]].emoji + extraContent + '| **' + message.author.username + '** | ';
    return responseHead;
  }
  function error() {
    var errorMessage = emojiDino + ' ' + roar.generate() + ' ' + roar.generate() + ' *(There was an error)*  :no_entry_sign:' + '\n' + commandDictionary[messageArguments[0]].error;
    console.log(message.author.username + ' used a failed command; ' + commandDictionary[messageArguments[0]].name);     
    return errorMessage;  
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
    
    if (timedOutUsers.indexOf(userID) > -1) {
      message.channel.send(timeoutAlert());
      console.log(message.author.username + ' was warned about spamming commands');    
      return;   
    }
        
    //begin searching for command prompts    
    switch (messageArguments[0]) { 
      
      case '8ball':               
        //check if user input is valid or empty
        if (messageArguments[1]) {
          message.channel.send(responseHead() + ball.generate());    
        } else {
        message.channel.send(error());       
        }     
        setUserTimeout(userID);
        console.log(message.author.username + ' used 8ball');    
        break;
            
      case 'attack':
        //check to see if sucsessful
        if (messageArguments[1] === undefined || messageArguments[1] === '' || messageArguments[2]) {
          message.channel.send(error());
        } else {
          message.channel.send(responseHead() + messageArguments[1] + attack.generate());
        }
        setUserTimeout(userID);
        console.log(message.author.username + ' used attack');    
        break;
            
      case 'choose':
        //the function to generate a choice between inputs    
        function chooseGenerator() {
          var chooseNum = Math.floor((Math.random() * chooseArray.length));
          return chooseArray[chooseNum];
        } 
        //looks to see if the user input includes string|string
        //if it does not; stops the command and returns error
        //if valid, split the strings into an array    
        if (messageArguments[1] && messageArguments[1].substring(1, messageArguments[1].length - 1).includes('|')) {
          var chooseArray = messageArguments[1].split('|');            
        } else {
          message.channel.send(error());
          return;    
        }
        //if the string|string is valid return output
        //else return error    
        if (chooseArray[0] === '' || chooseArray[1] === '' || chooseArray === null || chooseArray.length <= 1) {
          message.channel.send(error());
        } else {
          message.channel.send(responseHead() + ' *(I choose ' + chooseGenerator() + '*)'); 
        }            
        setUserTimeout(userID);
        console.log(message.author.username + ' used choose');
        break;
            
      case 'coin':
        var coinAnswers = [
          'Heads',
          'Tails'
        ]
        function coinGenerator() {
         var coinNum = Math.floor((Math.random() * coinAnswers.length));
         return coinAnswers[coinNum];
        }
        if (messageArguments[1]) {
          message.channel.send(error());
          return;     
        }    
        message.channel.send(responseHead() + 'You flipped *' + coinGenerator() + '*');
        setUserTimeout(userID);
        console.log(message.author.username + ' used coin');
        break;
            
      case 'cookie':       
        if (!messageArguments[1]) {
          message.channel.send(error());
          return;
        } else {
          message.channel.send(responseHead() + 'You gave ' + messageArguments[1] + ' a dino-cookie! :cookie:');
        }
        setUserTimeout(userID);
        console.log(message.author.username + ' used cookie');
        break;
            
      case 'error':             
        if (messageArguments[1]) {
          message.channel.send(error());
          return;
        } else {
          message.channel.send(error());
        }
        setUserTimeout(userID);
        console.log(message.author.username + ' used error');
        break;
            
      case 'hello':               
        if (messageArguments[1]) {
          message.channel.send(error());
          return;
        } else {
          message.channel.send(emojiDino + roar.generate() + ' ' + roar.generate() + ' *(Hi ' + message.author.username + ')*');
        }
        setUserTimeout(userID);
        console.log(message.author.username + ' used hello');    
        break;
            
      case 'help':
        var helpMessageBody;
        var helpList = '';
        var i;    
        for (var key in commandDictionary) {
          helpList += ' [`' + commandDictionary[key].name + ']';
          var helpVar = '`' + commandDictionary[key].name;
          if (messageArguments[1] == commandDictionary[key].name || messageArguments[1] == helpVar) {
            helpMessageBody =  ' ```' + commandDictionary[key].usage + '```';
          }
        }    
        if (!helpMessageBody) {
            helpMessageBody = '```**Available Commands:**' + helpList + '```';
          }   
          message.channel.send(responseHead() + roar.generate() + ' ' + roar.generate() + helpMessageBody + '*Do not include brackets' + ' [] ' + 'while using commands*');
          console.log(message.author.username + ' used help'); 
          setUserTimeout(userID);
          break;
            
      case 'ping':
        if (messageArguments[1]) {
          message.channel.send(error());
          return;
        } else {
          message.channel.send(emojiDino + roar.generate() + ' ' + roar.generate() + ' *(Pong!)*');
          console.log(message.author.username + ' used ping');     
        }
        setUserTimeout(userID);   
        break;
            
      case 'quote':
        if (messageArguments[1]) {
          message.channel.send(error());
          return;
        } else {
          message.channel.send(responseHead() + quote.generate());
        }   
        setUserTimeout(userID);
        console.log(message.author.username + ' used quote');    
        break;
            
      case 'roll':
        var rollSign = "";
        if (messageArguments[1]) {
          if (messageArguments[1].includes("+")) {
            rollSign = "+";
          }
          if (messageArguments[1].includes("-")) {
            rollSign = "-";
          }     
        }              
        if (messageArguments[1]) {
          var rollStat = messageArguments[1].replace("+","d").replace("-","d").split("d");
        } else {
            message.channel.send(error());
            return;
        }
        var rollCount = rollStat[0];
        var rollSides = rollStat[1];
        var rollOperator = rollStat[2];
        var rollList = new Array(); // An array of dice roll values.
        var rollSum = 0; // The sum of all rolls.
        var rollMessageOutput = ""; // The final message to be printed.
        // If our inputs are invalid, return an error.
        if (isNaN(rollCount) || isNaN(rollSides) || rollCount > 120 || rollSides > 120 || rollOperator > 120 || rollCount <= 0 || rollSides <= 0 || rollOperator <= 0) {
          message.channel.send(error());
          return;
        } else {
        if (isNaN(rollOperator)) {
          rollOperator = ""; 
        }
        // Base message.
        extraContent = '**' + rollCount + 'd' + rollSides + rollSign + rollOperator + '** '; 
        rollMessageOutput += responseHead();
        // Roll each die.
        for (var i = 0; i < rollCount; i++) {
          var numGen = Math.floor((Math.random() * rollSides) + 1);
          rollSum += numGen;
          rollList.push(numGen);
        }            
        rollOperator = Number(rollOperator);
        if (messageArguments[1].includes("+")) {
          rollSum = rollSum + rollOperator;
        }
        if (messageArguments[1].includes("-")) {
          rollSum = rollSum - rollOperator;
          }
        if (rollCount > 1) {
          // Print all of our rolls
          rollMessageOutput += "```" + rollList.toString() + "```";
        }                            
        rollMessageOutput += " You rolled a total of **" + rollSum + "**";    
        message.channel.send(rollMessageOutput);
        console.log(message.author.username + ' used roll');      
      }
      setUserTimeout(userID);
      break; 
    case 'taste':       
      if (!messageArguments[1]) {
        message.channel.send(error());
        return;
      } else {
        message.channel.send(responseHead() + 'I think ' + messageArguments[1] + ' tastes ' + taste.generate());
      }
      setUserTimeout(userID);
      console.log(message.author.username + ' used taste');
      break;      
    }
  }
    
    if (message.content.includes('<@' + BOTID + '>')) {
      message.channel.send(emojiDino + roar.generate());
      console.log(message.author.username + ' mentioned DinoBot');           
        setUserTimeout(userID);
    }
});
client.login(TOKEN);


//to be implimented
//direct message player
////message.author.send('hello');