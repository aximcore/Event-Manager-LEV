package com.r0lex.eventmanager.model.database;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "performer")
public class Performer {
    private String id;
    private String name;
    private String website;
    private String description;
    private String genre;
}
