/*validate and preview audio from web url*/
function validateAudioURL() {
	var urlregex = new RegExp("\\b(https?|ftp|file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|!:,.;]\\.(mp3)$", "i");
	var match = urlregex.test(document.getElementById("urlAudioUploadInput").value);
	
	if(match) {
		var audio = document.createElement('audio');
		audio.setAttribute('id', 'urlAudio');
		audio.src = document.getElementById("urlAudioUploadInput").value;
		
		audio.onloadedmetadata = function() {
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
	    displayAudioFormAfterAudioURL();
	    document.getElementById("audioDescription").focus();
	    document.getElementById("audioPostButton").setAttribute("onclick", "addNewWebAudioPost();");
		};
	}
}

/*display audio post description and tag form after add audio from web url*/
function displayAudioFormAfterAudioURL() {
	document.getElementById("audioDescription").style.display = "block";
	document.getElementById("audioTag").style.display = "block";
	document.getElementById("audioUrlInputGroup").style.display = "none";
	document.getElementById("newAudioUploadPreview").style.display = "block";
}

/*clear and hide all necessary fields when audio url is removed*/
function removeAudioUrl() {
	document.getElementById("audioUrlInputGroup").style.display = "table";
	document.getElementById("newAudioUploadPreview").style.display = "none";
	document.getElementById("removeAudioGroup").remove();
	document.getElementById("audioDescription").style.display = "none";
	document.getElementById("audioTag").style.display = "none";
	document.getElementById("urlAudioUploadInput").value = "";
	document.getElementById("audioDescription").innerHTML = "";
	document.getElementById("audioTag").value = "";
	document.getElementById("playProgress").style.width = "";
	document.getElementById("playHead").style.left = "";

	if(document.getElementById("albumArtPreview"))
		document.getElementById("albumArtPreview").remove();
  document.getElementById("audioAlbumArtPreview").style.display = "none";
  document.getElementById("selectAudioAlbumArtDiv").style.display = "flex";
  document.getElementById("audioPermission").style.display = "none";
  document.getElementById("audioTrackInput").value = "";
  document.getElementById("audioArtistInput").value = "";
  document.getElementById("audioAlbumInput").value = "";
}

/*custom audio control*/
function initilizeUrlAudioControl(audio) {
	audio.controls = false;
	
	audio.addEventListener("timeupdate", updateProgress, false);
	
	audio.addEventListener('play', function() {
		var playpause = document.getElementById("audioPlayerButton");
		playpause.className = "glyphicon glyphicon-pause";
	}, false);
	
	audio.addEventListener('pause', function() {
		var playpause = document.getElementById("audioPlayerButton");
		playpause.className = "glyphicon glyphicon-play";
	}, false);
	
	audio.addEventListener("ended", function() {
		this.pause();
	}, false);
	
	var progressBar = document.getElementById("progressBar");
	progressBar.addEventListener("click", seek);
}

/*play or pause audio*/
function togglePlayPause() {
	var audio = document.getElementById("urlAudio");
  var playpause = document.getElementById("audioPlayerButton");
  if (audio.paused || audio.ended) {
  	playpause.className = "glyphicon glyphicon-pause";
		audio.play();
  }
  else {
  	playpause.className = "glyphicon glyphicon-play";
  	audio.pause();
  }
}

/*update play progress when audio is playing*/
function updateProgress() {
	var audio = document.getElementById("urlAudio");
	var progress = document.getElementById("playProgress");
	var head = document.getElementById("playHead");
	var value = 0;
	if (audio.currentTime > 0) {
		/*value = Math.floor((100 / audio.duration) * audio.currentTime);*/
		value = 100 * (audio.currentTime / audio.duration);
	}
	progress.style.width = value + "%";
	head.style.left = value + "%";
}

/*move or skip to a new position in the audio*/
function seek(e) {
	var audio = document.getElementById("urlAudio");
  var percent = e.offsetX / this.offsetWidth;
  audio.currentTime = percent * audio.duration;
  progressBar.value = percent / 100;
}

/*remove <br type="_moz"> type attribute created when enter key is pressed*/
$(document)
.on('keyup', '#audioDescription', function(event) {
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
	  if($("#audioDescription").text() == '') {
	      $("#audioDescription").empty();
	  }
  }
});