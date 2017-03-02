/**
 * Video Post Functions.
 * 
 * @class AddNewVideoPost
*/

/**
 * Insert new local video post data into database.
 * 
 * @method addNewLocalVideoPost
 */
function addNewLocalVideoPost() {
	var formData = getLocalVideoPostData();
	
	$.ajax({
    url: "/videoPosts/localVideo",
		type: "POST",
		data: formData, // The form with the file inputs.
		processData: false, // Using FormData, no need to process data.
    contentType: false,
	}).done(function(data) {
		for(i = data.length-1; i >= 0 ; i-- ) {
			displayLocalVideoPostFromServer(data[i].localVideoSaveDirectory, data[i].localVideoPostCaption, data[i].localVideoPostTag, data[i].localVideoFileName);
			/*console.log("Success: Files sent!");
		  console.log(data);*/
		}
	}).fail(function() {
		console.log("An error occurred, the files couldn't be sent!");
	});	
}

/**
 * Insert new web video post data into database.
 * 
 * @method addNewWebVideoPost
 */
function addNewWebVideoPost() {
	var formData = getWebVideoPostData();
	
	$.ajax({
    url: "/videoPosts/webVideo",
		type: "POST",
		data: formData, // The form with the file inputs.
		processData: false, // Using FormData, no need to process data.
    contentType: false,
	}).done(function(data) {
		for(i = data.length-1; i >= 0 ; i-- ) {
			displayWebVideoPostFromServer(data[i].webVideoUrlType, data[i].webVideoUrlId, data[i].webVideoPostCaption, data[i].webVideoPostTag);
			/*console.log("Success: Files sent!");
		  console.log(data);*/
		}
	}).fail(function() {
		console.log("An error occurred, the files couldn't be sent!");
	});	
}

/**
 * Create HTML elements for video post.
 * 
 * @method createVideoPostElements
 * @return {Array} Video post HTML elements.
*/
function createVideoPostElements() {
	var divVideoPanel = document.createElement("div");
	var divVideoPanelHeading = document.createElement("div");
	var divVideoPanelBody = document.createElement("div");
	var divVideoPostCaption = document.createElement("div");
	var divVideoPostTag = document.createElement("div");
	var divVideoPanelFooter = document.createElement("div");
	var divVideoPanelFooterDropdown = document.createElement("div");	
	var aVideoPanelTitle = document.createElement("a");
	var aVideoTag = document.createElement("a");
	var aGlyphiconSend = document.createElement("a");
	var aGlyphiconRetweet = document.createElement("a");
	var aDropdownMenuEdit = document.createElement("a");
	var aDropdownMenuDelete = document.createElement("a");	
	var spanGlyphiconSend = document.createElement("span");
	var spanGlyphiconRetweet = document.createElement("span");
	var spanGlyphiconCog = document.createElement("span");	
	var ulDropdownMenu = document.createElement("ul");	
	var liDropdownMenuEdit = document.createElement("li");
	var liDropdownMenuDelete = document.createElement("li");
	
	divVideoPanel.setAttribute('class', 'panel panel-default');
	divVideoPanelHeading.setAttribute('class', 'panel-heading');
	divVideoPanelBody.setAttribute('class', 'panel-body');
	divVideoPostCaption.setAttribute('class', 'panel-body');
	divVideoPanelFooter.setAttribute('class', 'panel-footer');
	divVideoPanelFooterDropdown.setAttribute('class', 'dropdown');
	aVideoPanelTitle.setAttribute('class', 'panel-title');
	spanGlyphiconSend.setAttribute('class', 'glyphicon glyphicon-send');
	spanGlyphiconRetweet.setAttribute('class', 'glyphicon glyphicon-retweet');
	spanGlyphiconCog.setAttribute('class', 'glyphicon glyphicon-cog dropdown-toggle');
	ulDropdownMenu.setAttribute('class', 'dropdown-menu dropdown-menu-right');
	divVideoPanelBody.setAttribute('id', 'videoPostPanelBody');
	divVideoPostTag.setAttribute('id', 'videoPostTagDiv');
	spanGlyphiconCog.setAttribute('data-toggle', 'dropdown');
	spanGlyphiconSend.setAttribute('Title', 'Share');
	spanGlyphiconRetweet.setAttribute('Title', 'Reblog');
	spanGlyphiconCog.setAttribute('Title', 'Options');	
	
	aVideoPanelTitle.innerHTML = "groovypeacetimetravel";
	aDropdownMenuEdit.innerHTML = "Edit";
	aDropdownMenuDelete.innerHTML = "Delete";
	
	divVideoPanelHeading.appendChild(aVideoPanelTitle);
	divVideoPostTag.appendChild(aVideoTag);
	divVideoPostCaption.appendChild(divVideoPostTag);	
	aGlyphiconSend.appendChild(spanGlyphiconSend);
	aGlyphiconRetweet.appendChild(spanGlyphiconRetweet);
	liDropdownMenuEdit.appendChild(aDropdownMenuEdit);
	liDropdownMenuDelete.appendChild(aDropdownMenuDelete);
	ulDropdownMenu.appendChild(liDropdownMenuEdit);
	ulDropdownMenu.appendChild(liDropdownMenuDelete);	
	divVideoPanelFooterDropdown.appendChild(aGlyphiconSend);
	divVideoPanelFooterDropdown.appendChild(aGlyphiconRetweet);
	divVideoPanelFooterDropdown.appendChild(spanGlyphiconCog);
	divVideoPanelFooterDropdown.appendChild(ulDropdownMenu);	
	divVideoPanelFooter.appendChild(divVideoPanelFooterDropdown);	
	divVideoPanel.appendChild(divVideoPanelHeading);
	divVideoPanel.appendChild(divVideoPanelBody);
	divVideoPanel.appendChild(divVideoPostCaption);
	divVideoPanel.appendChild(divVideoPanelFooter);
	
	var postColumnList = document.getElementById("postColumn");
	postColumnList.insertBefore(divVideoPanel, postColumnList.childNodes[0]);

	return {
		postCaption: divVideoPostCaption,
		postTagDiv: divVideoPostTag,
		postTag: aVideoTag,
		videoBody: divVideoPanelBody
	};
}

