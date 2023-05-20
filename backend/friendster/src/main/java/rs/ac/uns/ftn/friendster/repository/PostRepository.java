package rs.ac.uns.ftn.friendster.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import rs.ac.uns.ftn.friendster.model.entity.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
	
	Optional <List<Post>> findAllByPosterId(Long posterId);

}
