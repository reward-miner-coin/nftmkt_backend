import { createSession } from "../../services/auth.js";

export default async ({ cookies, params, request, response }) => {
    const address = params.address;
    if (!address) {
      response.status = 400;
      response.body = { msg: "Address not provided", success: false };
      return;
    }

    //const nonce = await getRandomNonce();

    const nonce = await createSession(address);
    response.body = { msg: "Nonce sent", success: true, data: nonce };
};