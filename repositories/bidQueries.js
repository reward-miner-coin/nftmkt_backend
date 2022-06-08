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
    return client.queryArray("SELECT * FROM bids where mediaid = $1", [mediaId]);
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