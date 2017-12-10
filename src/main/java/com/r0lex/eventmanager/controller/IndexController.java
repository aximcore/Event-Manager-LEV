package com.r0lex.eventmanager.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class IndexController {

    @GetMapping
    Mono<String> indexPage() {
        return Mono.just("Event Manager");
    }

}
