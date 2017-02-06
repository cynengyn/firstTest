/*validate and preview photos from web url*/
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

function getPhotoUrlInput() {
	return document.getElementById("urlPhotoUploadInput").value;
}

function getMorePhotoUrlInput() {
	return document.getElementById("addAnotherPhotoFromWebInput").value;
}

function isMatchPhotoUrlRegExp(inputType, urlregex) {
	if(inputType == "New" && urlregex.test(getPhotoUrlInput()))
		return true;
	else if(inputType == "More" && urlregex.test(getMorePhotoUrlInput()))
		return true;
	else
		return false;
}

function photoUrlRegExp() {
	return new RegExp("\\b(https?|ftp|file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]", "i");
	/*return new RegExp("\\b(https?|ftp|file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]\\.(bmp|gif|jpe?g|png)$", "i");*/
}