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