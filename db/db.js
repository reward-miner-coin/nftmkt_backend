import { Client } from "https://deno.land/x/postgres/mod.ts";


class Database {
  constructor() {
    this.connect();
  }

  async connect() {
   this.client = new Client({
      user: Deno.env.get("DATABASE_USER") || "postgres",
      database: Deno.env.get("DATABASE_NAME") || "rmc",
      hostname: Deno.env.get("DATABASE_HOSTNAME") || "127.0.0.1",
      password: Deno.env.get("DATABASE_PASSWORD") || "postgres",
      port: Deno.env.get("DATABASE_PORT") || 5432,
      tls: {
        caCertificates: [
          await Deno.readTextFile(
            new URL("./c.crt", import.meta.url),
          ),
        ],
        enabled: true,
      },
    });
    await this.client.connect();
  }
}

export default new Database().client;