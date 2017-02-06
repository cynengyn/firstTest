/*custom audio control*/
function initilizeUrlAudioPreviewControl(audio) {
	audio.controls = false;
	
	audio.addEventListener("timeupdate", updatePreviewProgress, false);
	
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
	progressBar.addEventListener("click", previewSeek);
}

/*play or pause audio*/
function togglePreviewPlayPause() {
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
function updatePreviewProgress() {
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
function previewSeek(e) {
	var audio = document.getElementById("urlAudio");
  var percent = e.offsetX / this.offsetWidth;
  audio.currentTime = percent * audio.duration;
  progressBar.value = percent / 100;
}