import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const initializeDatabase = async () => {
  try {
    const uri = process.env.MONGO_URI || '';
    if (!uri) {
      throw new Error('MONGO_URI is not defined in .env');
    }

    await mongoose.connect(uri, {
      dbName: 'IWL',
    });

    console.log('✅ MongoDB connected successfully.');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
  }
};