package com.example.demo.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Capsule;
import com.example.demo.persistence.CapsuleRepository;

@Service
public class CapsuleService {

    @Autowired
    private CapsuleRepository repository;

    public List<Capsule> findAll(){
        return repository.findAll();
    }
    
    
}
