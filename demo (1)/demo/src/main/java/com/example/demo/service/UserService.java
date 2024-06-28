package com.example.demo.service;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.User;
import com.example.demo.persistence.UserRepository;


@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    private final String uploadDir = "uploads/avatars/";

    public List<User> findAll(){
        return repository.findAll();
    }

    public Optional<User> getUserById(String id) {
        return repository.findById(id);
    }

    public void saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        repository.save(user);
    }

    public boolean existsByEmail(String email) {
        return repository.existsByEmail(email);
    }

    public User findByEmail(String email) {
        return repository.findByEmail(email);
    }
    public User addUser(User user) {
        return repository.save(user);
    }

    public void deleteUser(String username) {
        repository.deleteByUsername(username);
    }

    public User updateUser(User user) {
        // Проверка существования пользователя перед обновлением
        User existingUser = repository.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + user.getId()));
        return repository.save(user);
    }

    public User updateUserRole(String email, String newRole) {
        User user = repository.findByEmail(email);
        user.setRole(newRole);
        return repository.save(user);
    }

    public void save(User user) {
        repository.save(user);
    }

        public String saveAvatar(MultipartFile avatar) throws IOException {
        // Создаем директорию, если она не существует
        File uploadDirectory = new File(uploadDir);
        if (!uploadDirectory.exists()) {
            uploadDirectory.mkdirs();
        }

        // Сохраняем файл
        String avatarFilename = System.currentTimeMillis() + "_" + avatar.getOriginalFilename();
        File avatarFile = new File(uploadDir + avatarFilename);
        avatar.transferTo(avatarFile);

        // Возвращаем путь к файлу или URL
        return avatarFile.getAbsolutePath();
    }
}
