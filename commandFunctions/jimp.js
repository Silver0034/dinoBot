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
		//set where the picture will be saved at the end
		attachment = './assets/UserProfile.png';
		if (err) throw err;
		// Put Plate over Background
		Jimp.read('./assets/userBackground/default.png', function (err, background) {
			if (err) throw err;
			Jimp.read('./assets/profile.png', function (err, plate) {
				//XP BAR in image
				//XP Bar Max Width = 517px
				//TODO: Make Width Represent percentage to next level
				var xp = new Jimp(517, 11, 0x64FFDAFF, function (err, xp) {
					//Avatar Mask
					Jimp.read('./assets/avatarCircleMast.png', function (err, avatarMask) {
						//Avatar
						console.log(message.author.avatarURL);
						Jimp.read(message.author.avatarURL, function (err, avatar) {
							//Loads Fonts
							Jimp.loadFont('./assets/fonts/museo-sans-500-16pt-black.fnt').then(function (jimpFontMS16pt500Black) {
								Jimp.loadFont('./assets/fonts/museo-sans-900-18pt-white.fnt').then(function (jimpFontMS18pt900White) {
									Jimp.loadFont('./assets/fonts/museo-sans-100-24pt-black.fnt').then(function (jimpFontMS24pt100Black) {
										Jimp.loadFont('./assets/fonts/museo-sans-700-24pt-black.fnt').then(function (jimpFontMS24pt700Black) {
											Jimp.loadFont('./assets/fonts/museo-sans-title-36pt-black.fnt').then(function (jimpFontMS36ptTitleBlack) {
												Jimp.loadFont('./assets/fonts/museo-sans-title-36pt-white.fnt').then(function (jimpFontMS36ptTitleWhite) {
													Jimp.loadFont('./assets/fonts/museo-sans-title-53pt-black.fnt').then(function (jimpFontMS53ptTitleBlack) {
														//Assemble Avatar
														avatar.cover(193, 193);
														//Assemble Image
														image.composite(background, 0, 0)
														.composite(plate, 0, 0)
														.composite(avatar, 0, 0)
														.composite(xp, 247, 464)
														.print(jimpFontMS36ptTitleWhite, 280, 146, message.author.username, 30)
														.write(attachment, function() {
															message.channel.send(emojiDino + ' ' + message.author.username + '\'s Profile', {
																file: attachment
															});
															message.channel.stopTyping();
															return;
														});
													});
												});
											});
										});
									});	
								});
							});
						});
					});
				});
			});
		});
	});
}