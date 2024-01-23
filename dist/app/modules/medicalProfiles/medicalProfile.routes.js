"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalProfileRoutes = void 0;
const express_1 = __importDefault(require("express"));
const medicalProfile_controller_1 = require("./medicalProfile.controller");
const router = express_1.default.Router();
router.get('/', medicalProfile_controller_1.medicalProfileController.getAllMedicalProfile);
router.get('/:id', medicalProfile_controller_1.medicalProfileController.getSingleMedicalProfile);
router.patch('/:id', medicalProfile_controller_1.medicalProfileController.updateMedicalProfile);
exports.MedicalProfileRoutes = router;
