/**
 * Select photo image file to upload using drag and drop.
 */
$(document).ready(function() {
	$("#modalFade").on("shown.bs.modal", function() {
		var dropboxPhotoUploadColumn;
		var dropboxNewPhotoUploadThumbnail;
		
		if(document.getElementById("photoUploadColumn") != null) {
			dropboxPhotoUploadColumn = document.getElementById("photoUploadColumn");
			dropboxPhotoUploadColumn.addEventListener("dragenter", dragenter, false);
			dropboxPhotoUploadColumn.addEventListener("dragover", dragover, false);
			dropboxPhotoUploadColumn.addEventListener("drop", drop, false);
		}
		else if (document.getElementById("newPhotoUploadThumbnail") != null) {
			dropboxNewPhotoUploadThumbnail = document.getElementById("newPhotoUploadThumbnail");
			dropboxNewPhotoUploadThumbnail.addEventListener("dragenter", dragenter, false);
			dropboxNewPhotoUploadThumbnail.addEventListener("dragover", dragover, false);
			dropboxNewPhotoUploadThumbnail.addEventListener("drop", drop, false);		
		}
		
		function dragenter(e) {
		  e.stopPropagation();
		  e.preventDefault();
		}
	
		function dragover(e) {
		  e.stopPropagation();
		  e.preventDefault();
		}
		
		function drop(e) {
		  e.stopPropagation();
		  e.preventDefault();
	
		  var dt = e.dataTransfer;
		  var files = dt.files;
	
		  handlePhotoFiles(files);
		}
	})
});