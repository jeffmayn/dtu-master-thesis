import axios from "axios";

export const searchByID = async (id, result) => {

   console.log(id);

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
      console.log(response.data.vulnerabilities[0].cve.descriptions);
      console.log(response.data.vulnerabilities[0].cve.metrics);
      console.log(response.data.vulnerabilities[0].cve.weaknesses);
      console.log(response.data.vulnerabilities[0].cve.configurations);
      console.log(response.data.vulnerabilities[0].cve.references);
      
   } catch (err) {
      result(err, null);
   }
};





export const searchByKeywords = async (keywords, result) => {

   console.log(keywords);


   try {
      const response = await axios.get(`https://services.nvd.nist.gov/rest/json/cves/2.0?cpeName=cpe:2.3:o:${keywords[0]}:${keywords[1]}:22H2:*:*:*:*:*:*:*`);
      //const response = await axios.get(`https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=${keywords}`);

      console.log(response.data);
      result(null, response.data);
   } catch (err) {
      result(err, null);
   }
};

export const searchProductByVendorAndProductNames = async (keywords, result) => {

 //  console.log(keywords);

   try {
      const response = await axios.get(`https://services.nvd.nist.gov/rest/json/cpes/2.0?cpeMatchString=cpe:2.3:o:${keywords[0]}:${keywords[1]}`);

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

export const trold2 = async (cpeName, result) => {

   //  console.log(keywords);
  
     try {
        const response = await axios.get(`https://services.nvd.nist.gov/rest/json/cves/2.0?cpeName=${cpeName}`);
  

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



