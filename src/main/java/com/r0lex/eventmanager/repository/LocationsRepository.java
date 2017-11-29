package com.r0lex.eventmanager.repository;

import com.r0lex.eventmanager.model.database.Location;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface LocationsRepository extends ReactiveMongoRepository<Location, String> {
    Flux<Location> findAllByAmenity(String amenity);
    Location findBy_id(ObjectId _id);
}
