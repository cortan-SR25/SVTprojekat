package rs.ac.uns.ftn.friendster.service;

import java.util.List;

import rs.ac.uns.ftn.friendster.model.dto.PostDTO;
import rs.ac.uns.ftn.friendster.model.entity.Post;

public interface PostService {
	
	Post findById(Long id);
	
	Post createPost(PostDTO post);
	
	List<Post> findAllByPosterId(Long posterId);

	List<Post> findAll();

	void deletePost(Long id);
	
	Post editPost(PostDTO postDTO, Long id);
}
