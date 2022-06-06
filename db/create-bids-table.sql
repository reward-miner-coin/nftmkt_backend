CREATE TABLE IF NOT EXISTS bids (
    bidId UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
	mediaId text NOT NULL,
	bidder VARCHAR(42) NOT NULL,
    price text NOT NULL,
	accepted bool DEFAULT false
)