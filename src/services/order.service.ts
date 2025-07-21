import { Order } from '../models';
import { CreateOrderDto, OrderQueryDto } from '../dtos/order.dto';

export class OrderService {
  async createOrder(data: CreateOrderDto) {
    const order = new Order({
      ...data,
      order_status: 'completed',
      order_complete_datetime: new Date(),
    });

    return await order.save();
  }

async getOrders(query: { user_id: number }) {
  console.log('Searching orders for user_id:', query.user_id);

  return await Order.find({ user_id: query.user_id }).lean();
}

  async getOrderById(orderId: number) {
    return await Order.findOne({ order_id: orderId }).lean();
    }

  async getAllOrders() {
    return await Order.find().lean();
  }

  async updateOrder(orderId: number, updateData: Partial<CreateOrderDto>) {
    return await Order.findOneAndUpdate({ order_id: orderId }, updateData, { new: true }).lean();
  }

  async deleteOrder(orderId: number) {
    const result = await Order.deleteOne({ order_id: orderId });
    return result.deletedCount > 0;
  }
}

export function orderToClient(order: any) {
    return {
        ...order,
        order_cost: parseFloat(order.order_cost.toString()),
        total_order_cost: parseFloat(order.total_order_cost.toString()),
        order_items: order.order_items.map((item: any) => ({
            ...item,
            price_per_unit: parseFloat(item.price_per_unit.toString()),
        })),
    };
}