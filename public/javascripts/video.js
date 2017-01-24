/*show url video upload panel and hide the normal video upload panel*/
function photoUrlPanelDisplay() {
	document.getElementById("newVideoUploadPanel").style.display = "none";
	document.getElementById("urlVideoUploadPanel").style.display = "block";
	document.getElementById("urlVideoUploadInput").focus();
}

function closeVideoUrlPanel() {
	document.getElementById("newVideoUploadPanel").style.display = "block";
	document.getElementById("urlVideoUploadPanel").style.display = "none";
}

/*display video post description and tag form after local video is selected*/
function displayFormAfterLocalVideoSelected() {
	document.getElementById("videoPermission").style.display = "block";
	document.getElementById("videoCaption").style.display = "block";
	document.getElementById("videoTag").style.display = "block";
	document.getElementById("newVideoUploadPanel").style.display = "none";
	document.getElementById("newVideoUploadPreview").style.display = "block";
}

/*clear and hide all necessary fields when video url is removed*/
function removeLocalVideoPreview() {
	document.getElementById("newVideoUploadPanel").style.display = "block";
	document.getElementById("newVideoUploadPreview").style.display = "none";
	document.getElementById("urlVideo").pause();
	document.getElementById("urlVideo").src = "";
	document.getElementById("removeVideoGroup").remove();
	document.getElementById("videoCaption").style.display = "none";
	document.getElementById("videoTag").style.display = "none";
	/*document.getElementById("urlVideoUploadInput").value = "";*/
	document.getElementById("videoCaption").innerHTML = "";
	document.getElementById("videoTag").value = "";
  document.getElementById("videoPermission").style.display = "none";
}



/*validate and preview photos from web url*/
function validateVideoURL() {
	var urlregex = new RegExp("\\b(https?|ftp|file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]\\.(bmp|gif|jpe?g|png)$", "i");
	
	if(urlregex.test(document.getElementById("urlPhotoUploadInput").value)) {
		var img = new Image();
		img.src = document.getElementById("urlPhotoUploadInput").value;
		
		img.onload = function() {
			var spanRemoveButton = document.createElement("span");	
			var spanButtonImageGroup = document.createElement("span");
			
			spanRemoveButton.setAttribute('id', 'removeImageButton');
			spanRemoveButton.setAttribute('onclick', 'removePhotoUrl()');
			spanRemoveButton.innerHTML = "&times;";
			spanButtonImageGroup.setAttribute('id', 'removeImageButtonGroup');			
			
			spanButtonImageGroup.appendChild(spanRemoveButton);
			spanButtonImageGroup.appendChild(img);
			
			img.classList.add("img-responsive");
	  	document.getElementById("newPhotoUploadThumbnail").appendChild(spanButtonImageGroup);

	    displayFormAfterPhotoURL();
	    document.getElementById("photoCaption").focus();			
	    document.getElementById("photoPostButton").setAttribute("onclick", "addNewWebPhotoPost();");
		};
	}
}