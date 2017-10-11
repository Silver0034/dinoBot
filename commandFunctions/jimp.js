//jimp
// Jimp#getBuffer still doesn't return promise, this method helps us
function encodeJimpImage(image, mime) {
    return new Promise(function (fulfil, reject) {
       image.getBuffer(mime, function (err, data) {
           if (err) reject(err);
           fulfil(data);
       });
    });
}

exports.profile = function(jimpUserCardBlank,
								 userBackground,
								 jimpFontMS16pt500Black,
								 jimpFontMS18pt900White,
								 jimpFontMS24pt100Black,
								 jimpFontMS24pt700Black,
								 jimpFontMS36ptTitleBlack,
								 jimpFontMS36ptTitleWhite,
								 jimpFontMS53ptTitleBlack,
								 message,
								 key,
								 args) {
	return Promise
	.all([
		jimpUserCardBlank,
    userBackground,	
		jimpFontMS16pt500Black,
		jimpFontMS18pt900White,
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
		attachment = './assets/userProfile.' + image.getExtension();
		
		return baseImage.clone()
										.print(FontMS36ptTitleWhite, 280, 146, message.author.username, 500)
										.composite(baseImage, 0, 0);
	})	
	.then(compositedImage => encodeJimpImage(compositedImage, Jimp.MIME_PNG))
	// TODO: Move this elsewhere
	.then(pngImage => channel.sendFile(pngImage, 'welcome.png', '', ''));
}