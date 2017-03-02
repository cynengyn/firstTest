package models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.avaje.ebean.Model;

@Entity
public class LocalAudioPost extends Model {
	@Id
	public Long localAudioPostId;

	public String localAudioPostUsername;
  
	public Date localAudioPostCreationDate;
  
	public String localAudioSaveDirectory;
  
	public String localAudioFileName;
  
	public String localAudioOriginalFileName;
  
	public String localAudioFileType;
  
	public String localAudioPostDescription;
  
	public String localAudioPostTag;
  
	public String localAudioAlbumArtSaveDirectory;
  
	public String localAudioAlbumArtFileName;
  
	public String localAudioAlbumArtOriginalFileName;
  
	public String localAudioAlbumArtFileType;
  
	public String localAudioTrack;
  
	public String localAudioArtist;
  
	public String localAudioAlbum;

  public static Finder<Long, LocalAudioPost> find = new Finder<Long, LocalAudioPost>(LocalAudioPost.class);
}