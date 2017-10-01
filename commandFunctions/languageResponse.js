// languageResponse

var languageResponseArray = [
    "language!",
    "quit that!",
    "hey, no cursing",
    "No cursing.",
    "...",
    "hey keep that to yourself",
    "please don't",
    "don't smoke cuss or chew or associate with those who do",
    "stahhp",
    "cachmeoutside how bout stop cursing.",
    "hey, no more.",
    "No.",
    "Goodnight everybody",
    "I don't want to hear that",
    "let's not",
    "hey... not while I'm around",
    "how bout no",
    "i'm still here",
    "please stop",
    "please no",
    "gross.",
    "that was uncalled for.",
    "thanks... just what was asked for",
    "LANGUAGE",
    "lAnguaGe",
    "*in captain america's voice* language",
    "language.",
    "laaanguage!!",
    ". . .",
    "please. No cursing.",
    "*cough* don't curse *cough*",
    "thanks.",
    "hmm",
    "!!",
    "let's stop that. . .",
    "*insert not in my christian server meme here*",
];

exports.generate = function() {
  var languageResponseMath = Math.floor((Math.random () * languageResponseArray.length));
  return languageResponseArray[languageResponseMath];    
}