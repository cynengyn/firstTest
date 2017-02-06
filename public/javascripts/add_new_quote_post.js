function createQuotePostElements() {	
	var divQuotePanel = document.createElement("div");
	var divQuotePanelHeading = document.createElement("div");
	var divQuotePanelBody = document.createElement("div");
	var divQuotePostTag = document.createElement("div");
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
	divQuotePostTag.setAttribute('id', 'quotePostTagDiv');
	spanGlyphiconCog.setAttribute('data-toggle', 'dropdown');
	spanGlyphiconSend.setAttribute('Title', 'Share');
	spanGlyphiconRetweet.setAttribute('Title', 'Reblog');
	spanGlyphiconCog.setAttribute('Title', 'Options');
	
	aQuotePanelTitle.innerHTML = "groovypeacetimetravel";
	aDropdownMenuEdit.innerHTML = "Edit";
	aDropdownMenuDelete.innerHTML = "Delete";
	
	divQuotePanelHeading.appendChild(aQuotePanelTitle);	
	blockQuote.appendChild(pQuote);
	blockQuote.appendChild(footerQuote);
	divQuotePanelBody.appendChild(blockQuote);
	divQuotePostTag.appendChild(aQuoteTag);
	divQuotePanelBody.appendChild(divQuotePostTag);
	liDropdownMenuEdit.appendChild(aDropdownMenuEdit);
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
	
	return {
		pQuote: pQuote,
		footerQuote: footerQuote,
		divQuotePostTag: divQuotePostTag,
		aQuoteTag: aQuoteTag
	};
}

function getQuotePostData() {
	var formData = new FormData();
	formData.append("quotePostQuote", $('#quoteInput').html());	
	formData.append("quotePostSource", $('#quoteSourceInput').html());
	formData.append("quotePostTag", $('#quoteTag').val());
	
	return formData;
}

function setQuotePostAndTag(postElements, quote, quoteSource, postTag) {
	postElements.pQuote.innerHTML = quote;
	
	if(quoteSource)
		postElements.footerQuote.innerHTML = quoteSource;
	
	if(postTag)
		postElements.aQuoteTag.innerHTML = "#" + postTag;
	else
		postElements.divQuotePostTag.setAttribute("style", "display: none;");
}

/*
	===============
	new quote modal
	===============
*/
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
	  '      	<span id="quoteInput" contenteditable="true"></span>',
		'				<div id="closeQuote">”</div>',
	  '    	</div>',
		'      <div id="quotePlaceholder" onclick="focusQuoteInput()">“Quote”</div>',									      
	  '      <div id="quoteSourceDiv">',
	  '      	<span id="quoteSourceInput" contenteditable="true"></span>',
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

function addNewQuotePost() {
	var formData = getQuotePostData();
	
	$.ajax({
    url: "/quotePost",
		type: "POST",
		data: formData, // The form with the file inputs.
		processData: false, // Using FormData, no need to process data.
    contentType: false,
	}).done(function(data) {
		for(i = data.length-1; i >= 0 ; i-- ) {
			addNewQuotePostFromServer(data[i].quotePostQuote, data[i].quotePostSource, data[i].quotePostTag);
			/*console.log("Success: Files sent!");
		  console.log(data);*/
		}
	}).fail(function() {
		console.log("An error occurred, the files couldn't be sent!");
	});
}

function addNewQuotePostFromServer(quotePostQuote, quotePostSource, quotePostTag) {
	var quotePostElements = createQuotePostElements();
	setQuotePostAndTag(quotePostElements, quotePostQuote, quotePostSource, quotePostTag);
}