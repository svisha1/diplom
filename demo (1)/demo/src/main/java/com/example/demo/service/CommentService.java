package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Comment;
import com.example.demo.persistence.CommentRepository;

@Service
public class CommentService {

     @Autowired
    private CommentRepository repository;

    public List<Comment> findAll(){
        return repository.findAll();
    }

}
