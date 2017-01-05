/*preview photos selected by user*/
function handlePhotoFiles(files) {
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var imageType = /^image\//;
    
    if (!imageType.test(file.type)) {
      continue;
    }
    
    var img = document.createElement("img");
    img.classList.add("img-responsive");
    img.id = "photoPreview"
    img.file = file;
    
    var spanRemoveButton = document.createElement("span");	
		var spanButtonImageGroup = document.createElement("span");
		
		spanRemoveButton.setAttribute('id', 'removeImageButton');
		spanRemoveButton.setAttribute('onclick', 'removePhotoUrl()');
		spanRemoveButton.innerHTML = "&times;";
		spanButtonImageGroup.setAttribute('id', 'removeImageButtonGroup');			
		
		spanButtonImageGroup.appendChild(spanRemoveButton);
		spanButtonImageGroup.appendChild(img);
		
    document.getElementById("newPhotoUploadThumbnail").appendChild(spanButtonImageGroup);
    
    /*using FileReader to display the image content*/
    var reader = new FileReader(); // asynchronously read the contents of files
    reader.onload = (function(aImg) { 
    	return function(e) { 
    		aImg.src = e.target.result;
  		};
    })(img);
    reader.readAsDataURL(file);
  }
  
  displayFormAfterPhotosUpload();
  document.getElementById("photoCaption").focus();
  document.getElementById("photoPostButton").setAttribute("onclick", "addNewLocalPhotoPost();");
}

/*validate and preview photos from web url*/
function validatePhotoURL() {
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

/*validate and preview another photo from web url*/
function validateAnotherPhotoURL() {
	var urlregex = new RegExp("\\b(https?|ftp|file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]\\.(bmp|gif|jpe?g|png)$", "i");
	
	if(urlregex.test(document.getElementById("addAnotherPhotoFromWebInput").value)) {
		var img = new Image();
		img.src = document.getElementById("addAnotherPhotoFromWebInput").value;
		
		img.onload = function() {
			var spanRemoveButton = document.createElement("span");	
			var spanButtonImageGroup = document.createElement("span");
			
			spanRemoveButton.setAttribute('id', 'removeImageButton');
			spanRemoveButton.innerHTML = "&times;";
			spanButtonImageGroup.setAttribute('id', 'removeImageButtonGroup');
			
			spanButtonImageGroup.appendChild(spanRemoveButton);
			spanButtonImageGroup.appendChild(img);
			
	  	img.classList.add("img-responsive");
	  	document.getElementById("newPhotoUploadThumbnail").appendChild(spanButtonImageGroup);
	    
	    displayAgainAddAnotherPhotoFromWebButton();
	    document.getElementById("photoCaption").focus();	    
	    document.getElementById("photoPostButton").setAttribute("onclick", "addNewWebPhotoPost();");
	  };
	}
}

/*display photo post caption and tag form after photos selected*/
function displayFormAfterPhotosUpload() {
	document.getElementById("addAnotherPhotoButton").style.display = "block"; // show add another photo button
	document.getElementById("photoCaption").style.display = "block";
	document.getElementById("photoTag").style.display = "block";
	document.getElementById("newPhotoUploadPanel").style.display = "none"; // hide the normal photo upload panel
}

/*display photo post caption and tag form after add photo from web*/
function displayFormAfterPhotoURL() {
	document.getElementById("addAnotherPhotoFromWebButton").style.display = "block"; // show add another photo from web button
	document.getElementById("photoCaption").style.display = "block";
	document.getElementById("photoTag").style.display = "block";
	document.getElementById("urlPhotoUploadPanel").style.display = "none"; // hide the normal add photo from web panel
}

function displayPhotoURLInput() {
	document.getElementById("addAnotherPhotoFromWebButton").style.display = "none";
	document.getElementById("addAnotherPhotoFromWebDiv").style.display = "block";
  
	$("#addAnotherPhotoFromWebDiv").find("#addAnotherPhotoFromWebInput").focus();
}

function displayAgainAddAnotherPhotoFromWebButton() {
	document.getElementById("addAnotherPhotoFromWebButton").style.display = "block"; // show add another photo from web button
	document.getElementById("addAnotherPhotoFromWebDiv").style.display = "none";
}

/*photo upload using drag and drop $("#modalFade").on("shown.bs.modal", function()*/
/*$(document).ready(function() {*/
$("#modalFade").on("shown.bs.modal", function() {
	console.log("OPEN");
	var dropboxPhotoUploadColumn;
	var dropboxNewPhotoUploadThumbnail;
	
	if(document.getElementById("photoUploadColumn") != null) {
		console.log("IN");
		dropboxPhotoUploadColumn = document.getElementById("photoUploadColumn");
		dropboxPhotoUploadColumn.addEventListener("dragenter", dragenter, false);
		dropboxPhotoUploadColumn.addEventListener("dragover", dragover, false);
		dropboxPhotoUploadColumn.addEventListener("drop", drop, false);
	}
	else if (document.getElementById("newPhotoUploadThumbnail") != null) {
		dropboxNewPhotoUploadThumbnail = document.getElementById("newPhotoUploadThumbnail");
		dropboxNewPhotoUploadThumbnail.addEventListener("dragenter", dragenter, false);
		dropboxNewPhotoUploadThumbnail.addEventListener("dragover", dragover, false);
		dropboxNewPhotoUploadThumbnail.addEventListener("drop", drop, false);		
	}
	
	function dragenter(e) {
	  e.stopPropagation();
	  e.preventDefault();
	}

	function dragover(e) {
	  e.stopPropagation();
	  e.preventDefault();
	}
	
	function drop(e) {
	  e.stopPropagation();
	  e.preventDefault();

	  var dt = e.dataTransfer;
	  var files = dt.files;

	  handlePhotoFiles(files);
	}
});

/*show url photo upload panel and hide the normal photo upload panel*/
function photoUrlPanelDisplay() {
	document.getElementById("newPhotoUploadPanel").style.display = "none";
	document.getElementById("urlPhotoUploadPanel").style.display = "block";
	document.getElementById("urlPhotoUploadInput").focus();
}

function closePhotoUrlPanel() {
	document.getElementById("newPhotoUploadPanel").style.display = "block";
	document.getElementById("urlPhotoUploadPanel").style.display = "none";
}

function removePhotoUrl() {
	document.getElementById("newPhotoUploadPanel").style.display = "block";
	document.getElementById("urlPhotoUploadPanel").style.display = "none";
	document.getElementById("removeImageButtonGroup").remove();
	document.getElementById("addAnotherPhotoFromWebButton").style.display = "none";
	document.getElementById("addAnotherPhotoButton").style.display = "none";
	/*document.getElementById("photoCaption").style.display = "none";
	document.getElementById("photoTag").style.display = "none";*/
	document.getElementById("urlPhotoUploadInput").value = "";
	/*document.getElementById("photoCaption").innerHTML = "";
	document.getElementById("photoTag").value = "";*/
}

/*remove <br type="_moz"> type attribute created when enter key is pressed*/
$(document)
.on('keyup', '#photoCaption', function(event) {
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





