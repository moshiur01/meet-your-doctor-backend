import express from 'express';
import { appointmentController } from './appointment.controller';

const router = express.Router();

router.post('/book-appointment', appointmentController.bookAppointment);
router.patch(
  '/cancel-appointment/:id',
  appointmentController.canceledAppointment
);

router.get('/', appointmentController.getAllAppointment);
router.get('/:id', appointmentController.getSingleAppointment);
router.patch('/:id', appointmentController.updateAppointment);
router.delete('/:id', appointmentController.deleteAppointment);

export const appointmentRoutes = router;
