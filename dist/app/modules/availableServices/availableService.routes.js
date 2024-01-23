"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.availableServiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const availableService_controller_1 = require("./availableService.controller");
const router = express_1.default.Router();
router.post('/create-available-service', availableService_controller_1.AvailableServiceController.createAvailableService);
router.get('/', availableService_controller_1.AvailableServiceController.getAllAvailableService);
router.get('/:id', availableService_controller_1.AvailableServiceController.getSingleAvailableService);
router.patch('/:id', availableService_controller_1.AvailableServiceController.updateAvailableService);
router.delete('/:id', availableService_controller_1.AvailableServiceController.deleteAvailableService);
exports.availableServiceRoutes = router;
