package rs.ac.uns.ftn.friendster.service;

import rs.ac.uns.ftn.friendster.model.dto.ReactionDTO;
import rs.ac.uns.ftn.friendster.model.entity.Reaction;

public interface ReactionService {
	
	Reaction createReaction(ReactionDTO reactionDTO);
	
	void deleteReaction(ReactionDTO reactionDTO);
}
