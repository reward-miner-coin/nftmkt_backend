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
    const newBid = {
      mediaId: String(bid.mediaId),
      bidder: String(bid.bidder),
      price: bid.price,
      type: bid.type
    };
  
    let newSubmittedBid = await bidQueries.create(newBid);
  
    return newSubmittedBid._id;
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

export const acceptBid = async (bidId) => {
  await bidQueries.acceptBid(bidId);
};

