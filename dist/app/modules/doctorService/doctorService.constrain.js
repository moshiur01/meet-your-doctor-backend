"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorServiceRelationalFieldsMapper = exports.doctorServiceRelationalFields = exports.doctorServiceFilterableFields = void 0;
exports.doctorServiceFilterableFields = [
    'isBooked',
    'doctorId',
    'slotId',
];
exports.doctorServiceRelationalFields = [
    'availableDoctorId',
    'slotId',
];
exports.doctorServiceRelationalFieldsMapper = {
    doctorId: 'doctor',
    slotId: 'slot',
};
