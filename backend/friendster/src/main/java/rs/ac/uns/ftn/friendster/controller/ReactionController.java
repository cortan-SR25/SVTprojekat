package rs.ac.uns.ftn.friendster.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import rs.ac.uns.ftn.friendster.model.dto.ReactionDTO;
import rs.ac.uns.ftn.friendster.service.ReactionService;

@RestController
@RequestMapping("api/reactions")
public class ReactionController {
	
	@Autowired
	private ReactionService reactionService;
	
	@PostMapping("/create")
	public void createReaction(@RequestBody @Validated ReactionDTO reaction) {
		reactionService.createReaction(reaction);
	}
	
	@PostMapping("/delete")
	public void deleteReaction(@RequestBody @Validated ReactionDTO reaction) {
		reactionService.deleteReaction(reaction);
	}

}
