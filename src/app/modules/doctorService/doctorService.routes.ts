import express from 'express';

import { DocServiceController } from './doctorService.controller';

const router = express.Router();

router.post('/create-doctor-service', DocServiceController.createDoctorService);
router.get('/', DocServiceController.getAllDoctorService);
router.get('/:id', DocServiceController.getSingleDoctorService);

export const DoctorServiceRoutes = router;
