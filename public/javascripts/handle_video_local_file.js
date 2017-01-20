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
  checkVideoFileSignature(videoFile)
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

/*get the extension of a file*/
function getFileExtension(fileName) {
  var matches = fileName && fileName.match(/\.([^.]+)$/);
  if (matches) {
    return matches[1].toLowerCase();
  }
  return '';
}

/*detect if the format of the extension can match with the signature that belongs to*/
function checkVideoFileSignature(file) {
	var mp4box;	
	var fileinput;
	var chunkSize = 1024 * 1024; // bytes
	var fileSize = file.size;
	var offset = 0;
	var self = this; // we need a reference to the current object
	var readBlock = null;
	var startDate = new Date();
	
	mp4box = new MP4Box(false);
	
	mp4box.onError = function (e) {
    console.log("mp4box failed to parse data.");
	};
	
	var onparsedbuffer = function (mp4box, buffer) {
    /*console.log("Appending buffer with offset " + offset);*/
    buffer.fileStart = offset;
    mp4box.appendBuffer(buffer);
	}
	
	var onBlockRead = function (evt) {
    if (evt.target.error == null) {
        onparsedbuffer(mp4box, evt.target.result); // callback for handling read chunk
        offset += evt.target.result.byteLength;
    		swal({
    		  title: "",
    		  text: "Loading \n" + Math.ceil(100 * offset / fileSize) + " %",
    		  timer: Math.ceil(100 * offset / fileSize)
    			});
    } else {
        console.log("Read error: " + evt.target.error);
        return;
    }
    if (offset >= fileSize) {
        /*console.log("Done reading file (" + fileSize + " bytes) in " + (new Date() - startDate) + " ms");*/
        mp4box.flush();
        if (!mp4box || !mp4box.moovStartSent) {
          console.log("negative");
          return false;
        }
        else {
        	var info = mp4box.getInfo();
          var videoLength = 0;
          console.log(info.duration);
        }
        return true;
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