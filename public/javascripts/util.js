loadUpTextPost();
loadUpPhotoPost();
loadUpWebPhotoPost();
loadUpQuotePost();
loadUpWebAudioPost();
loadUpLocalAudioPost();
loadUpLocalVideoPost();
loadUpWebVideoPost();

function loadUpTextPost() {	
	$.ajax({
		type: "GET",
//    dataType: 'json',
    url: "/loadUpTextPost",
     success: function(data) {
    	 for(i = data.length-1; i >= 0 ; i-- ) {
    		 displayTextPostFromSever(data[i].textPostTitle, data[i].textPostText, data[i].textPostTag);
    	 }
     },
     error: function(data) {
    	 console.log("error");
       console.log(data);     
     }
	});
}

function loadUpPhotoPost() {	
	$.ajax({
		type: "GET",
    url: "/loadUpLocalPhotoPost",
     success: function(data) {
    	 for(i = data.length-1; i >= 0 ; i-- ) {
    		 displayLocalPhotoPostFromServer(data[i].photoSaveDirectory, data[i].photoCaption, 
    				 data[i].photoTag, data[i].imageFileName);
    	 }
     },
     error: function(data) {
    	 console.log("error");
       console.log(data);     
     }
	});
}

function loadUpWebPhotoPost() {	
	$.ajax({
		type: "GET",
    url: "/loadUpWebPhotoPost",
     success: function(data) {
    	 for(i = data.length-1; i >= 0 ; i-- ) {
    		 displayWebPhotoPostFromServer(data[i].webPhotoUrl, data[i].webPhotoCaption, data[i].webPhotoPostTag);
    	 }
     },
     error: function(data) {
    	 console.log("error");
       console.log(data);
     }
	});
}

function loadUpQuotePost() {	
	$.ajax({
		type: "GET",
    url: "/loadUpQuotePost",
     success: function(data) {
    	 for(i = data.length-1; i >= 0 ; i-- ) {
    		 displayQuotePostFromServer(data[i].quotePostQuote, data[i].quotePostSource, data[i].quotePostTag);
    	 }
     },
     error: function(data) {
    	 console.log("error");
       console.log(data);
     }
	});
}

function loadUpWebAudioPost() {	
	$.ajax({
		type: "GET",
    url: "/loadUpWebAudioPost",
     success: function(data) {
    	 for(i = data.length-1; i >= 0 ; i-- ) {
    		 displayWebAudioPostFromServer(data[i].webAudioPostId, data[i].webAudioUrl, data[i].webAudioPostDescription, data[i].webAudioPostTag, data[i].webAudioTrack, data[i].webAudioArtist, data[i].webAudioAlbum, data[i].webAudioAlbumArtDirectory, data[i].webAudioAlbumArtFileName);
    	 }
     },
     error: function(data) {
    	 console.log("error");
       console.log(data);
     }
	});
}

function loadUpLocalAudioPost() {	
	$.ajax({
		type: "GET",
    url: "/loadUpLocalAudioPost",
     success: function(data) {
    	 for(i = data.length-1; i >= 0 ; i-- ) {
    		 displayLocalAudioPostFromServer(data[i].localAudioPostId, data[i].localAudioSaveDirectory, data[i].localAudioFileName, data[i].localAudioPostDescription, data[i].localAudioPostTag, data[i].localAudioTrack, data[i].localAudioArtist, data[i].localAudioAlbum, data[i].localAudioAlbumArtSaveDirectory, data[i].localAudioAlbumArtFileName);
    	 }
     },
     error: function(data) {
    	 console.log("error");
       console.log(data);
     }
	});
}

function loadUpLocalVideoPost() {	
	$.ajax({
		type: "GET",
    url: "/loadUpLocalVideoPost",
     success: function(data) {
    	 for(i = data.length-1; i >= 0 ; i-- ) {
    		 displayLocalVideoPostFromServer(data[i].localVideoSaveDirectory, data[i].localVideoPostCaption, data[i].localVideoPostTag, data[i].localVideoFileName);
    	 }
     },
     error: function(data) {
    	 console.log("error");
       console.log(data);
     }
	});
}

function loadUpWebVideoPost() {	
	$.ajax({
		type: "GET",
    url: "/loadUpWebVideoPost",
     success: function(data) {
    	 for(i = data.length-1; i >= 0 ; i-- ) {
    		 displayWebVideoPostFromServer(data[i].webVideoUrlType, data[i].webVideoUrlId, data[i].webVideoPostCaption, data[i].webVideoPostTag);
    	 }
     },
     error: function(data) {
    	 console.log("error");
       console.log(data);
     }
	});
}

/**
 * Search bar icon background changes to white when focus and changes to normal color when blur.
 */
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

/**
 * Get file extension.
 * 
 * @method getFileExtension
 * @param fileName {String} File name.
 * @return File extension.
 */
function getFileExtension(fileName) {
  var matches = fileName && fileName.match(/\.([^.]+)$/);
  if (matches) {
    return matches[1].toLowerCase();
  }
  return '';
}