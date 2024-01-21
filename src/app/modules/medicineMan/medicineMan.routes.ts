import express from 'express';
import { medicineManController } from './medicineMan.controller';
const router = express.Router();

router.post('/create-medicine-man', medicineManController.createMedicineMan);

router.get('/', medicineManController.getAllMedicineMan);

router.get('/:id', medicineManController.getSingleMedicineMan);

router.patch('/:id', medicineManController.updateMedicineMan);

router.delete('/:id', medicineManController.deleteMedicineMan);

export const medicineManRoutes = router;
