"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorServiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const doctorService_controller_1 = require("./doctorService.controller");
const router = express_1.default.Router();
router.post('/create-doctor-service', doctorService_controller_1.DocServiceController.createDoctorService);
router.get('/', doctorService_controller_1.DocServiceController.getAllDoctorService);
router.get('specific/:id', doctorService_controller_1.DocServiceController.getOnlySingleDoctorService);
router.get('/:id', doctorService_controller_1.DocServiceController.getSingleDoctorService);
router.patch('/:id', doctorService_controller_1.DocServiceController.updateDoctorService);
router.delete('/:id', doctorService_controller_1.DocServiceController.deleteDoctorService);
exports.DoctorServiceRoutes = router;
