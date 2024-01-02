import express from 'express';
import { AvailableServiceController } from './availableService.controller';

const router = express.Router();

router.post(
  '/create-available-service',
  AvailableServiceController.createAvailableService
);

export const availableServiceRoutes = router;
