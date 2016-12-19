/*search bar icon background changes to white when focus 
 * and the normal color when blur*/
$(document).ready(function(){
    $("#search").focus(function(){
        $("#searchIcon").css("background", "white");
        $("#glyphiconSearch").css("color", "#444444");
    });
    $("#search").blur(function(){
      $("#searchIcon").css("background", "#2F3D51");
      $("#glyphiconSearch").css("color", "#ACB1B9");
		});
});

/*text area auto-expand*/
$(document)
	.one('focus.form-control', 'textarea.form-control', function() {
	  var savedValue = this.value;
	  this.value = '';
	  this.baseScrollHeight = this.scrollHeight;
	  this.value = savedValue;
	})
	.on('input.form-control', 'textarea.form-control', function() {
	  var minRows = this.getAttribute('data-min-rows') | 0, rows;
	  this.rows = minRows;
	  rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 20); // 20 for rows="1" data-min-rows="1" without issues
	  this.rows = minRows + rows;
	});

/*new text post title input auto-expand*/
$(document)
.one('focus', '#textTitle', function() {
  var savedValue = this.value;
  this.value = '';
  this.baseScrollHeight = this.scrollHeight;
  this.value = savedValue;
})
.on('input', '#textTitle', function() {
  var minRows = this.getAttribute('data-min-rows') | 0, rows;
  this.rows = minRows;
  rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 51.5); // 51.5 for rows="1" data-min-rows="1" font-size:36px without issues
  this.rows = minRows + rows;
});

/*new text post text input auto-expand*/
$(document)
.one('focus', '#textAreaPost', function() {
  var savedValue = this.value;
  this.value = '';
  this.baseScrollHeight = this.scrollHeight;
  this.value = savedValue;
})
.on('input', '#textAreaPost', function() {
  var minRows = this.getAttribute('data-min-rows') | 0, rows;
  this.rows = minRows;
  rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 20); // 20 for rows="1" data-min-rows="1" without issues
  this.rows = minRows + rows + 2; // plus 2 rows to avoid issues
});

/*new text post text input auto-expand*/
$(document)
.one('focus', '#quoteSourceInput', function() {
  var savedValue = this.value;
  this.value = '';
  this.baseScrollHeight = this.scrollHeight;
  this.value = savedValue;
})
.on('input', '#quoteSourceInput', function() {
  var minRows = this.getAttribute('data-min-rows') | 0, rows;
  this.rows = minRows;
  rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 20); // 20 for rows="1" data-min-rows="1" without issues
  this.rows = minRows + rows + 2; // plus 2 rows to avoid issues
});

/*hide and show quote placeholder and quotation mark*/
$(document)
.on('input', '#quoteInput', function() {
	var quoteValue = document.getElementById("quoteInput").innerHTML;
	
	if(quoteValue) {
		document.getElementById("quotePlaceholder").style.display = "none"; // hide quote placeholer
		document.getElementById("openQuote").style.display = "inline"; // show left quote
		document.getElementById("closeQuote").style.display = "inline";  // show right quote
	}	
})
.on('keyup', function(event) {
	var quoteValue = document.getElementById("quoteInput");
  var key = event.keyCode || event.charCode;

  /*when backspace || delete key is pressed*/
  if(key == 8 || key == 46) {
  	// when #quoteInput is empty && has only one line && caret position is 0
  	if($('#quoteInput').text().trim().length == 0 && $("br", "#quoteInput").length == 0 && getCaretPosition(quoteValue) == 0) {
  		document.getElementById("quotePlaceholder").style.display = "block"; // show quote placeholer
  		document.getElementById("openQuote").style.display = "none"; // hide left quote
  		document.getElementById("closeQuote").style.display = "none"; // hide right quote
  	}
  }
  
  /*clear <br type=_moz> when is created after backspace || enter || delete key pressed*/
  if(key == 8 || key == 13 || key == 46) {
  	var inputs = document.getElementsByTagName('br');

  	for(var i = 0; i < inputs.length; i++) {
      if(inputs[i].getAttribute("type") == '_moz') {
      	inputs[i].remove();
      	
      	var el = document.getElementById("quoteSourceInput");
      	var range = document.createRange();
      	var sel = window.getSelection();
      	range.setStart(el.childNodes[0], 0);
      	range.collapse(true);
      	sel.removeAllRanges();
      	sel.addRange(range);
      }
  	}
  }
});

