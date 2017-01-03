package controllers;

import java.awt.image.BufferedImage;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.net.URL;
import java.util.Date;
import java.util.List;

import javax.imageio.ImageIO;
import javax.inject.Inject;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;

import com.fasterxml.jackson.databind.node.ArrayNode;

import models.PhotoPost;
import models.TextPost;
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
  	
  	public Result photoPost() {    	
  		DynamicForm requestData = formFactory.form().bindFromRequest();
  		String caption = requestData.get("caption");
  		String tag = requestData.get("tag");
  		
  		PhotoPost post = new PhotoPost();
  		
  		post.photoCaption = caption;
  		post.photoTag = tag;
  		post.creationDate = new Date();
  		post.save();
  		
  		List<PhotoPost> res = PhotoPost.find.orderBy().desc("id").setMaxRows(10).findList();
      
  		ArrayNode resJson = play.libs.Json.newArray();
  		
  		for(PhotoPost p: res) {
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

  	public Result localPhoto() {
  		DynamicForm requestData = formFactory.form().bindFromRequest();
  		MultipartFormData<File> body = request().body().asMultipartFormData();
  		FilePart<File> picture = body.getFile("photoFileInput");
  		
  		String caption = requestData.get("caption");
  		String tag = requestData.get("tag");
  		String fileName, contentType, saveDirectory;
  		
  		if (picture != null) {  	    	
        saveDirectory = "/home/augusto/git/firstTest/public/images/";
  			fileName = picture.getFilename();
        contentType = picture.getContentType();
        File file = picture.getFile();        
        
        PhotoPost post = new PhotoPost();
        post.photoSaveDirectory = saveDirectory;
    		post.photoCaption = caption;
    		post.photoTag = tag;
    		post.creationDate = new Date();
    		post.imageFileName = fileName;
    		post.imageFileType = FilenameUtils.getExtension(contentType);
    		post.save();
    		
        fileName += FilenameUtils.getExtension(contentType);
        File destDir = new File(saveDirectory + fileName);

        try {
					FileUtils.copyFile(file, destDir);
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}	
        return ok("File uploaded " + fileName + " " + contentType + " " + file.getAbsolutePath());
  		}

  		List<PhotoPost> res = PhotoPost.find.orderBy().desc("id").setMaxRows(10).findList();
      
  		ArrayNode resJson = play.libs.Json.newArray();
  		
  		for(PhotoPost p: res) {
  		  resJson.add(play.libs.Json.toJson(p));	
  		}

  		return ok (resJson);

  		/*MultipartFormData<File> body = request().body().asMultipartFormData();
	    FilePart<File> picture = body.getFile("photoFileInput");
	    if (picture != null) {  	    	
	        String fileName = picture.getFilename();
	        String contentType = picture.getContentType();
	        File file = picture.getFile();
	        
	        String saveDirectory = "/home/augusto/git/firstTest/public/images/";
	        fileName += FilenameUtils.getExtension(contentType);
	        File destDir = new File(saveDirectory+fileName);

	        try {
						FileUtils.copyFile(file, destDir);
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}	
	        return ok("File uploaded " + fileName + " " + contentType + " " + file.getAbsolutePath());
	    } else {
	        flash("error", "Missing file");
	        return badRequest();
	    }*/
		}
}