/**
 * Display local video post from database.
 *
 * @method displayLocalVideoPostFromServer
 * @param localVideoSaveDirectory {String} Local video file save directory.
 * @param localVideoPostCaption {String} Local video post caption.
 * @param localVideoPostTag {String} Local video post tag.
 * @param localVideoFileName {String} Local video file name.
 */
function displayLocalVideoPostFromServer(localVideoSaveDirectory, localVideoPostCaption, localVideoPostTag, localVideoFileName) {
	var videoPostElements = createVideoPostElements();
	var videoElement = createLocalVideoElement(localVideoSaveDirectory, localVideoFileName);
	
	setVideoPostCaptionAndTag(videoPostElements, localVideoPostCaption, localVideoPostTag);
	videoPostElements.videoBody.appendChild(videoElement);
}

/**
 * Display web video post from database.
 *
 * @method displayWebVideoPostFromServer
 * @param webVideoUrlType {String} Web video URL from YouTube or Vimeo.
 * @param webVideoUrlId {String} Web video ID.
 * @param webVideoPostCaption {String} Web video post caption.
 * @param webVideoPostTag {String} Web video post tag.
 */
function displayWebVideoPostFromServer(webVideoUrlType, webVideoUrlId, webVideoPostCaption, webVideoPostTag) {
	var videoPostElements = createVideoPostElements();
	var iFrameVideo = createVideoiFrame(webVideoUrlType, webVideoUrlId);
	
	setVideoPostCaptionAndTag(videoPostElements, webVideoPostCaption, webVideoPostTag);
	videoPostElements.videoBody.appendChild(iFrameVideo);
}

/**
 * Get new local video post data.
 * 
 * @method getLocalVideoPostData
 * @returns {FormData} Local video file, Local video post caption, Local video post tag.
 */
function getLocalVideoPostData() {
	var videoFile = document.getElementById("videoFileInput");
	var formData = new FormData();
	formData.append("localVideo", videoFile.files[0]);
	formData.append("localVideoPostCaption", $('#videoCaption').html());
	formData.append("localVideoPostTag", $('#videoTag').val());
	
	return formData;
}

/**
 * Get new web video post data.
 * 
 * @method getWebVideoPostData
 * @returns {FormData} Web video URL from YouTube or Vimeo, Web video ID, Web video post caption, Web video post tag.
 */
function getWebVideoPostData() {
	var webVideoUrl = $('#urlVideoUploadInput').val();
	var formData = new FormData();
	formData.append("webVideoUrlType", parseVideo(webVideoUrl).type);
	formData.append("webVideoUrlId", parseVideo(webVideoUrl).id);
	formData.append("webVideoPostCaption", $('#videoCaption').html());
	formData.append("webVideoPostTag", $('#videoTag').val());
	
	return formData;
}

