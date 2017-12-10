package com.r0lex.eventmanager.controller;

import com.r0lex.eventmanager.model.database.Event;
import com.r0lex.eventmanager.service.EventService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/event")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping("/insert")
    public void createEvent() {
        // TEST
        Event event = new Event();
        event.setLocationId(new ObjectId("5a09ed26e2c1d977cf2f10f2"));
        event.setEndDate(LocalDateTime.now());
        event.setStartDate(LocalDateTime.now());
        event.setName("TiszaNekeresd");
        event.setDescription("LeFeliras");
        eventService.setEvent(event);
    }

    @GetMapping
    public Flux<Event> getEvents() {
        return eventService.getEvents();
    }
}
