import { acceptBid } from "../../services/bidServices.js";

export default async ({ params, request, response }) => {
    const bidId = params.bidId;

    if (!bidId) {
      response.status = 400;
      response.body = { msg: "Invalid media id", success: false };
      return;
    }


    const bid = await request.body().value;
    await acceptBid(bidId, bid);
    response.body = { msg: "Bid accepted", success: true };
};