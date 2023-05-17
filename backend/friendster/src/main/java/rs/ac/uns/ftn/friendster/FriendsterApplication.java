package rs.ac.uns.ftn.friendster;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.reactive.ReactiveSecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.web.reactive.ReactiveMultipartAutoConfiguration;

@SpringBootApplication
public class FriendsterApplication {

	public static void main(String[] args) {
		SpringApplication.run(FriendsterApplication.class, args);
	}

}
