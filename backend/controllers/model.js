import { jsonToSomething } from "../models/graphModel.js";
import axios from "axios";

import {
   RequestCVEAssociatedASpecificCPE,
} from "../models/cveModel.js";

import {
   trold2
} from "../models/cveModel.js";


export const modelJson = async (req, res) => {

   const graph = req.body.graph;

   await fuckyou(graph, (err, results) => {
      if (err) {
         res.send(err);
      } else {
         // console.log(results);
         res.json(results);
      }
   });

}

function determine_system_severity(severities) {

   let severity = "none";

   if (severities.includes("HIGH")) {

      severity = "HIGH"

   } else if (!severities.includes("HIGH") && severities.includes("MEDIUM")) {

      severity = "MEDIUM";

   } else {
      severity = "LOW";
   }

   return severity;

}



const fuckyou = async (graph, result) => {



   let sub_nodes = [];

   const cells = graph.cells;
   let subnode_count = 0;
   let product_count = 0;

   for (const node of cells) {

      const child_nodes = [];


      if (node.type == "sub_node") {
         const main_node = node.ports.items[0].id;
         subnode_count++;

         if (main_node == "input") {

            const sub_node_id = node.id;
            const sub_node_name = node.attrs.text.text; // e.g. router
            let sub_node_children = node.attrs.children;
            let sub_node_vulnerabilities_length = 0;
            let sub_node_vulnerabilities = [];
            let sub_node_severities = [];

            try {
               for (const i in sub_node_children) { // e.g.  microsoft_ms_dos
                  await trold2(sub_node_children[i].name, (err, results) => {
                     if (err) {
                        result(err, null);
                     } else {

                        sub_node_vulnerabilities_length += results.length;
                        product_count++;

                        let local_severities = [];



                        for (const vulnerability of results) {
                           const base_severity = vulnerability.metrics.cvssMetricV2[0].baseSeverity;
                           sub_node_severities.push(base_severity);
                           local_severities.push(base_severity);
                        }




                        const highest_severity = determine_system_severity(local_severities);



                        child_nodes.push({
                           severity: highest_severity,
                           id: product_count,
                           name: sub_node_children[i].name,
                           title: sub_node_children[i].title,
                           vulnerabilities: results
                        });
                        //   all_vulnerabilities.push(results);
                     }
                  });





               }

            } catch (err) {
               console.log(err);
            }




            const highest_severity = determine_system_severity(sub_node_severities);

            //   const highest_severity = determine_system_severity(sub_node_severities);

            sub_nodes.push({
               severity: highest_severity,
               vulnerabilities: sub_node_vulnerabilities_length,
               id: subnode_count,
               component: sub_node_name,
               products: child_nodes
            });

         }



      }
   }
   result(null, {
      id: 1,
      name: "inputs",
      components: sub_nodes
   });

}