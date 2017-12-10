package com.r0lex.eventmanager.model.database;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "user")
public class User {
    private String id;
    private String name;
    private String password;
    private String gender;
    private String facebook_id;
    private String phone_number;
    private String email;
}
