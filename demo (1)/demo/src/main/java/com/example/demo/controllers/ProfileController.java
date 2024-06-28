package com.example.demo.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.User;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:3000")
public class ProfileController {

    @Autowired
    private UserService userService;

    @GetMapping("/{email}")
    public User getUserById(@PathVariable String email) {
        User user = userService.findByEmail(email);
        return user;
    }

    @PutMapping("/{email}")
    public ResponseEntity<User> updateUserProfile(
            @PathVariable String email,
            @RequestParam String username,
            @RequestParam String description,
            @RequestParam(required = false) MultipartFile avatar) {


        User user = userService.findByEmail(email);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        user.setUsername(username);
        user.setDescription(description);
        if (avatar != null && !avatar.isEmpty()) {
            try {
                String avatarUrl = userService.saveAvatar(avatar);
                user.setAvatar(avatarUrl);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        userService.save(user);

        return ResponseEntity.ok(user);
    }
}
