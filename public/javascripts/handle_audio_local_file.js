/*preview audio selected by user*/
function handleAudioFiles(files) {
  var audioFile = files[0];
  var extension = audioFile.name.substring(audioFile.name.lastIndexOf('.'));
  var validFileType = ".mp3"; // white list of extension  

  /*check audio file size*/
  if(audioFile.size > 10 * 1024 * 1024) { // 10MB file size limit
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
		  text: "Please select an audio file to \n upload.",
		  confirmButtonText: "OK"
		});
  }

  /*check if the filename extension can match with the signature that belongs to it*/
  else {
  	checkAudioFileSignature(audioFile, function(result) {
  		if(result) {
  			var audio = document.createElement('audio');
  			audio.setAttribute('id', 'urlAudio');
  			audio.file = audioFile;

				var spanRemoveButton = document.createElement("span");	
				var divAudioGroup = document.createElement("div");
				
				spanRemoveButton.setAttribute('id', 'removeAudioButton');
				spanRemoveButton.setAttribute('onclick', 'removeAudioUrl()');
				spanRemoveButton.innerHTML = "&times;";
				divAudioGroup.setAttribute('id', 'removeAudioGroup');
				
				divAudioGroup.appendChild(spanRemoveButton);
				divAudioGroup.appendChild(audio);
				
				document.getElementById("newAudioUploadPreview").appendChild(divAudioGroup);
				
				initilizeUrlAudioControl(audio);
				displayFormAfterLocalAudioSelected();
		    document.getElementById("audioDescription").focus();
		    document.getElementById("audioPostButton").setAttribute("onclick", "addNewLocalAudioPost();");
  	    
  	    var reader = new FileReader();
  	    reader.onload = (function(audio) { 
  	    	return function(e) { 
  	    		audio.src = e.target.result;
  	  		};
  	    })(audio);
  	    reader.readAsDataURL(audioFile);
  	    
  	    ID3.loadTags(audioFile, function() {
  	    	var tags = ID3.getAllTags(audioFile);
  	    	if(tags.title)
  	    		document.getElementById("audioTrackInput").value = tags.title;
  	    	if(tags.artist)
  	    		document.getElementById("audioArtistInput").value = tags.artist;
  	    	if(tags.album)
  	    		document.getElementById("audioAlbumInput").value = tags.album;
  	    	/*alert(tags.artist + " - " + tags.title + ", " + tags.album);*/
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

/*display audio post description and tag form after add audio from web url*/
function displayFormAfterLocalAudioSelected() {
	document.getElementById("audioPermission").style.display = "block";
	document.getElementById("audioDescription").style.display = "block";
	document.getElementById("audioDescription").style.marginTop = "40px";
	document.getElementById("audioTag").style.display = "block";
	document.getElementById("audioUrlInputGroup").style.display = "none";
	document.getElementById("newAudioUploadPreview").style.display = "block";
}

/*get the extension of a file*/
function getFileExtension(fileName) {
  var matches = fileName && fileName.match(/\.([^.]+)$/);
  if (matches) {
    return matches[1].toLowerCase();
  }
  return '';
}

/*Provide a 24 bit int implementation for DataViews*/
DataView.prototype.getUint24 = function(pos) {
	return (this.getUint16(pos) << 8) + this.getUint8(pos+2);
}

/*detect if the format of the extension can match with the signature that belongs to*/
function checkAudioFileSignature(file, callback) {
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
  var ext = getFileExtension(file.name);
	var fileSign = signature[ext];
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