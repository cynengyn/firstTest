/*hide and show quote placeholder and quotation mark*/
$(document)
.on('input', '#quoteInput', function() {
	var quoteValue = document.getElementById("quoteInput").innerHTML;	
	
	if(quoteValue) { // quote input area is not empty
		document.getElementById("quotePlaceholder").style.display = "none"; // hide quote placeholer
		document.getElementById("openQuote").style.display = "inline"; // show left quote
		document.getElementById("closeQuote").style.display = "inline";  // show right quote
		document.getElementById("quoteInput").style.left = "24px";
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
  		document.getElementById("quotePlaceholder").style.display = "block"; // show quote placeholer
  		document.getElementById("openQuote").style.display = "none"; // hide left quote
  		document.getElementById("closeQuote").style.display = "none"; // hide right quote
  		document.getElementById("quoteInput").style.left = "0px";
  		document.getElementById("quoteInput").style.paddingLeft = "24px";
  		document.getElementById("quoteInput").style.paddingReft = "0px";
  	}
  }
});

/*remove <br type="_moz"> created when enter key is pressed*/
$(document)
.on('keyup', '#quoteSourceInput', function(event) {
  var key = event.keyCode || event.charCode;

  if(key == 13) { // enter key is pressed
  	var inputs = document.getElementsByTagName('br');
  	
  	for(var i = 0; i < inputs.length; i++) {
      if(inputs[i].getAttribute("type") == '_moz') {
      	inputs[i].removeAttribute("type");
      }
  	}
  }
});

/*get caret position in contentEditable div*/
function getCaretPosition(editableDiv) {
  var caretPos = 0, sel, range;
  
  if (window.getSelection) {
    sel = window.getSelection();
    
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);
      
      if (range.commonAncestorContainer.parentNode == editableDiv) {
        caretPos = range.endOffset;
      }
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

/*focus quote input area*/
function focusQuoteInput() {
	$('#quoteInput').focus();
}

/*remove <br type="_moz"> created when enter key is pressed*/
function removeQuoteBrMoz() {
	var inputs = document.getElementsByTagName('br');
	
	for(var i = 0; i < inputs.length; i++) {
    if(inputs[i].getAttribute("type") == '_moz') {
    	inputs[i].remove();
    }
	}
	
	//replace n number of <br> into one for css can ignore the last break line in the quote post content
	$('#quoteInput').html($('#quoteInput').html().replace(/(<br>)+/g,"<br>")); 
}

