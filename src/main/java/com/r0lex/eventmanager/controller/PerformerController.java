package com.r0lex.eventmanager.controller;

import com.r0lex.eventmanager.model.database.Performer;
import com.r0lex.eventmanager.service.PerformerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/performer")
public class PerformerController {
    @Autowired
    private PerformerService performerService;

    @GetMapping("/all")
    public Flux<Performer> getAll() {
        return performerService.getPerformers();
    }

    @GetMapping
    public Mono<Performer> getById(@RequestParam("id") String id) {
        return performerService.getPerformerById(id);
    }

    @PostMapping
    public void insert(@RequestBody Performer performer) {
        performerService.createPerformer(performer);
    }
}
