"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentRelationalFieldsMapper = exports.appointmentRelationalFields = exports.appointmentFilterableFields = void 0;
exports.appointmentFilterableFields = [
    'appointmentDate',
    'status',
    'patientId',
    'availableServiceId',
];
exports.appointmentRelationalFields = [
    'patientId',
    'availableServiceId',
];
exports.appointmentRelationalFieldsMapper = {
    patientId: 'patient',
    availableServiceId: 'availableService',
};
