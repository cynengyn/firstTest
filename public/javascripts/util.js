loadUpData();

function loadUpData() {	
	$.ajax({
		type: "GET",
//    dataType: 'json',
    url: "/loadUpData",
     success: function(data) {
    	 for(i = data.length-1; i >= 0 ; i-- ) {
    		 addTextPostFromSever(data[i].title, data[i].bodyText, data[i].tagText, 
  				 data[i].creationDate, data[i].userName);    		 
    	 }
     },
     error: function(data) {
    	 console.log("error");
       console.log(data);     
     }
	});
}

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

function addNewTextPost() {	
	$.ajax({
		type: "POST",
//    dataType: 'json',
    data: {
    	'title': $('#textTitle').html(),
    	'text': $('#textAreaPost').html(),
    	'tag': $('#textTag').val()
    },
    url: "/textPost",
  	success: function(data) {
			for(i = data.length-1; i >= 0 ; i-- ) {
				addTextPostFromSever(data[i].title, data[i].bodyText, data[i].tagText, 
															data[i].creationDate, data[i].userName);    		 
			}
  	},
		error: function(data) {
			console.log("error");
			console.log(data);     
		}
	});	
}

function addTextPostFromSever(titleText, bodyText, tagText, creationDate, userName) {
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
	h1TextTitle.innerHTML = titleText;
	divTextPanelBody.innerHTML = bodyText + "<br>";
	aTextTag.innerHTML = "#" + tagText;
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

function addNewLocalPhotoPost() {	
	$.ajax({
		type: "POST",
//    dataType: 'json',
    data: {
    	'caption': $('#photoCaption').html(),
    	'tag': $('#photoTag').val()
    },
    url: "/localPhoto",
  	success: function(data) {
  			for(i = data.length-1; i >= 0 ; i-- ) {
  				addLocalPhotoPostFromServer(data[i].photoSaveDirectory, data[i].photoCaption, data[i].photoTag, data[i].imageFileName, data[i].imageFileType);    		 
  			}
  	},
		error: function(data) {
		 console.log("error");
		 console.log(data);     
		}
   });	
}

function addLocalPhotoPostFromServer(photoSaveDirectory, photoCaption, photoTag, imageFileName, imageFileType) {
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
	/*imgPhotoResponsive.setAttribute('src', document.getElementById("photoPreview").src);*/
	imgPhotoResponsive.setAttribute('src', photoSaveDirectory+imageFileName+imageFileType);
	spanGlyphiconSend.setAttribute('Title', 'Share');
	spanGlyphiconRetweet.setAttribute('Title', 'Reblog');
	spanGlyphiconCog.setAttribute('Title', 'Options');
	
	aPhotoPanelTitle.innerHTML = "groovypeacetimetravel";
	divPhotoTextPanelBody.innerHTML = photoCaption + "<br><br>";
	aPhotoTag.innerHTML = "#" + photoTag;
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

function addNewWebPhotoPost() {
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
	/*removeQuoteBrMoz();*/ // remove <br type="_moz"> before
	pQuote.innerHTML = $('#quoteInput').html();
	footerQuote.innerHTML = $('#quoteSourceInput').html();
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
	
	$.ajax({
    type :  "POST",
//    dataType: 'json',
    data: {
        'quote': $('#quoteInput').html(),
        'source': $('#quoteSourceInput').html(),
        'tag': $('#quoteTag').val()
    },
    url  :  "/quotePost",
     success: function(data){
    	 console.log("good");
       console.log(data);
     },
     error: function(data){
    	 console.log("error");
       console.log(data);     
     }
   });
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

/* new photo modal */
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

/* new quote modal */
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