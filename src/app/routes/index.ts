import express from 'express';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { appointmentRoutes } from '../modules/appointments/appointment.routes';
import { authRoutes } from '../modules/auth/auth.route';

import { doctorEducationRoutes } from '../modules/doctorEducation/doctorEducation.routes';
import { doctorExperienceRoutes } from '../modules/doctorExperience/doctorExperience.routes';
import { DoctorServiceRoutes } from '../modules/doctorService/doctorService.routes';
import { doctorRoutes } from '../modules/doctors/doctor.routes';
import { medicineRoutes } from '../modules/medicine/medicine.routes';
import { medicineManRoutes } from '../modules/medicineMan/medicineMan.routes';
import { PatientRoutes } from '../modules/patients/patient.routes';
import { paymentRoutes } from '../modules/payment/payment.routes';
import { PlatformReviewRoutes } from '../modules/platformReview/platformReview.routes';
import { doctorReviewRoutes } from '../modules/reviews/review.routes';
import { specializationRoutes } from '../modules/specializations/specialization.routes';
import { timeSlotRoutes } from '../modules/timeSlot/timeSlot.routes';

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
    path: '/doctor-educations',
    route: doctorEducationRoutes,
  },
  {
    path: '/doctor-experiences',
    route: doctorExperienceRoutes,
  },
  {
    path: '/patients',
    route: PatientRoutes,
  },
  {
    path: '/medicines',
    route: medicineRoutes,
  },
  {
    path: '/medicine-mans',
    route: medicineManRoutes,
  },
  {
    path: '/appointments',
    route: appointmentRoutes,
  },

  {
    path: '/doctor-services',
    route: DoctorServiceRoutes,
  },
  {
    path: '/doctor-reviews',
    route: doctorReviewRoutes,
  },
  {
    path: '/platform-reviews',
    route: PlatformReviewRoutes,
  },

  {
    path: '/time-slots',
    route: timeSlotRoutes,
  },

  {
    path: '/payments',
    route: paymentRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
