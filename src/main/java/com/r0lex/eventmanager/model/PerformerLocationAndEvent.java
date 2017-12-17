package com.r0lex.eventmanager.model;

import com.r0lex.eventmanager.model.database.Event;
import com.r0lex.eventmanager.model.database.Location;
import com.r0lex.eventmanager.model.database.Performer;
import lombok.Data;

import java.util.List;

@Data
public class PerformerLocationAndEvent {
    private Location location;
    private List<Event> events;
    private List<Performer> performers;
}
