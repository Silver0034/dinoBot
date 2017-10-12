//jimp
exports.profile = function(Jimp,
													 message,
													 key,
													 args,
													 emojiDino,
													 attachment) {
	/*
	//jimp fonts
	const jimpFontMS16pt500Black = new Jimp.loadFont('./assets/fonts/museo-sans-500-16pt-black.fnt');
	const jimpFontMS18pt900White = new Jimp.loadFont('./assets/fonts/museo-sans-900-18pt-white.fnt');
	const jimpFontMS24pt100Black = new Jimp.loadFont('./assets/fonts/museo-sans-100-24pt-black.fnt');
	const jimpFontMS24pt700Black = new Jimp.loadFont('./assets/fonts/museo-sans-700-24pt-black.fnt');
	const jimpFontMS36ptTitleBlack = new Jimp.loadFont('./assets/fonts/museo-sans-title-36pt-black.fnt');
	const jimpFontMS36ptTitleWhite = new Jimp.loadFont('./assets/fonts/museo-sans-title-36pt-white.fnt');
	const jimpFontMS53ptTitleBlack = new Jimp.loadFont('./assets/fonts/museo-sans-title-53pt-black.fnt');
	//jimp const images
	const jimpUserCardBlank = Jimp.read('./assets/profile.png');
	*/
	//Assembling the picture
	var userCard = new Jimp(800, 500, 0x000000, function (err, image) {
		if (err) throw err;
		// Put Plate over Background
		Jimp.read('assets/userBackground/default.png', function (err, image) {
			if (err) throw err;
			image
			.composite(image, 0, 0);
			//TODO: Resize background to fit width and height
			Jimp.read('./assets/profile.png', function (err, plate) {
				image
				.composite(image, 0, 0);
				//XP BAR in image
				//XP Bar Max Width = 517px
				//TODO: Make Width Represent percentage to next level
				var xp = new Jimp(517, 11, 0x64FFDAFF, function (err, xp) {
					xp.composite(xp, 247, 464);
					//Write Username
					Jimp.loadFont('./assets/fonts/museo-sans-title-36pt-white.fnt').then(function (jimpFontMS36ptTitleWhite) {
						image.print(jimpFontMS36ptTitleWhite, 280, 146, message.author.username, 30)
						//Put this at the end of the final Jimp process
						.write(attachment, function() {
							attachment = './assets/UserProfile.png';
							message.channel.send(emojiDino + ' ' + message.author.username + '\'s Profile', {
								file: attachment
							});
							message.channel.stopTyping();
						});
					});
				});
			});
		});
	});
}