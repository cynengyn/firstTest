package controllers;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import javax.imageio.ImageIO;
import javax.inject.Inject;

import org.apache.commons.io.FilenameUtils;

import com.fasterxml.jackson.databind.node.ArrayNode;

import models.FileName;
import models.PhotoPost;
import models.WebPhotoPost;
import play.data.DynamicForm;
import play.mvc.*;
import play.mvc.Http.MultipartFormData;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class PhotoPostController extends Controller {
	
		private final play.data.FormFactory formFactory;
	  private static final String IMAGES_SAVE_DIRECTORY = "public/images/upload/";
	
		@Inject
		public PhotoPostController(play.data.FormFactory formFactory) {
			this.formFactory = formFactory;
		}
		
		public Result photoPosts(String type) {
	  	if(type == "localPhoto" && checkImageFile()) {
	  		PhotoPost post = new PhotoPost();
	  		setLocalPhotoPostObject(post);
	  		copyImageFile(post);
	  		return loadUpLocalPhotoPost();
	  	}
	  	else if(type == "webPhoto" && getWebImageUrl()) {
	  		WebPhotoPost post = new WebPhotoPost();
	  		setWebPhotoPostObject(post);	
	  		return loadUpWebPhotoPost();
	  	}
			return null;
	  }
  	
  	public boolean checkImageFile() {
    	if(getImageFile() != null)
    		return true;
    	else
    		return false;
    }
  	
  	public void copyImageFile(PhotoPost post) {
    	if(checkImageFile()) {
    		setLocalImageInfo(post);    		
    		try {
        	// read image in and write it back, metadata isn't read
					BufferedImage image = ImageIO.read(getImageFile());
					ImageIO.write(image, post.imageFileType, new File(post.photoSaveDirectory + post.imageFileName)); // new image without metadata
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}	
        /*System.out.println("Success");*/
    	}
    }
  	
  	public File getImageFile() {
    	MultipartFormData <File> body = request().body().asMultipartFormData();
    	return body.getFile("photoFileInput").getFile();
    }
  	
  	public String getImageFileName() {
    	MultipartFormData <File> body = request().body().asMultipartFormData();
    	return body.getFile("photoFileInput").getFilename();
    }
  	
  	public boolean getWebImageUrl() {
    	DynamicForm requestData = formFactory.form().bindFromRequest();  	
    	if(requestData.get("webPhotoUrl") != null)
    		return true;
    	else
    		return false;
    }
  	
  	public Result loadUpLocalPhotoPost() {
  		// find last 10 post
  		List<PhotoPost> res = PhotoPost.find.orderBy().desc("creation_date").setMaxRows(10).findList();      
  		ArrayNode resJson = play.libs.Json.newArray();
  		
  		for(PhotoPost p: res) {
  		  resJson.add(play.libs.Json.toJson(p));	
  		}
  		return ok (resJson);		
  	}
  	
  	public Result loadUpWebPhotoPost() {
  		// find last 10 post
  		List<WebPhotoPost> res = WebPhotoPost.find.orderBy().desc("web_photo_post_creation_date").setMaxRows(10).findList();      
  		ArrayNode resJson = play.libs.Json.newArray();
  		
  		for(WebPhotoPost p: res) {
  		  resJson.add(play.libs.Json.toJson(p));	
  		}
  		return ok (resJson);		
  	}
  	
  	public void setLocalImageInfo(PhotoPost post) {
  		post.photoSaveDirectory = IMAGES_SAVE_DIRECTORY;
  		post.imageFileName = FileName.setRandomName(getImageFileName());
  		post.imageOriginalFileName = getImageFileName();
  		post.imageFileType = FilenameUtils.getExtension(getImageFileName());
  		post.save();
  	}
  	
  	public void setLocalPhotoPostObject(PhotoPost post) {
  		DynamicForm requestData = formFactory.form().bindFromRequest();
  		post.photoCaption = requestData.get("photoCaption");
  		post.photoTag = requestData.get("photoTag");
  		post.creationDate = new Date();
  		post.save();
  	}
  	
  	public void setWebPhotoPostObject(WebPhotoPost post) {
  		DynamicForm requestData = formFactory.form().bindFromRequest();
  		post.webPhotoUrl = requestData.get("webPhotoUrl");
  		post.webPhotoCaption = requestData.get("webPhotoCaption");
  		post.webPhotoPostTag = requestData.get("webPhotoTag");
  		post.webPhotoPostCreationDate = new Date();
  		post.webPhotoImageFileName = FileName.getWebFileName(post.webPhotoUrl);
  		post.webPhotoImageFileType = FilenameUtils.getExtension(post.webPhotoImageFileName);
  		post.save();
  	}
}