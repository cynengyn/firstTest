loadUpTextPost();
loadUpPhotoPost();
loadUpWebPhotoPost();
loadUpQuotePost();
loadUpWebAudioPost();
loadUpLocalAudioPost();
loadUpLocalVideoPost();

function loadUpTextPost() {	
	$.ajax({
		type: "GET",
//    dataType: 'json',
    url: "/loadUpTextPost",
     success: function(data) {
    	 for(i = data.length-1; i >= 0 ; i-- ) {
    		 addTextPostFromSever(data[i].textPostTitle, data[i].textPostText, data[i].textPostTag);
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
    url: "/loadUpPhotoPost",
     success: function(data) {
    	 for(i = data.length-1; i >= 0 ; i-- ) {
    		 addLocalPhotoPostFromServer(data[i].photoSaveDirectory, data[i].photoCaption, 
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
    		 addNewWebPhotoPostFromServer(data[i].webPhotoUrl, data[i].webPhotoCaption, data[i].webPhotoPostTag);
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
    		 addNewQuotePostFromServer(data[i].quotePostQuote, data[i].quotePostSource, data[i].quotePostTag);
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
    		 addNewWebAudioPostFromServer(data[i].webAudioPostId, data[i].webAudioUrl, data[i].webAudioPostDescription, data[i].webAudioPostTag, data[i].webAudioTrack, data[i].webAudioArtist, data[i].webAudioAlbum, data[i].webAudioAlbumArtDirectory, data[i].webAudioAlbumArtFileName);
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
    		 addNewLocalAudioPostFromServer(data[i].localAudioPostId, data[i].localAudioSaveDirectory, data[i].localAudioFileName, data[i].localAudioPostDescription, data[i].localAudioPostTag, data[i].localAudioTrack, data[i].localAudioArtist, data[i].localAudioAlbum, data[i].localAudioAlbumArtSaveDirectory, data[i].localAudioAlbumArtFileName);
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
    		 addLocalVideoPostFromServer(data[i].localVideoSaveDirectory, data[i].localVideoPostCaption, data[i].localVideoPostTag, data[i].localVideoFileName);
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