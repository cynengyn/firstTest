package controllers;

import javax.inject.Inject;

import play.data.DynamicForm;
import play.mvc.*;

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
    
  	public Result textPost()  {
  		DynamicForm requestData = formFactory.form().bindFromRequest();
  		String title = requestData.get("title");
  		String text = requestData.get("text");
  		String tag = requestData.get("tag");

  		return ok (index.render(text));
  	}

}
