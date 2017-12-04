package com.r0lex.eventmanager.contoller;

import com.r0lex.eventmanager.model.database.Location;
import com.r0lex.eventmanager.repository.LocationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController("/event/")
public class EventController {
}
