
import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
  user_id: number;
  username: string;
  user_mobile_number: string;
  user_email: string;
  user_allow_dark_mode: boolean;
  user_round_up_pref: number;
  user_discount_donate: number;
  user_login_status: boolean;
  user_login_datetime?: Date;
  user_gender?: 'Male' | 'Female' | 'Other';
  password: string;
  tokens: number;
  user_default_donation_method: 'Round Up' | 'Discount Donate';
}

const userSchema = new Schema<UserDocument>({
  user_id: { type: Number, default: () => Math.floor(1000 + Math.random() * 9000), required: true, unique: true },
  username: { type: String, required: true, unique: true, index: true },
  user_mobile_number: { type: String, required: true, unique: true, index: true },
  user_email: { type: String, required: true, index: true },
  user_allow_dark_mode: { type: Boolean, required: true, default: false },
  user_round_up_pref: { type: Number, required: true, default: 0.50 },
  user_discount_donate: { type: Number, required: true, default: 100.00 },
  user_login_status: { type: Boolean, required: true, default: false },
  user_login_datetime: { type: Date },
  user_gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  password: { type: String, required: true },
  tokens: { type: Number, required: true, default: 0 },
  user_default_donation_method: { type: String, enum: ['Round Up', 'Discount Donate'], required: true, default: 'Round Up' },
}, { collection: 'users', timestamps: false });

export const User = mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);