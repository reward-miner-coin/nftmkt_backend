import bidQueries from "../repositories/bidQueries.js";

export const getBids = async (mediaId) => {
    const mediaBids = await bidQueries.selectAllBidsForMedia(mediaId); 
    var result = new Array();

    mediaBids.rows.map((bid) => {
      var obj = new Object();
  
      mediaBids.rowDescription.columns.map((el, i) => {
        obj[el.name] = bid[i];
      });

      result.push(obj);

    });
    return result;
};

export const createBid = async (bid) => {
    await bidQueries.updateBid(bid.bidder, bid.mediaId);
    const newBid = {
      mediaId: String(bid.mediaId),
      bidder: String(bid.bidder),
      price: bid.price,
      type: bid.type
    };
  
    await bidQueries.create(newBid);
    const freshBid = await bidQueries.selectCurrentBidForUserAndMedia(bid.bidder, bid.mediaId);

    var result = new Array();

    freshBid.rows.map((bid_x) => {
      var obj = new Object();
  
      freshBid.rowDescription.columns.map((el, i) => {
        obj[el.name] = bid_x[i];
      });

      result.push(obj);

    });
  
    return result[0];
};

export const getBidsForUser = async (address) => {
  const mediaBids = await bidQueries.selectAllBidsFromUser(address);  
  var result = new Array();

  mediaBids.rows.map((bid) => {
    var obj = new Object();

    mediaBids.rowDescription.columns.map((el, i) => {
      obj[el.name] = bid[i];
    });

    result.push(obj);

    return result;
  });
};

export const acceptBid = async (bidId, bid) => {
  await bidQueries.acceptBid(bidId);
  await bidQueries.updateMediaOwner(bid.bidder, bid.mediaId);
};

