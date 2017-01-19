package controllers;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.imageio.ImageIO;
import javax.inject.Inject;

import org.apache.commons.io.FilenameUtils;

import com.fasterxml.jackson.databind.node.ArrayNode;

import models.PhotoPost;
import models.WebPhotoPost;
import play.data.DynamicForm;
import play.mvc.*;
import play.mvc.Http.MultipartFormData;
import play.mvc.Http.MultipartFormData.FilePart;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class PhotoPostController extends Controller {
	
		private final play.data.FormFactory formFactory;
	
		@Inject
		public PhotoPostController(play.data.FormFactory formFactory) {
			this.formFactory = formFactory;
		}
  	
  	public Result loadUpPhotoPost() {
  		// find last 10 post
  		List<PhotoPost> res = PhotoPost.find.orderBy().desc("id").setMaxRows(10).findList();      
  		ArrayNode resJson = play.libs.Json.newArray();
  		
  		for(PhotoPost p: res) {
  		  resJson.add(play.libs.Json.toJson(p));	
  		}
  		return ok (resJson);		
  	}
  	
  	public Result loadUpWebPhotoPost() {
  		// find last 10 post
  		List<WebPhotoPost> res = WebPhotoPost.find.orderBy().desc("web_photo_post_id").setMaxRows(10).findList();      
  		ArrayNode resJson = play.libs.Json.newArray();
  		
  		for(WebPhotoPost p: res) {
  		  resJson.add(play.libs.Json.toJson(p));	
  		}
  		return ok (resJson);		
  	}

  	public Result localPhoto() {
  		DynamicForm requestData = formFactory.form().bindFromRequest();
  		MultipartFormData<File> body = request().body().asMultipartFormData();
  		FilePart<File> picture = body.getFile("photoFileInput");  		
  		String caption = requestData.get("photoCaption");
  		String tag = requestData.get("photoTag");  		
  		String fileName, saveDirectory, newFileName;
  		
  		if (picture != null) {  	    	
        saveDirectory = "public/images/upload/";
  			fileName = picture.getFilename();
        File file = picture.getFile();
        // generate a random file name
        newFileName = UUID.randomUUID().toString().replaceAll("-", "") + new SimpleDateFormat("yyyyMMddHHmmssSSS'.'").format(new Date()) + FilenameUtils.getExtension(fileName);
        
        PhotoPost post = new PhotoPost();
        post.photoSaveDirectory = saveDirectory;
    		post.photoCaption = caption;
    		post.photoTag = tag;
    		post.creationDate = new Date();
    		post.imageFileName = newFileName;
    		post.imageOriginalFileName = fileName;
    		post.imageFileType = FilenameUtils.getExtension(fileName);
    		post.save();

        try {
        	// read image in and write it back, metadata isn't read
					BufferedImage image = ImageIO.read(file);
					ImageIO.write(image, post.imageFileType, new File(saveDirectory + post.imageFileName)); // new image without metadata
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}	
        /*System.out.println("Success");*/
  		}

  		List<PhotoPost> res = PhotoPost.find.orderBy().desc("id").setMaxRows(10).findList();
      
  		ArrayNode resJson = play.libs.Json.newArray();
  		
  		for(PhotoPost p: res) {
  		  resJson.add(play.libs.Json.toJson(p));	
  		}

  		return ok (resJson);
		}
  	
  	public Result webPhoto() {
  		DynamicForm requestData = formFactory.form().bindFromRequest();
  		String url = requestData.get("webPhotoUrl");
  		String caption = requestData.get("webPhotoCaption");
  		String tag = requestData.get("webPhotoTag");  		
  		String fileName = url.substring(url.lastIndexOf('/')+1);
      
      WebPhotoPost post = new WebPhotoPost();
      post.webPhotoUrl = url;
  		post.webPhotoCaption = caption;
  		post.webPhotoPostTag = tag;
  		post.webPhotoPostCreationDate = new Date();
  		post.webPhotoImageFileName = fileName;
  		post.webPhotoImageFileType = FilenameUtils.getExtension(fileName);
  		post.save();  		

  		List<WebPhotoPost> res = WebPhotoPost.find.orderBy().desc("web_photo_post_id").setMaxRows(10).findList();
      
  		ArrayNode resJson = play.libs.Json.newArray();
  		
  		for(WebPhotoPost p: res) {
  		  resJson.add(play.libs.Json.toJson(p));	
  		}

  		return ok (resJson);
		}
}