-- CREATE DATABASE imageboard;

CREATE TABLE post (
    post_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    body VARCHAR,
    image VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE comments (
    cid SERIAL PRIMARY KEY,
    comment VARCHAR,
    image VARCHAR(255),
    post_id INT REFERENCES post(post_id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);