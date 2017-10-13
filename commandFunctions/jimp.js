//jimp
exports.profile = function(Jimp,
													 message,
													 key,
													 args,
													 emojiDino,
													 attachment,
													 sqldb) {

	//Assembling the picture
	var userBackground = '';
	var userCard = new Jimp(800, 500, 0x000000, function (err, image) {
		//set where the picture will be saved at the end
		attachment = './assets/UserProfile.png';
		if (err) throw err;
		sqldb.query("SELECT * FROM user WHERE userID = " + message.author.id, function (err, results, fields) {
			userBackground = results[0].userBackground;
		})
			// Put Plate over Background
			Jimp.read(userBackground, function (err, background) {
				background.cover(800, 198)
				.blur(1)
				.brightness(-0.2);
				if (err) throw err;
				Jimp.read('./assets/profile.png', function (err, plate) {
					//XP BAR in image
					//XP Bar Max Width = 517px
					//TODO: Make Width Represent percentage to next level
					var xp = new Jimp(517, 11, 0x64FFDAFF, function (err, xp) {
						//Avatar Mask
						//Set default if null
						var avatarPath = './assets/avatarDefault.png';
						if (message.author.avatarURL != null) {
							avatarPath = message.author.avatarURL;
						}
						Jimp.read('./assets/avatarCircleMask.png', function (err, mask) {
							//Avatar
							Jimp.read(avatarPath, function (err, avatar) {
								//Assemble Avatar
								avatar.cover(193, 193)
								.mask(mask, 0, 0);
								//Loads Fonts
								Jimp.loadFont('./assets/fonts/museo-sans-500-16pt-black.fnt').then(function (jimpFontMS16pt500Black) {
									Jimp.loadFont('./assets/fonts/museo-sans-900-18pt-white.fnt').then(function (jimpFontMS18pt900White) {
										Jimp.loadFont('./assets/fonts/museo-sans-100-24pt-black.fnt').then(function (jimpFontMS24pt100Black) {
											Jimp.loadFont('./assets/fonts/museo-sans-700-24pt-black.fnt').then(function (jimpFontMS24pt700Black) {
												Jimp.loadFont('./assets/fonts/museo-sans-title-36pt-black.fnt').then(function (jimpFontMS36ptTitleBlack) {
													Jimp.loadFont('./assets/fonts/museo-sans-title-36pt-white.fnt').then(function (jimpFontMS36ptTitleWhite) {
														Jimp.loadFont('./assets/fonts/museo-sans-title-53pt-black.fnt').then(function (jimpFontMS53ptTitleBlack) {
															//Assemble Image
															image.composite(background, 0, 0)
															.composite(plate, 0, 0)
															.composite(avatar, 27, 94)
															.composite(xp, 247, 464)
															.print(jimpFontMS36ptTitleWhite, 280, 146, message.author.username)
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