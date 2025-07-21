import express from 'express';
import { OrderController } from '../controllers/order.controller';

const router = express.Router();
const orderController = new OrderController();

// GET /api/v1/orders?user_id={user_id}&order_id={order_id}
router.get('/', orderController.getAllOrders); // ✅ Get all or filtered orders

// GET /api/v1/orders/:order_id
router.get('/:order_id', orderController.getOrderById); // ✅ Get order by ID

// POST /api/v1/orders
router.post('/', orderController.createOrder); // ✅ Create order

// PUT /api/v1/orders/:order_id
router.put('/:order_id', orderController.updateOrder); // ✅ Update order

// DELETE /api/v1/orders/:order_id
router.delete('/:order_id', orderController.deleteOrder); // ✅ Delete order

export default router;