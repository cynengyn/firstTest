/**
 * Audio Post Functions.
 * 
 * @class AddNewAudioPost
*/

/**
 * Insert new local audio post data into database.
 * 
 * @method addNewLocalAudioPost
 */
function addNewLocalAudioPost() {
	var formData = getLocalAudioPostData();
	
	$.ajax({
		url: "/audioPosts/localAudio",
		type: "POST",
		data: formData, // The form with the file inputs.
		processData: false, // Using FormData, no need to process data.
   contentType: false,
	}).done(function(data) {
		for(i = data.length-1; i >= 0 ; i-- ) {
			displayLocalAudioPostFromServer(data[i].localAudioPostId, data[i].localAudioSaveDirectory, data[i].localAudioFileName, data[i].localAudioPostDescription, data[i].localAudioPostTag, data[i].localAudioTrack, data[i].localAudioArtist, data[i].localAudioAlbum, data[i].localAudioAlbumArtSaveDirectory, data[i].localAudioAlbumArtFileName);
			/*console.log("Success: Files sent!");
		  console.log(data);*/
		}
	}).fail(function() {
		console.log("An error occurred, the files couldn't be sent!");
	});
}

/**
 * Insert new web audio post data into database.
 *
 * @method addNewWebAudioPost
 */
function addNewWebAudioPost() {
	var formData = getWebAudioPostData();
	
	$.ajax({
    url: "/audioPosts/webAudio",
		type: "POST",
		data: formData, // The form with the file inputs.
		processData: false, // Using FormData, no need to process data.
    contentType: false,
	}).done(function(data) {
		for(i = data.length-1; i >= 0 ; i-- ) {
			displayNewWebAudioPostFromServer(data[i].webAudioPostId, data[i].webAudioUrl, data[i].webAudioPostDescription, data[i].webAudioPostTag, data[i].webAudioTrack, data[i].webAudioArtist, data[i].webAudioAlbum, data[i].webAudioAlbumArtDirectory, data[i].webAudioAlbumArtFileName);
			/*console.log("Success: Files sent!");
		  console.log(data);*/
		}
	}).fail(function() {
		console.log("An error occurred, the files couldn't be sent!");
	});
}

/**
 * Modal for audio post button.
 *
 * @method audioPostModal
 */
