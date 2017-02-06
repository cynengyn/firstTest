/*preview photos selected by user*/
function handlePhotoFiles(files) {
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var extension = getFileExtension(file.name);
    
    /*check image file size*/
    if(checkPhotoSize(file.size)) { // 10MB file size limit
    	swal({
			  title: "",
			  text: "The file is too big. Squish it \n down, and try again!",
			  confirmButtonText: "OK"
			});
    }
    
    /*check with the white list of extension*/
    else if (checkPhotoExtension(extension)) {
    	swal({
			  title: "",
			  text: file.name + "\n Nice image, but we don't support \n that format. Try resaving it as a \n gif, jpg, or png.",
			  confirmButtonText: "OK"
			});
    }

    /*check if the filename extension can match with the signature that belongs to it*/
    else {
    	checkPhotoSignature(extension, file, function(result) {
    		if(result) {
    			var img = createImgElement("Local", file, "");
    			createPhotoPreview("Local", img);    			
    			
    	    /*using FileReader to display the image content*/
    	    var reader = new FileReader(); // asynchronously read the contents of files
    	    reader.onload = (function(aImg) { 
    	    	return function(e) { 
    	    		aImg.src = e.target.result;
    	  		};
    	    })(img);
    	    reader.readAsDataURL(file);

    	    displayFormAfterPhotoSelected("Local");
    		}
	  		else {
	  			swal({
	  			  title: "",
	  			  text: file.name + "\nError uploading photo.",
	  			  confirmButtonText: "OK"
	  			});
				}
    	});
    }
  }
}

/*detect if the format of the extension can match with the signature that belongs to*/
function checkPhotoSignature(extension, file, callback) {
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
	var fileSign = signature[extension];
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
      swal({
			  title: "",
			  text: file.name + "\n Nice image, but we don't support \n that format. Try resaving it as a \n gif, jpg, or png.",
			  confirmButtonText: "OK",
			  animation: true
			});
      $('.confirm').focus();
      return ;
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
    else {
    	swal({
			  title: "",
			  text: file.name + "\n Nice image, but we don't support \n that format. Try resaving it as a \n gif, jpg, or png.",
			  confirmButtonText: "OK"
			});
      return ;
    }
  };
  reader.readAsArrayBuffer(slice); // Read the slice of the file
}

/*check with the white list of extension*/
function checkPhotoExtension(extension) {
	var validFileType = "bmp, gif, jpg, jpeg, png"; // white list of extension

	if(validFileType.toLowerCase().indexOf(extension) < 0)
		return true;
	else
		return false;
}

/*check image file size*/
function checkPhotoSize(size) {
	if(size > 10 * 1024 * 1024) // 10MB file size limit
		return true;
	else
		return false;
}

function createLocalImgElement(imgFile) {
	var img = document.createElement("img");
  img.classList.add("img-responsive");
  img.id = "photoPreview"
  img.file = imgFile;
  
  return img;
}