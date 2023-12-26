import express from 'express';
import { doctorController } from './doctor.controller';

const router = express.Router();

router.post('/create-doctor', doctorController.createDoctor);

export const doctorRoutes = router;
