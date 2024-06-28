package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Tag;
import com.example.demo.persistence.TagRepository;

@Service
public class TagService {

    @Autowired
    private TagRepository repository;

    public List<Tag> findAll(){
        return repository.findAll();
    }

    public Tag addTag(Tag tag) {
        return repository.save(tag);
    }

    public void deleteTag(String name) {
        repository.deleteByName(name);
    }
}

