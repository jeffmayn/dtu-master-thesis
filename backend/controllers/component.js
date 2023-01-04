import {
   getComponents,
   getComponentById,
   insertComponent
} from "../models/componentModel.js";

// get all
export const showComponents = (req, res) => {
   getComponents((err, results) => {
      if (err) {
         res.send(err);
      } else {
         res.json(results);
      }
   });
};

// get single
export const showComponentById = (req, res) => {
   getComponentById(req.params.id, (err, results) => {
      if (err) {
         res.send(err);
      } else {
         res.json(results);
      }
   });
};

// create new component
export const createComponent = (req, res) => {

   const data = req.body;

   insertComponent(data, (err, results) => {
      if (err) {
         res.send(err);
      } else {
         res.json(results);
      }
   });
};