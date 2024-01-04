"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicalProfileRelationFieldsMapper = exports.medicalProfileRelationFields = exports.medicalProfileFilterableFields = exports.medicalProfileSearchableFields = void 0;
exports.medicalProfileSearchableFields = ['address'];
exports.medicalProfileFilterableFields = [
    'searchTerm',
    'gender',
    'emergencyContact',
    'patientId',
];
exports.medicalProfileRelationFields = ['patientId'];
exports.medicalProfileRelationFieldsMapper = {
    patientId: 'patient',
};
