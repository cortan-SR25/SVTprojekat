package rs.ac.uns.ftn.friendster.model.dto;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import rs.ac.uns.ftn.friendster.model.entity.Post;

@Getter
@Setter
@NoArgsConstructor
public class PostDTO {

	private Long id;

    @NotBlank
    private String content;
    
    @NotBlank
    private String poster;

	public PostDTO(Long id, @NotBlank String content, @NotBlank String poster) {
		super();
		this.id = id;
		this.content = content;
		this.poster = poster;
	}

	public PostDTO(Post post) {
		this.id = post.getId();
		this.content = post.getContent();
		this.poster = post.getPoster().getUsername();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getPoster() {
		return poster;
	}

	public void setPoster(String poster) {
		this.poster = poster;
	}
    
    
}
