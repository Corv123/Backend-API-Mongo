import { Order } from '../models';
import { CreateOrderDto, OrderQueryDto } from '../dtos/order.dto';

function getRandom4DigitId() {
    return Math.floor(1000 + Math.random() * 9000);
}

async function generateUnique4DigitOrderId(): Promise<number> {
    let id: number;
    let exists = true;
    do {
        id = getRandom4DigitId();
        const order = await Order.findOne({ order_id: id }).lean();
        exists = !!order;
    } while (exists);
    return id;
}

export class OrderService {
  async createOrder(data: CreateOrderDto) {
    try {
      const order_id = await generateUnique4DigitOrderId();
      const order = new Order({ ...data, order_id });
      const saved = await order.save();
      return saved.toObject();
    } catch (error) {
      console.error('Mongoose Create Order Error:', error);
      throw error;
    }
  }

  async getOrders(query: OrderQueryDto) {
    try {
      const where: any = {};
      if (query.user_id !== undefined) {
        where.user_id = query.user_id;
      }
      if (query.order_id !== undefined) {
        where.order_id = query.order_id;
      }
      if (query.start_date && query.end_date) {
        const start = new Date(query.start_date);
        let end = new Date(query.end_date);
        if (query.end_date.length <= 10) {
          end.setHours(23, 59, 59, 999);
        }
        where.order_complete_datetime = { $gte: start, $lte: end };
      }
      const orders = await Order.find(where).lean();
      return orders;
    } catch (error) {
      console.error('Error in getOrders service:', error);
      throw error;
    }
  }

  async getOrderById(orderId: number) {
    try {
      const order = await Order.findOne({ order_id: orderId }).lean();
      return order;
    } catch (error) {
      console.error('Error in getOrderById service:', error);
      throw error;
    }
  }

  async getAllOrders() {
    try {
      const orders = await Order.find().lean();
      return orders;
    } catch (error) {
      console.error('Error in getAllOrders service:', error);
      throw error;
    }
  }

  async updateOrder(orderId: number, updateData: Partial<CreateOrderDto>) {
    try {
      const updated = await Order.findOneAndUpdate({ order_id: orderId }, updateData, { new: true }).lean();
      return updated;
    } catch (error) {
      console.error('Error in updateOrder service:', error);
      throw error;
    }
  }

  async updateOrderStatus(orderId: number, status: string) {
    try {
      const update: any = { order_status: status };
      if (status === 'completed') {
        update.order_complete_datetime = new Date();
      }
      const updated = await Order.findOneAndUpdate({ order_id: orderId }, update, { new: true }).lean();
      if (!updated) {
        throw new Error('Order not found');
      }
      return updated;
    } catch (error) {
      console.error('Error in updateOrderStatus service:', error);
      throw error;
    }
  }

  async deleteOrder(orderId: number) {
    try {
      const result = await Order.deleteOne({ order_id: orderId });
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error in deleteOrder service:', error);
      throw error;
    }
  }
}