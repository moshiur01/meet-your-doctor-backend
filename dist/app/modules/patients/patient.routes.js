"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientRoutes = void 0;
const express_1 = __importDefault(require("express"));
const patient_controller_1 = require("./patient.controller");
const router = express_1.default.Router();
router.post('/create-patient', patient_controller_1.patientController.cratePatient);
router.get('/', patient_controller_1.patientController.getAllPatients);
router.get('/:id', patient_controller_1.patientController.getSinglePatient);
router.patch('/:id', patient_controller_1.patientController.updatePatient);
router.patch('/updatePassword/:id', patient_controller_1.patientController.updatePatentPassword);
router.delete('/:id', patient_controller_1.patientController.deletePatient);
exports.PatientRoutes = router;
