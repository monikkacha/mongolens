import api from "./client";

export const listDatabases = (connectionString: string, connId = "default") =>
  api.post("/databases", { connectionString, connId });

export const listConnections = (connectionString: string, connId = "default") =>
  api.post("/collections", { connectionString, connId });
