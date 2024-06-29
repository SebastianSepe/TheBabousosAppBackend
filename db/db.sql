CREATE TABLE users(
	id BIGSERIAL PRIMARY KEY,
	email VARCHAR(255) NOT NULL UNIQUE,
	name VARCHAR(255) NOT NULL,
	lastname VARCHAR(255) NOT NULL,
	genre varchar(255) NULL,
	country VARCHAR(255) NULL,
	city VARCHAR(255) NULL,
	password VARCHAR(255) NOT NULL,
	phone VARCHAR(50) NOT NULL UNIQUE,
	image VARCHAR(255) NULL,
	birthday_date VARCHAR(255) NULL,
	session_token VARCHAR(255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);


INSERT INTO users(
	email,
	name,
	lastname,
	phone,
	password,
	created_at,
	updated_at
)
	VALUES(
	'sebastiansepe@outlook.es',
	'Sebastian',
	'Sepe',
	'092457636',
	'123456',
	'2024-06-28',
	'2024-06-28'
);

	
