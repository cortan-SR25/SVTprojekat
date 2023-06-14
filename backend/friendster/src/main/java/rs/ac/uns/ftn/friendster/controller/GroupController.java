package rs.ac.uns.ftn.friendster.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import rs.ac.uns.ftn.friendster.model.entity.Post;
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
	public List<Post> loadAll() {
		return this.groupService.findAll();
	}

}
