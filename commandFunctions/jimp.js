//jimp
exports.profile = function() {
	.all([
		jimpUserCardBlank,
    userBackground,	
		jimpFontMS16pt500Black,
		jimpFontMS18pt900Black,
		jimpFontMS24pt100Black,
		jimpFontMS24pt700Black,
		jimpFontMS36ptTitleBlack,
		jimpFontMS36ptTitleWhite,
		jimpFontMS53ptTitleBlack,
	])
	.then(function (results) {
		const avatar = message.author.avatarURL;
		const baseImage = results[0];
		var userBackground = results[1]
		const FontMS36ptTitleWhite = results[7];
		
		return baseImage.clone()
										.print(FontMS36ptTitleWhite, 280, 146, message.author.username, 500)
										.composite(baseImage, 0, 0);
										.write(attachment, function() {
											message.channel.send(emojiDino + ' ' + message.author.username + '\'s Profile', {
												file: attachment
											});
											message.channel.stopTyping();
										})
	})	
}