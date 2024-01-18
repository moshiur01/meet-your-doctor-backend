import express from 'express';

import { DocServiceController } from './doctorService.controller';

const router = express.Router();

router.post('/create-doctor-service', DocServiceController.createDoctorService);
router.get('/', DocServiceController.getAllDoctorService);

router.get('specific/:id', DocServiceController.getOnlySingleDoctorService);

router.get('/:id', DocServiceController.getSingleDoctorService);

router.patch('/:id', DocServiceController.updateDoctorService);

router.delete('/:id', DocServiceController.deleteDoctorService);

export const DoctorServiceRoutes = router;
