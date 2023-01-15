import {
   searchByID,
   searchByKeywords,
   searchProductByVendorAndProductNames,
} from "../models/cve_model.js";

// returns a json-object of an specific CVE based on its CVE-id
export const searchSpecificCVE = async (req, res) => {
   const id = req.params.id;

   searchByID(id, (err, results) => {
      if (err) {
         res.send(err);
      } else {
         res.json(results);
      }
   });
};

/*
   return all products matching the terms based on:
   vendor name  (e.g. 'Microsoft),
   product name (e.g. 'windows 10')
*/
export const searchCVEMentioningKeywords = async (req, res) => {
   const vendor = req.body.vendor;
   const product = req.body.product;

   searchByKeywords([vendor, product], (err, results) => {
      if (err) {
         res.send(err);
      } else {
         res.json(results);
      }
   });
};

/*
   return all products matching the terms based on:
   vendor name  (e.g. 'Microsoft),
   product name (e.g. 'windows 10')
*/
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