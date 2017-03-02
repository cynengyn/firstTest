/**
 * Functions for Text Post HTML Elements.
 * 
 * @class Text
*/

/**
 * Remove <br type="_moz"> type attribute created when enter key is pressed.
 */
$(document).on('keyup', '#textTitle', function(event) {
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
	  if($("#textTitle").text() == '') {
	      $("#textTitle").empty();
	  }
  }
})
.on('keyup', '#textAreaPost', function(event) {
  var key = event.keyCode || event.charCode;

  if(key == 13) { // enter key is pressed
  	var inputs = document.getElementsByTagName('br');
  	
  	for(var i = 0; i < inputs.length; i++) {
      if(inputs[i].getAttribute("type") == '_moz') { // remove <br type="_moz"> type attribute
      	inputs[i].removeAttribute("type");
      }
  	}
  }  
  else if(key == 8 || key == 46) { // backspace || delete key is pressed
  	// clear the last <br> left in text area input when is empty to show the placeholder with css 
	  if($("#textAreaPost").text() == '') {
	      $("#textAreaPost").empty();
	  }
  }  
});