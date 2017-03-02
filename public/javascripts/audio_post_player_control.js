/**
 * Audio post audio player control.
 * 
 * @class AudioPostPlayerControl
*/

/**
 * Initialize audio post audio player control.
 * 
 * @method initializeUrlAudioPostControl
 * @param audio {File source} Local audio or Web audio from YouTube/Vimeo.
 * @param id {Integer} Audio post ID.
 */
function initializeUrlAudioPostControl(audio, id) {
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

/**
 * Move or skip to a new position in the audio.
 * 
 * @method seek
 * @param e
 */
function seek(e) {
	var audioId = this.id.replace(/audioPostProgressBar/, '');
	var audio = document.getElementById("urlAudio"+audioId);
  var percent = e.offsetX / this.offsetWidth;
  
	audio.currentTime = percent * audio.duration;
  audioPostProgressBar.value = percent / 100;
}

/**
 * Play or pause audio.
 * 
 * @method togglePlayPauseAudioPost
 * @param id {Integer} Audio post ID.
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

/**
 * Update play progress when audio is playing.
 * 
 * @method updateProgress
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