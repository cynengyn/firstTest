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
    document.getElementById("newPhotoUploadThumbnail").appendChild(img);
    
    /*using FileReader to display the image content*/
    var reader = new FileReader(); // asynchronously read the contents of files
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(file);
  }
  
  displayFormAfterPhotosUpload();
  document.getElementById("photoCaption").focus();
}

/*validate and preview photos from web url*/
function validatePhotoURL() {
	var img = new Image();
  img.onload = function() {
  	img.classList.add("img-responsive");
  	document.getElementById("newPhotoUploadThumbnail").appendChild(img);
    
    var reader = new FileReader(); // asynchronously read the contents of files
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
//    reader.readAsDataURL(file);
    
    displayFormAfterPhotoURL();
    document.getElementById("photoCaption").focus();
  };
  
  img.onerror = function() {
//  	alert('Image onload=' + false);
  };
  img.src = document.getElementById("urlPhotoUploadInput").value;
}

/*validate and preview another photo from web url*/
function validateAnotherPhotoURL() {
	var img = new Image();
  img.onload = function() {
  	img.classList.add("img-responsive");
  	document.getElementById("newPhotoUploadThumbnail").appendChild(img);
    
    var reader = new FileReader(); // asynchronously read the contents of files
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
//  reader.readAsDataURL(file);
    
    displayAgainAddAnotherPhotoFromWebButton();
    document.getElementById("photoCaption").focus();
  };
  
  img.onerror = function() {
//	alert('Image onload=' + false);
  };
  img.src = document.getElementById("addAnotherPhotoFromWebInput").value;
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
$(document).ready(function() {
/*$("#modalFade").on("shown.bs.modal", function() {*/
	var dropboxPhotoUploadColumn;
	var dropboxNewPhotoUploadThumbnail;
	
	if(document.getElementById("photoUploadColumn") != null) {
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