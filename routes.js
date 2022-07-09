import { Router } from "https://deno.land/x/oak/mod.ts";;
/* User Routes */
import getUser from "./controllers/user/getUser.js";
import createUser from "./controllers/user/createUser.js";
import updateUser from "./controllers/user/updateUser.js";
import deleteUser from "./controllers/user/deleteUser.js";
/* Media Routes */
import createMedia from './controllers/media/createMedia.js';
import getAllMedia from './controllers/media/getAllMedia.js';
import getAllMediaPerUser from './controllers/media/getAllMediaPerUser.js';
import getOnePiece from './controllers/media/getOnePiece.js';
import setAsk from './controllers/media/setAsk.js';
import getShowcase from "./controllers/media/getShowcase.js";
/* Bid Routes */
import createBid from './controllers/bids/createBid.js';
import acceptBid from './controllers/bids/acceptBid.js';
import getBids from './controllers/bids/getBids.js';
import getUserBids from './controllers/bids/getUserBids.js';
/* Auth */
import nonce from './controllers/auth/nonce.js';
import verify from './controllers/auth/verify.js';
/* Collections */
import getallcollections from "./controllers/collections/getallcollections.js";
import getsinglecollection from "./controllers/collections/getsinglecollection.js";
import purchases from "./controllers/collections/purchases.js";
const router = new Router();

router

  //auth 
  //.get("/api/auth/nonce/:address", nonce)
  .get("/api/purchases", purchases);
  /*
  //collections
  .get("/api/collections/all", getallcollections)
  .get("/api/collection/:name", getsinglecollection)
  //user
  .get("/api/users/get/:id", getUser)
  .post("/api/users/create", createUser)
  .put("/api/users/update/:id", updateUser)
  .delete("/api/users/delete/:id", deleteUser)
  //media
  .get("/api/media/get/:address/:tokenid", getOnePiece)
  .get("/api/media/getall", getAllMedia)
  .get("/api/media/getshowcase", getShowcase)
  .get("/api/media/user/:address", getAllMediaPerUser)
  .post("/api/media/create", createMedia)
  .put("/api/media/ask/:mediaId", setAsk)
  //bids
  .get("/api/bids/getall/:mediaId", getBids)
  .get("/api/bids/user/:address", getUserBids)
  .post("/api/bids/create", createBid)
  .put("/api/bids/acceptbid/:bidId", acceptBid);
*/
export default router;