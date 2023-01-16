import mysql from "mysql2";
import * as dotenv from 'dotenv';
dotenv.config();

/*
   creates the connection to either a local or external database
   based on the settings in the configuration-file
*/


/*
const db = mysql.createConnection({
   host: process.env.MODE == "dev" ? "localhost" : process.env.DB_HOST,
   user: process.env.MODE == "dev" ? "root" : process.env.DB_USER,
   password: process.env.MODE == "dev" ? "" : process.env.DB_PASSWORD,
   database: process.env.MODE == "dev" ? "mydb" : process.env.DB_NAME
});
*/


const db = mysql.createConnection({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME
});

/*
 
 var connection;
 
 function handleDisconnect() {
   connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                   // the old one cannot be reused.
 
   connection.connect(function(err) {              // The server is either down
     if(err) {                                     // or restarting (takes a while sometimes).
       console.log('error when connecting to db:', err);
       setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
     }                                     // to avoid a hot loop, and to allow our node script to
   });                                     // process asynchronous requests in the meantime.
                                           // If you're also serving http, display a 503 error.
   connection.on('error', function(err) {
     console.log('db error', err);
     if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
       handleDisconnect();                         // lost due to either server restart, or a
     } else {                                      // connnection idle timeout (the wait_timeout
       throw err;                                  // server variable configures this)
     }
   });
 }
 
handleDisconnect();
 */


   
export default db;

