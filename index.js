import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { APP_HOST, APP_PORT } from "./config.js";
import router from "./routes.js";
import _404 from "./controllers/404.js";
import errorHandler from "./controllers/errorHandler.js";

const app = new Application();
app.use(oakCors({
    origin: ["https://nftmarket.rewardminer.io", "http://nftmarket.rewardminer.io", "nftmarket.rewardminer.io", "http://127.0.0.1:3000", "http://localhost:3000"],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));
app.use((ctx, next) => {
    ctx.response.headers.set('Access-Control-Allow-Origin', '*')
    return next()
  })
app.use(errorHandler);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(_404);



console.log(`Listening on ${APP_HOST}:${APP_PORT}...`);

await app.listen(`${APP_HOST}:${APP_PORT}`);