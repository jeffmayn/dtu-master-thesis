import { jsonToSomething } from "../models/graphModel.js";



export const modelJson = (req, res) => {

   const data = req.body;


   const nodes = data.nodes;
   const edges = data.edges;
   

   console.log(nodes);
   console.log(edges);
   res.send("finno");

};