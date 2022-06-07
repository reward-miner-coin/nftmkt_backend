import { createUser, getUser } from "../../services/userServices.js";


export default async ({ request, response }) => {
    if (!request.hasBody) {
      response.status = 400;
      response.body = { msg: "Invalid user data", success: false, message: true };
      return;
    }
  
    const {address, username, bio, email, site, twitter, instagram} = await request.body().value;
    
    const user = await getUser(address);
    if (Object.keys(user).length > 0 && user.constructor === Object) {
      //console.log('USER FOUND');  
      response.body = { msg: "Profile Loaded", data: user, success: true, message: false };
      return;
    }
    
    await createUser({address, username, bio, email, site, twitter, instagram});
    const user2 = await getUser(address);
    response.body = { msg: "User created", data: user2, success: true, message: false };
  };