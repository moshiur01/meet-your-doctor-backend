"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.availableDoctorRelationalFieldsMapper = exports.availableDoctorRelationalFields = exports.availableDoctorFilterableFields = void 0;
exports.availableDoctorFilterableFields = [
    'doctorId',
    'slotId',
    'availableDate',
];
exports.availableDoctorRelationalFields = ['doctorId', 'slotId'];
exports.availableDoctorRelationalFieldsMapper = { doctorId: 'doctor', slotId: 'timeSlot' };
