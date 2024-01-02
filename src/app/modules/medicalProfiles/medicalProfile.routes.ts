import express from 'express';
import { medicalProfileController } from './medicalProfile.controller';

const router = express.Router();

router.get('/', medicalProfileController.getAllMedicalProfile);
router.get('/:id', medicalProfileController.getSingleMedicalProfile);
router.patch('/:id', medicalProfileController.updateMedicalProfile);

export const MedicalProfileRoutes = router;
