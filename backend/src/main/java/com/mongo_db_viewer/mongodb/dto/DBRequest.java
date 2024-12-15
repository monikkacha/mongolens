package com.mongo_db_viewer.mongodb.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class DBRequest {
    private String dbName;
    private String collectionName;
    private String filterJson;
    private String aggregateJson;
    private String query;
}
