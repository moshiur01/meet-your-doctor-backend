import express from 'express';
import { medicineController } from './medicine.controller';

const router = express.Router();

router.get('/', medicineController.getAllMedicineStatus);
router.get('/:id', medicineController.getSingleMedicineStatus);

router.patch('/:id', medicineController.updateSingleMedicineStatus);

export const medicineRoutes = router;
