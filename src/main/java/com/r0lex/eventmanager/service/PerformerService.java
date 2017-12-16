package com.r0lex.eventmanager.service;

import com.r0lex.eventmanager.model.database.Performer;
import com.r0lex.eventmanager.repository.PerformerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class PerformerService {
    @Autowired
    private PerformerRepository performerRepository;

    public Mono<Performer> getPerformerById(String id) {
        return performerRepository.findById(id);
    }

    public Flux<Performer> getPerformers() {
        return performerRepository.findAll();
    }

    public void createPerformer(Performer performer) {
        performerRepository.save(performer).subscribe();
    }
}
