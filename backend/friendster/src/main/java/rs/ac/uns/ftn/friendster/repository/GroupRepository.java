package rs.ac.uns.ftn.friendster.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import rs.ac.uns.ftn.friendster.model.entity.Group;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
	
	@Modifying
	@Transactional
	@Query(value="UPDATE postgroups SET is_suspended = 1 WHERE id = :id", nativeQuery = true)
	void deleteById(Long id);
}
