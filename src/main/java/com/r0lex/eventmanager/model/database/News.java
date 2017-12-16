package com.r0lex.eventmanager.model.database;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "news")
public class News {
    private String id;
    private String title;
    private String content;
    private LocalDateTime time;
    private String performerId;
    private String eventId;
}
