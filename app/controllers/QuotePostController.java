package controllers;

import java.util.Date;
import java.util.List;
import javax.inject.Inject;

import com.fasterxml.jackson.databind.node.ArrayNode;

import models.QuotePost;
import play.data.DynamicForm;
import play.mvc.*;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class QuotePostController extends Controller {

		private final play.data.FormFactory formFactory;
	
		@Inject
		public QuotePostController(play.data.FormFactory formFactory) {
			this.formFactory = formFactory;
		}
  	
  	public Result quotePost() {    	
  		setQuotePostObject();
  		return loadUpQuotePost();
  	}
		
		public Result loadUpQuotePost() {
			// find last 10 post
			List<QuotePost> res = QuotePost.find.orderBy().desc("quote_post_creation_date").setMaxRows(10).findList();      
			ArrayNode resJson = play.libs.Json.newArray();
			
			for(QuotePost p: res) {
			  resJson.add(play.libs.Json.toJson(p));	
			}
			return ok (resJson);		
		}
  	
  	public void setQuotePostObject() {
  		DynamicForm requestData = formFactory.form().bindFromRequest();
  		QuotePost post = new QuotePost();
  		post.quotePostCreationDate = new Date();
  		post.quotePostQuote = requestData.get("quotePostQuote");
  		post.quotePostSource = requestData.get("quotePostSource");
  		post.quotePostTag = requestData.get("quotePostTag");
  		post.save();
  	}
}
