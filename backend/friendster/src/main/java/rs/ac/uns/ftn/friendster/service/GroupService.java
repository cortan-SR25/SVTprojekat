package rs.ac.uns.ftn.friendster.service;

import java.util.List;

import rs.ac.uns.ftn.friendster.model.dto.GroupDTO;
import rs.ac.uns.ftn.friendster.model.entity.Group;

public interface GroupService {
	
	Group findById(Long id);
	
	List<Group> findAll();
	
	Group create(GroupDTO group);
	
	Group edit(GroupDTO group);
	
	void delete(Long id);

}
