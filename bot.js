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
    usage: '**Usage:** `8ball [question]',
    function: function(message,messageArguments) {
      if (messageArguments[1]) {
        return responseHead() + ball.generate();
      } else {
        return error();  
      }     
      setUserTimeout(userID);
        console.log(message.author.username + ' used 8ball');
    }
  };
commandDictionary['attack'] = {
    name: 'attack',
    emoji: ':dagger: ',  //put space after emoji   
    error: 'Use the command like this: `attack [@user OR name]',
    usage: '**Usage:** `attack [@user OR name]',
    function: ''     
  }
commandDictionary['choose'] = {
    name: 'choose',
    emoji: ':point_up: ',  //put space after emoji   
    error: 'Use the command like this: `choose [choice1|choice2|etc]',
    usage: '**Usage:** `choose [choice1|choice2|etc]',
    function: ''     
  };
commandDictionary['coin'] = {
    name: 'coin',  
    emoji: ':moneybag: ',  //put space after emoji  
    error: 'Use the command like this: `coin',
    usage: '**Usage:** `coin',
    function: ''   
  };
commandDictionary['cookie'] = {
    name: 'cookie',
    emoji: ':gift: ',  //put space after emoji  
    error: 'Use the command like this: `cookie [@user OR name]',
    usage: '**Usage:** `cookie [@user OR name]',
    function: ''      
  };
commandDictionary['error'] = {
    name: 'error',
    emoji: ':no_entry_sign: ',  //put space after emoji 
    error: 'Use the command like this: `error',
    usage: '`error',
    function: ''      
  };
commandDictionary['hello'] = {
    name: 'hello',
    emoji: '',  //put space after emoji 
    error: 'Use the command like this: `hello',
    usage: '`hello',
    function: ''      
  };   
commandDictionary['help'] = {
    name: 'help',
    emoji: ':grey_question: ',  //put space after emoji 
    error: 'Use the command like this: `help',
    usage: '**Usage:** `help OR `help [command]',
    function: ''      
  }; 
commandDictionary['ping'] = {
    name: 'ping',
    emoji: ':grey_exclamation: ',  //put space after emoji 
    error: 'Use the command like this: `ping',
    usage: '**Usage:** `ping',
    function: ''      
  };   
commandDictionary['quote'] = {
    name: 'quote',
    emoji: ':speech_balloon: ',  //put space after emoji 
    error: 'Use the command like this: `quote',
    usage: '**Usage:** `quote',
    function: ''      
  };
commandDictionary['roll'] = {
    name: 'roll',
    emoji: ':game_die: ',  //put space after emoji 
    error: 'Use the command like this: `roll [count]d[sides]+/-[modifier]',
    usage: '**Usage:** `roll [count]d[sides]+/-[modifier]',
    function: ''
  };
commandDictionary['taste'] = {
    name: 'taste',
    emoji: ':fork_and_knife: ',  //put space after emoji 
    error: 'Use the command like this: `taste [@user OR name]',
    usage: '**Usage:** `taste [@user OR name]',
    function: ''
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
    
    for (var key in commandDictionary) {
      if (messageArguments[0] == commandDictionary[key].name) {
        console.log("Command input recognized");
        message.channel.send(commandDictionary[key].function());
      }   
    }
                   
    //begin searching for command prompts    
    switch (messageArguments[0]) {          
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