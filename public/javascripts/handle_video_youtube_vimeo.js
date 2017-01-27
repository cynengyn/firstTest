/*validate and preview video from web url*/
function validateVideoURL() {
	var videoURL = getVideoUrl(),
			type = parseVideo(videoURL).type,
			id = parseVideo(videoURL).id,
			video = createVideoiFrame(type, id);

	if(video && type == "YouTube") {
		checkYouTubeVideo(id, function(result) {
			if(result) {
				var spanRemoveButton = document.createElement("span");	
				var divVideoGroup = document.createElement("div");
		
				spanRemoveButton.setAttribute('id', 'removeVideoButton');
				spanRemoveButton.setAttribute('onclick', 'removeWebVideoPreview()');
				spanRemoveButton.innerHTML = "&times;";
				divVideoGroup.setAttribute('id', 'removeVideoGroup');
		
				divVideoGroup.appendChild(spanRemoveButton);
				divVideoGroup.appendChild(video);
		
				document.getElementById("newVideoUploadPreview").appendChild(divVideoGroup);	
		
				displayFormAfterLocalVideoSelected();
				document.getElementById("videoCaption").focus();
				/*document.getElementById("videoPostButton").setAttribute("onclick", "addNewLocalVideoPost();");*/
			}
		});
	}
	else if(video && type == "Vimeo") {
		checkVimeoVideo(id, function(result) {
			if(result) {
				var spanRemoveButton = document.createElement("span");	
				var divVideoGroup = document.createElement("div");
		
				spanRemoveButton.setAttribute('id', 'removeVideoButton');
				spanRemoveButton.setAttribute('onclick', 'removeWebVideoPreview()');
				spanRemoveButton.innerHTML = "&times;";
				divVideoGroup.setAttribute('id', 'removeVideoGroup');
		
				divVideoGroup.appendChild(spanRemoveButton);
				divVideoGroup.appendChild(video);
		
				document.getElementById("newVideoUploadPreview").appendChild(divVideoGroup);	
		
				displayFormAfterLocalVideoSelected();
				document.getElementById("videoCaption").focus();
				/*document.getElementById("videoPostButton").setAttribute("onclick", "addNewLocalVideoPost();");*/
			}
		});
	}
}

function checkYouTubeVideo(id, callback) {
	$.getJSON("https://www.googleapis.com/youtube/v3/videos", {
		key: "AIzaSyDDOUt28S1HAjyEUV7HF4tl-szCqlqlt9Y",
		part: "snippet,statistics",
		id: id
	}, function(data) {
		console.log(data);
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

function checkVimeoVideo(id, callback) {
	$.getJSON("http://vimeo.com/api/v2/video/"+id+".json", {
	}, function(data) {
		console.log(data);
		if(data) {
			callback(true);
			return;
		}
		else {
			callback(true);
			return;
		}
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log(jqXHR.responseText);
		console.log(errorThrown);
	});
}

function parseVideo(url) {
	url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);
	
	if (RegExp.$3.indexOf('youtu') > -1) {
    var type = 'YouTube';
    return {
      type: type,
      id: RegExp.$6
  	};
	}
	else if (RegExp.$3.indexOf('vimeo') > -1) {
    var type = 'Vimeo';
    return {
      type: type,
      id: RegExp.$6
  	};
	}
	else
		return false;
}

function createVideoiFrame(type, id) {	
	if(type == "YouTube") {
		var iframeVideo = document.createElement('iframe');
		iframeVideo.setAttribute('id', 'urlVideo');
		iframeVideo.setAttribute('frameborder', '0');
		iframeVideo.setAttribute('allowfullscreen', '');
		iframeVideo.src = '//www.youtube.com/embed/' + id;

		return iframeVideo;
	}
	else if(type == "Vimeo") {
		var iframeVideo = document.createElement('iframe');
		iframeVideo.setAttribute('id', 'urlVideo');
		iframeVideo.setAttribute('frameborder', '0');
		iframeVideo.setAttribute('webkitallowfullscreen', '');
		iframeVideo.setAttribute('mozallowfullscreen', '');
		iframeVideo.setAttribute('allowfullscreen', '');
		iframeVideo.src = '//player.vimeo.com/video/' + id;
		
		return iframeVideo;
	}
	else
		return false;
}

function getVideoUrl() {
	return document.getElementById("urlVideoUploadInput").value
}