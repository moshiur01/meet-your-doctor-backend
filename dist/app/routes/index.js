"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_routes_1 = require("../modules/admin/admin.routes");
const appointment_routes_1 = require("../modules/appointments/appointment.routes");
const auth_route_1 = require("../modules/auth/auth.route");
const doctorEducation_routes_1 = require("../modules/doctorEducation/doctorEducation.routes");
const doctorExperience_routes_1 = require("../modules/doctorExperience/doctorExperience.routes");
const doctorService_routes_1 = require("../modules/doctorService/doctorService.routes");
const doctor_routes_1 = require("../modules/doctors/doctor.routes");
const medicine_routes_1 = require("../modules/medicine/medicine.routes");
const medicineMan_routes_1 = require("../modules/medicineMan/medicineMan.routes");
const patient_routes_1 = require("../modules/patients/patient.routes");
const payment_routes_1 = require("../modules/payment/payment.routes");
const platformReview_routes_1 = require("../modules/platformReview/platformReview.routes");
const review_routes_1 = require("../modules/reviews/review.routes");
const specialization_routes_1 = require("../modules/specializations/specialization.routes");
const timeSlot_routes_1 = require("../modules/timeSlot/timeSlot.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/specializations',
        route: specialization_routes_1.specializationRoutes,
    },
    {
        path: '/doctors',
        route: doctor_routes_1.doctorRoutes,
    },
    {
        path: '/doctor-educations',
        route: doctorEducation_routes_1.doctorEducationRoutes,
    },
    {
        path: '/doctor-experiences',
        route: doctorExperience_routes_1.doctorExperienceRoutes,
    },
    {
        path: '/patients',
        route: patient_routes_1.PatientRoutes,
    },
    {
        path: '/medicines',
        route: medicine_routes_1.medicineRoutes,
    },
    {
        path: '/medicine-mans',
        route: medicineMan_routes_1.medicineManRoutes,
    },
    {
        path: '/appointments',
        route: appointment_routes_1.appointmentRoutes,
    },
    {
        path: '/doctor-services',
        route: doctorService_routes_1.DoctorServiceRoutes,
    },
    {
        path: '/doctor-reviews',
        route: review_routes_1.doctorReviewRoutes,
    },
    {
        path: '/platform-reviews',
        route: platformReview_routes_1.PlatformReviewRoutes,
    },
    {
        path: '/time-slots',
        route: timeSlot_routes_1.timeSlotRoutes,
    },
    {
        path: '/payments',
        route: payment_routes_1.paymentRoutes,
    },
    {
        path: '/admins',
        route: admin_routes_1.AdminRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.authRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
