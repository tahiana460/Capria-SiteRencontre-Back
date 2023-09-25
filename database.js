const mysql = require('mysql2')

const dotenv = require("dotenv")
dotenv.config()

const pool = mysql.createPool({
    url: process.env.MYSQL_URL,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    //charset : 'UTF8MB4_UNICODE_CI'
    charset : 'utf8'
    //collation: 'utf8mb4_unicode_ci' 
}).promise()

// pool.query('set names "utf8mb4"')

module.exports = { 
    pool
};