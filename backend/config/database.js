import mysql from "mysql2";

// create connection
const db = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "mydb"
});

export default db;

