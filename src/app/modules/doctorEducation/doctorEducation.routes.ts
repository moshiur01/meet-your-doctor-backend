import express from 'express';
import { doctorEducationController } from './doctorEducation.controller';

const router = express.Router();

router.post(
  '/create-doctor-education',
  doctorEducationController.createDoctorEducation
);

router.get('/', doctorEducationController.getAllDoctorEducation);

router.get(
  '/doctor/:id',
  doctorEducationController.getSingleSpecificDoctorEducation
);

router.get('/:id', doctorEducationController.getSingleDoctorEducation);

router.patch('/:id', doctorEducationController.updateDoctorEducation);

router.delete('/:id', doctorEducationController.deleteDoctorEducation);

export const doctorEducationRoutes = router;
