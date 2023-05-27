package rs.ac.uns.ftn.friendster.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import rs.ac.uns.ftn.friendster.model.dto.JwtAuthenticationRequest;
import rs.ac.uns.ftn.friendster.model.dto.UserDTO;
import rs.ac.uns.ftn.friendster.model.dto.UserTokenState;
import rs.ac.uns.ftn.friendster.model.entity.User;
import rs.ac.uns.ftn.friendster.security.TokenUtils;
import rs.ac.uns.ftn.friendster.service.UserService;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("api/users")
public class UserController {

	@Autowired
	UserService userService;

	@Autowired
	UserDetailsService userDetailsService;

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	TokenUtils tokenUtils;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	@PostMapping("/register")
	public ResponseEntity<UserDTO> create(@RequestBody @Validated UserDTO newUser) {

		User createdUser = userService.createUser(newUser);

		if (createdUser == null) {
			return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
		}
		UserDTO userDTO = new UserDTO(createdUser);

		return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
	}

	@PostMapping("/login")
	public ResponseEntity<UserTokenState> createAuthenticationToken(
			@RequestBody JwtAuthenticationRequest authenticationRequest, HttpServletResponse response) {

		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
				authenticationRequest.getUsername(), authenticationRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		UserDetails user = (UserDetails) authentication.getPrincipal();
		String jwt = tokenUtils.generateToken(user);
		int expiresIn = tokenUtils.getExpiredIn();
		
		userService.setLastLogin(LocalDateTime.now(), authenticationRequest.getUsername());

		return ResponseEntity.ok(new UserTokenState(jwt, expiresIn));
	}

	@GetMapping("/all")
	@PreAuthorize("hasRole('ADMIN')")
	public List<User> loadAll() {
		return this.userService.findAll();
	}

	@GetMapping("/whoami")
	public User user(Principal user) {
		return this.userService.findByUsername(user.getName());
	}
	
	@PostMapping("/edit")
	public void editUser(Principal user, @RequestBody @Validated UserDTO userDTO) {
		User foundUser = this.userService.findByUsername(user.getName());
		foundUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));
		this.userService.edit(foundUser);
	}
}
