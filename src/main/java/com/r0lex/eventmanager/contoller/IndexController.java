package com.r0lex.eventmanager.contoller;

import com.github.davidmoten.rtree.geometry.Geometries;
import com.r0lex.eventmanager.model.database.Location;
import com.r0lex.eventmanager.service.SpatialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

@RestController
public class IndexController {

    @GetMapping
    Mono<String> indexPage() {
        return Mono.just("Event Manager");
    }

}
