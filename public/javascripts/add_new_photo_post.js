/*
 ===============
 new photo modal
 ===============
*/
function photoPostModal() {
	var photoPost = [
		'<div class="modal-content" id="newPhotoPostModal">',
	  '	<div class="panel-heading" id="newPostPanelHead">',
	  ' 	 <a class="panel-title" id="newPostPanelHeadTitle">groovypeacetimetravel</a>',
	  ' 	 <span class="glyphicon glyphicon-cog pull-right"></span>',
	  '	</div>',
	  '	<div class="modal-body" id="newPhotoPostModalBody">',
	  '	  <form role="form">',
	  '			<input id="photoFileInput" name="photoFileInput" accept="image/*" type="file" onchange="handlePhotoFiles(this.files)"/>',
	  '	    <div class="container-fluid">',
	  '	      <div class="row" id="newPhotoUploadPanel">',
	  '	        <div class="col-md-6" id="photoUploadColumn" onclick="$(\'#photoFileInput\').click()">',
	  '	          <div><i class="material-icons" id="photoUploadIcon">add_a_photo</i></div>',
	  '	          <div><span id="photoUploadLabel">Upload photos</span></div>',
	  '	        </div>',
	  '	        <div class="col-md-6" id="photoWebColumn" onclick=photoUrlPanelDisplay()>',
	  '	          <div><i class="glyphicon glyphicon-globe" id="photoWebIcon"></i></div>',
	  '	          <div><span id="photoWebLabel">Add photo from web</span></div>',
	  '	        </div>',
	  '	      </div>',
	  '	      <div class="row" id="urlPhotoUploadPanel">',
	  '	        <div class="col-md-12" id="urlPhotoUploadPanelDiv">',
	  '						<span class="close" id="urlPhotoUploadPanelClose" onclick="closePhotoUrlPanel()">&times;</span>',
	  '	          <input id="urlPhotoUploadInput" oninput="validatePhotoURL()" placeholder="Paste a URL"></input>',
	  '	        </div>',
	  '	      </div>',
	  '	      <div class="row" id="newPhotoUploadThumbnail"></div>',
	  '	      <div class="row text-center" id="addAnotherPhotoButton" onclick="$(\'#photoFileInput\').click()">',
	  '	        <i class="material-icons" id="addAnotherPhotoIcon">add_a_photo</i> Add another',
	  '	      </div>',
	  '	      <div class="row text-center" id="addAnotherPhotoFromWebButton" onclick=displayPhotoURLInput()>',
	  '	        <i class="glyphicon glyphicon-globe" id="addAnotherPhotoFromWebIcon"></i> Add another',
	  '	      </div>',
	  '	      <div class="row text-center" id="addAnotherPhotoFromWebDiv">',
	  '	        <input id="addAnotherPhotoFromWebInput" oninput="validateAnotherPhotoURL()" placeholder="Paste a URL"></input>',
	  '	      </div>',
	  '	      <div class="row text-center" id="addAgainAnotherPhotoFromWebButton" onclick=displayPhotoURLInput()>',
	  '	        <i class="glyphicon glyphicon-globe" id="addAnotherPhotoFromWebIcon"></i> Add another',
	  '	      </div>',
	  '	      <span id="photoCaption" contenteditable="true"></span>',
	  '	      <input class="form-control" id="photoTag" name="tags" placeholder="#tags" type="text" />',
	  '	    </div>',
	  '	  </form>',
	  '	</div>',
	  '	<div class="modal-footer" id="newPostPanelFooter">',
	  '	  <button class="btn btn-default pull-left" data-dismiss="modal">Close</button>',
	  '	  <div class="btn-group">',
	  '	    <button class="btn btn-primary" id="photoPostButton" data-dismiss="modal" onclick="">Post</button>',
	  '	    <button class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-expanded="false" aria-haspopup="true">',
		'				<span class="caret"></span>',
		'			</button>',
	  '	    <ul class="dropdown-menu" id="photoUploadPostDropDown">',
	  '	      <li><a href="">Post now</a></li>',
	  '	      <li><a href="">Add to queue</a></li>',
	  '	      <li><a href="">Save as draft</a></li>',
	  '	      <li><a href="">Post privately</a></li>',
	  '	      <li><a href="">Schedule</a></li>',
	  '	    </ul>',
	  '	  </div>',
	  '	</div>',
		'</div>'
	].join('');
		
	document.getElementById("modalDialog").innerHTML = photoPost;
}

