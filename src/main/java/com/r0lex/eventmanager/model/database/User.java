package com.r0lex.eventmanager.model.database;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "user")
public class User {
    private String id;
    private String name;
    private String username;
    @JsonIgnore
    private String password;
    private String email;
    private String role;
    private String token;
}
