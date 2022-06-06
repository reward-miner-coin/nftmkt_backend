import client from "../db/db.js";

class UserQueries {
  create(user) {
      return client.queryObject(
        "INSERT INTO USERS (address, username, bio, email, site, twitter, instagram, avatar) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);",
        [user.address,
        user.username,
        user.bio,
        user.email,
        user.site,
        user.twitter,
        user.instagram,
        user.avatar]
      );
  }

  selectAll() {
    return client.queryArray("SELECT * FROM users ORDER BY _id");
  }

  selectById(address) {
    return client.queryObject(`SELECT * FROM users WHERE address = $1`, [address]);
  }

  async update(id, user) {
    var previousUserdata = await this.selectById(id);
    //console.log(previousUserdata);

    var result = new Object();

    previousUserdata.rows.map((user) => {
      result = user;
    });

    var query = `UPDATE users 
      SET 
          username = $1, 
          bio = $2, 
          email = $3,
          site = $4,
          twitter = $5,
          instagram = $6,
          avatar = $7
          WHERE address = $8
      `;
    
    return client.queryObject(
      query,
      [user.username !== undefined ? user.username : result.username,
      user.bio !== undefined ? user.bio : result.bio,
      user.email !== undefined ? user.email : result.email,
      user.site !== undefined ? user.site : result.site,
      user.twitter !== undefined ? user.twitter : result.twitter,
      user.instagram !== undefined ? user.instagram : result.instagram,
      user.avatar !== undefined ? user.avatar : result.avatar,
      id]
    );
  }

  delete(id) {
    return client.queryObject(`DELETE FROM users WHERE _id = $1`, id);
  }
}

export default new UserQueries();