package controllers;

import java.io.File;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;

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
    
  	public Result textPost() {  	
  		DynamicForm requestData = formFactory.form().bindFromRequest();
  		String title = requestData.get("title");
  		String text = requestData.get("text");
  		String tag = requestData.get("tag");
  		
  		//save post
  		TextPost post = new TextPost();
  		
  		post.title = title;
  		post.bodyText = text;
  		post.tagText = tag;
  		post.creationDate = new Date();
  		post.save();
  		
  		//find last 10 post
  		List<TextPost> res = TextPost.find.orderBy().desc("id").setMaxRows(10).findList();
      
  		ArrayNode resJson = play.libs.Json.newArray();
  		
  		for(TextPost p: res) {
  		  resJson.add(play.libs.Json.toJson(p));	
  		}  		
  		
  		return ok (resJson);
  	}
  	
  	public Result photoPost() {    	
  		DynamicForm requestData = formFactory.form().bindFromRequest();

  		return ok ("");
  	}
  	
  	public Result quotePost() {    	
  		DynamicForm requestData = formFactory.form().bindFromRequest();
  		String quote = requestData.get("quote");
  		String source = requestData.get("source");
  		String tag = requestData.get("tag");

  		return ok ("Quote = " + quote + "\nSource = " + source + "\nTag = " + tag);
  	}
  	
  	public Result loadUpData() {
  		//find last 10 post
  		List<TextPost> res = TextPost.find.orderBy().desc("id").setMaxRows(10).findList();
      
  		ArrayNode resJson = play.libs.Json.newArray();
  		
  		for(TextPost p: res) {
  		  resJson.add(play.libs.Json.toJson(p));	
  		}  		
  		
  		return ok (resJson);		
  	}
  	
  	public Result localPhoto() {
  		 MultipartFormData<File> body = request().body().asMultipartFormData();
  	    FilePart<File> picture = body.getFile("picture");
  	    if (picture != null) {
  	        String fileName = picture.getFilename();
  	        String contentType = picture.getContentType();
  	        File file = picture.getFile();
  	        return ok("File uploaded");
  	    } else {
  	        flash("error", "Missing file");
  	        return badRequest();
  	    }
  	}
}
