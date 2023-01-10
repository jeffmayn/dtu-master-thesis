import axios from "axios";

export const searchByID = async (id, result) => {

   console.log(id);



   /*
      const vulnerabilities = response.data.vulnerabilities;
     // console.log(vulnerabilities);
      console.log("id: " + vulnerabilities[0].cve.id);
   
      console.log("descriptions: ");
      console.log(vulnerabilities[0].cve.descriptions);
   
      console.log("weaknesses: ");
      let weaknesses = vulnerabilities[0].cve.weaknesses;
      for (let i = 0; i < weaknesses.length; i++){
         console.log(weaknesses[i].description);
         console.log(weaknesses[i].type);
         console.log(weaknesses[i].source);
      }
   
   
      console.log("configurations: ");
      let configurations = vulnerabilities[0].cve.configurations;
      for (let i = 0; i < configurations.length; i++){
         console.log(configurations[i].nodes);
      }
      
   
      console.log("references: ");
      console.log(vulnerabilities[0].cve.references);
   
      */


   try {
      const response = await axios.get(`https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=${id}`);
      result(null, response.data);
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

   console.log(keywords);


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



