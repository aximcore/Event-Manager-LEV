package com.r0lex.eventmanager.model.database;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "location")
public class Location {
    @Id
    private ObjectId _id;
    private String name;
    private String amenity;
    @JsonProperty("point_wkt")
    private String pointWkt;
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
