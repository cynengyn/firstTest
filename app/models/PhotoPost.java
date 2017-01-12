package models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.avaje.ebean.Model;

@Entity
public class PhotoPost extends Model {
	@Id
  public Long id;

  public String photoSaveDirectory;
  
  public String photoCaption;
  
  public String photoTag;

  public String username;
  
  public Date creationDate = new Date();
  
  public String imageFileName;
  
  public String imageFileType;
  
  public String imageOriginalFileName;

  public static Finder<Long, PhotoPost> find = new Finder<Long, PhotoPost>(PhotoPost.class);
}