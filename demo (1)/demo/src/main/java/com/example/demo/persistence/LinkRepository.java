package com.example.demo.persistence;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Link;

@Repository
public interface LinkRepository extends MongoRepository<Link, String> {

}
