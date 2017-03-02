package controllers;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import javax.imageio.ImageIO;
import javax.inject.Inject;

import org.apache.commons.io.FilenameUtils;

import com.fasterxml.jackson.databind.node.ArrayNode;

import models.FileName;
import models.LocalAudioPost;
import models.WebAudioPost;
import play.data.DynamicForm;
import play.mvc.*;
import play.mvc.Http.MultipartFormData;

public class AudioPostController extends Controller {

  private final play.data.FormFactory formFactory;
  private static final String ALBUM_ART_SAVE_DIRECTORY = "public/upload/audio/audio_album_art/";
  private static final String AUDIO_SAVE_DIRECTORY = "public/upload/audio/audio_file/";
  
  @Inject
  public AudioPostController(play.data.FormFactory formFactory) {
    this.formFactory = formFactory;
  }
  
  public Result audioPosts(String type) {
  	if(type == "localAudio" && checkLocalAudioFile()) {
  		LocalAudioPost post = new LocalAudioPost();
  		setLocalAudioObject(post);
  		copyLocalAudioFile(post);
  		copyLocalAudioAlbumArt(post);
  		return loadUpLocalAudioPost();
  	}
  	else if(type == "webAudio" && checkWebAudioUrl()) {
  		WebAudioPost post = new WebAudioPost();
  		setWebAudioObject(post);
  		copyWebAudioAlbumArt(post);  		
  		return loadUpWebAudioPost();
  	}
		return null;
  }
  
  public boolean checkLocalAudioFile() {
  	if(getAudioFile() != null)
  		return true;
  	else
  		return false;
  }
  
  public boolean checkWebAudioUrl() {
  	DynamicForm requestData = formFactory.form().bindFromRequest();  	
  	if(requestData.get("webAudioUrl") != null)
  		return true;
  	else
  		return false;
  }
  
  public void copyLocalAudioAlbumArt(LocalAudioPost post) {
  	if(getAlbumFile("local") != null) {
  		setLocalAudioAlbumArtInfo(post);
      try {
        File file = getAlbumFile("local");        
        BufferedImage image = ImageIO.read(file); // read image in and write it back, metadata isn't read
        ImageIO.write(image, post.localAudioAlbumArtFileType, new File(post.localAudioAlbumArtSaveDirectory + post.localAudioAlbumArtFileName)); // new image without metadata
      } catch(IOException e) {
        // TODO Auto-generated catch block
        e.printStackTrace();
      }
      /*System.out.println("Success");*/
    }
  }
  
  public void copyWebAudioAlbumArt(WebAudioPost post) {
  	if(getAlbumFile("web") != null) {
  		setWebAudioAlbumArtInfo(post);
      try {
        File file = getAlbumFile("web");        
        BufferedImage image = ImageIO.read(file); // read image in and write it back, metadata isn't read
        ImageIO.write(image, post.webAudioAlbumArtFileType, new File(post.webAudioAlbumArtDirectory + post.webAudioAlbumArtFileName)); // new image without metadata
      } catch(IOException e) {
        // TODO Auto-generated catch block
        e.printStackTrace();
      }
      /*System.out.println("Success");*/
    }
  }
  
