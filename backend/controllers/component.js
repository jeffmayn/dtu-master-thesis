import {
   getComponents,
   getComponentById,
   insertComponent,
   deleteComponentById
} from "../models/componentModel.js";



// returns all components from the database (e.g. 'router', 'keyboard', 'printer')
export const showComponents = (req, res) => {
   getComponents((err, results) => {
      if (err) {
         res.send(err);
      } else {
         res.json(results);
      }
   });
};

// returns a single component from the database based on its id
export const showComponentById = (req, res) => {
   getComponentById(req.params.id, (err, results) => {
      if (err) {
         res.send(err);
      } else {
         res.json(results);
      }
   });
};

// create new component to the database
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

// delete a component from the database based on it id
export const deleteComponent = (req, res) => {
   const id = req.params.id;
   deleteComponentById(id, (err, results) => {
      if (err) {
         res.send(err);
      } else {
         res.json(results);
      }
   });
};