"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const appointment_controller_1 = require("./appointment.controller");
const router = express_1.default.Router();
router.post('/book-appointment', appointment_controller_1.appointmentController.bookAppointment);
router.patch('/cancel-appointment/:id', appointment_controller_1.appointmentController.canceledAppointment);
router.patch('/finish-appointment/:id', appointment_controller_1.appointmentController.finishAppointment);
router.get('/', appointment_controller_1.appointmentController.getAllAppointment);
router.get('/patient/:id', appointment_controller_1.appointmentController.getAllAppointmentsByPatients);
router.get('/doctor/:id', appointment_controller_1.appointmentController.getAllAppointmentsByDoctors);
router.get('/:id', appointment_controller_1.appointmentController.getSingleAppointment);
router.patch('/:id', appointment_controller_1.appointmentController.updateAppointment);
router.delete('/:id', appointment_controller_1.appointmentController.deleteAppointment);
exports.appointmentRoutes = router;
