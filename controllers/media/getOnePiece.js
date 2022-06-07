import { getAllMediaPerUser, getOnePieceOfMedia } from "../../services/mediaServices.js";

export default async ({ params, response }) => {
    console.log(params)
    const tokenId = parseInt(params.tokenid);
    if (!tokenId) {
      response.status = 400;
      response.body = { msg: "Invalid user id", success: false };
      return;
    }
  
    const media = await getOnePieceOfMedia(tokenId);
    
    if (!media) {
      response.status = 404;
      response.body = { msg: `Media with ID ${tokenId} not found`, success: false };
      return;
    }
  
    response.body = { msg: `Media with ID ${tokenId} found`, success: true, data: media };
};