/*validate and preview audio from web url*/
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

function getAudioUrl() {
	return document.getElementById("urlAudioUploadInput").value;
}

function isRegExpMatch(urlregex) {
	return urlregex.test(getAudioUrl());
}

function webUrlRegExp() {
	return new RegExp("\\b(https?|ftp|file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|!:,.;]\\.(mp3)$", "i");
}