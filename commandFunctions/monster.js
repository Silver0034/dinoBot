//monster.js

exports.specific = function(message, key, emoji, commandDictionary, debugLog, BOT, DISCORD, SCRAPEIT, CHEERIO, monsterName) {
	var monsterURL = 'https://www.dndbeyond.com/monsters/'
	debugLog('var monsterURL = ' + monsterURL);
	//find a specific monster by name
	monsterURL = monsterURL + monsterName;
	debugLog('monsterURL changed to: ' + monsterURL);
	
	
	//scrape for information
	SCRAPEIT(monsterURL, {
		monsterImage: {
			selector: ".monster-image",
			attr: "src"
		},
		errorPageTitle: {
			selector: ".error-page-title",
			how: "text"
		},
		abilityScore: {
			listItem: ".ability-block__score"
		},
		abilityModifier: {
			listItem: ".ability-block__modifier"
		},
		statsTitle: {
			listItem: ".ability-block__heading",
		},
		attribute: {
			listItem: ".mon-stat-block__attribute"
		},
		attributeTitle: {
			listItem: ".mon-stat-block__attribute-label",
		},
		attributeContent: {
			listItem: ".mon-stat-block__attribute-data-value",
		},
  },
	(err, page) => {
		//catch error / catch error page title
		debugLog('Errors: ' + err);
		debugLog('Icon Address: ' + commandDictionary[key].icon);
		if (page.errorPageTitle == 'Page Not Found') {
			const embed = new DISCORD.RichEmbed()
				.setTitle('Monster Not Found')
				.setAuthor(BOT.user.username, BOT.user.avatarURL)
				.setColor(0x64FFDA)
				.setDescription('The Monster you searched for is not on D&D Beyond.')
				.setFooter("© 2017 D&D Beyond | Scraped by " + BOT.user.username + '™')
				.setImage('https://static-waterdeep.cursecdn.com/1-0-6565-20267/Skins/Waterdeep/images/errors/404.png')
				.setThumbnail(commandDictionary[key].icon);
			message.channel.stopTyping();
			message.channel.send({embed});
			return;
		}
		//if monster-image is not found
		if (page.monsterImage == undefined) {
			const embed = new DISCORD.RichEmbed()
				.setTitle('Monster Not Available')
				.setAuthor(BOT.user.username, BOT.user.avatarURL)
				.setColor(0x64FFDA)
				.setDescription('I only have acsess to monsters defined by the "basic rules"')
				.setFooter("© 2017 D&D Beyond | Scraped by " + BOT.user.username + '™')
				.setThumbnail(commandDictionary[key].icon);
			message.channel.stopTyping();
			message.channel.send({embed});
			return;
		} else if (page.monsterImage.includes('https:') == false) {
    	//make sure monsterImageURL is usable by discord
			monsterImageURL = 'https:' + page.monsterImage;
    }
		//post information
		//var for embed
		debugLog('Establish Variables');
		var monsterImageURL = page.monsterImage;
		var quickContent = [];
		var fieldCount = 0;
		var attributeField = '';

		
		/*
		//get primary information for monster
		debugLog('Set primary information');
		for (q = 0; q < page.quickPrimary.length; q++) {
			if (page.quickSecondary[q]) {
				quickContent[q] = page.quickPrimary[q] + ' ' + page.quickSecondary[q];
			} else {
				quickContent[q] = page.quickPrimary[q];
			}
		}
		*/

		//start generating embed
		debugLog('Embed Generation Phase 1');
		const embed = new DISCORD.RichEmbed()
        .setTitle(page["title"])
        .setAuthor(BOT.user.username, BOT.user.avatarURL)
        .setColor(0x64FFDA)
        .setDescription(page["descShort"])
        .setFooter("© 2017 D&D Beyond | Scraped by " + BOT.user.username)
        .setImage(monsterImageURL)
        .setThumbnail(commandDictionary[key].icon)
        .setURL(monsterURL);
		
		
    //Abilities Section
		debugLog('Add Ability Section');
    embed.addField("__**Abilities**__",
										emoji.str + " **" + page.statsTitle[0] + "**: " + page.abilityScore[0] + page.abilityModifier[0] +
										"  " + emoji.dex + " **" + page.statsTitle[1] + "**: " + page.abilityScore[1] + page.abilityModifier[1] +
										"  " + emoji.con + " **" + page.statsTitle[2] + "**: " + page.abilityScore[2] + page.abilityModifier[2] + '\n' +
										emoji.int + " **" + page.statsTitle[3] + "**: " + page.abilityScore[3] + page.abilityModifier[3] +
										"  " + emoji.wis + " **" + page.statsTitle[4] + "**: " + page.abilityScore[4] + page.abilityModifier[4] +
										"  " + emoji.cha + " **" + page.statsTitle[5] + "**: " + page.abilityScore[5] + page.abilityModifier[5]
										, false);
		fieldCount++;
    
		//Attribute Section
		//Create Content
		debugLog('ATTRIVUTE STAT BLOCK' + page.attribute);
		debugLog('Attribute Generator');
		for (a = 0; a < page.attributeTitle.length; a++) {
			attributeField += '**' + page.attributeTitle[a] + '**: ' + page.attributeContent[a];
			if (a == page.attributeTitle.length) {
				return;
			} else {
				attributeField += '\n';
			}
		}
		//Embed Content
		debugLog('Add Attribute Section');
		if (attributeField != null) {
			embed.addField("__**Attributes**__", attributeField, false);
			debugLog('Attributes Added');
			fieldCount++;
		} else {
			debugLog('No Attributes Found');
		}
		
		
		/*
		//Proficiency Fields
		debugLog('Generate Proficiency Fields');
		
		if (page.statsDescription.length > 0) {
			debugLog('statsDescription Length = ' + page.statsDescription.length);
			for (i = 0; i < page.statsDescription.length; i++) { 
				z = i + 10;
				proficiencyValue += '**' + page.statsTitle[z] + '**: ' + page.statsDescription[i] + "\n"
				debugLog('page.statsTitle[z] = ' + page.statsTitle[z]);
				debugLog('page.statsDescription[i] = ' + page.statsDescription[i]);
			}
			debugLog('Add proficiencies field');
			debugLog('Content = ' + proficiencyValue);
			embed.addField("__**Proficiencies**__", proficiencyValue, false);
			fieldCount++;	
		} else {
			debugLog('No proficiency fields detected');
		}
	
		//Handles page.moreInfoContent
		debugLog('Prepare CHEERIO and extra content');
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
									debugLog('Added Field of Extra Content');
                  embed.addField(lineSections[0], lineSections[1], false);
                  fieldCount++; 
                } 
              }             
            }
      }
			
			*/
      message.channel.stopTyping();
      message.channel.send({embed});
      return;
		
	});
}