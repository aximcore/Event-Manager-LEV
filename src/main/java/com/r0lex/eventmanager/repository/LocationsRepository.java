package com.r0lex.eventmanager.repository;

import com.r0lex.eventmanager.model.database.Location;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface LocationsRepository extends ReactiveMongoRepository<Location, String> {
    Flux<Location> findAllByAmenity(String amenity);
    Mono<Location> findBy_id(ObjectId _id);
    Flux<Location> findAllByNameContainsIgnoreCase(String name);
    Flux<Location> findAllByCityContains(String city);
}
