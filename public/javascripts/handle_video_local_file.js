/*preview video selected by user*/
function handleVideoFiles(files) {
  var videoFile = files[0];
  var extension = videoFile.name.substring(videoFile.name.lastIndexOf('.'));
  var validFileType = ".mp4"; // white list of extension

  /*check video file size*/
  if(videoFile.size > 100 * 1024 * 1024) { // 100MB file size limit
  	swal({
		  title: "",
		  text: "That's an impressively big video. \n Unfortunately, Tumblr can only handle \n 100MB at a time. If you're looking to post \n huuuuuge stuff, just use Vimeo.",
		  showCancelButton: true,
		  cancelButtonText: "Nevermind",
		  confirmButtonText: "Upload to Vimeo"
		});
  }

  /*check with the white list of extension*/
  else if (validFileType.toLowerCase().indexOf(extension) < 0) {
  	swal({
		  title: "",
		  text: "Please select a .mp4 video file to \n upload.",
		  confirmButtonText: "OK"
		});
  	console.log("not valid");
  }

  /*check if the filename extension can match with the signature that belongs to it*/
  else {
  	checkVideoFileSignature(videoFile, function(result) {  		
  		if(result) {
  			var video = document.createElement('video');
  			video.setAttribute('id', 'urlVideo');
  			video.setAttribute('controls', 'true');
  			video.src = URL.createObjectURL(videoFile);
  			URL.revokeObjectURL(videoFile);

  	    video.oncanplay = function() {
  	    	if(video.duration <= 300) { // 5 minutes limit of video in second

  	    		var spanRemoveButton = document.createElement("span");	
  					var divVideoGroup = document.createElement("div");

  					spanRemoveButton.setAttribute('id', 'removeVideoButton');
  					spanRemoveButton.setAttribute('onclick', 'removeLocalVideoPreview()');
  					spanRemoveButton.innerHTML = "&times;";
  					divVideoGroup.setAttribute('id', 'removeVideoGroup');

  					divVideoGroup.appendChild(spanRemoveButton);
  					divVideoGroup.appendChild(video);

  					document.getElementById("newVideoUploadPreview").appendChild(divVideoGroup);	

  					displayFormAfterLocalVideoSelected();
  					document.getElementById("videoCaption").focus();
  	    	}
  	    	else
  	    		swal({
      			  title: "",
      			  text: "Video is too long",
      			  confirmButtonText: "OK"
      			});
  	    }
  	    video.onerror = function() {
  	    	if(video.src != "http://localhost:9000/")
	  	    	swal({
	    			  title: "",
	    			  text: "Video could not be decoded.",
	    			  confirmButtonText: "OK"
	    			});
  	    }

				/*var reader = new FileReader();
  	    reader.onload = (function(video) { 
  	    	return function(e) { 
  	    		console.log("0");
  	    		video.src = e.target.result;
  	  		};
  	    })(video);
  	    reader.readAsDataURL(videoFile);*/
  	    /*console.log(reader.readAsDataURL(videoFile));*/
  		}
  		else {
  			swal({
  			  title: "",
  			  text: "This is not valid .mp4 video file.",
  			  confirmButtonText: "OK"
  			});
			}
  	});
  }
}

/*check if the format of the extension can match with mp4 file*/
function checkVideoFileSignature(file, callback) {
	var mp4box;
	var chunkSize = 1024 * 1024; // bytes
	var fileSize = file.size;
	var offset = 0;
	var readBlock = null;
	
	mp4box = new MP4Box(false);
	
	mp4box.onError = function (e) {
    console.log("mp4box failed to parse data.");
    callback(false);
    return ;
	};
	
	var onparsedbuffer = function (mp4box, buffer) {
    buffer.fileStart = offset;
    mp4box.appendBuffer(buffer);
	}
	
	var onBlockRead = function (evt) {
    if (evt.target.error == null) {
        onparsedbuffer(mp4box, evt.target.result); // callback for handling read chunk
        offset += evt.target.result.byteLength;
        swal({
    		  title: "",
    		  text: "Reading video file... \n" + Math.ceil(100 * offset / fileSize) + "%",
    		  showConfirmButton: false
    		});
        if(Math.ceil(100 * offset / fileSize)==100) {
        	setTimeout(function(){swal.close();}, 1000); // wait for 3 seconds after finished reading video file and close
        }
        
    } else {
        console.log("Read error: " + evt.target.error);
        callback(false);
        return ;
    }
    if (offset >= fileSize) {
        mp4box.flush();
        if (!mp4box || !mp4box.moovStartSent) {
          callback(false);
          return ;
        }
        else {
        	callback(true);
      		return ;
        }
    }
    
    readBlock(offset, chunkSize, file);
	}
	
	readBlock = function (_offset, length, _file) {
    var r = new FileReader();
    var blob = _file.slice(_offset, length + _offset);
    r.onload = onBlockRead;
    r.readAsArrayBuffer(blob);
	}
	
	readBlock(offset, chunkSize, file);
}