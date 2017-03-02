/**
 * Functions to handle image from URL.
 * 
 * @class HandleWebPhotoURL
*/

/**
 * Validate URL and preview image from web.
 * 
 * @method validatePhotoURL
 * @param type {String} To indicate if it's the first image.
 */
function validatePhotoURL(type) {
	var urlregex = photoUrlRegExp();

	if(type == "New") {
		var match = isMatchPhotoUrlRegExp("New", urlregex);
		var photoUrl = getPhotoUrlInput();
	}
	else if(type == "More") {
		var match = isMatchPhotoUrlRegExp("More", urlregex);
		var photoUrl = getMorePhotoUrlInput();
	}
	
	if(match) {
		var img = createImgElement("Web", "", photoUrl);
		
		img.onload = function() {
			createPhotoPreview("Web", img);	
		};
	}
}

/**
 * Get the first new web image URL.
 * 
 * @method getPhotoUrlInput
 */
function getPhotoUrlInput() {
	return document.getElementById("urlPhotoUploadInput").value;
}

/**
 * Get new web image URL in sequence after the first one.
 * 
 * @method getMorePhotoUrlInput
 */
function getMorePhotoUrlInput() {
	return document.getElementById("addAnotherPhotoFromWebInput").value;
}

/**
 * Check if the image URL is valid.
 * 
 * @method isMatchPhotoUrlRegExp
 * @param inputType {String} Indicate if it is the first image or not.
 * @param urlregex {String} Regular expression for validate web image URL.
 * @return {Boolean} True of False.
 */
function isMatchPhotoUrlRegExp(inputType, urlregex) {
	if(inputType == "New" && urlregex.test(getPhotoUrlInput()))
		return true;
	else if(inputType == "More" && urlregex.test(getMorePhotoUrlInput()))
		return true;
	else
		return false;
}

/**
 * Get Regular Expression object to match web image URL.
 * 
 * @method photoUrlRegExp
 * @return {RegExp} Regular expression to match web image URL.
 */
function photoUrlRegExp() {
	return new RegExp("\\b(https?|ftp|file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]", "i");
	/*return new RegExp("\\b(https?|ftp|file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]\\.(bmp|gif|jpe?g|png)$", "i");*/
}