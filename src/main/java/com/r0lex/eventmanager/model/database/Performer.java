package com.r0lex.eventmanager.model.database;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Data
@Document(collection = "performer")
public class Performer {
    @Id
    private ObjectId _id;
    private String name;
    private String website;
    private String description;
    private String genre;
}
