import {
   getProducts,
   getProductById,
   insertProduct
} from "../models/productModel.js";

// get all
export const showProducts = (req, res) => {
   getProducts((err, results) => {
      if (err) {
         res.send(err);
      } else {
         res.json(results);
      }
   });
};

// get single
export const showProductById = (req, res) => {
   getProductById(req.params.id, (err, results) => {
      if (err) {
         res.send(err);
      } else {
         res.json(results);
      }
   });
};

// create new
export const createProduct = (req, res) => {

   const data = req.body;

   insertProduct(data, (err, results) => {
      if (err) {
         res.send(err);
      } else {
         res.json(results);
      }
   });
};