import express from 'express';
import { merchantRoute } from "../merchants/merchant_route";
import { productRoute } from "./products/product_route";

const router = express.Router();

/* /api/v1/merchants/products */
router.use("/products", productRoute);

/* /api/v1/merchants */
router.use("/", merchantRoute); 



export default router;