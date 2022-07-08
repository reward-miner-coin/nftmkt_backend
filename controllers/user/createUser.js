import { createUser, getUser } from "../../services/userServices.js";
import { verifyMessage } from "../../services/auth.js";


export default async ({ request, response }) => {
    if (!request.hasBody) {
      response.status = 400;
      response.body = { msg: "Invalid user data", success: false, data: null };
      return;
    }
  
    const {address, username, bio, email, site, twitter, instagram, signature} = await request.body().value;

    let res = await verifyMessage(address, signature);
    if(res.authenticated){
      const user = await getUser(address);
      if (Object.keys(user).length > 0 && user.constructor === Object) {
        response.body = { msg: "Profile Loaded", data: user, success: true };
        return;
      }
      
      await createUser({address, username, bio, email, site, twitter, instagram});
      const user2 = await getUser(address);
      response.body = { msg: "User created", data: user2, success: true };
    } else {
      response.body = { msg: "Account verification failed", data: null, success: false };
    }
  };