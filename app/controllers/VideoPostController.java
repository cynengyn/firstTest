package controllers;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.Date;
import java.util.List;
import javax.inject.Inject;

import org.apache.commons.io.FilenameUtils;

import com.fasterxml.jackson.databind.node.ArrayNode;

import models.FileName;
import models.LocalVideoPost;
import models.WebVideoPost;
/*import models.WebVideoPost;*/
import play.data.DynamicForm;
import play.mvc.*;
import play.mvc.Http.MultipartFormData;

public class VideoPostController extends Controller {
	
	private final play.data.FormFactory formFactory;
  private static final String VIDEO_SAVE_DIRECTORY = "public/upload/video/";
	
	@Inject
	public VideoPostController(play.data.FormFactory formFactory) {
		this.formFactory = formFactory;
	}
	
	public Result videoPosts(String type) {
  	if(type == "localVideo" && checkLocalVideoFile()) {
  		LocalVideoPost post = new LocalVideoPost();
  		setLocalVideoObject(post);
  		copyLocalVideoFile(post);
  		return loadUpLocalVideoPost();
  	}
  	else if(type == "webVideo" && checkWebVideoUrl()) {
  		WebVideoPost post = new WebVideoPost();
  		setWebVideoObject(post); 		
  		return loadUpWebVideoPost();
  	}
		return null;
  }
	
	public boolean checkLocalVideoFile() {
  	if(getVideoFile() != null)
  		return true;
  	else
  		return false;
  }
	
	public boolean checkWebVideoUrl() {
  	DynamicForm requestData = formFactory.form().bindFromRequest();  	
  	if(requestData.get("webVideoUrlType") != null && requestData.get("webVideoUrlId") != null)
  		return true;
  	else
  		return false;
  }
	
	public void copyLocalVideoFile(LocalVideoPost post) {
  	if(checkLocalVideoFile()) {
  		try {
        File dstFile = new File(VIDEO_SAVE_DIRECTORY + post.localVideoFileName);
        FileInputStream in = new FileInputStream(getVideoFile());
        FileOutputStream out = new FileOutputStream(dstFile);

        byte[] buf = new byte[1024];
        int len;
        while((len = in .read(buf)) > 0) {
          out.write(buf, 0, len);
        } in .close();
        out.close();
      } catch(Exception e) {
        System.out.println(e);
      }
  	}
  }
	
	public File getVideoFile() {
  	MultipartFormData <File> body = request().body().asMultipartFormData();
  	return body.getFile("localVideo").getFile();
  }
	
	public String getVideoFileName() {
  	MultipartFormData <File> body = request().body().asMultipartFormData();
  	return body.getFile("localVideo").getFilename();
  }
	
	public Result loadUpLocalVideoPost() {
		// find last 10 post
		List<LocalVideoPost> res = LocalVideoPost.find.orderBy().desc("local_video_post_creation_date").setMaxRows(10).findList();      
		ArrayNode resJson = play.libs.Json.newArray();
		
		for(LocalVideoPost p: res) {
		  resJson.add(play.libs.Json.toJson(p));	
		}
		return ok (resJson);		
	}
	
	public Result loadUpWebVideoPost() {
		// find last 10 post
		List<WebVideoPost> res = WebVideoPost.find.orderBy().desc("web_video_post_creation_date").setMaxRows(10).findList();      
		ArrayNode resJson = play.libs.Json.newArray();
		
		for(WebVideoPost p: res) {
		  resJson.add(play.libs.Json.toJson(p));	
		}
		return ok (resJson);		
	}
	
	public void setLocalVideoObject(LocalVideoPost post) {
  	DynamicForm requestData = formFactory.form().bindFromRequest();
    post.localVideoPostCreationDate = new Date();
    post.localVideoSaveDirectory = VIDEO_SAVE_DIRECTORY;
    post.localVideoFileName = FileName.setRandomName(getVideoFileName());
    post.localVideoOriginalFileName = getVideoFileName();
    post.localVideoFileType = FilenameUtils.getExtension(getVideoFileName());
    post.localVideoPostCaption = requestData.get("localVideoPostCaption");
    post.localVideoPostTag = requestData.get("localVideoPostTag");
    post.save();
  }
	
	public void setWebVideoObject(WebVideoPost post) {
  	DynamicForm requestData = formFactory.form().bindFromRequest();
    post.webVideoPostCreationDate = new Date();
    post.webVideoUrlType = requestData.get("webVideoUrlType");
    post.webVideoUrlId = requestData.get("webVideoUrlId");
    post.webVideoPostCaption = requestData.get("webVideoPostCaption");
    post.webVideoPostTag = requestData.get("webVideoPostTag");
    post.save();
  }
}