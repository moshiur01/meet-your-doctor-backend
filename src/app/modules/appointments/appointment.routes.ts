import express from 'express';
import { appointmentController } from './appointment.controller';

const router = express.Router();

router.post('/book-appointment', appointmentController.bookAppointment);

export const appointmentRoutes = router;
