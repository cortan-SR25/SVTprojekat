package rs.ac.uns.ftn.friendster.model.entity;

import java.time.LocalDateTime;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "reactions")
public class Reaction {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private ReactionType type;
	
	@Column(nullable = false)
	private LocalDateTime timestamp;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(nullable = false, name = "reactor_id", referencedColumnName = "id")
	private User reactor;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(nullable = false, name = "content_id", referencedColumnName = "id")
	private Post post;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public ReactionType getType() {
		return type;
	}

	public void setType(ReactionType type) {
		this.type = type;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}

	public User getReactor() {
		return reactor;
	}

	public void setReactor(User reactor) {
		this.reactor = reactor;
	}

	public Post getPost() {
		return post;
	}

	public void setPost(Post post) {
		this.post = post;
	}

}
