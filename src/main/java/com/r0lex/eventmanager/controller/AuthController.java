package com.r0lex.eventmanager.controller;

import com.r0lex.eventmanager.model.database.User;
import com.r0lex.eventmanager.model.UserCredential;
import com.r0lex.eventmanager.service.TokenService;
import com.r0lex.eventmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserService userService;

    @Autowired
    TokenService tokenService;

    @PostMapping
    Mono<User> auth(
            @RequestBody UserCredential credential
    ) {
        User user = userService.loadUserByUsername(credential.getUsername()).block();

        if(passwordEncoder.matches(credential.getPassword(), user.getPassword())) {
            user.setToken(tokenService.generate(32));
            userService.setUser(user);

            return Mono.just(user);
        }

        return Mono.empty();
    }

}
