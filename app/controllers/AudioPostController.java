package controllers;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.imageio.ImageIO;
import javax.inject.Inject;

import org.apache.commons.io.FilenameUtils;

import com.fasterxml.jackson.databind.node.ArrayNode;

import models.LocalAudioPost;
import models.WebAudioPost;
import play.data.DynamicForm;
import play.mvc.*;
import play.mvc.Http.MultipartFormData;
import play.mvc.Http.MultipartFormData.FilePart;

public class AudioPostController extends Controller {
	
	private final play.data.FormFactory formFactory;
	
	@Inject
	public AudioPostController(play.data.FormFactory formFactory) {
		this.formFactory = formFactory;
	}
	
	public Result loadUpWebAudioPost() {
		// find last 10 post
		List<WebAudioPost> res = WebAudioPost.find.orderBy().desc("web_audio_post_id").setMaxRows(10).findList();      
		ArrayNode resJson = play.libs.Json.newArray();
		
		for(WebAudioPost p: res) {
		  resJson.add(play.libs.Json.toJson(p));	
		}
		return ok (resJson);		
	}
	
	public Result loadUpLocalAudioPost() {
		// find last 10 post
		List<LocalAudioPost> res = LocalAudioPost.find.orderBy().desc("local_audio_post_id").setMaxRows(10).findList();      
		ArrayNode resJson = play.libs.Json.newArray();
		
		for(LocalAudioPost p: res) {
		  resJson.add(play.libs.Json.toJson(p));	
		}
		return ok (resJson);		
	}
	
	public Result webAudio() {
		DynamicForm requestData = formFactory.form().bindFromRequest();
		MultipartFormData<File> body = request().body().asMultipartFormData();
		String audioUrl = requestData.get("webAudioUrl");		
		String description = requestData.get("webAudioPostDescription");
		String tag = requestData.get("webAudioPostTag"); 
		FilePart<File> albumArt = body.getFile("webAudioAlbumArt");
		String track = requestData.get("webAudioTrack");
		String artist = requestData.get("webAudioArtist");
		String album = requestData.get("webAudioAlbum");
		String audioFileName = audioUrl.substring(audioUrl.lastIndexOf('/')+1);
		String albumArtSaveDirectory, albumArtFileName, newAlbumArtFileName;
		
		WebAudioPost post = new WebAudioPost();
		post.webAudioPostCreationDate = new Date();
    post.webAudioUrl = audioUrl;
    post.webAudioFileName = audioFileName;
    post.webAudioFileType = FilenameUtils.getExtension(audioFileName);
		post.webAudioPostDescription = description;
		post.webAudioPostTag = tag;
		post.webAudioTrack = track;
		post.webAudioArtist = artist;
		post.webAudioAlbum = album;
		post.save();
		
		if (albumArt != null) {  	    	
			albumArtSaveDirectory = "public/upload/audio/audio_album_art/";
			albumArtFileName = albumArt.getFilename();
      File file = albumArt.getFile();
      // generate a random file name
      newAlbumArtFileName = UUID.randomUUID().toString().replaceAll("-", "") + new SimpleDateFormat("yyyyMMddHHmmssSSS'.'").format(new Date()) + FilenameUtils.getExtension(albumArtFileName);
      
      post.webAudioAlbumArtFileName = newAlbumArtFileName;
  		post.webAudioAlbumArtOriginalFileName = albumArtFileName;
  		post.webAudioAlbumArtFileType = FilenameUtils.getExtension(albumArtFileName);
  		post.save();

      try {
      	// read image in and write it back, metadata isn't read
				BufferedImage image = ImageIO.read(file);
				ImageIO.write(image, post.webAudioAlbumArtFileType, new File(albumArtSaveDirectory + post.webAudioAlbumArtFileName)); // new image without metadata
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}	
      /*System.out.println("Success");*/
		}

		List<WebAudioPost> res = WebAudioPost.find.orderBy().desc("web_audio_post_id").setMaxRows(10).findList();
    
		ArrayNode resJson = play.libs.Json.newArray();
		
		for(WebAudioPost p: res) {
		  resJson.add(play.libs.Json.toJson(p));	
		}

		return ok (resJson);
	}
	
	public Result localAudio() {
		DynamicForm requestData = formFactory.form().bindFromRequest();
		MultipartFormData<File> body = request().body().asMultipartFormData();
		FilePart<File> audio = body.getFile("localAudio");
		String description = requestData.get("localAudioPostDescription");
		String tag = requestData.get("localAudioPostTag"); 
		FilePart<File> albumArt = body.getFile("localAudioAlbumArt");
		String track = requestData.get("localAudioTrack");
		String artist = requestData.get("localAudioArtist");
		String album = requestData.get("localAudioAlbum");
		String audioSaveDirectory, audioFileName, newAudioFileName, albumArtSaveDirectory, albumArtFileName, newAlbumArtFileName;
		
		if(audio!=null) {
			audioSaveDirectory = "public/upload/audio/audio_file/";
			audioFileName = audio.getFilename();
			newAudioFileName = UUID.randomUUID().toString().replaceAll("-", "") + new SimpleDateFormat("yyyyMMddHHmmssSSS'.'").format(new Date()) + FilenameUtils.getExtension(audioFileName);
			File audiofile = audio.getFile();
			
			LocalAudioPost post = new LocalAudioPost();
			post.localAudioPostCreationDate = new Date();
	    post.localAudioSaveDirectory = audioSaveDirectory;
	    post.localAudioFileName = newAudioFileName;
	    post.localAudioOriginalFileName = audioFileName;
	    post.localAudioFileType = FilenameUtils.getExtension(audioFileName);
			post.localAudioPostDescription = description;
			post.localAudioPostTag = tag;
			post.localAudioTrack = track;
			post.localAudioArtist = artist;
			post.localAudioAlbum = album;
			post.save();
			
			try {
	      File dstFile = new File(audioSaveDirectory + post.localAudioFileName);
	      FileInputStream in = new FileInputStream(audiofile);
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
		
			if(albumArt!=null) {  	    	
				albumArtSaveDirectory = "public/upload/audio/audio_album_art/";
				albumArtFileName = albumArt.getFilename();
	      // generate a random file name
	      newAlbumArtFileName = UUID.randomUUID().toString().replaceAll("-", "") + new SimpleDateFormat("yyyyMMddHHmmssSSS'.'").format(new Date()) + FilenameUtils.getExtension(albumArtFileName);
	      File albumArtfile = albumArt.getFile();
	      
	      post.localAudioAlbumArtFileName = newAlbumArtFileName;
	  		post.localAudioAlbumArtOriginalFileName = albumArtFileName;
	  		post.localAudioAlbumArtFileType = FilenameUtils.getExtension(albumArtFileName);
	  		post.save();
	
	      try {
	      	// read image in and write it back, metadata isn't read
					BufferedImage image = ImageIO.read(albumArtfile);
					ImageIO.write(image, post.localAudioAlbumArtFileType, new File(albumArtSaveDirectory + post.localAudioAlbumArtFileName)); // new image without metadata
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}	
	      /*System.out.println("Success");*/
			}
		}

		List<LocalAudioPost> res = LocalAudioPost.find.orderBy().desc("local_audio_post_id").setMaxRows(10).findList();
    
		ArrayNode resJson = play.libs.Json.newArray();
		
		for(LocalAudioPost p: res) {
		  resJson.add(play.libs.Json.toJson(p));	
		}

		return ok (resJson);
	}
}
	
	
	
	