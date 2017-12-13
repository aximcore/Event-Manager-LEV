package com.r0lex.eventmanager.repository;

import com.r0lex.eventmanager.model.database.User;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface UserRepository extends ReactiveMongoRepository<User, String> {

    User findOneByUsername(String username);

}
