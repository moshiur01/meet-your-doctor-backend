import express from 'express';
import { roomNumberController } from './roomNumber.controller';

const router = express.Router();

router.post('/create-room-number', roomNumberController.createRoomNumber);
router.get('/', roomNumberController.getAllRoomNumber);

router.get('/not-book', roomNumberController.getNotBookedRoomNumbers);

router.get('/:id', roomNumberController.getSingleRoomNumber);
router.patch('/:id', roomNumberController.updateRoomNumber);
router.delete('/:id', roomNumberController.deleteRoomNumber);

export const roomNumberRoutes = router;
