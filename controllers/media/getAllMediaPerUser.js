import { getAllMediaPerUser } from "../../services/mediaServices.js";

export default async ({ params, response }) => {
    const address = params.address;
    const allMedia = await getAllMediaPerUser(address);

    if (!allMedia) {
      response.status = 404;
      response.body = { msg: `Error when retrieving media for user`, success: false };
      return;
    }
    
    response.body = { msg: `Media for user retrieved`, success: true, data: allMedia };
};