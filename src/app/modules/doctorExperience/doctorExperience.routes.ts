import express from 'express';
import { doctorExperienceController } from './doctorExperience.controller';

const router = express.Router();

router.post(
  '/create-doctor-experience',
  doctorExperienceController.createDoctorExperience
);

router.get('/', doctorExperienceController.getAllDoctorExperience);

router.get(
  '/doctor/:id',
  doctorExperienceController.getSingleSpecificDoctorExperience
);

router.get('/:id', doctorExperienceController.getSingleDoctorExperience);

router.patch('/:id', doctorExperienceController.updateDoctorExperience);

router.delete('/:id', doctorExperienceController.deleteDoctorExperience);

export const doctorExperienceRoutes = router;
