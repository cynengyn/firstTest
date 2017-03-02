/**
 * Functions to handle web audio URL.
 * 
 * @class HandleWebAudioURL
*/

/**
 * Get web audio URL.
 * 
 * @method getAudioUrl
 */
function getAudioUrl() {
	return document.getElementById("urlAudioUploadInput").value;
}

/**
 * Check if the web audio URL is valid.
 * 
 * @method isRegExpMatch
 * @param urlregex {String} Regular expression for validate web audio URL.
 * @return {Boolean} True of False.
 */
function isRegExpMatch(urlregex) {
	return urlregex.test(getAudioUrl());
}

/**
 * Validate URL and preview audio from web.
 * 
 * @method validateAudioURL
 */
function validateAudioURL() {
	var urlregex = webUrlRegExp();
	var match = isRegExpMatch(urlregex);
	
	if(match) {
		var audio = createAudioElement();
		audio.src = getAudioUrl();
		
		audio.onloadedmetadata = function() {
			createAudioPreview("Web", audio);
		};
	}
}

/**
 * Get Regular Expression object to match web audio URL.
 * 
 * @method webUrlRegExp
 * @return {RegExp} Regular expression to match web audio URL.
 */
function webUrlRegExp() {
	return new RegExp("\\b(https?|ftp|file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|!:,.;]\\.(mp3)$", "i");
}