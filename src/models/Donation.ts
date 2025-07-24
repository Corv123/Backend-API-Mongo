import mongoose, { Schema, Document } from 'mongoose';

export interface DonationDocument extends Document {
    donation_id: number;
    donation_datetime: Date;
    donation_dsgd_amt: mongoose.Types.Decimal128;
    charity_id: string;
    donation_status: 'pending' | 'received' | 'failed';
    donation_amt: mongoose.Types.Decimal128;
    donation_type: 'direct_donation' | 'round_up';
    donation_cause: string;
    user_id: mongoose.Types.ObjectId;
}

const DonationSchema = new Schema<DonationDocument>({
    donation_id: { type: Number, required: true, unique: true },
    donation_datetime: { type: Date, required: true },
    donation_dsgd_amt: { type: Schema.Types.Decimal128, required: true },
    charity_id: { type: String, required: true },
    donation_status: { 
        type: String, 
        enum: ['pending', 'received', 'failed'], 
        default: 'pending', 
        required: true 
    },
    donation_amt: { type: Schema.Types.Decimal128, required: true },
    donation_type: { 
        type: String, 
        enum: ['direct_donation', 'round_up', 'discount_donate'], 
        required: true 
    },
    donation_cause: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    collection: 'donations',
    timestamps: false,
});

// 🟢 Insert virtual here
DonationSchema.virtual('orders', {
    ref: 'Order',                  // Related model name (must match your Order model)
    localField: '_id',              // This schema's _id
    foreignField: 'donation_id',    // Field in Order model that references Donation
});

// Ensure virtual fields are included when using `toJSON` or `toObject`
DonationSchema.set('toObject', { virtuals: true });
DonationSchema.set('toJSON', { virtuals: true });

export const Donation = mongoose.model<DonationDocument>('Donation', DonationSchema);