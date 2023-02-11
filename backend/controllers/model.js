import { getAllVulnerabilitiesFromCPEName } from "../models/cve_model.js";

/*
   entry-point for the frontends rest-call to the server when a system is build
   and they click the run-button.

   takes in a graph-model of the system and returns a nicely formatted json object
   of the systems vulnerabilities.
*/
export const modelJson = async (req, res) => {
   const graph = req.body.graph;

   await getAllVulnerabilitiesInJsonFormat(graph, (err, results) => {
      if (err) {
         res.send(err);
      //  res.json({error:error}); // hacky solution to avoid server crash on production server
      } else {
         return res.json(results);
      }
   });
}

/*
   helper-function that takes in a list of severities and
   returns the most severe from the list:
   order: 'HIGH' > 'MEDIUM' > 'LOW'
*/
function determineSystemSeverity(severities) {
   let severity = "none";

   if (severities.includes("HIGH")) {
      severity = "HIGH"
   } else if (
      !severities.includes("HIGH") &&
      severities.includes("MEDIUM")
   ) {
      severity = "MEDIUM";
   } else {
      severity = "LOW";
   }
   return severity;
}

/*
   creates and returns a nicely formatted json object of all the vulnerabilities
   of all the products (e.g. a router) of the main-component 'INPUT'

   TODO: currently it only looks at the main-component 'INPUT' this function
   should be changed to run through all of the main-components: 
   'INPUT', 'OUTPUT', 'CONTROL' and 'STATE'
*/
const getAllVulnerabilitiesInJsonFormat = async (graph, result) => {

   let sub_nodes = [];
   const cells = graph.cells;

   // frontend tables are displaying via id-indexes
   // so each component and its children have their own index-number
   let subnode_count = 0;
   let product_count = 0;

   // runs through each of the sub-components added to the graph (eg. a 'Router'),
   // exluding the main-componenst: 'INPUT', 'OUTPUT', 'CONTROL' and 'STATE'
   for (const node of cells) {
      const child_nodes = [];
      if (node.type == "sub_node") {
         const main_node = node.ports.items[0].id;
         subnode_count++;

         if (main_node == "input") {
            const sub_node_id = node.id;
            const sub_node_name = node.attrs.text.text; // e.g. 'Router'
            let sub_node_children = node.attrs.children;
            let sub_node_vulnerabilities_length = 0;
            let sub_node_severities = [];

            try {
               // e.g. i = 'microsoft_ms_dos'
               for (const i in sub_node_children) {

                     // get all vulnerabilities associated with e.g. 'microsoft_ms_dos'
                     await getAllVulnerabilitiesFromCPEName(sub_node_children[i].name, (err, results) => {
                        if (err) {
                           result(err, null);
                        } else {
                           sub_node_vulnerabilities_length += results.length;
                           product_count++;
                           let local_severities = [];

                           // pushes the severities of all child-components of e.g. 'Router' to a global list
                           // and the severities of a single product e.g. 'microsoft_ms_dos' to a local list
                           // this is done in order to have a cleaner way of indexing on the frontend.
                           for (const vulnerability of results) {
                              const base_severity = vulnerability.metrics.cvssMetricV2[0].baseSeverity;
                              sub_node_severities.push(base_severity);
                              local_severities.push(base_severity);
                           }
                           // the local severities e.g. 'Router'
                           const highest_severity = determineSystemSeverity(local_severities);
                           child_nodes.push({
                              severity: highest_severity,
                              id: product_count,
                              name: sub_node_children[i].name,
                              title: sub_node_children[i].title,
                              vulnerabilities: results
                           });
                        }
                     });
               }
            } catch (err) {
               console.log(err);
            }
            // the global severities e.g. 'microsoft_ms_dos'
            const highest_severity = determineSystemSeverity(sub_node_severities);

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