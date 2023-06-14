package rs.ac.uns.ftn.friendster.service.implementation;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import rs.ac.uns.ftn.friendster.model.dto.GroupDTO;
import rs.ac.uns.ftn.friendster.model.entity.Group;
import rs.ac.uns.ftn.friendster.model.entity.User;
import rs.ac.uns.ftn.friendster.repository.GroupRepository;
import rs.ac.uns.ftn.friendster.service.GroupService;
import rs.ac.uns.ftn.friendster.service.UserService;

@Service
public class GroupServiceImpl implements GroupService {
	
	@Autowired
	GroupRepository groupRepository;
	
	@Autowired
	UserService userService;

	@Override
	public Group findById(Long id) {
		return groupRepository.findById(id).get();
	}

	@Override
	public List<Group> findAll() {
		return groupRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
	}

	@Override
	public Group create(GroupDTO groupDTO) {
		Group group = new Group();
		group.setName(groupDTO.getName());
		group.setDescription(groupDTO.getDescription());
		group.setIsSuspended(false);
		group.setCreationDate(LocalDateTime.now());
		User user = userService.findById(groupDTO.getAdminId()).get();
		group.setGroupAdmin(user);
		return groupRepository.save(group);
	}

	@Override
	public Group edit(GroupDTO groupDTO) {
		Group group = groupRepository.findById(groupDTO.getId()).get();
		group.setName(groupDTO.getName());
		group.setDescription(groupDTO.getDescription());
		return groupRepository.save(group);
	}

	@Override
	public void delete(Long id) {
		groupRepository.deleteById(id);
	}
	
	
}
