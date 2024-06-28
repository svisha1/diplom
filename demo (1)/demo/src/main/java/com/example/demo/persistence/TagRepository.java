package com.example.demo.persistence;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Tag;

@Repository
public interface TagRepository extends MongoRepository<Tag, ObjectId>{

    void deleteByName(String name);
}
