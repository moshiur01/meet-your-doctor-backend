"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_routes_1 = require("../modules/admin/admin.routes");
const appointment_routes_1 = require("../modules/appointments/appointment.routes");
const auth_route_1 = require("../modules/auth/auth.route");
const availableDoctor_routes_1 = require("../modules/availableDoctors/availableDoctor.routes");
const availableService_routes_1 = require("../modules/availableServices/availableService.routes");
const doctor_routes_1 = require("../modules/doctors/doctor.routes");
const medicalProfile_routes_1 = require("../modules/medicalProfiles/medicalProfile.routes");
const patient_routes_1 = require("../modules/patients/patient.routes");
const payment_routes_1 = require("../modules/payment/payment.routes");
const service_routes_1 = require("../modules/services/service.routes");
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
        path: '/patients',
        route: patient_routes_1.PatientRoutes,
    },
    {
        path: '/medical-profiles',
        route: medicalProfile_routes_1.MedicalProfileRoutes,
    },
    {
        path: '/appointments',
        route: appointment_routes_1.appointmentRoutes,
    },
    {
        path: '/available-services',
        route: availableService_routes_1.availableServiceRoutes,
    },
    {
        path: '/services',
        route: service_routes_1.servicesRoutes,
    },
    {
        path: '/time-slots',
        route: timeSlot_routes_1.timeSlotRoutes,
    },
    {
        path: '/available-doctors',
        route: availableDoctor_routes_1.availableDoctorRoutes,
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
