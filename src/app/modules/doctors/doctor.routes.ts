import express from 'express';
import { doctorController } from './doctor.controller';

const router = express.Router();

router.post('/create-doctor', doctorController.createDoctor);
router.get('/', doctorController.getAllDoctor);
router.get('/:id', doctorController.getSingleDoctor);
router.patch('/:id', doctorController.updateDoctor);
router.delete('/:id', doctorController.deleteDoctor);

export const doctorRoutes = router;
