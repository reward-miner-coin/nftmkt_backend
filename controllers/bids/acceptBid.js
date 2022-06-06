import { acceptBid } from "../../services/bidServices.js";

export default async ({ params, response }) => {
    const bidId = params.bidId;

    if (!bidId) {
      response.status = 400;
      response.body = { msg: "Invalid media id", success: false };
      return;
    }

    await acceptBid(bidId);

    response.body = { msg: "Bid accepted", success: true };
};