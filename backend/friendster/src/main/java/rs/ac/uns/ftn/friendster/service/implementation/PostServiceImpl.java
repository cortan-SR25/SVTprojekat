package rs.ac.uns.ftn.friendster.service.implementation;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import rs.ac.uns.ftn.friendster.model.dto.PostDTO;
import rs.ac.uns.ftn.friendster.model.entity.Post;
import rs.ac.uns.ftn.friendster.model.entity.User;
import rs.ac.uns.ftn.friendster.repository.PostRepository;
import rs.ac.uns.ftn.friendster.repository.UserRepository;
import rs.ac.uns.ftn.friendster.service.PostService;

@Service
public class PostServiceImpl implements PostService {
	
	@Autowired
	private PostRepository postRepository;
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public Post findById(Long id) {
		// TODO Auto-generated method stub
		return postRepository.findById(id).get();
	}

	@Override
	public Post createPost(PostDTO post) {
		// TODO Auto-generated method stub
		Post newPost = new Post();
		User poster = userRepository.findFirstByUsername(post.getPoster()).get();
		newPost.setContent(post.getContent());
		newPost.setPoster(poster);
		newPost.setCreationDate(LocalDateTime.now());
		//newPost.setGroup(null);
		return postRepository.save(newPost);
	}

	@Override
	public List<Post> findAllByPosterId(Long posterId) {
		// TODO Auto-generated method stub
		return postRepository.findAllByPosterId(posterId).get();
	}

	@Override
	public List<Post> findAll() {
		// TODO Auto-generated method stub
		return postRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
	}
	
	@Override
	public void deletePost(Long id) {
		postRepository.deleteById(id);
	}
	
	@Override
	public Post editPost(PostDTO postDTO, Long id) {
		Post editedPost = postRepository.findById(id).get();
		editedPost.setContent(postDTO.getContent());
		return postRepository.save(editedPost);
	}

}
