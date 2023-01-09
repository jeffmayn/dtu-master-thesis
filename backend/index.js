import express from "express";
import cors from "cors";
import Router from "./routes/routes.js";
/*
import {
   createTable
} from "./models/componentModel.js";
*/
const app = express();
app.use(express.json());
app.use(cors());
app.use(Router);

app.get('/', (req, res) => res.send("Server is up and running!"));

app.listen(5003, () => {
   console.log("Server is running ..");
});

/*
createTable();
*/

