import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dtos/order.dto';

export class OrderController {
    private orderService = new OrderService();

    constructor() {
            this.orderService = new OrderService();

            // Bind all controller methods
            this.getAllOrders = this.getAllOrders.bind(this);
            this.getOrders = this.getOrders.bind(this);
            this.createOrder = this.createOrder.bind(this);
            this.updateOrder = this.updateOrder.bind(this);
            this.deleteOrder = this.deleteOrder.bind(this);
        }

    async getAllOrders(req: Request, res: Response) {
        try {
            const orders = await this.orderService.getAllOrders();
            return res.status(200).json({ status: 'success', data: orders });
        } catch {
            return res.status(500).json({ status: 'error', message: 'Failed to fetch orders' });
        }
    }

async getOrders(req: Request, res: Response) {
  try {
    const user_id = parseInt(req.query.user_id as string);

    if (isNaN(user_id)) {
      return res.status(400).json({ status: 'error', message: 'Invalid user_id' });
    }

    const orders = await this.orderService.getOrders({ user_id });

    return res.status(200).json({ status: 'success', data: orders });

  } catch (err) {
    console.error('Error fetching orders by User ID:', err);
    return res.status(500).json({ status: 'error', message: 'Failed to fetch orders by User ID' });
  }
}

    async getOrderById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.order_id);
            const order = await this.orderService.getOrderById(id);
            return order
                ? res.status(200).json({ status: 'success', data: order })
                : res.status(404).json({ status: 'error', message: 'Order not found' });
        } catch {
            return res.status(500).json({ status: 'error', message: 'Error fetching order' });
        }
    }

    async createOrder(req: Request, res: Response) {
        try {
            const { 
                order_status,
                order_cost,
                total_order_cost,
                order_type,
                merchant_name,
                merchant_location,
                user_id,
                order_items 
            } = req.body;

            // Validate required fields
            if (!order_items || !Array.isArray(order_items) || order_items.length === 0) {
                return res.status(400).json({
                    status: 'error',
                    message: 'order_items is required and must be a non-empty array'
                });
            }

            // Validate each order item
            const validatedOrderItems = order_items.map((item: any) => {
                if (!item.product_id || !item.product_name || !item.quantity || !item.price_per_unit) {
                    throw new Error('Each order item must include product_id, product_name, quantity, and price_per_unit');
                }

                return {
                    product_id: item.product_id,
                    product_name: item.product_name,
                    quantity: item.quantity,
                    price_per_unit: item.price_per_unit
                };
            });

            const newOrderData: CreateOrderDto = {
                order_status,
                order_cost,
                total_order_cost,
                order_type,
                merchant_name,
                merchant_location,
                user_id,
                order_items: validatedOrderItems,
                order_tokens: req.body.order_tokens,        
            };

            const newOrder = await this.orderService.createOrder(newOrderData);

            return res.status(201).json({ status: 'success', data: newOrder });
        } catch (error) {
            console.error('Error in createOrder:', error);
            return res.status(500).json({
                status: 'error',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    async updateOrder(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.order_id);
            const updated = await this.orderService.updateOrder(id, req.body);
            return res.status(200).json({ status: 'success', data: updated });
        } catch {
            return res.status(500).json({ status: 'error', message: 'Failed to update order' });
        }
    }

    async deleteOrder(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.order_id);
            const deleted = await this.orderService.deleteOrder(id);
            return deleted
                ? res.status(200).json({ status: 'success', message: 'Order deleted' })
                : res.status(404).json({ status: 'error', message: 'Order not found' });
        } catch {
            return res.status(500).json({ status: 'error', message: 'Failed to delete order' });
        }
    }
}