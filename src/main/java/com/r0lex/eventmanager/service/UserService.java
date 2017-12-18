package com.r0lex.eventmanager.service;

import com.r0lex.eventmanager.model.database.User;
import com.r0lex.eventmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service("userDetailsService")
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void setUser(User user) {
        userRepository.save(user).subscribe();
    }

    public Mono<User> loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findOneByUsername(username);
    }

    public Mono<User> loadUserByToken(String token) {
        return userRepository.findOneByToken(token);
    }

    public Flux<User> getUsers() {
        return userRepository.findAll();
    }
}
