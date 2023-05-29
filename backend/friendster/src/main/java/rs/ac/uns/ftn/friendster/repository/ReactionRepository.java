package rs.ac.uns.ftn.friendster.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import rs.ac.uns.ftn.friendster.model.entity.Reaction;

@Repository
public interface ReactionRepository extends JpaRepository<Reaction, Long> {
	
	@Modifying
	@Transactional
	@Query(value="DELETE FROM reactions r WHERE r.reactor_id = :reactorId AND r.content_id = :contentId", nativeQuery = true)
	int deleteByReactorAndPost(Long reactorId, Long contentId);
	
	@Query(value="SELECT * FROM reactions WHERE reactor_id = :reactorId AND content_id = :contentId", nativeQuery = true)
	Optional<Reaction> findReactionByReactorAndPost(Long reactorId, Long contentId);

}
