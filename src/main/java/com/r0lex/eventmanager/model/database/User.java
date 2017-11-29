package com.r0lex.eventmanager.model.database;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Data
@Document(collection = "user")
public class User {
    @Id
    private ObjectId _id;
    private String name;
    private String password;
    private String gender;
    private String facebook_id;
    private String phone_number;
    private String email;
}
