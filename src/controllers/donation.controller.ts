import { Request, Response } from 'express';
import { DonationService } from '../services/donation.service';
import { CreateDonationDto } from '../dtos/donation.dto';

export class DonationController {
    private donationService: DonationService;

    constructor() {
        this.donationService = new DonationService();

        // Bind all controller methods
        this.getAllDonations = this.getAllDonations.bind(this);
        this.getDonationById = this.getDonationById.bind(this);
        this.createDonation = this.createDonation.bind(this);
        this.updateDonation = this.updateDonation.bind(this);
        this.deleteDonation = this.deleteDonation.bind(this);
    }

    async getAllDonations(req: Request, res: Response) {
        try {
            const donations = await this.donationService.getAllDonations();
            return res.status(200).json({ status: 'success', data: donations });
        } catch {
            return res.status(500).json({ status: 'error', message: 'Failed to fetch donations' });
        }
    }

    async getDonationById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.donation_id);
            const donation = await this.donationService.getDonationById(id);
            return donation
                ? res.status(200).json({ status: 'success', data: donation })
                : res.status(404).json({ status: 'error', message: 'Donation not found' });
        } catch {
            return res.status(500).json({ status: 'error', message: 'Error fetching donation' });
        }
    }

    async createDonation(req: Request, res: Response) {
        try {
            const donation = await this.donationService.createDonation(req.body as CreateDonationDto);
            return res.status(201).json({ status: 'success', data: donation });
        } catch {
            return res.status(500).json({ status: 'error', message: 'Failed to create donation' });
        }
    }

    async updateDonation(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.donation_id);
            const updated = await this.donationService.updateDonation(id, req.body);
            return res.status(200).json({ status: 'success', data: updated });
        } catch {
            return res.status(500).json({ status: 'error', message: 'Failed to update donation' });
        }
    }

    async deleteDonation(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.donation_id);
            const deleted = await this.donationService.deleteDonation(id);
            return deleted
                ? res.status(200).json({ status: 'success', message: 'Donation deleted' })
                : res.status(404).json({ status: 'error', message: 'Donation not found' });
        } catch {
            return res.status(500).json({ status: 'error', message: 'Failed to delete donation' });
        }
    }
}