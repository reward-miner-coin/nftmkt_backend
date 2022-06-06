import { setAsk } from "../../services/mediaServices.js";


export default async ({ params, request, response }) => {
    const tokenId = params.id;
  
    if (!tokenId) {
      response.status = 400;
      response.body = { msg: "Invalid token id", success: false };
      return;
    }
  
    if (!request.hasBody) {
      response.status = 400;
      response.body = { msg: "Invalid update data", success: false };
      return;
    }
  
    const { price } = await request.body().value;
  
    await setAsk(tokenId, price);
  
    response.body = { msg: "Media price updated", sucess: true };
};