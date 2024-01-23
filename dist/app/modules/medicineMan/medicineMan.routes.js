"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicineManRoutes = void 0;
const express_1 = __importDefault(require("express"));
const medicineMan_controller_1 = require("./medicineMan.controller");
const router = express_1.default.Router();
router.post('/create-medicine-man', medicineMan_controller_1.medicineManController.createMedicineMan);
router.get('/', medicineMan_controller_1.medicineManController.getAllMedicineMan);
router.get('/:id', medicineMan_controller_1.medicineManController.getSingleMedicineMan);
router.patch('/:id', medicineMan_controller_1.medicineManController.updateMedicineMan);
router.delete('/:id', medicineMan_controller_1.medicineManController.deleteMedicineMan);
exports.medicineManRoutes = router;
