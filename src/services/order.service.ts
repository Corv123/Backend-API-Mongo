import { Order } from '../models';
import { CreateOrderDto, OrderQueryDto } from '../dtos/order.dto';

export class OrderService {
  async createOrder(data: CreateOrderDto) {
    const order = new Order(data);
    return await order.save();
  }

  async getOrders(query: OrderQueryDto) {
    const where: any = { user_id: query.user_id };
    if (query.order_id !== undefined) {
      where.order_id = query.order_id;
    }
    return await Order.find(where).lean();
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