import { Request, Response } from "express";
import { MongoService } from "../services/mongo.service";

export class MongoController {
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
}
