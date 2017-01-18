/*preview photos selected by user*/
function handleAlbumArt(files) {
  var artFile = files[0];
  var extension = artFile.name.substring(artFile.name.lastIndexOf('.'));
  var validFileType = ".bmp, .gif, .jpg, .jpeg, .png"; // white list of extension
  
  /*check image file size*/
  if(artFile.size > 10 * 1024 * 1024) { // 10MB file size limit
  	swal({
		  title: "",
		  text: "The file is too big. Squish it \n down, and try again!",
		  confirmButtonText: "OK"
		});
  }
  
  /*check with the white list of extension*/
  else if (validFileType.toLowerCase().indexOf(extension) < 0) {
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
  			var img = document.createElement("img");
  	    img.classList.add("img-responsive");
  	    img.id = "albumArtPreview"
  	    img.file = artFile;
  	    
  	    var spanRemoveButton = document.createElement("div");	
  			var spanButtonImageGroup = document.createElement("div");
  			
  			spanRemoveButton.setAttribute('id', 'removeAlbumArtImage');
  			spanRemoveButton.setAttribute('onclick', 'removeAlbumArtImage()');
  			spanRemoveButton.innerHTML = "Remove image";
  			spanButtonImageGroup.setAttribute('id', 'removeAlbumArtGroup');			
  			
  			spanButtonImageGroup.appendChild(spanRemoveButton);
  			spanButtonImageGroup.appendChild(img);
  			
  	    document.getElementById("audioAlbumArtPreview").appendChild(spanButtonImageGroup);
  	    
  	    /*using FileReader to display the image content*/
  	    var reader = new FileReader(); // asynchronously read the contents of files
  	    reader.onload = (function(aImg) { 
  	    	return function(e) { 
  	    		aImg.src = e.target.result;
  	  		};
  	    })(img);
  	    reader.readAsDataURL(artFile);

  	    document.getElementById("selectAudioAlbumArtDiv").style.display = "none";
  	    document.getElementById("audioAlbumArtPreview").style.display = "block";
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

function removeAlbumArtImage() {
	document.getElementById("albumArtPreview").remove();
  document.getElementById("audioAlbumArtPreview").style.display = "none";
  document.getElementById("selectAudioAlbumArtDiv").style.display = "flex";
}