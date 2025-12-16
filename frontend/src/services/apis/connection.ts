import api from "./client";

export const testConnection = (connectionString: string) => {
  return api.post("/connection/test", { connectionString });
};
