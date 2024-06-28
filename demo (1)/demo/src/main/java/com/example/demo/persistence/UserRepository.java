package com.example.demo.persistence;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    boolean existsByEmail(String email);

    User findByEmail(String email);

    void deleteByUsername(String username);

    Optional<User> findByUsername(String username);
}
