/**
 * Functions for Photo Post HTML Elements.
 * 
 * @class Photo
*/

/**
 * Remove <br type="_moz"> type attribute created when enter key is pressed.
 */
$(document).on('keyup', '#photoCaption', function(event) {
  var key = event.keyCode || event.charCode;

  if(key == 13) { // enter key is pressed
  	var inputs = document.getElementsByTagName('br');
  	
  	for(var i = 0; i < inputs.length; i++) { // remove <br type="_moz"> type attribute
      if(inputs[i].getAttribute("type") == '_moz') {
      	inputs[i].removeAttribute("type");
      }
  	}
  }
  else if(key == 8 || key == 46) { // backspace || delete key is pressed
  	// clear the last <br> left in text area input when is empty to show the placeholder with css 
	  if($("#photoCaption").text() == '') {
	      $("#photoCaption").empty();
	  }
  }
});

/**
 * Close web photo URL input field.
 * 
 * @Method closePhotoUrlPanel
 */
function closePhotoUrlPanel() {
	document.getElementById("newPhotoUploadPanel").style.display = "block";
	document.getElementById("urlPhotoUploadPanel").style.display = "none";
}

/**
 * Create HTML image element.
 * 
 * @Method createImgElement
 * @param type {String} Indicate if image is from local or web.
 * @param imgFile {Image file} Local image file.
 * @param imgUrl {String} Web image URL.
 * @return {img} HTML image element.
 */
function createImgElement(type, imgFile, imgUrl) {
	var img = document.createElement("img");
  img.classList.add("img-responsive");
  img.id = "photoPreview"
  	
  if(type == "Local")
  	img.file = imgFile;
  else if(type == "Web")
  	img.src = imgUrl;
  
  return img;
}

/**
 * Create HTML elements for image preview.
 * 
 * @Method createPhotoPreview
 * @param type {String} Indicate if image is from local or web.
 * @param photo {img} HTML image element.
 */
function createPhotoPreview(type, photo) {
	var spanRemoveButton = document.createElement("span");
	var divPhotoGroup = document.createElement("div");
	
	spanRemoveButton.setAttribute('id', 'removeImageButton');
	spanRemoveButton.innerHTML = "&times;";
	divPhotoGroup.setAttribute('id', 'removeImageButtonGroup');

	divPhotoGroup.appendChild(spanRemoveButton);
	divPhotoGroup.appendChild(photo);
	document.getElementById("newPhotoUploadThumbnail").appendChild(divPhotoGroup);
	
	displayFormAfterPhotoSelected(type);
	
	if(type == "Local") {
		spanRemoveButton.setAttribute('onclick', 'removePhotoPreview("Local")');
		document.getElementById("photoPostButton").setAttribute("onclick", "addNewLocalPhotoPost();");
	}
	else if(type == "Web") {
		spanRemoveButton.setAttribute('onclick', 'removePhotoPreview("Web")');
		document.getElementById("photoPostButton").setAttribute("onclick", "addNewWebPhotoPost();");
	}
}

/**
 * Show "Add another photo from web" button.
 * 
 * @Method displayAgainAddAnotherPhotoFromWebButton
 */
function displayAgainAddAnotherPhotoFromWebButton() {
	document.getElementById("addAnotherPhotoFromWebButton").style.display = "block"; // show add another photo from web button
	document.getElementById("addAnotherPhotoFromWebDiv").style.display = "none";
}

/**
 * Show photo post caption and tag input after image selected*.
 * 
 * @Method displayFormAfterPhotoSelected
 * @Param displayType {String} Indicate if image is from local or web.
 */
function displayFormAfterPhotoSelected(displayType) {
	document.getElementById("photoCaption").style.display = "block";
	document.getElementById("photoTag").style.display = "block";
	document.getElementById("photoCaption").focus();
	
	if(displayType == "Local") {
		/*document.getElementById("addAnotherPhotoButton").style.display = "block";*/ // show add another photo button
		document.getElementById("newPhotoUploadPanel").style.display = "none"; // hide the normal photo upload panel
  }
	else if(displayType == "Web") {
		/*document.getElementById("addAnotherPhotoFromWebButton").style.display = "block";*/ // show add another photo from web button
		document.getElementById("urlPhotoUploadPanel").style.display = "none"; // hide the normal add photo from web panel
	}
}

/**
 * Show web image URL input field.
 * 
 * @Method displayPhotoURLInput
 */
function displayPhotoURLInput() {
	document.getElementById("addAnotherPhotoFromWebButton").style.display = "none";
	document.getElementById("addAnotherPhotoFromWebDiv").style.display = "block";
  
	$("#addAnotherPhotoFromWebDiv").find("#addAnotherPhotoFromWebInput").focus();
}

/**
 * Show web photo upload panel and hide the normal photo upload panel.
 * 
 * @Method displayPhotoUrlPanel
 */
function displayPhotoUrlPanel() {
	document.getElementById("newPhotoUploadPanel").style.display = "none";
	document.getElementById("urlPhotoUploadPanel").style.display = "block";
	document.getElementById("urlPhotoUploadInput").focus();
}

/**
 * Clear and hide all unnecessary fields when image preview is removed.
 * 
 * @Method removePhotoPreview
 * @Param removeType {String} Indicate if image is from local or web.
 */
function removePhotoPreview(removeType) {
	document.getElementById("newPhotoUploadPanel").style.display = "block";
	document.getElementById("removeImageButtonGroup").remove();
	document.getElementById("photoCaption").style.display = "none";
	document.getElementById("photoTag").style.display = "none";
	document.getElementById("photoCaption").innerHTML = "";
	document.getElementById("photoTag").value = "";
	
	if(removeType == "Local") {
    document.getElementById("addAnotherPhotoButton").style.display = "none";
  }  
  else if(removeType == "Web") {
  	document.getElementById("urlPhotoUploadPanel").style.display = "none";
  	document.getElementById("urlPhotoUploadInput").value = "";
  	document.getElementById("addAnotherPhotoFromWebButton").style.display = "none";
	}
}