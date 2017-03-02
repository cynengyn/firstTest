/**
 * Functions to handle audio album art.
 * 
 * @class HandleAudioAlbumArt
*/

/**
 * Validate and preview album art image file selected by user.
 * 
 * @method handleAlbumArt
 * @param files {Files} Album art image file.
 */
function handleAlbumArt(files) {
  var artFile = files[0];
  var extension = getFileExtension(artFile.name);
  
  /*check image file size*/
  if(checkAlbumArtSize(artFile.size)) { // 10MB file size limit
  	swal({
		  title: "",
		  text: "The file is too big. Squish it \n down, and try again!",
		  confirmButtonText: "OK"
		});
  }
  
  /*check with the white list of extension*/
  else if (checkAlbumArtExtension(extension)) {
  	swal({
		  title: "",
		  text: artFile.name + "\n Nice image, but we don't support \n that format. Try resaving it as a \n gif, jpg, or png.",
		  confirmButtonText: "OK"
		});
  }

  /*check if the filename extension can match with the signature that belongs to it*/
  else {
  	checkFileSignature(artFile, function(result) {
  		if(result) {
  			var img = createImgElement(artFile);
  			createAlbumArtPreview(img);
  	    
  	    /*using FileReader to display the image content*/
  	    var reader = new FileReader(); // asynchronously read the contents of files
  	    reader.onload = (function(aImg) { 
  	    	return function(e) { 
  	    		aImg.src = e.target.result;
  	  		};
  	    })(img);
  	    reader.readAsDataURL(artFile);
  		}
  		else {
  			swal({
  			  title: "",
  			  text: artFile.name + "\nError uploading photo.",
  			  confirmButtonText: "OK"
  			});
			}
  	});
  }
}

/**
 * Check album art image file extension with the white list of extension.
 * 
 * @method checkAlbumArtExtension
 * @param extension {String} Extension of album art image file.
 * @return {Boolean} True of False.
 */
function checkAlbumArtExtension(extension) {
	var validFileType = "bmp, gif, jpg, jpeg, png"; // white list of extension

	if(validFileType.toLowerCase().indexOf(extension) < 0)
		return true;
	else
		return false;
}

/**
 * Check if album art image file size is greater than 10MB.
 * 
 * @method checkAlbumArtSize
 * @param {size} Album art image file size.
 * @return {Boolean} True of False.
 */
function checkAlbumArtSize(size) {
	if(size > 10 * 1024 * 1024) // 10MB file size limit
		return true;
	else
		return false;
}

/**
 * Validate if the format of the album art image file extension can match with the signature that belongs to.
 * 
 * @method checkFileSignature
 * @param file {Image file}
 * @param {Function} callback
 * @return {Boolean} True of False.
 */
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
 * Create album art preview element.
 * 
 * @method createAlbumArtPreview
 * @param {img} HTML image element.
 */
function createAlbumArtPreview(img) {
	var spanRemoveButton = document.createElement("div");	
	var spanButtonImageGroup = document.createElement("div");
	
	spanRemoveButton.setAttribute('id', 'removeAlbumArtImage');
	spanRemoveButton.setAttribute('onclick', 'removeAlbumArtImage()');
	spanRemoveButton.innerHTML = "Remove image";
	spanButtonImageGroup.setAttribute('id', 'removeAlbumArtGroup');			
	
	spanButtonImageGroup.appendChild(spanRemoveButton);
	spanButtonImageGroup.appendChild(img);
	document.getElementById("audioAlbumArtPreview").appendChild(spanButtonImageGroup);	
	
	document.getElementById("selectAudioAlbumArtDiv").style.display = "none";
  document.getElementById("audioAlbumArtPreview").style.display = "block";
}

/**
 * Create HTML image element.
 * 
 * @method createImgElement
 * @return HTML image element.
 */
function createImgElement(artFile) {
	var img = document.createElement('img');
	img.classList.add("img-responsive");
	img.id = "albumArtPreview"
	img.file = artFile;
	
	return img;
}

/**
 * Remove album art image on preview.
 * 
 * @method removeAlbumArtImage
 */
function removeAlbumArtImage() {
	document.getElementById("albumArtPreview").remove();
  document.getElementById("audioAlbumArtPreview").style.display = "none";
  document.getElementById("selectAudioAlbumArtDiv").style.display = "flex";
}