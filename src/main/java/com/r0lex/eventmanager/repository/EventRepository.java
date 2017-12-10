package com.r0lex.eventmanager.repository;

import com.r0lex.eventmanager.model.database.Event;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface EventRepository extends ReactiveMongoRepository<Event, String> {
    Mono<Event> findById(String id);
    Flux<Event> findByLocationId(String locationId);
}
