import client from "../db/db.js";

class MediaQueries {
  create(media) {
    try{
      return client.queryObject(
        `INSERT INTO MEDIA (
            address, 
            title, 
            description,
            price, 
            media_url, 
            metadata_url,
            mimeType,
            contentHash,
            metadataHash,
            tokenId, 
            chainId
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`,
        [
          media.address,
          media.title,
          media.description,
          media.price,
          media.media_url,
          media.metadata_url,
          media.mimeType,
          media.contentHash,
          media.metadataHash,
          media.tokenId,
          media.chainId
        ]
      );
    } catch (e) {
      //console.log(e);
    }
  }

  selectAll() {
    return client.queryArray(`
    SELECT 
      media_id,
      address,
      title,
      description,
      price,
      media_url,
      metadata_url,
      mimetype,
      contenthash,
      metadatahash,
      tokenid::text,
      chainid
    FROM media 
    ORDER BY price`);
  }
  selectAllForUser(address) {
    return client.queryObject("SELECT * FROM media WHERE address = $1 ORDER BY address", [address]);
  }

  selectById(tokenId) {
    return client.queryObject(`SELECT * FROM media WHERE tokenId = $1`, [tokenId]);
  }

  selectForShowcase() {
    return client.queryArray(`SELECT * FROM nftshowcase`);
  }

  async setAsk(id, media) {
    var previousMedia = await this.selectById(id);
    //console.log(previousUserdata);

    var result = new Object();

    previousMedia.rows.map((_media) => {
      result = _media;
    });

    var query = `UPDATE media 
      SET 
          price = $1
          WHERE tokenId = $2
      `;
    
    return client.queryObject(
      query,
      [user.username !== undefined ? media.price : result.price,
      id]
    );
  }
}

export default new MediaQueries();