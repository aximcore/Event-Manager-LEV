package com.r0lex.eventmanager.model.database;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "news")
public class News {
    @Id
    private ObjectId _id;
    private String title;
    private String content;
    private LocalDateTime time;
}
