package models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.avaje.ebean.Model;

@Entity
public class TextPost extends Model {
	@Id
  public Long textPostId;

	public String textPostUsername;
  
	public Date textPostCreationDate;

	public String textPostTitle;
  
	public String textPostText;
  
	public String textPostTag;

	public static Finder<Long, TextPost> find = new Finder<Long,TextPost>(TextPost.class);
}