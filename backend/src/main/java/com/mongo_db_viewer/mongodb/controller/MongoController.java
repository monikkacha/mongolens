package com.mongo_db_viewer.mongodb.controller;

import com.mongo_db_viewer.mongodb.dto.DBRequest;
import com.mongo_db_viewer.mongodb.service.MongoService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class MongoController {

    private final MongoService mongoService;

    @PostMapping("/connect")
    public String connect(@RequestParam String mongoUri) {
        try {
            mongoService.connectToMongoDB(mongoUri);
            return "Connected to MongoDB successfully!";
        } catch (Exception e) {
            return "Failed to connect to MongoDB : " + e.getMessage();
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
    public List<Object> queryCollections(@RequestBody DBRequest dbRequest) {
        return mongoService.queryCollections(dbRequest.getDbName(), dbRequest.getCollectionName(), dbRequest.getFilterJson());
    }

    @PostMapping("/aggregate")
    public List<Object> aggregateCollections(@RequestBody DBRequest dbRequest) {
        return mongoService.aggregateCollections(
                dbRequest.getDbName(),
                dbRequest.getCollectionName(),
                dbRequest.getAggregateJson());
    }

    @PostMapping("/database")
    public ResponseEntity createDatabase(@RequestParam String db, @RequestParam String collection) {
        mongoService.createDatabase(db, collection);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/collection")
    public ResponseEntity createCollection(@RequestParam String db, @RequestParam String collection) {
        mongoService.createCollection(db, collection);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/insert-single")
    public ResponseEntity insertSingleData(@RequestParam String db, @RequestParam String collection, @RequestBody Document document) {
        mongoService.insertDocument(db, collection, document);
        return ResponseEntity.ok().build();
    }


    // TODO :: bug here
    @PostMapping("/insert-multiple")
    public ResponseEntity insertMultipleData(@RequestParam String db, @RequestParam String collection, @RequestBody List<Document> documents) {
        mongoService.insertDocuments(db, collection, documents);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/database")
    public ResponseEntity deleteDatabase(@RequestParam String db) {
        mongoService.deleteDatabase(db);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/collection")
    public ResponseEntity deleteCollection(@RequestParam String db, @RequestParam String collection) {
        mongoService.deleteCollection(db, collection);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/document")
    public ResponseEntity deleteDocument(@RequestBody DBRequest dbRequest) {
        mongoService.deleteDocument(dbRequest.getDbName(), dbRequest.getCollectionName(), dbRequest.getQuery());
        return ResponseEntity.noContent().build();
    }
}
