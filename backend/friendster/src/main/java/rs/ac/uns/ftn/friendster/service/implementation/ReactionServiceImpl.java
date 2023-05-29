package rs.ac.uns.ftn.friendster.service.implementation;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rs.ac.uns.ftn.friendster.model.dto.ReactionDTO;
import rs.ac.uns.ftn.friendster.model.entity.Post;
import rs.ac.uns.ftn.friendster.model.entity.Reaction;
import rs.ac.uns.ftn.friendster.model.entity.ReactionType;
import rs.ac.uns.ftn.friendster.model.entity.User;
import rs.ac.uns.ftn.friendster.repository.PostRepository;
import rs.ac.uns.ftn.friendster.repository.ReactionRepository;
import rs.ac.uns.ftn.friendster.repository.UserRepository;
import rs.ac.uns.ftn.friendster.service.ReactionService;

@Service
public class ReactionServiceImpl implements ReactionService {

	@Autowired
	private ReactionRepository reactionRepository;
	
	@Autowired
	private PostRepository postRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public Reaction createReaction(ReactionDTO reactionDTO) {
		Reaction oldReaction = new Reaction();
		try {
		oldReaction = reactionRepository.findReactionByReactorAndPost(
				reactionDTO.getReactorId(), reactionDTO.getContentId()).get();
		} catch (Exception e) {
			
		}
		
		Reaction newReaction = new Reaction();
		User user = userRepository.findById(reactionDTO.getReactorId()).get();
		Post post = postRepository.findById(reactionDTO.getContentId()).get();
		newReaction.setPost(post);
		newReaction.setReactor(user);
		
		if (oldReaction.getId() != null && oldReaction.getId() != 0) {
			//oldReaction.setPost(post);
			//oldReaction.setReactor(user);
			reactionRepository.deleteByReactorAndPost(reactionDTO.getReactorId(), reactionDTO.getContentId());
		}
		
		if (reactionDTO.getType().equals("LIKE")) {
			newReaction.setType(ReactionType.LIKE);
		} else if (reactionDTO.getType().equals("HEART")) {
			newReaction.setType(ReactionType.HEART);
		} else {
			newReaction.setType(ReactionType.DISLIKE);
		}
		newReaction.setTimestamp(LocalDateTime.now());
		
		reactionRepository.save(newReaction);
		
		return null;
	}

	@Override
	public void deleteReaction(ReactionDTO reactionDTO) {
		
		Reaction reaction = reactionRepository.findReactionByReactorAndPost(
				reactionDTO.getReactorId(), reactionDTO.getContentId()).get();
		
		if (reaction != null) {
			reactionRepository.deleteByReactorAndPost(reactionDTO.getReactorId(), reactionDTO.getContentId());
		}
		
	}
	
	

}
