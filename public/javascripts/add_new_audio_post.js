/*
 ===============
 new audio modal
 ===============
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
								'<i class="glyphicon glyphicon-play" id="audioPlayerButton" onclick="togglePlayPause()"></i>',
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

/*
 ============
 online audio
 ============
*/
function addNewWebAudioPost() {	
	var file = document.getElementById("selectAlbumArtInput");
	var formData = new FormData();
	formData.append("webAudioUrl", $('#urlAudioUploadInput').val());	
	formData.append("webAudioPostDescription", $('#audioDescription').html());
	formData.append("webAudioPostTag", $('#audioTag').val());
	formData.append("webAudioAlbumArt", file.files[0]);
	formData.append("webAudioTrack", $('#audioTrackInput').val());
	formData.append("webAudioArtist", $('#audioArtistInput').val());
	formData.append("webAudioAlbum", $('#audioAlbumInput').val());
	
	$.ajax({
    url: "/webAudio",
		type: "POST",
		data: formData, // The form with the file inputs.
		processData: false, // Using FormData, no need to process data.
    contentType: false,
	}).done(function(data) {
		for(i = data.length-1; i >= 0 ; i-- ) {
			addNewWebAudioPostFromServer(data[i].webAudioPostId, data[i].webAudioUrl, data[i].webAudioPostDescription, data[i].webAudioPostTag, data[i].webAudioTrack, data[i].webAudioArtist, data[i].webAudioAlbum, data[i].webAudioAlbumArtDirectory, data[i].webAudioAlbumArtFileName);
			console.log("Success: Files sent!");
		  console.log(data);
		}
	}).fail(function() {
		console.log("An error occurred, the files couldn't be sent!");
	});
}

function addNewWebAudioPostFromServer(webAudioPostId, webAudioUrl, webAudioPostDescription, webAudioPostTag, webAudioTrack, webAudioArtist, webAudioAlbum, webAudioAlbumArtDirectory, webAudioAlbumArtFileName) {
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
	divAudioPostProgressBar.setAttribute('id', 'audioPostProgressBar'+webAudioPostId);
	divAudioPostPostAlbumArt.setAttribute('id', 'audioPostAlbumArtDiv');
	divAudioPostTag.setAttribute('id', 'audioPostTagDiv');
	divAudioPostPostDesciptionTagPanelBody.setAttribute('id', 'audioPostDesciptionTagPanelBody');
	audioUrl.setAttribute('id', 'urlAudio'+webAudioPostId);
	spanAudioPostPlayProgress.setAttribute('id', 'playProgress'+webAudioPostId);
	iAudioPostPlayHead.setAttribute('id', 'playHead'+webAudioPostId);
	iAudioPostPlayerButton.setAttribute('id', 'audioPostPlayerButton'+webAudioPostId);
	liAudioPostTrack.setAttribute('id', 'audioPostTrack');
	liAudioPostArtist.setAttribute('id', 'audioPostArtist');
	liAudioPostAlbum.setAttribute('id', 'audioPostAlbum');
	liAudioPostDefault.setAttribute('id', 'audioPostDefault');
	audioUrl.setAttribute('src', webAudioUrl);
	audioUrl.setAttribute('onloadedmetadata', 'initilizeUrlAudioPostControl(this, this.id)');
	iAudioPostPlayerButton.setAttribute('onclick', 'togglePlayPauseAudioPost(this.id)');
	if(webAudioAlbumArtFileName)
		imgAudioPostAlbumArt.setAttribute('src', webAudioAlbumArtDirectory+webAudioAlbumArtFileName);
	spanGlyphiconSend.setAttribute('Title', 'Share');
	spanGlyphiconRetweet.setAttribute('Title', 'Reblog');
	spanGlyphiconCog.setAttribute('Title', 'Options');
	spanGlyphiconCog.setAttribute('data-toggle', 'dropdown');
	
	aAudioPanelTitle.innerHTML = "groovypeacetimetravel";
	if(!(webAudioTrack && webAudioArtist && webAudioAlbum)) // id3 data: false
		liAudioPostDefault.innerHTML = "Listen";
	else { // id3 data: true
		liAudioPostTrack.innerHTML = webAudioTrack;
		liAudioPostArtist.innerHTML = webAudioArtist;
		liAudioPostAlbum.innerHTML = webAudioAlbum;
	}
	if(!webAudioAlbumArtFileName) { // album art: false
		divAudioPostPostAlbumArt.setAttribute("style", "display: none;");
		divAudioPostPlayControl.setAttribute("style", "width: 100%;");
	}
	if(webAudioPostDescription) // audio post description: true
		divAudioPostPostDesciptionTagPanelBody.innerHTML = webAudioPostDescription;
	if(webAudioPostTag) // audio post tag: true
		aAudioTag.innerHTML = "#" + webAudioPostTag;
	else // audio post tag: false
		divAudioPostTag.setAttribute("style", "display: none;");
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
	
	/*if(!webAudioAlbumArtFileName) {
		divAudioPostPostAlbumArt.setAttribute("style", "display: none;");
		divAudioPostPlayControl.setAttribute("style", "width: 100%;");
	}*/
	
	/*if(!aAudioTag)
		aAudioTag.setAttribute("style", "display: none;");*/
	
	var postColumnList = document.getElementById("postColumn");
	postColumnList.insertBefore(divAudioPanel, postColumnList.childNodes[0]);	
}

