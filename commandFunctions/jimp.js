//jimp
exports.profile = function(JIMP,
													 message,
													 key,
													 args,
													 EMOJIDINO,
													 attachment,
													 sqldb) {
	console.log('1');
	sqldb.query("SELECT * FROM user WHERE userID = " + message.author.id, function (err, results, fields) {
		var userBackground = results[0].userBackground;
		console.log('2');
		console.log(userBackground);
		//Assembling the picture
		var userCard = new JIMP(800, 500, 0x000000, function (err, image) {
			console.log('2.1');
			//set where the picture will be saved at the end
			attachment = './assets/UserProfile.png';
			if (err) throw err;
			console.log('2.2');
			// Put Plate over Background
			JIMP.read(userBackground, function (err, background) {
				console.log('3');
				background.cover(800, 198)
				.blur(1)
				.brightness(-0.2);
				if (err) throw err;
				JIMP.read('./assets/profile.png', function (err, plate) {
					console.log('4');
					//XP BAR in image
					//XP Bar Max Width = 517px
					//TODO: Make Width Represent percentage to next level
					var xp = new JIMP(517, 11, 0x64FFDAFF, function (err, xp) {
						//Avatar Mask
						//Set default if null
						var avatarPath = './assets/avatarDefault.png';
						if (message.author.avatarURL != null) {
							avatarPath = message.author.avatarURL;
						}
						JIMP.read('./assets/avatarCircleMask.png', function (err, mask) {
							console.log('5');
							//Avatar
							JIMP.read(avatarPath, function (err, avatar) {
								//Assemble Avatar
								avatar.cover(193, 193)
								.mask(mask, 0, 0);
								//Loads Fonts
								console.log('6');
								JIMP.loadFont('./assets/fonts/museo-sans-500-16pt-black.fnt').then(function (jimpFontMS16pt500Black) {
									JIMP.loadFont('./assets/fonts/museo-sans-900-18pt-white.fnt').then(function (jimpFontMS18pt900White) {
										JIMP.loadFont('./assets/fonts/museo-sans-100-24pt-black.fnt').then(function (jimpFontMS24pt100Black) {
											JIMP.loadFont('./assets/fonts/museo-sans-700-24pt-black.fnt').then(function (jimpFontMS24pt700Black) {
												JIMP.loadFont('./assets/fonts/museo-sans-title-36pt-black.fnt').then(function (jimpFontMS36ptTitleBlack) {
													JIMP.loadFont('./assets/fonts/museo-sans-title-36pt-white.fnt').then(function (jimpFontMS36ptTitleWhite) {
														JIMP.loadFont('./assets/fonts/museo-sans-title-53pt-black.fnt').then(function (jimpFontMS53ptTitleBlack) {
															//Assemble Image
															console.log('7');
															image.composite(background, 0, 0)
															.composite(plate, 0, 0)
															.composite(avatar, 27, 94)
															.composite(xp, 247, 464)
															.print(jimpFontMS36ptTitleWhite, 280, 146, message.author.username)
															.write(attachment, function() {
																message.channel.send(EMOJIDINO + ' ' + message.author.username + '\'s Profile', {
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
	});
}