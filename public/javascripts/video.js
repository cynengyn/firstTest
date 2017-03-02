/**
 * Functions for Video Post HTML Elements.
 * 
 * @class Video
*/

/**
 * remove <br type="_moz"> type attribute created when enter key is pressed
 */
$(document).on('keyup', '#videoCaption', function(event) {
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
	  if($("#videoCaption").text() == '') {
	      $("#videoCaption").empty();
	  }
  }
});

/**
 * Auto play video when 75% of its area is visible.
 * Auto pause video when 50% of its area is hidden.
 */
$(document).ready(function() {
  var videos = $('video'); // all video elements
  var monitorVideo = function(video) { // handler for each video element
    var visibility = VisSense(video, {
        fullyvisible: 0.75,
        hidden: 0.50
      }),
      visibility_monitor = visibility.monitor({
        fullyvisible: function(e) {
          video.play();
        },
        hidden: function(e) {
          video.pause();
        }
      }).start();
  };
  videos.each(function() {
    var monitorVids = monitorVideo(this);
  });
});

/**
 * Close web video URL input field.
 * 
 * @Method closeVideoUrlPanel
 */
function closeVideoUrlPanel() {
	document.getElementById("newVideoUploadPanel").style.display = "block";
	document.getElementById("urlVideoUploadPanel").style.display = "none";
	document.getElementById("urlVideoUploadInput").value = "";
}

/**
 * Create HTML video element.
 * 
 * @Method createLocalVideoElement
 * @param videoSaveDirectory {String} Path where video is stored.
 * @param videoFileName {Video file} Local video file.
 * @return video {video} HTML image element.
 */
function createLocalVideoElement(videoSaveDirectory, videoFileName) {
	var video = document.createElement("video");
	video.setAttribute('controls', 'true');
	video.setAttribute('src', videoSaveDirectory+videoFileName);
	
	return video;
}

/**
 * Create HTML elements for video preview.
 * 
 * @Method createVideoPreview
 * @param type {String} Indicate if video is from local or web.
 * @param video {video} HTML video element.
 */
function createVideoPreview(type, video) {
	var spanRemoveButton = document.createElement("span");	
	var divVideoGroup = document.createElement("div");

	spanRemoveButton.setAttribute('id', 'removeVideoButton')
	spanRemoveButton.innerHTML = "&times;";
	divVideoGroup.setAttribute('id', 'removeVideoGroup');

	divVideoGroup.appendChild(spanRemoveButton);
	divVideoGroup.appendChild(video);
	document.getElementById("newVideoUploadPreview").appendChild(divVideoGroup);	

	displayFormAfterVideoSelected(type);
	
	if(type == "Local") {
		spanRemoveButton.setAttribute('onclick', 'removeVideoPreview("Local")');
		document.getElementById("videoPostButton").setAttribute("onclick", "addNewLocalVideoPost();");
	}
	else if(type == "Web") {
		spanRemoveButton.setAttribute('onclick', 'removeVideoPreview("Web")');
		document.getElementById("videoPostButton").setAttribute("onclick", "addNewWebVideoPost();");
	}
}

/**
 * Display video post caption and tag input after video is selected.
 * 
 * @method displayFormAfterVideoSelected
 * @param displayType {String} Indicate if video is from local or web.
 */
function displayFormAfterVideoSelected(displayType) {
	document.getElementById("videoCaption").style.display = "block";
	document.getElementById("videoTag").style.display = "block";
	document.getElementById("newVideoUploadPanel").style.display = "none";
	document.getElementById("urlVideoUploadPanel").style.display = "none";
	document.getElementById("newVideoUploadPreview").style.display = "block";
	document.getElementById("videoCaption").focus();
	
	if(displayType == "Local") {
		document.getElementById("videoPermission").style.display = "block";
  }
}

/**
 * Clear and hide all unnecessary fields when video preview is removed.
 * 
 * @Method removeVideoPreview
 * @Param removeType {String} Indicate if video is from local or web.
 */
function removeVideoPreview(removeType) {
	document.getElementById("newVideoUploadPanel").style.display = "block";
	document.getElementById("newVideoUploadPreview").style.display = "none";
	document.getElementById("removeVideoGroup").remove();
	document.getElementById("videoCaption").style.display = "none";
	document.getElementById("videoTag").style.display = "none";
	document.getElementById("videoCaption").innerHTML = "";
	document.getElementById("videoTag").value = "";
  document.getElementById("videoPermission").style.display = "none";
  
  if(removeType == "Web") {
  	document.getElementById("urlVideoUploadInput").value = "";
  }  	
}

/**
 * Show web video upload panel and hide the normal video upload panel.
 * 
 * @Method videoUrlPanelDisplay
 */
function videoUrlPanelDisplay() {
	document.getElementById("newVideoUploadPanel").style.display = "none";
	document.getElementById("urlVideoUploadPanel").style.display = "block";
	document.getElementById("urlVideoUploadInput").focus();
}