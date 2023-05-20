package rs.ac.uns.ftn.friendster.service;

import rs.ac.uns.ftn.friendster.model.dto.UserDTO;
import rs.ac.uns.ftn.friendster.model.entity.User;

import java.time.LocalDateTime;
import java.util.List;

public interface UserService {

    User findByUsername(String username);

    User createUser(UserDTO userDTO);

    List<User> findAll();
    
    User setLastLogin(LocalDateTime time, String username);

	void edit(User user);
}
