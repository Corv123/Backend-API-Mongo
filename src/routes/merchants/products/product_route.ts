import { productController } from "../../../controllers/products";
import express from 'express';

const router = express.Router();

/* /api/v1/merchants/products?merchant_id */
router.get("/", productController.getAllProducts)

/* /api/v1/merchants/products/:product_id */
router.get("/:product_id", productController.getProduct)

/* /api/v1/merchants/products */
router.post("/", productController.createProduct)

/* /api/v1/merchants/products/:product_id */
router.put("/:product_id", productController.updateProduct)

/* /api/v1/merchants/products/:product_id */
router.delete("/:product_id", productController.deleteProduct)

export const productRoute = router;