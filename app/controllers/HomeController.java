package controllers;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import javax.inject.Inject;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;

import com.fasterxml.jackson.databind.node.ArrayNode;

import models.PhotoPost;
import models.TextPost;
import models.WebPhotoPost;
import play.data.DynamicForm;
import play.mvc.*;
import play.mvc.Http.MultipartFormData;
import play.mvc.Http.MultipartFormData.FilePart;
import views.html.*;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class HomeController extends Controller {

    /**
     * An action that renders an HTML page with a welcome message.
     * The configuration in the <code>routes</code> file means that
     * this method will be called when the application receives a
     * <code>GET</code> request with a path of <code>/</code>.
     */
		private final play.data.FormFactory formFactory;
	
		@Inject
		public HomeController(play.data.FormFactory formFactory) {
			this.formFactory = formFactory;
		}
	
    public Result index() {
        return ok(index.render("Your new application is ready."));
    }

  	public Result loadUpData() {
  		// find last 10 post
  		List<TextPost> res = TextPost.find.orderBy().desc("id").setMaxRows(10).findList();      
  		ArrayNode resJson = play.libs.Json.newArray();
  		
  		for(TextPost p: res) {
  		  resJson.add(play.libs.Json.toJson(p));	
  		}
  		return ok (resJson);		
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
    
  	public Result textPost() {  	
  		DynamicForm requestData = formFactory.form().bindFromRequest();
  		String title = requestData.get("title");
  		String text = requestData.get("text");
  		String tag = requestData.get("tag");
  		
  		// save post
  		TextPost post = new TextPost();
  		
  		post.title = title;
  		post.bodyText = text;
  		post.tagText = tag;
  		post.creationDate = new Date();
  		post.save();
  		
  		// find last 10 post
  		List<TextPost> res = TextPost.find.orderBy().desc("id").setMaxRows(10).findList();
      
  		ArrayNode resJson = play.libs.Json.newArray();
  		
  		for(TextPost p: res) {
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
  		String fileName, saveDirectory;
  		
  		if (picture != null) {  	    	
        saveDirectory = "public/images/upload/";
  			fileName = picture.getFilename();
        File file = picture.getFile();  
        
        PhotoPost post = new PhotoPost();
        post.photoSaveDirectory = saveDirectory;
    		post.photoCaption = caption;
    		post.photoTag = tag;
    		post.creationDate = new Date();
    		post.imageFileName = fileName;
    		post.imageFileType = FilenameUtils.getExtension(fileName);
    		post.save();

        File destDir = new File(saveDirectory + fileName);

        try {
					FileUtils.copyFile(file, destDir);
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}	
        /*return ok("File uploaded " + fileName);*/
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
  	
  	public Result quotePost() {    	
  		DynamicForm requestData = formFactory.form().bindFromRequest();
  		String quote = requestData.get("quote");
  		String source = requestData.get("source");
  		String tag = requestData.get("tag");

  		return ok ("Quote = " + quote + "\nSource = " + source + "\nTag = " + tag);
  	}
}
