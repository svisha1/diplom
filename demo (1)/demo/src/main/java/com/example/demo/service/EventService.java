package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Event;
import com.example.demo.persistence.EventRepository;

@Service
public class EventService {

    @Autowired
    private EventRepository repository;

    public List<Event> findAll(){
        return repository.findAll();
    }
    public Event addEvent(Event event) {
        return repository.save(event);
    }

    public void deleteEvent(LocalDateTime date) {
        repository.deleteByDate(date);
    }

    public Event updateEvent(Event event) {
        // Проверка существования события перед обновлением
        Event existingEvent = repository.findById(event.getId())
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + event.getId()));
        return repository.save(event);
    }

    public Event findById(String id) {
        return repository.findById(id).orElse(null);
    }

    public Event save(Event event) {
        return repository.save(event);
    }
}
