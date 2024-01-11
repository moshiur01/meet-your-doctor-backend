import express from 'express';
import { AvailableServiceController } from './availableService.controller';

const router = express.Router();

router.post(
  '/create-available-service',
  AvailableServiceController.createAvailableService
);
router.get('/', AvailableServiceController.getAllAvailableService);
router.get('/:id', AvailableServiceController.getSingleAvailableService);
router.patch('/:id', AvailableServiceController.updateAvailableService);
router.delete('/:id', AvailableServiceController.deleteAvailableService);

export const availableServiceRoutes = router;