/*get caret position in contentEditable div*/
function getCaretPosition(editableDiv) {
  var caretPos = 0,
    sel, range;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);
      if (range.commonAncestorContainer.parentNode == editableDiv) {
        caretPos = range.endOffset;
      }
    }
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    if (range.parentElement() == editableDiv) {
      var tempEl = document.createElement("span");
      editableDiv.insertBefore(tempEl, editableDiv.firstChild);
      var tempRange = range.duplicate();
      tempRange.moveToElementText(tempEl);
      tempRange.setEndPoint("EndToEnd", range);
      caretPos = tempRange.text.length;
    }
  }
  return caretPos;
}

/*focus when click on the the quote input area*/
function focusQuoteInput() {
	$('#quoteInput').focus();
}

/*preview photos selected by user*/
function handlePhotoFiles(files) {
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var imageType = /^image\//;
    
    if (!imageType.test(file.type)) {
      continue;
    }
    
    var img = document.createElement("img");
    img.classList.add("img-responsive");
    img.id = "photoPreview"
    img.file = file;
    document.getElementById("newPhotoUploadThumbnail").appendChild(img);
    
    /*using FileReader to display the image content*/
    var reader = new FileReader(); // asynchronously read the contents of files
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(file);
  }
  
  displayFormAfterPhotosUpload();
  document.getElementById("photoCaption").focus();
}

/*validate and preview photos from web url*/
function validatePhotoURL() {
	var img = new Image();
  img.onload = function() {
  	img.classList.add("img-responsive");
  	document.getElementById("newPhotoUploadThumbnail").appendChild(img);
    
    var reader = new FileReader(); // asynchronously read the contents of files
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
//    reader.readAsDataURL(file);
    
    displayFormAfterPhotoURL();
    document.getElementById("photoCaption").focus();
  };
  
  img.onerror = function() {
//  	alert('Image onload=' + false);
  };
  img.src = document.getElementById("urlPhotoUploadInput").value;
}

/*validate and preview another photo from web url*/
function validateAnotherPhotoURL() {
	var img = new Image();
  img.onload = function() {
  	img.classList.add("img-responsive");
  	document.getElementById("newPhotoUploadThumbnail").appendChild(img);
    
    var reader = new FileReader(); // asynchronously read the contents of files
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
//  reader.readAsDataURL(file);
    
    displayAgainAddAnotherPhotoFromWebButton();
    document.getElementById("photoCaption").focus();
  };
  
  img.onerror = function() {
//	alert('Image onload=' + false);
  };
  img.src = document.getElementById("addAnotherPhotoFromWebInput").value;
}

/*display photo post caption and tag form after photos selected*/
function displayFormAfterPhotosUpload() {
	document.getElementById("addAnotherPhotoButton").style.display = "block"; // show add another photo button
	document.getElementById("photoCaption").style.display = "block";
	document.getElementById("photoTag").style.display = "block";
	document.getElementById("newPhotoUploadPanel").style.display = "none"; // hide the normal photo upload panel
}

/*display photo post caption and tag form after add photo from web*/
function displayFormAfterPhotoURL() {
	document.getElementById("addAnotherPhotoFromWebButton").style.display = "block"; // show add another photo from web button
	document.getElementById("photoCaption").style.display = "block";
	document.getElementById("photoTag").style.display = "block";
	document.getElementById("urlPhotoUploadPanel").style.display = "none"; // hide the normal add photo from web panel
}

function displayPhotoURLInput() {
	document.getElementById("addAnotherPhotoFromWebButton").style.display = "none";
	document.getElementById("addAnotherPhotoFromWebDiv").style.display = "block";
  
	$("#addAnotherPhotoFromWebDiv").find("#addAnotherPhotoFromWebInput").focus();
}

function displayAgainAddAnotherPhotoFromWebButton() {
	document.getElementById("addAnotherPhotoFromWebButton").style.display = "block"; // show add another photo from web button
	document.getElementById("addAnotherPhotoFromWebDiv").style.display = "none";
}

