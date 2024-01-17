import express from 'express';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { appointmentRoutes } from '../modules/appointments/appointment.routes';
import { authRoutes } from '../modules/auth/auth.route';
import { availableDoctorRoutes } from '../modules/availableDoctors/availableDoctor.routes';
import { availableServiceRoutes } from '../modules/availableServices/availableService.routes';
import { DoctorServiceRoutes } from '../modules/doctorService/doctorService.routes';
import { doctorRoutes } from '../modules/doctors/doctor.routes';
import { MedicalProfileRoutes } from '../modules/medicalProfiles/medicalProfile.routes';
import { PatientRoutes } from '../modules/patients/patient.routes';
import { paymentRoutes } from '../modules/payment/payment.routes';
import { doctorReviewRoutes } from '../modules/reviews/review.routes';
import { servicesRoutes } from '../modules/services/service.routes';
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
    path: '/patients',
    route: PatientRoutes,
  },
  {
    path: '/medical-profiles',
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
    path: '/doctor-services',
    route: DoctorServiceRoutes,
  },
  {
    path: '/doctor-reviews',
    route: doctorReviewRoutes,
  },
  {
    path: '/services',
    route: servicesRoutes,
  },
  {
    path: '/time-slots',
    route: timeSlotRoutes,
  },
  {
    path: '/available-doctors',
    route: availableDoctorRoutes,
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
