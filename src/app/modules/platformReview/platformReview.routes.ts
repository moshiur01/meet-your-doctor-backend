import express from 'express';
import { platformReviewController } from './platformReview.controller';

const router = express.Router();

router.post(
  '/create-platform-review',
  platformReviewController.createPlatformReview
);
router.get('/', platformReviewController.getAllPlatformReview);
router.delete('/:id', platformReviewController.deletePlatformReview);

export const PlatformReviewRoutes = router;
