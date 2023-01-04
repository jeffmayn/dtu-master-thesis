import db from "../config/database.js";

export const getComponents = (result) => {
   db.query("SELECT * FROM components", (err, results) => {
      if (err) {
         console.log(err);
         result(err, null);
      } else {
         result(null, results);
      }
   });
};

export const getComponentById = (id, result) => {
   db.query("SELECT * FROM PRODUCT WHERE component_id = ?", [id], (err, results) => {
      if (err) {
         console.log(err);
         result(err, null);
      } else {
         result(null, results[0]);
      }
   });
};

export const insertComponent = (data, result) => {
   db.query("INSERT INTO components SET ?", [data], (err, results) => {
      if (err) {
         console.log(err);
         result(err, null);
      } else {
         result(null, results);
      }
   });
};