package com.mongo_db_viewer.mongodb.service;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import lombok.AllArgsConstructor;
import org.bson.BsonArray;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    public void createDatabase(String dbName, String collectionName) {
        MongoDatabase database = mongoClient.getDatabase(dbName);
        database.createCollection(collectionName);
    }

    public void createCollection(String dbName, String collectionName) {
        MongoDatabase database = mongoClient.getDatabase(dbName);
        database.createCollection(collectionName); // Creates the collection
    }

    public void insertDocument(String dbName, String collectionName, Document document) {
        MongoDatabase database = mongoClient.getDatabase(dbName);
        mongoClient.getDatabase(dbName).getCollection(collectionName).insertOne(document);
    }

    public void insertDocuments(String dbName, String collectionName, List<Document> documents) {
        MongoDatabase database = mongoClient.getDatabase(dbName);
        mongoClient.getDatabase(dbName).getCollection(collectionName).insertMany(documents);
    }

    public List<Object> queryCollections(String dbName, String collectionName, String filterJson) {
        MongoDatabase database = mongoClient.getDatabase(dbName);
        Document filter = Document.parse(filterJson);
        return database.getCollection(collectionName).find(filter).into(new ArrayList<>());
    }

    public List<Object> aggregateCollections(String dbName, String collectionName, String aggregateQuery) {
        MongoDatabase database = mongoClient.getDatabase(dbName);

        List<Bson> aggregationPipeline = parseAggregationQuery(aggregateQuery);

        return database.getCollection(collectionName)
                .aggregate(aggregationPipeline)
                .into(new ArrayList<>());
    }

    private List<Bson> parseAggregationQuery(String aggregateQuery) {
        BsonArray bsonArray = BsonArray.parse(aggregateQuery);

        return bsonArray.stream()
                .map(bsonValue -> (Bson) bsonValue)
                .collect(Collectors.toList());
    }


    public void deleteDatabase(String dbName) {
        mongoClient.getDatabase(dbName).drop();
    }

    public void deleteCollection(String dbName, String collectionName) {
        mongoClient.getDatabase(dbName).getCollection(collectionName).drop();
    }

    public void deleteDocument(String dbName, String collectionName, String filterJson) {
        MongoDatabase database = mongoClient.getDatabase(dbName);
        Document filter = Document.parse(filterJson);
        database.getCollection(collectionName).deleteOne(filter);
    }

}