  public void copyLocalAudioFile(LocalAudioPost post) {
  	if(checkLocalAudioFile()) {
  		try {
        File dstFile = new File(AUDIO_SAVE_DIRECTORY + post.localAudioFileName);
        FileInputStream in = new FileInputStream(getAudioFile());
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
  
  public File getAlbumFile(String type) {
  	MultipartFormData <File> body = request().body().asMultipartFormData();
  	if(type == "local")
  		return body.getFile("localAudioAlbumArt").getFile();
  	else if(type == "web")
  		return body.getFile("webAudioAlbumArt").getFile();
		return null;
  }
  
  public String getAlbumFileName(String type) {
  	MultipartFormData <File> body = request().body().asMultipartFormData();
  	if(type == "local")
  		return body.getFile("localAudioAlbumArt").getFilename();
  	else if(type == "web")
  		return body.getFile("webAudioAlbumArt").getFilename();
		return null;
  }
  
  public File getAudioFile() {
  	MultipartFormData <File> body = request().body().asMultipartFormData();
  	return body.getFile("localAudio").getFile();
  }
  
  public String getAudioFileName() {
  	MultipartFormData <File> body = request().body().asMultipartFormData();
  	return body.getFile("localAudio").getFilename();
  }

  public Result loadUpLocalAudioPost() {
    // find last 10 post
    List <LocalAudioPost> res = LocalAudioPost.find.orderBy().desc("local_audio_post_creation_date").setMaxRows(10).findList();
    ArrayNode resJson = play.libs.Json.newArray();

    for(LocalAudioPost p: res) {
      resJson.add(play.libs.Json.toJson(p));
    }
    return ok(resJson);
  }

  public Result loadUpWebAudioPost() {
    // find last 10 post
    List <WebAudioPost> res = WebAudioPost.find.orderBy().desc("web_audio_post_creation_date").setMaxRows(10).findList();
    ArrayNode resJson = play.libs.Json.newArray();

    for(WebAudioPost p: res) {
      resJson.add(play.libs.Json.toJson(p));
    }
    return ok(resJson);
  }
  
  public void setLocalAudioAlbumArtInfo(LocalAudioPost post) {
  	post.localAudioAlbumArtSaveDirectory = ALBUM_ART_SAVE_DIRECTORY;
    post.localAudioAlbumArtFileName = FileName.setRandomName(getAlbumFileName("local")); // generate a random file name
    post.localAudioAlbumArtOriginalFileName = getAlbumFileName("local");
    post.localAudioAlbumArtFileType = FilenameUtils.getExtension(getAlbumFileName("local"));
    post.save();
  }
  
  public void setLocalAudioObject(LocalAudioPost post) {
  	DynamicForm requestData = formFactory.form().bindFromRequest();
    post.localAudioPostCreationDate = new Date();
    post.localAudioSaveDirectory = AUDIO_SAVE_DIRECTORY;
    post.localAudioFileName = FileName.setRandomName(getAudioFileName());
    post.localAudioOriginalFileName = getAudioFileName();
    post.localAudioFileType = FilenameUtils.getExtension(getAudioFileName());
    post.localAudioPostDescription = requestData.get("localAudioPostDescription");
    post.localAudioPostTag = requestData.get("localAudioPostTag");
    post.localAudioTrack = requestData.get("localAudioTrack");
    post.localAudioArtist = requestData.get("localAudioArtist");
    post.localAudioAlbum = requestData.get("localAudioAlbum");
    post.save();
  }
  
  public void setWebAudioAlbumArtInfo(WebAudioPost post) {
  	post.webAudioAlbumArtDirectory = ALBUM_ART_SAVE_DIRECTORY;
    post.webAudioAlbumArtFileName = FileName.setRandomName(getAlbumFileName("web")); // generate a random file name
    post.webAudioAlbumArtOriginalFileName = getAlbumFileName("web");
    post.webAudioAlbumArtFileType = FilenameUtils.getExtension(getAlbumFileName("web"));
    post.save();
  }
  
  public void setWebAudioObject(WebAudioPost post) {
  	DynamicForm requestData = formFactory.form().bindFromRequest();
    post.webAudioPostCreationDate = new Date();
    post.webAudioUrl = requestData.get("webAudioUrl");
    post.webAudioFileName = FileName.getWebFileName(post.webAudioUrl);
    post.webAudioFileType = FilenameUtils.getExtension(post.webAudioFileName);
    post.webAudioPostDescription = requestData.get("webAudioPostDescription");
    post.webAudioPostTag = requestData.get("webAudioPostTag");
    post.webAudioTrack = requestData.get("webAudioTrack");
    post.webAudioArtist = requestData.get("webAudioArtist");
    post.webAudioAlbum = requestData.get("webAudioAlbum");
    post.save();
  }
}