package rs.ac.uns.ftn.friendster.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import rs.ac.uns.ftn.friendster.model.entity.User;
import rs.ac.uns.ftn.friendster.service.UserService;

@Component
public class WebSecurity {

    @Autowired
    private UserService userService;
}
