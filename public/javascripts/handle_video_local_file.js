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
  			video.file = videoFile;
  			
  			var spanRemoveButton = document.createElement("span");	
				var divVideoGroup = document.createElement("div");
				
				spanRemoveButton.setAttribute('id', 'removeAudioButton');
				spanRemoveButton.setAttribute('onclick', 'removeAudioUrl()');
				spanRemoveButton.innerHTML = "&times;";
				divVideoGroup.setAttribute('id', 'removeVideoGroup');
				
				divVideoGroup.appendChild(spanRemoveButton);
				divVideoGroup.appendChild(video);
				
				document.getElementById("newVideoUploadPreview").appendChild(divVideoGroup);
				
				var reader = new FileReader();
  	    reader.onload = (function(video) { 
  	    	return function(e) { 
  	    		video.src = e.target.result;
  	  		};
  	    })(video);
  	    reader.readAsDataURL(videoFile);
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

/*display video post description and tag form after add video from web url*/
function displayFormAfterLocalVideoSelected() {
	document.getElementById("videoPermission").style.display = "block";
	document.getElementById("videoDescription").style.display = "block";
	document.getElementById("videoDescription").style.marginTop = "40px";
	document.getElementById("videoTag").style.display = "block";
	document.getElementById("videoUrlInputGroup").style.display = "none";
	document.getElementById("newvideoUploadPreview").style.display = "block";
}

/*check if the format of the extension can match with mp4 file*/
function checkVideoFileSignature(file, callback) {
	var mp4box;
	var chunkSize = 1024 * 1024; // bytes
	var fileSize = file.size;
	var offset = 0;
	var readBlock = null;
	var dimensions = [240, 360, 480]; // video file's dimensions can be no larger than 500 pixels high
	
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
        	setTimeout(function(){swal.close();}, 3000); // wait for 3 seconds after finished reading video file and close
        }
        
    } else {
        console.log("Read error: " + evt.target.error);
        callback(false);
        return ;
    }
    if (offset >= fileSize) {
        /*console.log("Done reading file (" + fileSize + " bytes) in " + (new Date() - startDate) + " ms");*/
        mp4box.flush();
        if (!mp4box || !mp4box.moovStartSent) {
          callback(false);
          return ;
        }
        else {
        	var info = mp4box.getInfo();
          var videoLength = 0;
          var videoHeight = info.tracks[0].video.height

          if(info.duration > 300000) { // 5 minutes limit of video in millisecond
          	swal({
      			  title: "",
      			  text: "Video is too long",
      			  confirmButtonText: "OK"
      			});
            return ;
          }

          if (videoHeight) {
          	if(dimensions.indexOf(videoHeight) != -1) {
          		callback(true);
          		return ;
          	}
            else {
            	swal({
        			  title: "",
        			  text: "Video reading failed",
        			  confirmButtonText: "OK"
        			});
            	return;
            }
          }
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