/*photo upload using drag and drop $("#modalFade").on("shown.bs.modal", function()*/
$(document).ready(function() {
/*$("#modalFade").on("shown.bs.modal", function() {*/
	var dropboxPhotoUploadColumn;
	var dropboxNewPhotoUploadThumbnail;
	
	if(document.getElementById("photoUploadColumn") != null) {
		dropboxPhotoUploadColumn = document.getElementById("photoUploadColumn");
		dropboxPhotoUploadColumn.addEventListener("dragenter", dragenter, false);
		dropboxPhotoUploadColumn.addEventListener("dragover", dragover, false);
		dropboxPhotoUploadColumn.addEventListener("drop", drop, false);
	}
	else if (document.getElementById("newPhotoUploadThumbnail") != null) {
		dropboxNewPhotoUploadThumbnail = document.getElementById("newPhotoUploadThumbnail");
		dropboxNewPhotoUploadThumbnail.addEventListener("dragenter", dragenter, false);
		dropboxNewPhotoUploadThumbnail.addEventListener("dragover", dragover, false);
		dropboxNewPhotoUploadThumbnail.addEventListener("drop", drop, false);		
	}
	
	function dragenter(e) {
	  e.stopPropagation();
	  e.preventDefault();
	}

	function dragover(e) {
	  e.stopPropagation();
	  e.preventDefault();
	}
	
	function drop(e) {
	  e.stopPropagation();
	  e.preventDefault();

	  var dt = e.dataTransfer;
	  var files = dt.files;

	  handlePhotoFiles(files);
	}
});

/*show url photo upload panel and hide the normal photo upload panel*/
function photoUrlPanelDisplay() {
	document.getElementById("newPhotoUploadPanel").style.display = "none";
	document.getElementById("urlPhotoUploadPanel").style.display = "block";
	document.getElementById("urlPhotoUploadInput").focus();
}

/*
function addNewPost() {
	var table = document.getElementById("bodyPost");	
	var row1 = table.insertRow(0);
	var row2 = table.insertRow(1);
	var row3 = table.insertRow(2);		
	var cell1 = row1.insertCell(0);
	var cell2 = row2.insertCell(0);
	var cell3 = row3.insertCell(0);
	
	cell1.innerHTML = "<h1>" + $('#textTitle').val() + "</h1><br>";
	cell2.innerHTML = "<font size=\"4\">" + $('#textAreaPost').val() + "</font>";
	cell3.innerHTML = "<br><font size=\"2\">" + "#"+ $('#textTag').val() + "</font>";
	document.getElementById("textForm").reset();
}
*/

function addNewTextPost() {
	var divTextPanel = document.createElement("div");
	var divTextPanelHeading = document.createElement("div");
	var divTextPanelTitle = document.createElement("div");
	var divTextPanelBody = document.createElement("div");
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
	//aGlyphiconSend.setAttribute('href', '');
	//aGlyphiconRetweet.setAttribute('href', '');
	spanGlyphiconCog.setAttribute('data-toggle', 'dropdown');
	//aDropdownMenuEdit.setAttribute('href', '');
	//aDropdownMenuDelete.setAttribute('href', '');
	spanGlyphiconSend.setAttribute('Title', 'Share');
	spanGlyphiconRetweet.setAttribute('Title', 'Reblog');
	spanGlyphiconCog.setAttribute('Title', 'Options');
	
	aTextPanelTitle.innerHTML = "groovypeacetimetravel";
	h1TextTitle.innerHTML = $('#textTitle').val();
	divTextPanelBody.innerHTML = $('#textAreaPost').val() + "<br><br>";
	aTextTag.innerHTML = "#" + $('#textTag').val();
	aDropdownMenuEdit.innerHTML = "Edit";
	aDropdownMenuDelete.innerHTML = "Delete";
	
	divTextPanelHeading.appendChild(aTextPanelTitle);
	divTextPanelTitle.appendChild(h1TextTitle);
	divTextPanelBody.appendChild(aTextTag);
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
}

