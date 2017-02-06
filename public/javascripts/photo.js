/*remove <br type="_moz"> type attribute created when enter key is pressed*/
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

function closePhotoUrlPanel() {
	document.getElementById("newPhotoUploadPanel").style.display = "block";
	document.getElementById("urlPhotoUploadPanel").style.display = "none";
}

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

function displayAgainAddAnotherPhotoFromWebButton() {
	document.getElementById("addAnotherPhotoFromWebButton").style.display = "block"; // show add another photo from web button
	document.getElementById("addAnotherPhotoFromWebDiv").style.display = "none";
}

/*display photo post caption and tag form after photos selected*/
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

function displayPhotoURLInput() {
	document.getElementById("addAnotherPhotoFromWebButton").style.display = "none";
	document.getElementById("addAnotherPhotoFromWebDiv").style.display = "block";
  
	$("#addAnotherPhotoFromWebDiv").find("#addAnotherPhotoFromWebInput").focus();
}

/*show url photo upload panel and hide the normal photo upload panel*/
function displayPhotoUrlPanel() {
	document.getElementById("newPhotoUploadPanel").style.display = "none";
	document.getElementById("urlPhotoUploadPanel").style.display = "block";
	document.getElementById("urlPhotoUploadInput").focus();
}

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