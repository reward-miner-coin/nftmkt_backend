import { createBid } from "../../services/bidServices.js";


export default async ({ request, response }) => {
    if (!request.hasBody) {
      response.status = 400;
      response.body = { msg: "Invalid user data", success: false };
      return;
    }
  
    const bid = await request.body().value;
  
    //console.log(await request.body({ type: "json" }).value);
    //console.log(name);
  
    /*if (!name || !brand) {
      response.status = 422;
      response.body = { msg: "Incorrect beer data. Name and brand are required" };
      return;
    }*/
  
    const retData = await createBid(bid);
    response.body = { msg: "Bid created", success: true, data: retData };
  };