import mysql from "mysql2";

// create connection
/*
const db = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "mydb"
});
*/

const db = mysql.createConnection({
   host: "eu-cdbr-west-03.cleardb.net",
   user: "ba3a97cc9ab551",
   password: "68060962",
   database: "heroku_d089aa07e0c2400"
});

export default db;

