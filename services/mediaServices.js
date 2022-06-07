import mediaQueries from "../repositories/mediaQueries.js";

export const getOnePieceOfMedia = async (tokenId) => {
    const medias = await mediaQueries.selectById(tokenId);  
    var result = new Object();

    medias.rows.map((media) => {
      result = media;
    });

    return result;
};
export const createMedia = async (media) => {
    const newMedia = {
      address: String(media.address),
      title: String(media.title),
      description: String(media.description),
      price: media.price,
      media_url: String(media.media_url),
      metadata_url: String(media.metadata_url),
      mimeType: String(media.mimeType),
      contentHash: String(media.contentHash),
      metadataHash: String(media.metadataHash),
      tokenId: media.tokenId,
      chainId: media.chainId,
    };
    await mediaQueries.create(newMedia);
};
export const setAsk = async (mediaId, media) => {
    const mediaPreviousData = await getMedia(mediaId);
    //console.log(userPreviousData)
    if (Object.keys(mediaPreviousData).length === 0 && mediaPreviousData.constructor === Object) {
      throw new Error("User not found");
    }
  
    await mediaQueries.setAsk(mediaId, media);
};
export const getAllMedia = async () => {
  const medias = await mediaQueries.selectAll(); 

  var result = new Array();

  medias.rows.map((media) => {
    var obj = new Object();

    medias.rowDescription.columns.map((el, i) => {
      obj[el.name] = media[i];
    });
    result.push(obj);
  });

  return result;
};
export const getShowcase = async () => {
  const medias = await mediaQueries.selectForShowcase(); 
  
  var result = new Array();
  medias.rows.map((media) => {
    var obj = new Object();

    medias.rowDescription.columns.map((el, i) => {
      obj[el.name] = media[i];
    });
    result.push(obj);
  });
  return result;
};
export const getAllMediaPerUser = async (address) => {
  const medias = await mediaQueries.selectAllForUser(address); 

  var result = new Array();

  medias.rows.map((media) => {
    var obj = new Object();

    medias.rowDescription.columns.map((el, i) => {
      obj[el.name] = media[i];
    });
    result.push(obj);
  });

  return result;
};

