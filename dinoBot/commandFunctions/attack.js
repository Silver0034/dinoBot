var attackArray = [
  //it displays like 'NAME is yummy'    
  ' is yummy',
  ' tastes funny',
  ' was a good eat',
  ' was 10/10 would chomp again.',
  ' tastey',
  '? Eww, no thanks.',
  '? Fresh meat!',
  ' is tastey.',
  '! :hamburger: mMmm',
  '? No thanks, I don' + "'" + 't like couch potato :potato:',
  ' is as tasty as a t-rex steak',
  ' tastes good',
  ' was a bit tough to chew.',
  ' could use some butter',
  ' was ok--anyone have ice cream?',
  ' is what I call... medium-raw XD',
  '? yum',
  ' got chomped',
  ' lost a leg',
  ' lost an arm',
  ' *might*... have lost part of his face',
  ' tastes wonderful',
  ' got sat on',
  ' makes an ok footwarmer',
  "'" + 's neck got broken',
  ' has been eaten.',
  ' fell apart',
  ' escaped.',
  ' got away',
  ' ran away',
  ' narrowly escaped',
  ' it me back!',
  ' saw the light',
  ' met Jesus',
  ' tastes like triceratops',
  ' tastes like pteranodon',
  ' tastes like apatosaurus',
  ' tastes like stegosaurus',
  ' tastes like chicken',    
  ' went well with my stegosaurus burger',
  ' was a popular dish at the watering hole',
  ' is gonna be saved for later',
  '? yuck',
  '? yucky',
  '? icky',
  '? No, thanks. Too sticky',
  ' *CHOMP CHOMP CHOMP*',
  ' got squashed',
  ' got squished',
  ' is flat',
  ' is now flat',
  ' got flattened',
  ' got munched',
  ' got crunched',
  ' got lunched',
  ' got munched, got crunched, got lunched',
  ' got gulped',
  ' flees from my mighty jaws',
  ' got swallowed whole',
  '? No thanks, I' + "'" + 'm a Veggiesaurus',
  ' had to go :toilet:',
  ' was killed dead',
  ' got killed ded',
  ' is wow very taste much eaten',
  ' chipped my tooth',
  ' needs steak sauce',
  ' is a bit rubbery',
  '? Would you like fries with that?',
  ' outran me',
  ' outran me, the little bugger',
  ' tickles going down',
  ': the snack that smiles back',
  ' tastes like a hotdog',
  ' was crushed by my tail',
  ' was accidentally dropped',
  ' flew like a football',
  ' bounces when dropped',
  '. :skull_crossbones:',
  ' taught me the meaning of friendship... jk, became lunch'
]

exports.generate = function() {
  var attackNum = Math.floor((Math.random() * attackArray.length));
  return attackArray[attackNum];    
}                  