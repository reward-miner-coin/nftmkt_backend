CREATE TABLE IF NOT EXISTS media (
    media_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
	address VARCHAR(42) NOT NULL,
    title VARCHAR(150),
    description VARCHAR(280),
    price text NOT NULL,
    media_url text NOT NULL,
	metadata_url text NOT NULL,
	mimeType text NOT NULL,
	contentHash text NOT NULL,
    metadataHash text NOT NULL,
	tokenId text NOT NULL,
	chainId text NOT NULL,
	UNIQUE (tokenId)
)