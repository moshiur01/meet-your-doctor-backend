import express from 'express';
import { doctorReviewController } from './review.controller';

const router = express.Router();

router.post('/create-review', doctorReviewController.createDoctorReview);

router.get('/', doctorReviewController.getAllDoctorReview);

router.get('/doctor/:id', doctorReviewController.getSpecificDoctorReview);

router.delete('/:id', doctorReviewController.deleteDoctorReview);

export const doctorReviewRoutes = router;
