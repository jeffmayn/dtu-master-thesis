import express from "express";
import {
   showProducts,
   showProductById,
   createProduct
} from "../controllers/product.js";

const router = express.Router();

router.get("/");
router.get("/products", showProducts);
router.get("/products:id", showProductById);
router.post("/products", createProduct);

export default router;