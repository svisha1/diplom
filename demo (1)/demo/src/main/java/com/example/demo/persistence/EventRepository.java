package com.example.demo.persistence;

import java.time.LocalDateTime;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Event;

@Repository
public interface EventRepository extends MongoRepository<Event,  String> {
    void deleteByDate(LocalDateTime date);
}
