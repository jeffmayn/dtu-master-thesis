import { jsonToSomething } from "../models/graphModel.js";



export const modelJson = (req, res) => {

   const data = req.body;

   console.log(data);
   res.send("finno");

};