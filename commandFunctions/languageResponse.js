// languageResponse

var languageResponseArray = [
    "language!",
    "quit that cursing!",
    "hey, no cursing",
    "No cursing.",
    "... please don't curse",
    "hey keep your cursing to yourself",
    "please don't curse",
    "don't smoke cuss or chew or associate with those who do",
    "stahhp cuurrrsssiinng",
    "cachmeoutside how bout stop cursing.",
    "hey, no more cursing",
    "No. I. Can't Even... just please stop cursing.",
    "Goodnight everybody",
    "I don't want to hear your cursing.",
    "let's not curse",
    "hey... don't curse while I'm around",
    "how bout no more cursing",
    "i'm still here! please don't curse",
    "please stop. no more cursing.",
    "please no. I don't like cursing",
    "gross. foul language.",
    "that was uncalled for. there's no need for foul language",
    "thanks... just what was asked for. . . potty words",
    "LANGUAGE",
    "lAnguaGe",
    "*in captain america's voice* language",
    "language.",
    "laaanguage!!",
    "*clears throat* . . . LANGUAGE",
    "please. No cursing.",
    "*cough* don't curse *cough*",
    "thanks. You're cursing is *not* appreciated",
    "hmm... yeah, no. don't curse",
    "!!__tjadfkasdf please don't curse",
    "let's stop that. . . no more cursing",
    "*insert not in my christian server meme here*",
    "not in my christian server",
    "Knock it off. quit potty talkin'",
    "Ohana means family. family means quit cursing in the chat!!!!",
    "you sadden my heart. please don't curse",
    "=( please don't curse",
    "Roawr. =( cursing bad",
    "Hey could you not curse",
    "I would appreciate it if you didn't curse",
    "Please help keep the server clean",
    "a scout is clean",
    "A Scout is Clean",
    "just because you can cuss doesn't mean you should",
    "You make me sad. please refrain from foul language",
    "Now is not a good time for that",
    "There's a time and place for everything, but now is not the time to curse.",
    "You shouldn't say that",
    "Please don't say that",
    "That's not safe for the little ears in the backseat",
    "Maybe that wasn't the best choice of words",
    "Helloooooooo nurse. Please don't curse",
    "Not gonna slide. No cursing",
    "Your language is almost as strong as Ajax, the super strong bathroom cleaner. It is now available scented in lemon or vanilla",
    "did you have to use those sentence enhancers?",
    "*sigh* language",
    "*language*",
    "Grrr. No more bad words",
    "get that :poop: out of here",
    "if you continue saying things like that you'll go extinct like my biological friends",
    "Once there was a man who said 'Language!!!!'",
    "Are you made of Sulfur, Tritium, Oxygen and Phosphorus? Because you need to stop",
    "do you have alzheimer's? because I think you forgot the rules",
    ":dog: thiss doggo thinks you've been a bad boi",
    "bad language? thats gonna hit you like a asteriod in this good christain server",
    "you keep talking like that and you are gonna get t-rekt",
    "I hope you dont taste as foul as your language\n. . .\nyep you taste ugly just like your personality",
    "I'd eat you but i dont like vegetables",
    "I'd stomp on you for saying that but you're too big of a prick to fit"
];

exports.generate = function() {
  var languageResponseMath = Math.floor((Math.random () * languageResponseArray.length));
  return languageResponseArray[languageResponseMath];    
}