/*
===========
local photo
===========
*/
function addNewLocalPhotoPost() {  
	var file = document.getElementById("photoFileInput");
	var formData = new FormData();
	formData.append("photoFileInput", file.files[0]);
	formData.append("photoCaption", $('#photoCaption').html());
	formData.append("photoTag", $('#photoTag').val());
	
	$.ajax({
    url: "/localPhoto",
		type: "POST",
		data: formData, // The form with the file inputs.
		processData: false, // Using FormData, no need to process data.
    contentType: false,
	}).done(function(data) {
		for(i = data.length-1; i >= 0 ; i-- ) {
			addLocalPhotoPostFromServer(data[i].photoSaveDirectory, data[i].photoCaption, data[i].photoTag, data[i].imageFileName);
			/*console.log("Success: Files sent!");
		  console.log(data);*/
		}
	}).fail(function() {
		console.log("An error occurred, the files couldn't be sent!");
	});	
}

function addLocalPhotoPostFromServer(photoSaveDirectory, photoCaption, photoTag, imageFileName) {
	var divPhotoPanel = document.createElement("div");
	var divPhotoPanelHeading = document.createElement("div");
	var divPhotoImgPanelBody = document.createElement("div");
	var divPhotoTextPanelBody = document.createElement("div");
	var divPhotoPostTag = document.createElement("div");
	var divPhotoPanelFooter = document.createElement("div");
	var divPhotoPanelFooterDropdown = document.createElement("div");	
	var aPhotoPanelTitle = document.createElement("a");
	var aPhotoTag = document.createElement("a");
	var aGlyphiconSend = document.createElement("a");
	var aGlyphiconRetweet = document.createElement("a");
	var aDropdownMenuEdit = document.createElement("a");
	var aDropdownMenuDelete = document.createElement("a");	
	var imgPhotoResponsive = document.createElement("img");
	var spanGlyphiconSend = document.createElement("span");
	var spanGlyphiconRetweet = document.createElement("span");
	var spanGlyphiconCog = document.createElement("span");	
	var ulDropdownMenu = document.createElement("ul");	
	var liDropdownMenuEdit = document.createElement("li");
	var liDropdownMenuDelete = document.createElement("li");
	
	divPhotoPanel.setAttribute('class', 'panel panel-default');
	divPhotoPanelHeading.setAttribute('class', 'panel-heading');
	divPhotoImgPanelBody.setAttribute('class', 'photo-panel-body');
	divPhotoTextPanelBody.setAttribute('class', 'panel-body');
	divPhotoPanelFooter.setAttribute('class', 'panel-footer');
	divPhotoPanelFooterDropdown.setAttribute('class', 'dropdown');
	aPhotoPanelTitle.setAttribute('class', 'panel-title');
	imgPhotoResponsive.setAttribute('class', 'img-responsive');
	spanGlyphiconSend.setAttribute('class', 'glyphicon glyphicon-send');
	spanGlyphiconRetweet.setAttribute('class', 'glyphicon glyphicon-retweet');
	spanGlyphiconCog.setAttribute('class', 'glyphicon glyphicon-cog dropdown-toggle');
	ulDropdownMenu.setAttribute('class', 'dropdown-menu dropdown-menu-right');
	divPhotoPostTag.setAttribute('id', 'PhotoPostTagDiv');
	imgPhotoResponsive.setAttribute('id', 'imgResponsive');
	spanGlyphiconCog.setAttribute('data-toggle', 'dropdown');
	imgPhotoResponsive.setAttribute('src', photoSaveDirectory+imageFileName);
	spanGlyphiconSend.setAttribute('Title', 'Share');
	spanGlyphiconRetweet.setAttribute('Title', 'Reblog');
	spanGlyphiconCog.setAttribute('Title', 'Options');
	
	aPhotoPanelTitle.innerHTML = "groovypeacetimetravel";
	
	if(photoCaption) // photo post caption = true
		divPhotoTextPanelBody.innerHTML = photoCaption;
	if(photoTag) // photo post tag = true
		aPhotoTag.innerHTML = "#" + photoTag;
	else // photo post tag = false
		divPhotoPostTag.setAttribute("style", "display: none;");
	aDropdownMenuEdit.innerHTML = "Edit";
	aDropdownMenuDelete.innerHTML = "Delete";
	
	divPhotoPanelHeading.appendChild(aPhotoPanelTitle);
	divPhotoImgPanelBody.appendChild(imgPhotoResponsive);
	divPhotoPostTag.appendChild(aPhotoTag);
	divPhotoTextPanelBody.appendChild(divPhotoPostTag);
	aGlyphiconSend.appendChild(spanGlyphiconSend);
	aGlyphiconRetweet.appendChild(spanGlyphiconRetweet);
	liDropdownMenuEdit.appendChild(aDropdownMenuEdit);
	liDropdownMenuDelete.appendChild(aDropdownMenuDelete);
	ulDropdownMenu.appendChild(liDropdownMenuEdit);
	ulDropdownMenu.appendChild(liDropdownMenuDelete);	
	divPhotoPanelFooterDropdown.appendChild(aGlyphiconSend);
	divPhotoPanelFooterDropdown.appendChild(aGlyphiconRetweet);
	divPhotoPanelFooterDropdown.appendChild(spanGlyphiconCog);
	divPhotoPanelFooterDropdown.appendChild(ulDropdownMenu);	
	divPhotoPanelFooter.appendChild(divPhotoPanelFooterDropdown);	
	divPhotoPanel.appendChild(divPhotoPanelHeading);
	divPhotoPanel.appendChild(divPhotoImgPanelBody);
	divPhotoPanel.appendChild(divPhotoTextPanelBody);
	divPhotoPanel.appendChild(divPhotoPanelFooter);
	
	var postColumnList = document.getElementById("postColumn");
	postColumnList.insertBefore(divPhotoPanel, postColumnList.childNodes[0]);	
}

