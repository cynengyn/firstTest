/* auto play video when 75% of its area is visible
 * auto pause video when 50% of its area is hidden
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

/*show url video upload panel and hide the normal video upload panel*/
function videoUrlPanelDisplay() {
	document.getElementById("newVideoUploadPanel").style.display = "none";
	document.getElementById("urlVideoUploadPanel").style.display = "block";
	document.getElementById("urlVideoUploadInput").focus();
}

function closeVideoUrlPanel() {
	document.getElementById("newVideoUploadPanel").style.display = "block";
	document.getElementById("urlVideoUploadPanel").style.display = "none";
	document.getElementById("urlVideoUploadInput").value = "";
}

/*display video post description and tag form after local video is selected*/
function displayFormAfterLocalVideoSelected() {
	document.getElementById("videoPermission").style.display = "block";
	document.getElementById("videoCaption").style.display = "block";
	document.getElementById("videoTag").style.display = "block";
	document.getElementById("newVideoUploadPanel").style.display = "none";
	document.getElementById("urlVideoUploadPanel").style.display = "none";
	document.getElementById("newVideoUploadPreview").style.display = "block";
}

/*clear and hide all necessary fields when video url is removed*/
function removeLocalVideoPreview() {
	document.getElementById("newVideoUploadPanel").style.display = "block";
	document.getElementById("newVideoUploadPreview").style.display = "none";
	/*document.getElementById("urlVideo").pause();
	document.getElementById("urlVideo").src = "";*/
	document.getElementById("removeVideoGroup").remove();
	document.getElementById("videoCaption").style.display = "none";
	document.getElementById("videoTag").style.display = "none";
	document.getElementById("videoCaption").innerHTML = "";
	document.getElementById("videoTag").value = "";
  document.getElementById("videoPermission").style.display = "none";
}
function removeWebVideoPreview() {
	document.getElementById("newVideoUploadPanel").style.display = "block";
	document.getElementById("newVideoUploadPreview").style.display = "none";
	document.getElementById("removeVideoGroup").remove();
	document.getElementById("videoCaption").style.display = "none";
	document.getElementById("videoTag").style.display = "none";
	document.getElementById("urlVideoUploadInput").value = "";
	document.getElementById("videoCaption").innerHTML = "";
	document.getElementById("videoTag").value = "";
  document.getElementById("videoPermission").style.display = "none";
}

/*remove <br type="_moz"> type attribute created when enter key is pressed*/
$(document)
.on('keyup', '#videoCaption', function(event) {
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