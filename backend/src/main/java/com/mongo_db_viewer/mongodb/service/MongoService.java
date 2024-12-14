package com.mongo_db_viewer.mongodb.service;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import lombok.AllArgsConstructor;
import org.bson.Document;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class MongoService {

    private MongoClient mongoClient;

    public void connectToMongoDB(String mongoUri) {
        mongoClient = MongoClients.create(mongoUri);
    }

    public List<String> getDatabase() {
        List<String> database = new ArrayList<>();
        mongoClient.listDatabaseNames().into(database);
        return database;
    }

    public List<String> getCollections(String dbName) {
        MongoDatabase database = mongoClient.getDatabase(dbName);
        List<String> collections = new ArrayList<>();
        database.listCollectionNames().into(collections);
        return collections;
    }

    public List<Object> getDocuments(String dbName, String collectionName) {
        MongoDatabase database = mongoClient.getDatabase(dbName);
        return database.getCollection(collectionName).find().into(new ArrayList<>());
    }

    public List<Object> queryCollections(String dbName, String collectionName, String filterJson) {
        MongoDatabase database = mongoClient.getDatabase(dbName);
        Document filter = Document.parse(filterJson);
        return database.getCollection(collectionName).find(filter).into(new ArrayList<>());
    }
}
