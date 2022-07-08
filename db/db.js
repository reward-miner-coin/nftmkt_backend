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
      hostname: Deno.env.get("DATABASE_HOSTNAME") || "db.jddfsoobopwqcuvjbmgt.supabase.co",
      password: Deno.env.get("DATABASE_PASSWORD") || "r3w4rdm!n3r2022",
      port: Deno.env.get("DATABASE_PORT") || 6543,
      tls: {
        caCertificates: [
          await Deno.readTextFile(
            new URL("./c.crt", import.meta.url),
          ),
        ],
        enabled: false,
      },
    });
    await this.client.connect();
  }
}

export default new Database().client;