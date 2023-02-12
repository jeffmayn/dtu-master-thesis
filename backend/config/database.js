import mysql from "mysql2";
import * as dotenv from 'dotenv';
dotenv.config();

// local config
var db_config = {
   connectionLimit : 10000,
   host: "localhost",
   user: "root",
   password: "",
   database: "mydb"
};
/*
// SERVER config

var db_config = {
  connectionLimit : 1000,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

 */
var connection = mysql.createPool(db_config);
export default connection;

