package com.r0lex.eventmanager.repository;

import com.r0lex.eventmanager.model.database.Performer;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PerformerRepository extends ReactiveMongoRepository<Performer, String> {

}
