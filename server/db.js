const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "danshiffman",
    host: "localhost",
    port: 5432,
    database: "imageboard"
});

module.exports = pool;