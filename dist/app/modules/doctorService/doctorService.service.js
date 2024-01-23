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
exports.DocService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const doctorService_constrain_1 = require("./doctorService.constrain");
const createDoctorService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.doctorService.create({
        data,
    });
    return result;
});
const getAllDoctorService = (options, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const andConditions = [];
    //*exact match
    if (Object.keys(filters).length > 0) {
        andConditions.push({
            AND: Object.keys(filters).map(key => {
                //filter for relational fields
                if (doctorService_constrain_1.doctorServiceRelationalFields.includes(key)) {
                    return {
                        [doctorService_constrain_1.doctorServiceRelationalFieldsMapper[key]]: {
                            id: filters[key],
                        },
                    };
                }
                else {
                    return {
                        [key]: {
                            equals: filters[key],
                        },
                    };
                }
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.doctorService.findMany({
        where: whereConditions,
        skip,
        take: limit,
        include: {
            appointments: true,
            slot: true,
            doctor: true,
        },
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.doctorService.count({
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
const getSingleDoctorService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.doctorService.findMany({
        where: {
            doctorId: id,
        },
        include: {
            doctor: true,
            appointments: true,
            slot: true,
        },
    });
    return result;
});
const getOnlySingleDoctorService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.doctorService.findUnique({
        where: {
            id,
        },
        include: {
            doctor: true,
            appointments: true,
            slot: true,
        },
    });
    return result;
});
const updateDoctorService = (id, doctorService) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.doctorService.update({
        where: {
            id: id,
        },
        data: doctorService,
    });
    return result;
});
const deleteDoctorService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.doctorService.delete({
        where: {
            id: id,
        },
    });
    return result;
});
exports.DocService = {
    createDoctorService,
    getAllDoctorService,
    getOnlySingleDoctorService,
    getSingleDoctorService,
    updateDoctorService,
    deleteDoctorService,
};
