import { getUser } from "../../services/userServices.js";

export default async ({ params, response }) => {
    const userId = params.id;
  
    if (!userId) {
      response.status = 400;
      response.body = { msg: "Invalid user id", success: false };
      return;
    }
  
    const user = await getUser(userId);
    
    if (!user) {
      response.status = 404;
      response.body = { msg: `User with ID ${userId} not found`, success: false };
      return;
    }
  
    response.body = { msg: `User found`, data: user, success: false };
};