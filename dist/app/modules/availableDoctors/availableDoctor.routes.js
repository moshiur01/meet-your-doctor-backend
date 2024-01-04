"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.availableDoctorRoutes = void 0;
const express_1 = __importDefault(require("express"));
const availableDoctor_controller_1 = require("./availableDoctor.controller");
const router = express_1.default.Router();
router.post('/create-available-doctor', availableDoctor_controller_1.availableDoctorController.createAvailableDoctor);
router.get('/', availableDoctor_controller_1.availableDoctorController.getAllAvailableDoctor);
router.get('/:id', availableDoctor_controller_1.availableDoctorController.getSingleAvailableDoctor);
router.patch('/:id', availableDoctor_controller_1.availableDoctorController.updateAvailableDoctor);
router.delete('/:id', availableDoctor_controller_1.availableDoctorController.deleteAvailableDoctor);
exports.availableDoctorRoutes = router;
