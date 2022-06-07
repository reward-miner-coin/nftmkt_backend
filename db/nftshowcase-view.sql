-- View: public.nftshowcase

-- DROP VIEW public.nftshowcase;

CREATE OR REPLACE VIEW public.nftshowcase
 AS
 SELECT a.media_id,
    a.address,
    a.title,
    a.description,
    a.price,
    a.media_url,
    a.metadata_url,
    a.mimetype,
    a.contenthash,
    a.metadatahash,
    a.tokenid,
    a.chainid,
    b.address2,
    b.username,
    b.avatar
   FROM ( SELECT media.media_id,
            media.address,
            media.title,
            media.description,
            media.price,
            media.media_url,
            media.metadata_url,
            media.mimetype,
            media.contenthash,
            media.metadatahash,
            media.tokenid::text AS tokenid,
            media.chainid
           FROM media
          ORDER BY media.price DESC
         LIMIT 7) a
     LEFT JOIN ( SELECT users.address AS address2,
            users.username,
            users.avatar
           FROM users) b ON a.address::text = b.address2::text;

ALTER TABLE public.nftshowcase
    OWNER TO christianmartinez;

