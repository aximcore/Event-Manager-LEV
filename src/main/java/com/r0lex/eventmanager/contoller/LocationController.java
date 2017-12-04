package com.r0lex.eventmanager.contoller;

import com.github.davidmoten.rtree.geometry.Geometries;
import com.r0lex.eventmanager.model.database.Location;
import com.r0lex.eventmanager.service.SpatialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController(value = "/location/")
public class LocationController {
    @Autowired
    SpatialService spatialService;

    @GetMapping
    Flux<Location> indexPageWithDistance(
            @RequestParam("latitude") double latitude,
            @RequestParam("longitude") double longitude,
            @RequestParam("distance") double distance) {

        return Flux.fromIterable(spatialService.getCloserAmenities(
                Geometries.point(longitude, latitude),distance
        ));
    }
}
