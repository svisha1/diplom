package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public final class Link {

    @Id
    private String id;
    private String elementName;
    private String url;

    public Link(String id, String elementName, String url) {
        this.id = id;
        this.elementName = elementName;
        this.url = url;
    }

    public String getId() {
        return id;
    }

    public String getElementName() {
        return elementName;
    }

    public String getUrl() {
        return url;
    }
}