const mysql = require('mysql');
const conn = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "kuliah",
    timezone: "+07:00"
});

conn.getConnection((err) => {
    if (err) throw err
    console.log('DB Connected');
});

module.exports = conn;
