package rs.ac.uns.ftn.friendster.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import rs.ac.uns.ftn.friendster.model.dto.PostDTO;
import rs.ac.uns.ftn.friendster.model.dto.UserDTO;
import rs.ac.uns.ftn.friendster.model.entity.Post;
import rs.ac.uns.ftn.friendster.model.entity.User;
import rs.ac.uns.ftn.friendster.security.TokenUtils;
import rs.ac.uns.ftn.friendster.service.PostService;

@RestController
@RequestMapping("api/posts")
public class PostController {
	
	@Autowired
	PostService postService;
	
	@Autowired
	TokenUtils tokenUtils;
	
	@GetMapping("/all")
	public List<Post> loadAll() {
		return this.postService.findAll();
	}
	
	@GetMapping("/{id}")
	@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
	public Post GetPostById(@PathVariable Long id) {
		return this.postService.findById(id);
	}
	
	@GetMapping("/user/{id}")
	@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
	public List<Post> GetPostByPosterId(@PathVariable Long id) {
		return this.postService.findAllByPosterId(id);
	}
	
	@PostMapping("/create")
	@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
	public ResponseEntity<PostDTO> create(@RequestBody @Validated PostDTO newPost){
		
		Post createdPost = postService.createPost(newPost);

		if (createdPost == null) {
			return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
		}
		PostDTO postDTO = new PostDTO(createdPost);

		return new ResponseEntity<>(postDTO, HttpStatus.CREATED);
	}
	
	@PostMapping("/edit/{id}")
	@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
	public ResponseEntity<PostDTO> GetPostByPosterId(@PathVariable Long id, @RequestBody @Validated PostDTO editedPost) {
		
		if (editedPost.getPosterId() == id) {
		Post post = postService.editPost(editedPost, editedPost.getId());
		
		if (post == null) {
			return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
		}
		PostDTO postDTO = new PostDTO(post);

		return new ResponseEntity<>(postDTO, HttpStatus.CREATED);
	} else {
		return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
	}
	}
	
	@PostMapping("/delete/{id}")
	@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
	public ResponseEntity<PostDTO> deletePost(@PathVariable Long id, @RequestBody @Validated PostDTO postToDelete) {
		
		if (postToDelete.getPosterId() == id) {
			
			postService.deletePost(postToDelete.getId());
			
			return new ResponseEntity<>(postToDelete, HttpStatus.ACCEPTED);
			
		} else {
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}
	}
	
}
