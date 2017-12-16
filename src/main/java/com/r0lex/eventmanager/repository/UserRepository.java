package com.r0lex.eventmanager.repository;

import com.r0lex.eventmanager.model.database.User;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface UserRepository extends ReactiveMongoRepository<User, String> {

    Mono<User> findOneByUsername(String username);
    Mono<User> findOneByToken(String token);

}
