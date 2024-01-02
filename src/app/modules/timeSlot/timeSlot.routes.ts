import express from 'express';
import { timeSlotController } from './timeSlot.controller';

const router = express.Router();

router.post('/create-time-slot', timeSlotController.createTimeSlot);
router.get('/', timeSlotController.getAllTimeSlot);
router.get('/:id', timeSlotController.getSingleTimeSlot);
router.patch('/:id', timeSlotController.updateTimeSlot);
router.delete('/:id', timeSlotController.deleteTimeSlot);

export const timeSlotRoutes = router;
