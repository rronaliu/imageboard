const Info = require('pg').Info

const info = new Info({
user: 'user',
host: 'localhost',
database: 'database_name',
password: 'root',
port: 4002,
});