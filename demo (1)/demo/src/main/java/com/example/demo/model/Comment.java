package com.example.demo.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public final class Comment {

    @Id
    private final String id;
    private final String username;
    private final LocalDateTime timestamp;
    private final String content;

    public Comment(String id, String username, LocalDateTime timestamp, String content) {
        this.id = id;
        this.username = username;
        this.timestamp = timestamp;
        this.content = content;
    }

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public String getContent() {
        return content;
    }
}