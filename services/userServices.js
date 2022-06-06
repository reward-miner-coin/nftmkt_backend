import userQueries from "../repositories/userQueries.js";

export const getUser = async (userId) => {
    const users = await userQueries.selectById(userId);  
    var result = new Object();

    users.rows.map((user) => {
      result = user;
    });

    return result;
};

export const createUser = async (user) => {
    const newUser = {
      address: String(user.address),
      username: String(user.username),
      bio: String(user.bio),
      email: String(user.email),
      site: String(user.site),
      twitter: String(user.twitter),
      instagram: String(user.instagram),
      avatar: String(user.avatar),
    };
  
    let newCreatedUser = await userQueries.create(newUser);
  
    return newCreatedUser._id;
};
export const updateUser = async (userId, user) => {
    const userPreviousData = await getUser(userId);
    //console.log(userPreviousData)
    if (Object.keys(userPreviousData).length === 0 && userPreviousData.constructor === Object) {
      throw new Error("User not found");
    }
  
    await userQueries.update(userId, user);
};

export const deleteUser = async (userId) => {
  userQueries.delete(userId);
};

