package com.r0lex.eventmanager.model.database;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@Document(collection = "event")
public class Event {
    @Id
    private ObjectId _id;
    private String name;
    @CreatedDate
    private LocalDateTime createdDate;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private ObjectId locationId;
    private String description;

    public static int compareByStartDate(Event lhs, Event rhs) {
        return lhs.getStartDate().compareTo(rhs.getStartDate());
    }
}
