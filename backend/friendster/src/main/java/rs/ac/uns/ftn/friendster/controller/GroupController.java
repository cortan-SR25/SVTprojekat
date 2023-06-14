package rs.ac.uns.ftn.friendster.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import rs.ac.uns.ftn.friendster.model.dto.GroupDTO;
import rs.ac.uns.ftn.friendster.model.entity.Group;
import rs.ac.uns.ftn.friendster.security.TokenUtils;
import rs.ac.uns.ftn.friendster.service.GroupService;

@RestController
@RequestMapping("api/groups")
public class GroupController {
	
	@Autowired
	GroupService groupService;
	
	@Autowired
	TokenUtils tokenUtils;
	
	@GetMapping("/all")
	public List<Group> loadAll() {
		return this.groupService.findAll(); //where isSuspended == false zato sto su ostale grupe logicki izbrisane
	}
	
	@GetMapping("/{id}")
	public Group getGroup(@PathVariable Long id) {
		return groupService.findById(id);
	}
	
	@PostMapping("/create")
	public List<Group> createGroup(@Validated @RequestBody GroupDTO groupDTO){
		
		Group group = groupService.create(groupDTO);
		
		return this.groupService.findAll();
	}
	
	@PostMapping("/edit")
	public ResponseEntity<GroupDTO> editGroup(@Validated @RequestBody GroupDTO groupDTO){
		
		Group group = groupService.edit(groupDTO);
		
		if (group == null) {
			return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
		}
		
		GroupDTO editedGroup = new GroupDTO(group);
		
		return new ResponseEntity<>(editedGroup, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/delete")
	public ResponseEntity<GroupDTO> deleteGroup(@Validated @RequestBody GroupDTO groupDTO){
		
		groupService.delete(groupDTO.getId()); //Zameni da bude samo logicko brisanje (isSuspended = true)
		
		return new ResponseEntity<>(groupDTO, HttpStatus.ACCEPTED); 
	}
}
