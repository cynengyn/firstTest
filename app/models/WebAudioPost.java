package models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.avaje.ebean.Model;

@Entity
public class WebAudioPost extends Model {
	@Id
	public Long webAudioPostId;

	public String webAudioPostUsername;
  
	public Date webAudioPostCreationDate;
  
	public String webAudioPostDescription;
  
	public String webAudioPostTag;

	public String webAudioUrl;
  
	public String webAudioFileName;
  
	public String webAudioFileType;
  
	public String webAudioAlbumArtDirectory;
  
	public String webAudioAlbumArtFileName;
  
	public String webAudioAlbumArtFileType;
  
	public String webAudioAlbumArtOriginalFileName;
  
	public String webAudioTrack;
  
	public String webAudioArtist;
  
	public String webAudioAlbum;

  public static Finder<Long, WebAudioPost> find = new Finder<Long, WebAudioPost>(WebAudioPost.class);
}