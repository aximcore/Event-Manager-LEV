package com.r0lex.eventmanager.model.database;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "location")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Location {
    private String id;
    private String name;
    private String amenity;
    private String point_wkt;
    private String postcode;
    private String city;
    private String street;
    private String capacity;
    private String email;
    private String facebook;
    private String opening_hours;
    private String website;
    private String wheelchair;
}
