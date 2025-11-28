import { Router } from "express";
import { MongoService } from "../services/mongo.service";

const router = Router();

/**
 * GET /api/v1/mongo/databases
 * Body: { connectionString: string, connId?: string }
 */
router.post("/databases", async (req, res) => {
  try {
    const { connectionString, connId = "default" } = req.body;

    const dbs = await MongoService.listDatabases(connectionString, connId);

    res.json({ success: true, databases: dbs });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
});

/**
 * GET collections in a DB
 */
router.post("/collections", async (req, res) => {
  try {
    const { connectionString, connId = "default", dbName } = req.body;

    const collections = await MongoService.listCollections(connectionString, connId, dbName);

    res.json({ success: true, collections });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

export default router;
