package com.mongo_db_viewer.mongodb.controller;

import com.mongo_db_viewer.mongodb.service.MongoService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api")
public class MongoController {

    @Autowired
    private MongoService mongoService;

    @PostMapping("/connect")
    public String connect(@RequestParam String mongoUri) {
        try {
            mongoService.connectToMongoDB(mongoUri);
            return "Connected to MongoDB successfully!";
        } catch (Exception e) {
            return "Failed to connect to MongoDB : "+ e.getMessage();
        }
    }

    @GetMapping("/database")
    public List<String> getDatabase() {
        return mongoService.getDatabase();
    }

    @GetMapping("/collections")
    public List<String> getCollections(@RequestParam String dbName) {
        return mongoService.getCollections(dbName);
    }

    @GetMapping("/documents")
    public List<Object> getDocuments(@RequestParam String dbName, @RequestParam String collectionName) {
        return mongoService.getDocuments(dbName, collectionName);
    }

    @PostMapping("/query")
    public List<Object> queryCollections(@RequestParam String dbName, @RequestParam String collectionNames, @RequestBody String filterJson) {
        return mongoService.queryCollections(dbName, collectionNames, filterJson);
    }

}
