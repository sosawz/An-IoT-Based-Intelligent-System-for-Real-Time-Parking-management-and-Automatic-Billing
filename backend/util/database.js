const mysql = require('mysql2');

const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'plate_data'
});

module.exports = pool.promise();