package com.example.demo.controllers;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Event;
import com.example.demo.model.Tag;
import com.example.demo.model.User;
import com.example.demo.service.EventService;
import com.example.demo.service.TagService;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private TagService tagService;

    @Autowired
    private EventService eventService;

    @Autowired
    private UserService userService;

     @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/tags")
    public List<Tag> getTags() {
        return tagService.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/tags")
    public ResponseEntity<Tag> addTag(@RequestBody Tag tag) {
        return ResponseEntity.ok(tagService.addTag(tag));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/tags/{name}")
    public ResponseEntity<Void> deleteTag(@PathVariable String name) {
        tagService.deleteTag(name);
        return ResponseEntity.noContent().build();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/events")
    public List<Event> getEvents() {
        return eventService.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/events")
    public ResponseEntity<Event> addEvent(@RequestBody Event event) {
        return ResponseEntity.ok(eventService.addEvent(event));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PatchMapping("/events/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable String id, @RequestBody Event updatedEvent) {
    // Поиск события по его идентификатору
    Event eventToUpdate = eventService.findById(id);
    
    // Проверка, найдено ли событие
    if (eventToUpdate == null) {
        return ResponseEntity.notFound().build(); // Если событие не найдено, возвращаем код 404 Not Found
    }
    
    // Обновление данных события
    eventToUpdate.setTitle(updatedEvent.getTitle());
    eventToUpdate.setText(updatedEvent.getText());
    eventToUpdate.setDate(updatedEvent.getDate());
    
    // Сохранение обновленного события
    Event savedEvent = eventService.save(eventToUpdate);
    
    return ResponseEntity.ok(savedEvent); // Возвращаем обновленное событие с кодом 200 OK
}

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/events/{date}")
    public ResponseEntity<Void> deleteEvent(@PathVariable LocalDateTime date) {
        eventService.deleteEvent(date);
        return ResponseEntity.noContent().build();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PatchMapping("/users/{email}")
    public ResponseEntity<User> updateUserRole(@PathVariable String email, @RequestBody User user) {
        return ResponseEntity.ok(userService.updateUserRole(email, user.getRole()));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/users/{username}")
    public ResponseEntity<Void> deleteUser(@PathVariable String username) {
        userService.deleteUser(username);
        return ResponseEntity.noContent().build();
    }
}

