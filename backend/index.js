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

// to avoid crosssite-scripting etc on production build
var corsOption = {
   origin: [
      "https://dtu-tir.netlify.app",
      "https://dtu-master-thesis-tir.herokuapp.com",
      "https://dtu-master-thesis-tir.herokuapp.com/searchProduct",
      "https://dtu-master-thesis-tir.herokuapp.com/model",
      "https://dtu-master-thesis-tir.herokuapp.com/cve",
      "https://dtu-master-thesis-tir.herokuapp.com//delete",
      "https://dtu-master-thesis-tir.herokuapp.com/components"
   ],
   optionSuccessStatus: 200
};
 
const app = express();
app.use(express.json());
app.use(cors(corsOption));
app.use(Router);

app.get('/', (req, res) => res.send("Server is up and running!"));
app.listen(PORT, () => {
   console.log("Server is running ..");
});

/*
createTable();
*/

