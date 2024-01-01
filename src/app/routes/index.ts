import express from 'express';
import { doctorRoutes } from '../modules/doctors/doctor.routes';
import { PatientRoutes } from '../modules/patients/patient.routes';
import { specializationRoutes } from '../modules/specializations/specialization.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/specializations',
    route: specializationRoutes,
  },
  {
    path: '/doctors',
    route: doctorRoutes,
  },
  {
    path: '/patients',
    route: PatientRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
