import { MongoClient } from "mongodb";

export class MongoConnectionManager {
  private static clients: Map<string, MongoClient> = new Map();

  /**
   * Connect to to MongoDB using a connection ID (for multi-connection support).
   */
  static async getClient(connectionString: string, connId: string = "default") {
    if (this.clients.has(connId)) {
      return this.clients.get(connId)!;
    }

    const client = new MongoClient(connectionString, {
      maxPoolSize: 20,
      minPoolSize: 1,
      serverSelectionTimeoutMS: 3000
    });

    await client.connect();
    this.clients.set(connId, client);

    console.log(`MongoDB connected: ${connId}`);

    return client;
  }

  /** Close specific connection */
  static async close(connId: string) {
    const client = this.clients.get(connId);
    if (client) {
      await client.close();
      this.clients.delete(connId);
    }
  }

  /** Close all connections */
  static async closeAll() {
    for (const client of this.clients.values()) {
      await client.close();
    }
    this.clients.clear();
  }
}
