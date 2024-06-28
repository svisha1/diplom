package com.example.demo.persistence;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Capsule;

@Repository
public interface CapsuleRepository extends MongoRepository<Capsule, String> {

}
