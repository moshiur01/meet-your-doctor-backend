import express from 'express';
import { patientController } from './patient.controller';
const router = express.Router();

router.post('/create-patient', patientController.cratePatient);
router.get('/', patientController.getAllPatients);
router.get('/:id', patientController.getSinglePatient);
router.patch('/:id', patientController.updatePatient);
router.delete('/:id', patientController.deletePatient);
export const PatientRoutes = router;
