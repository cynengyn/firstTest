/*preview photos selected by user*/
function handlePhotoFiles(files) {
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var extension = file.name.substring(file.name.lastIndexOf('.'));
    var validFileType = ".bmp, .gif, .jpg, .jpeg, .png"; // white list of extension
    var imageType = /image.*/; // image matching pattern for MIME types
    
    /*check image file size*/
    /*if(file.size > 5 * 1024 * 1024) { //5 MB file size limit
    	alert("Image file exceeds the limit of 5MB.");
    }*/
    
    /*check with the white list of extension*/
    if (validFileType.toLowerCase().indexOf(extension) < 0) {
      alert("Image file with " + extension + " extension is not allowed.");
    }
    
    /*check with a white list of MIME types*/
    else if (!file.type.match(imageType)) {
    	alert("Image file with " + file.type + " MIME type is not allowed.");
    }

    /*check if the filename extension can match with the signature that belongs to it*/
    else {
    	checkFileSignature(file, function(result) {
    		if(result) {
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
    	    
    	    var reader = new FileReader(); // asynchronously read the contents of files
    	    reader.onload = (function(aImg) { 
    	    	return function(e) { 
    	    		aImg.src = e.target.result;
    	  		};
    	    })(img);
    	    reader.readAsDataURL(file);
    	    
      		/*document.getElementById("newPhotoUploadThumbnail").appendChild(img);*/
    	    displayFormAfterPhotosUpload();
    	    document.getElementById("photoCaption").focus();
    	    document.getElementById("photoPostButton").setAttribute("onclick", "addNewLocalPhotoPost();");
    		}
	  		else {
	  			/*alert(file.name + "\nError uploading photo.");*/
	  			swal({
	  			  title: "",
	  			  text: file.name + "\nError uploading photo.",
	  			  confirmButtonText: "OK"
	  			});
				}
    	});
    }
  	
    
    /*var img = document.createElement("img");
    img.classList.add("img-responsive");
    img.id = "photoPreview"
    img.file = file;*/
    
    /* var spanRemoveButton = document.createElement("span");	
		var spanButtonImageGroup = document.createElement("span");
		
		spanRemoveButton.setAttribute('id', 'removeImageButton');
		spanRemoveButton.setAttribute('onclick', 'removePhotoUrl()');
		spanRemoveButton.innerHTML = "&times;";
		spanButtonImageGroup.setAttribute('id', 'removeImageButtonGroup');			
		
		spanButtonImageGroup.appendChild(spanRemoveButton);
		spanButtonImageGroup.appendChild(img);
		
    document.getElementById("newPhotoUploadThumbnail").appendChild(spanButtonImageGroup);*/
    
    /*using FileReader to display the image content*/
    /*var reader = new FileReader(); // asynchronously read the contents of files
    reader.onload = (function(aImg) { 
    	return function(e) { 
    		aImg.src = e.target.result;
  		};
    })(img);
    reader.readAsDataURL(file);*/
  }
  /*document.getElementById("newPhotoUploadThumbnail").appendChild(img);*/
  /*displayFormAfterPhotosUpload();
  document.getElementById("photoCaption").focus();
  document.getElementById("photoPostButton").setAttribute("onclick", "addNewLocalPhotoPost();");*/
}

function alert2(message, title, buttonText) {

  buttonText = (buttonText == undefined) ? "Ok" : buttonText;
  title = (title == undefined) ? "The page says:" : title;

  var div = $('<div>');
  div.html(message);
  div.attr('title', title);
  div.dialog({
      autoOpen: true,
      modal: true,
      draggable: false,
      resizable: false,
      buttons: [{
          text: buttonText,
          click: function () {
              $(this).dialog("close");
              div.remove();
          }
      }]
  });
}

/*get the extension of a file*/
function getFileExtension(fileName) {
  var matches = fileName && fileName.match(/\.([^.]+)$/);
  if (matches) {
    return matches[1].toLowerCase();
  }
  return '';
}

/*detect if the format of the extension can match with the signature that belongs to*/
function checkFileSignature(file, callback) {
	var signature = {
    jpg: {
      signature: ["FFD8FFE0","FFD8FFE1","FFD8FFE8"],
      offset: 0,
      sizet: 4
    },
		jpeg: {
      signature: "FFD8FFE0",
      offset: 0,
      sizet: 4
    },
    gif: {
    	signature: "47494638",
      offset: 0,
      sizet: 4
    },
    png: {
    	signature: "89504E47",
      offset: 0,
      sizet: 4
    },
    bmp: {
    	signature: "424D",
      offset: 0,
      sizet: 2
    }
	}
  var ext = getFileExtension(file.name);
	var fileSign = signature[ext];
  var slice = file.slice(fileSign.offset, fileSign.offset + fileSign.sizet); // slice file from offset to sizet
  var reader = new FileReader();  
  reader.onload = function(e) {
    var buffer = reader.result, // The result ArrayBuffer
        view = new DataView(buffer), // Get access to the result bytes
        signature; // Read 4 or 2 bytes

    // get Hex String of file Signature, 32bit only contain 4 bytes
    if(view.byteLength == 4) {
      signature = view.getUint32(0, false).toString(16);
    }
    else if(view.byteLength == 2) {
      signature = view.getUint16(0, false).toString(16);
    }
    else {
      callback(false);
      return ;
    }
    signature = signature.toUpperCase();

    // check signature in file signature
    if (!jQuery.isArray(fileSign.signature)) {
      fileSign.signature = [fileSign.signature];
    }
    if (jQuery.inArray(signature, fileSign.signature) !== -1) {
      callback(true);
    }
  };
  reader.readAsArrayBuffer(slice); // Read the slice of the file
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





