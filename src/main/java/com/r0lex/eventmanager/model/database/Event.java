package com.r0lex.eventmanager.model.database;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@Document(collection = "event")
public class Event {
    @Id
    private ObjectId _id;
    private String name;
    private LocalDateTime start_date;
    private LocalDateTime end_date;
    private ObjectId location_id;
    private String description;
}
