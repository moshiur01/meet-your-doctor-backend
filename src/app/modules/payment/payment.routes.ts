import express from 'express';
import { paymentController } from './payment.controller';

const router = express.Router();

router.get('/', paymentController.getAllPayment);
router.get('/:id', paymentController.getSinglePayment);
router.patch('/:id', paymentController.updatePayment);

export const paymentRoutes = router;
