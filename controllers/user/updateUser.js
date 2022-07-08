import { updateUser, getUser } from "../../services/userServices.js";
import { verifyMessage } from "../../services/auth.js";


export default async ({ params, request, response }) => {
    const address = params.id;
    if (!address) {
      response.status = 400;
      response.body = { msg: "Invalid user id", success: false, data: null };
      return;
    }
  
    if (!request.hasBody) {
      response.status = 400;
      response.body = { msg: "Invalid user data", success: false, data: null };
      return;
    }

    const { username, bio, email, site, twitter, instagram, avatar, signature } = await request.body().value;
    let res = await verifyMessage(address, signature);
    
    if(res.authenticated){
      await updateUser(address, { username, bio, email, site, twitter, instagram, avatar });
      const user = await getUser(address);
      response.status = 200;
      response.body = { msg: "User updated", data: user, success: true };
    } else {
      response.body = { msg: "Account verification failed", data: null, success: false };
    }
};