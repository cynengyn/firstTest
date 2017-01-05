package models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.avaje.ebean.Model;

@Entity
public class WebPhotoPost extends Model {
	@Id
  public Long webPhotoPostId;

  public String webPhotoUrl;
  
  public String webPhotoCaption;
  
  public String webPhotoPostTag;

  public String webPhotoPostUsername;
  
  public Date webPhotoPostCreationDate;
  
  public String webPhotoImageFileName;
  
  public String webPhotoImageFileType;

  public static Finder<Long, WebPhotoPost> find = new Finder<Long, WebPhotoPost>(WebPhotoPost.class);
}