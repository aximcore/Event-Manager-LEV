package com.r0lex.eventmanager.model.database;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "event")
public class Event {
    private String id;
    private String name;
    @CreatedDate
    private LocalDateTime createdDate;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime startDate;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime endDate;
    private String locationId;
    private String description;
    private List<EventPerformerPair> performers;

    public static int compareByStartDate(Event lhs, Event rhs) {
        return lhs.getStartDate().compareTo(rhs.getStartDate());
    }
}
