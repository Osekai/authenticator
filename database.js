const mysql = require('mysql2/promise');
const {env} = require('./env');

const connection = mysql.createPool({
  host: env["mysqlHost"],
  user: env["mysqlUsername"],
  password: env["mysqlPassword"],
  database: env["mysqlDatabase"],
  connectionLimit: 10,
});




module.exports = connection;