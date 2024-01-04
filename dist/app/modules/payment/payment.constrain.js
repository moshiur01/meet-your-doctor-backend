"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRelationalFieldsMapper = exports.paymentRelationalFields = exports.paymentFilterableFields = void 0;
exports.paymentFilterableFields = [
    'paymentDate',
    'paymentStatus',
    'appointmentId',
];
exports.paymentRelationalFields = ['appointmentId'];
exports.paymentRelationalFieldsMapper = {
    appointmentId: 'appointment',
};
