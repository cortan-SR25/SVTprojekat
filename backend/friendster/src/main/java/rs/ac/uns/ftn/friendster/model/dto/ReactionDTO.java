package rs.ac.uns.ftn.friendster.model.dto;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ReactionDTO {
	
	private Long id;
	
	@NotBlank
	private String type;
	
	@NotBlank
	private Long reactorId;
	
	@NotBlank
	private Long contentId;

	public ReactionDTO(Long id, @NotBlank String type, @NotBlank Long reactorId, @NotBlank Long contentId) {
		super();
		this.id = id;
		this.type = type;
		this.reactorId = reactorId;
		this.contentId = contentId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Long getReactorId() {
		return reactorId;
	}

	public void setReactorId(Long reactorId) {
		this.reactorId = reactorId;
	}

	public Long getContentId() {
		return contentId;
	}

	public void setContentId(Long contentId) {
		this.contentId = contentId;
	}

}
