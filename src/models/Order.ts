import mongoose, { Schema, Document } from 'mongoose';

interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  price_per_unit: mongoose.Types.Decimal128;
}

export interface OrderDocument extends Document {
  order_id: number;
  order_status: 'pending' | 'paid' | 'completed' | 'cancelled';
  order_cost: mongoose.Types.Decimal128;
  total_order_cost: mongoose.Types.Decimal128;
  order_type: 'Takeaway' | 'Dine-In' | 'Delivery';
  merchant_name: string;
  merchant_location: string;
  donation_id?: number;
  order_complete_datetime?: Date;
  user_id: number;
  order_items: OrderItem[];
  order_tokens: number;
}

const OrderItemSchema = new Schema({
  product_id: { type: String, required: true },
  product_name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price_per_unit: { type: Schema.Types.Decimal128, required: true },
  special_request: { type: String, required: false },
});

const OrderSchema = new Schema<OrderDocument>({
  order_id: {
    type: Number,
    default: () => Math.floor(1000 + Math.random() * 9000),
    required: true
  },
  order_status: {
    type: String,
    enum: ['pending', 'paid', 'completed', 'cancelled'],
    default: 'pending',
    required: true
  },
  order_cost:          { type: Schema.Types.Decimal128, required: true },
  total_order_cost:    { type: Schema.Types.Decimal128, required: true },
  order_type: {
    type: String,
    enum: ['Takeaway', 'Dine-In', 'Delivery'],
    required: true
  },
  merchant_name:       { type: String, required: true },
  merchant_location:   { type: String, required: true },
  donation_id: {
    type: Number,
    required: false
  },
  order_complete_datetime: { type: Date, required: false },

  user_id: {type: Number,required: true},
  

  order_tokens: { type: Number, required: true, default: 0 },

  order_items: {type: [OrderItemSchema],required: true}
}, {
  collection: 'orders',
  timestamps: false,
});

export const Order = mongoose.models.Order
  || mongoose.model<OrderDocument>('Order', OrderSchema);