import mysql from "mysql2";
import * as dotenv from 'dotenv';
dotenv.config();

/*
   creates the connection to either a local or external database
   based on the settings in the configuration-file
*/
const db = mysql.createConnection({
   host: process.env.MODE == "dev" ? "localhost" : process.env.DB_HOST,
   user: process.env.MODE == "dev" ? "root" : process.env.DB_USER,
   password: process.env.MODE == "dev" ? "" : process.env.DB_PASSWORD,
   database: process.env.MODE == "dev" ? "mydb" : process.env.DB_NAME
});
   
export default db;

