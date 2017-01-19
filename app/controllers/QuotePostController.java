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
		
		public Result loadUpQuotePost() {
			// find last 10 post
			List<QuotePost> res = QuotePost.find.orderBy().desc("quote_post_id").setMaxRows(10).findList();      
			ArrayNode resJson = play.libs.Json.newArray();
			
			for(QuotePost p: res) {
			  resJson.add(play.libs.Json.toJson(p));	
			}
			return ok (resJson);		
		}
  	
  	public Result quotePost() {    	
  		DynamicForm requestData = formFactory.form().bindFromRequest();
  		String quote = requestData.get("quotePostQuote");
  		String source = requestData.get("quotePostSource");
  		String tag = requestData.get("quotePostTag");
  		
  		QuotePost post = new QuotePost();
  		post.quotePostCreationDate = new Date();
  		post.quotePostQuote = quote;
  		post.quotePostSource = source;
  		post.quotePostTag = tag;
  		post.save();

	  	// find last 10 post
  		List<QuotePost> res = QuotePost.find.orderBy().desc("quote_post_id").setMaxRows(10).findList();
      
  		ArrayNode resJson = play.libs.Json.newArray();
  		
  		for(QuotePost p: res) {
  		  resJson.add(play.libs.Json.toJson(p));	
  		}

  		return ok (resJson);
  	}
}
