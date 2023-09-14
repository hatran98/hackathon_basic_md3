const mysql = require("mysql2");
const pool = mysql.createPool({
  database: "hackathon_basic",
  user: "root",
  password: "",
  port: "3306",
  host: "localhost",
});

module.exports = pool.promise();
