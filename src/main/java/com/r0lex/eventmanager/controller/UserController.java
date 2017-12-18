package com.r0lex.eventmanager.controller;

import com.r0lex.eventmanager.model.database.User;
import com.r0lex.eventmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    public void setUser(@RequestBody User user) {
        userService.setUser(user);
    }

    @GetMapping
    public Mono<User> getUserByUsername(@RequestParam("username") String username) {
        try {
            return userService.loadUserByUsername(username);
        } catch (UsernameNotFoundException e) {
            return Mono.empty();
        }
    }

    @GetMapping("/token")
    public Mono<User> getUserByToken(@RequestParam("token") String token) {
        return userService.loadUserByToken(token);
    }

    @GetMapping("/all")
    public Flux<User> getUsers() {
        return userService.getUsers();
    }
}