function addNewWebPhotoPost() {	
	$.ajax({
		type: "POST",
    data: {
    	'webPhotoUrl': document.getElementById("urlPhotoUploadInput").value,
    	'webPhotoCaption': $('#photoCaption').html(),
    	'webPhotoTag': $('#photoTag').val()
    },
    url: "/webPhoto",
		}).done(function(data) {
			for(i = data.length-1; i >= 0 ; i-- ) {
				addNewWebPhotoPostFromServer(data[i].webPhotoUrl, data[i].webPhotoCaption, data[i].webPhotoPostTag);    		 
			}
		}).fail(function() {
			console.log("error");
			console.log(data);
		});	
}

function addNewWebPhotoPostFromServer(webPhotoUrl, webPhotoCaption, webPhotoPostTag) {
	var divPhotoPanel = document.createElement("div");
	var divPhotoPanelHeading = document.createElement("div");
	var divPhotoImgPanelBody = document.createElement("div");
	var divPhotoTextPanelBody = document.createElement("div");
	var divPhotoPostTag = document.createElement("div");
	var divPhotoPanelFooter = document.createElement("div");
	var divPhotoPanelFooterDropdown = document.createElement("div");	
	var aPhotoPanelTitle = document.createElement("a");
	var aPhotoTag = document.createElement("a");
	var aGlyphiconSend = document.createElement("a");
	var aGlyphiconRetweet = document.createElement("a");
	var aDropdownMenuEdit = document.createElement("a");
	var aDropdownMenuDelete = document.createElement("a");	
	var imgPhotoResponsive = document.createElement("img");
	var spanGlyphiconSend = document.createElement("span");
	var spanGlyphiconRetweet = document.createElement("span");
	var spanGlyphiconCog = document.createElement("span");	
	var ulDropdownMenu = document.createElement("ul");	
	var liDropdownMenuEdit = document.createElement("li");
	var liDropdownMenuDelete = document.createElement("li");
	
	divPhotoPanel.setAttribute('class', 'panel panel-default');
	divPhotoPanelHeading.setAttribute('class', 'panel-heading');
	divPhotoImgPanelBody.setAttribute('class', 'photo-panel-body');
	divPhotoTextPanelBody.setAttribute('class', 'panel-body');
	divPhotoPanelFooter.setAttribute('class', 'panel-footer');
	divPhotoPanelFooterDropdown.setAttribute('class', 'dropdown');
	aPhotoPanelTitle.setAttribute('class', 'panel-title');
	imgPhotoResponsive.setAttribute('class', 'img-responsive');
	spanGlyphiconSend.setAttribute('class', 'glyphicon glyphicon-send');
	spanGlyphiconRetweet.setAttribute('class', 'glyphicon glyphicon-retweet');
	spanGlyphiconCog.setAttribute('class', 'glyphicon glyphicon-cog dropdown-toggle');
	ulDropdownMenu.setAttribute('class', 'dropdown-menu dropdown-menu-right');
	divPhotoPostTag.setAttribute('id', 'PhotoPostTagDiv');
	imgPhotoResponsive.setAttribute('id', 'imgResponsive');
	spanGlyphiconCog.setAttribute('data-toggle', 'dropdown');
	imgPhotoResponsive.setAttribute('src', webPhotoUrl);
	spanGlyphiconSend.setAttribute('Title', 'Share');
	spanGlyphiconRetweet.setAttribute('Title', 'Reblog');
	spanGlyphiconCog.setAttribute('Title', 'Options');
	
	aPhotoPanelTitle.innerHTML = "groovypeacetimetravel";
	if(webPhotoCaption) // photo post caption = true
		divPhotoTextPanelBody.innerHTML = webPhotoCaption;
	if(webPhotoPostTag) // photo post tag = true
		aPhotoTag.innerHTML = "#" + webPhotoPostTag;
	else // photo post tag = false
		aPhotoTag.setAttribute("style", "display: none;");
	aDropdownMenuEdit.innerHTML = "Edit";
	aDropdownMenuDelete.innerHTML = "Delete";
	
	divPhotoPanelHeading.appendChild(aPhotoPanelTitle);
	divPhotoImgPanelBody.appendChild(imgPhotoResponsive);
	divPhotoPostTag.appendChild(aPhotoTag);
	divPhotoTextPanelBody.appendChild(divPhotoPostTag);
	aGlyphiconSend.appendChild(spanGlyphiconSend);
	aGlyphiconRetweet.appendChild(spanGlyphiconRetweet);
	liDropdownMenuEdit.appendChild(aDropdownMenuEdit);
	liDropdownMenuDelete.appendChild(aDropdownMenuDelete);
	ulDropdownMenu.appendChild(liDropdownMenuEdit);
	ulDropdownMenu.appendChild(liDropdownMenuDelete);	
	divPhotoPanelFooterDropdown.appendChild(aGlyphiconSend);
	divPhotoPanelFooterDropdown.appendChild(aGlyphiconRetweet);
	divPhotoPanelFooterDropdown.appendChild(spanGlyphiconCog);
	divPhotoPanelFooterDropdown.appendChild(ulDropdownMenu);	
	divPhotoPanelFooter.appendChild(divPhotoPanelFooterDropdown);	
	divPhotoPanel.appendChild(divPhotoPanelHeading);
	divPhotoPanel.appendChild(divPhotoImgPanelBody);
	divPhotoPanel.appendChild(divPhotoTextPanelBody);
	divPhotoPanel.appendChild(divPhotoPanelFooter);
	
	var postColumnList = document.getElementById("postColumn");
	postColumnList.insertBefore(divPhotoPanel, postColumnList.childNodes[0]);	
}