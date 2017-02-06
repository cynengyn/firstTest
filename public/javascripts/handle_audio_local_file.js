/*preview audio selected by user*/
function handleAudioFiles(files) {
  var audioFile = files[0];
  var extension = getFileExtension(audioFile.name);

  /*check audio file size*/
  if(checkAudioSize(audioFile.size)) { // 10MB file size limit
  	swal({
		  title: "",
		  text: "The file is too big. Squish it \n down, and try again!",
		  confirmButtonText: "OK"
		});
  }

  /*check with the white list of extension*/
  else if (checkAudioExtension(extension)) {
  	swal({
		  title: "",
		  text: "Please select an audio file to \n upload.",
		  confirmButtonText: "OK"
		});
  }

  /*check if the filename extension can match with the signature that belongs to it*/
  else {
  	checkAudioFileSignature(extension, audioFile, function(result) {
  		if(result) {
  			var audio = createAudioElement();
  			audio.file = audioFile;		
  			createAudioPreview("Local", audio);

  	    var reader = new FileReader();
  	    reader.onload = (function(audio) { 
  	    	return function(e) { 
  	    		audio.src = e.target.result;
  	  		};
  	    })(audio);
  	    reader.readAsDataURL(audioFile);
  	    
  	    ID3.loadTags(audioFile, function() {
  	    	var tags = ID3.getAllTags(audioFile);
  	    	insertID3(tags)
  	  	}, {
  	      dataReader: ID3.FileAPIReader(audioFile)
  	  	});
  		}
  		else {
  			swal({
  			  title: "",
  			  text: "This is not valid audio file.",
  			  confirmButtonText: "OK"
  			});
			}
  	});
  }
}

/*Provide a 24 bit int implementation for DataViews*/
DataView.prototype.getUint24 = function(pos) {
	return (this.getUint16(pos) << 8) + this.getUint8(pos+2);
}

/*detect if the format of the extension can match with the signature that belongs to*/
function checkAudioFileSignature(extension, file, callback) {
	var signature = {
		mp3: {
			/* FFFB: MPEG-1 Audio Layer 3 with/without ID3v2 Tag
			 * FFF3: MPEG-2 Audio Layer 3 with/without ID3v2 Tag
			 * FFFA: MPEG-1 Audio Layer 3 with/without ID3v2 Tag (protected)
			 * FFF2: MPEG-2 Audio Layer 3 with/without ID3v2 Tag (protected)
			 * 494433: mp3 file with id3 */
			signature: ["FFFB", "FFF3", "FFFA", "FFF2", "494433"],
			offset: 0,
			sizet: 3
		}
	}
	var fileSign = signature[extension];
  var slice = file.slice(fileSign.offset, fileSign.offset + fileSign.sizet);
  var reader = new FileReader();  
  reader.onload = function(e) {
    var buffer = reader.result, // The result ArrayBuffer
        view = new DataView(buffer), // Get access to the result bytes
        signature; // Read 3 bytes

    // get Hex String of file Signature, 24bit only contain 3 bytes
    if(view.byteLength == 3) {
    	if(view.getUint24(0, false).toString(16)=="494433") {
    		signature = view.getUint24(0, false).toString(16);
    		/*console.log(signature);*/
    	}
    	else {
    		signature = view.getUint16(0, false).toString(16);
    		/*console.log(signature);*/
    	}
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
			  text: "Please select an audio file to \n upload.",
			  confirmButtonText: "OK"
			});
      return ;
    }
  };
  reader.readAsArrayBuffer(slice); // Read the slice of the file
}

/*check with the white list of extension*/
function checkAudioExtension(extension) {
	var validFileType = "mp3"; // white list of extension

	if(validFileType.toLowerCase().indexOf(extension) < 0)
		return true;
	else
		return false;
}

/*check audio file size*/
function checkAudioSize(size) {
	if(size > 10 * 1024 * 1024) // 10MB file size limit
		return true;
	else
		return false;
}

/*auto insert ID3 info if exists*/
function insertID3(tags) {
	if(tags.title)
		document.getElementById("audioTrackInput").value = tags.title;
	if(tags.artist)
		document.getElementById("audioArtistInput").value = tags.artist;
	if(tags.album)
		document.getElementById("audioAlbumInput").value = tags.album;
}