/*
===========
local audio
===========
*/
function addNewLocalAudioPost() {	
	var audiofile = document.getElementById("audioFileInput");
	var albumArtfile = document.getElementById("selectAlbumArtInput");
	var formData = new FormData();
	formData.append("localAudio", audiofile.files[0]);	
	formData.append("localAudioPostDescription", $('#audioDescription').html());
	formData.append("localAudioPostTag", $('#audioTag').val());
	formData.append("localAudioAlbumArt", albumArtfile.files[0]);
	formData.append("localAudioTrack", $('#audioTrackInput').val());
	formData.append("localAudioArtist", $('#audioArtistInput').val());
	formData.append("localAudioAlbum", $('#audioAlbumInput').val());
	
	$.ajax({
		url: "/localAudio",
		type: "POST",
		data: formData, // The form with the file inputs.
		processData: false, // Using FormData, no need to process data.
   contentType: false,
	}).done(function(data) {
		for(i = data.length-1; i >= 0 ; i-- ) {
			addNewLocalAudioPostFromServer(data[i].localAudioPostId, data[i].localAudioSaveDirectory, data[i].localAudioFileName, data[i].localAudioPostDescription, data[i].localAudioPostTag, data[i].localAudioTrack, data[i].localAudioArtist, data[i].localAudioAlbum, data[i].localAudioAlbumArtSaveDirectory, data[i].localAudioAlbumArtFileName);
			/*console.log("Success: Files sent!");
		  console.log(data);*/
		}
	}).fail(function() {
		console.log("An error occurred, the files couldn't be sent!");
	});
}

function addNewLocalAudioPostFromServer(localAudioPostId, localAudioSaveDirectory, localAudioFileName, localAudioPostDescription, localAudioPostTag, localAudioTrack, localAudioArtist, localAudioAlbum, localAudioAlbumArtSaveDirectory, localAudioAlbumArtFileName) {
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
	divAudioPostProgressBar.setAttribute('id', 'audioPostProgressBar'+localAudioPostId);
	divAudioPostPostAlbumArt.setAttribute('id', 'audioPostAlbumArtDiv');
	divAudioPostPostDesciptionTagPanelBody.setAttribute('id', 'audioPostDesciptionTagPanelBody');
	divAudioPostTag.setAttribute('id', 'audioPostTagDiv');
	audioUrl.setAttribute('id', 'urlAudio'+localAudioPostId);
	spanAudioPostPlayProgress.setAttribute('id', 'playProgress'+localAudioPostId);
	iAudioPostPlayHead.setAttribute('id', 'playHead'+localAudioPostId);
	iAudioPostPlayerButton.setAttribute('id', 'audioPostPlayerButton'+localAudioPostId);
	liAudioPostTrack.setAttribute('id', 'audioPostTrack');
	liAudioPostArtist.setAttribute('id', 'audioPostArtist');
	liAudioPostAlbum.setAttribute('id', 'audioPostAlbum');
	liAudioPostDefault.setAttribute('id', 'audioPostDefault');
	audioUrl.setAttribute('src', localAudioSaveDirectory+localAudioFileName);
	audioUrl.setAttribute('onloadedmetadata', 'initilizeUrlAudioPostControl(this, this.id)');
	iAudioPostPlayerButton.setAttribute('onclick', 'togglePlayPauseAudioPost(this.id)');
	if(localAudioAlbumArtFileName)
		imgAudioPostAlbumArt.setAttribute('src', localAudioAlbumArtSaveDirectory+localAudioAlbumArtFileName);
	spanGlyphiconSend.setAttribute('Title', 'Share');
	spanGlyphiconRetweet.setAttribute('Title', 'Reblog');
	spanGlyphiconCog.setAttribute('Title', 'Options');
	spanGlyphiconCog.setAttribute('data-toggle', 'dropdown');
	
	aAudioPanelTitle.innerHTML = "groovypeacetimetravel";
	if(!(localAudioTrack && localAudioArtist && localAudioAlbum)) // id3 data: false
		liAudioPostDefault.innerHTML = "Listen";
	else { // id3 data: true
		liAudioPostTrack.innerHTML = localAudioTrack;
		liAudioPostArtist.innerHTML = localAudioArtist;
		liAudioPostAlbum.innerHTML = localAudioAlbum;
	}
	if(!localAudioAlbumArtFileName) { // album art: false
		divAudioPostPostAlbumArt.setAttribute("style", "display: none;");
		divAudioPostPlayControl.setAttribute("style", "width: 100%;");
	}
	if(localAudioPostDescription) // audio post description: true
		divAudioPostPostDesciptionTagPanelBody.innerHTML = localAudioPostDescription;
	if(localAudioPostTag) // audio post tag: true
		aAudioTag.innerHTML = "#" + localAudioPostTag;
	else // audio post tag: false
		aAudioTag.setAttribute("style", "display: none;");
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
	
	/*if(!localAudioAlbumArtFileName) {
		divAudioPostPostAlbumArt.setAttribute("style", "display: none;");
		divAudioPostPlayControl.setAttribute("style", "width: 100%;");
	}*/
	
	/*if(!aAudioTag)
		aAudioTag.setAttribute("style", "display: none;");*/
	
	var postColumnList = document.getElementById("postColumn");
	postColumnList.insertBefore(divAudioPanel, postColumnList.childNodes[0]);	
}