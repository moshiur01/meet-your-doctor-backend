import express from 'express';
import { patientController } from './patient.controller';
const router = express.Router();

router.post('/create-patient', patientController.cratePatient);
router.get('/', patientController.getAllPatients);
export const PatientRoutes = router;
