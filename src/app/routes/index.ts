import express from 'express';
import { specializationRoute } from '../modules/specializations/specialization.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/specialization',
    route: specializationRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
