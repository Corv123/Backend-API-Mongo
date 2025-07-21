import express from 'express';
import { OrderController } from '../controllers/order.controller';

const router = express.Router();
const orderController = new OrderController();

router.get('/', orderController.getOrders); // ✅ Correct: supports user_id filter
router.get('/:order_id', orderController.getOrderById);
router.post('/', orderController.createOrder);
router.put('/:order_id', orderController.updateOrder);
router.delete('/:order_id', orderController.deleteOrder);

export default router;