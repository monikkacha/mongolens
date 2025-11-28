import { Router } from "express";
import { MongoController } from "../controllers/mongo.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/databases", asyncHandler(MongoController.listDatabases));
router.post("/collections", asyncHandler(MongoController.listCollections));

export default router;
