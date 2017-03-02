/**
 * Functions for Quote Post HTML Elements.
 * 
 * @class Quote
*/

/**
 * Hide and show quote placeholder and quotation mark.
 */
$(document).on('input', '#quoteInput', function() {
	var quoteValue = document.getElementById("quoteInput").innerHTML;	
	
	if(quoteValue) { // quote input area is not empty
		document.getElementById("quotePlaceholder").style.display = "none"; // hide quote placeholder
		document.getElementById("openQuote").style.display = "inline"; // show left quote
		document.getElementById("closeQuote").style.display = "inline";  // show right quote
		document.getElementById("quoteInput").style.left = "20px";
		document.getElementById("quoteInput").style.paddingLeft = "0px";
		document.getElementById("quoteInput").style.paddingRight = "22px";
	}	
})
.on('keyup', '#quoteInput', function(event) {
	var quoteValue = document.getElementById("quoteInput");
  var key = event.keyCode || event.charCode;

  if(key == 8 || key == 46) { // backspace || delete key is pressed
  	// #quoteInput is empty && has only one line && caret position is 0
  	if($('#quoteInput').text().trim().length == 0 && $("br", "#quoteInput").length == 0 && getCaretPosition(quoteValue) == 0) {
  		document.getElementById("quotePlaceholder").style.display = "block"; // show quote placeholder
  		document.getElementById("openQuote").style.display = "none"; // hide left quote
  		document.getElementById("closeQuote").style.display = "none"; // hide right quote
  		document.getElementById("quoteInput").style.left = "0px";
  		document.getElementById("quoteInput").style.paddingLeft = "20px";
  		document.getElementById("quoteInput").style.paddingRight = "0px";
  	}
  }
});

/**
 * Remove <br type="_moz"> type attribute created in quoteSourceInput when enter key is pressed.
 */
$(document).on('keyup', '#quoteInput', function(event) {
  var key = event.keyCode || event.charCode;

  if(key == 13) { // enter key is pressed  	
  	var quoteInput = document.getElementById("quoteInput");
  	var quoteInputBr = quoteInput.getElementsByTagName('br');
  	
  	for(var i = 0; i < quoteInputBr.length; i++) {
      if(quoteInputBr[i].getAttribute("type") == '_moz') {
      	quoteInputBr[i].removeAttribute("type");
      }
  	}
  }
})
.on('keyup', '#quoteSourceInput', function(event) {
  var key = event.keyCode || event.charCode;

  if(key == 13) { // enter key is pressed
  	var quoteSourceInput = document.getElementById("quoteSourceInput");
  	var quoteSourceInputBr = quoteSourceInput.getElementsByTagName('br');
  	
  	for(var i = 0; i < quoteSourceInputBr.length; i++) {
      if(quoteSourceInputBr[i].getAttribute("type") == '_moz') {
      	quoteSourceInputBr[i].removeAttribute("type");
      }
  	}
  } 
  else if(key == 8 || key == 46) { // backspace || delete key is pressed
  	// clear the last <br> left in quoteSourceInput when is empty to show the placeholder with css 
	  if($("#quoteSourceInput").text() == '' && $("br", "#quoteSourceInput").length == 1) {
	      $("#quoteSourceInput").empty();
	  }
  }
});

/**
 * Focus quote input area.
 * 
 * @Method focusQuoteInput
 */
function focusQuoteInput() {
	$('#quoteInput').focus();
}

/**
 * Get caret position in contentEditable div.
 * 
 * @Method getCaretPosition
 * @Param editableDiv HTML div content editable element for quote input.
 * @return {caretPos} Caret position in editable div.
 */
function getCaretPosition(editableDiv) {
  var caretPos = 0, sel, range;
  
  if (window.getSelection) {
    sel = window.getSelection();    
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);      
      if (range.commonAncestorContainer.parentNode == editableDiv)
        caretPos = range.endOffset;
    }
  }
  else if (document.selection && document.selection.createRange) {
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