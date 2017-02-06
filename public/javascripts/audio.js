/*remove <br type="_moz"> type attribute created when enter key is pressed*/
$(document).on('keyup', '#audioDescription', function(event) {
  var key = event.keyCode || event.charCode;

  if(key == 13) { // enter key is pressed
  	var inputs = document.getElementsByTagName('br');
  	
  	for(var i = 0; i < inputs.length; i++) { // remove <br type="_moz"> type attribute
      if(inputs[i].getAttribute("type") == '_moz') {
      	inputs[i].removeAttribute("type");
      }
  	}
  }
  else if(key == 8 || key == 46) { // backspace || delete key is pressed
  	// clear the last <br> left in text area input when is empty to show the placeholder with css 
	  if($("#audioDescription").text() == '') {
	      $("#audioDescription").empty();
	  }
  }
});

function createAudioElement() {
	var audio = document.createElement('audio');
	audio.setAttribute('id', 'urlAudio');
	
	return audio;
}

function createAudioPreview(type, audio) {
	var spanRemoveButton = document.createElement("span");
	var divAudioGroup = document.createElement("div");
	
	spanRemoveButton.setAttribute('id', 'removeAudioButton');
	spanRemoveButton.innerHTML = "&times;";
	divAudioGroup.setAttribute('id', 'removeAudioGroup');

	divAudioGroup.appendChild(spanRemoveButton);
	divAudioGroup.appendChild(audio);
	document.getElementById("newAudioUploadPreview").appendChild(divAudioGroup);
	
	displayFormAfterAudioSelected(type);
	initilizeUrlAudioPreviewControl(audio);
	
	if(type == "Local") {
		spanRemoveButton.setAttribute('onclick', 'removeAudioPreview("Local")');
		document.getElementById("audioPostButton").setAttribute("onclick", "addNewLocalAudioPost();");
	}
	else if(type == "Web") {
		spanRemoveButton.setAttribute('onclick', 'removeAudioPreview("Web")');
		document.getElementById("audioPostButton").setAttribute("onclick", "addNewWebAudioPost();");
	}
}

/*display audio post description and tag form after audio is selected*/
function displayFormAfterAudioSelected(displayType) {
	document.getElementById("audioDescription").style.display = "block";
	document.getElementById("audioTag").style.display = "block";
	document.getElementById("audioUrlInputGroup").style.display = "none";
	document.getElementById("newAudioUploadPreview").style.display = "block";
  document.getElementById("audioDescription").focus();
  
  if(displayType == "Local") {
  	document.getElementById("audioPermission").style.display = "block";
  	document.getElementById("audioDescription").style.marginTop = "40px";
  }
}

/*clear and hide all necessary fields when audio url is removed*/
function removeAudioPreview(removeType) {
	document.getElementById("audioUrlInputGroup").style.display = "table";
	document.getElementById("newAudioUploadPreview").style.display = "none";
	document.getElementById("removeAudioGroup").remove();
	document.getElementById("audioDescription").style.display = "none";
	document.getElementById("audioTag").style.display = "none";
	document.getElementById("audioDescription").innerHTML = "";
	document.getElementById("audioTag").value = "";
	document.getElementById("playProgress").style.width = "";
	document.getElementById("playHead").style.left = "";
  document.getElementById("audioAlbumArtPreview").style.display = "none";
  document.getElementById("selectAudioAlbumArtDiv").style.display = "flex";
  document.getElementById("audioTrackInput").value = "";
  document.getElementById("audioArtistInput").value = "";
  document.getElementById("audioAlbumInput").value = "";

	if(document.getElementById("albumArtPreview"))
		document.getElementById("albumArtPreview").remove();
  
  if(removeType == "Local") {
    document.getElementById("audioPermission").style.display = "none";
  }  
  else if(removeType == "Web") {
  	document.getElementById("urlAudioUploadInput").value = "";
  }
}