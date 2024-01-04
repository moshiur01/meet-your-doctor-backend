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
exports.patientService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const patient_constrain_1 = require("./patient.constrain");
const CreatePatient = (patient, medicalProfile) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transactorClient) => __awaiter(void 0, void 0, void 0, function* () {
        const createPatient = yield transactorClient.patient.create({
            data: patient,
        });
        const createMedicalProfile = yield transactorClient.medicalProfile.create({
            data: Object.assign(Object.assign({}, medicalProfile), { patientId: createPatient === null || createPatient === void 0 ? void 0 : createPatient.id, profileStatus: true }),
        });
        return {
            patient: createPatient,
            medical: createMedicalProfile,
        };
    }));
    return result;
});
const getAllPatients = (options, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const andConditions = [];
    //*partial match
    if (filters.searchTerm) {
        andConditions.push({
            OR: patient_constrain_1.patientSearchableFields.map(field => ({
                [field]: {
                    contains: filters.searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.patient.findMany({
        where: whereConditions,
        include: {
            medicalProfile: true,
        },
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.patient.count({
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getSinglePatient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.patient.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updatePatient = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.patient.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deletePatient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const deleteMedicalProfile = yield prisma_1.default.medicalProfile.delete({
            where: {
                patientId: id,
            },
        });
        const deletePatient = yield transactionClient.patient.delete({
            where: {
                id,
            },
        });
        return {
            patient: deletePatient,
            medicalProfile: deleteMedicalProfile,
        };
    }));
    return result;
});
exports.patientService = {
    CreatePatient,
    getAllPatients,
    getSinglePatient,
    updatePatient,
    deletePatient,
};
