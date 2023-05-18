package rs.ac.uns.ftn.friendster.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import rs.ac.uns.ftn.friendster.model.dto.UserDTO;
import rs.ac.uns.ftn.friendster.model.entity.Roles;
import rs.ac.uns.ftn.friendster.model.entity.User;
import rs.ac.uns.ftn.friendster.repository.UserRepository;
import rs.ac.uns.ftn.friendster.service.UserService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /*
    @Autowired
    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder){
        this.passwordEncoder = passwordEncoder;
    }
*/
    @Override
    public User findByUsername(String username) {
        Optional<User> user = userRepository.findFirstByUsername(username);
        if (!user.isEmpty()) {
            return user.get();
        }
        return null;
    }

    @Override
    public User createUser(UserDTO userDTO) {

        Optional<User> user = userRepository.findFirstByUsername(userDTO.getUsername());

        if(user.isPresent()){
            return null;
        }

        User newUser = new User();
        newUser.setUsername(userDTO.getUsername());
        newUser.setEmail(userDTO.getEmail());
        newUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        newUser.setFirstName(userDTO.getFirstName());
        newUser.setLastName(userDTO.getLastName());
        newUser.setRole(Roles.USER);
        newUser.setLastLogin(LocalDateTime.now());
        newUser.setProfileImagePath(null);
        newUser = userRepository.save(newUser);

        return newUser;
    }

    @Override
    public List<User> findAll() {
        return this.userRepository.findAll();
    }

	@Override
	public User setLastLogin(LocalDateTime time, String username) {
		Optional<User> user = userRepository.findFirstByUsername(username);
		user.get().setLastLogin(LocalDateTime.now());
		userRepository.save(user.get());
		return null;
	}
}
