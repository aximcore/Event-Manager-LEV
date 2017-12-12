package com.r0lex.eventmanager.config;

import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import com.r0lex.eventmanager.repository.LocationsRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractReactiveMongoConfiguration;
import org.springframework.data.mongodb.core.mapping.event.LoggingEventListener;
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories;

@Configuration
@EnableReactiveMongoRepositories(basePackages = {"com.r0lex.eventmanager.repository"})
public class MongoConfig extends AbstractReactiveMongoConfiguration{
    @Override
    protected String getDatabaseName() {
        return "event_manager";
    }

    @Bean
    public LoggingEventListener mongoEventListener() {
        return new LoggingEventListener();
    }

    @Override
    public MongoClient reactiveMongoClient() {
        return MongoClients.create();
    }
}
