package com.r0lex.eventmanager.contoller;

import com.github.davidmoten.rtree.geometry.Geometries;
import com.r0lex.eventmanager.model.database.Location;
import com.r0lex.eventmanager.service.SpatialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.util.Optional;

@RestController
@RequestMapping("/location")
public class LocationController {
    @Autowired
    SpatialService spatialService;

    @GetMapping
    Flux<Location> indexPageWithDistance(
                    @RequestParam("latitude") double latitude,
                    @RequestParam("longitude") double longitude,
                    @RequestParam("distance") double distance,
                    @RequestParam("category") Optional<String> category) {

        if (category.isPresent())
            return Flux.fromIterable(spatialService.getCloserPlacesByCategory(
                    Geometries.point(longitude, latitude),distance, category.get()
            ));
        else
            return Flux.fromIterable(spatialService.getCloserPlaces(
                    Geometries.point(longitude, latitude),distance
            ));
    }
}
