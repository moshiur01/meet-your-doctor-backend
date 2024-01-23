"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorExperienceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const doctorExperience_controller_1 = require("./doctorExperience.controller");
const router = express_1.default.Router();
router.post('/create-doctor-experience', doctorExperience_controller_1.doctorExperienceController.createDoctorExperience);
router.get('/', doctorExperience_controller_1.doctorExperienceController.getAllDoctorExperience);
router.get('/doctor/:id', doctorExperience_controller_1.doctorExperienceController.getSingleSpecificDoctorExperience);
router.get('/:id', doctorExperience_controller_1.doctorExperienceController.getSingleDoctorExperience);
router.patch('/:id', doctorExperience_controller_1.doctorExperienceController.updateDoctorExperience);
router.delete('/:id', doctorExperience_controller_1.doctorExperienceController.deleteDoctorExperience);
exports.doctorExperienceRoutes = router;
