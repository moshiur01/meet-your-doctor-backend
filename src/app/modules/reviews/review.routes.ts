import express from 'express';
import { doctorReviewController } from './review.controller';

const router = express.Router();

router.post('/create-review', doctorReviewController.createDoctorReview);
router.get('/', doctorReviewController.getAllDoctorReview);
router.get('/doctor/:id', doctorReviewController.getSpecificDoctorReview);

export const doctorReviewRoutes = router;
