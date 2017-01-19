package controllers;

import java.util.Date;
import java.util.List;
import javax.inject.Inject;

import com.fasterxml.jackson.databind.node.ArrayNode;

import models.TextPost;
import play.data.DynamicForm;
import play.mvc.*;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class TextPostController extends Controller {

		private final play.data.FormFactory formFactory;
	
		@Inject
		public TextPostController(play.data.FormFactory formFactory) {
			this.formFactory = formFactory;
		}

  	public Result loadUpTextPost() {
  		// find last 10 post
  		List<TextPost> res = TextPost.find.orderBy().desc("text_post_id").setMaxRows(10).findList();      
  		ArrayNode resJson = play.libs.Json.newArray();
  		
  		for(TextPost p: res) {
  		  resJson.add(play.libs.Json.toJson(p));	
  		}
  		return ok (resJson);		
  	}
  	
  	public Result textPost() {  	
  		DynamicForm requestData = formFactory.form().bindFromRequest();
  		String title = requestData.get("textPostTitle");
  		String text = requestData.get("textPostText");
  		String tag = requestData.get("textPostTag");

  		TextPost post = new TextPost();
  		post.textPostCreationDate = new Date();
  		post.textPostTitle = title;
  		post.textPostText = text;
  		post.textPostTag = tag;
  		post.save();
  		
  		// find last 10 post
  		List<TextPost> res = TextPost.find.orderBy().desc("text_post_id").setMaxRows(10).findList();
      
  		ArrayNode resJson = play.libs.Json.newArray();
  		
  		for(TextPost p: res) {
  		  resJson.add(play.libs.Json.toJson(p));	
  		}  		
  		
  		return ok (resJson);
  	}
}