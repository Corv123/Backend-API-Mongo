import express from "express"
import { productRoute } from "./product_route";

const router = express.Router();

router.use('/', productRoute)

export default router;