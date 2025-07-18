import express from "express";
import userRoutes from "./users";
import orderRoutes from "./orders";
import donationRoutes from "./donations";

const router = express.Router();

/* /api/v1/users */
router.use("/users", userRoutes);

/* /api/v1/orders */
router.use("/orders", orderRoutes);

/* /api/v1/donations */
router.use("/donations", donationRoutes);

export const allRoutes = router;