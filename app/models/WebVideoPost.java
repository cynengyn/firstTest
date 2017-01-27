package models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.avaje.ebean.Model;

@Entity
public class WebVideoPost extends Model {
	@Id
  public Long webVideoPostId;

  public String webVideoPostUsername;
  
  public Date webVideoPostCreationDate;
  
  public String webVideoPostCaption;
  
  public String webVideoPostTag;

  public String webVideoUrlType;
  
  public String webVideoUrlId;

  public static Finder<Long, WebVideoPost> find = new Finder<Long, WebVideoPost>(WebVideoPost.class);
}