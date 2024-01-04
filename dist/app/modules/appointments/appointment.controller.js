"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constants/pagination");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const appointment_service_1 = require("./appointment.service");
const appointments_constrain_1 = require("./appointments.constrain");
const bookAppointment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patientId, availableServiceId, appointmentDate } = req === null || req === void 0 ? void 0 : req.body;
    const result = yield appointment_service_1.appointmentService.bookAppointment(patientId, availableServiceId, appointmentDate);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Appointment created successfully',
        data: result,
    });
}));
const canceledAppointment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield appointment_service_1.appointmentService.canceledAppointment((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Appointment canceled successfully',
        data: result,
    });
}));
const finishAppointment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const result = yield appointment_service_1.appointmentService.finishAppointment((_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Appointment finished successfully',
        data: result,
    });
}));
const getAllAppointment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const filters = (0, pick_1.default)(req.query, appointments_constrain_1.appointmentFilterableFields);
    const result = yield appointment_service_1.appointmentService.getAllAppointment(options, filters);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Appointment data fetched Successfully',
        data: result,
    });
}));
const getSingleAppointment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const result = yield appointment_service_1.appointmentService.getSingleAppointment((_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single appointment data fetched Successfully',
        data: result,
    });
}));
const updateAppointment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const result = yield appointment_service_1.appointmentService.updateAppointment((_d = req === null || req === void 0 ? void 0 : req.params) === null || _d === void 0 ? void 0 : _d.id, req === null || req === void 0 ? void 0 : req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Appointment data updated Successfully',
        data: result,
    });
}));
const deleteAppointment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const result = yield appointment_service_1.appointmentService.deleteAppointment((_e = req === null || req === void 0 ? void 0 : req.params) === null || _e === void 0 ? void 0 : _e.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Appointment data deleted Successfully',
        data: result,
    });
}));
exports.appointmentController = {
    bookAppointment,
    canceledAppointment,
    getAllAppointment,
    getSingleAppointment,
    updateAppointment,
    deleteAppointment,
    finishAppointment,
};
