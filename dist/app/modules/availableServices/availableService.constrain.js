"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.availableServiceRelationalFieldsMapper = exports.availableServiceRelationalFields = exports.availableServiceFilterableFields = void 0;
exports.availableServiceFilterableFields = [
    'slotDate',
    'isBooked',
    'availableDoctorId',
    'serviceId',
    'slotId',
];
exports.availableServiceRelationalFields = [
    'availableDoctorId',
    'serviceId',
    'slotId',
];
exports.availableServiceRelationalFieldsMapper = {
    availableDoctorId: 'availableDoctor',
    serviceId: 'service',
    slotId: 'slot',
};
