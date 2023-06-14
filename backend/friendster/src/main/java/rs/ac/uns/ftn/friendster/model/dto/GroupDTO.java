package rs.ac.uns.ftn.friendster.model.dto;

import javax.validation.constraints.NotBlank;

import rs.ac.uns.ftn.friendster.model.entity.Group;

public class GroupDTO {
	
	private Long id;
	
	@NotBlank
	private String name;
	
	@NotBlank
	private String description;
	
	@NotBlank
	private Long adminId;

	public GroupDTO(Long id, @NotBlank String name, @NotBlank String description, @NotBlank Long adminId) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.adminId = adminId;
	}
	
	public GroupDTO(Group group) {
		this.id = group.getId();
		this.name = group.getName();
		this.description = group.getDescription();
		this.adminId = group.getGroupAdmin().getId();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Long getAdminId() {
		return adminId;
	}

	public void setAdminId(Long adminId) {
		this.adminId = adminId;
	}

}
