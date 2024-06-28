package com.example.demo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/user")
    public User getUser(@RequestParam String id) {
        Optional<User> user = userService.getUserById(id);
        return user.orElseThrow(() -> new RuntimeException("User not found"));
    }
}
