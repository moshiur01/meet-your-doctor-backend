"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.specializationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const specialization_controller_1 = require("./specialization.controller");
const router = express_1.default.Router();
router.post('/create-specialization', specialization_controller_1.specializationController.createSpecialization);
router.get('/', specialization_controller_1.specializationController.getAllSpecializations);
router.get('/:id', specialization_controller_1.specializationController.getSingleSpecialization);
router.patch('/:id', specialization_controller_1.specializationController.updateSpecialization);
router.delete('/:id', specialization_controller_1.specializationController.deleteSpecialization);
exports.specializationRoutes = router;
