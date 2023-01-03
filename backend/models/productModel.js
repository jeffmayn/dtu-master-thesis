import db from "../config/database.js";

export const getProducts = (result) => {
   db.query("SELECT * FROM product", (err, results) => {
      if (err) {
         console.log(err);
         result(err, null);
      } else {
         result(null, results);
      }
   });
};

export const getProductById = (id, result) => {
   db.query("SELECT * FROM PRODUCT WHERE product_id = ?", [id], (err, results) => {
      if (err) {
         console.log(err);
         result(err, null);
      } else {
         result(null, results[0]);
      }
   });
};

export const insertProduct = (data, result) => {
   db.query("INSERT INTO product SET ?", [data], (err, results) => {
      if (err) {
         console.log(err);
         result(err, null);
      } else {
         result(null, results);
      }
   });
};