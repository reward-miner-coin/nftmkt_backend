import { updateUser, getUser } from "../../services/userServices.js";


export default async ({ params, request, response }) => {
    const address = params.id;
    if (!address) {
      response.status = 400;
      response.body = { msg: "Invalid user id", success: false };
      return;
    }
  
    if (!request.hasBody) {
      response.status = 400;
      response.body = { msg: "Invalid user data", success: false };
      return;
    }
    const { username, bio, email, site, twitter, instagram, avatar } = await request.body().value;
    await updateUser(address, { username, bio, email, site, twitter, instagram, avatar });
    const user = await getUser(address);
    response.status = 200;
    response.body = { msg: "User updated", data: user, success: true };
};