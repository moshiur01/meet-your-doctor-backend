"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorRelationalFieldsMapper = exports.doctorRelationalFields = exports.doctorFilterableFields = exports.doctorSearchableFields = void 0;
exports.doctorSearchableFields = ['name', 'email'];
exports.doctorFilterableFields = [
    'searchTerm',
    'gender',
    'specializationId',
];
//for relational fields
exports.doctorRelationalFields = ['specializationId'];
exports.doctorRelationalFieldsMapper = {
    specializationId: 'specialization',
};
