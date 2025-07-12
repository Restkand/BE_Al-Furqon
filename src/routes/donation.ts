import express, { RequestHandler } from 'express';
import { DonationController } from '../controllers/donation';
import { upload } from '../utils/upload';
import { auth, adminAuth } from '../middleware/auth';
import validate from '../middleware/validation';

const router = express.Router();

// Convert controller methods to RequestHandler
const getAllDonations: RequestHandler = DonationController.getAllDonations;
const getDonationById: RequestHandler = DonationController.getDonationById;
const createDonation: RequestHandler = DonationController.createDonation;
const updateDonation: RequestHandler = DonationController.updateDonation;
const deleteDonation: RequestHandler = DonationController.deleteDonation;

const donationValidation = validate({
  title: {
    required: true,
    type: 'string',
    minLength: 3,
    maxLength: 100
  },
  description: {
    required: true,
    type: 'string',
    minLength: 10
  },
  targetAmount: {
    required: true,
    type: 'number',
    min: 0
  }
});

const updateDonationValidation = validate({
  title: {
    type: 'string',
    minLength: 3,
    maxLength: 100
  },
  description: {
    type: 'string',
    minLength: 10
  },
  targetAmount: {
    type: 'number',
    min: 0
  },
  amount: {
    type: 'number',
    min: 0
  }
});

// Public routes
router.get('/donations', getAllDonations);
router.get('/donations/:id', getDonationById);

// Protected routes (require authentication)
router.post('/donations', auth as RequestHandler, upload.single('image'), donationValidation, createDonation);
router.put('/donations/:id', auth as RequestHandler, adminAuth as RequestHandler, upload.single('image'), updateDonationValidation, updateDonation);
router.delete('/donations/:id', auth as RequestHandler, adminAuth as RequestHandler, deleteDonation);

export default router;
