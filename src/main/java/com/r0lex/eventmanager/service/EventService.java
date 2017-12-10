package com.r0lex.eventmanager.service;

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
        eventRepository.insert(Mono.just(event));
    }

    public Flux<Event> getEvents() {
        return eventRepository.findAll();
    }
}
