

$("#modalFade").on("shown.bs.modal", function() {
  $(this).find('#urlAudioUploadInput').focus();
});

/*validate and preview audio from web url*/
function validateAudioURL() {
	var urlregex = new RegExp("\\b(https?|ftp|file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]\\.(mp3)$", "i");
	
	if(urlregex.test(document.getElementById("urlAudioUploadInput").value)) {
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

	  	displayAudioFormAfterPhotoURL();
	    document.getElementById("audioDescription").focus();
	    initilizeUrlAudioControl(audio);
	    /*document.getElementById("photoPostButton").setAttribute("onclick", "addNewWebPhotoPost();");*/
		};
	}
}

/*display photo post caption and tag form after add photo from web*/
function displayAudioFormAfterPhotoURL() {
	document.getElementById("audioDescription").style.display = "block";
	document.getElementById("audioTag").style.display = "block";
	document.getElementById("audioUrlInputGroup").style.display = "none"; // hide the normal add photo from web panel
	document.getElementById("newAudioUploadPreview").style.display = "block";
}

function removeAudioUrl() {
	document.getElementById("audioUrlInputGroup").style.display = "table";
	document.getElementById("newAudioUploadPreview").style.display = "none";
	document.getElementById("removeAudioGroup").remove();
	document.getElementById("audioDescription").style.display = "none";
	document.getElementById("audioTag").style.display = "none";
	document.getElementById("urlAudioUploadInput").value = "";
	document.getElementById("audioDescription").innerHTML = "";
	document.getElementById("audioTag").value = "";
}

/*custom audio control*/
function initilizeUrlAudioControl(audio) {
	/*var audio = document.createElement('audio');
	audio.src = document.getElementById("urlAudioUploadInput").value;*/
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

/*change button to play or pause the audio*/
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

function updateProgress() {
	var audio = document.getElementById("urlAudio");
	var progress = document.getElementById("progress");
	var value = 0;
	if (audio.currentTime > 0) {
		value = Math.floor((100 / audio.duration) * audio.currentTime);
	}
	progress.style.width = value + "%";
}

function seek(e) {
	var audio = document.getElementById("urlAudio");
  var percent = e.offsetX / this.offsetWidth;
  audio.currentTime = percent * audio.duration;
  progressBar.value = percent / 100;
}