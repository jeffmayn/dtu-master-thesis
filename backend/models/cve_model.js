import axios from "axios";

// rest-call to the CVE-API of an specific CVE based on its it
export const searchByID = async (id, result) => {
   try {
      const response = await axios.get(`https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=${id}`);
      result(null, response.data);
   } catch (err) {
      result(err, null);
   }
};

// Request the CVE associated a specific CPE
export const RequestCVEAssociatedASpecificCPE = async (cve, result) => {
   try {
      const response = await axios.get(`https://services.nvd.nist.gov/rest/json/cves/2.0?cpeName=${cve}`);
      result(null, response.data);      
   } catch (err) {
      result(err, null);
   }
};

/*
   rest-call to the CVE-API.
   creates and return all products matching the terms based on:
   vendor name  (e.g. 'Microsoft),
   product name (e.g. 'windows 10')
*/
export const searchByKeywords = async (keywords, result) => {
   try {
      const response = await axios.get(`https://services.nvd.nist.gov/rest/json/cves/2.0?cpeName=cpe:2.3:o:${keywords[0]}:${keywords[1]}:22H2:*:*:*:*:*:*:*`);
      result(null, response.data);
   } catch (err) {
      result(err, null);
   }
};

/*
   rest-call to the CVE-API.
   creates and return all products matching the terms based on:
   vendor name  (e.g. 'Microsoft),
   product name (e.g. 'windows 10')
*/
export const searchProductByVendorAndProductNames = async (keywords, result) => {
   try {
      // cpe:<cpe_version>:<part>:<vendor>:<version>:<update>:<edition>:<language>:<sw_edition>:<target_sw>:<other>
      // part: 'a' for application, 'b' for hardware, 'o' for operating systems, '*' for all
      const response = await axios.get(`https://services.nvd.nist.gov/rest/json/cpes/2.0?cpeMatchString=cpe:2.3:*:${keywords[0]}:${keywords[1]}`);
      const products = response.data.products;
      const final_response = [];

      for (let i = 0; i < products.length; i++) {
         const cpeName = products[i].cpe.cpeName;
         const cpeNameId = products[i].cpe.cpeNameId;
         const cpeTitle = products[i].cpe.titles[0].title;

         const product = {
            cpeName: cpeName,
            cpeNameId: cpeNameId,
            cpeTitle: cpeTitle
         };
         final_response.push(product);
      }
      result(null, final_response);
   } catch (err) {
      result(err, null);
   }
};

/*
   rest get-request that recieves and returns all the vulnerabilities from a specific cpe-name.
   CPE: Official Common Platform Enumeration (CPE) Dictionary
   See more info: https://nvd.nist.gov/products/cpe
*/
export const getAllVulnerabilitiesFromCPEName = async (cpeName, result) => {  
     try {
        const response = await axios.get(`https://services.nvd.nist.gov/rest/json/cves/2.0?cpeName=${cpeName}`).catch(function (error) {
         //res.end();
           if (error.response) {
              console.log("ERROR RESPONSE");
           } else if (error.request) {
              console.log("ERROR REQUEST");
           } else {
              console.log("ANDEN ERROR");
           }
        });
        const vulnerabilities_data = response.data.vulnerabilities;
        const len = vulnerabilities_data.length;

        let vulnerabilities = [];
        for (let i = 0; i < len; i++){
         let vulnerability = {
            "description" : response.data.vulnerabilities[i].cve.descriptions,
            "metrics": response.data.vulnerabilities[i].cve.metrics,
            "weaknesses" : response.data.vulnerabilities[i].cve.weaknesses,
            "configurations": response.data.vulnerabilities[i].cve.configurations,
            "references" : response.data.vulnerabilities[0].cve.references
         };
         vulnerabilities.push(vulnerability);
        }
        result(null, vulnerabilities);
     } catch (err) {
        result(err, null);
     }
  };



