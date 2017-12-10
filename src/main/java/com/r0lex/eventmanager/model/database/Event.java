package com.r0lex.eventmanager.model.database;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@Document(collection = "event")
public class Event {
    private String id;
    private String name;
    @CreatedDate
    private LocalDateTime createdDate;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String locationId;
    private String description;

    public static int compareByStartDate(Event lhs, Event rhs) {
        return lhs.getStartDate().compareTo(rhs.getStartDate());
    }
}
