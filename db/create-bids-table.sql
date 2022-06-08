CREATE TABLE IF NOT EXISTS bids (
  bidId UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
	mediaId text NOT NULL,
	bidder VARCHAR(42) NOT NULL,
	accepted bool DEFAULT false,
	type bool NOT NULL,
  	price double precision NOT NULL,
	history bool NOT NULL default false,
	created_at timestamp default current_timestamp
)