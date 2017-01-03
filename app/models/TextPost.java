package models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.avaje.ebean.Model;

@Entity
public class TextPost extends Model {
	@Id
  public Long id;

  public String title;
  
  public String bodyText;
  
  public String tagText;

  public String username;
  
  public Date creationDate = new Date();

  public static Finder<Long, TextPost> find = new Finder<Long,TextPost>(TextPost.class);
}