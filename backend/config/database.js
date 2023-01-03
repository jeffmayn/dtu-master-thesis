import mysql from "mysql2";

// create connection
const db = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "tir_db"
});

export default db;