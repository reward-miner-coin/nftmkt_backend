import client from "../db/db.js";

class UserQueries {
  create(bid) {
      return client.queryObject(
        "INSERT INTO BIDS (mediaId, bidder, price) VALUES ($1, $2, $3);",
        [
          bid.mediaId,
          bid.bidder,
          bid.price
      ]
      );
  }

  selectAllBidsForMedia(mediaId) {
    return client.queryObject("SELECT * FROM bids where mediaId = $1", [mediaId]);
  }

  selectAllBidsFromUser(address) {
    return client.queryObject(`SELECT * FROM bids WHERE bidder = $1`, [address]);
  }

  async acceptBid(bidId) {
    var query = `UPDATE bids 
      SET 
          accepted = $1
          WHERE bidId = $2
      `;
    
    return client.queryObject(
      query,
      [
        true,
        bidId
      ]
    );
  }
}

export default new UserQueries();