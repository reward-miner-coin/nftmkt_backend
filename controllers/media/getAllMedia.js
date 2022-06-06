import { getAllMedia } from "../../services/mediaServices.js";

export default async ({ params, response }) => {
    const allMedia = await getAllMedia();
    if (!allMedia) {
      response.status = 404;
      response.body = { msg: `Error when retrieving media`, success: false };
      return;
    }
    response.body = { msg: `Media retrieved`, success: true, data: allMedia };
};