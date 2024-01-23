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
exports.medicineService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const getAllMedicineStatus = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const result = yield prisma_1.default.medicine.findMany({
        where: {},
        include: {
            appointment: {
                include: {
                    doctor: true,
                    patient: true,
                },
            },
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
    const total = yield prisma_1.default.medicine.count({
        where: {},
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
const getSingleMedicineStatus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.medicine.findUnique({
        where: {
            appointmentId: id,
        },
        include: {
            appointment: true,
        },
    });
    return result;
});
const updateMedicineStatus = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = prisma_1.default.medicine.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
exports.medicineService = {
    getSingleMedicineStatus,
    updateMedicineStatus,
    getAllMedicineStatus,
};
