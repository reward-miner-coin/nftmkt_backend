import { getBidsForUser } from "../../services/bidServices.js";

export default async ({ params, response }) => {
    const address = params.address;

    if (!address) {
        response.status = 400;
        response.body = { msg: "Invalid media id", sucess: false };
        return;
      }
    
    const allBids = await getBidsForUser(address);

    if (!allBids) {
      response.status = 404;
      response.body = { msg: `Error when retrieving bids for user`, sucess: false };
      return;
    }
    
    response.body = { msg: `Error when retrieving bids for user`, data: allMedia, sucess: false};
};