//monster.js

exports.specific = function(message, key, emoji, commandDictionary, debugLog, BOT, DISCORD, SCRAPEIT, CHEERIO, monsterName) {
	var monsterURL = 'https://www.dndbeyond.com/monsters/'
	debugLog('var monsterURL = ' + monsterURL);
	//find a specific monster by name
	monsterURL = monsterURL + monsterName;
	debugLog('monsterURL changed to: ' + monsterURL);
	
	
	//scrape for information
	SCRAPEIT(monsterURL, {
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
		}
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
		var quickContent = [];
		var fieldCount = 2;
		
		//get primary information for monster
		debugLog('Set primary information');
		for (q = 0; q < page.quickPrimary.length; q++) {
			if (page.quickSecondary[q]) {
				quickContent[q] = page.quickPrimary[q] + ' ' + page.quickSecondary[q];
			} else {
				quickContent[q] = page.quickPrimary[q];
			}
		}

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
        .setURL(monsterURL)
        //Abilities Section
        .addField("__**Abilities**__",
                  emoji.str + " **" + page.statsTitle[0] + "**: " + page.abilityScore[0] + page.abilityModifier[0] +
                  "  " + emoji.dex + " **" + page.statsTitle[1] + "**: " + page.abilityScore[1] + page.abilityModifier[1] +
                  "  " + emoji.con + " **" + page.statsTitle[2] + "**: " + page.abilityScore[2] + page.abilityModifier[2] + '\n' +
                  emoji.int + " **" + page.statsTitle[3] + "**: " + page.abilityScore[3] + page.abilityModifier[3] +
                  "  " + emoji.wis + " **" + page.statsTitle[4] + "**: " + page.abilityScore[4] + page.abilityModifier[4] +
                  "  " + emoji.cha + " **" + page.statsTitle[5] + "**: " + page.abilityScore[5] + page.abilityModifier[5]
                  , false)
        //Secondary Information
        .addField("__**Secondary Stats**__",
                 "**" + page.statsTitle[6] + "**: " + quickContent[0] + "\n" +
                 "**" + page.statsTitle[7] + "**: " + quickContent[1] + "\n" +
                 "**" + page.statsTitle[8] + "**: " + quickContent[2] + "\n" +
                 "**" + page.statsTitle[9] + "**: " + quickContent[3]
                 , false);
		debugLog('Phase 1 complete');
		//Proficiency Fields
		debugLog('Generate Proficiency Fields');
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
      message.channel.stopTyping();
      message.channel.send({embed});
      return;
		
		
	});
}