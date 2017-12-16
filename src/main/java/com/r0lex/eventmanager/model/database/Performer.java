package com.r0lex.eventmanager.model.database;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "performer")
public class Performer {
    @JsonIgnore
    private String id;
    private String name;
    private String website;
    private String description;
    private String genre;
}
