package models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.avaje.ebean.Model;

@Entity
public class QuotePost extends Model {
	@Id
  public Long quotePostId;

  public String quotePostUsername;
  
  public Date quotePostCreationDate;

  public String quotePostQuote;
  
  public String quotePostSource;
  
  public String quotePostTag;

  public static Finder<Long, QuotePost> find = new Finder<Long,QuotePost>(QuotePost.class);
}