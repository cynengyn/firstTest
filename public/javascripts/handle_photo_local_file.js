/**
 * Functions to handle photo image selected by user.
 * 
 * @class HandleLocalPhoto
*/

/**
 * Validate and preview image file selected by user.
 * 
 * @method handlePhotoFiles
 * @param files {Files} Image file.
 */
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

/**
 * Check image file extension with the white list of extension.
 * 
 * @method checkPhotoExtension
 * @param extension {String} Extension of image file.
 * @return {Boolean} True of False.
 */
function checkPhotoExtension(extension) {
	var validFileType = "bmp, gif, jpg, jpeg, png"; // white list of extension

	if(validFileType.toLowerCase().indexOf(extension) < 0)
		return true;
	else
		return false;
}

/**
 * Validate if the format of the extension can match with the signature that belongs to.
 * 
 * @method checkPhotoSignature
 * @param extension {String} Extension of image file.
 * @param file {Image file}
 * @param {Function} callback
 * @return {Boolean} True of False.
 */
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

/**
 * Check if image file size greater than 10MB.
 * 
 * @method checkPhotoSize
 * @param {size} Image file size.
 * @return {Boolean} True of False.
 */
function checkPhotoSize(size) {
	if(size > 10 * 1024 * 1024) // 10MB file size limit
		return true;
	else
		return false;
}

/**
 * Create HTML image element.
 * 
 * @method createLocalImgElement
 * @param imgFile (Image file) Local image file selected by user.
 * @return HTML image element.
 */
function createLocalImgElement(imgFile) {
	var img = document.createElement("img");
  img.classList.add("img-responsive");
  img.id = "photoPreview"
  img.file = imgFile;
  
  return img;
}