function audioPostModal() {
	var audioPost = [
		'<div class="modal-content">',
		'<div class="panel-heading" id="newPostPanelHead">',
	    '<a class="panel-title" id="newPostPanelHeadTitle">groovypeacetimetravel</a>',
	    '<span class="glyphicon glyphicon-cog pull-right"></span>',
	  '</div>',
	  '<div class="modal-body" id="newAudioPostModalBody">',
			'<form method="post" enctype="multipart/form-data">',
				'<input id="audioFileInput" name="audioFileInput" accept=".mp3" type="file" onchange="handleAudioFiles(this.files)"/>',
	      '<div class="container-fluid">',
	      	'<div class="row" id="newAudioUploadPanel">',
						'<div class="input-group" id="audioUrlInputGroup">',
							'<span class="input-group-addon" id="audioUrlSearchIcon"><i class="glyphicon glyphicon-search" id="audioUrlGlyphiconSearch"></i></span>',
							'<input id="urlAudioUploadInput" oninput="validateAudioURL()" placeholder="Search for a song or paste a URL" type="url"></input>',
							'<span class="input-group-addon" id="audioLocalFileIcon"><i class="glyphicon glyphicon-plus" id="audioUrlGlyphiconPlus" title="No file selected." onclick="$(\'#audioFileInput\').click()"></i></span>',
		        '</div>',
		        '<div id="newAudioUploadPreview">',
		        	'<div id="audioPreviewControl">',
								'<div id="progressBar"><span id="playProgress"></span><i id="playHead"></i></div>',
								'<i class="glyphicon glyphicon-play" id="audioPlayerButton" onclick="togglePreviewPlayPause()"></i>',
								'<input class="glyphicon" id="audioTrackInput">',
								'<label class="glyphicon" id="audioTrackLabel">Track</label>',
								'<input class="glyphicon" id="audioArtistInput">',
								'<label class="glyphicon" id="audioArtistLabel">Artist</label>',
								'<input class="glyphicon" id="audioAlbumInput">',
								'<label class="glyphicon" id="audioAlbumLabel">Album</label>',
							'</div>',
							'<input id="selectAlbumArtInput" name="selectAlbumArtInput" accept="image/*" type="file" onchange="handleAlbumArt(this.files)"/>',
							'<div id="audioAlbumArtDiv">',
								'<div id="selectAudioAlbumArtDiv">',
									'<span class="text-center" onclick="$(\'#selectAlbumArtInput\').click()">Select album art</span>',
								'</div>',
								'<div id="audioAlbumArtPreview"></div>',
							'</div>',
		        '</div>',		        
		        '<div id="audioPermission">',
							'<label class="binary_switch">',
								'<input id="audioPermissionCheckBox" type="checkbox">',
								'<span class="binary_switch_track"></span>',
								'<span class="binary_switch_button"></span>',
							'</label>',
							'<span id="audioPermissionText" onclick="$(\'#audioPermissionCheckBox\').click()">',
								'This is my original work, or I <a> have permission </a> to post this.',
							'</span>',
						'</div>',
		        '<div id="audioDescriptionDiv">',
		        	'<span id="audioDescription" contenteditable="true"></span>',
		        '</div>',
		        '<div>',
		        	'<input class="form-control" id="audioTag" name="audioTag" placeholder="#tags" type="text" />',
		        '</div>',
		    	'</div>',
	      '</div>',
	    '</form>',
	  '</div>',
	  '<div class="modal-footer" id="newPostPanelFooter">',
	    '<button class="btn btn-default pull-left" data-dismiss="modal">Close</button>',
	    '<div class="btn-group">',
		    '<button class="btn btn-primary" id="audioPostButton" data-dismiss="modal" onclick="">Post</button>',
		    '<button class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-expanded="false" aria-haspopup="true">',
			    '<span class="caret"></span>',
			  '</button>',
			  '<ul class="dropdown-menu" id="audioUploadPostDropDown">',
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
	
	document.getElementById("modalDialog").innerHTML = audioPost;
	
	$("#modalFade").on("shown.bs.modal", function() {
	  $(this).find('#urlAudioUploadInput').focus();
	});
}

/**
 * Create HTML elements for audio post.
 * 
 * @method createAudioPostElements
 * @return {Array} Audio post HTML elements.
*/
function createAudioPostElements() {
	var divAudioPanel = document.createElement("div");
	var divAudioPanelHeading = document.createElement("div");
	var divAudioPostPanelBody = document.createElement("div");
	var divAudioPostPlayControl = document.createElement("div");
	var divAudioPostProgressBar = document.createElement("div");
	var divAudioPostPostAlbumArt = document.createElement("div");
	var divAudioPostPostDesciptionTagPanelBody = document.createElement("div");
	var divAudioPostTag = document.createElement("div");
	var divAudioPanelFooter = document.createElement("div");
	var divAudioPanelFooterDropdown = document.createElement("div");
	var aAudioPanelTitle = document.createElement("a");
	var aAudioTag = document.createElement("a");
	var aGlyphiconSend = document.createElement("a");
	var aGlyphiconRetweet = document.createElement("a");
	var aDropdownMenuEdit = document.createElement("a");
	var aDropdownMenuDelete = document.createElement("a");
	var audioUrl = document.createElement("audio");
	var imgAudioPostAlbumArt = document.createElement("img");
	var spanAudioPostPlayProgress = document.createElement("span");
	var spanGlyphiconSend = document.createElement("span");
	var spanGlyphiconRetweet = document.createElement("span");
	var spanGlyphiconCog = document.createElement("span");
	var iAudioPostPlayHead = document.createElement("i");
	var iAudioPostPlayerButton = document.createElement("i");
	var ulDropdownMenu = document.createElement("ul");
	var liAudioPostTrack = document.createElement("li");
	var liAudioPostArtist = document.createElement("li");
	var liAudioPostAlbum = document.createElement("li");
	var liAudioPostDefault = document.createElement("li");
	var liDropdownMenuEdit = document.createElement("li");
	var liDropdownMenuDelete = document.createElement("li");
	
	divAudioPanel.setAttribute('class', 'panel panel-default');
	divAudioPanelHeading.setAttribute('class', 'panel-heading');
	divAudioPostPanelBody.setAttribute('class', 'panel-body');
	divAudioPostPostDesciptionTagPanelBody.setAttribute('class', 'panel-body');
	divAudioPanelFooter.setAttribute('class', 'panel-footer');
	divAudioPanelFooterDropdown.setAttribute('class', 'dropdown');
	aAudioPanelTitle.setAttribute('class', 'panel-title');
	imgAudioPostAlbumArt.setAttribute('class', 'img-responsive');
	iAudioPostPlayerButton.setAttribute('class', 'glyphicon glyphicon-play audioPostPlayerButton');
	divAudioPostProgressBar.setAttribute('class', 'audioPostProgressBar');
	spanAudioPostPlayProgress.setAttribute('class', 'playProgress');
	iAudioPostPlayHead.setAttribute('class', 'playHead');
	liAudioPostTrack.setAttribute('class', 'glyphicon');
	liAudioPostArtist.setAttribute('class', 'glyphicon');
	liAudioPostAlbum.setAttribute('class', 'glyphicon');
	liAudioPostDefault.setAttribute('class', 'glyphicon');
	spanGlyphiconSend.setAttribute('class', 'glyphicon glyphicon-send');
	spanGlyphiconRetweet.setAttribute('class', 'glyphicon glyphicon-retweet');
	spanGlyphiconCog.setAttribute('class', 'glyphicon glyphicon-cog dropdown-toggle');
	ulDropdownMenu.setAttribute('class', 'dropdown-menu dropdown-menu-right');
	divAudioPostPanelBody.setAttribute('id', 'audioPostPanelBody');
	divAudioPostPlayControl.setAttribute('id', 'audioPostPlayControl');
	divAudioPostPostAlbumArt.setAttribute('id', 'audioPostAlbumArtDiv');
	divAudioPostPostDesciptionTagPanelBody.setAttribute('id', 'audioPostDesciptionTagPanelBody');
	divAudioPostTag.setAttribute('id', 'audioPostTagDiv');
	liAudioPostTrack.setAttribute('id', 'audioPostTrack');
	liAudioPostArtist.setAttribute('id', 'audioPostArtist');
	liAudioPostAlbum.setAttribute('id', 'audioPostAlbum');
	liAudioPostDefault.setAttribute('id', 'audioPostDefault');
	spanGlyphiconSend.setAttribute('Title', 'Share');
	spanGlyphiconRetweet.setAttribute('Title', 'Reblog');
	spanGlyphiconCog.setAttribute('Title', 'Options');
	spanGlyphiconCog.setAttribute('data-toggle', 'dropdown');
	
	aAudioPanelTitle.innerHTML = "groovypeacetimetravel";
	aDropdownMenuEdit.innerHTML = "Edit";
	aDropdownMenuDelete.innerHTML = "Delete";
	
	divAudioPanelHeading.appendChild(aAudioPanelTitle);
	divAudioPostProgressBar.appendChild(spanAudioPostPlayProgress);
	divAudioPostProgressBar.appendChild(iAudioPostPlayHead);
	divAudioPostPlayControl.appendChild(divAudioPostProgressBar);
	divAudioPostPlayControl.appendChild(iAudioPostPlayerButton);
	divAudioPostPlayControl.appendChild(liAudioPostTrack);
	divAudioPostPlayControl.appendChild(liAudioPostArtist);
	divAudioPostPlayControl.appendChild(liAudioPostAlbum);
	divAudioPostPlayControl.appendChild(liAudioPostDefault);
	divAudioPostPostAlbumArt.appendChild(imgAudioPostAlbumArt);
	divAudioPostPanelBody.appendChild(audioUrl);
	divAudioPostPanelBody.appendChild(divAudioPostPlayControl);
	divAudioPostPanelBody.appendChild(divAudioPostPostAlbumArt);
	divAudioPostTag.appendChild(aAudioTag);
	divAudioPostPostDesciptionTagPanelBody.appendChild(divAudioPostTag);	
	aGlyphiconSend.appendChild(spanGlyphiconSend);
	aGlyphiconRetweet.appendChild(spanGlyphiconRetweet);
	liDropdownMenuEdit.appendChild(aDropdownMenuEdit);
	liDropdownMenuDelete.appendChild(aDropdownMenuDelete);
	ulDropdownMenu.appendChild(liDropdownMenuEdit);
	ulDropdownMenu.appendChild(liDropdownMenuDelete);	
	divAudioPanelFooterDropdown.appendChild(aGlyphiconSend);
	divAudioPanelFooterDropdown.appendChild(aGlyphiconRetweet);
	divAudioPanelFooterDropdown.appendChild(spanGlyphiconCog);
	divAudioPanelFooterDropdown.appendChild(ulDropdownMenu);	
	divAudioPanelFooter.appendChild(divAudioPanelFooterDropdown);	
	divAudioPanel.appendChild(divAudioPanelHeading);
	divAudioPanel.appendChild(divAudioPostPanelBody);
	divAudioPanel.appendChild(divAudioPostPostDesciptionTagPanelBody);
	divAudioPanel.appendChild(divAudioPanelFooter);
	
	var postColumnList = document.getElementById("postColumn");
	postColumnList.insertBefore(divAudioPanel, postColumnList.childNodes[0]);

	return {
		divAudioPostProgressBar: divAudioPostProgressBar,
		audioUrl: audioUrl,
		spanAudioPostPlayProgress: spanAudioPostPlayProgress,
		iAudioPostPlayHead: iAudioPostPlayHead,
		iAudioPostPlayerButton: iAudioPostPlayerButton,
		imgAudioPostAlbumArt: imgAudioPostAlbumArt,
		liAudioPostDefault: liAudioPostDefault,
		liAudioPostTrack: liAudioPostTrack,
		liAudioPostArtist: liAudioPostArtist,
		liAudioPostAlbum: liAudioPostAlbum,
		divAudioPostPostAlbumArt: divAudioPostPostAlbumArt,
		divAudioPostPlayControl: divAudioPostPlayControl,
		divAudioPostPostDesciptionTagPanelBody: divAudioPostPostDesciptionTagPanelBody,
		divAudioPostTag: divAudioPostTag,
		aAudioTag: aAudioTag
	};
}

/**
 * Display web audio post from database.
 *
 * @method displayLocalAudioPostFromServer
 * @param localAudioPostId {Integer} Local audio post ID.
 * @param localAudioSaveDirectory {String} Local audio file save directory.
 * @param localAudioFileName {String} Local audio file name.
 * @param localAudioPostDescription {String} Local audio post description.
 * @param localAudioPostTag {String} Local audio post tag.
 * @param localAudioTrack {String} Local audio track info.
 * @param localAudioArtist {String} Local audio artist info.
 * @param localAudioAlbum {String} Local audio album info.
 * @param localAudioAlbumArtSaveDirectory {String} Album art file directory.
 * @param localAudioAlbumArtFileName {String} Album art file name.
 */
function displayLocalAudioPostFromServer(localAudioPostId, localAudioSaveDirectory, localAudioFileName, localAudioPostDescription, localAudioPostTag, localAudioTrack, localAudioArtist, localAudioAlbum, localAudioAlbumArtSaveDirectory, localAudioAlbumArtFileName) {
	var audioPostElements = createAudioPostElements();	
	setElementsId(audioPostElements, localAudioPostId);	
	setAudioSource(audioPostElements, "Local", localAudioSaveDirectory, localAudioFileName, "");	
	setAlbumArt(audioPostElements, localAudioAlbumArtSaveDirectory, localAudioAlbumArtFileName);	
	setAudioInfo(audioPostElements, localAudioTrack, localAudioArtist, localAudioAlbum);	
	setAudioPostDescriptionAndTag(audioPostElements, localAudioPostDescription, localAudioPostTag);
}

/**
 * Display web audio post from database.
 *
 * @method displayWebAudioPostFromServer
 * @param webAudioPostId {Integer} Web Audio Post ID.
 * @param webAudioUrl {String} Web audio URL.
 * @param webAudioPostDescription {String} Web audio post description.
 * @param webAudioPostTag {String} Web audio post tag.
 * @param webAudioTrack {String} Web audio track info.
 * @param webAudioArtist {String} Web audio artist info.
 * @param webAudioAlbum {String} Web audio album info.
 * @param webAudioAlbumArtDirectory {String} Album art file directory.
 * @param webAudioAlbumArtFileName {String} Album art file name.
 */
function displayWebAudioPostFromServer(webAudioPostId, webAudioUrl, webAudioPostDescription, webAudioPostTag, webAudioTrack, webAudioArtist, webAudioAlbum, webAudioAlbumArtDirectory, webAudioAlbumArtFileName) {
	var audioPostElements = createAudioPostElements();
	setElementsId(audioPostElements, webAudioPostId);
	setAudioSource(audioPostElements, "Web", "", "", webAudioUrl);
	setAlbumArt(audioPostElements, webAudioAlbumArtDirectory, webAudioAlbumArtFileName);
	setAudioInfo(audioPostElements, webAudioTrack, webAudioArtist, webAudioAlbum);
	setAudioPostDescriptionAndTag(audioPostElements, webAudioPostDescription, webAudioPostTag);	
}

/**
 * Get new local audio post data.
 * 
 * @method getLocalAudioPostData
 * @returns {FormData} Local audio file, Local audio post description, Local audio post tag, Local audio track info, Local audio artist info, Local audio album info.
 */
function getLocalAudioPostData() {
	var audiofile = document.getElementById("audioFileInput");
	var albumArtfile = document.getElementById("selectAlbumArtInput");
	
	if(audiofile.files[0]) {
		var formData = new FormData();
		formData.append("localAudio", audiofile.files[0]);	
		formData.append("localAudioPostDescription", $('#audioDescription').html());
		formData.append("localAudioPostTag", $('#audioTag').val());
		formData.append("localAudioTrack", $('#audioTrackInput').val());
		formData.append("localAudioArtist", $('#audioArtistInput').val());
		formData.append("localAudioAlbum", $('#audioAlbumInput').val());
		
		if(albumArtfile.files[0]) {
			formData.append("localAudioAlbumArt", albumArtfile.files[0]);			
		}
		
		return formData;
	}
}

/**
 * Get new web audio post data.
 * 
 * @method getWebAudioPostData
 * @returns {FormData} Web audio URL, Web audio post description, Web audio post tag, Web audio track info, Web audio artist info, Web audio album info.
 */
function getWebAudioPostData() {
	var albumArtfile = document.getElementById("selectAlbumArtInput");
	
	if($('#urlAudioUploadInput').val()) {
		var formData = new FormData();
		formData.append("webAudioUrl", $('#urlAudioUploadInput').val());	
		formData.append("webAudioPostDescription", $('#audioDescription').html());
		formData.append("webAudioPostTag", $('#audioTag').val());
		formData.append("webAudioTrack", $('#audioTrackInput').val());
		formData.append("webAudioArtist", $('#audioArtistInput').val());
		formData.append("webAudioAlbum", $('#audioAlbumInput').val());
		
		if(albumArtfile.files[0]) {
			formData.append("webAudioAlbumArt", albumArtfile.files[0]);
		}
		
		return formData;
	}
}

/**
 * Determine whether if display or hide album art for the audio post.
 *
 * @method setAlbumArt
 * @param postElements {Array} Audio post HTML elements.
 * @param albumArtDirectory {String} Album art file directory.
 * @param albumArtFileName {String} Album art file name.
 */
function setAlbumArt(postElements, albumArtDirectory, albumArtFileName) {
	if(albumArtFileName)
		postElements.imgAudioPostAlbumArt.setAttribute('src', albumArtDirectory+albumArtFileName);	
	else { // album art doesn't exists
		postElements.divAudioPostPostAlbumArt.setAttribute("style", "display: none;");
		postElements.divAudioPostPlayControl.setAttribute("style", "width: 100%;");
	}
}

/**
 * Set audio's info.
 *
 * @method setAudioInfo
 * @param postElements {Array} Audio post HTML elements.
 * @param audioTrack {String} Info about audio track.
 * @param audioArtist {String} Info about audio artist.
 * @param audioAlbum {String} Info about audio album.
 */
function setAudioInfo(postElements, audioTrack, audioArtist, audioAlbum) {
	if(!(audioTrack && audioArtist && audioAlbum)) // id3 data doesn't exists
		postElements.liAudioPostDefault.innerHTML = "Listen";
	else { // id3 data exists
		postElements.liAudioPostTrack.innerHTML = audioTrack;
		postElements.liAudioPostArtist.innerHTML = audioArtist;
		postElements.liAudioPostAlbum.innerHTML = audioAlbum;
	}
}

/**
 * Set audio post description and tag.
 *
 * @method setAudioPostDescriptionAndTag
 * @param postElements {Array} Audio post HTML elements.
 * @param postDescription {String} Audio post description.
 * @param postTag {String} Audio post tag.
 */
function setAudioPostDescriptionAndTag(postElements, postDescription, postTag) {
	if(postDescription) // audio post description exists
		postElements.divAudioPostPostDesciptionTagPanelBody.innerHTML = postDescription;
	
	if(postTag) {// audio post tag exists
		postElements.divAudioPostPostDesciptionTagPanelBody.appendChild(postElements.divAudioPostTag);
		postElements.aAudioTag.innerHTML = "#" + postTag;
	}
	else // audio post tag doesn't exists
		postElements.divAudioPostTag.setAttribute("style", "display: none;");
}

/**
 * Set audio file source.
 *
 * @method setAudioSource
 * @param postElements {Array} Audio post HTML elements.
 * @param sourceType {String} Local audio file or Web audio from YouTube/Vimeo.
 * @param audioSaveDirectory {String} Local audio file directory.
 * @param audioFileName {String} Local audio file name.
 * @param audioUrl {String} Web audio URL.
 */
function setAudioSource(postElements, sourceType, audioSaveDirectory, audioFileName, audioUrl) {
	if(sourceType == "Local")
		postElements.audioUrl.setAttribute('src', audioSaveDirectory+audioFileName);
	else if(sourceType == "Web")
		postElements.audioUrl.setAttribute('src', audioUrl);

	postElements.audioUrl.setAttribute('onloadedmetadata', 'initializeUrlAudioPostControl(this, this.id)');
}

/**
 * Set audio post player elements id.
 *
 * @method setElementsId
 * @param postElements {Array[]} Audio post HTML elements.
 * @param audioId {Integer} Audio ID.
 */
function setElementsId(postElements, audioId) {
	postElements.divAudioPostProgressBar.setAttribute('id', 'audioPostProgressBar'+audioId);
	postElements.audioUrl.setAttribute('id', 'urlAudio'+audioId);
	postElements.spanAudioPostPlayProgress.setAttribute('id', 'playProgress'+audioId);
	postElements.iAudioPostPlayHead.setAttribute('id', 'playHead'+audioId);
	postElements.iAudioPostPlayerButton.setAttribute('id', 'audioPostPlayerButton'+audioId);
	postElements.iAudioPostPlayerButton.setAttribute('onclick', 'togglePlayPauseAudioPost(this.id)');
}