function addNewQuotePost() {
	var divQuotePanel = document.createElement("div");
	var divQuotePanelHeading = document.createElement("div");
	var divQuotePanelBody = document.createElement("div");
	var divQuotePanelFooter = document.createElement("div");
	var divQuotePanelFooterDropdown = document.createElement("div");
	var aQuotePanelTitle = document.createElement("a");
	var blockQuote = document.createElement("blockquote");
	var pQuote = document.createElement("p");
	var footerQuote = document.createElement("footer");
	var aQuoteTag = document.createElement("a");
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
	
	divQuotePanel.setAttribute('class', 'panel panel-default');
	divQuotePanelHeading.setAttribute('class', 'panel-heading');
	divQuotePanelBody.setAttribute('class', 'panel-body');
	divQuotePanelFooter.setAttribute('class', 'panel-footer');
	divQuotePanelFooterDropdown.setAttribute('class', 'dropdown');
	aQuotePanelTitle.setAttribute('class', 'panel-title');
	spanGlyphiconSend.setAttribute('class', 'glyphicon glyphicon-send');
	spanGlyphiconRetweet.setAttribute('class', 'glyphicon glyphicon-retweet');
	spanGlyphiconCog.setAttribute('class', 'glyphicon glyphicon-cog dropdown-toggle');
	ulDropdownMenu.setAttribute('class', 'dropdown-menu dropdown-menu-right');	
	divQuotePanelBody.setAttribute('id', 'quotePostBody');
	spanGlyphiconCog.setAttribute('data-toggle', 'dropdown');
	spanGlyphiconSend.setAttribute('Title', 'Share');
	spanGlyphiconRetweet.setAttribute('Title', 'Reblog');
	spanGlyphiconCog.setAttribute('Title', 'Options');
	
	aQuotePanelTitle.innerHTML = "groovypeacetimetravel";
	pQuote.innerHTML = $('#quoteInput').html();
	footerQuote.innerHTML = $('#quoteSourceInput').val();
	aQuoteTag.innerHTML = "#" + $('#quoteTag').val();
	aDropdownMenuEdit.innerHTML = "Edit";
	aDropdownMenuDelete.innerHTML = "Delete";
	
	divQuotePanelHeading.appendChild(aQuotePanelTitle);	
	blockQuote.appendChild(pQuote);
	blockQuote.appendChild(footerQuote);
	divQuotePanelBody.appendChild(blockQuote);
	divQuotePanelBody.appendChild(aQuoteTag);liDropdownMenuEdit.appendChild(aDropdownMenuEdit);
	liDropdownMenuDelete.appendChild(aDropdownMenuDelete);
	ulDropdownMenu.appendChild(liDropdownMenuEdit);
	ulDropdownMenu.appendChild(liDropdownMenuDelete);
	aGlyphiconSend.appendChild(spanGlyphiconSend);
	aGlyphiconRetweet.appendChild(spanGlyphiconRetweet);
	divQuotePanelFooterDropdown.appendChild(aGlyphiconSend);
	divQuotePanelFooterDropdown.appendChild(aGlyphiconRetweet);
	divQuotePanelFooterDropdown.appendChild(spanGlyphiconCog);
	divQuotePanelFooterDropdown.appendChild(ulDropdownMenu);
	divQuotePanelFooter.appendChild(divQuotePanelFooterDropdown);
	divQuotePanel.appendChild(divQuotePanelHeading);
	divQuotePanel.appendChild(divQuotePanelBody);
	divQuotePanel.appendChild(divQuotePanelFooter);
	
	var postColumnList = document.getElementById("postColumn");
	postColumnList.insertBefore(divQuotePanel, postColumnList.childNodes[0]);
}

