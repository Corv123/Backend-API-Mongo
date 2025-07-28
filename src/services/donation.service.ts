import { Donation } from '../models';
import { CreateDonationDto, DonationQueryDto } from '../dtos/donation.dto';
import { Counter } from '../models/counter';
import { User } from '../models/User';
import mongoose from 'mongoose';

export class DonationService {
  async createDonation(data: CreateDonationDto) {
    // Use donation_id from frontend or generate random 4-digit number
    const donation_id = data.donation_id || Math.floor(1000 + Math.random() * 9000);

    // Find user by user_id (number)
    const user = await User.findOne({ user_id: data.user_id });
    if (!user) {
      throw new Error('Invalid user_id: user not found');
    }

    // Prepare donation data
    const donationData: any = {
      ...data,
      donation_id,
      user_id: user._id, // Use ObjectId
    };

    // Create and save donation
    const donation = new Donation(donationData);
    return await donation.save();
  }

  async getDonations(query: DonationQueryDto) {
    const where: any = { user_id: query.user_id };
    if (query.donation_id !== undefined) {
      where.donation_id = query.donation_id;
    }
    return await Donation.find(where).lean();
  }

  async getAllDonations() {
    return await Donation.find().lean();
  }

  async getDonationById(donationId: number) {
    return await Donation.findOne({ donation_id: donationId }).lean();
    }

  async updateDonation(donationId: number, updateData: Partial<CreateDonationDto>) {
    return await Donation.findOneAndUpdate({ donation_id: donationId }, updateData, { new: true }).lean();
  }

  async deleteDonation(donationId: number) {
    const result = await Donation.deleteOne({ donation_id: donationId });
    return result.deletedCount > 0;
  }
}