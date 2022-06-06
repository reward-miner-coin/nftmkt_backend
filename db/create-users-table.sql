CREATE TABLE IF NOT EXISTS users (
    _id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
	address VARCHAR(42) UNIQUE NOT NULL,
    username VARCHAR(50),
    bio VARCHAR(280),
    email text,
    site text,
	twitter text,
	instagram text,
    avatar text
)