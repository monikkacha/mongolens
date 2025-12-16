import { Request, Response } from "express";
import { MongoService } from "../services/mongo.service";
import { MongoConnectionManager } from "../config/mongo";

export class MongoController {
  static async testConnection(req: Request, res: Response) {
    const { connectionString, connId = "test" } = req.body;

    const client = await MongoConnectionManager.getClient(
      connectionString,
      connId
    );

    await client.db().command({ ping: 1 });

    return res.json({ success: true, message: "Connection successful" });
  }

  static async listDatabases(req: Request, res: Response) {
    const { connectionString, connId = "default" } = req.body;
    const databases = await MongoService.listDatabases(
      connectionString,
      connId
    );

    return res.json({ success: true, databases });
  }

  static async listCollections(req: Request, res: Response) {
    const { connectionString, connId = "default", dbName } = req.body;
    const collections = await MongoService.listCollections(
      connectionString,
      connId,
      dbName
    );

    return res.json({ success: true, collections });
  }

  static async runFindQuery(req: Request, res: Response) {
    const {
      connectionString,
      connId = "default",
      dbName,
      collectionName,
      query = {},
      limit = 50,
      skip = 0,
    } = req.body;

    const result = await MongoService.runFindQuery(
      connectionString,
      connId,
      dbName,
      collectionName,
      query,
      limit,
      skip
    );

    return res.json({ success: true, result });
  }

  static async runAggregation(req: Request, res: Response) {
    const {
      connectionString,
      connId = "default",
      dbName,
      collectionName,
      pipeline = [],
    } = req.body;

    const result = await MongoService.runAggregation(
      connectionString,
      connId,
      dbName,
      collectionName,
      pipeline
    );

    return res.json({ success: true, result });
  }
}
