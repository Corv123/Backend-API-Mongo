import { Donation } from '../models';
import { CreateDonationDto, DonationQueryDto } from '../dtos/donation.dto';

export class DonationService {
  async createDonation(data: CreateDonationDto) {
    const donation = new Donation(data);
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