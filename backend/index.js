import express from "express";
import cors from "cors";
import Router from "./routes/routes.js";

const PORT = process.env.PORT || 3030;

// todo: needs fixing

/*
let origin = "";
if (process.env.MODE == "dev") {
   origin = "http://localhost:" + process.env.FRONTEND_PORT;
}
else {
   origin = "https://dtu-master-thesis-tir.herokuapp.com";
}
*/

// https://dtu-tir.netlify.app
var corsOption = {
   origin: 
      "http://localhost:8081",
   optionSuccessStatus: 200
};
 



const app = express();

app.options("/*", function (req, res, next) {
   console.log("Got an options request yo");
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
   res.sendStatus(200);
});


app.use(cors(corsOption));
app.use(express.json());
app.use(Router);

app.get('/', (req, res) => res.send("Server is up and running!"));
app.listen(PORT, () => {
   console.log("Server is running ..");
});

/*
createTable();
*/

