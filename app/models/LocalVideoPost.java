package models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.avaje.ebean.Model;

@Entity
public class LocalVideoPost extends Model {
	@Id
  public Long localVideoPostId;

  public String localVideoPostUsername;
  
  public Date localVideoPostCreationDate;
  
  public String localVideoSaveDirectory;
  
  public String localVideoFileName;
  
  public String localVideoOriginalFileName;
  
  public String localVideoFileType;
  
  public String localVideoPostCaption;
  
  public String localVideoPostTag;

  public static Finder<Long, LocalVideoPost> find = new Finder<Long, LocalVideoPost>(LocalVideoPost.class);
}