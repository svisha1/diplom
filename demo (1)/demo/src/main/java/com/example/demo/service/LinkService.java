package com.example.demo.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Link;
import com.example.demo.persistence.LinkRepository;

@Service
public class LinkService {

    @Autowired
    private LinkRepository repository;

    public List<Link> findAll(){
        return repository.findAll();
    }
}