function addNewPhotoPost() {
	var divPhotoPanel = document.createElement("div");
	var divPhotoPanelHeading = document.createElement("div");
	var divPhotoImgPanelBody = document.createElement("div");
	var divPhotoTextPanelBody = document.createElement("div");
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
	imgPhotoResponsive.setAttribute('id', 'imgResponsive');
	spanGlyphiconCog.setAttribute('data-toggle', 'dropdown');
	imgPhotoResponsive.setAttribute('src', document.getElementById("urlPhotoUploadInput").value);
	spanGlyphiconSend.setAttribute('Title', 'Share');
	spanGlyphiconRetweet.setAttribute('Title', 'Reblog');
	spanGlyphiconCog.setAttribute('Title', 'Options');
	
	aPhotoPanelTitle.innerHTML = "groovypeacetimetravel";
	divPhotoTextPanelBody.innerHTML = $('#photoCaption').val() + "<br><br>";
	aPhotoTag.innerHTML = "#" + $('#photoTag').val();
	aDropdownMenuEdit.innerHTML = "Edit";
	aDropdownMenuDelete.innerHTML = "Delete";
	
	divPhotoPanelHeading.appendChild(aPhotoPanelTitle);
	divPhotoImgPanelBody.appendChild(imgPhotoResponsive);	
	divPhotoTextPanelBody.appendChild(aPhotoTag);
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

/* Text Button Modal */
function textPostModal() {
	var textPost = [
		'<div class="modal-content">',
		'	<div class="panel-heading" id="newPostPanelHead">',
		'    <a class="panel-title" id="newPostPanelHeadTitle">groovypeacetimetravel</a>',
		'    <span class="glyphicon glyphicon-cog pull-right"></span>',
		'  </div>',
		'  <div class="modal-body">',
		'    <form role="form">',
		'        <textarea class="form-control" id="textTitle" placeholder="Title" rows="1" data-min-rows="1"></textarea>',
		'        <textarea class="form-control" id="textAreaPost" placeholder="Your text here" rows="1" data-min-rows="1"></textarea>',
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

/* Quote Button Modal */
function quotePostModal() {
	var quotePost = [
		'<div class="modal-content">',
		'	<div class="panel-heading" id="newPostPanelHead">',
		'    <a class="panel-title" id="newPostPanelHeadTitle">groovypeacetimetravel</a>',
		'    <span class="glyphicon glyphicon-cog pull-right"></span>',
		'  </div>',
		'  <div class="modal-body" id="newQuoteModalBody">',
		'    <form role="form">',
	  '    	<div id="openQuote">“</div>',
	  '    	<div id="quoteInputDiv" onclick="focusQuoteInput()">',
	  '      	<span id="quoteInput" onclick="" contenteditable="true"></span>',
		'				<div id="closeQuote">”</div>',
	  '    	</div>',
		'      <div id="quotePlaceholder" onclick="focusQuoteInput()">“Quote”</div>',									      
	  '      <div id="quoteSourceDiv">',
	  '      	<textarea class="form-control" id="quoteSourceInput" placeholder="Source" rows="1" data-min-rows="1"></textarea>',
	  '    	</div>',
	  '      <input class="form-control" id="quoteTag" placeholder="#tags">',
		'    </form>',
		'  </div>',
	  '	<div class="modal-footer" id="newPostPanelFooter">',
	  '	  <button class="btn btn-default pull-left" data-dismiss="modal">Close</button>',
	  '	  <div class="btn-group">',
	  '	    <button class="btn btn-primary" data-dismiss="modal" onclick="addNewQuotePost()">Post</button>',
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
		
	document.getElementById("modalDialog").innerHTML = quotePost;
	
  $("#modalFade").on("shown.bs.modal", function(){
    $(this).find('#quoteInput').focus();
  });
}

/* Photo Button Modal */
function photoPostModal() {
	var photoPost = [
		'<div class="modal-content">',
	  '	<div class="panel-heading" id="newPostPanelHead">',
	  ' 	 <a class="panel-title" id="newPostPanelHeadTitle">groovypeacetimetravel</a>',
	  ' 	 <span class="glyphicon glyphicon-cog pull-right"></span>',
	  '	</div>',
	  '	<div class="modal-body" id="newPhotoPostModalBody">',
	  '	  <form role="form">',
	  '	    <div class="container-fluid">',
	  '	      <input id="photoFileInput" type="file" accept="image/*" multiple="multiple" onchange="handlePhotoFiles(this.files)" />',
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
	  '	          <input id="urlPhotoUploadInput" oninput="validatePhotoURL()" placeholder="Paste a URL"></input>',
	  '	          <!-- <textarea class="form-control" id="urlPhotoUploadInput" rows="1" data-min-rows="1" oninput="validatePhotoURL()" placeholder="Paste a URL"></textarea> -->',
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
	  '	        <!-- <textarea class="form-control" id="addAnotherPhotoFromWebInput" rows="1" data-min-rows="1" oninput="validateAnotherPhotoURL()" placeholder="Paste a URL"></textarea> -->',
	  '	      </div>',
	  '	      <div class="row text-center" id="addAgainAnotherPhotoFromWebButton" onclick=displayPhotoURLInput()>',
	  '	        <i class="glyphicon glyphicon-globe" id="addAnotherPhotoFromWebIcon"></i> Add another',
	  '	      </div>',
	  '	      <textarea class="form-control" id="photoCaption" rows="1" data-min-rows="1" placeholder="Add a caption, if you like"></textarea>',
	  '	      <input class="form-control" id="photoTag" name="tags" placeholder="#tags" type="text" />',
	  '	    </div>',
	  '	  </form>',
	  '	</div>',
	  '	<div class="modal-footer" id="newPostPanelFooter">',
	  '	  <button class="btn btn-default pull-left" data-dismiss="modal">Close</button>',
	  '	  <div class="btn-group">',
	  '	    <button class="btn btn-primary" data-dismiss="modal" onclick="addNewPhotoPost()">Post</button>',
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