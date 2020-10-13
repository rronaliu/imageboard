CREATE DATABASE imageboard;

CREATE TABLE post (
    post_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    body VARCHAR(255),
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE reply (
    reply_id SERIAL PRIMARY KEY,
    body VARCHAR,
    created_at TIMESTAMP NOT NULL,
    image VARCHAR(255)
);