import { jsonToSomething } from "../models/graphModel.js";
import axios from "axios";



export const modelJson = async (req, res) => {
   

   const data = req.body;


   const nodes = data.nodes;
   const edges = data.edges;

   /*
   await axios.get('https://cve.circl.lu/api/search/microsoft/adam')
      .then(result => {
         console.log(result);
      })
      .catch(error => {
         console.log(error);
      });
   */
   

   console.log(nodes);
   console.log(edges);
   res.json({'status' : '200'})

};