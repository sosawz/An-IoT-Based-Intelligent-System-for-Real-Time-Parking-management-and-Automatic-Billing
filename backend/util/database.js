const mysql = require('mysql2');

const pool = mysql.createPool({
    host : '192.168.2.114',
    user : 'root',
    password : 'root',
    database : 'smartparking'
});

module.exports = pool.promise();