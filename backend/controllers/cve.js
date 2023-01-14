import {
   searchByID,
   searchByKeywords,
   searchProductByVendorAndProductNames,
} from "../models/cveModel.js";

export const searchSpecificCVE = async (req, res) => {

   console.log("searchCVE");

   const id = req.params.id;

   searchByID(id, (err, results) => {
      if (err) {
         res.send(err);
      } else {
         res.json(results);
      }
   });

};







export const searchCVEMentioningKeywords = async (req, res) => {

   const vendor = req.body.vendor;
   const product = req.body.product;


  // const final_keywords = vendor + " " + product;

   searchByKeywords([vendor, product], (err, results) => {
      if (err) {
         res.send(err);
      } else {
         res.json(results);
      }
   });
};

export const searchProducts = async (req, res) => {

   const vendor = req.body.vendor;
   const product = req.body.product;

   searchProductByVendorAndProductNames([vendor, product], (err, results) => {
      if (err) {
         res.send(err);
      } else {
         res.json(results);
      }
   });


};

/*
export const trold = async (cpeName) => {

   await trold2(cpeName, (err, results) => {
      if (err) {
         console.log(err);
      } else {
         console.log(results);
      }
   });


};
*/