/**
 * Set video post caption and tag.
 *
 * @method setVideoPostCaptionAndTag
 * @param postElements {Array} Video post HTML elements.
 * @param postCaption {String} Video post caption.
 * @param postTag {String} Video post tag.
 */
function setVideoPostCaptionAndTag(postElements, postCaption, postTag) {
	if(postCaption) // video post caption not empty
		postElements.postCaption.innerHTML = postCaption;
	
	if(postTag) { // video post tag not empty
		postElements.postCaption.appendChild(postElements.postTagDiv);
		postElements.postTag.innerHTML = "#" + postTag;
	}
	else
		postElements.postTagDiv.setAttribute("style", "display: none;");
}

/**
 * Modal for video post button.
 *
 * @method videoPostModal
 */
function videoPostModal() {
	var videoPost = [
		'<div class="modal-content">',
		'<div class="panel-heading" id="newPostPanelHead">',
	    '<a class="panel-title" id="newPostPanelHeadTitle">groovypeacetimetravel</a>',
	    '<span class="glyphicon glyphicon-cog pull-right"></span>',
	  '</div>',
	  '<div class="modal-body" id="newVideoPostModalBody">',
			'<form id="formWithFiles" method="post" enctype="multipart/form-data">',
				'<input id="videoFileInput" name="videoFileInput" accept=".mp4" type="file" onchange="handleVideoFiles(this.files)"/>',
	      '<div class="container-fluid">',
	      	'<div class="row" id="newVideoUploadPanel">',
						'<div class="col-md-6" id="videoUploadColumn" onclick="$(\'#videoFileInput\').click()">',												       
						  '<div id="videoUploadIconDiv"><i class="fa fa-file-video-o" id="videoUploadIcon"></i></div>',
						  '<div><span id="videoUploadLabel">Upload a video</span></div>',
						'</div>',
						'<div class="col-md-6" id="videoWebColumn" onclick=videoUrlPanelDisplay()>',
							'<div id="videoUploadIconDiv"><i class="glyphicon glyphicon-globe" id="videoWebIcon"></i></div>',
						 	'<div><span id="videoWebLabel">Add video from web</span></div>',
						'</div>',
					'</div>',	
					'<div class="row" id="urlVideoUploadPanel">',
						'<div class="col-md-12" id="urlVideoUploadPanelDiv">',
							'<span id="urlVideoUploadPanelClose" onclick="closeVideoUrlPanel()">&times;</span>',
						  '<input id="urlVideoUploadInput" oninput="validateVideoURL()" placeholder="Paste a URL or embed code"></input>',
						'</div>',	
					'</div>',											
					'<div class="row" id="newVideoUploadPreview"><div id="player"></div></div>',
					'<div id="videoPermission">',
						'<label class="binary_switch">',
							'<input id="videoPermissionCheckBox" type="checkbox">',
							'<span class="binary_switch_track"></span>',
							'<span class="binary_switch_button"></span>',
						'</label>',
						'<span id="videoPermissionText" onclick="$(\'#videoPermissionCheckBox\').click()">',
							'This is my original work, or I <a> have permission </a> to post this.',
						'</span>',
					'</div>',
	        '<span id="videoCaption" contenteditable="true"></span>',
	        '<input class="form-control" id="videoTag" name="videoTag" placeholder="#tags" type="text" />',
	      '</div>',
	    '</form>',
	  '</div>',
	  '<div class="modal-footer" id="newPostPanelFooter">',
	    '<button class="btn btn-default pull-left" data-dismiss="modal">Close</button>',
	    '<div class="btn-group">',
		    '<button class="btn btn-primary" id="videoPostButton" data-dismiss="modal" onclick="">Post</button>',
		    '<button class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-expanded="false" aria-haspopup="true">',
			    '<span class="caret"></span>',
			  '</button>',
			  '<ul class="dropdown-menu" id="uploadPostDropDown">',
			    '<li><a href="">Post now</a></li>',
			    '<li><a href="">Add to queue</a></li>',
			    '<li><a href="">Save as draft</a></li>',
			    '<li><a href="">Post privately</a></li>',
			    '<li><a href="">Schedule</a></li>',
			  '</ul>',
			'</div>',
	  '</div>',
	'</div>'
	].join('');
	
	document.getElementById("modalDialog").innerHTML = videoPost;
}