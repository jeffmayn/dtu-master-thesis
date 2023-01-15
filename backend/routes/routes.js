import express from "express";
import {
   showComponents,
   showComponentById,
   createComponent,
   deleteComponent,
} from "../controllers/component.js";
import cors from "cors";

import {
   searchSpecificCVE,
   searchCVEMentioningKeywords,
   searchProducts
} from "../controllers/cve.js";
import { modelJson } from "../controllers/model.js";

var corsOption = {
   origin: [
      "https://dtu-tir.netlify.app",
      "https://dtu-master-thesis-tir.herokuapp.com",
   ],
   optionSuccessStatus: 200
};

// handles the rest endpoints from the frontend
const router = express.Router();
router.get("/", cors(corsOptions));
router.get("/components", showComponents, cors(corsOptions));
router.get("/components:id", showComponentById, cors(corsOptions));
router.post("/components", createComponent, cors(corsOptions));
router.post("/model", modelJson, cors(corsOptions));
router.delete("/delete/:id", deleteComponent, cors(corsOptions));
router.get("/cve/:id", searchSpecificCVE, cors(corsOptions));
router.post("/cve", searchCVEMentioningKeywords, cors(corsOptions));
router.post("/searchProduct", searchProducts, cors(corsOptions));

export default router;