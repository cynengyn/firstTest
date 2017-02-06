package controllers;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.inject.Inject;

import org.apache.commons.io.FilenameUtils;

import com.fasterxml.jackson.databind.node.ArrayNode;

import models.LocalVideoPost;
import models.WebVideoPost;
/*import models.WebVideoPost;*/
import play.data.DynamicForm;
import play.mvc.*;
import play.mvc.Http.MultipartFormData;
import play.mvc.Http.MultipartFormData.FilePart;

public class VideoPostController extends Controller {
	
	private final play.data.FormFactory formFactory;
	
	@Inject
	public VideoPostController(play.data.FormFactory formFactory) {
		this.formFactory = formFactory;
	}
	
	public Result loadUpWebVideoPost() {
		// find last 10 post
		List<WebVideoPost> res = WebVideoPost.find.orderBy().desc("web_video_post_id").setMaxRows(10).findList();      
		ArrayNode resJson = play.libs.Json.newArray();
		
		for(WebVideoPost p: res) {
		  resJson.add(play.libs.Json.toJson(p));	
		}
		return ok (resJson);		
	}
	
	public Result loadUpLocalVideoPost() {
		// find last 10 post
		List<LocalVideoPost> res = LocalVideoPost.find.orderBy().desc("local_video_post_id").setMaxRows(10).findList();      
		ArrayNode resJson = play.libs.Json.newArray();
		
		for(LocalVideoPost p: res) {
		  resJson.add(play.libs.Json.toJson(p));	
		}
		return ok (resJson);		
	}
	
	public Result localVideo() {
		DynamicForm requestData = formFactory.form().bindFromRequest();
		MultipartFormData<File> body = request().body().asMultipartFormData();
		FilePart<File> video = body.getFile("localVideo");
		String description = requestData.get("localVideoPostCaption");
		String tag = requestData.get("localVideoPostTag");
		String videoSaveDirectory, videoFileName, newVideoFileName;
		
		if(video!=null) {
			videoSaveDirectory = "public/upload/video/";
			videoFileName = video.getFilename();
			newVideoFileName = UUID.randomUUID().toString().replaceAll("-", "") + new SimpleDateFormat("yyyyMMddHHmmssSSS'.'").format(new Date()) + FilenameUtils.getExtension(videoFileName);
			File videofile = video.getFile();
			
			LocalVideoPost post = new LocalVideoPost();
			post.localVideoPostCreationDate = new Date();
	    post.localVideoSaveDirectory = videoSaveDirectory;
	    post.localVideoFileName = newVideoFileName;
	    post.localVideoOriginalFileName = videoFileName;
	    post.localVideoFileType = FilenameUtils.getExtension(videoFileName);
			post.localVideoPostCaption = description;
			post.localVideoPostTag = tag;
			post.save();
			
			try {
	      File dstFile = new File(videoSaveDirectory + post.localVideoFileName);
	      FileInputStream in = new FileInputStream(videofile);
	      FileOutputStream out = new FileOutputStream(dstFile);

	      byte[] buf = new byte[1024];
	      int len;
	      while ((len = in.read(buf)) > 0) { 
    			out.write(buf, 0, len);
	      }
				in.close();
				out.close();
			} catch (Exception e) {
				System.out.println(e);
			}
		}

		List<LocalVideoPost> res = LocalVideoPost.find.orderBy().desc("local_video_post_id").setMaxRows(10).findList();
    
		ArrayNode resJson = play.libs.Json.newArray();
		
		for(LocalVideoPost p: res) {
		  resJson.add(play.libs.Json.toJson(p));	
		}

		return ok (resJson);
	}
	
	public Result webVideo() {
		DynamicForm requestData = formFactory.form().bindFromRequest();
		String videoProvider = requestData.get("webVideoUrlType");
		String videoId = requestData.get("webVideoUrlId");
		String description = requestData.get("webVideoPostCaption");
		String tag = requestData.get("webVideoPostTag");
		
		WebVideoPost post = new WebVideoPost();
		post.webVideoPostCreationDate = new Date();
    post.webVideoUrlType = videoProvider;
    post.webVideoUrlId = videoId;
		post.webVideoPostCaption = description;
		post.webVideoPostTag = tag;
		post.save();

		List<WebVideoPost> res = WebVideoPost.find.orderBy().desc("web_video_post_id").setMaxRows(10).findList();
    
		ArrayNode resJson = play.libs.Json.newArray();
		
		for(WebVideoPost p: res) {
		  resJson.add(play.libs.Json.toJson(p));	
		}

		return ok (resJson);
	}
}