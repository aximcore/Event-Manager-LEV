package com.r0lex.eventmanager.service;

import com.github.davidmoten.rtree.geometry.Geometries;
import com.github.davidmoten.rtree.geometry.Point;
import com.r0lex.eventmanager.model.database.Event;
import com.r0lex.eventmanager.repository.EventRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import java.util.Optional;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private SpatialService spatialService;

    public Flux<Event> getEventsByPlace(String locationId, Optional<Integer> limit) {
        if (limit.isPresent()) {
            return eventRepository.findByLocationId(locationId)
                    .sort(Event::compareByStartDate)
                    .takeLast(limit.get());
        } else {
            return eventRepository.findByLocationId(locationId)
                    .sort(Event::compareByStartDate);
        }
    }

    public void setEvent(Event event) {
        eventRepository.save(event).subscribe();
    }

    public Flux<Event> getEvents() {
        return eventRepository.findAll();
    }

    public Mono<Event> getEventById(String id) {
        return eventRepository.findById(id);
    }

    public Flux<Event> getEventsByCoordinate(double latitude, double longitude, double distanceInKm,
                                             Optional<String> category) {
        if (category.isPresent())
            return spatialService.getCloserPlacesByCategory(Geometries.point(longitude, latitude), distanceInKm, category.get())
                .flatMap(location -> getEventById(location.getId()));
        else
            return spatialService.getCloserPlaces(Geometries.point(longitude, latitude), distanceInKm)
                .flatMap(location -> getEventById(location.getId()));
    }
}
