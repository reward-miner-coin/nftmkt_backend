import { Client } from "https://deno.land/x/postgres/mod.ts";

console.log(Deno.env.toObject());


class Database {
  constructor() {
    this.connect();
  }

  async connect() {
   this.client = new Client({
      user: Deno.env.get("DATABASE_USER") || "postgres",
      database: Deno.env.get("DATABASE_NAME") || "postgres",
      hostname: Deno.env.get("DATABASE_HOSTNAME") || "",
      password: Deno.env.get("DATABASE_PASSWORD") || "",
      port: Deno.env.get("DATABASE_PORT") || 6543,
      
      transport: "tcp"
    });
    await this.client.connect();
  }
}

export default new Database().client;