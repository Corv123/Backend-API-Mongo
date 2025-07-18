import { merchantController } from "../../controllers/merchants";
import express from 'express';

const router = express.Router();

/* /api/v1/merchants */
router.post("/", merchantController.createMerchant);

/* /api/v1/merchants */
router.get("/", merchantController.getAllMerchants);

export const merchantRoute = router;

/* /api/v1/merchants/:merchant_id */
router.get("/:merchant_id", merchantController.getMerchant);

/* /api/v1/merchants/:merchant_id */
router.put("/:merchant_id", merchantController.updateMerchant);

/* /api/v1/merchants/:merchant_id */
router.delete("/:merchant_id", merchantController.deleteMerchant);