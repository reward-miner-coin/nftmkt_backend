import client from "../db/db.js";

class UserQueries {
  create(bid) {
      return client.queryObject(
        "INSERT INTO BIDS (mediaId, bidder, price, type) VALUES ($1, $2, $3, $4);",
        [
          bid.mediaId,
          bid.bidder,
          bid.price,
          bid.type
      ]
      );
  }

  selectAllBidsForMedia(mediaId) {
    return client.queryArray(`
      SELECT b.*, a.username as bidder_username, a.avatar as bidder_avatar
      FROM bids as b 
      left join (select address, username, avatar from users) as a 
      on b.bidder = a.address
      where b.mediaid = $1`, 
     [mediaId]);
  }

  selectAllBidsFromUser(address) {
    return client.queryObject(`SELECT * FROM bids WHERE bidder = $1`, [address]);
  }
  selectCurrentBidForUserAndMedia(address, tokenid){
    return client.queryArray(`SELECT * FROM bids WHERE bidder = $1 and mediaid = $2 and history = false`, [address, tokenid]);
  }
  async updateBid(address, tokenid) {
    var query = `UPDATE bids 
      SET 
          history = true
          WHERE mediaid = $1 and bidder = $2
      `;
    
    return client.queryObject(
      query,
      [
        tokenid,
        address
      ]
    );
  }

  async updateMediaOwner(address, mediaid) {
    var query = `UPDATE media 
      SET 
          price = 0,
          current_owner = $1
          WHERE tokenid = $2
      `;
    return client.queryObject(
      query,
      [
        address,
        parseInt(mediaid)
      ]
    );
  }

  async acceptBid(bidId) {
    var query = `UPDATE bids 
      SET 
          accepted = $1,
          history = $2
          WHERE bidId = $3
      `;
    
    return client.queryObject(
      query,
      [
        true,
        true,
        bidId
      ]
    );
  }
}

export default new UserQueries();