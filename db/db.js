import { Client, Pool } from "https://deno.land/x/postgres/mod.ts";

const cert = await Deno.readTextFile(
  new URL("./c.crt", import.meta.url),
);
class Database {
  constructor() {
    this.connect();
  }

  async connect() {
   this.client = new Pool({
      user: Deno.env.get("DATABASE_USER") || "postgres",
      database: Deno.env.get("DATABASE_NAME") || "postgres",
      hostname: Deno.env.get("DATABASE_HOSTNAME") || "",
      password: Deno.env.get("DATABASE_PASSWORD") || "",
      port: Deno.env.get("DATABASE_PORT") || 6543,
      tls: { caCertificates: [cert] }
    }, 3, true);
    await this.client.connect();
  }
}

export default new Database().client;