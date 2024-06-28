
package com.example.demo.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

// Основной класс Capsule
@Document
public final class Capsule {

    @Id
    private  String id;
    private  String name;
    private  String description;
    private  List<String> tagsId;
    private List<Link> links;
    private  List<String> photos;
    private  String creatorName;
    private  List<String> commentsId;
    private  int likes;


    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public List<String> getTags() {
        return tagsId;
    }

    public List<Link> getLinks() {
        return links;
    }

    public void setLinks(List<Link> links) {
        this.links = links;
    }

    public List<String> getPhotos() {
        return photos;
    }

    public String getCreatorName() {
        return creatorName;
    }

    public List<String> getComments() {
        return commentsId;
    }

    public int getLikes() {
        return likes;
    }
}
