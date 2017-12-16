package com.r0lex.eventmanager.controller;

import com.r0lex.eventmanager.model.database.Event;
import com.r0lex.eventmanager.service.EventService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/event")
public class EventController {

    @Autowired
    private EventService eventService;

    @PostMapping
    public void createEvent(@RequestBody Event event) {
        eventService.setEvent(event);
    }

    @GetMapping("/all")
    public Flux<Event> getEvents() {
        return eventService.getEvents();
    }

    @GetMapping
    public Mono<Event> getEventById(@RequestParam("id") String id) {
        return eventService.getEventById(id);
    }

    @GetMapping("/coordinate")
    public Flux<Event> getEventsByCoordinate(@RequestParam("latitude") double latitude,
                                             @RequestParam("longitude") double longitude,
                                             @RequestParam("distance") double distance,
                                             @RequestParam(required = false, name = "category")
                                                         Optional<String> category) {
        return eventService.getEventsByCoordinate(latitude, longitude, distance, category);
    }

    @GetMapping("/location")
    public Flux<Event> getEventsByLocation(@RequestParam("location") String location,
                                        @RequestParam(required=false, name = "limit") Optional<Integer> limit) {
        return eventService.getEventsByPlace(location, limit);
    }

}
