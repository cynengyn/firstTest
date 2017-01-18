/*web audio post custom audio control*/
function initilizeUrlAudioPostControl(audio) {
	audio.controls = false;
	
	audio.addEventListener("timeupdate", updateProgress, false);
	
	audio.addEventListener('play', function() {
		var playpause = document.getElementById("audioPostPlayerButton");
		playpause.className = "glyphicon glyphicon-pause";
	}, false);
	
	audio.addEventListener('pause', function() {
		var playpause = document.getElementById("audioPostPlayerButton");
		playpause.className = "glyphicon glyphicon-play";
	}, false);
	
	audio.addEventListener("ended", function() {
		this.pause();
	}, false);
	
	var progressBar = document.getElementById("audioPostProgressBar");
	progressBar.addEventListener("click", seek);
}

/*play or pause audio*/
function togglePlayPauseAudioPost() {
	var audio = document.getElementById("urlAudio");
  var playpause = document.getElementById("audioPostPlayerButton");
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
  audioPostProgressBar.value = percent / 100;
}