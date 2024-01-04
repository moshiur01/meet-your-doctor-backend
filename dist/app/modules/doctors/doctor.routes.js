"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorRoutes = void 0;
const express_1 = __importDefault(require("express"));
const doctor_controller_1 = require("./doctor.controller");
const router = express_1.default.Router();
router.post('/create-doctor', doctor_controller_1.doctorController.createDoctor);
router.get('/', doctor_controller_1.doctorController.getAllDoctor);
router.get('/:id', doctor_controller_1.doctorController.getSingleDoctor);
router.patch('/:id', doctor_controller_1.doctorController.updateDoctor);
router.delete('/:id', doctor_controller_1.doctorController.deleteDoctor);
exports.doctorRoutes = router;
