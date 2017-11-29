package com.r0lex.eventmanager.contoller;

import com.github.davidmoten.rtree.geometry.Geometries;
import com.r0lex.eventmanager.model.database.Location;
import com.r0lex.eventmanager.service.SpatialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.util.ArrayList;
import java.util.List;

@RestController
public class IndexController {

    @Autowired
    private SpatialService spatialService;

    @GetMapping("/")
    Flux<Location> indexPage() {
        List<Location> lista = spatialService.getCloserAmenities(
                Geometries.point(19.070410, 47.497988),
                5000.0
        );

        return Flux.fromIterable(lista);
    }
}
