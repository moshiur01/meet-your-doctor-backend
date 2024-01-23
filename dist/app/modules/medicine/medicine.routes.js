"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicineRoutes = void 0;
const express_1 = __importDefault(require("express"));
const medicine_controller_1 = require("./medicine.controller");
const router = express_1.default.Router();
router.get('/', medicine_controller_1.medicineController.getAllMedicineStatus);
router.get('/:id', medicine_controller_1.medicineController.getSingleMedicineStatus);
router.patch('/:id', medicine_controller_1.medicineController.updateSingleMedicineStatus);
exports.medicineRoutes = router;
