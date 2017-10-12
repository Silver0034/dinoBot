//jimp
exports.profile = function(Jimp,
													 message,
													 key,
													 args,
													 emojiDino) {
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
	//Assembling the picture
	Jimp.read('assets/profile.png', function (err, image) {
		if (err) throw err;
			//XP Bar in Image
			//the max width is 517px
			var xp = new Jimp(517, 11, 0x64FFDAFF, function (err, xp) {
				console.log('IT RUNS THE COMMAND');
				attachment = './assets/userProfile.' + image.getExtension();
				image
					.print(jimpFontMS36ptTitleWhite, 280, 146, 'message.author.username')
					.composite(xp, 247, 464)
					.write(attachment, function() {
						console.log('It gets to the function');
						message.channel.send(emojiDino + ' ' + message.author.username + '\'s Profile', {
							file: attachment
						});
						message.channel.stopTyping();
					});
			});
	});
}