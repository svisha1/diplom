package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Capsule;
import com.example.demo.service.CapsuleService;

@RestController
@RequestMapping("/api")
public class CapsuleController {

    @Autowired
    private CapsuleService capsuleService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/capsules")
    public List<Capsule> getCapsules() {
        return capsuleService.findAll();
    }

}
