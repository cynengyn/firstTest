/*
	===================================
	web audio post custom audio control
	===================================
*/
function initilizeUrlAudioPostControl(audio, id) {
	if(id) {
		var audioId = id.replace(/urlAudio/, '');
	
		audio.controls = false;
		
		audio.addEventListener("timeupdate", updateProgress, false);
		
		audio.addEventListener('play', function() {
			var playpause = document.getElementById("audioPostPlayerButton"+audioId);
			playpause.className = "glyphicon glyphicon-pause audioPostPlayerButton";
		}, false);
		
		audio.addEventListener('pause', function() {
			var playpause = document.getElementById("audioPostPlayerButton"+audioId);
			playpause.className = "glyphicon glyphicon-play audioPostPlayerButton";
		}, false);
		
		audio.addEventListener("ended", function() {
			this.pause();
		}, false);
		
		var progressBar = document.getElementById("audioPostProgressBar"+audioId);
		progressBar.addEventListener("click", seek);
	}
}

/*
	===================
	play or pause audio
	===================
*/
function togglePlayPauseAudioPost(id) {
	var audioId = id.replace(/audioPostPlayerButton/, '');
	var audio = document.getElementById("urlAudio"+audioId);
  var playpause = document.getElementById("audioPostPlayerButton"+audioId);
  if (audio.paused || audio.ended) {
  	playpause.className = "glyphicon glyphicon-pause audioPostPlayerButton";
		audio.play();
  }
  else {
  	playpause.className = "glyphicon glyphicon-play audioPostPlayerButton";
  	audio.pause();
  }
}

/*
	==========================================
	update play progress when audio is playing
	==========================================
*/
function updateProgress() {
	var audioId = this.id.replace(/urlAudio/, '');
	var audio = document.getElementById("urlAudio"+audioId);
	var progress = document.getElementById("playProgress"+audioId);
	var head = document.getElementById("playHead"+audioId);
	var value = 0;

	if (audio.currentTime > 0) {
		/*value = Math.floor((100 / audio.duration) * audio.currentTime);*/
		value = 100 * (audio.currentTime / audio.duration);
	}
	progress.style.width = value + "%";
	head.style.left = value + "%";
}

/*
	===========================================
	move or skip to a new position in the audio
	===========================================
*/
function seek(e) {
	var audioId = this.id.replace(/audioPostProgressBar/, '');
	var audio = document.getElementById("urlAudio"+audioId);
  var percent = e.offsetX / this.offsetWidth;
  
	audio.currentTime = percent * audio.duration;
  audioPostProgressBar.value = percent / 100;
}