"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const service_controller_1 = require("./service.controller");
const router = express_1.default.Router();
router.post('/create-service', service_controller_1.serviceController.createService);
router.get('/', service_controller_1.serviceController.getAllService);
router.get('/:id', service_controller_1.serviceController.getSingleService);
router.patch('/:id', service_controller_1.serviceController.updateService);
router.delete('/:id', service_controller_1.serviceController.deleteService);
exports.servicesRoutes = router;
