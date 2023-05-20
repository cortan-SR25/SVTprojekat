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
    private Long posterId;

	public PostDTO(Long id, @NotBlank String content, @NotBlank Long posterId) {
		super();
		this.id = id;
		this.content = content;
		this.posterId = posterId;
	}

	public PostDTO(Post post) {
		this.id = post.getId();
		this.content = post.getContent();
		this.posterId = post.getPoster().getId();
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

	public Long getPosterId() {
		return posterId;
	}

	public void setPosterId(Long posterId) {
		this.posterId = posterId;
	}
    
    
}
