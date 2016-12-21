/*remove <br type="_moz"> created when enter key is pressed*/
/*function removeTextBrMoz() {
	var inputs = document.getElementsByTagName('br');
	
	for(var i = 0; i < inputs.length; i++) {
    if(inputs[i].getAttribute("type") == '_moz') {
    	inputs[i].remove();
    }
	}
	
	//replace n number of <br> into one for css can ignore the last break line in the quote post content
	$('#textTitle').html($('#textTitle').html().replace(/(<br>)+/g,"<br>"));
	$('#textAreaPost').html($('#textAreaPost').html().replace(/(<br>)+/g,"<br>"));
}*/

/*remove <br type="_moz"> created when enter key is pressed*/
$(document)
.on('keyup', '#textTitle', function(event) {
  var key = event.keyCode || event.charCode;

  if(key == 13) { // enter key is pressed
  	var inputs = document.getElementsByTagName('br');
  	
  	for(var i = 0; i < inputs.length; i++) {
      if(inputs[i].getAttribute("type") == '_moz') {
      	inputs[i].removeAttribute("type");
      }
  	}
  }
})
.on('keyup', '#textAreaPost', function(event) {
  var key = event.keyCode || event.charCode;

  if(key == 13) { // enter key is pressed
  	var inputs = document.getElementsByTagName('br');
  	
  	for(var i = 0; i < inputs.length; i++) {
      if(inputs[i].getAttribute("type") == '_moz') {
      	inputs[i].removeAttribute("type");
      }
  	}
  }
  
  if(key == 8) { 
	  if($("#textAreaPost").text() == '') {
	      $("#textAreaPost").empty();
	  }
  }
  
});