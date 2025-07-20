import express from 'express';
import { DonationController } from '../controllers/donation.controller';

const router = express.Router();
const donationController = new DonationController();

// GET /api/v1/donations?user_id={user_id}&donation_id={donation_id}
router.get('/', donationController.getAllDonations); // ✅ Filtered/all donations

// GET /api/v1/donations/:donation_id
router.get('/:donation_id', donationController.getDonationById); // ✅ Single donation

// POST /api/v1/donations
router.post('/', donationController.createDonation); // ✅ Create

// PUT /api/v1/donations/:donation_id
router.put('/:donation_id', donationController.updateDonation); // ✅ Update

// DELETE /api/v1/donations/:donation_id
router.delete('/:donation_id', donationController.deleteDonation); // ✅ Delete

// Add /all endpoint from src copy
router.get('/all', donationController.getAllDonations);

export default router;  