function addNewTextPost() {
	var formData = getTextPostData();
	
	$.ajax({
    url: "/textPost",
		type: "POST",
		data: formData, // The form with the file inputs.
		processData: false, // Using FormData, no need to process data.
    contentType: false,
	}).done(function(data) {
		for(i = data.length-1; i >= 0 ; i-- ) {
			addTextPostFromSever(data[i].textPostTitle, data[i].textPostText, data[i].textPostTag);
			/*console.log("Success: Files sent!");
		  console.log(data);*/
		}
	}).fail(function() {
		console.log("An error occurred, the files couldn't be sent!");
	});
}

function addTextPostFromSever(textPostTitle, textPostText, textPostTag) {
	var textPostElements = createTextPostElements();
	setTextPostAndTag(textPostElements, textPostTitle, textPostText, textPostTag);
}

function createTextPostElements() {
	var divTextPanel = document.createElement("div");
	var divTextPanelHeading = document.createElement("div");
	var divTextPanelTitle = document.createElement("div");
	var divTextPanelBody = document.createElement("div");
	var divTextPostTag = document.createElement("div");
	var divTextPanelFooter = document.createElement("div");
	var divTextPanelDropdown = document.createElement("div");
	var h1TextTitle = document.createElement("h1");
	var aTextPanelTitle = document.createElement("a");
	var aTextTag = document.createElement("a");
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
	
	divTextPanel.setAttribute('class', 'panel panel-default');
	divTextPanelHeading.setAttribute('class', 'panel-heading');
	divTextPanelTitle.setAttribute('class', 'panel-heading');
	divTextPanelBody.setAttribute('class', 'panel-body');
	divTextPanelFooter.setAttribute('class', 'panel-footer');
	divTextPanelDropdown.setAttribute('class', 'dropdown');
	aTextPanelTitle.setAttribute('class', 'panel-title');
	h1TextTitle.setAttribute('class', 'panel-title');
	spanGlyphiconSend.setAttribute('class', 'glyphicon glyphicon-send');
	spanGlyphiconRetweet.setAttribute('class', 'glyphicon glyphicon-retweet');
	spanGlyphiconCog.setAttribute('class', 'glyphicon glyphicon-cog dropdown-toggle');
	ulDropdownMenu.setAttribute('class', 'dropdown-menu dropdown-menu-right');
	divTextPanelTitle.setAttribute('id', 'textPostTitle');
	divTextPostTag.setAttribute('id', 'textPostTagDiv');
	//aGlyphiconSend.setAttribute('href', '');
	//aGlyphiconRetweet.setAttribute('href', '');
	spanGlyphiconCog.setAttribute('data-toggle', 'dropdown');
	//aDropdownMenuEdit.setAttribute('href', '');
	//aDropdownMenuDelete.setAttribute('href', '');
	spanGlyphiconSend.setAttribute('Title', 'Share');
	spanGlyphiconRetweet.setAttribute('Title', 'Reblog');
	spanGlyphiconCog.setAttribute('Title', 'Options');
	
	aTextPanelTitle.innerHTML = "groovypeacetimetravel";
	aDropdownMenuEdit.innerHTML = "Edit";
	aDropdownMenuDelete.innerHTML = "Delete";
	
	divTextPanelHeading.appendChild(aTextPanelTitle);
	divTextPanelTitle.appendChild(h1TextTitle);
	divTextPostTag.appendChild(aTextTag);
	divTextPanelBody.appendChild(divTextPostTag);
	liDropdownMenuEdit.appendChild(aDropdownMenuEdit);
	liDropdownMenuDelete.appendChild(aDropdownMenuDelete);
	ulDropdownMenu.appendChild(liDropdownMenuEdit);
	ulDropdownMenu.appendChild(liDropdownMenuDelete);
	aGlyphiconSend.appendChild(spanGlyphiconSend);
	aGlyphiconRetweet.appendChild(spanGlyphiconRetweet);
	divTextPanelDropdown.appendChild(aGlyphiconSend);
	divTextPanelDropdown.appendChild(aGlyphiconRetweet);
	divTextPanelDropdown.appendChild(spanGlyphiconCog);
	divTextPanelDropdown.appendChild(ulDropdownMenu);
	divTextPanelFooter.appendChild(divTextPanelDropdown);
	divTextPanel.appendChild(divTextPanelHeading);
	divTextPanel.appendChild(divTextPanelTitle);
	divTextPanel.appendChild(divTextPanelBody);
	divTextPanel.appendChild(divTextPanelFooter);
	
	var postColumnList = document.getElementById("postColumn");
	postColumnList.insertBefore(divTextPanel, postColumnList.childNodes[0]);
	
	return {
		h1TextTitle: h1TextTitle,
		divTextPanelBody: divTextPanelBody,
		divTextPostTag: divTextPostTag,
		aTextTag: aTextTag
	};
}

function getTextPostData() {
	var formData = new FormData();
	formData.append("textPostTitle", $('#textTitle').html());	
	formData.append("textPostText", $('#textAreaPost').html());
	formData.append("textPostTag", $('#textTag').val());
	
	return formData;
}

function setTextPostAndTag(postElements, textTitle, text, postTag) {
	if(textTitle)
		postElements.h1TextTitle.innerHTML = textTitle;
	if(text) {
		postElements.divTextPanelBody.innerHTML = text;	
		postElements.divTextPanelBody.appendChild(postElements.divTextPostTag);
	}
	if(postTag)
		postElements.aTextTag.innerHTML = "#" + postTag;
	else
		postElements.divTextPostTag.setAttribute("style", "display: none;");
}

/* new text modal */
function textPostModal() {
	var textPost = [
		'<div class="modal-content">',
		'	<div class="panel-heading" id="newPostPanelHead">',
		'    <a class="panel-title" id="newPostPanelHeadTitle">groovypeacetimetravel</a>',
		'    <span class="glyphicon glyphicon-cog pull-right"></span>',
		'  </div>',
		'  <div class="modal-body" id="newTextModalBody">',
		'    <form role="form">',
		'        <span id="textTitle" contenteditable="true"></span>',
		'        <span id="textAreaPost" contenteditable="true"></span>',
		'        <input class="form-control" id="textTag" placeholder="#tags" />',
		'    </form>',
		'  </div>',
		'	<div class="modal-footer" id="newPostPanelFooter">',
	  '	  <button class="btn btn-default pull-left" data-dismiss="modal">Close</button>',
	  '	  <div class="btn-group">',
	  '	    <button class="btn btn-primary" data-dismiss="modal" onclick="addNewTextPost()">Post</button>',
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
		
	document.getElementById("modalDialog").innerHTML = textPost;
	
  $("#modalFade").on("shown.bs.modal", function(){
    $(this).find('#textAreaPost').focus();
  });
}