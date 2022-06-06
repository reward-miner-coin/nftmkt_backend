import { getBids } from "../../services/bidServices.js";

export default async ({ params, response }) => {
    const mediaId = params.mediaId;

    if (!mediaId) {
      response.status = 400;
      response.body = { msg: "Invalid media id", success: false };
      return;
    }

    const allBids = await getBids(mediaId);
    if (!allBids) {
      response.status = 404;
      response.body = { msg: `Error when retrieving bids`, sucess: false };
      return;
    }
    response.body = { msg: `Bid retrieved`, data: allBids, sucess: true};
};