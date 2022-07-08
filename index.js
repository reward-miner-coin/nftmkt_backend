import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { APP_HOST, APP_PORT } from "./config.js";
import router from "./routes.js";
import _404 from "./controllers/404.js";
import errorHandler from "./controllers/errorHandler.js";

const app = new Application();
app.use(oakCors({
    origin: '*'}
    ));
app.use(errorHandler);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(_404);



console.log(`Listening on ${APP_HOST}:${APP_PORT}...`);

await app.listen(`${APP_HOST}:${APP_PORT}`);