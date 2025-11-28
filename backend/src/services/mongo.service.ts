import { MongoConnectionManager } from "../config/mongo";

export class MongoService {
  /**
   * List all databases on the server.
   */
  static async listDatabases(connectionString: string, connId: string) {
    const client = await MongoConnectionManager.getClient(connectionString, connId);

    const adminDb = client.db().admin();
    const result = await adminDb.listDatabases();

    return result.databases;
  }

  /**
   * List collections inside a database.
   */
  static async listCollections(connectionString: string, connId: string, dbName: string) {
    const client = await MongoConnectionManager.getClient(connectionString, connId);

    const db = client.db(dbName);
    return db.listCollections().toArray();
  }

  /**
   * Run a find query with pagination.
   */
  static async runFindQuery(connectionString: string, connId: string, dbName: string, col: string, query: any, limit: number = 50, skip: number = 0) {
    const client = await MongoConnectionManager.getClient(connectionString, connId);

    const collection = client.db(dbName).collection(col);

    return await collection.find(query).skip(skip).limit(limit).toArray();
  }

  /**
   * Run an aggregation pipeline.
   */
  static async runAggregation(connectionString: string, connId: string, dbName: string, col: string, pipeline: any[]) {
    const client = await MongoConnectionManager.getClient(connectionString, connId);

    const collection = client.db(dbName).collection(col);

    return await collection.aggregate(pipeline, { maxTimeMS: 5000 }).toArray();
  }
}
