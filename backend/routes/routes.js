import express from "express";
import {
   showComponents,
   showComponentById,
   createComponent,
   deleteComponent,
} from "../controllers/component.js";

import {
   searchSpecificCVE,
   searchCVEMentioningKeywords,
   searchProducts
} from "../controllers/cve.js";
import { modelJson } from "../controllers/model.js";

const router = express.Router();

router.get("/");
router.get("/components", showComponents);
router.get("/components:id", showComponentById);
router.post("/components", createComponent);
router.post("/model", modelJson);
router.delete("/delete/:id", deleteComponent);

router.get("/cve/:id", searchSpecificCVE);
router.post("/cve", searchCVEMentioningKeywords);

router.post("/searchProduct", searchProducts);



export default router;