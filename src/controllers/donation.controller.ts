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
        this.getDonations = this.getDonations.bind(this);
    }

    async getAllDonations(req: Request, res: Response) {
        try {
            const donations = await this.donationService.getAllDonations();
            return res.status(200).json({ status: 'success', result: { data: donations } });
        } catch (error) {
            console.error('Error in getAllDonations:', error);
            return res.status(500).json({ status: 'error', message: 'Failed to fetch donations', details: error instanceof Error ? error.message : 'Unknown error' });
        }
    }

    async getDonationById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.donation_id);
            const donation = await this.donationService.getDonationById(id);
            return donation
                ? res.status(200).json({ status: 'success', result: { data: donation } })
                : res.status(404).json({ status: 'error', message: 'Donation not found' });
        } catch (error) {
            console.error('Error in getDonationById:', error);
            return res.status(500).json({ status: 'error', message: 'Error fetching donation', details: error instanceof Error ? error.message : 'Unknown error' });
        }
    }

    async createDonation(req: Request, res: Response) {
        try {
            const donation = await this.donationService.createDonation(req.body as CreateDonationDto);
            return res.status(201).json({
                status: 'success',
                result: { data: [ { donation_message: 'Donation Entry entered successfully.' } ] }
            });
        } catch (error) {
            console.error('Error in createDonation:', error);
            return res.status(500).json({ status: 'error', message: 'Failed to create donation', details: error instanceof Error ? error.message : 'Unknown error' });
        }
    }

    async updateDonation(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.donation_id);
            const updated = await this.donationService.updateDonation(id, req.body);
            return res.status(200).json({ status: 'success', result: { data: updated } });
        } catch (error) {
            console.error('Error in updateDonation:', error);
            return res.status(500).json({ status: 'error', message: 'Failed to update donation', details: error instanceof Error ? error.message : 'Unknown error' });
        }
    }

    async deleteDonation(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.donation_id);
            const deleted = await this.donationService.deleteDonation(id);
            return deleted
                ? res.status(200).json({ status: 'success', message: 'Donation deleted' })
                : res.status(404).json({ status: 'error', message: 'Donation not found' });
        } catch (error) {
            console.error('Error in deleteDonation:', error);
            return res.status(500).json({ status: 'error', message: 'Failed to delete donation', details: error instanceof Error ? error.message : 'Unknown error' });
        }
    }

    async getDonations(req: Request, res: Response) {
        try {
            const userId = parseInt(req.query.user_id as string);
            if (isNaN(userId)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid user_id parameter'
                });
            }
            const donationId = req.query.donation_id ? parseInt(req.query.donation_id as string) : undefined;
            if (req.query.donation_id && isNaN(donationId!)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid donation_id parameter'
                });
            }
            const query: any = {
                user_id: userId,
                donation_id: donationId
            };
            const donations = await this.donationService.getDonations(query);
            return res.status(200).json({
                status: 'success',
                result: { data: donations }
            });
        } catch (error) {
            console.error('Error in getDonations:', error);
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}