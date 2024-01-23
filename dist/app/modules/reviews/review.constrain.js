"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorReviewRelationalFieldsMapper = exports.doctorReviewRelationalFields = exports.doctorReviewFilterableFields = void 0;
exports.doctorReviewFilterableFields = ['doctorId', 'patientId'];
//for relational fields
exports.doctorReviewRelationalFields = ['doctorId', 'patientId'];
exports.doctorReviewRelationalFieldsMapper = {
    doctorId: 'doctor',
    patientId: 'patient',
};
