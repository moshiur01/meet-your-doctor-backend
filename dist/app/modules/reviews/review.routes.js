"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
router.post('/create-review', review_controller_1.doctorReviewController.createDoctorReview);
router.get('/', review_controller_1.doctorReviewController.getAllDoctorReview);
router.get('/doctor/:id', review_controller_1.doctorReviewController.getSpecificDoctorReview);
router.delete('/:id', review_controller_1.doctorReviewController.deleteDoctorReview);
exports.doctorReviewRoutes = router;
