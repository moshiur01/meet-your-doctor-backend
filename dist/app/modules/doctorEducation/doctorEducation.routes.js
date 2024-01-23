"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorEducationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const doctorEducation_controller_1 = require("./doctorEducation.controller");
const router = express_1.default.Router();
router.post('/create-doctor-education', doctorEducation_controller_1.doctorEducationController.createDoctorEducation);
router.get('/', doctorEducation_controller_1.doctorEducationController.getAllDoctorEducation);
router.get('/doctor/:id', doctorEducation_controller_1.doctorEducationController.getSingleSpecificDoctorEducation);
router.get('/:id', doctorEducation_controller_1.doctorEducationController.getSingleDoctorEducation);
router.patch('/:id', doctorEducation_controller_1.doctorEducationController.updateDoctorEducation);
router.delete('/:id', doctorEducation_controller_1.doctorEducationController.deleteDoctorEducation);
exports.doctorEducationRoutes = router;
