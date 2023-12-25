import express from 'express';
import { specializationController } from './specialization.controller';

const router = express.Router();

router.post(
  '/create-specialization',
  specializationController.createSpecialization
);
router.get(
  '/get-specializations',
  specializationController.getAllSpecializations
);

export const specializationRoute = router;
