package com.example.demo.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class DataController {

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/data")
    public String getData() {
        return "Hello, World!";
    }
}