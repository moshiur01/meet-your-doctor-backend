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
exports.specializationServices = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const specialization_constrain_1 = require("./specialization.constrain");
const createSpecialization = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.specialization.create({ data });
    return result;
});
const getAllSpecializations = (options, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters;
    const andConditions = [];
    //*partial match
    if (searchTerm) {
        andConditions.push({
            OR: specialization_constrain_1.specializationSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.specialization.findMany({
        where: whereConditions,
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
    const total = yield prisma_1.default.specialization.count({
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
const getSingleSpecialization = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.specialization.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateSpecialization = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.specialization.update({
        where: { id },
        data: payload,
    });
    return result;
});
const deleteSpecialization = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.specialization.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.specializationServices = {
    createSpecialization,
    getAllSpecializations,
    getSingleSpecialization,
    updateSpecialization,
    deleteSpecialization,
};
