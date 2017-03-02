/**
 * Functions to handle web video URL.
 * 
 * @class HandleWebVideoURL
*/

/**
 * Check if video exists on Vimeo.
 * 
 * @method checkVimeoVideo
 * @param id{String} Vimeo video ID.
 * @param {Function} callback
 * @return {callback} True or False.
 */
function checkVimeoVideo(id, callback) {
	$.getJSON("https://vimeo.com/api/v2/video/"+id+".json", {
	}, function(data) {
		if(data) {
			callback(true);
			return;
		}
		else {
			callback(false);
			return;
		}
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log(jqXHR.responseText);
		console.log(errorThrown);
	});
}

/**
 * Check if video exists on YouTube.
 * 
 * @method checkYouTubeVideo
 * @param id{String} YouTube video ID.
 * @param {Function} callback
 * @return {callback} True or False.
 */
function checkYouTubeVideo(id, callback) {
	$.getJSON("https://www.googleapis.com/youtube/v3/videos", {
		key: "AIzaSyDDOUt28S1HAjyEUV7HF4tl-szCqlqlt9Y",
		part: "snippet,statistics",
		id: id
	}, function(data) {
		if (data.items.length === 0) {
			callback(false);
			return;
		}
		callback(true);
		return;
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log(jqXHR.responseText);
		console.log(errorThrown);
	});
}

/**
 * Create HTML iframe element.
 * 
 * @method createVideoiFrame
 * @param type{String} Web video from YouTube or Vimeo.
 * @param id{String} Web video ID.
 * @return {iframe} HTML iframe element.
 */
function createVideoiFrame(type, id) {	
	var iframeVideo = document.createElement('iframe');
	iframeVideo.setAttribute('id', 'urlVideo');
	iframeVideo.setAttribute('frameborder', '0');
	iframeVideo.setAttribute('allowfullscreen', '');
	
	if(type == "YouTube") {
		iframeVideo.src = '//www.youtube.com/embed/' + id;
		return iframeVideo;
	}
	else if(type == "Vimeo") {
		iframeVideo.setAttribute('webkitallowfullscreen', '');
		iframeVideo.setAttribute('mozallowfullscreen', '');
		iframeVideo.src = '//player.vimeo.com/video/' + id;		
		return iframeVideo;
	}
	else
		return false;
}

/**
 * Get web video URL enter by user.
 * 
 * @method getVideoUrl
 * @returns {URL} web video URL
 */
function getVideoUrl() {
	return document.getElementById("urlVideoUploadInput").value;
}

/**
 * Get web video provider and video ID.
 * 
 * @method parseVideo
 * @param url{String} Web video URL.
 * @return {Type, ID} Web video provider and ID.
 */
function parseVideo(url) {
	url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);
	
	if (RegExp.$3.indexOf('youtu') > -1) {
    return {
      type: 'YouTube',
      id: RegExp.$6
  	};
	}
	else if (RegExp.$3.indexOf('vimeo') > -1) {
		var id;
	  $.ajax({ // get vimeo id using api solution instead of regexp
	    url: 'https://vimeo.com/api/oembed.json?url='+url,
	    type: 'GET',
	    async: false,
	    success: function(response) {
	      if(response.video_id) {
	        id = response.video_id;
	      }
	    }
	  });
    return {
      type: 'Vimeo',
      id: id
  	};
	}
	else
		return false;
}

/**
 * Validate URL and preview video from web.
 * 
 * @method validateVideoURL
 */
function validateVideoURL() {
	var videoURL = getVideoUrl(),
			videoAttrib = parseVideo(videoURL),
			type = videoAttrib.type,
			id = videoAttrib.id,
			video = createVideoiFrame(type, id);

	if(video && type == "YouTube") {
		checkYouTubeVideo(id, function(result) {
			if(result) {
				createVideoPreview("Web", video);
			}
		});
	}
	else if(video && type == "Vimeo") {
		checkVimeoVideo(id, function(result) {
			if(result) {
				createVideoPreview("Web", video);
			}
		});
	}
}