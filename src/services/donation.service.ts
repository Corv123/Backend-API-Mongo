import { Donation } from '../models';
import { CreateDonationDto, DonationQueryDto } from '../dtos/donation.dto';

export class DonationService {
  async createDonation(data: CreateDonationDto) {
    try {
      const donation = new Donation(data);
      const saved = await donation.save();
      return saved.toObject();
    } catch (error) {
      console.error('Mongoose Create Donation Error:', error);
      throw error;
    }
  }

  async getDonations(query: DonationQueryDto) {
    try {
      const where: any = { user_id: query.user_id };
      if (query.donation_id !== undefined) {
        where.donation_id = query.donation_id;
      }
      const donations = await Donation.find(where).lean();
      return donations;
    } catch (error) {
      console.error('Error in getDonations service:', error);
      throw error;
    }
  }

  async getAllDonations() {
    try {
      const donations = await Donation.find().lean();
      return donations;
    } catch (error) {
      console.error('Error in getAllDonations service:', error);
      throw error;
    }
  }

  async getDonationById(donationId: number) {
    try {
      const donation = await Donation.findOne({ donation_id: donationId }).lean();
      return donation;
    } catch (error) {
      console.error('Error in getDonationById service:', error);
      throw error;
    }
  }

  async updateDonation(donationId: number, updateData: Partial<CreateDonationDto>) {
    try {
      const updated = await Donation.findOneAndUpdate({ donation_id: donationId }, updateData, { new: true }).lean();
      return updated;
    } catch (error) {
      console.error('Error in updateDonation service:', error);
      throw error;
    }
  }

  async updateDonationStatus(donationId: number, status: string) {
    try {
      const updated = await Donation.findOneAndUpdate({ donation_id: donationId }, { donation_status: status }, { new: true }).lean();
      if (!updated) {
        throw new Error('Donation not found');
      }
      return updated;
    } catch (error) {
      console.error('Error in updateDonationStatus service:', error);
      throw error;
    }
  }

  async calculateTotalDonationsByUser(userId: number) {
    try {
      const donations = await Donation.find({ user_id: userId, donation_status: 'received' }).lean();
      return donations.reduce((total, donation) => total + parseFloat(donation.donation_amt?.toString() || '0'), 0);
    } catch (error) {
      console.error('Error in calculateTotalDonationsByUser service:', error);
      throw error;
    }
  }

  async deleteDonation(donationId: number) {
    try {
      const result = await Donation.deleteOne({ donation_id: donationId });
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error in deleteDonation service:', error);
      throw error;
    }
  }
}