import express from 'express';
import { appointmentRoutes } from '../modules/appointments/appointment.routes';
import { availableServiceRoutes } from '../modules/availableServices/availableService.routes';
import { doctorRoutes } from '../modules/doctors/doctor.routes';
import { MedicalProfileRoutes } from '../modules/medicalProfiles/medicalProfile.routes';
import { PatientRoutes } from '../modules/patients/patient.routes';
import { servicesRoutes } from '../modules/services/service.routes';
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
  {
    path: '/medical-profile',
    route: MedicalProfileRoutes,
  },
  {
    path: '/appointments',
    route: appointmentRoutes,
  },
  {
    path: '/available-services',
    route: availableServiceRoutes,
  },
  {
    path: '/services',
    route: servicesRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
