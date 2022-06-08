CREATE TABLE IF NOT EXISTS media (
    media_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
	address VARCHAR(42) NOT NULL,
    title VARCHAR(150),
    description VARCHAR(280),
    price double precision NOT NULL,
    media_url text NOT NULL,
	metadata_url text NOT NULL,
	mimeType text NOT NULL,
	contentHash text NOT NULL,
    metadataHash text NOT NULL,
	tokenId bigint NOT NULL,
	chainId serial NOT NULL,
	created_at timestamp default current_timestamp,
	UNIQUE (tokenId)
)