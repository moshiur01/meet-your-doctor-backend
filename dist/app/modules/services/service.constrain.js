"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRelationalFieldsMapper = exports.serviceRelationalFields = exports.serviceFilterableFields = exports.serviceSearchableFields = void 0;
exports.serviceSearchableFields = ['name'];
exports.serviceFilterableFields = [
    'searchTerm',
    'specializationId',
];
exports.serviceRelationalFields = ['specializationId'];
exports.serviceRelationalFieldsMapper = {
    specializationId: 'specialization',
};
