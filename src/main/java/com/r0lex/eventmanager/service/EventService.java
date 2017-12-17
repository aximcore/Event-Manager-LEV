package com.r0lex.eventmanager.service;

import com.github.davidmoten.rtree.geometry.Geometries;
import com.r0lex.eventmanager.model.PerformerLocationAndEvent;
import com.r0lex.eventmanager.model.database.Event;
import com.r0lex.eventmanager.model.database.EventPerformerPair;
import com.r0lex.eventmanager.model.database.Location;
import com.r0lex.eventmanager.model.database.Performer;
import com.r0lex.eventmanager.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private SpatialService spatialService;
    @Autowired
    private PerformerService performerService;

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

    public Flux<PerformerLocationAndEvent> getEventsGroupByLocation(double latitude, double longitude, double distanceInKm) {
        Flux<Location> locations = spatialService.getCloserPlaces(Geometries.point(longitude, latitude), distanceInKm);
        return locations
                .map(location ->
                {
                    PerformerLocationAndEvent temp = new PerformerLocationAndEvent();
                    temp.setLocation(location);
                    temp.setEvents(getEventsByPlace(location.getId(), Optional.empty()).collectList().block());

                    List<Performer> performers = new ArrayList<>();
                    for (Event event : temp.getEvents())
                        for (EventPerformerPair pair : event.getPerformers()) {
                            Performer performer = performerService.getPerformerById(pair.getPerformerId()).block();
                            if(!performers.contains(performer))
                                performers.add(performer);
                        }

                    temp.setPerformers(performers);
                    return temp;
                })
                .filter(entry -> !entry.getEvents().isEmpty());
    }
}
